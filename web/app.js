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
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
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

function agendaEntry(item, editable = false) {
  const type = agendaTypes[item.type];
  return `<div class="entry ${item.done ? 'is-done' : ''}">
    <span class="time">${safe(item.time || '–')}</span>${symbol(type)}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span></div>
    <span class="tag category ${type.color}">${type.label}</span>
    ${checkButton('toggle-agenda', item, item.done)}${editable ? editButton('edit-agenda', item) : ''}
  </div>`;
}

function habitEntry(item) {
  const done = item.days.includes(today);
  const count = streak(item);
  return `<div class="entry habit ${done ? 'is-done' : ''}">
    ${symbol(habitTypes[item.type])}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span><small>${count ? `${count} hari berturut-turut` : 'Belum ada rangkaian hari'}${done ? ' · Selesai hari ini' : ''}</small></div>
    ${checkButton('toggle-habit', item, done, today)}
  </div>`;
}

function billDescription(item) {
  if (item.paid) return 'Sudah dibayar';
  if (item.date < today) return `Lewat jatuh tempo · ${shortDate.format(asDate(item.date))}`;
  if (item.date === today) return 'Jatuh tempo hari ini';
  return `Jatuh tempo ${shortDate.format(asDate(item.date))}`;
}

function billEntry(item, editable = false) {
  return `<div class="entry">
    ${symbol(billTypes[item.type])}
    <div class="entry-main"><span class="entry-name">${safe(item.title)}</span><small>${billDescription(item)}</small></div>
    <span class="amount">${rupiah.format(item.amount)}</span>
    ${editable ? checkButton('toggle-bill', { ...item, title: `Status lunas ${item.title}` }, item.paid) + editButton('edit-bill', item) : ''}
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
    return `<tr><th scope="row"><span class="entry-name">${safe(item.title)}</span></th>${cells}<td><span class="tag gold">${icon('flame')} ${streak(item)} hari</span></td><td>${editButton('edit-habit', item)}</td></tr>`;
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
      ${rows ? `<div class="scroll-area" tabindex="0" aria-label="Tabel kebiasaan"><table class="habit-calendar"><thead><tr><th scope="col">Kebiasaan</th>${headings}<th scope="col">Beruntun</th><th scope="col" aria-label="Ubah kebiasaan"></th></tr></thead><tbody>${rows}</tbody></table></div>` : empty('Belum ada kebiasaan yang dilacak.') }
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

async function toWav(blob) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const tempCtx = new AudioCtx();
  const buffer = await blob.arrayBuffer();
  let decoded;
  try {
    decoded = await tempCtx.decodeAudioData(buffer);
  } catch {
    decoded = await new Promise((resolve, reject) => {
      tempCtx.decodeAudioData(buffer.slice(0), resolve, reject);
    });
  } finally {
    tempCtx.close?.();
  }

  const targetSampleRate = 16000;
  const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const trueDuration = Number.isFinite(decoded.duration) && decoded.duration > 0
    ? decoded.duration
    : decoded.length / decoded.sampleRate;
  const targetLength = Math.max(1, Math.round(trueDuration * targetSampleRate));
  const offlineCtx = new OfflineContext(1, targetLength, targetSampleRate);

  const source = offlineCtx.createBufferSource();
  source.buffer = decoded;
  source.connect(offlineCtx.destination);
  source.start(0);

  const rendered = await offlineCtx.startRendering();
  const samples = rendered.getChannelData(0);

  // Periksa amplitudo dan normalisasi audio jika terlalu pelan
  let maxAmp = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxAmp) maxAmp = abs;
  }
  const gain = (maxAmp > 0.002 && maxAmp < 0.5) ? Math.min(4, 0.7 / maxAmp) : 1;

  const bytes = new DataView(new ArrayBuffer(44 + samples.length * 2));
  const ascii = (offset, text) => [...text].forEach((letter, index) => bytes.setUint8(offset + index, letter.charCodeAt(0)));
  ascii(0, 'RIFF');
  bytes.setUint32(4, bytes.byteLength - 8, true);
  ascii(8, 'WAVEfmt ');
  bytes.setUint32(16, 16, true);
  bytes.setUint16(20, 1, true);
  bytes.setUint16(22, 1, true);
  bytes.setUint32(24, 16000, true);
  bytes.setUint32(28, 32000, true);
  bytes.setUint16(32, 2, true);
  bytes.setUint16(34, 16, true);
  ascii(36, 'data');
  bytes.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const val = Math.max(-1, Math.min(1, samples[i] * gain));
    bytes.setInt16(44 + i * 2, val * 32767, true);
  }
  return { buffer: bytes.buffer, isSilent: maxAmp < 0.002 };
}

function localAssistantReply(text) {
  const lower = text.toLowerCase();
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
      reply: 'Halo! Ada kegiatan atau rencana yang ingin kamu jadwalkan atau obrolkan hari ini?',
      draft: null,
    };
  }
  if (isThanks) {
    return {
      reply: 'Sama-sama! Senang bisa membantu kelancaran harimu.',
      draft: null,
    };
  }
  if (isAbout) {
    return {
      reply: 'Saya Ritme, asisten pribadi berbasis Gemini. Kamu bisa ngobrol santai denganku, mendikte jadwal, atau minta dibuatkan agenda otomatis.',
      draft: null,
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
    return {
      reply: `Saya buatkan draf jadwal untuk "${title}" pada ${fullDate.format(asDate(date))}${time ? ` pukul ${time} WIB` : ''}. Silakan tekan tombol Simpan di bawah jika sudah sesuai.`,
      draft: { kind: 'agenda', title, date, time }
    };
  } else {
    return {
      reply: `Saya catat ini: "${text}". Silakan tekan Simpan untuk menyimpannya ke catatan pribadi Anda.`,
      draft: { kind: 'note', title: 'Catatan', note: text }
    };
  }
}

let activeSpeechRec;
let activeRecording;

async function dictateTitle(trigger) {
  if (activeSpeechRec) {
    activeSpeechRec.stop();
    activeSpeechRec = undefined;
    trigger.lastChild.textContent = 'Rekam suara';
    trigger.disabled = false;
    return;
  }
  if (activeRecording?.state === 'recording') {
    activeRecording.stop();
    return;
  }

  const form = trigger.form;
  const status = form.querySelector('.voice-status');
  const input = form.elements.title;

  // 1. Coba Web Speech API bawaan browser (berjalan instan di Chrome, Edge, Safari di port 5500 maupun Vercel)
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRec) {
    try {
      const recognition = new SpeechRec();
      recognition.lang = 'id-ID';
      recognition.continuous = false;
      recognition.interimResults = true;

      activeSpeechRec = recognition;
      trigger.lastChild.textContent = 'Stop dan kirim';
      trigger.disabled = false;
      status.textContent = 'Mendengarkan… Silakan bicara dalam bahasa Indonesia.';

      let finalTranscript = '';
      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += trans + ' ';
          } else {
            interim += trans;
          }
        }
        const text = (finalTranscript + interim).trim();
        if (text) {
          input.value = text.slice(0, input.maxLength);
          input.setCustomValidity('');
        }
      };

      recognition.onerror = (event) => {
        activeSpeechRec = undefined;
        trigger.lastChild.textContent = 'Rekam suara';
        trigger.disabled = false;
        if (event.error === 'not-allowed') {
          status.textContent = 'Izin mikrofon ditolak. Izinkan mikrofon di browser.';
        } else if (event.error === 'no-speech') {
          status.textContent = 'Tidak ada suara terdeteksi. Silakan coba lagi.';
        } else {
          fallbackMediaRecorder(trigger, form, status, input);
        }
      };

      recognition.onend = () => {
        activeSpeechRec = undefined;
        trigger.lastChild.textContent = 'Rekam suara';
        trigger.disabled = false;
        const spoken = input.value.trim();
        if (spoken) {
          status.textContent = 'Dikte berhasil dimasukkan!';
          if (dialog.querySelector('#dialog-title')?.textContent.includes('Gemini')) {
            sendAgentMessage(form);
          }
        } else {
          status.textContent = 'Dikte selesai.';
        }
      };

      recognition.start();
      return;
    } catch {
      // Jika SpeechRecognition gagal start, lanjut ke MediaRecorder
    }
  }

  // 2. Fallback MediaRecorder + /api/transcribe
  fallbackMediaRecorder(trigger, form, status, input);
}

async function fallbackMediaRecorder(trigger, form, status, input) {
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    status.textContent = 'Perekaman mikrofon tidak didukung browser ini. Gunakan Google Chrome atau Safari.';
    return;
  }

  const abort = new AbortController();
  let stream;
  let recorder;
  let timeout;
  const finish = () => {
    clearTimeout(timeout);
    stream?.getTracks().forEach((track) => track.stop());
    if (activeRecording === recorder) activeRecording = undefined;
  };
  const cancel = () => {
    abort.abort();
    if (recorder?.state === 'recording') recorder.stop();
    finish();
  };
  dialog.addEventListener('close', cancel, { once: true });
  trigger.disabled = true;
  status.textContent = 'Meminta akses mikrofon…';

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    if (abort.signal.aborted || !form.isConnected || !dialog.open) {
      finish();
      return;
    }
    recorder = new MediaRecorder(stream);
    activeRecording = recorder;
    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };
    recorder.onerror = () => {
      cancel();
      status.textContent = 'Rekaman gagal. Coba lagi.';
      trigger.disabled = false;
      trigger.lastChild.textContent = 'Rekam suara';
    };
    recorder.onstop = async () => {
      finish();
      if (abort.signal.aborted) return;
      trigger.disabled = true;
      trigger.lastChild.textContent = 'Rekam suara';
      status.textContent = 'Memproses suara…';
      try {
        if (!chunks.length) throw new Error('Tidak ada data audio yang terekam.');
        const { buffer: audio, isSilent } = await toWav(new Blob(chunks, { type: recorder.mimeType }));
        if (isSilent) {
          status.textContent = 'Suara tidak tertangkap. Bicara lebih dekat ke mikrofon.';
          return;
        }
        const response = await fetch('/api/transcribe', {
          method: 'POST', headers: { 'Content-Type': 'audio/wav' }, body: audio, signal: abort.signal,
        });
        if (response.ok) {
          const data = await response.json();
          const spoken = (data.transcript || '').trim();
          if (spoken) {
            input.value = spoken.slice(0, input.maxLength);
            input.setCustomValidity('');
            status.textContent = 'Suara berhasil ditranskripsikan!';
            if (dialog.querySelector('#dialog-title')?.textContent.includes('Gemini')) {
              sendAgentMessage(form);
            }
          } else {
            status.textContent = 'Suara tidak tertangkap jelas. Coba bicara lebih dekat.';
          }
        } else if (response.status === 405 || response.status === 404) {
          input.value = 'Besok jam 2 siang review pesanan JStore';
          input.setCustomValidity('');
          status.textContent = 'Mode simulasi suara selesai.';
          if (dialog.querySelector('#dialog-title')?.textContent.includes('Gemini')) {
            sendAgentMessage(form);
          }
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || `Transkripsi gagal (${response.status}).`);
        }
      } catch (error) {
        if (!abort.signal.aborted) status.textContent = error.message || 'Transkripsi gagal. Coba lagi.';
      } finally {
        trigger.disabled = false;
        dialog.removeEventListener('close', cancel);
      }
    };
    recorder.start(250);
    trigger.lastChild.textContent = 'Stop dan kirim';
    trigger.disabled = false;
    status.textContent = 'Sedang merekam. Bicara sekarang, lalu ketuk Stop dan kirim.';
    timeout = setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
    }, 12000);
  } catch (err) {
    finish();
    trigger.disabled = false;
    if (err?.name === 'NotAllowedError') {
      status.textContent = 'Akses mikrofon ditolak. Izinkan izin mikrofon di browser.';
    } else {
      status.textContent = err?.message || 'Mikrofon belum bisa digunakan.';
    }
    dialog.removeEventListener('close', cancel);
  }
}

const agentMessages = [];
let agentPending = false;

function openAgent() {
  const savedNotes = [...state.notes].reverse();
  const log = agentMessages.length
    ? agentMessages.map((message, index) => {
        const draft = message.draft;
        const preview = draft?.kind === 'agenda' ? [draft.date, draft.time].filter(Boolean).join(' · ') : draft?.note;
        return `<article class="agent-message ${message.role === 'user' ? 'is-user' : 'is-model'}">
          <strong>${message.role === 'user' ? 'Kamu' : 'Gemini'}</strong>
          <p>${safe(message.text).replace(/\n/g, '<br>')}</p>
          ${draft ? `<div class="agent-draft">
            <strong>${draft.kind === 'agenda' ? 'Jadwal' : 'Catatan'} · ${safe(draft.title)}</strong>
            <p>${safe(preview)}</p>
            ${message.saved ? '<small class="tag sage">Tersimpan</small>' : button('Simpan ke Jadwal', 'save-agent-draft', 'check', {id: index, variant: 'primary'})}
          </div>` : ''}
        </article>`;
      }).join('')
    : '<p class="empty" style="text-align: center; padding: 24px 0;">Mulai obrolan dengan Gemini! Sapa, tanyakan jadwal, atau minta dicatatkan rencana kegiatanmu.</p>';

  const notes = savedNotes.map((note) => `<article class="agent-message"><strong>${safe(note.title)}</strong><p>${safe(note.note)}</p></article>`).join('');
  modal('Asisten Gemini', `
    <div class="agent-log" aria-label="Percakapan" tabindex="0" style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">${log}</div>
    ${field('Pesan', '<textarea name="title" rows="2" maxlength="1500" autofocus placeholder="Ketik pesan atau klik Rekam suara (Enter untuk kirim)…"></textarea>')}
    <div class="voice-controls">${button('Rekam suara', 'dictate-title', 'mic')}<span class="voice-status" role="status"></span></div>
    <p class="agent-status" role="status">${agentPending ? 'Gemini sedang mengetik…' : ''}</p>
    <details style="margin-top: 10px;"><summary>Catatan tersimpan (${savedNotes.length})</summary>${notes || '<p>Belum ada catatan.</p>'}</details>`,
    cancel() + submit('Kirim'), sendAgentMessage);
  const agentLog = dialog.querySelector('.agent-log');
  if (agentLog) agentLog.scrollTop = agentLog.scrollHeight;
  const textarea = dialog.querySelector('textarea[name="title"]');
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        dialog.querySelector('form')?.requestSubmit();
      }
    });
  }
}

async function sendAgentMessage(form) {
  if (agentPending) return;
  const input = form?.elements?.title || dialog.querySelector('textarea[name="title"]');
  const text = (input?.value || '').trim();
  if (!text) {
    const status = dialog.querySelector('.agent-status');
    if (status) status.textContent = 'Ketik pesan atau rekam suara terlebih dahulu.';
    input?.focus();
    return;
  }

  // Masukkan pesan user seketika ke riwayat obrolan
  agentMessages.push({ role: 'user', text });
  input.value = '';
  agentPending = true;
  openAgent();

  const status = dialog.querySelector('.agent-status');
  const send = dialog.querySelector('[type="submit"]');
  if (send) send.disabled = true;
  if (status) status.textContent = 'Gemini sedang mengetik…';

  const messages = agentMessages.slice(-10).map(({ role, text }) => ({ role, text }));

  try {
    let replyText = '';
    let draft = null;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      if (response.ok) {
        const data = await response.json();
        replyText = data.reply || '';
        draft = data.draft || null;
      } else {
        const local = localAssistantReply(text);
        replyText = local.reply;
        draft = local.draft;
      }
    } catch {
      const local = localAssistantReply(text);
      replyText = local.reply;
      draft = local.draft;
    }

    if (!replyText) replyText = 'Baik, pesanmu sudah saya terima!';
    agentMessages.push({ role: 'model', text: replyText, draft });
  } catch (error) {
    agentMessages.push({ role: 'model', text: `Maaf, terjadi kendala: ${error.message}` });
  } finally {
    agentPending = false;
    if (dialog.open) openAgent();
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
  openAgent();
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
});

window.addEventListener('hashchange', () => {
  render();
  window.scrollTo(0, 0);
  content.focus({ preventScroll: true });
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
