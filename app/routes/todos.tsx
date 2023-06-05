import { ActionArgs, json, LoaderArgs, LoaderFunction } from "@remix-run/deno";
import { cors } from "remix-utils";
import {
  createTodo,
  deleteTodo,
  getTodos,
  TodoInput,
  updateTodo,
} from "../todos.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const data = await getTodos();
  return await cors(request, json(data));
};

export async function action({ request }: ActionArgs) {
  const body: TodoInput = await request.json();

  if (request.method === "POST") {
    const data = await createTodo(body);

    return await cors(request, json(data, 201));
  }

  if (request.method === "PUT") {
    const data = await updateTodo(body.id);
    return await cors(request, json(data, 200));
  }

  if (request.method === "DELETE") {
    const id = body.id;
    const data = await deleteTodo(body.id);
    return await cors(request, json(data, 200));
  }
}
