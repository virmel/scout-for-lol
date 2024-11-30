import configuration from "../configuration.ts";

Deno.serve({ port: configuration.port }, (req) => {
  if (new URL(req.url).pathname === "/") {
    return new Response("Hello :)");
  }
  if (new URL(req.url).pathname === "/ping") {
    return new Response("pong");
  }
  return new Response("Not found", { status: 404 });
});
