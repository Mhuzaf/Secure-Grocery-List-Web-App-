/// <reference lib="deno.ns" />

import { server } from "./src/app/server.ts";

Deno.serve(server);

console.log("Hello");