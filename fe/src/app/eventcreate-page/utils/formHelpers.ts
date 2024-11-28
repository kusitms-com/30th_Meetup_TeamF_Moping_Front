export const cleanString = (value: string): string => value.trim();

export const isValidLength = (value: string, minLength: number): boolean =>
  value.length >= minLength;

export const generateDefaultEventName = (
  location: string | undefined
): string => (location ? `${location} 모임` : "");
