export interface RenderableEvent {
    target: LineShape;
}
export interface SelectionEvent {
    prev: LineShape | null;
    next: LineShape | null;
}
declare type EventRecord = {
    "renderable:added": RenderableEvent;
    "renderable:removed": RenderableEvent;
    modified: RenderableEvent;
    modifying: RenderableEvent;
    "selection:updated": SelectionEvent;
};
export declare type RendererEventListener<T extends keyof EventRecord> = (e: EventRecord[T]) => void;
export declare class Renderer {
    private core;
    private eventListenerMap;
    constructor(canvasElement: HTMLCanvasElement);
    addListener<T extends keyof EventRecord>(type: T, listener: (e: EventRecord[T]) => void): void;
    removeListener<T extends keyof EventRecord>(type: T, listener: (e: EventRecord[T]) => void): void;
    add(shapes: LineShape[], options?: {
        skipFireEvent?: boolean;
    }): void;
    remove(shapes: LineShape[], options?: {
        skipFireEvent?: boolean;
    }): void;
    getShapes<T extends LineShape = LineShape>(): T[];
    getActiveShape<T extends LineShape = LineShape>(): T | null;
}
declare type DefaultData = Record<string, any>;
export declare class LineShape<Data extends DefaultData = DefaultData> {
    data: Data;
    constructor(options: {
        coordinates: [Point, Point];
        data?: Data;
    });
    get coordinates(): [Point, Point];
}
interface Point {
    x: number;
    y: number;
}
export {};
