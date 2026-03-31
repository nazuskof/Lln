document.addEventListener('DOMContentLoaded', () => {
  const LOGO_COUNT = 32;
  const LOGO_SIZE = 80;
  const MIN_SPEED = 30;
  const MAX_SPEED = 150;
  const LOGO_SRC = 'assets/IMG_0703.png';

  const scene = document.getElementById('scene');
  const logos = [];
  let sceneWidth = window.innerWidth;
  let sceneHeight = window.innerHeight;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function createLogos() {
    for (let i = 0; i < LOGO_COUNT; i++) {
      const speed = random(MIN_SPEED, MAX_SPEED);
      const angle = Math.random() * 2 * Math.PI;

      const logo = {
        el: document.createElement('img'),
        x: random(0, sceneWidth - LOGO_SIZE),
        y: random(0, sceneHeight - LOGO_SIZE),
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
      };

      logo.el.src = LOGO_SRC;
      logo.el.className = 'bouncing-logo';
      logo.el.style.width = LOGO_SIZE + 'px';
      logo.el.style.height = LOGO_SIZE + 'px';
      logo.el.draggable = false;

      scene.appendChild(logo.el);
      logos.push(logo);
    }
  }

  function update(dt) {
    for (const logo of logos) {
      logo.x += logo.vx * dt;
      logo.y += logo.vy * dt;

      if (logo.x <= 0) {
        logo.x = 0;
        logo.vx *= -1;
      } else if (logo.x + LOGO_SIZE >= sceneWidth) {
        logo.x = sceneWidth - LOGO_SIZE;
        logo.vx *= -1;
      }

      if (logo.y <= 0) {
        logo.y = 0;
        logo.vy *= -1;
      } else if (logo.y + LOGO_SIZE >= sceneHeight) {
        logo.y = sceneHeight - LOGO_SIZE;
        logo.vy *= -1;
      }

      logo.el.style.transform =
        'translate(' + logo.x + 'px,' + logo.y + 'px)';
    }
  }

  let lastTime = 0;

  function animate(timestamp) {
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 1 / 60;
    lastTime = timestamp;
    update(dt);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    sceneWidth = window.innerWidth;
    sceneHeight = window.innerHeight;
    for (const logo of logos) {
      if (logo.x + LOGO_SIZE > sceneWidth) logo.x = sceneWidth - LOGO_SIZE;
      if (logo.y + LOGO_SIZE > sceneHeight) logo.y = sceneHeight - LOGO_SIZE;
    }
  });

  createLogos();
  requestAnimationFrame(animate);
});
