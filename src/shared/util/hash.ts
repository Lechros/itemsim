let seq = 1;
const ids = new WeakMap<object, string>();

export function getObjectHash(obj: object) {
  if (ids.has(obj)) {
    return ids.get(obj)!;
  }
  const id = String(seq++);
  ids.set(obj, id);
  return id;
}
