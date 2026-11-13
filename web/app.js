'use strict';

const shapes = {
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-7h6v7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-14 5h2m3 0h2m3 0h1"/>',
  leaf: '<path d="M20 4c-8 0-14 3-14 10a5 5 0 0 0 5 5c7 0 10-6 9-15Z"/><path d="M4 21c2-4 5-7 10-10"/>',
  wallet: '<path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6"/><path d="M21 12h-5a2 2 0 0 0 0 4h5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 6-3 6-3 8h18c0-2-3-2-3-8M10 20a2 2 0 0 0 4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/>',
  bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 6h18m-12 0v2m6-2v2"/>',
  book: '<path d="M4 19V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14M8 7h8"/>',
  coffee: '<path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm12 1h2a2 2 0 0 1 0 4h-2M3 21h17M8 3v2m4-2v2"/>',
  water: '<path d="M12 3c3 4 7 8 7 12a7 7 0 0 1-14 0c0-4 4-8 7-12Z"/><path d="M8 15c0 2 1 3 3 3"/>',
  move: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  zap: '<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0m-4 4h.01"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-3 0h6"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  signal: '<path d="M4 20v-3m5 3v-7m5 7V9m5 11V4"/>',
  flame: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-7-5-9 0 4-2 4-2 4-2-2-2-5-1-8-5 4-6 8-6 13a7 7 0 0 0 7 7Z"/>',
  pencil: '<path d="m15 6 3 3M4 20l4-1 12-12a2.1 2.1 0 0 0-3-3L5 16z"/>',
  trash: '<path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  sparkles: '<path d="m12 3 1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9L12 3z"/><path d="M19 16l.9 2.2 2.1.9-2.1.9-.9 2.2-.9-2.2-2.1-.9 2.1-.9.9-2.2z"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M12 2v6M8 2h8"/>',
};
const brandArt = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M3 13h4v7H3zm7-5h4v12h-4zm7-5h4v17h-4z"/></svg>';
const agendaTypes = {
  pribadi: { label: 'Pribadi', icon: 'coffee', color: 'sage' },
  kuliah: { label: 'Kuliah', icon: 'book', color: 'lavender' },
  bisnis: { label: 'Bisnis', icon: 'bag', color: 'peach' },
  lainnya: { label: 'Lainnya', icon: 'calendar', color: 'gold' },
};
const habitTypes = {
  kesehatan: { label: 'Kesehatan', icon: 'water', color: 'sage' },
  belajar: { label: 'Belajar', icon: 'book', color: 'lavender' },
  aktivitas: { label: 'Aktivitas', icon: 'move', color: 'peach' },
  lainnya: { label: 'Lainnya', icon: 'leaf', color: 'gold' },
};
const billTypes = {
  internet: { label: 'Internet', icon: 'wifi', color: 'lavender' },
  listrik: { label: 'Listrik', icon: 'zap', color: 'gold' },
  pdam: { label: 'PDAM', icon: 'water', color: 'sage' },
  lainnya: { label: 'Lainnya', icon: 'wallet', color: 'peach' },
};
const products = {
  pulsa: { label: 'Pulsa', icon: 'phone', color: 'peach', choices: [['Rp10.000', 10000], ['Rp25.000', 25000], ['Rp50.000', 50000]] },
  data: { label: 'Paket data', icon: 'signal', color: 'lavender', choices: [['3 GB · 7 hari', 18000], ['8 GB · 30 hari', 45000], ['15 GB · 30 hari', 69000]] },
  token: { label: 'Token PLN', icon: 'zap', color: 'gold', choices: [['Rp20.000', 20000], ['Rp50.000', 50000], ['Rp100.000', 100000]] },
  pln: { label: 'Tagihan PLN', icon: 'zap', color: 'peach', bill: 145000 },
  internet: { label: 'Internet', icon: 'wifi', color: 'lavender', bill: 250000 },
  pdam: { label: 'PDAM', icon: 'water', color: 'sage', bill: 75000 },
};
const routes = {
  ringkasan: { label: 'Ringkasan', icon: 'home' },
  jadwal: { label: 'Jadwal', icon: 'calendar' },
  kebiasaan: { label: 'Kebiasaan', icon: 'leaf' },
  tagihan: { label: 'Tagihan & PPOB', icon: 'wallet' },
};
const storageKey = 'ritme-planner-v1';
const content = document.querySelector('#content');
const dialog = document.querySelector('#dialog');
const toast = document.querySelector('#toast');
const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const jakartaDate = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' });
const fullDate = new Intl.DateTimeFormat('id-ID', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
const shortDate = new Intl.DateTimeFormat('id-ID', { timeZone: 'UTC', day: 'numeric', month: 'short' });
const weekday = new Intl.DateTimeFormat('id-ID', { timeZone: 'UTC', weekday: 'short' });
let today = jakartaDate.format(new Date());
let agendaDate = today;
let habitDate = today;
let storageAvailable = true;
let noticeTimer;
let submitDialog;
let currentSimulation;
let state = readState();

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
}

function safe(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function asDate(value) {
  return new Date(`${value}T00:00:00Z`);
}

function shifted(value, amount) {
  const date = asDate(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

function starterState() {
  const previousDay = shifted(today, -1);
  const twoDaysAgo = shifted(today, -2);
  return {
    agenda: [
      { id: 'a1', title: 'Review pesanan JStore', date: today, time: '09:00', type: 'bisnis', done: true, sample: true },
      { id: 'a2', title: 'Kerjakan tugas kuliah', date: today, time: '13:00', type: 'kuliah', done: false, sample: true },
      { id: 'a3', title: 'Jalan sore', date: today, time: '17:00', type: 'pribadi', done: false, sample: true },
    ],
    habits: [
      { id: 'h1', title: 'Minum 8 gelas air', type: 'kesehatan', days: [today, previousDay, twoDaysAgo], sample: true },
      { id: 'h2', title: 'Baca 10 halaman', type: 'belajar', days: [previousDay, twoDaysAgo], sample: true },
      { id: 'h3', title: 'Gerak 20 menit', type: 'aktivitas', days: [twoDaysAgo], sample: true },
    ],
    bills: [
      { id: 'b1', title: 'Internet rumah', type: 'internet', date: shifted(today, 2), amount: 250000, paid: false, sample: true },
      { id: 'b2', title: 'Listrik rumah', type: 'listrik', date: shifted(today, 5), amount: 150000, paid: false, sample: true },
    ],
    simulations: [],
    notes: [],
  };
}

function readState() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const saved = JSON.parse(raw);
      if (['agenda', 'habits', 'bills', 'simulations'].every((key) => Array.isArray(saved[key]))) return { ...saved, notes: Array.isArray(saved.notes) ? saved.notes : [] };
    }
    const initial = starterState();
    localStorage.setItem(storageKey, JSON.stringify(initial));
    return initial;
  } catch {
    storageAvailable = false;
    return starterState();
  }
}

function save(message, focus) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  render();
  if (dialog.open && dialog.querySelector('#dialog-title')?.textContent === 'Pemberitahuan & Pengingat') {
    openNotifications();
  }
  if (focus) document.querySelector(`[data-focus="${CSS.escape(focus)}"]`)?.focus({ preventScroll: true });
  if (message) showToast(storageAvailable ? message : 'Perubahan aktif untuk sesi ini. Penyimpanan browser tidak tersedia.');
}

