export function serializeForDirtyCheck(value: unknown): string {
  return JSON.stringify(value, (_key, current) => {
    if (typeof current === "object" && current !== null && "updatedAt" in current) {
      const { updatedAt: _updatedAt, ...rest } = current as Record<string, unknown>;
      return rest;
    }
    return current;
  });
}

export function isDirtyState<T>(initial: T, current: T): boolean {
  return serializeForDirtyCheck(initial) !== serializeForDirtyCheck(current);
}
