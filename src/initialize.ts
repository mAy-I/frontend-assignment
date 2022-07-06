import { request } from "./API";
import { selectCanvas, selectRequestButton } from "./utils";

export const initialize = () => {
  console.log("initialize project");
  bindRequest();
  setHighDPI();
};

const setHighDPI = () => {
  const canvas = selectCanvas();
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio ?? 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
};

const bindRequest = () => {
  const button = selectRequestButton();
  button.addEventListener("click", async () => {
    try {
      const result = await request();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
};
