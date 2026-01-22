/**
 *
 * @param  {...any} args
 * @returns
 */
export default function (...args) {
  const ALLOWED_RESPONSE_TYPES = [
    "",
    "json",
    "text",
    "blob",
    "arrayBuffer",
    "document",
  ];

  const ALLOWED_REQUEST_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "HEAD",
    "PATCH",
  ];

  let userConfig = null;

  const defaultConfig = {
    method: "GET",
    url: "",
    headers: {},
    data: null,
    responseType: "json",
    timeout: null,
    withCredentials: false,
  };

  if (args.length === 1 && args[0] !== null && typeof args[0] === "object") {
    userConfig = args[0] || {};
  } else if (args.length === 2 || args.length === 3) {
    const method = args[0].toUpperCase();
    const url = args[1];
    const extraConfig = args[2] || {};

    if (ALLOWED_REQUEST_METHODS.includes(method)) {
      extraConfig.method = method;
    } else {
      throw new TypeError(
        `Invalid HTTP method: "${method}. Allowed methods: ${ALLOWED_REQUEST_METHODS.join(",")}. Ensure you are using ajax(method, url) form if it is what you intend to do.`,
      );
    }

    if (URL.canParse(url)) {
      extraConfig.url = url;
    } else {
      throw new TypeError(`Ìnvalid URL: ${url}`);
    }

    userConfig = extraConfig;
  } else {
    throw new TypeError(
      `
        Invalid arguments. Use one of the following forms:
          1) ajax(method, url)
          2) ajax(method, url, config)
          3) ajax(config)
      `,
    );
  }

  const finalizedConfig = { ...defaultConfig, ...userConfig };

  const { method, url, headers, data, responseType, timeout, withCredentials } =
    finalizedConfig;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      const headerMap = {};
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        const headersString = xhr.getAllResponseHeaders();
        const headersArr = headersString.trim().split(/[\r\n]+/);

        headersArr.forEach((header) => {
          const parts = header.split(": ");
          const headerName = parts[0];
          const headerValue = parts[1];
          headerMap[headerName] = headerValue;
        });

        resolve({
          status: xhr.status,
          statusText: xhr.statusText,
          data: xhr.response,
          config: finalizedConfig,
          headers: headerMap,
        });
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.response,
        });
      }
    });

    xhr.addEventListener("timeout", () => {
      reject({
        status: 408,
        statusText: "Request Timeout",
        response: null,
      });
    });

    xhr.open(method, url);

    if (headers) {
      for (const key of Object.keys(headers)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    if (ALLOWED_RESPONSE_TYPES.includes(responseType)) {
      xhr.responseType = responseType;
    }

    if (Number.isInteger(timeout) && timeout >= 0) {
      xhr.timeout = timeout;
    }

    xhr.withCredentials = Boolean(withCredentials);

    xhr.send(data);
  });
}
