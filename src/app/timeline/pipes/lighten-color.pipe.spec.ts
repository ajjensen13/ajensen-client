import { LightenColorPipePipe } from './lighten-color.pipe';

describe('ColorPipe', () => {
  it('create an instance', () => {
    const pipe = new LightenColorPipePipe();
    expect(pipe).toBeTruthy();
  });
});
