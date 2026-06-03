export const handleStatus = (status?: string): string | undefined => {
  if (status === "Alive") return "green";
  if (status === "unknown") return "yellow";
  if (status === "Dead") return "red";
  return undefined;
};
