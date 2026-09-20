/** Desktop pet Host half: settings registration and package-owned assets. */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Loader-visible plugin identity. */
export declare const name = "dsh-desktop-pet";
/** Settings namespace consumed by the browser card and overlay gate. */
export declare const DESKTOP_PET_SETTINGS_NAMESPACE: "dsh-desktop-pet";
/** User-controlled settings for all desktop pets in this package. */
export interface Config {
    enabled?: boolean;
}
/** The setting has a default so a fresh install starts visible. */
export declare const Config: z<Config>;
export declare const inject: string[];
/** Register the durable settings namespace; browser changes are read live. */
export declare function apply(ctx: Context, config: Config): void;
//# sourceMappingURL=index.d.ts.map