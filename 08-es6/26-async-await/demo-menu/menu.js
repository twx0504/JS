export class Menu {
  constructor(el, url) {
    this.el = el;
    this.url = url;
  }

  async getData() {
    const res = await fetch(this.url);
    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error(`HTTP status ${res.status}: ${res.statusText}`);
    }
  }

  async render() {
    const data = await this.getData();
    let html = `<ul>`;
    for (const { category_id, title } of data) {
      html += `
        <li data-id="${category_id}" data-done="false">
          ${title}
          <div class="content">
            <img
              src="./assets/loading-svg/loading-balls.svg"
              alt="loding加载"
            />
          </div>
        </li>
        `;
    }
    html += "</ul>";
    this.el.innerHTML = html;
  }
}

export class SubMenu extends Menu {
  constructor(el, url) {
    super(el, url);
  }

  hasDone() {
    return this.el.parentElement.dataset.done === "true";
  }

  async render() {
    const data = await this.getData();

    let html = "";

    for (const { id, product_image, product_name, product_desc } of data) {
      html += `
        <p>
          <img src="${product_image}" alt="${product_desc}" />
          <a href="${product_image}">${product_name}</a>
        </p>
    `;
    }

    this.el.innerHTML = html;
    this.el.parentElement.dataset.done = "true";
  }
}
