export const fromUnixToDate = (seconds: string): string => {
  return new Date(parseInt(seconds) * 1000).toLocaleString();
};

export const fromUnixToShortDate = (seconds: string): string => {
  return new Date(parseInt(seconds) * 1000).toLocaleDateString();
};