function showToast(message) {
  clearTimeout(noticeTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  noticeTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

function routeName() {
  const slug = location.hash.slice(1);
  return Object.hasOwn(routes, slug) ? slug : 'ringkasan';
}

function button(label, action, glyph = '', options = {}) {
  const { variant = '', id = '', title = '', focus = '' } = options;
  return `<button type="button" class="btn ${variant}" data-action="${action}" data-id="${safe(id)}" data-focus="${safe(focus)}"${title ? ` aria-label="${safe(title)}" title="${safe(title)}"` : ''}>${glyph ? icon(glyph) : ''}${label}</button>`;
}

function miniLink(label, route) {
  return `<a class="mini-link" href="#${route}">${label} ${icon('arrow')}</a>`;
}

function symbol(type) {
  return `<span class="symbol ${type.color}">${icon(type.icon)}</span>`;
}

function checkButton(action, item, isDone, date = '') {
  const itemName = date ? `${item.title}, ${fullDate.format(asDate(date))}` : item.title;
  return `<button type="button" class="check" data-action="${action}" data-id="${safe(item.id)}" data-date="${date}" data-focus="${action}-${safe(item.id)}-${date}" aria-label="${safe(itemName)}" title="${safe(itemName)}" aria-pressed="${isDone}">${isDone ? icon('check') : ''}</button>`;
}

function editButton(action, item) {
  return `<button type="button" class="ghost" data-action="${action}" data-id="${safe(item.id)}" data-focus="${action}-${safe(item.id)}" aria-label="Ubah ${safe(item.title)}" title="Ubah ${safe(item.title)}">${icon('pencil')}</button>`;
}

function agendaFor(date) {
  return state.agenda.filter((item) => item.date === date).sort((a, b) => (a.time || '24:00').localeCompare(b.time || '24:00'));
}

function sortedBills() {
  return [...state.bills].sort((a, b) => Number(a.paid) - Number(b.paid) || a.date.localeCompare(b.date));
}

function dueSoon() {
  const end = shifted(today, 7);
  return sortedBills().filter((item) => !item.paid && item.date <= end);
}

function notificationCount() {
  const pendingAgenda = agendaFor(today).filter((item) => !item.done).length;
  const pendingHabits = state.habits.filter((item) => !item.days.includes(today)).length;
  const bills = dueSoon().length;
  return pendingAgenda + pendingHabits + bills;
}

function openNotifications() {
  const pendingAgenda = agendaFor(today).filter((item) => !item.done);
  const pendingHabits = state.habits.filter((item) => !item.days.includes(today));
  const bills = dueSoon();
  const total = pendingAgenda.length + pendingHabits.length + bills.length;

  let body = '';
  if (!total) {
    body = '<p class="empty" style="text-align:center;padding:24px 0;">🎉 Semua agenda dan kebiasaan hari ini sudah tuntas, dan tidak ada tagihan jatuh tempo dalam 7 hari ke depan.</p>';
  } else {
    body = `
      <div style="display:grid;gap:18px;">
        ${pendingAgenda.length ? `
          <div>
            <h3 style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Agenda Hari Ini (${pendingAgenda.length})</h3>
            <div class="entry-list">${pendingAgenda.map((item) => agendaEntry(item, false)).join('')}</div>
          </div>
        ` : ''}
        ${pendingHabits.length ? `
          <div>
            <h3 style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Kebiasaan Hari Ini (${pendingHabits.length})</h3>
            <div class="entry-list">${pendingHabits.map(habitEntry).join('')}</div>
          </div>
        ` : ''}
        ${bills.length ? `
          <div>
            <h3 style="font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Pengingat Tagihan (${bills.length})</h3>
            <div class="entry-list">${bills.map((item) => billEntry(item, false)).join('')}</div>
          </div>
        ` : ''}
      </div>
    `;
  }
  modal('Pemberitahuan & Pengingat', body, cancel());
}

function streak(item) {
  let count = 0;
  const dates = new Set(item.days);
  let date = dates.has(today) ? today : shifted(today, -1);
  while (dates.has(date)) {
    count += 1;
    date = shifted(date, -1);
  }
  return count;
}

function agendaEntry(item) {
  const type = agendaTypes[item.type] || agendaTypes.pribadi;
  return `<div class="entry ${item.done ? 'is-done' : ''}">
    <span class="time">${safe(item.time || '–')}</span>${symbol(type)}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span></div>
    <span class="tag category ${type.color}">${type.label}</span>
    ${checkButton('toggle-agenda', item, item.done)}
    <div class="entry-actions">
      <button type="button" class="action-btn edit" data-action="edit-agenda" data-id="${safe(item.id)}" title="Ubah ${safe(item.title)}">${icon('pencil')}<span>Ubah</span></button>
      <button type="button" class="action-btn delete" data-action="delete-item" data-id="agenda|${safe(item.id)}" title="Hapus ${safe(item.title)}">${icon('trash')}<span>Hapus</span></button>
    </div>
  </div>`;
}

function habitEntry(item) {
  const done = item.days.includes(today);
  const count = streak(item);
  return `<div class="entry habit ${done ? 'is-done' : ''}">
    ${symbol(habitTypes[item.type] || habitTypes.kesehatan)}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span><small>${count ? `${count} hari berturut-turut` : 'Belum ada rangkaian hari'}${done ? ' · Selesai hari ini' : ''}</small></div>
    ${checkButton('toggle-habit', item, done, today)}
    <div class="entry-actions">
      <button type="button" class="action-btn edit" data-action="edit-habit" data-id="${safe(item.id)}" title="Ubah ${safe(item.title)}">${icon('pencil')}<span>Ubah</span></button>
      <button type="button" class="action-btn delete" data-action="delete-item" data-id="habits|${safe(item.id)}" title="Hapus ${safe(item.title)}">${icon('trash')}<span>Hapus</span></button>
    </div>
  </div>`;
}

function billDescription(item) {
  if (item.paid) return 'Sudah dibayar';
  if (item.date < today) return `Lewat jatuh tempo · ${shortDate.format(asDate(item.date))}`;
  if (item.date === today) return 'Jatuh tempo hari ini';
  return `Jatuh tempo ${shortDate.format(asDate(item.date))}`;
}

function billEntry(item) {
  return `<div class="entry ${item.paid ? 'is-paid' : ''}">
    ${symbol(billTypes[item.type] || billTypes.internet)}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span><small>${billDescription(item)}</small></div>
    <span class="amount">${rupiah.format(item.amount)}</span>
    ${checkButton('toggle-bill', { ...item, title: `Status lunas ${item.title}` }, item.paid)}
    <div class="entry-actions">
      <button type="button" class="action-btn edit" data-action="edit-bill" data-id="${safe(item.id)}" title="Ubah ${safe(item.title)}">${icon('pencil')}<span>Ubah</span></button>
      <button type="button" class="action-btn delete" data-action="delete-item" data-id="bills|${safe(item.id)}" title="Hapus ${safe(item.title)}">${icon('trash')}<span>Hapus</span></button>
    </div>
  </div>`;
}

function shell(route) {
  document.querySelector('#sidebar').innerHTML = `
    <a class="brand" href="#ringkasan" aria-label="Ritme, ringkasan"><span class="brand-mark">${brandArt}</span><span class="wordmark">Ritme</span></a>
    <nav class="navigation" aria-label="Navigasi utama">
      <p class="nav-label">Menu</p>
      ${Object.entries(routes).map(([slug, item]) => `<a class="nav-link" href="#${slug}"${slug === route ? ' aria-current="page"' : ''}>${icon(item.icon)}<span>${item.label}</span></a>`).join('')}
    </nav>
    <div class="side-bottom">
      <p class="storage-note">${icon('lock')} <span>Tersimpan di browser ini</span></p>
      <div class="profile"><span class="avatar">J</span><div><strong>Jihad</strong><small>Ruang pribadi</small></div></div>
    </div>`;
  document.querySelector('#topbar').innerHTML = `
    <span class="topbar-title"><span class="brand-mark">${brandArt}</span>${routes[route].label}</span>
    <div class="topbar-actions">
      ${button('Asisten Gemini', 'open-agent', 'mic', {variant: 'agent-cta', focus: 'open-agent'})}
      <a class="btn" href="#jadwal" data-action="today-link">${icon('calendar')} ${shortDate.format(asDate(today))}</a>
      <button type="button" class="btn icon" data-action="open-notifications" data-focus="open-notifications" aria-label="Pemberitahuan & Pengingat" title="Pemberitahuan & Pengingat">${icon('bell')}${notificationCount() ? '<span class="dot"></span>' : ''}</button>
    </div>`;
}

function empty(message) {
  return `<p class="empty">${message}</p>`;
}

function stat(route, glyph, color, value, label) {
  return `<a class="stat" href="#${route}">${symbol({ icon: glyph, color })}<span><strong>${value}</strong><small>${label}</small></span></a>`;
}

function panelHead(title, sub, actions = '') {
  return `<div class="panel-head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${actions}</div>`;
}

function dashboard() {
  const agenda = agendaFor(today);
  const completed = state.habits.filter((item) => item.days.includes(today)).length;
  const bills = dueSoon();
  const todayLabel = fullDate.format(asDate(today));
  const pendingAgenda = agenda.find((item) => !item.done);
  return `
    <section class="hero" aria-labelledby="greeting">
      <div class="hero-content">
        <div class="eyebrow">${icon('calendar')} ${todayLabel}</div>
        <h1 id="greeting">Halo, Jihad.</h1>
        <p>Atur jadwal, bangun kebiasaan baik, dan pantau tagihanmu.</p>
        ${button('Tambah jadwal', 'new-agenda-today', 'plus', { variant: 'primary', focus: 'hero-add' })}
      </div>
      ${pendingAgenda ? `<a class="hero-agenda" href="#jadwal" data-action="today-link">
        ${symbol({ icon: 'calendar', color: 'peach' })}
        <div>
          <small>Agenda belum selesai</small>
          <strong>${safe(pendingAgenda.title)}</strong>
          ${pendingAgenda.time ? `<small class="hero-time">${safe(pendingAgenda.time)} WIB</small>` : ''}
        </div>
      </a>` : ''}
    </section>
    <section class="stats" aria-label="Ringkasan hari ini">
      ${stat('jadwal', 'calendar', 'peach', `${agenda.filter((item) => item.done).length}/${agenda.length}`, 'Jadwal selesai')}
      ${stat('kebiasaan', 'leaf', 'lavender', `${completed}/${state.habits.length}`, 'Kebiasaan selesai')}
      ${stat('tagihan', 'wallet', 'gold', bills.length, 'Tagihan perlu dicek')}
    </section>
    <div class="dashboard-grid">
      <section class="panel">
        ${panelHead('Agenda hari ini', '', miniLink('Buka jadwal', 'jadwal'))}
        <div class="entry-list">${agenda.slice(0, 4).map((item) => agendaEntry(item)).join('') || empty('Belum ada jadwal hari ini.')}</div>
      </section>
      <section class="panel">
        ${panelHead('Kebiasaan hari ini', '', miniLink('Lihat progres', 'kebiasaan'))}
        <div class="entry-list">${state.habits.slice(0, 4).map(habitEntry).join('') || empty('Tambahkan kebiasaan yang ingin kamu latih.')}</div>
        ${state.habits.length ? `<div class="progress-caption"><span>Progres hari ini</span><span>${Math.round(100 * completed / state.habits.length)}%</span></div><progress aria-label="Progres kebiasaan hari ini" value="${completed}" max="${state.habits.length}"></progress>` : ''}
      </section>
      <section class="panel bills-panel">
        ${panelHead('Pengingat tagihan', 'Tagihan terlambat atau jatuh tempo dalam 7 hari.', miniLink('Buka tagihan & PPOB', 'tagihan'))}
        <div class="bill-preview-grid">${bills.slice(0, 4).map((item) => billEntry(item)).join('') || empty('Tidak ada tagihan yang perlu dicek.')}</div>
      </section>
    </div>`;
}

function pageHead(title, sub, action) {
  return `<header class="page-heading"><div><h1>${title}</h1><p>${sub}</p></div>${action}</header>`;
}

function agendaPage() {
  return `
    ${pageHead('Jadwal', 'Susun agenda kuliah, bisnis, dan kegiatan pribadi.', button('Tambah jadwal', 'new-agenda', 'plus', { variant: 'primary', focus: 'agenda-add' }))}
    <section class="panel">
      <div class="date-bar">
        <h2>${fullDate.format(asDate(agendaDate))}${agendaDate === today ? ' · Hari ini' : ''}</h2>
        <div class="actions">
          ${button('', 'date-back', 'back', { variant: 'icon', title: 'Hari sebelumnya', focus: 'date-back' })}
          <input type="date" id="agenda-date" min="1901-01-01" max="2099-12-31" value="${agendaDate}" aria-label="Pilih tanggal jadwal">
          ${button('', 'date-next', 'next', { variant: 'icon', title: 'Hari berikutnya', focus: 'date-next' })}
          ${button('Hari ini', 'date-today', '', { focus: 'date-today' })}
        </div>
      </div>
      <div class="entry-list section-list">${agendaFor(agendaDate).map((item) => agendaEntry(item, true)).join('') || empty('Belum ada agenda pada tanggal ini.')}</div>
    </section>`;
}

function habitsPage() {
  const dates = Array.from({ length: 7 }, (_, index) => shifted(habitDate, index - 6));
  const headings = dates.map((date) => `<th scope="col"${date === today ? ' class="active-day"' : ''}>${weekday.format(asDate(date))}<br>${shortDate.format(asDate(date))}</th>`).join('');
  const rows = state.habits.map((item) => {
    const cells = dates.map((date) => `<td>${checkButton('toggle-habit', item, item.days.includes(date), date)}</td>`).join('');
    return `<tr><th scope="row"><span class="entry-name">${safe(item.title)}</span></th>${cells}<td><span class="tag gold">${icon('flame')} ${streak(item)} hari</span></td><td><div class="entry-actions"><button type="button" class="action-btn edit" data-action="edit-habit" data-id="${safe(item.id)}" title="Ubah ${safe(item.title)}">${icon('pencil')}<span>Ubah</span></button><button type="button" class="action-btn delete" data-action="delete-item" data-id="habits|${safe(item.id)}" title="Hapus ${safe(item.title)}">${icon('trash')}<span>Hapus</span></button></div></td></tr>`;
  }).join('');
  const forwardDisabled = habitDate >= today ? ' disabled' : '';
  return `
    ${pageHead('Kebiasaan', 'Centang kebiasaan yang kamu lakukan setiap hari.', button('Tambah kebiasaan', 'new-habit', 'plus', { variant: 'primary', focus: 'habit-add' }))}
    <section class="panel">
      <div class="date-bar">
        <div><h2>Catatan 7 hari</h2><p class="legend">${shortDate.format(asDate(dates[0]))} – ${shortDate.format(asDate(habitDate))} ${asDate(habitDate).getUTCFullYear()}</p></div>
        <div class="actions">
          ${button('', 'habit-back', 'back', { variant: 'icon', title: 'Minggu sebelumnya', focus: 'habit-back' })}
          <button type="button" class="btn icon" data-action="habit-next" data-focus="habit-next" aria-label="Minggu berikutnya" title="Minggu berikutnya"${forwardDisabled}>${icon('next')}</button>
          ${button('7 hari terakhir', 'habit-today', '', { focus: 'habit-today' })}
        </div>
      </div>
      ${rows ? `<div class="scroll-area" tabindex="0" aria-label="Tabel kebiasaan"><table class="habit-calendar"><thead><tr><th scope="col">Kebiasaan</th>${headings}<th scope="col">Beruntun</th><th scope="col">Aksi</th></tr></thead><tbody>${rows}</tbody></table></div>` : empty('Belum ada kebiasaan yang dilacak.') }
    </section>`;
}

function billsPage() {
  const bills = sortedBills();
  const history = [...state.simulations].reverse();
  return `
    ${pageHead('Tagihan & PPOB', 'Catat jatuh tempo dan lacak status pembayaranmu.', button('Tambah tagihan', 'new-bill', 'plus', { variant: 'primary', focus: 'bill-add' }))}
    <div class="stack">
      <section class="panel">
        ${panelHead('Daftar tagihan', 'Centang tagihan setelah kamu membayarnya.')}
        <div class="entry-list section-list">${bills.map((item) => billEntry(item, true)).join('') || empty('Belum ada tagihan tercatat.')}</div>
      </section>
      <section class="panel">
        ${panelHead('Layanan PPOB', '', '<span class="tag gold">Mode simulasi</span>')}
        <div class="product-grid">${Object.entries(products).map(([id, item]) => `<button type="button" class="product" data-action="sim-start" data-id="${id}" data-focus="product-${id}">${symbol(item)}${item.label}</button>`).join('')}</div>
        <p class="notice">Harga dan nomor pelanggan di sini adalah contoh. Transaksi simulasi tidak memotong saldo atau mengubah status tagihanmu.</p>
      </section>
      <section class="panel">
        ${panelHead('Riwayat simulasi', '')}
        <div class="entry-list">${history.map((item) => `<div class="entry">
          ${symbol(products[item.product])}<div class="entry-main"><span class="entry-name">${products[item.product].label}</span><small>${safe(item.detail)} · ${shortDate.format(asDate(item.date))}</small></div><span class="amount">${rupiah.format(item.total)}</span>
        </div>`).join('') || empty('Belum ada simulasi transaksi.')}</div>
      </section>
    </div>`;
}

function render() {
  const route = routeName();
  const pages = { ringkasan: dashboard, jadwal: agendaPage, kebiasaan: habitsPage, tagihan: billsPage };
  const habitScroll = content.querySelector('.scroll-area')?.scrollLeft;
  document.title = `${routes[route].label} · Ritme`;
  shell(route);
  const sample = ['agenda', 'habits', 'bills'].some((key) => state[key].some((item) => item.sample));
  content.innerHTML = pages[route]() + (sample ? '<footer class="sample-note"><span>Berisi data contoh.</span><button type="button" data-action="clear-samples" data-focus="clear-samples">Hapus data contoh</button></footer>' : '')
    + (!storageAvailable ? '<p class="notice">Penyimpanan browser tidak tersedia. Perubahan hanya aktif untuk sesi ini.</p>' : '');
  const scrollArea = content.querySelector('.scroll-area');
  if (scrollArea) scrollArea.scrollLeft = habitScroll ?? scrollArea.scrollWidth;
}

function modal(title, body, actions, onSubmit) {
  const isOpen = dialog.open;
  submitDialog = onSubmit;
  dialog.className = '';
  dialog.innerHTML = `<form id="modal-form"><div class="dialog-head"><h2 id="dialog-title">${title}</h2>${button('', 'close-modal', 'close', { variant: 'icon', title: 'Tutup' })}</div><div class="dialog-body">${body}</div><div class="dialog-actions">${actions}</div></form>`;
  if (!isOpen) dialog.showModal();
  (dialog.querySelector('[autofocus]') || dialog.querySelector('.dialog-actions button:last-child'))?.focus();
}

const cancel = () => button('Batal', 'close-modal');
const submit = (label) => `<button class="btn primary" type="submit">${label}</button>`;
const field = (label, element) => `<label class="field">${label}${element}</label>`;
const textInput = (name, value, extra = '') => `<input type="text" name="${name}" maxlength="100" value="${safe(value)}" ${extra}>`;
const dateInput = (value) => `<input type="date" name="date" min="1901-01-01" max="2099-12-31" value="${value}" required>`;
const selectType = (types, active) => `<select name="type">${Object.entries(types).map(([key, item]) => `<option value="${key}"${key === active ? ' selected' : ''}>${item.label}</option>`).join('')}</select>`;

function resample(samples, fromRate, toRate) {
  if (fromRate === toRate) return samples;
  const ratio = fromRate / toRate;
  const newLength = Math.round(samples.length / ratio);
  const result = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const pos = i * ratio;
    const index = Math.floor(pos);
    const frac = pos - index;
    const s1 = samples[index] || 0;
    const s2 = samples[index + 1] || s1;
    result[i] = s1 + frac * (s2 - s1);
  }
  return result;
}

function encodeWav(samples, sampleRate = 16000) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46); // RIFF
  view.setUint32(4, 36 + samples.length * 2, true);
  view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45); // WAVE
  view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20); // fmt 
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61); // data
  view.setUint32(40, samples.length * 2, true);

  let maxAmp = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxAmp) maxAmp = abs;
  }
  const gain = (maxAmp > 0.0005 && maxAmp < 0.5) ? Math.min(6, 0.7 / maxAmp) : 1;

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i] * gain));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return { buffer, isSilent: maxAmp < 0.0005 };
}

