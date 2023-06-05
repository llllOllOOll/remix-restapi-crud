export type Todo = {
  id: string;
  title: string | undefined;
  content: string | undefined;
  done: boolean;
};

export type TodoInput = {
  id?: string | undefined;
  title?: string | undefined;
  content?: string | undefined;
  done?: boolean;
};

export async function getTodos(): Promise<Todo[]> {
  return await readTodos();
}

export async function getTodo(
  todoId: string | undefined
): Promise<Todo | undefined> {
  const todos: Todo[] = await getTodos();
  return todos.find((todo) => todo.id === todoId);
}

export async function updateTodo(
  todoId: string | undefined
): Promise<Todo | undefined> {
  const todos: Todo[] = await getTodos();

  const updatedTodos: Todo[] = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, done: !todo.done };
    }
    return todo;
  });

  await saveTodos(updatedTodos);
  return await getTodo(todoId);
}

export async function deleteTodo(
  todoId: string | undefined
): Promise<Todo | undefined> {
  const todos: Todo[] = await getTodos();

  const filteredTodos: Todo[] = todos.filter((todo) => todo.id !== todoId);

  const todoDeleted = await getTodo(todoId);
  await saveTodos(filteredTodos);

  return todoDeleted;
}

export async function createTodo(todo: TodoInput): Promise<Todo> {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: todo.title,
    content: todo.content,
    done: false,
  };

  await saveTodos([...(await getTodos()), newTodo]);

  return newTodo;
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await Deno.writeTextFile(
      "todos.json",
      JSON.stringify({ todos: todos || [] })
    );
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

async function readTodos(): Promise<Todo[]> {
  try {
    const text = await Deno.readTextFile("todos.json");
    const { todos }: { todos: Todo[] } = JSON.parse(text);

    return todos || [];
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}
