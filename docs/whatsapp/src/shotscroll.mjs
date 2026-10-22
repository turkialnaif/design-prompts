import { spawn } from "node:child_process";
import fs from "node:fs";
const [url, prefix, w = "1440", h = "900", n = "3"] = process.argv.slice(2);
const W = +w, H = +h;
const port = 9700 + Math.floor(Math.random() * 200);
const proc = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=/tmp/shots/s${port}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let tg; for (let i = 0; i < 40; i++) { try { tg = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (tg.length) break; } catch {} await sleep(300); }
const ws = new WebSocket(tg.find((x) => x.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
await send("Page.navigate", { url }); await sleep(3500);
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result.result.value;
// scroll through the page once so lazy/Reveal content mounts
const total = await ev("document.documentElement.scrollHeight");
for (let y = 0; y < total; y += H * 0.8) { await ev(`window.scrollTo(0,${y})`); await sleep(120); }
await sleep(500);
const total2 = await ev("document.documentElement.scrollHeight");
console.log("height", total2);
for (let k = 0; k < +n; k++) {
  const y = Math.max(0, total2 - H - k * H * 0.9);
  await ev(`window.scrollTo(0,${y})`); await sleep(900);
  const r = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(`${prefix}-${k}.png`, Buffer.from(r.result.data, "base64"));
}
ws.close(); proc.kill(); process.exit(0);
