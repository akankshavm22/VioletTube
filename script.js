/* VioletTube - script.js
   Features:
   - theme toggle (persist)
   - collapsible sidebar
   - categories (chips)
   - shorts row
   - videos grid (hover thumbnail swap)
   - preview modal (sample MP4)
   - watch later drawer (persist)
   - search, load more, keyboard shortcuts
*/

// ---------- sample data ----------
const sampleVideos = [
  { id:'v1', title:'Build a YouTube Clone with HTML, CSS & JS', channel:'Web Dev Tutorials',
    avatar:'https://randomuser.me/api/portraits/men/11.jpg', views:'125K views', time:'2 days ago',
    duration:'12:34', category:'Programming', live:false,
    thumb:'https://picsum.photos/id/1060/1280/720', thumbHover:'https://picsum.photos/id/1061/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v2', title:'Violet UI Trends 2025', channel:'Design Masters',
    avatar:'https://randomuser.me/api/portraits/women/12.jpg', views:'45K views', time:'1 week ago',
    duration:'08:21', category:'Design', live:false,
    thumb:'https://picsum.photos/id/1015/1280/720', thumbHover:'https://picsum.photos/id/1016/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v3', title:'Top 10 JavaScript Tips', channel:'Code With Me',
    avatar:'https://randomuser.me/api/portraits/men/13.jpg', views:'320K views', time:'3 weeks ago',
    duration:'15:42', category:'Programming', live:false,
    thumb:'https://picsum.photos/id/1074/1280/720', thumbHover:'https://picsum.photos/id/1070/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v4', title:'Live: Lo-Fi Coding Beats', channel:'Chill Vibes',
    avatar:'https://randomuser.me/api/portraits/women/14.jpg', views:'3.4K watching', time:'Live now',
    duration:'LIVE', category:'Live', live:true,
    thumb:'https://picsum.photos/id/1084/1280/720', thumbHover:'https://picsum.photos/id/1080/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v5', title:'Epic Open-World Gameplay', channel:'Gaming Hub',
    avatar:'https://randomuser.me/api/portraits/men/22.jpg', views:'1.1M views', time:'2 months ago',
    duration:'22:15', category:'Gaming', live:false,
    thumb:'https://picsum.photos/id/1047/1280/720', thumbHover:'https://picsum.photos/id/1048/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v6', title:'Summer Travel Guide: Hidden Gems', channel:'Travel Light',
    avatar:'https://randomuser.me/api/portraits/women/25.jpg', views:'156K views', time:'2 months ago',
    duration:'18:09', category:'Travel', live:false,
    thumb:'https://picsum.photos/id/1035/1280/720', thumbHover:'https://picsum.photos/id/1036/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v7', title:'Best New Music Mix to Focus', channel:'Chill Nation',
    avatar:'https://randomuser.me/api/portraits/men/31.jpg', views:'1.9M views', time:'5 months ago',
    duration:'1:05:22', category:'Music', live:false,
    thumb:'https://picsum.photos/id/1027/1280/720', thumbHover:'https://picsum.photos/id/1031/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v8', title:'Figma to Code: Real workflow', channel:'UI/UX Insights',
    avatar:'https://randomuser.me/api/portraits/women/41.jpg', views:'67K views', time:'3 days ago',
    duration:'10:37', category:'Design', live:false,
    thumb:'https://picsum.photos/id/1005/1280/720', thumbHover:'https://picsum.photos/id/1006/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' },

  { id:'v9', title:'3 JS Array Tricks', channel:'Quick Hacks',
    avatar:'https://randomuser.me/api/portraits/men/42.jpg', views:'80K views', time:'4 days ago',
    duration:'06:05', category:'Programming', live:false,
    thumb:'https://picsum.photos/id/1012/1280/720', thumbHover:'https://picsum.photos/id/1013/1280/720',
    previewMp4:'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' }
];

const shortsData = [
  { id:'s1', title:'Quick CSS Grid tip', thumb:'https://picsum.photos/id/1069/400/700', views:'1.2M' },
  { id:'s2', title:'Unreal parkour glitch', thumb:'https://picsum.photos/id/1011/400/700', views:'843K' },
  { id:'s3', title:'5 Keyboard hacks', thumb:'https://picsum.photos/id/1021/400/700', views:'412K' },
  { id:'s4', title:'Violet sky timelapse', thumb:'https://picsum.photos/id/1018/400/700', views:'2.3M' },
  { id:'s5', title:'3 JS array tricks', thumb:'https://picsum.photos/id/1003/400/700', views:'996K' }
];

// ---------- state & elements ----------
let state = {
  theme: localStorage.getItem('vt_theme') || 'light',
  watchLater: JSON.parse(localStorage.getItem('vt_watchlater') || '[]'),
  currentCategory: 'All',
  page: 1,
  pageSize: 6
};

