export function createFetchWithTimeout(timeout = 0) {
  // Validate type
  if (typeof timeout !== "number") {
    throw new TypeError(
      `Timeout must be a number, received type:${typeof timeout}`,
    );
  }

  // Validate finite number (not NaN or Infinity)
  if (!Number.isFinite(timeout)) {
    throw new TypeError(
      `Timeout must be finite number (not NaN or Infinity), received ${timeout}`,
    );
  }

  // Validate range
  if (timeout < 0) {
    throw new RangeError(`Timeout must be >= 0, received ${timeout}ms`);
  }

  // No timeout needed - return native fetch
  if (timeout === 0) return fetch;

  return function (url, options) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();

      options = options || {};
      const originalSignal = options.signal;

      // Forward user's abort signal to internal controller
      if (originalSignal) {
        originalSignal.addEventListener("abort", () => {
          controller.abort(
            new DOMException(`User cancelled the request`, "AbortError"),
          );
        });
      }

      options.signal = controller.signal;

      let timeoutId = setTimeout(() => {
        reject(
          new DOMException(
            `Request timeout after ${timeout}ms`,
            "TimeoutError",
          ),
        );

        controller.abort();
      }, timeout);

      fetch(url, options)
        .then(resolve, reject)
        .finally(() => {
          clearTimeout(timeoutId);
          timeoutId = null;
        });
    });
  };
}

// const request1 = createFetchWithTimeout(3000);
// const request2 = createFetchWithTimeout(5000);
