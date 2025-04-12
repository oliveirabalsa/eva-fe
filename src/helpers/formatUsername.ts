export const formatUsername = (value: string): string => {
  return value.toLowerCase().replace(/\s+/g, "_");
};
