import { IsNicknamePipe } from './is-nickname.pipe';

describe('IsNicknamePipe', () => {
  it('create an instance', () => {
    const pipe = new IsNicknamePipe();
    expect(pipe).toBeTruthy();
  });
});
