import z from "@deepseek-ai/schemastery";
import { readFile } from "node:fs/promises";
//#region lib/types/assets.js
const DESKTOP_PET_ASSET_ROUTE = "/plugins/@dsh-external/dsh-webui-pets/assets";
const ASSET_NAMES = new Set([
	"black-maid-sprite.png",
	"blue-mermaid-sprite.png",
	"blue-ribbon-sprite.png",
	"crimson-hat-sprite.png",
	"doki-sprite.png",
	"frost-crown-sprite.png",
	"mint-gamer-sprite.png"
]);
const ASSET_ROOT = new URL("../assets/", import.meta.url);
/** Serve only the package's allowlisted PNG sprite sheets. */
async function serveDesktopPetAsset(request, response) {
	if (request.method !== "GET" && request.method !== "HEAD") {
		response.writeHead(405, { allow: "GET, HEAD" });
		response.end();
		return;
	}
	const pathname = new URL(request.url ?? "/", "http://dsh-desktop-pet.local").pathname;
	if (!pathname.startsWith(`/plugins/@dsh-external/dsh-webui-pets/assets/`)) {
		response.writeHead(404);
		response.end();
		return;
	}
	const assetName = decodeURIComponent(pathname.slice(45));
	if (!ASSET_NAMES.has(assetName) || assetName.includes("/")) {
		response.writeHead(404);
		response.end();
		return;
	}
	try {
		const body = await readFile(new URL(assetName, ASSET_ROOT));
		response.writeHead(200, {
			"cache-control": "public, max-age=31536000, immutable",
			"content-length": body.byteLength,
			"content-type": "image/png"
		});
		if (request.method === "HEAD") response.end();
		else response.end(body);
	} catch {
		response.writeHead(404);
		response.end();
	}
}
//#endregion
//#region lib/types/index.js
/** Desktop pet Host half: settings registration and package-owned assets. */
/** Loader-visible plugin identity. */
const name = "dsh-desktop-pet";
/** Settings namespace consumed by the browser card and overlay gate. */
const DESKTOP_PET_SETTINGS_NAMESPACE = "dsh-desktop-pet";
/** The setting has a default so a fresh install starts visible. */
const Config = z.object({ enabled: z.boolean().default(true) });
const inject = ["settings", "webServer"];
/** Register the durable settings namespace; browser changes are read live. */
function apply(ctx, config) {
	const entry = { enabled: config.enabled ?? true };
	ctx.settings.register(DESKTOP_PET_SETTINGS_NAMESPACE, Config, { base: entry });
	ctx.effect(() => ctx.webServer.register({
		kind: "prefix",
		path: DESKTOP_PET_ASSET_ROUTE,
		handler: serveDesktopPetAsset
	}), "dsh-desktop-pet: sprite assets");
}
//#endregion
export { Config, DESKTOP_PET_SETTINGS_NAMESPACE, apply, inject, name };
