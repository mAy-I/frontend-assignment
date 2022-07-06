import { State } from "./types.d";

export class App {
  $app: HTMLDivElement;
  state: State = {
    isLoading: false,
    size: [0, 0],
    lines: [],
    zones: [],
  };

  constructor(el: HTMLDivElement) {
    this.$app = el;
  }

  get $canvas() {
    return this.$app.querySelector<HTMLCanvasElement>("#canvas")!;
  }

  get $button() {
    return this.$app.querySelector<HTMLButtonElement>("#request")!;
  }
}
