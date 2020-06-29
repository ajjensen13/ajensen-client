export class Box {
  constructor(init?: Partial<Box>) {
    Object.assign(this, init);
  }

  height: number;
  width: number;
  left: number;
  top: number;

  static fromHTMLElement(el: HTMLElement): Box {
    return new Box({
      height: el.offsetHeight,
      width: el.offsetWidth,
      left: el.offsetLeft,
      top: el.offsetTop,
    });
  }

  equals(other: Box): boolean {
    return other &&
      this.height === other.height &&
      this.width === other.width &&
      this.left === other.left &&
      this.top === other.top;
  }

  hasFiniteDimensions(): boolean {
    return Number.isFinite(this.height) &&
      Number.isFinite(this.width) &&
      Number.isFinite(this.top) &&
      Number.isFinite(this.left);
  }
}
