//#region lib/types/invariant.js
const PACKAGE_NAME = "@dsh-external/dsh-webui-pets";
const name = "client-ui-desktop-pet-invariant";
const inject = ["invariants"];
const install = () => {};
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
