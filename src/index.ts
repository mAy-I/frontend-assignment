import { App } from "./app";
import { request } from "./API";

export const setHighDPI = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio ?? 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
};

export const bindRequest = (button: HTMLButtonElement) => {
  button.addEventListener("click", async () => {
    try {
      const result = await request();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
};

const app = new App(document.querySelector("#app")!);
bindRequest(app.$button);
setHighDPI(app.$canvas);
