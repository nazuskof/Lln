document.addEventListener('DOMContentLoaded', () => {
  const LOGO_COUNT = 18;
  const MIN_SIZE = 40;
  const MAX_SIZE = 120;
  const MIN_SPEED = 30;
  const MAX_SPEED = 150;
  const LOGO_SRC = 'assets/logo.png';

  const scene = document.getElementById('scene');
  const logos = [];
  let sceneWidth = window.innerWidth;
  let sceneHeight = window.innerHeight;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function createLogos() {
    for (let i = 0; i < LOGO_COUNT; i++) {
      const size = random(MIN_SIZE, MAX_SIZE);
      const speed = random(MIN_SPEED, MAX_SPEED);
      const angle = Math.random() * 2 * Math.PI;

      const logo = {
        el: document.createElement('img'),
        x: random(0, sceneWidth - size),
        y: random(0, sceneHeight - size),
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        size: size,
        rotation: random(0, 360),
        rotationSpeed: random(-90, 90),
      };

      logo.el.src = LOGO_SRC;
      logo.el.className = 'bouncing-logo';
      logo.el.style.width = size + 'px';
      logo.el.style.height = size + 'px';
      logo.el.draggable = false;

      scene.appendChild(logo.el);
      logos.push(logo);
    }
  }

  function update(dt) {
    for (const logo of logos) {
      logo.x += logo.vx * dt;
      logo.y += logo.vy * dt;
      logo.rotation += logo.rotationSpeed * dt;

      if (logo.x <= 0) {
        logo.x = 0;
        logo.vx *= -1;
      } else if (logo.x + logo.size >= sceneWidth) {
        logo.x = sceneWidth - logo.size;
        logo.vx *= -1;
      }

      if (logo.y <= 0) {
        logo.y = 0;
        logo.vy *= -1;
      } else if (logo.y + logo.size >= sceneHeight) {
        logo.y = sceneHeight - logo.size;
        logo.vy *= -1;
      }

      logo.el.style.transform =
        'translate(' + logo.x + 'px,' + logo.y + 'px) rotate(' + logo.rotation + 'deg)';
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
      if (logo.x + logo.size > sceneWidth) logo.x = sceneWidth - logo.size;
      if (logo.y + logo.size > sceneHeight) logo.y = sceneHeight - logo.size;
    }
  });

  createLogos();
  requestAnimationFrame(animate);
});
