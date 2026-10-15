import { spawn } from "node:child_process";
import fs from "node:fs";
const [file, out, w = "1080", h = "1080"] = process.argv.slice(2);
const W = +w, H = +h;
const port = 9000 + Math.floor(Math.random() * 600);
const proc = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/shots/c${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let tg; for (let i = 0; i < 40; i++) { try { tg = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (tg.length) break; } catch {} await sleep(300); }
const ws = new WebSocket(tg.find((x) => x.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "file://" + file }); await sleep(2200);
await send("Runtime.evaluate", { expression: "document.fonts.ready.then(()=>1)", awaitPromise: true });
const r = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
fs.writeFileSync(out, Buffer.from(r.result.data, "base64"));
ws.close(); proc.kill(); process.exit(0);
