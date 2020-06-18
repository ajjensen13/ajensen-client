export class RelativeDimensions {

  constructor(init?: Partial<RelativeDimensions>) {
    Object.assign(this, init);
  }
  offsetHeight: number;
  offsetWidth: number;
  offsetLeft: number;
  offsetTop: number;

  static fromHTMLElement(el: HTMLElement): RelativeDimensions {
    return new RelativeDimensions({
      offsetHeight: el.offsetHeight,
      offsetWidth: el.offsetWidth,
      offsetLeft: el.offsetLeft,
      offsetTop: el.offsetTop,
    });
  }

  equals(other: RelativeDimensions): boolean {
    return other &&
      this.offsetHeight === other.offsetHeight &&
      this.offsetWidth === other.offsetWidth &&
      this.offsetLeft === other.offsetLeft &&
      this.offsetTop === other.offsetTop;
  }

  hasFiniteDimensions(): boolean {
    return Number.isFinite(this.offsetHeight) &&
      Number.isFinite(this.offsetWidth) &&
      Number.isFinite(this.offsetTop) &&
      Number.isFinite(this.offsetLeft);
  }
}
