# DSH Desktop Pets

Four Codex-style desktop companions for the DeepSeek Harness Web UI (`dsh-plugin`): Doki, Crimson Flower, Blue Ribbon, and Deep Sea.

The plugin lives at [`packages/client/ui-desktop-pet`](packages/client/ui-desktop-pet). It registers into the `shell.overlay` slot and provides draggable, minimizable pets with 12-frame sprite sheets. Use the `↻` control to cycle pets; the selection and position are persisted in browser local storage.

## Install into dsh

Copy `packages/client/ui-desktop-pet` into a dsh checkout, add its workspace reference to the client TypeScript solution, add the package to the Web bundle dependencies, and register its `dsh.client` row in the Web composition patch. The package README documents the runtime behavior and current limitations.

## Assets

The four transparent sprite sheets are generated from user-provided character references. Confirm derivative-work and redistribution rights before redistributing the character assets.

## License

The plugin source is MIT licensed. Character assets retain any rights associated with their source references and should be redistributed only with appropriate permission.
