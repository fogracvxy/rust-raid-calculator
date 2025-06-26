export type ClassNames<T extends string> = {
  [K in T]?: string;
};
