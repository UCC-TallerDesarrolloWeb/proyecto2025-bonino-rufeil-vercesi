// src/components/ErrorMessage.jsx

/**
 * Muestra un mensaje de error simple.
 * @param {{text: string}} props
 */
export default function ErrorMessage({ text }) {
  if (!text) return null;
  return (
    <p style={{ color: "red", marginTop: "0.5rem" }}>
      {text}
    </p>
  );
}
