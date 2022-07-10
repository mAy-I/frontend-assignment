export const initialize = () => {
  console.log("init project");
  setHighDPI();
};

const setHighDPI = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio ?? 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
};

const button = document.querySelector<HTMLButtonElement>("#button")!;
button.addEventListener("click", async (e) => {
  (e.target as HTMLButtonElement).disabled = true;
  const response = await fetch("/api/area", {
    method: "GET",
  });
  const body = await response.json();
  console.log(body);
  (e.target as HTMLButtonElement).disabled = false;
});
