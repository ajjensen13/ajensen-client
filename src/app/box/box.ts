export class Box {
  constructor(init?: Partial<Box>) {
    Object.assign(this, init);
  }

  height?: number;
  width?: number;
  left?: number;
  top?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;

  static fromHTMLElement(el: HTMLElement): Box | undefined {
    if (typeof getComputedStyle !== 'function') {
      return undefined;
    }

    let marginTop: number | undefined;
    let marginRight: number | undefined;
    let marginBottom: number | undefined;
    let marginLeft: number | undefined;

    const computedStyle = getComputedStyle(el);
    marginTop = parseFloat(computedStyle.getPropertyValue('margin-top'));
    marginRight = parseFloat(computedStyle.getPropertyValue('margin-right'));
    marginBottom = parseFloat(computedStyle.getPropertyValue('margin-bottom'));
    marginLeft = parseFloat(computedStyle.getPropertyValue('margin-left'));

    return new Box({
      height: el.offsetHeight,
      width: el.offsetWidth,
      left: el.offsetLeft,
      top: el.offsetTop,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft
    });
  }

  equals(other: Box): boolean {
    return other &&
      this.height === other.height &&
      this.width === other.width &&
      this.left === other.left &&
      this.top === other.top &&
      this.marginTop === other.marginTop &&
      this.marginRight === other.marginRight &&
      this.marginBottom === other.marginBottom &&
      this.marginLeft === other.marginLeft
      ;
  }
}
