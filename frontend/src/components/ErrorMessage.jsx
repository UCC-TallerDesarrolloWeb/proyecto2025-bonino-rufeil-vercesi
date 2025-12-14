// src/components/ErrorMessage.jsx

/**
 * Muestra un mensaje de error simple.
 * @param {{text: string}} props
 */
export default function ErrorMessage({ text }) {
  if (!text) return null;
  return (
    <p >
      {text}
    </p>
  );
}
