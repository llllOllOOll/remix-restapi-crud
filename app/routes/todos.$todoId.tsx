import { json, LoaderArgs, LoaderFunction } from "@remix-run/deno";
import { getTodo } from "../todos.server";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const todo = await getTodo(params.todoId as string);
  if (!todo) {
    return json({ error: "Todo not found" }, { status: 404 });
  }

  return json({ todo });
};
