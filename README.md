# 과제

## 과제 설명

캔버스에 라인을 생성, 삭제, 수정하고 저장하는 과제입니다.

아래에 자세한 요구 사항이 있으니 잘 읽고 요구 사항에 따라 구현해 주세요.

구현 방식은 자유입니다. 구현에 필요한 패키지를 추가해주셔도 됩니다.

https://github.com/mAy-I/frontend-assignment2/assets/64902287/36056362-2162-4daa-bb56-04656ca89577

## 요구 사항

> :bulb: src 폴더 하위에 있는 코드만 수정해 주세요. sever 폴더 하위에 있는 코드는 수정하실 필요가 없습니다.

1. 라인 업데이트

   - 서버는 요청의 결과로 1개 이상의 line을 제공할 수 있습니다.
   - 라인의 좌표는 **1920 X 1080** 해상도를 기준으로 작성되었습니다. 캔버스에 맞게 라인의 좌표를 적절하게 변경해 주세요.

   - **TODO**
     - 최초 로딩 시 서버에서 불러온 라인 데이터를 바탕으로 캔버스에 라인을 그립니다.
     - 라인 추가 버튼을 클릭하면 캔버스에 라인이 그려지고, 리스트에 라인 아이템이 추가됩니다.
     - 라인을 선택하면 리스트에서 해당되는 라인 아이템이 하이라이트 됩니다.
     - 라인을 이동하거나 모양을 변경하면 리스트에서 해당되는 라인 아이템의 좌표 정보가 변경됩니다.
     - 라인을 선택한 후 `Backspace` 키를 누르면 캔버스와 리스트에서 해당 라인이 삭제됩니다.

2. 데이터 저장

   - 서버의 POST/PATCH/DELETE api를 사용해서 데이터를 저장합니다.

   - **TODO**
     - 저장 버튼 클릭 시 추가/삭제/변경된 라인 데이터가 서버에 저장됩니다.

## 실행 방법

> :bulb: `pnpm`을 기반으로 작성된 프로젝트이기 때문에 `pnpm`을 사용하는 것을 권장합니다.

```
// 패키지 설치
pnpm install

// start client
pnpm start:client

// start server
pnpm start:server
```

## Type Definition

> :bulb: 아래 정의된 타입은 [`src/types.ts`](./src/types.ts)에서 확인하실 수 있습니다.

```typescript
interface Point {
  x: number;
  y: number;
}

interface Line {
  id: number;
  coordinates: [Point, Point];
}
```

## API

### GET /lines

Fetches all the lines.

**Response**

- Status: 200 OK

```json
[
  {
    "id": 1,
    "coordinates": [
      { "x": 0, "y": 10 },
      { "x": 100, "y": 20 }
    ]
  },
  {
    "id": 2,
    "coordinates": [
      { "x": 10, "y": 40 },
      { "x": 20, "y": 50 }
    ]
  }
  // ...
]
```

### POST /lines

Creates a new line.

**Request Body**

```json
{
  "coordinates": [
    { "x": 0, "y": 0 },
    { "x": 100, "y": 100 }
  ]
}
```

**Response**

- Status: 200 OK

```json
[
  {
    "id": 1,
    "coordinates": [
      { "x": 10, "y": 40 },
      { "x": 20, "y": 50 }
    ]
  },
  {
    "id": 2,
    "coordinates": [
      { "x": 0, "y": 10 },
      { "x": 100, "y": 20 }
    ]
  }
]
```

### PATCH /lines/:id

Updates a line by its ID.

**Parameters**

- `id`: The ID of the line to update.

**Request Body**

```json
{
  "coordinates": [
    { "x": 50, "y": 50 },
    { "x": 150, "y": 150 }
  ]
}
```

**Response**

- Status: 200 OK

```json
{
  "id": 1,
  "coordinates": [
    { "x": 50, "y": 50 },
    { "x": 150, "y": 150 }
  ]
}
```

### DELETE /lines/:id

Deletes a line by its ID.

**Parameters**

- `id`: The ID of the line to delete.

**Response**

- Status: 200 OK

```json
{}
```

# 캔버스 관련 클래스

## Renderer

### interface

