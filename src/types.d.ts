export interface State extends ZoneResponse {
  isLoading: boolean;
}

export interface ZoneResponse {
  size: [number, number];
  zones: Zone[];
  lines: Line[];
}

export interface Line {
  label: string;
  line: [Point, Point];
  direction: [string, string];
}

export interface Zone {
  label: string;
  coordinates: Point[];
}

export type Point = [number, number];
