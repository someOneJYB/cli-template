export interface StoreOptions<T> {
  initialState: T;
  persist?: boolean;
  version?: string;
}

export interface AlgorithmParams {
  input: number[];
  threshold?: number;
  maxIterations?: number;
}