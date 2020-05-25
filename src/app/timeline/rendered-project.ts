export class RenderedProject {
  offsetHeight: number;
  offsetWidth: number;
  offsetLeft: number;
  offsetTop: number;
  color: string;

  constructor(init?: Partial<RenderedProject>) {
    Object.assign(this, init);
  }
}
