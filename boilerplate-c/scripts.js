const map = L.map('map').setView([52, 21], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

document.getElementById('locBtn').onclick = () => {
  navigator.geolocation.getCurrentPosition(
  p => {
    const lat = p.coords.latitude;
    const lon = p.coords.longitude;

    map.setView([lat, lon], 15);

  },
  err => {
    alert("Błąd lokalizacji: " + err.message);
    console.log(err);
  }
);
};

Notification.requestPermission();

const s = document.createElement('script');
s.src = 'https://unpkg.com/leaflet-image/leaflet-image.js';
document.body.appendChild(s);


document.getElementById('downloadBtn').onclick = () => {
  leafletImage(map, function (err, canvas) {
    if (err) {
      console.error(err);
      return;
    }

    const img = canvas.toDataURL();
    createPuzzle(img);
  });
};

function createPuzzle(img) {
  const board = document.getElementById('board');
  const pieces = document.getElementById('pieces');

  board.innerHTML = '';
  pieces.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const s = document.createElement('div');
    s.className = 'slot';
    s.dataset.i = i;

    s.ondragover = e => e.preventDefault();
    s.ondrop = e => {
      const id = e.dataTransfer.getData('id');
      const el = document.getElementById(id);
      s.innerHTML = '';
      s.appendChild(el);
      check();
    };

    board.appendChild(s);
  }

  let arr = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const t = document.createElement('div');
      const i = y * 4 + x;

      t.className = 'tile';
      t.id = 't' + i;
      t.draggable = true;
      t.dataset.i = i;

      t.style.backgroundImage = `url(${img})`;
      t.style.backgroundPosition = `-${x*100}px -${y*100}px`;

      t.ondragstart = e => e.dataTransfer.setData('id', t.id);

      arr.push(t);
    }
  }

  arr.sort(() => Math.random() - 0.5);
  arr.forEach(t => pieces.appendChild(t));
}

function check() {
  const slots = document.querySelectorAll('.slot');
  let ok = true;

  slots.forEach(s => {
    if (!s.firstChild || s.firstChild.dataset.i !== s.dataset.i) {
      ok = false;
    }
  });
  
  if (ok) {
    if (Notification.permission === "granted") {
      new Notification('Gotowe!');
    } else {
      alert('Gotowe!');
    }
  }
}