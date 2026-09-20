import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { DesktopPetSettingsFace } from './settings-controller.ts';
type DesktopPetProps = PropsRuntime<'shell.overlay'>;
type DesktopPetOverlayProps = PropsRuntime<'shell.overlay'> & InjectFace<DesktopPetSettingsFace>;
/**
 * Frame-wide draggable companion. It reads only the global session summary;
 * all presentation state remains local to the component and disappears with
 * the overlay registration.
 */
export declare function DesktopPet({ useSessions, useSessionStatus }: DesktopPetProps): import("react").JSX.Element;
/** Overlay wrapper that reacts to the live Plugins page setting. */
export declare function DesktopPetOverlay(props: DesktopPetOverlayProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=DesktopPet.d.ts.map