const body = document.body;
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle = document.getElementById('themeToggle');
const chipsEl = document.getElementById('chips');
const shortsRow = document.getElementById('shortsRow');
const videosGrid = document.getElementById('videos');
const loadMoreBtn = document.getElementById('loadMore');
const watchLaterOpen = document.getElementById('watchLaterOpen');
const watchLaterDrawer = document.getElementById('watchLaterDrawer');
const watchLaterList = document.getElementById('watchLaterList');
const watchLaterClose = document.getElementById('watchLaterClose');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const previewModal = document.getElementById('previewModal');
const previewBackdrop = document.getElementById('modalBackdrop');
const previewClose = document.getElementById('previewClose');
const previewVideo = document.getElementById('previewVideo');
const previewAvatar = document.getElementById('previewAvatar');
const previewTitle = document.getElementById('previewTitle');
const previewChannel = document.getElementById('previewChannel');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// ---------- init ----------
applyTheme(state.theme);
renderChips();
renderShorts();
renderVideos();
renderWatchLater();

// ---------- functions ----------
function applyTheme(t){
  if(t === 'dark'){ body.classList.add('dark'); themeToggle.innerHTML = '<i class="fa-regular fa-moon"></i>'; }
  else { body.classList.remove('dark'); themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>'; }
  localStorage.setItem('vt_theme', t);
  state.theme = t;
}

function renderChips(){
  const cats = ['All','Music','Programming','Gaming','Live','Design','Travel'];
  chipsEl.innerHTML = cats.map(c=>`<button class="chip ${c==='All'?'active':''}" data-cat="${c}">${c}</button>`).join('');
  chipsEl.querySelectorAll('.chip').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      chipsEl.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.cat;
      state.page = 1;
      renderVideos(true);
    });
  });
}

function renderShorts(){
  shortsRow.innerHTML = shortsData.map(s=>`
    <div class="short-card" role="listitem" title="${escapeHtml(s.title)}">
      <span class="badge"><i class="fa-brands fa-youtube"></i> Shorts</span>
      <img src="${s.thumb}" alt="${escapeHtml(s.title)}" loading="lazy">
      <div class="short-meta"><h5>${escapeHtml(s.title)}</h5><div>${s.views} views</div></div>
    </div>
  `).join('');
}

function filterVideos(){
  const cat = state.currentCategory;
  const q = searchInput?.value?.trim().toLowerCase() || '';
  let filtered = sampleVideos.filter(v=> cat==='All' || v.category===cat ||
               (cat==='Live' && v.live) );
  if(q){
    filtered = filtered.filter(v=> v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
  }
  return filtered;
}

function videoCardHTML(v){
  const liveClass = v.live ? ' live' : '';
  return `
    <article class="card" data-id="${v.id}">
      <div class="thumb">
        <img class="thumb-img" src="${v.thumb}" data-hover="${v.thumbHover}" alt="${escapeHtml(v.title)}" loading="lazy">
        <span class="duration${liveClass}">${v.duration}</span>
      </div>
      <div class="meta">
        <div class="channel"><img src="${v.avatar}" alt="${escapeHtml(v.channel)}"></div>
        <div class="text">
          <h3 class="title">${escapeHtml(v.title)}</h3>
          <p class="byline">${escapeHtml(v.channel)}</p>
          <p class="byline">${v.views} • ${v.time}</p>
        </div>
      </div>
      <div class="actions">
        <button class="btn js-preview"><i class="fa-regular fa-circle-play"></i> Preview</button>
        <button class="btn js-save"><i class="fa-regular fa-clock"></i> Watch later</button>
      </div>
    </article>
  `;
}

function renderVideos(reset=false){
  const filtered = filterVideos();
  const start = 0;
  const end = state.page * state.pageSize;
  const pageSlice = filtered.slice(start,end);

  // small loading simulation for UX
  if(reset) videosGrid.innerHTML = '';
  videosGrid.classList.add('loading');
  setTimeout(()=>{
    videosGrid.classList.remove('loading');
    videosGrid.innerHTML = pageSlice.map(videoCardHTML).join('');
    attachCardEvents();
  }, 220);

  // hide load more if no more results
  loadMoreBtn.style.display = filtered.length > pageSlice.length ? 'inline-block' : 'none';
}

function attachCardEvents(){
  document.querySelectorAll('.card').forEach(card=>{
    const img = card.querySelector('.thumb-img');
    const id = card.dataset.id;
    const saveBtn = card.querySelector('.js-save');
    const previewBtn = card.querySelector('.js-preview');

    // hover swap
    img.addEventListener('mouseenter', ()=>{ const h = img.dataset.hover; if(h) img.src = h; });
    img.addEventListener('mouseleave', ()=>{
      const v = sampleVideos.find(x=>x.id===id);
      if(v) img.src = v.thumb;
    });

    // save to watch later
    saveBtn.addEventListener('click', ()=>{
      const v = sampleVideos.find(x=>x.id===id);
      if(!v) return;
      if(!state.watchLater.some(x=>x.id===v.id)){
        state.watchLater.unshift(v);
        if(state.watchLater.length>50) state.watchLater.pop();
        localStorage.setItem('vt_watchlater', JSON.stringify(state.watchLater));
        renderWatchLater();
        toast('Saved to Watch later');
      } else {
        toast('Already in Watch later');
      }
    });

    // preview (open modal)
    previewBtn.addEventListener('click', ()=>{
      const v = sampleVideos.find(x=>x.id===id);
      if(!v) return;
      openPreview(v);
    });
  });
}

function renderWatchLater(){
  if(!watchLaterList) return;
  watchLaterList.innerHTML = state.watchLater.length ? state.watchLater.map(v=>`
    <div class="drawer-item" data-id="${v.id}">
      <a class="drawer-thumb" href="#"><img src="${v.thumb}" alt="${escapeHtml(v.title)}" loading="lazy"></a>
      <div class="drawer-text">
        <h4>${escapeHtml(v.title)}</h4>
        <p class="byline">${escapeHtml(v.channel)} • ${v.views}</p>
        <div style="margin-top:6px">
          <button class="btn js-remove">Remove</button>
        </div>
      </div>
    </div>
  `).join('') : `<p style="color:var(--muted)">Nothing saved yet. Click "Watch later" on any video.</p>`;

  // attach remove handlers
  watchLaterList.querySelectorAll('.js-remove').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.target.closest('.drawer-item').dataset.id;
      state.watchLater = state.watchLater.filter(x=>x.id !== id);
      localStorage.setItem('vt_watchlater', JSON.stringify(state.watchLater));
      renderWatchLater();
      toast('Removed from Watch later');
    });
  });
}

