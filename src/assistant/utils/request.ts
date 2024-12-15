export async function request<T>({
  url = "",
  options = {},
  retries = 2,
  delay = 2000,
  timeout = 8000
}: {
  url: string;
  options?: RequestInit;
  retries?: number;
  delay?: number;
  timeout?: number;
}): Promise<T> {
  const controller = new AbortController();
  const { signal } = controller;
  options.signal = signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const fetchPromise = await fetch(url, options)
    .then(async (response) => {
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} - ${response.statusText}`
        );
      }

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("json")) {
        return await response.json();
      }

      if (
        contentType?.includes("image") ||
        contentType?.includes("video") ||
        contentType?.includes("audio") ||
        contentType?.includes("octet-stream")
      ) {
        return await response.blob();
      }

      return await response.text();
    })
    .catch(async (error) => {
      clearTimeout(timeoutId);
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return request<T>({
          url,
          options,
          retries: retries - 1,
          delay,
          timeout
        });
      }
      throw error;
    });

  return fetchPromise;
}
