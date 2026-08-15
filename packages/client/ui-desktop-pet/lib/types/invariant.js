const PACKAGE_NAME = '@dsh-external/dsh-webui-pets';
export const name = 'client-ui-desktop-pet-invariant';
export const inject = ['invariants'];
// No runtime invariant: the pet owns only a slot registration and local UI state.
const install = () => { };
export const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//# sourceMappingURL=invariant.js.map