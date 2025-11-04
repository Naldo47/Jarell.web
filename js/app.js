(function() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  let idx = 0;
  let intervalId = null;
  const delay = 4500; // ms entre slides
  let isRunning = false;

  const show = (i) => {
    slides.forEach((s, j) => {
      s.classList.toggle('is-active', j === i);
    });
  };

  const start = () => {
    if (isRunning) return;
    isRunning = true;
    intervalId = setInterval(() => {
      idx = (idx + 1) % slides.length;
      show(idx);
    }, delay);
  };

  const stop = () => {
    if (!isRunning) return;
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
  };

  // Inicial
  show(idx);
  start();

  // Contenedor (puede ser null si no existe)
  const container = document.querySelector('.slideshow-container');

  // Usar pointer/touch para compatibilidad móvil/desktop
  if (container) {
    container.addEventListener('pointerenter', stop);
    container.addEventListener('pointerleave', start);

    // touch events: en algunos móviles pointer events no se disparan como esperas
    container.addEventListener('touchstart', stop, {passive: true});
    container.addEventListener('touchend', () => {
      // dar pequeño retraso para que el gesto termine
      setTimeout(start, 100);
    }, {passive: true});
  }

  // Si el usuario hace scroll — reintentar reiniciar (debounced)
  let scrollTimeout = null;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // si por alguna razón no está corriendo, reiniciamos
      if (!isRunning) start();
    }, 150);
  }, {passive: true});

  // Si vuelve la pestaña, aseguramos que se reanude
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // pequeña espera para evitar race conditions
      setTimeout(() => { if (!isRunning) start(); }, 100);
    } else {
      // opcional: pausar si pestaña oculta
      stop();
    }
  });

  // Seguridad: si por error el interval se pierde, reiniciar cada X segundos si no corre
  setInterval(() => {
    if (!isRunning) start();
  }, 5000);

})();





