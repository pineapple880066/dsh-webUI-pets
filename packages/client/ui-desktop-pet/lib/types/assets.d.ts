import type { IncomingMessage, ServerResponse } from 'node:http';
export declare const DESKTOP_PET_ASSET_ROUTE = "/plugins/@dsh-external/dsh-webui-pets/assets";
/** Serve only the package's allowlisted PNG sprite sheets. */
export declare function serveDesktopPetAsset(request: IncomingMessage, response: ServerResponse): Promise<void>;
//# sourceMappingURL=assets.d.ts.map