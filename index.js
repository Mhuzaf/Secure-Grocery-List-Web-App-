import { server } from "./src/app/server.js";

const DEFAULT_PORT = 8000;
const FALLBACK_PORT = 8001;

function start(port) {
	Deno.serve({ port }, server);
	console.log(`Server started on http://localhost:${port}`);
}

try {
	start(DEFAULT_PORT);
} catch (err) {
	if (err instanceof Deno.errors.AddrInUse) {
		console.error(`Port ${DEFAULT_PORT} in use — falling back to ${FALLBACK_PORT}`);
		start(FALLBACK_PORT);
	} else {
		throw err;
	}
}

console.log("Hello");