function openDrawer(open = true){
  if(!watchLaterDrawer) return;
  if(open){
    watchLaterDrawer.classList.add('open');
    drawerBackdrop.style.pointerEvents = 'auto';
    drawerBackdrop.style.opacity = '1';
    watchLaterDrawer.setAttribute('aria-hidden','false');
  } else {
    watchLaterDrawer.classList.remove('open');
    drawerBackdrop.style.pointerEvents = 'none';
    drawerBackdrop.style.opacity = '0';
    watchLaterDrawer.setAttribute('aria-hidden','true');
  }
}

function openPreview(v){
  previewVideo.src = v.previewMp4 || '';
  previewTitle.textContent = v.title;
  previewChannel.textContent = v.channel;
  previewAvatar.src = v.avatar;
  previewModal.classList.add('open');
  previewBackdrop.style.pointerEvents = 'auto';
  previewBackdrop.style.opacity = '1';
}

function closePreview(){
  previewModal.classList.remove('open');
  previewBackdrop.style.pointerEvents = 'none';
  previewBackdrop.style.opacity = '0';
  previewVideo.pause();
  previewVideo.currentTime = 0;
  previewVideo.src = '';
}

function toast(msg){
  const el = document.createElement('div');
  el.textContent = msg;
  Object.assign(el.style, {
    position:'fixed',left:'50%',top:'72px',transform:'translateX(-50%)',
    background:'rgba(0,0,0,.8)',color:'#fff',padding:'8px 12px',borderRadius:'8px',zIndex:1200,fontSize:'13px'
  });
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); },1400);
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

// ---------- event wiring ----------
sidebarToggle.addEventListener('click', ()=> sidebar.classList.toggle('collapsed'));

themeToggle.addEventListener('click', ()=>{
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

loadMoreBtn.addEventListener('click', ()=> { state.page++; renderVideos(); });

watchLaterOpen.addEventListener('click', ()=> openDrawer(true));
watchLaterClose?.addEventListener('click', ()=> openDrawer(false));
drawerBackdrop?.addEventListener('click', ()=> openDrawer(false));

previewClose?.addEventListener('click', closePreview);
previewBackdrop?.addEventListener('click', closePreview);
previewModal?.addEventListener('click', (e)=> { if(e.target === previewModal) closePreview(); });

// search
searchForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  state.page = 1;
  renderVideos(true);
});

// keyboard shortcuts
document.addEventListener('keydown', (e)=>{
  if(e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){
    e.preventDefault(); searchInput.focus(); return;
  }
  if(e.key.toLowerCase() === 't'){ applyTheme(state.theme === 'dark' ? 'light' : 'dark'); return; }
  if(e.key.toLowerCase() === 'w'){ openDrawer(true); return; }
});

// lazy: re-run attach events after initial content
// initial render called at top

// ensure watchLater state loaded from localStorage
state.watchLater = JSON.parse(localStorage.getItem('vt_watchlater') || '[]');
renderWatchLater();