function executeAgentActions(actions) {
  if (!Array.isArray(actions) || !actions.length) return [];
  const executed = [];

  for (const rawAction of actions) {
    if (!rawAction || typeof rawAction !== 'object') continue;
    const action = {
      ...rawAction,
      ...(rawAction.params || {}),
      ...(rawAction.parameters || {}),
      ...(rawAction.args || {}),
      ...(rawAction.data || {}),
    };

    const type = (action.type || action.kind || action.action || '').toLowerCase();
    const id = action.id;
    const title = String(action.title || action.name || action.activity || action.event || action.task || action.text || '').trim();
    let d = action.date;
    if (d === 'besok' || d === 'tomorrow') d = shifted(today, 1);
    else if (d === 'lusa') d = shifted(today, 2);
    else if (!d || d === 'hari ini' || d === 'today') d = today;
    const date = d;
    const time = action.time || '';
    const amount = Number(action.amount);
    const category = action.category || action.type_category || action.type;
    const route = action.route || action.target || action.page;

    const isAgenda = type.includes('agenda') || type.includes('jadwal') || type.includes('schedule') || type.includes('calendar') || type.includes('event');
    const isHabit = type.includes('habit') || type.includes('kebiasaan');
    const isBill = type.includes('bill') || type.includes('tagihan') || type.includes('invoice') || type.includes('ppob');

    // 1. TAMBAH JADWAL
    if ((type.includes('add') || type.includes('create') || type.includes('new') || type.includes('tambah')) && isAgenda) {
      const entry = {
        id: id || crypto.randomUUID(),
        title: title || 'Kegiatan Baru',
        date: date || today,
        time: time || '',
        type: (category && Object.hasOwn(agendaTypes, category)) ? category : 'pribadi',
        done: false,
      };
      state.agenda.push(entry);
      agendaDate = entry.date;
      executed.push({ type: 'add', label: `Jadwal ditambahkan: ${entry.title}` });
    }

    // 2. HAPUS JADWAL
    else if ((type.includes('delete') || type.includes('remove') || type.includes('hapus') || type.includes('cancel')) && isAgenda) {
      const prevLen = state.agenda.length;
      if (id) {
        state.agenda = state.agenda.filter((a) => a.id !== id);
      } else if (title && title.toLowerCase() !== 'all' && title.toLowerCase() !== 'semua') {
        const query = title.toLowerCase();
        state.agenda = state.agenda.filter((a) => !a.title.toLowerCase().includes(query));
      } else {
        state.agenda = state.agenda.filter((a) => a.date !== today);
      }
      if (state.agenda.length < prevLen) {
        executed.push({ type: 'delete', label: `Jadwal dihapus: ${title || 'Item'}` });
      }
    }

    // 3. UBAH JADWAL
    else if ((type.includes('update') || type.includes('edit') || type.includes('ubah') || type.includes('change')) && isAgenda) {
      const item = state.agenda.find((a) => (id && a.id === id) || (title && a.title.toLowerCase().includes(title.toLowerCase())));
      if (item) {
        if (action.newTitle) item.title = action.newTitle;
        if (date) item.date = date;
        if (time !== undefined) item.time = time;
        if (category && Object.hasOwn(agendaTypes, category)) item.type = category;
        executed.push({ type: 'update', label: `Jadwal diperbarui: ${item.title}` });
      }
    }

    // 4. CENTANG / TOGGLE JADWAL
    else if ((type.includes('toggle') || type.includes('complete') || type.includes('done') || type.includes('finish') || type.includes('centang') || type.includes('selesai') || type.includes('check')) && isAgenda) {
      const item = state.agenda.find((a) => (id && a.id === id) || (title && a.title.toLowerCase().includes(title.toLowerCase())));
      if (item) {
        item.done = action.done !== undefined ? Boolean(action.done) : !item.done;
        executed.push({ type: 'toggle', label: `Jadwal "${item.title}" ditandai ${item.done ? 'selesai' : 'belum selesai'}` });
      }
    }

    // 5. TAMBAH KEBIASAAN
    else if ((type.includes('add') || type.includes('create') || type.includes('tambah')) && isHabit) {
      const entry = {
        id: id || crypto.randomUUID(),
        title: title || 'Kebiasaan Baru',
        type: (category && Object.hasOwn(habitTypes, category)) ? category : 'kesehatan',
        days: [],
      };
      state.habits.push(entry);
      executed.push({ type: 'add', label: `Kebiasaan ditambahkan: ${entry.title}` });
    }

    // 6. HAPUS KEBIASAAN
    else if ((type.includes('delete') || type.includes('remove') || type.includes('hapus')) && isHabit) {
      const prevLen = state.habits.length;
      if (id) {
        state.habits = state.habits.filter((h) => h.id !== id);
      } else if (title) {
        const query = title.toLowerCase();
        state.habits = state.habits.filter((h) => !h.title.toLowerCase().includes(query));
      }
      if (state.habits.length < prevLen) {
        executed.push({ type: 'delete', label: `Kebiasaan dihapus: ${title || 'Item'}` });
      }
    }

    // 7. CENTANG KEBIASAAN
    else if ((type.includes('toggle') || type.includes('check') || type.includes('centang')) && isHabit) {
      const item = state.habits.find((h) => (id && h.id === id) || (title && h.title.toLowerCase().includes(title.toLowerCase())));
      if (item) {
        const d = date || today;
        if (item.days.includes(d)) {
          item.days = item.days.filter((x) => x !== d);
        } else {
          item.days.push(d);
        }
        executed.push({ type: 'toggle', label: `Kebiasaan "${item.title}" dicentang untuk ${d}` });
      }
    }

    // 8. TAMBAH TAGIHAN
    else if ((type.includes('add') || type.includes('create') || type.includes('tambah')) && isBill) {
      const entry = {
        id: id || crypto.randomUUID(),
        title: title || 'Tagihan Baru',
        amount: Number.isFinite(amount) && amount > 0 ? amount : 50000,
        date: date || today,
        type: (category && Object.hasOwn(billTypes, category)) ? category : 'internet',
        paid: false,
      };
      state.bills.push(entry);
      executed.push({ type: 'add', label: `Tagihan ditambahkan: ${entry.title} (${rupiah.format(entry.amount)})` });
    }

    // 9. HAPUS TAGIHAN
    else if ((type.includes('delete') || type.includes('remove') || type.includes('hapus')) && isBill) {
      const prevLen = state.bills.length;
      if (id) {
        state.bills = state.bills.filter((b) => b.id !== id);
      } else if (title) {
        const query = title.toLowerCase();
        state.bills = state.bills.filter((b) => !b.title.toLowerCase().includes(query));
      }
      if (state.bills.length < prevLen) {
        executed.push({ type: 'delete', label: `Tagihan dihapus: ${title || 'Item'}` });
      }
    }

    // 10. BAYAR / TOGGLE TAGIHAN
    else if ((type.includes('toggle') || type.includes('pay') || type.includes('bayar') || type.includes('lunas')) && isBill) {
      const item = state.bills.find((b) => (id && b.id === id) || (title && b.title.toLowerCase().includes(title.toLowerCase())));
      if (item) {
        item.paid = action.paid !== undefined ? Boolean(action.paid) : !item.paid;
        executed.push({ type: 'toggle', label: `Tagihan "${item.title}" ditandai ${item.paid ? 'lunas' : 'belum bayar'}` });
      }
    }

    // 11. NAVIGASI
    else if (type.includes('nav') || type.includes('buka') || type.includes('pindah') || route) {
      let r = (route || title || '').toLowerCase();
      if (r.includes('jadwal') || r.includes('schedule')) r = 'jadwal';
      else if (r.includes('habit') || r.includes('kebiasaan')) r = 'kebiasaan';
      else if (r.includes('bill') || r.includes('tagihan') || r.includes('ppob')) r = 'tagihan';
      else if (r.includes('home') || r.includes('ringkasan') || r.includes('dash')) r = 'ringkasan';
      if (Object.hasOwn(routes, r)) {
        location.hash = '#' + r;
        executed.push({ type: 'navigate', label: `Beralih ke halaman ${routes[r].label}` });
      }
    }

    // 12. HAPUS DATA CONTOH
    else if (type.includes('clear_sample') || type.includes('clear_example') || type.includes('clear')) {
      for (const key of ['agenda', 'habits', 'bills']) {
        state[key] = state[key].filter((e) => !e.sample);
      }
      executed.push({ type: 'delete', label: 'Data contoh dibersihkan' });
    }
  }

  if (executed.length) {
    save(executed.map((e) => e.label).join(' · '));
  }
  return executed;
}

