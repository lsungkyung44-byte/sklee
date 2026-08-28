// ============================================================
// GONGGAN ON — shared site script (guards every feature so one
// file can be included on every page regardless of what exists)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- nav shrink on scroll ----
  const navEl = document.getElementById('siteNav');
  if (navEl) {
    const onScroll = () => navEl.classList.toggle('shrink', window.scrollY > 24);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- mobile menu ----
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---- reveal + glow + scale-bar draw-in ----
  const revealEls = document.querySelectorAll('.reveal, .glow, .scale-bar');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14 });
    revealEls.forEach(el => io.observe(el));
  }

  // ---- hero video play (home page) ----
  const heroEl = document.getElementById('heroSection');
  if (heroEl) {
    const playBtn = document.getElementById('playBtn');
    const heroVideoEl = heroEl.querySelector('video');
    if (playBtn && heroVideoEl) {
      playBtn.addEventListener('click', () => {
        heroEl.classList.add('playing');
        heroVideoEl.play();
      });
    }
  }

  // ---- portfolio grid + modal (portfolio page only) ----
  const pfGrid = document.getElementById('pfGrid');
  if (pfGrid) {
    const projects = [
      { cat: 'RESIDENTIAL', num: '01', title: '주방 리노베이션', loc: '서울 · 아파트', area: '24평형 주방/다이닝', type: '주거 · 부분 리모델링', year: '2025', size: 'lg', ratio: '4-3', concept: '따뜻한 오크 톤과 스톤 아일랜드로 조리와 다이닝의 동선을 하나로 연결한 프로젝트. 은은한 간접조명으로 저녁 시간의 온기를 더했습니다.', img: 'assets/pf_kitchen.jpg' },
      { cat: 'RESIDENTIAL', num: '02', title: '거실 TV월 리모델링', loc: '서울 · 아파트', area: '34평형 거실', type: '주거 · 거실 리모델링', year: '2025', size: 'md', ratio: '3-4', concept: '수납장과 조명을 하나의 매스로 통합한 TV월. 자연스러운 그레이지 톤 마감재로 오래 보아도 질리지 않는 배경을 만들었습니다.', img: 'assets/pf_living.jpg' },
      { cat: 'COMMERCIAL', num: '03', title: '브랜드 스튜디오 리셉션', loc: '서울 성수동', area: '42평', type: '상업공간 · 브랜드 스튜디오', year: '2024', size: 'sm', ratio: '4-3', concept: '대리석 리셉션 데스크를 중심으로 브랜드 아이덴티티를 공간 언어로 번역한 프로젝트. 절제된 조명으로 첫인상의 무게를 더했습니다.', img: 'assets/pf_studio.jpg' },
      { cat: 'COMMERCIAL', num: '04', title: '카페 인테리어', loc: '서울 · 카페', area: '56평', type: '상업공간 · 카페', year: '2024', size: 'wide', ratio: '16-9', concept: '통유리창의 자연광과 펜던트 조명이 만나는 좌석 공간. 오크 가구와 스톤 바를 매치해 머무르고 싶은 카페를 완성했습니다.', img: 'assets/pf_cafe.jpg' },
      { cat: 'OFFICE', num: '05', title: '오피스 & 회의공간', loc: '서울 · 오피스', area: '68평', type: '오피스 · 회의공간', year: '2023', size: 'md', ratio: '4-3', concept: '유리 파티션으로 개방감을 살리면서도 집중이 가능한 회의공간을 설계했습니다. 우드 테이블과 뉴트럴 톤으로 실무형 고급스러움을 담았습니다.', img: 'assets/pf_office.jpg' },
      { cat: 'COMMERCIAL', num: '06', title: '쇼룸 인테리어', loc: '서울 · 쇼룸', area: '48평', type: '상업공간 · 쇼룸', year: '2023', size: 'lg', ratio: '4-3', concept: '제품이 주인공이 되도록 배경을 절제한 쇼룸. 라인 조명과 진열 시스템으로 브랜드의 톤앤매너를 공간 전체에 일관되게 담았습니다.', img: 'assets/pf_showroom.jpg' }
    ];

    projects.forEach((p, i) => {
      const card = document.createElement('button');
      card.className = `pf-item reveal size-${p.size} ratio-${p.ratio}`;
      card.setAttribute('data-index', i);
      card.innerHTML = `
        <span class="crop-frame"><span class="ct"></span><img src="${p.img}" alt="${p.title}" loading="lazy"><span class="fig"><b>${p.num}</b>${p.cat}</span></span>
        <div class="meta">
          <div>
            <span class="cat">${p.cat}</span>
            <h3>${p.title}</h3>
            <div class="loc" style="font-size:12.5px;color:var(--ink-soft);margin-top:3px;">${p.loc}</div>
          </div>
          <span class="yr">${p.year}</span>
        </div>`;
      pfGrid.appendChild(card);
      card.addEventListener('click', () => openModal(i));
    });
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } });
    }, { threshold: 0.14 });
    pfGrid.querySelectorAll('.pf-item').forEach(el => io2.observe(el));

    const pfModal = document.getElementById('pfModal');
    const pfModalBody = document.getElementById('pfModalBody');
    let currentIndex = 0;
    let lastFocused = null;

    function renderModal(i) {
      const p = projects[i];
      pfModalBody.innerHTML = `
        <button class="modal-close" id="modalCloseBtn" aria-label="닫기">×</button>
        <span class="crop-frame"><span class="ct"></span><img src="${p.img}" alt="${p.title}"><span class="fig"><b>${p.num}</b>${p.cat}</span></span>
        <div class="modal-body">
          <span class="cat">${p.cat}</span>
          <h3>${p.title}</h3>
          <dl class="modal-fields">
            <div><dt>위치</dt><dd>${p.loc}</dd></div>
            <div><dt>면적</dt><dd>${p.area}</dd></div>
            <div><dt>공간 유형</dt><dd>${p.type}</dd></div>
            <div><dt>준공 연도</dt><dd>${p.year} · GONGGANON-${p.num}</dd></div>
          </dl>
          <p class="modal-concept">${p.concept}</p>
        </div>`;
      document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    }
    function openModal(i) {
      currentIndex = i; lastFocused = document.activeElement;
      renderModal(i); pfModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('modalCloseBtn').focus();
    }
    function closeModal() {
      pfModal.classList.remove('open'); document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
    document.getElementById('pfPrev').addEventListener('click', () => { currentIndex = (currentIndex - 1 + projects.length) % projects.length; renderModal(currentIndex); });
    document.getElementById('pfNext').addEventListener('click', () => { currentIndex = (currentIndex + 1) % projects.length; renderModal(currentIndex); });
    pfModal.addEventListener('click', (e) => { if (e.target === pfModal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (!pfModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') document.getElementById('pfPrev').click();
      if (e.key === 'ArrowRight') document.getElementById('pfNext').click();
    });
  }

  // ---- contact form (contact page only) ----
  const form = document.getElementById('consultForm');
  if (form) {
    const success = document.getElementById('formSuccess');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.classList.add('show');
      success.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
      form.querySelectorAll('input,select,textarea').forEach(el => el.disabled = true);
      form.querySelector('button[type="submit"]').disabled = true;
    });
  }
});
