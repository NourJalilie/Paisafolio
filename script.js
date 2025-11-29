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

// ===== ESPERAR A QUE CARGUE EL DOM =====
document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. CLICK EN PLANETAS =====
  document.querySelectorAll('.planet-link').forEach(planet => {
    planet.addEventListener('click', (e) => {
      const page = planet.dataset.page;
      
      // Si no tiene data-page, es un link normal (como "Sobre mi")
      if (!page) return;
      
      // Prevenir navegación
      e.preventDefault();

      console.log('Mostrando planeta:', page);

      // Ocultar universo
      const universeView = document.querySelector('.universe-view');
      if (universeView) {
        universeView.style.display = 'none';
      }

      // Ocultar todas las páginas
      document.querySelectorAll('.planet-page, .project-page').forEach(p => {
        p.style.display = 'none';
      });

      // Mostrar el planeta seleccionado
      const targetPage = document.querySelector(`#page-${page}`);
      if (targetPage) {
        targetPage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // ===== 2. CLICK EN PROYECTOS =====
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', () => {
      const projectId = link.dataset.project;
      
      console.log('Mostrando proyecto:', projectId);

      // Ocultar todo
      document.querySelectorAll('.planet-page, .project-page').forEach(p => {
        p.style.display = 'none';
      });

      // Mostrar el proyecto
      const projectPage = document.querySelector(`#proj-${projectId}`);
      if (projectPage) {
        projectPage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Proyecto mostrado');
      } else {
        console.error('No se encontró el proyecto:', `#proj-${projectId}`);
      }
    });
  });

  // ===== 3. BOTONES VOLVER =====
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentPage = btn.closest('.planet-page, .project-page');

      console.log('Click en volver desde:', currentPage ? currentPage.id : 'desconocido');

      // CASO 1: Estamos en un PROYECTO
      if (currentPage && currentPage.classList.contains('project-page')) {
        const parentPlanet = currentPage.dataset.parent;
        console.log('Volver al planeta:', parentPlanet);

        // Ocultar proyecto
        currentPage.style.display = 'none';

        // Mostrar planeta padre
        const planetPage = document.querySelector(`.planet-page[data-planet="${parentPlanet}"]`);
        if (planetPage) {
          planetPage.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // CASO 2: Estamos en un PLANETA
      if (currentPage && currentPage.classList.contains('planet-page')) {
        console.log('Volver al universo');

        // Ocultar todo
        document.querySelectorAll('.planet-page, .project-page').forEach(p => {
          p.style.display = 'none';
        });

        // Mostrar universo
        const universe = document.querySelector('.universe-view');
        if (universe) {
          universe.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    });
  });

});