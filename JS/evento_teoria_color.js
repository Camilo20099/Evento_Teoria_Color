// ── PSYCH CARDS DATA ──
const psychData = [
  { color: '#c0392b', name: 'Rojo',        traits: ['Poder', 'Pasión', 'Energía', 'Peligro'] },
  { color: '#ea580c', name: 'Naranja',     traits: ['Creatividad', 'Entusiasmo', 'Calidez', 'Confianza'] },
  { color: '#d97706', name: 'Amarillo',    traits: ['Felicidad', 'Optimismo', 'Juventud', 'Alegría'] },
  { color: '#16a34a', name: 'Verde',       traits: ['Naturaleza', 'Salud', 'Calma', 'Prosperidad'] },
  { color: '#2563b5', name: 'Azul',        traits: ['Confianza', 'Seguridad', 'Limpieza', 'Fuerza'] },
  { color: '#7c3aed', name: 'Morado',      traits: ['Realeza', 'Sofisticado', 'Lujo', 'Misterio'] },
  { color: '#db2777', name: 'Rosa',        traits: ['Feminidad', 'Amor', 'Romanticismo', 'Sentimiento'] },
  { color: '#9d174d', name: 'Rojo-Violeta',traits: ['Pasión oscura', 'Drama', 'Audacia', 'Intensidad'] },
];

const row = document.getElementById('psych-row');
psychData.forEach(d => {
  const col = document.createElement('div');
  col.className = 'col-6 col-md-3 col-lg-3 mb-3';
  col.innerHTML = `
    <div style="border-top:5px solid ${d.color};padding:1rem;background:rgba(255,255,255,0.05);">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
        <span style="width:14px;height:14px;border-radius:50%;background:${d.color};display:inline-block"></span>
        <span style="font-family:'Space Mono',monospace;font-size:0.7rem;letter-spacing:0.1em;color:rgba(245,240,232,0.9);text-transform:uppercase">${d.name}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.25rem">${
        d.traits
          .map(t => `<span style="font-size:0.72rem;color:rgba(245,240,232,0.6)">${t}</span>`)
          .join('<span style="color:rgba(245,240,232,0.25);font-size:0.7rem">·</span>')
      }</div>
    </div>
  `;
  row.appendChild(col);
});

// ── LIGHTBOX ──
const lb    = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('active');
  });
});

document.getElementById('lightbox-close').addEventListener('click', () => lb.classList.remove('active'));
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('active'); });

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.theory-card, .harmony-item, .def-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
