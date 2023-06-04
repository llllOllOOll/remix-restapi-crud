import { ActionArgs, json, LoaderFunction } from "@remix-run/deno";
import {
  createTodo,
  deleteTodo,
  getTodos,
  TodoInput,
  updateTodo,
} from "../todos.server";

export const loader: LoaderFunction = async () => {
  return await getTodos();
};

export async function action({ request }: ActionArgs) {
  const body: TodoInput = await request.json();

  if (request.method === "POST") {
    return json(await createTodo(body), 201);
  }

  if (request.method === "PUT") {
    return json(await updateTodo(body.id), 200);
  }

  if (request.method === "DELETE") {
    const id = body.id;
    return json(await deleteTodo(body.id), 200);
  }
}
