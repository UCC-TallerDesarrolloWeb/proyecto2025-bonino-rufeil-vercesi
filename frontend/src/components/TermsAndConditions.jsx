import { useState, useEffect } from "react";
import { fetchTermsAndConditions } from "@api/fetchTerms";

export default function TermsAndConditions() {
  const [terms, setTerms] = useState("");  // Aquí guardaremos el texto de los términos
  const [loading, setLoading] = useState(true);  // Indicador de carga
  const [error, setError] = useState("");  // Para manejar errores

  useEffect(() => {
    const getTerms = async () => {
      setLoading(true);
      try {
        const termsText = await fetchTermsAndConditions();
        setTerms(termsText);
      } catch (err) {
        console.log(err)
        setError("No se pudieron cargar los términos.");
      } finally {
        setLoading(false);
      }
    };

    getTerms();
  }, []); // Se ejecuta solo una vez, cuando se monta el componente

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Términos y Condiciones</h2>
      <p>{terms}</p>
    </div>
  );
}