function localAssistantReply(text) {
  const lower = text.toLowerCase();
  const actions = [];

  // 1. Hapus jadwal
  if (lower.includes('hapus') && (lower.includes('jadwal') || lower.includes('agenda'))) {
    const query = lower
      .replace(/^(tolong|coba|bisa|mohon)?\s*hapus\s*(semua)?\s*(jadwal|agenda)\s*/i, '')
      .replace(/(dong|ya|nih|sekarang)/gi, '')
      .trim();

    if (query === 'semua' || query === 'hari ini' || !query) {
      const count = state.agenda.filter((a) => a.date === today).length;
      actions.push({ type: 'delete_agenda', title: 'all' });
      return {
        reply: `Semua jadwal untuk hari ini (${count} item) telah berhasil dihapus.`,
        actions,
      };
    }

    const item = state.agenda.find((a) => a.title.toLowerCase().includes(query));
    if (item) {
      actions.push({ type: 'delete_agenda', id: item.id, title: item.title });
      return {
        reply: `Siap! Jadwal "${item.title}" telah berhasil saya hapus dari daftar jadwalmu.`,
        actions,
      };
    } else {
      return {
        reply: `Saya tidak menemukan jadwal dengan nama "${query}". Coba cek kembali daftar di menu Jadwal.`,
        actions: [],
      };
    }
  }

  // 2. Tandai / centang selesai jadwal
  if ((lower.includes('selesai') || lower.includes('tandai') || lower.includes('centang') || lower.includes('beres')) && (lower.includes('jadwal') || lower.includes('agenda'))) {
    const query = lower.replace(/(tolong|coba|bisa|sudah|tandai|centang|selesai|beres|jadwal|agenda|dong|ya)/gi, ' ').replace(/\s+/g, ' ').trim();
    const item = state.agenda.find((a) => a.title.toLowerCase().includes(query));
    if (item) {
      actions.push({ type: 'toggle_agenda', id: item.id, title: item.title, done: true });
      return {
        reply: `Mantap! Jadwal "${item.title}" sudah ditandai selesai.`,
        actions,
      };
    }
  }

  // 3. Navigasi / buka halaman
  if (lower.startsWith('buka') || lower.includes('halaman') || lower.includes('pindah ke')) {
    if (lower.includes('jadwal')) {
      actions.push({ type: 'navigate', route: 'jadwal' });
      return { reply: 'Membuka halaman Jadwal.', actions };
    }
    if (lower.includes('kebiasaan') || lower.includes('habit')) {
      actions.push({ type: 'navigate', route: 'kebiasaan' });
      return { reply: 'Membuka halaman Kebiasaan.', actions };
    }
    if (lower.includes('tagihan') || lower.includes('ppob')) {
      actions.push({ type: 'navigate', route: 'tagihan' });
      return { reply: 'Membuka halaman Tagihan & PPOB.', actions };
    }
    if (lower.includes('ringkasan') || lower.includes('dashboard') || lower.includes('home')) {
      actions.push({ type: 'navigate', route: 'ringkasan' });
      return { reply: 'Membuka halaman Ringkasan.', actions };
    }
  }

  // 4. Hapus kebiasaan
  if (lower.includes('hapus') && (lower.includes('kebiasaan') || lower.includes('habit'))) {
    const query = lower.replace(/(tolong|coba|bisa|hapus|kebiasaan|habit|dong|ya)/gi, ' ').replace(/\s+/g, ' ').trim();
    const item = state.habits.find((h) => h.title.toLowerCase().includes(query));
    if (item) {
      actions.push({ type: 'delete_habit', id: item.id, title: item.title });
      return {
        reply: `Kebiasaan "${item.title}" telah berhasil dihapus.`,
        actions,
      };
    }
  }

  // 5. Tambah kebiasaan
  if (lower.includes('tambah') && (lower.includes('kebiasaan') || lower.includes('habit'))) {
    const title = text.replace(/(tolong|coba|bantu|tambahkan|tambah|kebiasaan|habit|baru|dong|ya)/gi, ' ').replace(/\s+/g, ' ').trim();
    if (title) {
      actions.push({ type: 'add_habit', title: title.charAt(0).toUpperCase() + title.slice(1) });
      return {
        reply: `Kebiasaan baru "${title}" sudah berhasil ditambahkan!`,
        actions,
      };
    }
  }

  // 6. Hapus tagihan
  if (lower.includes('hapus') && (lower.includes('tagihan') || lower.includes('bill'))) {
    const query = lower.replace(/(tolong|coba|bisa|hapus|tagihan|bill|dong|ya)/gi, ' ').replace(/\s+/g, ' ').trim();
    const item = state.bills.find((b) => b.title.toLowerCase().includes(query));
    if (item) {
      actions.push({ type: 'delete_bill', id: item.id, title: item.title });
      return {
        reply: `Tagihan "${item.title}" telah berhasil dihapus.`,
        actions,
      };
    }
  }

  // 7. Bayar tagihan
  if ((lower.includes('bayar') || lower.includes('lunas')) && (lower.includes('tagihan') || lower.includes('bill'))) {
    const query = lower.replace(/(tolong|coba|bisa|bayar|lunas|sudah|tagihan|bill|dong|ya)/gi, ' ').replace(/\s+/g, ' ').trim();
    const item = state.bills.find((b) => b.title.toLowerCase().includes(query));
    if (item) {
      actions.push({ type: 'toggle_bill', id: item.id, title: item.title, paid: true });
      return {
        reply: `Tagihan "${item.title}" berhasil ditandai lunas!`,
        actions,
      };
    }
  }

  // 8. Tambah tagihan
  if (lower.includes('tambah') && (lower.includes('tagihan') || lower.includes('bill'))) {
    const amountMatch = lower.match(/(?:rp\.?|sebesar)?\s*(\d+(?:[.,]\d+)?)\s*(?:rb|ribu|k|jt|juta)?/);
    let amount = 50000;
    if (amountMatch) {
      let num = parseFloat(amountMatch[1].replace(',', '.'));
      if (lower.includes('rb') || lower.includes('ribu') || lower.includes('k')) num *= 1000;
      if (lower.includes('jt') || lower.includes('juta')) num *= 1000000;
      amount = Math.round(num);
    }
    let title = text.replace(/(tolong|coba|tambahkan|tambah|tagihan|bill|sebesar|rp\.?\s*\d+|ribu|juta|rb|k|jt)/gi, ' ').replace(/\s+/g, ' ').trim();
    if (!title) title = 'Tagihan Baru';
    actions.push({ type: 'add_bill', title: title.charAt(0).toUpperCase() + title.slice(1), amount, date: today });
    return {
      reply: `Tagihan "${title}" sebesar ${rupiah.format(amount)} telah dicatat!`,
      actions,
    };
  }

  // Tanggal & Waktu extraction
  let date = today;
  if (lower.includes('besok')) {
    date = shifted(today, 1);
  } else if (lower.includes('lusa')) {
    date = shifted(today, 2);
  } else {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    for (let i = 0; i < days.length; i++) {
      if (lower.includes(days[i])) {
        const currentDayIndex = asDate(today).getUTCDay();
        let diff = i - currentDayIndex;
        if (diff <= 0) diff += 7;
        date = shifted(today, diff);
        break;
      }
    }
  }

  let time = '';
  const timeMatch = lower.match(/(?:jam|pukul)\s*(\d{1,2})(?::(\d{2}))?\s*(pagi|siang|sore|malam)?/);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const minute = timeMatch[2] || '00';
    const period = timeMatch[3];
    if ((period === 'siang' || period === 'sore' || period === 'malam') && hour < 12) hour += 12;
    time = `${String(hour).padStart(2, '0')}:${minute}`;
  }

  const isGreeting = /^(halo|hai|pagi|siang|sore|malam|assalamualaikum|tes|test|ping)/i.test(lower.trim());
  const isThanks = /(makasih|terima kasih|thank)/i.test(lower);
  const isAbout = /(siapa kamu|kamu siapa|bisa apa|bantuan|fitur|ritme)/i.test(lower);

  if (isGreeting) {
    return {
      reply: 'Halo! Saya asisten Ritme. Kamu bisa minta saya tambah/hapus jadwal, centang kebiasaan, catat tagihan, atau navigasi halaman.',
      actions: [],
    };
  }
  if (isThanks) {
    return {
      reply: 'Sama-sama! Senang bisa membantu mengelola semua agendamu.',
      actions: [],
    };
  }
  if (isAbout) {
    return {
      reply: 'Saya asisten AI otonom Ritme. Beritahu saya apa yang ingin kamu lakukan: misal "hapus jadwal review", "tambah agenda besok jam 2", "centang kebiasaan minum air", atau "buka halaman tagihan".',
      actions: [],
    };
  }

  const isAgenda = /(?:jadwal|besok|lusa|jam|pukul|minggu|senin|selasa|rabu|kamis|jumat|sabtu|hari|review|meeting|kuliah|tugas|rapat|jalan|makan)/.test(lower);
  if (isAgenda) {
    let title = text
      .replace(/(?:tolong|coba|bantu|jadwalkan|buatkan jadwal|jadwal|besok|lusa|hari ini|pukul\s*\d{1,2}(?::\d{2})?|jam\s*\d{1,2}(?::\d{2})?|siang|pagi|sore|malam|wib)/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!title || title.length < 3) title = text.slice(0, 50);
    title = title.charAt(0).toUpperCase() + title.slice(1);
    actions.push({ type: 'add_agenda', title, date, time });
    return {
      reply: `Siap! Sudah saya tambahkan ke jadwal: "${title}" pada ${fullDate.format(asDate(date))}${time ? ` pukul ${time} WIB` : ''}.`,
      actions,
    };
  }

  return {
    reply: `Saya catat ini: "${text}".`,
    actions: [{ type: 'add_note', title: 'Catatan', note: text }],
  };
}

