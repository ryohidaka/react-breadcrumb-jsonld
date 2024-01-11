/**
 * Throws an error if the given URL is not an absolute path.
 * @param url - The URL to check.
 * @param index - The position of the breadcrumb.
 */
export const validateAbsolutePath = (url: string, index: number): void => {
  if (!isAbsolutePath(url)) {
    throw new Error(
      `Invalid URL: position ${index + 1}: ${url} must be absolute paths.`,
    );
  }
};

/**
 * Checks if the given URL is an absolute path.
 * @param url - The URL to check.
 * @returns True if the URL is an absolute path, false otherwise.
 */
const isAbsolutePath = (url: string): boolean => {
  return url.startsWith("http://") || url.startsWith("https://");
};
