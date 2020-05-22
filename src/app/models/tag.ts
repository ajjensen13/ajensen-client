export class Tag {
  id: string;
  title: string;
  hyperlink: string;

  constructor(init?: Partial<Tag>) {
    Object.assign(this, init);
  }
}
