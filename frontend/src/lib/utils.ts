export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchRequest = fetch(url, { ...options, signal: controller.signal });

  return Promise.race([
    fetchRequest,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]).finally(() => clearTimeout(timeoutId));
};
