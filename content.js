// === Utilitários ===

function isRed(color) {
  return (
    color.toLowerCase() === "rgb(255, 0, 0)" ||
    color.toLowerCase() === "#ff0000"
  );
}

function aplicarNovaCor(elem, novaCor) {
  const estilo = getComputedStyle(elem);
  let alterado = false;

  if (isRed(estilo.color)) {
    elem.style.color = novaCor;
    alterado = true;
  }
  if (isRed(estilo.backgroundColor)) {
    elem.style.backgroundColor = novaCor;
    alterado = true;
  }
  if (isRed(estilo.borderColor)) {
    elem.style.borderColor = novaCor;
    alterado = true;
  }

  if (alterado) {
    elem.classList.add("cor-substituida");
  }
}

function substituirVermelhoPor(novaCor) {
  document.querySelectorAll("*").forEach(elem => aplicarNovaCor(elem, novaCor));
}

function ativarModoClaro() {
  if (document.getElementById("modo-claro-style")) return;

  const estilo = document.createElement("style");
  estilo.id = "modo-claro-style";
  estilo.textContent = `
    html, body {
      background-color: #fefefe !important;
      color: #111 !important;
    }

    *:not(.cor-substituida),
    *:not(.cor-substituida)::before,
    *:not(.cor-substituida)::after {
      background-color: #ffffff !important;
      color: #111 !important;
      border-color: #ccc !important;
    }

    header, nav, .navbar, .menu, .topbar {
      background-color: #ffffff !important;
      border-bottom: 1px solid #ddd !important;
    }

    .card, .video, .video-item, .box, .container, .panel {
      background-color: #ffffff !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
      border-radius: 6px !important;
      padding: 8px !important;
    }

    a:not(.cor-substituida) {
      color: #0066cc !important;
    }

    /* Corrigido: só estiliza botões que NÃO foram modificados */
    button:not(.cor-substituida),
    .btn:not(.cor-substituida) {
      background-color: #e0e0e0 !important;
      color: #000 !important;
      border: 1px solid #ccc !important;
    }

    button:not(.cor-substituida):hover,
    .btn:not(.cor-substituida):hover {
      background-color: #d5d5d5 !important;
    }

    img, video {
      filter: none !important;
    }
  `;
  document.head.appendChild(estilo);
}

function desativarModoClaro() {
  const estilo = document.getElementById("modo-claro-style");
  if (estilo) estilo.remove();
}

// === Execução principal ===

chrome.storage.sync.get(["newColor", "lightMode"], ({ newColor, lightMode }) => {
  const corEscolhida = newColor || "#00bfff";

  substituirVermelhoPor(corEscolhida);

  if (lightMode) {
    ativarModoClaro();
  } else {
    desativarModoClaro();
  }
});

