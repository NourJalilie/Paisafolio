// ===== LOADER =====
let loadComplete = false;
let minTimeElapsed = false;

window.addEventListener('load', function() {
  loadComplete = true;
  hideLoaderIfReady();
});

setTimeout(function() {
  minTimeElapsed = true;
  hideLoaderIfReady();
}, 1500);

function hideLoaderIfReady() {
  const loader = document.getElementById('page-loader');
  if (loader && loadComplete && minTimeElapsed) {
    loader.classList.add('hidden');
  }
}

// ===== SISTEMA DE PÁGINAS INTERNAS =====

// Click en planetas
document.querySelectorAll('.planet-link').forEach(planet => {
  planet.addEventListener('click', (e) => {
    const page = planet.dataset.page;
    
    // Si no tiene data-page, es un link normal (como "Sobre mi")
    if (!page) return;
    
    // Prevenir navegación
    e.preventDefault();

    // Ocultar la vista del universo
    const universeView = document.querySelector('.universe-view');
    if (universeView) {
      universeView.style.display = 'none';
    }

    // Ocultar todas las páginas internas
    document.querySelectorAll('.planet-page').forEach(p => {
      p.style.display = 'none';
    });

    // Mostrar la página seleccionada
    const targetPage = document.querySelector(`#page-${page}`);
    if (targetPage) {
      targetPage.style.display = 'block';
    }
  });
});

// Botones "Volver al Universo"
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Ocultar todas las páginas internas
    document.querySelectorAll('.planet-page').forEach(p => {
      p.style.display = 'none';
    });

    // Mostrar la vista del universo
    const universeView = document.querySelector('.universe-view');
    if (universeView) {
      universeView.style.display = 'block';
    }
  });
});