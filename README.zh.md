# DSH WebUI Pets —— 类似 Codex 的 DeepSeek Harness Web UI 桌宠

![DSH WebUI 桌宠实际效果](assets/webui-preview.png)

这是一个面向 DeepSeek Harness Web UI 的 Codex 风格桌宠插件集合，目前包含七个桌宠：Doki、赤花小友、蓝缎小友、深海小友、黑蔷薇女仆、霜冠小友和薄荷电玩小友。

![七个 DSH WebUI 桌宠](assets/pets-overview.png)

插件位于 [packages/client/ui-desktop-pet](packages/client/ui-desktop-pet)，注册到 shell.overlay 槽位，支持拖拽、缩小和 12 帧组图动画。点击 ↻ 可以循环切换桌宠，选择和位置会保存到浏览器本地存储。

## 桌宠图片制作规范

新增桌宠请使用透明背景的 RGBA PNG 组图，尺寸为 1448 × 1086 像素，按 4 列 × 3 行排列，每帧 362 × 362 像素。文件名使用小写 kebab-case，并以 -sprite.png 结尾；每个姿势必须留在自己的单元格内，角色比例和脚部基线要保持一致。

完整说明见 [docs/pet-artwork-spec.md](docs/pet-artwork-spec.md)。

## 安装与启用

现在按 DSH 的插件流程安装，不需要再把源码复制进 dsh，也不需要重新构建整个 dsh：

```bash
dsh plugin --profile web add link:/absolute/path/to/dsh-webUI-pets/packages/client/ui-desktop-pet
```

安装后打开 `插件 / Plugins`，进入 `桌宠 / Desktop pets` 条目，在其中切换 `启用桌宠 / Enable desktop pets`。设置会写入 DSH 并通过实时插件运行时生效，不需要重新构建 dsh；第一次安装后可能需要重启一次 Web profile，让新客户端 bundle 被加载。

包内已经声明 `dsh.client` 和 `dsh.bundle.patch`：patch 负责把插件加入 Web profile，设置卡片负责控制桌宠是否显示。

兼容性：`0.1.0-rc.7` 面向 DSH `0.1.6-alpha.2` 及更新版本，设置卡片使用新版 `plugins.item` 条目、当前 Session 状态 hook，并通过 effect 作用域注册资源和 UI，支持 DSH 实时启停与卸载插件。

## 素材与许可证

七套透明组图根据用户提供的角色参考图生成。重新分发角色素材前，请确认相应的二创和分发授权；插件源代码采用 MIT 许可证。
