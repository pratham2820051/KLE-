/**
 * Formats a numeric patient ID to KLE-001 format
 * e.g. 1 → "KLE-001", 12 → "KLE-012", 123 → "KLE-123"
 */
export const formatPatientId = (id) => {
  if (!id && id !== 0) return "—";
  return `KLE-${String(id).padStart(3, "0")}`;
};
