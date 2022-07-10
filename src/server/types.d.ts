export interface AreaResponseBody {
  statusCode: number;
  area?: {
    zones?: Zone[];
    lines?: Line[];
  };
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

export type Status = "ERROR" | "IN_PROGRESS" | "SUCCESS";