```ts
class Renderer {
  /**
   * @param canvasElement
   */
  constructor(canvasElement: HTMLCanvasElement): void;

  /**
   * 여러 개의 LineShape을 추가합니다.
   *
   * @param shapes 추가할 shape의 배열입니다.
   * @param options skipFireEvent가 true일 경우 renderable:added 이벤트를 발생시키지 않습니다.
   */
  public add(shapes: LineShape[], options?: { skipFireEvent?: boolean }): void;

  /**
   * 여러 개의 LineShape을 제거합니다.
   *
   * @param shapes 제거할 shape의 배열입니다.
   * @param options skipFireEvent가 true일 경우 renderable:removed 이벤트를 발생시키지 않습니다.
   */
  public remove(
    shapes: LineShape[],
    options?: { skipFireEvent?: boolean }
  ): void;

  /**
   * 렌더링된 모든 shape을 반환합니다.
   */
  public getShapes<T extends LineShape = LineShape>(): T[];

  /**
   * 선택된 shape을 반환합니다.
   *
   * @returns 현재 활성화된 LineShape 객체를 반환하거나, 없는 경우 null을 반환합니다.
   */
  public getActiveShape<T extends LineShape = LineShape>(): T | null;

  /**
   * 이벤트 리스너를 추가합니다.
   * @param type "renderable:added" | "renderable:removed" | "modified" | "modifying" | "selection:updated
   * @param listener `RendererEventListener<type>` 타입의 함수입니다.
   */
  public addListener<T extends keyof EventRecord>(
    type: T,
    listener: (e: EventRecord[T]) => void
  ): void;

  /**
   * 이벤트 리스너를 제거합니다.
   * @param type "renderable:added" | "renderable:removed" | "modified" | "modifying" | "selection:updated
   * @param listener `RendererEventListener<type>` 타입의 함수입니다.
   */
  public removeListener<T extends keyof EventRecord>(
    type: T,
    listener: (e: EventRecord[T]) => void
  ): void;
}
```

```ts
/**
 * 추가 / 수정 / 삭제 이벤트입니다.
 *
 * `target`은 이벤트를 발생시킨 대상으로 추가 / 수정 / 삭제된 `LineShape`입니다.
 */
export interface RenderableEvent {
  target: LineShape;
}

/**
 * 선택 이벤트입니다.
 *
 * - `prev`: 이전에 선택되었던 LineShape 객체. 아무것도 선택되지 않았었다면 null
 * - `next`: 새롭게 선택된 LineShape 객체. 아무것도 선택되지 않았다면 null
 */
export interface SelectionEvent {
  prev: LineShape | null;
  next: LineShape | null;
}

type EventRecord = {
  "renderable:added": RenderableEvent;
  "renderable:removed": RenderableEvent;
  modified: RenderableEvent;
  modifying: RenderableEvent;
  "selection:updated": SelectionEvent;
};

export type RendererEventListener<T extends keyof EventRecord> = (
  e: EventRecord[T]
) => void;
```

### example

```ts
const canvasRef = useRef<HTMLCanvasElement>(null);
const renderer = new Renderer(canvasRef.current);

// 라인 추가, 이벤트 발행
renderer.add([shape]);

// 라인 삭제, 이벤트 생략
renderer.remove([shape], { skipFireEvent: true });

// 모든 라인 삭제
renderer.remove(renderer.getShapes());

// 현재 선택된 라인
const selectedLineShape: LineShape | null = renderer.getActiveShape();

// 이벤트 리스너 등록 및 삭제
const onModified: RendererEventListener<"modified"> = (e) => {
  console.log(e.target);
};
renderer.addListener("modified", onModified);
renderer.removeListener("modified", onModified);
```

## LineShape

### interface

```ts
type DefaultData = Record<string, any>;

class LineShape<Data extends DefaultData = DefaultData> {
  /**
   * `LineShape`에 저장할 데이터입니다.
   */
  public data: Data;

  /**
   * @param options
   * - `coordinates`: [Point, Point]
   * - `data`: `LineShape`에 저장할 데이터입니다.
   */
  constructor(options: { coordinates: [Point, Point]; data?: Data });

  /**
   * `LineShape`의 좌표입니다.
   */
  get coordinates(): [Point, Point];
}
```

### example

```ts
const lineShape = new LineShape({
  data: {
    id: 1,
  },
  coordinates: [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
  ],
});
renderer.add([lineShape]);

const lineId = lineShape.data.id;
```

## 기타

### interface

```ts
interface Point {
  x: number;
  y: number;
}
```

## 문의

과제를 진행하시다 문제가 발생하거나 문의 사항이 있으면 `나인하이어`를 통해서 연락해 주세요.
