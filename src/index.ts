import { AlgorithmParams } from "./types";

export const advancedAlgorithm = (params: AlgorithmParams): number => {
  const { input, threshold = 0.01, maxIterations = 1000 } = params;
  
  if (!input.length) throw new Error('Input array cannot be empty');
  
  let result = input.reduce((sum, val) => sum + val, 0);
  let prev: number;
  let iterations = 0;
  
  do {
    prev = result;
    result = Math.sqrt(result);
    iterations++;
  } while (Math.abs(result - prev) > threshold && iterations < maxIterations);

  return Number(result.toFixed(4));
};