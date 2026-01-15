export default class Cookie {
  constructor() {
    throw new Error("Cookie class cannot be instantiated.");
  }

  static get(name) {
    name = encodeURIComponent(name);
    const cookies = document.cookie.split("; ");
    for (let item of cookies) {
      const [cookieName, cookieValue] = item.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  }

  static set(name, value, { maxAge, domain, path, secure } = {}) {
    let res = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

    typeof maxAge === "number" && (res += `max-age=${maxAge};`);

    domain && (res += `domain=${domain};`);

    path && (res += `path=${path};`);

    secure && (res += `secure;`);

    document.cookie = res;
  }

  static remove(name, { domain, path } = {}) {
    this.set(name, "", { domain, path, maxAge: -1 });
    return true;
  }
}
