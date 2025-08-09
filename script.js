// script.js — simple renderer for predictions.json
async function loadPredictions() {
  const container = document.getElementById('predictions');
  try {
    const res = await fetch('predictions.json', {cache: "no-cache"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data, container);
    const updated = document.getElementById('last-updated');
    updated.textContent = `Last updated: ${new Date(data.generated_at).toLocaleString()}`;
  } catch (err) {
    container.innerHTML = `<p>Error loading predictions: ${err.message}</p>`;
    console.error(err);
  }
}

function render(data, container) {
  if (!data.matches || data.matches.length === 0) {
    container.innerHTML = '<p>No predictions available.</p>';
    return;
  }

  container.innerHTML = '';
  data.matches.forEach(m => {
    const el = document.createElement('div');
    el.className = 'match';
    el.innerHTML = `
      <div class="teams">
        <div class="team-row">
          <div class="team-name">${escapeHtml(m.home)}</div>
          <div class="small">vs</div>
          <div class="team-name">${escapeHtml(m.away)}</div>
        </div>
        <div class="small">${escapeHtml(m.league)} • ${escapeHtml(m.kickoff || '')}</div>
      </div>
      <div class="prediction">
        <div class="pick">${escapeHtml(m.prediction)}</div>
        <div class="small">Confidence: ${m.confidence != null ? (m.confidence + '%') : '—'}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

function escapeHtml(s = '') {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

document.addEventListener('DOMContentLoaded', loadPredictions);
