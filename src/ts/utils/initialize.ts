import { selectCanvas } from "./selector";

export const initialize = () => {
  console.log("initialize project");
  const canvas = selectCanvas();
  const ctx = canvas.getContext("2d")!;
  setHighDPI(canvas, ctx);
};

const setHighDPI = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const dpr = window.devicePixelRatio ?? 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
};
