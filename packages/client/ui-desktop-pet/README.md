# @deepseek-ai/dsh-client-ui-desktop-pet

English | [中文](README.zh.md)

A small Codex-style companion for the DeepSeek Harness Web UI. The plugin registers into the additive `shell.overlay` slot, so it floats above the three-column shell without replacing any existing surface.

## Features

- Four switchable pets are bundled: Doki, Crimson Flower, Blue Ribbon, and Deep Sea; each has its own 12-frame sprite sheet.
- Each sheet includes idle, blink, happy, working, thinking, sleeping, surprised, waving, celebrating, attention, tired, and bow poses.
- Changes pose from the current session summary: working, waiting for confirmation, completed, or idle.
- The `↻` button cycles pets and persists the selection in browser local storage.
- Drag anywhere on the pet to reposition it; the position is persisted in `localStorage`.
- The `−` button minimizes the pet into a small corner companion.
- The PNG asset is served by the client-module route at `/plugins/<package>/assets/`.

The two new character sprites were generated from user-provided reference images. Confirm derivative-work and redistribution rights before publishing them publicly.

Mount `@deepseek-ai/dsh-client-ui-desktop-pet` in a Web composition after building its client bundle. The shipped Web bundle enables it by default.

## Model Experience

None, as the desktop pet renders browser viewing state; it does not add prompt text, tools, or session events.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **Web-surface companion only** — the current implementation floats inside the dsh Web viewport; a native always-on-top window would require a separate desktop host integration.
- **Coarse activity states** — the pet reads the session list's running/pending/completed summary and does not inspect individual tool names or token events.
- **One asset route** — package assets are served only through the client-module route and are not exposed as a general static-file service.
