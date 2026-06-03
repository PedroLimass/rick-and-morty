import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado no documento.");
}

ReactDOM.createRoot(rootElement).render(
  // TODO(Fase 3): reativar o StrictMode após tornar a camada de dados idempotente.
  // Hoje os efeitos de busca mutam o state (ex.: splice) e dependem de tamanhos
  // fixos; com o double-invoke do StrictMode em dev, isso duplica dados e quebra imagens.
  <App />
);
