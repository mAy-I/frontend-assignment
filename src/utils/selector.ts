export const selectCanvas = () => {
  return document.querySelector<HTMLCanvasElement>("#canvas")!;
};

export const selectRequestButton = () => {
  return document.querySelector<HTMLButtonElement>("#request")!;
};
