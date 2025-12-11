export function formatDate(d: string | Date) {
  const dt = new Date(d);
  return dt.toLocaleDateString("pt-BR");
}

export function formatNumber(n: number) {
  return n.toLocaleString("pt-BR");
}
