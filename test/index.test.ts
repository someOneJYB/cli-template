import { advancedAlgorithm } from '@/index';

describe('advancedAlgorithm', () => {
  it('should throw error for empty input', () => {
    expect(() => advancedAlgorithm({ input: [] })).toThrow('Input array cannot be empty');
  });
});