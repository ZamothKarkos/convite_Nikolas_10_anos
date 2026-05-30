
const guests = {
    "3847": "João e Família",
    "6192": "Jamerson e Família",
    "4728": "Clemerson e Família",
    "9351": "Pedro Júnior e Família",
    "2064": "Allan e Família",
    "7519": "Valdinéia",
    "8436": "Francisco e Família",
    "1273": "Lídio e Família",
    "5908": "Fabiano e Edna",
    "6742": "Rúbens e Família",
    "3185": "Geraldo e Família",
    "9627": "Bruno e Família",
    "4053": "Jorge e Famíliaa",
    "8345": "Leticia Bruna"
};

const boxes = [0, 1, 2, 3].map(i => document.getElementById('p' + i));
const msg = document.getElementById('pinMsg');
const sec = document.getElementById('guestSection');

function resetGuest() {
    sec.innerHTML = '<div class="guest-badge">🌟 Convidado de Honra 🌟</div>';
}

function showError() {
    msg.textContent = '✕ Código inválido. Tente novamente.';
    msg.className = 'pin-msg';
    boxes.forEach(b => { b.classList.add('error'); setTimeout(() => b.classList.remove('error'), 400); });
    setTimeout(() => { boxes.forEach(b => { b.value = ''; b.classList.remove('filled'); }); boxes[0].focus(); msg.textContent = ''; }, 1100);
    resetGuest();
}

function checkCode() {
    const code = boxes.map(b => b.value).join('');
    if (code.length < 4) return;
    const name = guests[code];
    if (name) {
        msg.textContent = '✓ Bem-vindo(a)!';
        msg.className = 'pin-msg ok';
        sec.innerHTML = `<div class="guest-badge">🌟 Convidado de Honra 🌟</div><div class="guest-name">👨‍🚀 ${name}</div>`;
    } else {
        showError();
    }
}

boxes.forEach((box, idx) => {
    box.addEventListener('input', () => {
        let v = box.value.replace(/\D/g, '');
        if (v.length > 1) v = v.slice(-1);
        box.value = v;
        box.classList.toggle('filled', v !== '');
        if (v && idx < 3) boxes[idx + 1].focus();
        if (boxes.every(b => b.value !== '')) checkCode();
        else { msg.textContent = ''; resetGuest(); }
    });

    box.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !box.value && idx > 0) {
            boxes[idx - 1].value = '';
            boxes[idx - 1].classList.remove('filled');
            boxes[idx - 1].focus();
            msg.textContent = '';
            resetGuest();
        }
    });
});

// ── Stars ──
const sf = document.getElementById('starfield');
const count = window.innerWidth < 400 ? 100 : 180;
for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.2 + 0.4;
    s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--dur:${(Math.random() * 4 + 2).toFixed(1)}s;--delay:${(Math.random() * 4).toFixed(1)}s;opacity:${(Math.random() * .5 + .1).toFixed(2)}`;
    sf.appendChild(s);
}
for (let i = 0; i < 4; i++) {
    const ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.cssText = `--x:${Math.random() * 60}%;--dur:${(Math.random() * 6 + 8).toFixed(1)}s;--delay:${(Math.random() * 10).toFixed(1)}s`;
    document.body.appendChild(ss);
}
