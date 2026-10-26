/**
 * Sanitizes a string to prevent basic XSS attacks without relying on JSDOM.
 * @param text The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitize(text: string): string {
  if (!text || typeof text !== 'string') return "";
  // Strip basic HTML tags and encode characters
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Sanitizes an object by recursively sanitizing all string properties.
 */
export function sanitizeObject<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  const sanitized = {} as any;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as any)[key];
      if (typeof value === "string") {
        sanitized[key] = sanitize(value);
      } else if (typeof value === "object") {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  return sanitized as T;
}
