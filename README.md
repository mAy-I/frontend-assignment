## Point

```typescript
type Point = [number, number];
```

## Zone

```typescript
interface Zone {
  label: string;
  polygon: Point[];
}
```

### Example

## Line

```typescript
interface Line {
  label: string;
  line: [Point, Point];
  direction: [string, string];
}
```

### Example

## DomainResponseBody

```typescript
interface Response {
  size: [number, number];
  zones: Zone[];
  lines: Line[];
}
```