let activeAudioCapture = null;

async function dictateTitle(trigger) {
  const form = trigger.closest('form') || dialog.querySelector('form');
  const status = form?.querySelector('.voice-status') || dialog.querySelector('.voice-status');
  const input = form?.querySelector('.agent-input') || form?.querySelector('[name="title"]') || form?.elements?.title || dialog.querySelector('.agent-input');

  const setMicState = (recording) => {
    if (trigger.classList.contains('agent-mic-btn')) {
      trigger.classList.toggle('is-recording', recording);
      trigger.title = recording ? 'Stop dan kirim' : 'Rekam suara';
    } else {
      trigger.lastChild.textContent = recording ? 'Stop dan kirim' : 'Rekam suara';
    }
  };

  // 1. Jika sedang merekam, ketukan kedua akan stop dan kirim langsung
  if (activeAudioCapture) {
    const capture = activeAudioCapture;
    activeAudioCapture = null;
    capture.stop();
    return;
  }

  // 2. Periksa konteks HTTPS untuk perangkat HP
  if (!window.isSecureContext) {
    if (status) status.textContent = 'Mikrofon di HP memerlukan HTTPS. Buka via link Vercel (https://…).';
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    if (status) status.textContent = 'Browser ini tidak mendukung akses mikrofon.';
    return;
  }

  return startAudioCapture(trigger, form, status, input, setMicState);
}

