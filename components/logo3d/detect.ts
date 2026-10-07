let cached: boolean | undefined;
let pending: Promise<boolean> | undefined;

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software/i;

/** Main-thread probe. On a software renderer creating the context alone can freeze the page for seconds. */
function probe(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      c.getContext("webgl", { failIfMajorPerformanceCaveat: true })) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !SOFTWARE.test(renderer);
  } catch {
    return false;
  }
}

// Same probe, run in a worker so a slow or software GL stack never blocks the page; it reports the renderer name.
const WORKER_SRC = `self.onmessage=function(){try{var c=new OffscreenCanvas(1,1);var o={failIfMajorPerformanceCaveat:true};var g=c.getContext('webgl2',o)||c.getContext('webgl',o);if(!g){self.postMessage(false);return}var i=g.getExtension('WEBGL_debug_renderer_info');var r=i?String(g.getParameter(i.UNMASKED_RENDERER_WEBGL)):'';self.postMessage(!/swiftshader|llvmpipe|softpipe|software/i.test(r))}catch(e){self.postMessage(false)}}`;

/**
 * Whether the mark can be drawn with a hardware-accelerated WebGL context. Software renderers (SwiftShader,
 * llvmpipe, remote desktops) answer "no": there the scene would hold the main thread for seconds, and the page
 * reads fine without the mark. The answer comes from a worker with a time limit, so a device that cannot set up
 * WebGL quickly is treated the same way. Browsers without OffscreenCanvas fall back to the main-thread probe.
 * Kept free of three.js so the lazy loaders can ask before downloading it. Client-only; computed once.
 */
export function detectWebGLAsync(timeoutMs = 2500): Promise<boolean> {
  if (cached !== undefined) return Promise.resolve(cached);
  pending ??= new Promise<boolean>((resolve) => {
    if (typeof OffscreenCanvas === "undefined" || typeof Worker === "undefined") {
      resolve((cached = probe()));
      return;
    }
    let url = "";
    let worker: Worker | undefined;
    let timer = 0;
    const done = (v: boolean) => {
      if (cached !== undefined) return;
      cached = v;
      window.clearTimeout(timer);
      worker?.terminate();
      if (url) URL.revokeObjectURL(url);
      resolve(v);
    };
    try {
      url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      worker = new Worker(url);
      worker.onmessage = (e) => done(!!e.data);
      worker.onerror = () => done(false);
      timer = window.setTimeout(() => done(false), timeoutMs);
      worker.postMessage(0);
    } catch {
      done(false);
    }
  });
  return pending;
}

/** Synchronous answer for components that mount after `detectWebGLAsync` has settled (the loaders guarantee it). */
export function detectWebGL(): boolean {
  return cached ?? (cached = probe());
}
