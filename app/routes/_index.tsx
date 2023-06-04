import * as React from "react";
import type { V2_MetaFunction } from "@remix-run/deno";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix REST API - DENO" },
    { name: "description", content: "Remix REST API CRUD - DENO" },
  ];
};

export default function Index() {
  return <h1>REMIX REST API CRUD</h1>;
}
