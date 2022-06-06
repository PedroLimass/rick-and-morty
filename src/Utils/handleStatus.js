export const handleStatus = (status) => {
  if (status === "Alive") return "green";
  if (status === "unknown") return "yellow";
  if (status === "Dead") return "red";
};
