# DSH WebUI Pets —— 类似 Codex 的 DeepSeek Harness Web UI 桌宠

![DSH WebUI 桌宠实际效果](assets/webui-preview.png)

这是一个面向 DeepSeek Harness Web UI 的 Codex 风格桌宠插件集合，目前包含 Doki、赤花小友、蓝缎小友和深海小友。

![四个 DSH WebUI 桌宠](assets/pets-overview.png)

插件位于 [packages/client/ui-desktop-pet](packages/client/ui-desktop-pet)，注册到 shell.overlay 槽位，支持拖拽、缩小和 12 帧组图动画。点击 ↻ 可以循环切换桌宠，选择和位置会保存到浏览器本地存储。

## 桌宠图片制作规范

新增桌宠请使用透明背景的 RGBA PNG 组图，尺寸为 1448 × 1086 像素，按 4 列 × 3 行排列，每帧 362 × 362 像素。文件名使用小写 kebab-case，并以 -sprite.png 结尾；每个姿势必须留在自己的单元格内，角色比例和脚部基线要保持一致。

完整说明见 [docs/pet-artwork-spec.md](docs/pet-artwork-spec.md)。

## 接入 dsh

将 packages/client/ui-desktop-pet 复制到 dsh 源码仓库，加入客户端 TypeScript solution、Web bundle 依赖以及 Web composition patch 中的 dsh.client 注册，即可接入。

## 素材与许可证

四套透明组图根据用户提供的角色参考图生成。重新分发角色素材前，请确认相应的二创和分发授权；插件源代码采用 MIT 许可证。
