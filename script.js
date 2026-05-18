/* ══════════════════════════════
     NAV MOBILE
  ══════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  /* ══════════════════════════════
     SCROLL INDICATOR (hero)
  ══════════════════════════════ */
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  window.addEventListener('scroll', () => {
    if (scrollIndicator) {
      scrollIndicator.style.opacity = window.scrollY > 80 ? '0' : '1';
    }
  }, { passive: true });

  /* ══════════════════════════════
     BACK TO TOP
  ══════════════════════════════ */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ══════════════════════════════
     REVEAL ON SCROLL
  ══════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════
     COUNTER ANIMATION
  ══════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ══════════════════════════════
     TOAST
  ══════════════════════════════ */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
  }

  /* ══════════════════════════════
     FORMULÁRIO → WHATSAPP
  ══════════════════════════════ */
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Preencha todos os campos obrigatórios.');
      return;
    }

    const subjectLabel = document.getElementById('contact-subject').options[
      document.getElementById('contact-subject').selectedIndex
    ].text;

    const text = `Olá! Meu nome é *${name}* (${email}).\n\n*Serviço de interesse:* ${subjectLabel}\n\n*Mensagem:*\n${message}`;
    const url  = `https://wa.me/5581981279574?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
    showToast('Redirecionando para o WhatsApp...');
    this.reset();
  });

  /* ══════════════════════════════
     ÂNCORA ATIVA NO SCROLL
  ══════════════════════════════ */
  const navSections = ['servicos', 'processo', 'sobre', 'projetos', 'contato'];
  const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');
  const navHeight   = document.querySelector('nav')?.offsetHeight || 62;

  const anchorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: `-${navHeight}px 0px -60% 0px`,
    threshold: 0
  });

  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) anchorObserver.observe(el);
  });

  /* ══════════════════════════════
     PROJETOS
  ══════════════════════════════ */
  const projects = [
    {
      tag: 'Automação · CRM · WhatsApp',
      title: 'Bot automatizado + CRM — Gráfica RL',
      desc: 'Integração do WhatsApp diretamente ao CRM da gráfica — consulta de pedidos, respostas automáticas e atendimento inteligente em tempo real, eliminando tarefas manuais e reduzindo o tempo de atendimento.',
      challenge: 'A gráfica recebia dezenas de mensagens diárias no WhatsApp e precisava consultar planilhas manualmente para responder clientes, gerando atrasos e erros.',
      solution: 'Desenvolvemos um bot integrado à API oficial do WhatsApp conectado ao Google Sheets via Apps Script, com fluxos automáticos de consulta de pedidos, status e notificações.',
      tech: ['Apps Script', 'Google Sheets', 'WhatsApp API', 'Webhooks', 'CRM'],
      media: [
        { type: 'img',   src: 'media/images/grafica_rl_bot.gif', label: 'Fluxo do bot' },
        { type: 'video', src: 'media/videos/project-1-phone.mp4', label: 'Demo do bot' }
      ]
    },
    {
      tag: 'Sistema · Reservas · App de gestão',
      title: 'Sistema de reservas — Alugue em Carneiros',
      desc: 'Sistema completo de reservas integrado ao WhatsApp com confirmação automática, lembretes e app de gestão de imóveis, calendário e controle operacional.',
      challenge: 'A empresa gerenciava reservas de imóveis em Carneiros manualmente, com risco de double booking e comunicação descentralizada com hóspedes.',
      solution: 'Criamos um sistema end-to-end com AppSheet para gestão interna, Google Sheets como banco de dados e automações via Apps Script para confirmações e lembretes por WhatsApp.',
      tech: ['AppSheet', 'Google Sheets', 'Apps Script', 'WhatsApp API', 'Webhooks'],
      media: [
        { type: 'img',   src: 'media/images/project-2-pc.png', label: 'App de gestão' },
        { type: 'video', src: 'media/videos/project-2-phone.mp4', label: 'Demo do bot' }
      ]
    },
    {
      tag: 'E-commerce · Catálogo · Landing Page',
      title: 'Landing Page + catálogo dinâmico — Dom Maior',
      desc: 'Página web completa com catálogo dinâmico, carrinho e redirecionamento para WhatsApp e Mercado Livre. Identidade visual minimalista e moderna.',
      challenge: 'A marca Dom Maior precisava de presença digital com catálogo atualizado em tempo real, sem depender de plataformas pagas de e-commerce.',
      solution: 'Desenvolvemos uma landing page em HTML/CSS/JS com Firebase como backend, permitindo atualização do catálogo via painel simples e integração direta com WhatsApp.',
      tech: ['HTML/CSS/JS', 'Firebase', 'Apps Script', 'Google Sheets'],
      media: [
        { type: 'iframe', src: 'media/images/dommaior.html', label: 'Home do site' },
        { type: 'img',    src: 'media/images/project-3-pc-2.png',    label: 'Catálogo de produtos' },
        { type: 'video',  src: 'media/videos/project-3-phone.mp4',   label: 'Versão mobile' }
      ]
    }
  ];

  let currentMedia = [], currentIndex = 0;

  function openModal(index) {
    const p = projects[index];
    currentMedia = p.media;
    currentIndex = 0;
    document.getElementById('modal-tag').textContent       = p.tag;
    document.getElementById('modal-title').textContent     = p.title;
    document.getElementById('modal-desc').textContent      = p.desc;
    document.getElementById('modal-challenge').textContent = p.challenge;
    document.getElementById('modal-solution').textContent  = p.solution;
    document.getElementById('modal-tech').innerHTML = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
    renderMedia(0);
    renderThumbs();
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.modal-media-main video').forEach(v => v.pause());
    document.querySelectorAll('.modal-media-main iframe').forEach(f => {
      // limpa o src para parar carregamento ao fechar
      f.src = f.src;
    });
  }

  function renderMedia(index) {
    currentIndex = index;
    const item = currentMedia[index];
    const el   = document.getElementById('modal-media-main');

    // reset orientação antes de renderizar
    el.classList.remove('is-vertical');

    if (item.type === 'video') {
      el.innerHTML = item.src
        ? `<video src="${item.src}" autoplay muted loop playsinline></video>`
        : `<div class="media-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>${item.label}</span></div>`;

      // detecta se o vídeo é vertical após carregar os metadados
      if (item.src) {
        const video = el.querySelector('video');
        video.addEventListener('loadedmetadata', () => {
          if (video.videoHeight > video.videoWidth) {
            el.classList.add('is-vertical');
          }
        }, { once: true });
      }

    } else if (item.type === 'iframe') {
      el.innerHTML = `<iframe
        src="${item.src}"
        style="width:100%;height:100%;border:none;display:block;"
        loading="lazy"
        allowfullscreen
      ></iframe>`;

    } else {
      el.innerHTML = item.src
        ? `<img src="${item.src}" alt="${item.label}" loading="lazy" />`
        : `<div class="media-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>${item.label}</span></div>`;
    }

    document.querySelectorAll('.modal-thumb').forEach((t, i) => t.classList.toggle('active', i === index));
  }

  function renderThumbs() {
    document.getElementById('modal-thumbs').innerHTML = currentMedia.map((item, i) => `
      <button class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="renderMedia(${i})">
        ${item.type === 'video'
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
          : item.type === 'iframe'
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 3 9 21"/><polyline points="15 3 15 21"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
        }
        <span>${item.label}</span>
      </button>`).join('');
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });