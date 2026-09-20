# DSH WebUI Pets — Codex-style desktop pets for DeepSeek Harness Web UI

# DSH WebUI Pets —— 类似 Codex 的 DeepSeek Harness Web UI 桌宠

English version / 英文版

![DSH WebUI pet in action](assets/webui-preview.png)

## Overview

DSH WebUI Pets is a collection of Codex-like draggable desktop companions for the DeepSeek Harness Web UI. It currently includes seven pets: Doki, Crimson Flower, Blue Ribbon, Deep Sea, Black Rose Maid, Frost Crown, and Mint Gamer. The package is tagged [dsh-plugin](https://github.com/topics/dsh-plugin) and renders inside the Web UI instead of opening a native desktop window.

桌宠总览 / Desktop pets overview:

![Seven DSH WebUI pets](assets/pets-overview.png)

The plugin lives at [packages/client/ui-desktop-pet](packages/client/ui-desktop-pet). It registers into the shell.overlay slot and provides draggable, minimizable pets with 12-frame sprite sheets. Use the ↻ control to cycle pets; the selection and position are persisted in browser local storage.

## Pet artwork specification

New pets should use a transparent RGBA PNG sprite sheet sized 1448 × 1086 pixels. The sheet is a 4 × 3 grid of 362 × 362 pixel frames, numbered left to right and top to bottom. Use a lowercase kebab-case filename ending in -sprite.png, keep all poses inside their own cells, and keep the character scale and feet baseline consistent.

The complete English and Chinese preparation guide, frame order, naming rules, runtime mapping, and integration checklist are in [docs/pet-artwork-spec.md](docs/pet-artwork-spec.md).

## Install and enable / 安装与启用

Install the package into the Web profile with the current DSH plugin flow; it is no longer necessary to copy source files into dsh or rebuild the whole dsh checkout:

```bash
dsh plugin --profile web add link:/absolute/path/to/dsh-webUI-pets/packages/client/ui-desktop-pet
```

After installation, open `插件 / Plugins`, open the `桌宠 / Desktop pets` entry, and use its `启用桌宠 / Enable desktop pets` switch. The setting is persisted by DSH and takes effect through the live plugin runtime; a restart of the Web profile may still be needed after the first installation so the newly installed client bundle is loaded.

The package declares `dsh.client` and `dsh.bundle.patch`; the patch adds it to the Web profile composition, while the settings card controls whether the overlay is mounted.

Compatibility: `0.1.0-rc.7` targets DSH `0.1.6-alpha.2` and newer. It uses the live `plugins.item` configuration entry, the current Session status hooks, and effect-scoped Host/client registrations so DSH can enable, disable, and unload the plugin safely.

## Assets and license

The seven transparent sprite sheets were generated from user-provided character references. Confirm derivative-work and redistribution rights before redistributing the character assets. The plugin source is MIT licensed.

---

## 中文翻译

DSH WebUI Pets 是一组面向 DeepSeek Harness Web UI 的、类似 Codex 的可拖拽桌宠。目前包含七个桌宠：Doki、赤花小友、蓝缎小友、深海小友、黑蔷薇女仆、霜冠小友和薄荷电玩小友。仓库已加入 [dsh-plugin](https://github.com/topics/dsh-plugin) 话题，桌宠运行在 Web UI 内，不会打开原生桌面窗口。

上方截图是桌宠在 Web UI 中的实际效果；下方总览图展示当前七个桌宠：

![七个 DSH WebUI 桌宠](assets/pets-overview.png)

插件位于 [packages/client/ui-desktop-pet](packages/client/ui-desktop-pet)，注册到 shell.overlay 槽位，支持拖拽、缩小和 12 帧组图动画。点击 ↻ 可以循环切换桌宠，选择和位置会保存到浏览器本地存储。

## 安装与启用

现在按 DSH 的插件流程安装，不需要再把源码复制进 dsh，也不需要重新构建整个 dsh：

```bash
dsh plugin --profile web add link:/absolute/path/to/dsh-webUI-pets/packages/client/ui-desktop-pet
```

安装后打开 `插件 / Plugins`，进入 `桌宠 / Desktop pets` 条目，在其中切换 `启用桌宠 / Enable desktop pets`。设置会写入 DSH 并通过实时插件运行时生效，不需要重新构建 dsh；第一次安装后可能需要重启一次 Web profile，让新客户端 bundle 被加载。

包内已经声明 `dsh.client` 和 `dsh.bundle.patch`：patch 负责把插件加入 Web profile，设置卡片负责控制桌宠是否显示。

兼容性：`0.1.0-rc.7` 面向 DSH `0.1.6-alpha.2` 及更新版本，设置卡片使用新版 `plugins.item` 条目、当前 Session 状态 hook，并通过 effect 作用域注册资源和 UI，支持 DSH 实时启停与卸载插件。

## 桌宠图片制作规范

新增桌宠请使用透明背景的 RGBA PNG 组图，尺寸为 1448 × 1086 像素，按 4 列 × 3 行排列，每帧 362 × 362 像素。文件名使用小写 kebab-case，并以 -sprite.png 结尾；每个姿势必须留在自己的单元格内，角色比例和脚部基线要保持一致。

完整的中英文图片制作说明、帧顺序、命名规则、运行时映射和接入检查清单见 [docs/pet-artwork-spec.md](docs/pet-artwork-spec.md)。

## 素材与许可证

七套透明组图根据用户提供的角色参考图生成。重新分发角色素材前，请确认相应的二创和分发授权；插件源代码采用 MIT 许可证。
