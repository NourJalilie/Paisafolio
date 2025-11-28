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

// ===== SISTEMA DE PÁGINAS INTERNAS DE PLANETAS =====

// Click en planetas
document.querySelectorAll('.planet-link').forEach(planet => {
  planet.addEventListener('click', (e) => {
    const page = planet.dataset.page;
    
    // Si no tiene data-page, es un link normal (como la casita)
    if (!page) return;
    
    // Prevenir navegación
    e.preventDefault();

    // Ocultar el universo (el contenedor de planetas)
    const universeSection = document.querySelector('.section-inner');
    universeSection.style.display = 'none';

    // Ocultar todas las páginas internas
    document.querySelectorAll('.planet-page').forEach(p => {
      p.classList.remove('active');
    });

    // Mostrar la página correcta
    const targetPage = document.querySelector(`#page-${page}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  });
});

// Botones "Volver al Universo"
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Ocultar todas las páginas internas
    document.querySelectorAll('.planet-page').forEach(p => {
      p.classList.remove('active');
    });

    // Mostrar el universo de nuevo
    const universeSection = document.querySelector('.section-inner');
    universeSection.style.display = 'block';
  });
});