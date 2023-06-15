export interface Point {
  x: number;
  y: number;
}

export interface Line {
  id: number;
  coordinates: [Point, Point];
}
