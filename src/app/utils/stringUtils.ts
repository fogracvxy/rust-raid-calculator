// utils/stringUtils.ts

export const truncateMessage = (message: string, limit: number): string => {
  if (message.length <= limit) return message;
  const truncated = message.slice(0, limit);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  if (lastSpaceIndex === -1) return truncated + "...";
  return truncated.slice(0, lastSpaceIndex) + "...";
};
