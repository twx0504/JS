export class Progress {
  constructor(el) {
    this.el = el;
  }

  update(loaded, total) {
    this.el.style.width = `${((loaded / total) * 100).toFixed(0)}%`;
    this.el.textContent = `${((loaded / total) * 100).toFixed(0)}%`;
  }

  hide() {
    this.el.parentElement.style.display = "none";
  }
}
