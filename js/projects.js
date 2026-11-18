const cards = [...document.querySelectorAll('.project-card')];
const searchInput = document.querySelector('#project-search');
const filterButtons = document.querySelectorAll('.filter-button');
let activeFilter = localStorage.getItem('triad-project-filter') || 'all';
const savedSearch = localStorage.getItem('triad-project-search') || '';
if (searchInput) searchInput.value = savedSearch;
function renderProjects() { const query = (searchInput?.value || '').trim().toLowerCase(); cards.forEach((card) => { const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter; const matchesSearch = !query || card.dataset.title.includes(query) || card.textContent.toLowerCase().includes(query); card.classList.toggle('hidden', !(matchesFilter && matchesSearch)); }); }
filterButtons.forEach((button) => { if (button.dataset.filter === activeFilter) button.classList.add('active'); button.addEventListener('click', () => { activeFilter = button.dataset.filter; localStorage.setItem('triad-project-filter', activeFilter); filterButtons.forEach((item) => item.classList.toggle('active', item === button)); renderProjects(); }); });
searchInput?.addEventListener('input', () => { localStorage.setItem('triad-project-search', searchInput.value); renderProjects(); });
renderProjects();
const apiResult = document.querySelector('#api-result');
async function loadGithubData() { try { const response = await fetch('https://api.github.com/repos/ma1018t866/chushpany'); if (!response.ok) throw new Error('GitHub returned an unavailable response.'); const repo = await response.json(); apiResult.innerHTML = `<div class="api-card"><span class="project-type">Live from GitHub</span><h3>${repo.name || 'chushpany'}</h3><p>${repo.description || 'A shared workspace for the Chushpany team.'}</p><div class="api-stats"><span>★ ${repo.stargazers_count ?? 0} stars</span><span>⑂ ${repo.forks_count ?? 0} forks</span><span>${repo.language || 'HTML / CSS / JS'}</span></div><br><a class="text-link" href="${repo.html_url}" target="_blank" rel="noreferrer">Open repository <span>↗</span></a></div>`; } catch (error) { apiResult.innerHTML = '<p class="api-error">The live GitHub signal is temporarily unavailable. The local project archive is still ready to explore.</p>'; } }
if (apiResult) loadGithubData();