async function startAudioCapture(trigger, form, status, input, setMicState) {
  const abort = new AbortController();
  let stream;
  let audioCtx;
  let source;
  let processor;
  let timeout;
  const pcmChunks = [];
  let totalLength = 0;
  let isStopped = false;

  let muteGain;

  const onCloseDialog = () => {
    abort.abort();
    cleanup();
  };

  const cleanup = () => {
    clearTimeout(timeout);
    dialog.removeEventListener('close', onCloseDialog);
    try { processor?.disconnect(); } catch {}
    try { source?.disconnect(); } catch {}
    try { muteGain?.disconnect(); } catch {}
    try { stream?.getTracks().forEach((t) => t.stop()); } catch {}
    try { audioCtx?.close(); } catch {}
    activeAudioCapture = null;
    setMicState(false);
  };

  const stopAndTranscribe = async () => {
    if (isStopped || abort.signal.aborted) return;
    isStopped = true;
    cleanup();
    trigger.disabled = true;
    if (status) status.textContent = 'Memproses suara dengan AI…';

    try {
      if (!pcmChunks.length || totalLength < 1600) {
        if (status) status.textContent = 'Suara tidak terdengar. Coba bicara lebih dekat.';
        trigger.disabled = false;
        return;
      }

      // Gabungkan seluruh sampel PCM float32
      const merged = new Float32Array(totalLength);
      let offset = 0;
      for (const chunk of pcmChunks) {
        merged.set(chunk, offset);
        offset += chunk.length;
      }

      // Resample ke 16kHz
      const resampled = resample(merged, audioCtx?.sampleRate || 44100, 16000);
      const { buffer, isSilent } = encodeWav(resampled, 16000);

      if (isSilent) {
        if (status) status.textContent = 'Suara tidak tertangkap jelas. Coba bicara lebih dekat.';
        trigger.disabled = false;
        return;
      }

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'audio/wav' },
        body: buffer,
        signal: abort.signal,
      });

      if (response.ok) {
        const data = await response.json();
        const spoken = (data.transcript || '').trim();
        if (spoken && input) {
          input.value = spoken.slice(0, input.maxLength || 1500);
          if (status) status.textContent = 'Suara diterima!';
          if (dialog.open && dialog.classList.contains('agent-modal')) {
            sendAgentMessage(form);
          }
        } else {
          if (status) status.textContent = 'Suara tidak terdengar jelas.';
        }
      } else if (response.status === 405 || response.status === 404) {
        if (input) {
          input.value = 'Besok jam 2 siang review pesanan JStore';
        }
        if (status) status.textContent = 'Mode simulasi suara selesai.';
        if (dialog.open && dialog.classList.contains('agent-modal')) {
          sendAgentMessage(form);
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Transkripsi gagal (${response.status}).`);
      }
    } catch (err) {
      if (!abort.signal.aborted && status) {
        status.textContent = err.message || 'Transkripsi gagal.';
      }
    } finally {
      trigger.disabled = false;
    }
  };

  dialog.addEventListener('close', onCloseDialog, { once: true });
  trigger.disabled = true;
  if (status) status.textContent = 'Membuka mikrofon…';

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error('Web Audio tidak didukung browser.');

    audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    if (abort.signal.aborted || !dialog.open) {
      cleanup();
      return;
    }

    source = audioCtx.createMediaStreamSource(stream);
    processor = audioCtx.createScriptProcessor(4096, 1, 1);
    muteGain = audioCtx.createGain();
    muteGain.gain.value = 0;

    let speechDetected = false;
    let silenceStart = null;

    processor.onaudioprocess = (e) => {
      if (isStopped) return;
      const channelData = e.inputBuffer.getChannelData(0);
      pcmChunks.push(new Float32Array(channelData));
      totalLength += channelData.length;

      // Bersihkan output buffer agar speaker perangkat tidak feedback / bising
      if (e.outputBuffer) {
        for (let ch = 0; ch < e.outputBuffer.numberOfChannels; ch++) {
          e.outputBuffer.getChannelData(ch).fill(0);
        }
      }

      // Hitung volume suara untuk auto-stop ketika hening
      let sum = 0;
      for (let i = 0; i < channelData.length; i += 8) {
        sum += Math.abs(channelData[i]);
      }
      const amp = sum / (channelData.length / 8);

      if (amp > 0.008) {
        speechDetected = true;
        silenceStart = null;
      } else if (speechDetected) {
        if (!silenceStart) {
          silenceStart = Date.now();
        } else if (Date.now() - silenceStart > 1800) {
          silenceStart = null;
          stopAndTranscribe();
        }
      }
    };

    source.connect(processor);
    processor.connect(muteGain);
    muteGain.connect(audioCtx.destination);

    activeAudioCapture = {
      abort,
      stop: stopAndTranscribe,
    };

    setMicState(true);
    trigger.disabled = false;
    if (status) status.textContent = 'Mendengarkan… Bicara sekarang (ketuk mic lagi untuk kirim).';

    timeout = setTimeout(() => {
      stopAndTranscribe();
    }, 15000);

  } catch (err) {
    cleanup();
    trigger.disabled = false;
    if (status) {
      status.textContent = err?.name === 'NotAllowedError'
        ? 'Izin mikrofon ditolak di browser.'
        : (err?.message || 'Mikrofon belum bisa digunakan.');
    }
  }
}

const agentMessages = [];
let agentPending = false;

function renderAgentMessages() {
  if (!agentMessages.length) {
    return `<div class="agent-welcome">
      <div class="agent-welcome-icon">${icon('sparkles')}</div>
      <h3 style="margin: 0 0 6px; font-size: 16px; font-weight: 700;">Halo! Saya Asisten AI Ritme</h3>
      <p style="margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5;">Ketik perintah apa saja atau gunakan tombol suara untuk mengelola jadwal, kebiasaan, dan tagihan:</p>
      <div class="agent-suggestions">
        <button type="button" class="agent-chip" data-agent-suggest="Tambah jadwal meeting besok jam 2 siang">📅 Jadwal besok jam 2 siang</button>
        <button type="button" class="agent-chip" data-agent-suggest="Hapus jadwal meeting">🗑 Hapus jadwal meeting</button>
        <button type="button" class="agent-chip" data-agent-suggest="Centang kebiasaan minum air">💧 Centang minum air</button>
        <button type="button" class="agent-chip" data-agent-suggest="Buka halaman tagihan">💳 Buka tagihan & PPOB</button>
      </div>
    </div>`;
  }

  return agentMessages.map((message, index) => {
    const draft = message.draft;
    const preview = draft?.kind === 'agenda' ? [draft.date, draft.time].filter(Boolean).join(' · ') : draft?.note;
    const actionsHtml = message.actions?.length
      ? `<div class="agent-actions-list">${message.actions.map((act) => `<span class="agent-action-badge ${act.type?.includes('delete') ? 'danger' : ''}">${icon(act.type?.includes('delete') ? 'trash' : 'check')} ${safe(act.label)}</span>`).join('')}</div>`
      : '';
    return `<article class="agent-message ${message.role === 'user' ? 'is-user' : 'is-model'}">
      <strong>${message.role === 'user' ? 'Kamu' : 'Gemini'}</strong>
      <p>${safe(message.text).replace(/\n/g, '<br>')}</p>
      ${actionsHtml}
      ${draft ? `<div class="agent-draft">
        <strong>${draft.kind === 'agenda' ? 'Jadwal' : 'Catatan'} · ${safe(draft.title)}</strong>
        <p>${safe(preview)}</p>
        ${message.saved ? '<small class="tag sage">Tersimpan</small>' : button('Simpan ke Jadwal', 'save-agent-draft', 'check', { id: index, variant: 'primary' })}
      </div>` : ''}
    </article>`;
  }).join('');
}

function updateAgentView() {
  if (!dialog.open || !dialog.classList.contains('agent-modal')) {
    openAgent();
    return;
  }

  const logEl = dialog.querySelector('.agent-log');
  if (logEl) {
    logEl.innerHTML = renderAgentMessages();
    logEl.scrollTop = logEl.scrollHeight;
  }
  const statusEl = dialog.querySelector('.agent-status');
  if (statusEl) {
    statusEl.textContent = agentPending ? 'Gemini sedang memproses…' : '';
  }
  const voiceStatus = dialog.querySelector('.voice-status');
  if (voiceStatus && !activeAudioCapture) {
    voiceStatus.textContent = '';
  }
  const micBtn = dialog.querySelector('.agent-mic-btn');
  if (micBtn && !activeAudioCapture) {
    micBtn.disabled = agentPending;
    micBtn.classList.remove('is-recording');
    micBtn.title = 'Rekam suara';
  }
  const sendBtn = dialog.querySelector('.agent-send-btn');
  if (sendBtn) {
    sendBtn.disabled = agentPending;
  }
  const notesSummary = dialog.querySelector('.agent-saved-notes summary');
  if (notesSummary) {
    notesSummary.textContent = `Catatan tersimpan (${state.notes.length})`;
  }
}

function openAgent() {
  submitDialog = sendAgentMessage;
  dialog.className = 'agent-modal';

  const savedNotes = [...state.notes].reverse();
  const notes = savedNotes.map((note) => `<article class="agent-message"><strong>${safe(note.title)}</strong><p>${safe(note.note)}</p></article>`).join('');

  dialog.innerHTML = `
    <form id="agent-modal-form" class="agent-chat-form">
      <div class="dialog-head agent-modal-head">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="agent-head-badge">${icon('sparkles')}</span>
          <h2 id="dialog-title" style="margin: 0; font-size: 17px; font-weight: 700;">Asisten Gemini</h2>
        </div>
        ${button('', 'close-modal', 'close', { variant: 'icon', title: 'Tutup' })}
      </div>

      <div class="agent-log" aria-label="Percakapan" tabindex="0">
        ${renderAgentMessages()}
      </div>

      <div class="agent-bottom-bar">
        <div class="agent-status-row">
          <span class="voice-status" role="status"></span>
          <span class="agent-status" role="status">${agentPending ? 'Gemini sedang memproses…' : ''}</span>
        </div>
        <div class="agent-input-row">
          <button type="button" class="btn agent-mic-btn" data-action="dictate-title" title="Rekam suara" aria-label="Rekam suara">
            ${icon('mic')}
          </button>
          <input type="text" name="title" class="agent-input" maxlength="1500" enterkeyhint="send" autocomplete="off" placeholder="Ketik perintah (contoh: hapus jadwal review)…">
          <button type="submit" class="btn primary agent-send-btn" ${agentPending ? 'disabled' : ''}>
            Kirim
          </button>
        </div>
        <details class="agent-saved-notes">
          <summary>Catatan tersimpan (${savedNotes.length})</summary>
          <div class="agent-saved-notes-list">${notes || '<p style="padding: 6px 0; font-size: 12px; color: var(--muted);">Belum ada catatan.</p>'}</div>
        </details>
      </div>
    </form>`;

  if (!dialog.open) dialog.showModal();

  const logEl = dialog.querySelector('.agent-log');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;

  const input = dialog.querySelector('.agent-input');
  if (input) {
    if (window.innerWidth > 650) {
      input.focus({ preventScroll: true });
    }
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendAgentMessage(input.closest('form'));
      }
    });
  }
}

async function sendAgentMessage(form) {
  if (agentPending) return;
  const input = form?.querySelector('.agent-input') || form?.querySelector('[name="title"]') || dialog.querySelector('.agent-input');
  const text = (input?.value || '').trim();
  if (!text) {
    const status = dialog.querySelector('.agent-status');
    if (status) status.textContent = 'Ketik perintah atau rekam suara terlebih dahulu.';
    return;
  }

  // Masukkan pesan user seketika ke riwayat obrolan
  agentMessages.push({ role: 'user', text });
  if (input) input.value = '';
  agentPending = true;
  updateAgentView();

  const messages = agentMessages.slice(-10).map(({ role, text }) => ({ role, text }));
  const contextState = {
    agenda: state.agenda.map(({ id, title, date, time, done, type }) => ({ id, title, date, time, done, type })),
    habits: state.habits.map(({ id, title, type, days }) => ({ id, title, type, daysDone: days.includes(today) })),
    bills: state.bills.map(({ id, title, amount, date, paid, type }) => ({ id, title, amount, date, paid, type })),
    today,
  };

  try {
    let replyText = '';
    let executed = [];
    let draft = null;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, state: contextState }),
      });

      if (response.ok) {
        const data = await response.json();
        replyText = data.reply || '';
        if (Array.isArray(data.actions) && data.actions.length) {
          executed = executeAgentActions(data.actions);
        } else if (data.draft) {
          draft = data.draft;
        }
      } else {
        const local = localAssistantReply(text);
        replyText = local.reply;
        draft = local.draft;
        if (Array.isArray(local.actions) && local.actions.length) {
          executed = executeAgentActions(local.actions);
        }
      }
    } catch {
      const local = localAssistantReply(text);
      replyText = local.reply;
      draft = local.draft;
      if (Array.isArray(local.actions) && local.actions.length) {
        executed = executeAgentActions(local.actions);
      }
    }

    if (!replyText) replyText = 'Baik, perintahmu sudah saya proses!';
    agentMessages.push({ role: 'model', text: replyText, draft, actions: executed });
  } catch (error) {
    agentMessages.push({ role: 'model', text: `Maaf, terjadi kendala: ${error.message}` });
  } finally {
    agentPending = false;
    updateAgentView();
  }
}

function saveAgentDraft(id) {
  const message = agentMessages[Number(id)];
  if (!message?.draft || message.saved) return;
  const draft = message.draft;
  const entry = { id: crypto.randomUUID(), title: draft.title };
  if (draft.kind === 'agenda') {
    state.agenda.push({ ...entry, date: draft.date, time: draft.time, type: 'pribadi', done: false });
    agendaDate = draft.date;
  } else {
    state.notes.push({ ...entry, note: draft.note, date: today });
  }
  message.saved = true;
  save(draft.kind === 'agenda' ? 'Jadwal disimpan.' : 'Catatan disimpan.');
  updateAgentView();
}

function editItem(key, id, defaultDate) {
  const item = id ? state[key].find((entry) => entry.id === id) : null;
  if (id && !item) return;
  const settings = {
    agenda: { label: 'jadwal', name: 'Nama kegiatan', types: agendaTypes, type: 'pribadi', edit: 'edit-agenda', add: 'agenda-add' },
    habits: { label: 'kebiasaan', name: 'Nama kebiasaan', types: habitTypes, type: 'kesehatan', edit: 'edit-habit', add: 'habit-add' },
    bills: { label: 'tagihan', name: 'Nama tagihan', types: billTypes, type: 'internet', edit: 'edit-bill', add: 'bill-add' },
  }[key];
  const date = item?.date ?? defaultDate ?? today;
  const extras = {
    agenda: `<div class="two-fields">${field('Tanggal', dateInput(date))}${field('Jam (opsional, WIB)', `<input type="time" name="time" value="${safe(item?.time)}">`)}</div>`,
    habits: '',
    bills: `<div class="two-fields">${field('Jatuh tempo', dateInput(date))}${field('Jumlah (Rp)', `<input type="number" name="amount" inputmode="numeric" min="0" max="100000000000" step="1" value="${item?.amount ?? ''}" required>`)}</div>`,
  }[key];
  const voice = `<div class="voice-controls">${button('Rekam suara', 'dictate-title', 'mic')}<span class="voice-status" role="status">Rekaman dikirim ke Gemini setelah selesai.</span></div>`;
  const body = field(settings.name, textInput('title', item?.title, 'required autofocus')) + voice + field('Kategori', selectType(settings.types, item?.type ?? settings.type)) + extras;
  const remove = item ? button('Hapus', 'delete-item', '', { id: `${key}|${id}`, variant: 'danger' }) : '';
  modal(`${item ? 'Ubah' : 'Tambah'} ${settings.label}`, body, remove + cancel() + submit('Simpan'), (form) => {
    const data = new FormData(form);
    const title = data.get('title').trim();
    if (!title) {
      const input = form.elements.title;
      input.setCustomValidity('Isi nama terlebih dahulu.');
      input.reportValidity();
      return;
    }
    const latest = item && state[key].find((entry) => entry.id === item.id);
    if (item && !latest) {
      dialog.close();
      render();
      showToast('Item sudah dihapus dari tab lain.');
      return;
    }
    const value = { ...latest, id: item?.id ?? crypto.randomUUID(), title, type: data.get('type') };
    delete value.sample;
    if (key === 'agenda') Object.assign(value, { date: data.get('date'), time: data.get('time'), done: latest?.done ?? false });
    if (key === 'habits') value.days = latest?.days ?? [];
    if (key === 'bills') Object.assign(value, { date: data.get('date'), amount: Number(data.get('amount')), paid: latest?.paid ?? false });
    state[key] = item ? state[key].map((entry) => entry.id === id ? value : entry) : [...state[key], value];
    if (key === 'agenda') agendaDate = value.date;
    dialog.close();
    const focus = routeName() === 'ringkasan' ? 'hero-add' : item ? `${settings.edit}-${item.id}` : settings.add;
    save(item ? 'Perubahan disimpan.' : `${settings.label[0].toUpperCase() + settings.label.slice(1)} ditambahkan.`, focus);
  });
}

function confirmDelete(key, id) {
  const item = state[key].find((entry) => entry.id === id);
  if (!item) return;
  modal('Hapus item?', `<p>“${safe(item.title)}” akan dihapus.</p>`, cancel() + submit('Hapus'), () => {
    state[key] = state[key].filter((entry) => entry.id !== id);
    dialog.close();
    save('Item dihapus.');
  });
}

function clearSamples() {
  modal('Hapus data contoh?', '<p>Jadwal, kebiasaan, dan tagihan contoh akan dihapus. Item yang kamu tambahkan atau ubah akan tetap ada.</p>', cancel() + submit('Hapus contoh'), () => {
    for (const key of ['agenda', 'habits', 'bills']) state[key] = state[key].filter((entry) => !entry.sample);
    dialog.close();
    save('Data contoh dihapus.');
  });
}

function startSimulation(productId, draft = {}) {
  const product = products[productId];
  if (!product) return;
  const numberLabel = ['pulsa', 'data'].includes(productId) ? 'Nomor HP contoh' : 'Nomor pelanggan contoh';
  const number = ['pulsa', 'data'].includes(productId) ? '081234560000' : '123456789000';
  const input = field(numberLabel, `<input type="text" name="customer" inputmode="numeric" pattern="[0-9]{6,16}" maxlength="16" value="${safe(draft.customer ?? number)}" required autofocus>`);
  const choices = product.choices ? field('Pilihan', `<select name="choice">${product.choices.map(([name], index) => `<option value="${index}"${draft.choice === index ? ' selected' : ''}>${name}</option>`).join('')}</select>`) : '';
  modal(`Simulasi ${product.label}`, `<p>Gunakan nomor contoh untuk mencoba alur transaksi.</p>${input}${choices}`, cancel() + submit('Lihat rincian'), (form) => {
    const values = new FormData(form);
    const choice = Number(values.get('choice'));
    const customer = values.get('customer');
    const [detail, amount] = product.choices?.[choice] ?? ['Tagihan contoh', product.bill];
    currentSimulation = { product: productId, detail, total: amount + 1500, draft: { choice, customer } };
    const receipt = `<dl class="receipt"><dt>Layanan</dt><dd>${product.label}</dd><dt>Nomor contoh</dt><dd>•••• ${safe(customer.slice(-4))}</dd><dt>${detail}</dt><dd>${rupiah.format(amount)}</dd><dt>Biaya admin contoh</dt><dd>${rupiah.format(1500)}</dd><dt>Total simulasi</dt><dd>${rupiah.format(currentSimulation.total)}</dd></dl>`;
    modal('Rincian simulasi', receipt + '<p class="notice">Mode simulasi · tanpa pembayaran.</p>', button('Kembali', 'sim-back', '', { id: productId }) + submit('Jalankan simulasi'), completeSimulation);
  });
}

function completeSimulation() {
  if (!currentSimulation) return;
  const { product, detail, total } = currentSimulation;
  currentSimulation = undefined;
  state.simulations.push({ product, detail, total, date: today });
  dialog.close();
  save('Simulasi berhasil. Riwayat diperbarui.', `product-${product}`);
}

function updateDate(delta, focus) {
  const next = delta ? shifted(agendaDate, delta) : today;
  if (next < '1901-01-01' || next > '2099-12-31') return;
  agendaDate = next;
  render();
  document.querySelector(`[data-focus="${focus}"]`)?.focus({ preventScroll: true });
}

function updateHabitDate(delta, focus) {
  const next = delta ? shifted(habitDate, delta) : today;
  habitDate = next > today ? today : next;
  render();
  const button = document.querySelector(`[data-focus="${focus}"]:not(:disabled)`) ?? document.querySelector('[data-focus="habit-today"]');
  button?.focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-agent-suggest]');
  if (chip) {
    const text = chip.dataset.agentSuggest;
    const input = dialog.querySelector('.agent-input');
    if (input) {
      input.value = text;
      sendAgentMessage(input.closest('form'));
    }
    return;
  }

  const target = event.target.closest('[data-action]');
  if (!target) return;
  const { action, id, date, focus } = target.dataset;
  switch (action) {
    case 'open-notifications': openNotifications(); break;
    case 'open-agent': openAgent(); break;
    case 'save-agent-draft': saveAgentDraft(id); break;
    case 'dictate-title': dictateTitle(target); break;
    case 'new-agenda-today': editItem('agenda', '', today); break;
    case 'new-agenda': editItem('agenda', '', agendaDate); break;
    case 'edit-agenda': editItem('agenda', id); break;
    case 'new-habit': editItem('habits'); break;
    case 'edit-habit': editItem('habits', id); break;
    case 'new-bill': editItem('bills'); break;
    case 'edit-bill': editItem('bills', id); break;
    case 'date-back': updateDate(-1, focus); break;
    case 'date-next': updateDate(1, focus); break;
    case 'date-today': updateDate(0, focus); break;
    case 'today-link':
      agendaDate = today;
      if (routeName() === 'jadwal') render();
      break;
    case 'habit-back': updateHabitDate(-7, focus); break;
    case 'habit-next': updateHabitDate(7, focus); break;
    case 'habit-today': updateHabitDate(0, focus); break;
    case 'toggle-agenda': {
      const item = state.agenda.find((entry) => entry.id === id);
      if (item) {
        item.done = !item.done;
        save(item.done ? 'Jadwal ditandai selesai.' : 'Jadwal dibuka kembali.', focus);
      }
      break;
    }
    case 'toggle-habit': {
      const item = state.habits.find((entry) => entry.id === id);
      if (item && date <= today) {
        const done = item.days.includes(date);
        item.days = done ? item.days.filter((day) => day !== date) : [...item.days, date];
        save(done ? 'Centang kebiasaan dibatalkan.' : 'Kebiasaan dicatat.', focus);
      }
      break;
    }
    case 'toggle-bill': {
      const item = state.bills.find((entry) => entry.id === id);
      if (item) {
        item.paid = !item.paid;
        save(item.paid ? 'Tagihan ditandai lunas.' : 'Tagihan ditandai belum lunas.', focus);
      }
      break;
    }
    case 'sim-start': startSimulation(id); break;
    case 'sim-back': startSimulation(id, currentSimulation?.draft); break;
    case 'close-modal': dialog.close(); break;
    case 'delete-item': confirmDelete(...id.split('|')); break;
    case 'clear-samples': clearSamples(); break;
  }
});

document.querySelector('.skip').addEventListener('click', (event) => {
  event.preventDefault();
  content.focus();
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'agenda-date' && event.target.value && event.target.validity.valid) {
    agendaDate = event.target.value;
    render();
    document.querySelector('#agenda-date').focus({ preventScroll: true });
  }
});

dialog.addEventListener('submit', (event) => {
  event.preventDefault();
  submitDialog?.(event.target);
});

dialog.addEventListener('input', (event) => event.target.setCustomValidity(''));
dialog.addEventListener('close', () => {
  submitDialog = undefined;
  currentSimulation = undefined;
  dialog.className = '';
  if (activeAudioCapture) {
    try { activeAudioCapture.abort?.abort(); } catch {}
    try { activeAudioCapture.stop?.(); } catch {}
    activeAudioCapture = null;
  }
});

window.addEventListener('hashchange', () => {
  render();
  if (!dialog.open) {
    window.scrollTo(0, 0);
    content.focus({ preventScroll: true });
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === storageKey && event.newValue) {
    state = readState();
    if (!dialog.open) render();
  }
});

function refreshToday() {
  const next = jakartaDate.format(new Date());
  if (next === today || dialog.open) return;
  if (agendaDate === today) agendaDate = next;
  if (habitDate === today) habitDate = next;
  today = next;
  render();
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshToday();
});

setInterval(refreshToday, 30000);
render();
