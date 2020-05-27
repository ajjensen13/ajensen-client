export class RelativeDimensions {
  offsetHeight: number;
  offsetWidth: number;
  offsetLeft: number;
  offsetTop: number;

  constructor(init?: Partial<RelativeDimensions>) {
    Object.assign(this, init);
  }
}
