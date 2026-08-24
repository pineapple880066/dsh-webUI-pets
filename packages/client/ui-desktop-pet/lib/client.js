window.__ModuleLoader__.load({
	id: "@dsh-external/dsh-webui-pets",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:/Users/pineapple/Documents/ChatGPT/deepseek-harness/deepseek-harness-src/packages/client/ui-desktop-pet/src/client/DesktopPet.module.css.mjs
		const css$1 = ".Z7uDiG_root{right:var(--dsh-overlay-safe-right,22px);z-index:1;cursor:grab;user-select:none;touch-action:none;width:126px;transition:transform var(--ds-transition-duration-fast) var(--ds-ease-out), filter var(--ds-transition-duration-fast) var(--ds-ease-out);border-radius:24px;padding:8px;position:absolute;bottom:18px}.Z7uDiG_root:hover,.Z7uDiG_root:focus-within{transform:translateY(-3px)}.Z7uDiG_root[data-dragging]{cursor:grabbing;filter:drop-shadow(0 12px 20px color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent));transition:none;transform:scale(1.03)}.Z7uDiG_root[data-minimized]{width:48px;padding:2px}.Z7uDiG_sprite{background-image:var(--dsh-desktop-pet-sprite);filter:drop-shadow(0 8px 10px #0f172a2e);background-repeat:no-repeat;background-size:400% 300%;width:110px;height:110px}.Z7uDiG_root[data-minimized] .Z7uDiG_sprite{width:44px;height:44px}.Z7uDiG_actionButton{z-index:2;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-2) 72%, transparent);width:22px;height:22px;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:0;backdrop-filter:blur(14px)saturate(135%);transition:opacity var(--ds-transition-duration-fast) var(--ds-ease-out);border-radius:999px;place-items:center;padding:0;display:grid;position:absolute;top:1px;right:0}.Z7uDiG_switcher{right:25px}.Z7uDiG_root:hover .Z7uDiG_actionButton,.Z7uDiG_root:focus-within .Z7uDiG_actionButton,.Z7uDiG_root[data-minimized] .Z7uDiG_actionButton{opacity:1}.Z7uDiG_actionButton:hover{background:var(--dsw-alias-button-floating-hover);color:var(--dsw-alias-text-primary)}.Z7uDiG_bubble{border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-2) 72%, transparent);min-width:150px;color:var(--dsw-alias-label-primary);opacity:0;pointer-events:none;transition:opacity var(--ds-transition-duration-fast) var(--ds-ease-out), transform var(--ds-transition-duration-fast) var(--ds-ease-out);backdrop-filter:blur(18px)saturate(135%);border-radius:16px;gap:3px;padding:9px 11px;font-size:12px;line-height:1.35;display:grid;position:absolute;bottom:calc(100% - 4px);right:2px;transform:translateY(4px);box-shadow:0 8px 26px #0f172a21}.Z7uDiG_root:hover .Z7uDiG_bubble,.Z7uDiG_root:focus-within .Z7uDiG_bubble{opacity:1;transform:translateY(0)}.Z7uDiG_bubble:after{border-right:1px solid var(--dsw-alias-border-l2);border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);content:\"\";width:10px;height:10px;position:absolute;bottom:-6px;right:23px;transform:rotate(45deg)}.Z7uDiG_bubble span{color:var(--dsw-alias-text-tertiary)}@media (prefers-reduced-motion:reduce){.Z7uDiG_root,.Z7uDiG_actionButton,.Z7uDiG_bubble{transition:none}}";
		const tagId$1 = "@dsh-external/dsh-webui-pets/DesktopPet.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@dsh-external/dsh-webui-pets";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var DesktopPet_module_css_default = {
			"sprite": "Z7uDiG_sprite",
			"switcher": "Z7uDiG_switcher",
			"bubble": "Z7uDiG_bubble",
			"root": "Z7uDiG_root",
			"actionButton": "Z7uDiG_actionButton"
		};
		//#endregion
		//#region src/client/DesktopPet.tsx
		const POSITION_KEY = "dsh.desktop-pet.position";
		const PET_KEY = "dsh.desktop-pet.pet";
		const FRAMES = {
			idle: [0, 1],
			working: [3],
			attention: [6],
			done: [9]
		};
		const DSH_PLUGIN_ASSETS = "/plugins/@dsh-external/dsh-webui-pets/assets";
		const DEFAULT_PET = {
			id: "doki",
			spriteUrl: `${DSH_PLUGIN_ASSETS}/doki-sprite.png`,
			labels: {
				idle: "Doki 随时待命",
				working: "Doki 正在努力工作",
				attention: "Doki 在等你确认",
				done: "Doki 说：完成啦！"
			}
		};
		const PETS = [
			DEFAULT_PET,
			{
				id: "crimson-hat",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/crimson-hat-sprite.png`,
				labels: {
					idle: "赤花小友 随时待命",
					working: "赤花小友 正在努力工作",
					attention: "赤花小友 在等你确认",
					done: "赤花小友 说：完成啦！"
				}
			},
			{
				id: "blue-ribbon",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/blue-ribbon-sprite.png`,
				labels: {
					idle: "蓝缎小友 随时待命",
					working: "蓝缎小友 正在努力工作",
					attention: "蓝缎小友 在等你确认",
					done: "蓝缎小友 说：完成啦！"
				}
			},
			{
				id: "blue-mermaid",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/blue-mermaid-sprite.png`,
				labels: {
					idle: "深海小友 随时待命",
					working: "深海小友 正在努力工作",
					attention: "深海小友 在等你确认",
					done: "深海小友 说：完成啦！"
				}
			},
			{
				id: "black-maid",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/black-maid-sprite.png`,
				labels: {
					idle: "黑蔷薇女仆 随时待命",
					working: "黑蔷薇女仆 正在努力工作",
					attention: "黑蔷薇女仆 在等你确认",
					done: "黑蔷薇女仆 说：完成啦！"
				}
			},
			{
				id: "frost-crown",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/frost-crown-sprite.png`,
				labels: {
					idle: "霜冠小友 随时待命",
					working: "霜冠小友 正在努力工作",
					attention: "霜冠小友 在等你确认",
					done: "霜冠小友 说：完成啦！"
				}
			},
			{
				id: "mint-gamer",
				spriteUrl: `${DSH_PLUGIN_ASSETS}/mint-gamer-sprite.png`,
				labels: {
					idle: "薄荷电玩小友 随时待命",
					working: "薄荷电玩小友 正在努力工作",
					attention: "薄荷电玩小友 在等你确认",
					done: "薄荷电玩小友 说：完成啦！"
				}
			}
		];
		function isPetId(value) {
			return PETS.some((pet) => pet.id === value);
		}
		function readPetId() {
			try {
				const value = window.localStorage.getItem(PET_KEY);
				return value !== null && isPetId(value) ? value : DEFAULT_PET.id;
			} catch {
				return DEFAULT_PET.id;
			}
		}
		function writePetId(petId) {
			try {
				window.localStorage.setItem(PET_KEY, petId);
			} catch {}
		}
		function readPosition() {
			try {
				const raw = window.localStorage.getItem(POSITION_KEY);
				if (raw === null) return null;
				const value = JSON.parse(raw);
				return typeof value.left === "number" && typeof value.top === "number" ? {
					left: value.left,
					top: value.top
				} : null;
			} catch {
				return null;
			}
		}
		function writePosition(position) {
			try {
				window.localStorage.setItem(POSITION_KEY, JSON.stringify(position));
			} catch {}
		}
		function modeFromSession(running, pending, completed) {
			if (pending) return "attention";
			if (running) return "working";
			if (completed) return "done";
			return "idle";
		}
		function framePosition(frame) {
			const column = frame % 4;
			const row = Math.floor(frame / 4);
			return `${column * 100 / 3}% ${row * 100 / 2}%`;
		}
		/**
		* Frame-wide draggable companion. It reads only the global session summary;
		* all presentation state remains local to the component and disappears with
		* the overlay registration.
		*/
		function DesktopPet({ useSessions }) {
			const mode = useSessions((state) => {
				const current = state.current === void 0 ? void 0 : state.byId[state.current];
				return modeFromSession(current?.running === true, current?.pendingInteraction !== void 0, current?.completed === true);
			});
			const sessionTitle = useSessions((state) => {
				return (state.current === void 0 ? void 0 : state.byId[state.current])?.displayTitle;
			});
			const [frameIndex, setFrameIndex] = (0, react.useState)(0);
			const [petId, setPetId] = (0, react.useState)(readPetId);
			const [minimized, setMinimized] = (0, react.useState)(false);
			const [position, setPosition] = (0, react.useState)(readPosition);
			const [dragging, setDragging] = (0, react.useState)(false);
			const drag = (0, react.useRef)(null);
			const pet = PETS.find((value) => value.id === petId) ?? DEFAULT_PET;
			(0, react.useEffect)(() => {
				setFrameIndex(0);
				const frames = FRAMES[mode];
				if (frames.length < 2) return;
				const timer = window.setInterval(() => {
					setFrameIndex((value) => (value + 1) % frames.length);
				}, 2200);
				return () => {
					window.clearInterval(timer);
				};
			}, [mode]);
			const currentFrame = FRAMES[mode][frameIndex] ?? 0;
			const spriteStyle = {
				"--dsh-desktop-pet-sprite": `url(${pet.spriteUrl})`,
				backgroundPosition: framePosition(currentFrame)
			};
			const status = pet.labels[mode];
			const onNextPet = () => {
				const next = PETS[(PETS.findIndex((value) => value.id === pet.id) + 1) % PETS.length] ?? DEFAULT_PET;
				setPetId(next.id);
				writePetId(next.id);
			};
			const onPointerDown = (event) => {
				if (event.target.closest("button")) return;
				const rect = event.currentTarget.getBoundingClientRect();
				drag.current = {
					offsetX: event.clientX - rect.left,
					offsetY: event.clientY - rect.top,
					moved: false
				};
				event.currentTarget.setPointerCapture(event.pointerId);
				setDragging(true);
			};
			const onPointerMove = (event) => {
				const active = drag.current;
				if (active === null) return;
				const rect = event.currentTarget.getBoundingClientRect();
				active.moved = active.moved || Math.abs(event.movementX) > 1 || Math.abs(event.movementY) > 1;
				setPosition({
					left: Math.max(8, Math.min(window.innerWidth - rect.width - 8, event.clientX - active.offsetX)),
					top: Math.max(8, Math.min(window.innerHeight - rect.height - 8, event.clientY - active.offsetY))
				});
			};
			const onPointerUp = (event) => {
				const active = drag.current;
				drag.current = null;
				setDragging(false);
				if (active !== null && !active.moved) return;
				if (active !== null) {
					const rect = event.currentTarget.getBoundingClientRect();
					const next = {
						left: Math.max(8, Math.min(window.innerWidth - rect.width - 8, rect.left)),
						top: Math.max(8, Math.min(window.innerHeight - rect.height - 8, rect.top))
					};
					setPosition(next);
					writePosition(next);
				}
			};
			const style = position === null ? void 0 : {
				left: position.left,
				top: position.top,
				right: "auto",
				bottom: "auto"
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: DesktopPet_module_css_default.root,
				"data-dragging": dragging || void 0,
				"data-minimized": minimized || void 0,
				"data-pet-id": pet.id,
				style,
				"aria-label": `${status}${sessionTitle === void 0 ? "" : `：${sessionTitle}`}`,
				onPointerDown,
				onPointerMove,
				onPointerUp,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${DesktopPet_module_css_default.actionButton} ${DesktopPet_module_css_default.switcher}`,
						"aria-label": "更换桌宠",
						onClick: onNextPet,
						children: "↻"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: `${DesktopPet_module_css_default.actionButton} ${DesktopPet_module_css_default.minimize}`,
						"aria-label": minimized ? "展开桌宠" : "缩小桌宠",
						onClick: () => {
							setMinimized((value) => !value);
						},
						children: minimized ? "+" : "−"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: DesktopPet_module_css_default.sprite,
						role: "img",
						"aria-label": status,
						style: spriteStyle
					}),
					!minimized && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: DesktopPet_module_css_default.bubble,
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: status }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "拖我到喜欢的位置" })]
					})
				]
			});
		}
		/** Overlay wrapper that reacts to Settings → Plugins → Plugin configuration. */
		function DesktopPetOverlay(props) {
			return props.useDesktopPetSettings((snapshot) => snapshot.enabled) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DesktopPet, { ...props }) : null;
		}
		//#endregion
		//#region \0dsh-css:/Users/pineapple/Documents/ChatGPT/deepseek-harness/deepseek-harness-src/packages/client/ui-desktop-pet/src/client/DesktopPetSettingsCard.module.css.mjs
		const css = "._6cK9Xq_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-elevated);color:var(--dsw-alias-text-primary);border-radius:12px;gap:14px;padding:18px;display:grid}._6cK9Xq_header{justify-content:space-between;align-items:flex-start;gap:16px;display:flex}._6cK9Xq_header strong{font-size:14px;display:block}._6cK9Xq_header p{color:var(--dsw-alias-text-secondary);margin:5px 0 0;font-size:12px;line-height:1.45}._6cK9Xq_pending{color:var(--dsw-alias-text-secondary);white-space:nowrap;font-size:12px}._6cK9Xq_toggle{align-items:center;gap:9px;font-size:13px;display:flex}._6cK9Xq_toggle input{width:16px;height:16px;accent-color:var(--dsw-alias-button-primary-bg)}._6cK9Xq_actions{justify-content:flex-end;gap:8px;display:flex}._6cK9Xq_actions button{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-text-primary);cursor:pointer;border-radius:7px;padding:6px 10px;font-size:12px}._6cK9Xq_actions button:last-child{border-color:var(--dsw-alias-button-primary-bg);background:var(--dsw-alias-button-primary-bg);color:var(--dsw-alias-button-primary-text)}._6cK9Xq_actions button:disabled,._6cK9Xq_toggle input:disabled{cursor:not-allowed;opacity:.55}._6cK9Xq_failed{color:var(--dsw-alias-text-danger);margin:0;font-size:12px}";
		const tagId = "@dsh-external/dsh-webui-pets/DesktopPetSettingsCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@dsh-external/dsh-webui-pets";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var DesktopPetSettingsCard_module_css_default = {
			"actions": "_6cK9Xq_actions",
			"toggle": "_6cK9Xq_toggle",
			"failed": "_6cK9Xq_failed",
			"card": "_6cK9Xq_card",
			"pending": "_6cK9Xq_pending",
			"header": "_6cK9Xq_header"
		};
		//#endregion
		//#region src/client/DesktopPetSettingsCard.tsx
		/** Bilingual settings card for the master desktop-pet switch. */
		function DesktopPetSettingsCard(props) {
			const state = props.useDesktopPetSettings((snapshot) => snapshot);
			if (!state.available) return null;
			const disabled = !state.writable || state.saving;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: DesktopPetSettingsCard_module_css_default.card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: DesktopPetSettingsCard_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "桌宠 / Desktop pets" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "类似 Codex 的 Web UI 桌宠 / Codex-style Web UI desktop companions" })] }), state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: DesktopPetSettingsCard_module_css_default.pending,
							children: "未保存 / Unsaved"
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: DesktopPetSettingsCard_module_css_default.toggle,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: state.draftEnabled,
							disabled,
							onChange: (event) => {
								props.editEnabled(event.target.checked);
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "启用桌宠 / Enable desktop pets" })]
					}),
					state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: DesktopPetSettingsCard_module_css_default.failed,
						children: "保存失败，请重试 / Save failed; please try again."
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: DesktopPetSettingsCard_module_css_default.actions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !state.dirty || disabled,
							onClick: props.discard,
							children: "放弃修改 / Discard"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !state.dirty || disabled,
							onClick: props.save,
							children: state.saving ? "保存中… / Saving…" : "保存 / Save"
						})]
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-controller.ts
		/** Small staged form used by the plugin card and the overlay gate. */
		var DesktopPetSettingsController = class {
			scope;
			draftEnabled;
			saving = false;
			failed = false;
			store;
			unsubscribe;
			constructor(scope) {
				this.scope = scope;
				this.store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(this.snapshot());
				this.unsubscribe = scope.subscribe(() => {
					this.publish();
				});
			}
			dispose() {
				this.unsubscribe();
			}
			snapshot() {
				const snapshot = this.scope.getSnapshot();
				const enabled = snapshot.value?.enabled ?? true;
				const draftEnabled = this.draftEnabled ?? enabled;
				return {
					available: snapshot.status === "ready",
					writable: snapshot.writable,
					enabled,
					draftEnabled,
					dirty: this.draftEnabled !== void 0 && this.draftEnabled !== enabled,
					saving: this.saving,
					failed: this.failed
				};
			}
			publish() {
				this.store.set(this.snapshot());
			}
			async saveSettings() {
				const value = this.draftEnabled;
				if (value === void 0 || this.saving || !this.snapshot().writable) return;
				this.saving = true;
				this.failed = false;
				this.publish();
				await this.scope.set("enabled", value);
				const accepted = this.scope.getSnapshot().value?.enabled ?? true;
				this.saving = false;
				if (accepted === value) this.draftEnabled = void 0;
				else this.failed = true;
				this.publish();
			}
			inject() {
				return {
					hooks: { desktopPetSettings: this.store },
					editEnabled: (value) => {
						this.draftEnabled = value;
						this.failed = false;
						this.publish();
					},
					save: () => {
						this.saveSettings();
					},
					discard: () => {
						this.draftEnabled = void 0;
						this.failed = false;
						this.publish();
					}
				};
			}
		};
		//#endregion
		//#region src/client/index.ts
		/** Browser services used by the overlay, settings mirror, and plugin card. */
		const inject = [
			"slots",
			"connection",
			"remote",
			"settingsScope"
		];
		/** Register the overlay and its settings card without rebuilding the host. */
		function apply(ctx) {
			const controller = new DesktopPetSettingsController(ctx.settingsScope.bind({ namespace: "dsh-desktop-pet" }));
			ctx.effect(() => () => {
				controller.dispose();
			}, "dsh-desktop-pet: settings controller");
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "dsh-desktop-pet",
				order: 60,
				inject: () => controller.inject()
			}, DesktopPetOverlay));
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: "dsh-desktop-pet",
				inject: () => controller.inject()
			}, DesktopPetSettingsCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map