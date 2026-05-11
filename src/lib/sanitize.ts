import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes a string to prevent XSS attacks.
 * @param text The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitize(text: string): string {
  if (!text) return "";
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [], // No HTML allowed by default for plain text inputs
    ALLOWED_ATTR: [],
  });
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
