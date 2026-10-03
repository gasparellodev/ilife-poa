'use strict';
(() => {
  const config = window.ILIFE_CONFIG || {};
  const color16 = [
    { name: 'Verde-acinzentado', hex: '#a9c5bf', image: 'assets/iphone-16-teal.png' },
    { name: 'Ultramarino', hex: '#8892cf', image: 'assets/iphone-16-ultramarine.png' },
    { name: 'Rosa', hex: '#e5adc8', image: 'assets/iphone-16-pink.png' },
    { name: 'Branco', hex: '#ececec', image: 'assets/iphone-16-white.png' },
    { name: 'Preto', hex: '#414346', image: 'assets/iphone-16-black.png' }
  ];
  const products = [
    { id: 'iphone15pro', name: 'iPhone 15 Pro', family: '15', pro: true, tag: 'Para ir além.', subtitle: 'Um olhar Pro para tudo o que você faz.', image: 'assets/iphone-15pro.jpg', colors: [{ name: 'Titânio natural', hex: '#b2aaa0', image: 'assets/iphone-15pro.jpg' }], capacities: ['128 GB', '256 GB', '512 GB', '1 TB'], chip: 'A17 Pro', screen: '6,1 polegadas', camera: 'Sistema de câmera Pro de 48 MP' },
    { id: 'iphone16', name: 'iPhone 16', family: '16', pro: false, tag: 'Seu dia em novas cores.', subtitle: 'Potência e personalidade. Do seu jeito.', image: color16[0].image, colors: color16, capacities: ['128 GB', '256 GB', '512 GB'], chip: 'A18', screen: '6,1 polegadas', camera: 'Câmera Fusion de 48 MP' },
    { id: 'iphone16plus', name: 'iPhone 16 Plus', family: '16', pro: false, tag: 'Mais espaço para o seu mundo.', subtitle: 'Uma tela grande para grandes momentos.', image: 'assets/iphone-16plus.jpg', colors: [{ name: 'Preto', hex: '#454749', image: 'assets/iphone-16plus.jpg' }], capacities: ['128 GB', '256 GB', '512 GB'], chip: 'A18', screen: '6,7 polegadas', camera: 'Câmera Fusion de 48 MP' },
    { id: 'iphone15plus', name: 'iPhone 15 Plus', family: '15', pro: false, tag: 'Um grande companheiro.', subtitle: 'Tudo o que importa. Em cada detalhe.', image: 'assets/iphone-15plus.jpg', colors: [{ name: 'Azul', hex: '#c5d6df', image: 'assets/iphone-15plus.jpg' }], capacities: ['128 GB', '256 GB', '512 GB'], chip: 'A16 Bionic', screen: '6,7 polegadas', camera: 'Câmera principal de 48 MP' }
  ];
  const instagram = config.instagram || 'https://www.instagram.com/ilife_poa/';
  const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
  const contactUrl = message => whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message || 'Olá, iLife Poá! Gostaria de saber mais sobre os iPhones.')}` : instagram;
  document.querySelectorAll('[data-contact]').forEach(link => { link.href = contactUrl(); });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-instagram]').forEach(link => { link.href = instagram; });
  const menu = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menu && navLinks) {
    const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); navLinks.classList.remove('open'); };
    menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!expanded)); menu.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu'); navLinks.classList.toggle('open', !expanded); });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  }
  const grid = document.getElementById('product-grid');
  function renderProducts(filter = 'all') {
    if (!grid) return;
    const filtered = products.filter(product => filter === 'all' || filter === 'pro' && product.pro || filter === '16' && product.family === '16' || filter === 'essentials' && product.family === '15' && !product.pro);
    grid.innerHTML = filtered.map((product, index) => `<article class="product-card" style="animation-delay:${index * 45}ms"><p class="product-tag">${product.tag}</p><button class="product-image-button" data-product="${product.id}" aria-label="Ver detalhes do ${product.name}"><img src="${product.image}" alt="${product.name} ${product.colors[0].name.toLowerCase()}, frente e verso" width="400" height="475" loading="lazy"></button><div class="swatch-row" aria-label="${product.colors.length > 1 ? 'Cores de referência' : 'Cor ilustrada'}">${product.colors.map(color => `<span class="swatch-dot" style="background:${color.hex}" title="${color.name}"></span>`).join('')}</div><h3>${product.name}</h3><p class="product-subtitle">${product.subtitle}</p><p class="product-spec">${product.chip} · ${product.screen.replace(' polegadas', '″')}</p><button class="button button-blue" data-product="${product.id}" aria-label="Conhecer ${product.name}">Conhecer modelo</button><p class="product-availability">Valores e opções sob consulta</p></article>`).join('');
    const count = document.getElementById('catalog-count');
    if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? 'modelo' : 'modelos'}`;
  }
  renderProducts();
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(filterButton => { const active = button === filterButton; filterButton.classList.toggle('active', active); filterButton.setAttribute('aria-pressed', String(active)); });
      renderProducts(button.dataset.filter);
    });
  });
  function colorButtons(colors, activeIndex = 0) {
    return colors.map((color, index) => `<button class="color-button" data-color="${index}" aria-label="${color.name}" title="${color.name}" aria-pressed="${index === activeIndex}"><span style="background:${color.hex}"></span></button>`).join('');
  }
  const featureColors = document.querySelector('.feature-copy .feature-colors');
  if (featureColors) {
    featureColors.innerHTML = colorButtons(color16);
    featureColors.addEventListener('click', event => {
      const button = event.target.closest('[data-color]');
      if (!button) return;
      const color = color16[Number(button.dataset.color)];
      featureColors.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const image = document.getElementById('feature-phone');
      image.src = color.image; image.alt = `iPhone 16 ${color.name.toLowerCase()}`;
      document.getElementById('feature-color-name').textContent = color.name;
    });
  }
  const dialog = document.getElementById('product-dialog');
  let selectedProduct, selectedCapacity, selectedColor;
  let lastFocused;
  function inquiryMessage() { return `Olá, iLife Poá! Tenho interesse no ${selectedProduct.name}, ${selectedCapacity}, na cor ${selectedColor.name}. Vocês podem confirmar disponibilidade e valor?`; }
  function updateInquiry() { const link = document.getElementById('product-inquiry'); if (link) link.href = contactUrl(inquiryMessage()); }
  function openProduct(id) {
    const product = products.find(item => item.id === id);
    if (!product || !dialog) return;
    selectedProduct = product; selectedCapacity = product.capacities[0]; selectedColor = product.colors[0]; lastFocused = document.activeElement;
    document.getElementById('dialog-content').innerHTML = `<div class="dialog-layout"><div class="dialog-photo"><img id="dialog-image" src="${product.image}" width="400" height="475" alt="${product.name} ${selectedColor.name.toLowerCase()}"></div><div class="dialog-info"><p class="eyebrow">CONHEÇA SEU PRÓXIMO</p><h2 id="dialog-title">${product.name}</h2><p class="dialog-subtitle">${product.subtitle}</p><ul class="spec-list"><li><span>Chip</span>${product.chip}</li><li><span>Tela OLED</span>${product.screen}</li><li><span>Câmera</span>${product.camera}</li></ul><span class="dialog-label">Capacidade de referência</span><div class="capacity-picker" role="group" aria-label="Escolher capacidade">${product.capacities.map((capacity, index) => `<button data-capacity="${capacity}" aria-pressed="${index === 0}">${capacity}</button>`).join('')}</div><span class="dialog-label">${product.colors.length > 1 ? 'Escolha uma cor' : 'Cor ilustrada'}</span><div class="feature-colors" role="group" aria-label="Cores de referência">${colorButtons(product.colors)}</div><p class="color-caption" id="dialog-color-name">${selectedColor.name}</p><div class="dialog-actions"><a id="product-inquiry" class="button button-blue" href="${contactUrl(inquiryMessage())}" target="_blank" rel="noopener noreferrer">${whatsapp ? 'Consultar no WhatsApp' : 'Consultar no Instagram'}</a><button class="text-link" id="copy-inquiry">Copiar mensagem de interesse</button></div><p class="dialog-note">Consulte valores e disponibilidade com a equipe. As imagens e configurações são referências do modelo.</p></div></div>`;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }
  function closeProduct() { if (!dialog) return; dialog.close(); }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-product]');
    if (button) openProduct(button.dataset.product);
  });
  if (dialog) {
    dialog.querySelector('.dialog-close').addEventListener('click', closeProduct);
    dialog.addEventListener('click', event => {
      if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProduct(); }
      const capacityButton = event.target.closest('[data-capacity]');
      if (capacityButton) { selectedCapacity = capacityButton.dataset.capacity; dialog.querySelectorAll('[data-capacity]').forEach(item => item.setAttribute('aria-pressed', String(item === capacityButton))); updateInquiry(); }
      const colorButton = event.target.closest('[data-color]');
      if (colorButton) { selectedColor = selectedProduct.colors[Number(colorButton.dataset.color)]; dialog.querySelectorAll('[data-color]').forEach(item => item.setAttribute('aria-pressed', String(item === colorButton))); const image = document.getElementById('dialog-image'); image.src = selectedColor.image; image.alt = `${selectedProduct.name} ${selectedColor.name.toLowerCase()}`; document.getElementById('dialog-color-name').textContent = selectedColor.name; updateInquiry(); }
      if (event.target.closest('#copy-inquiry')) copyText(inquiryMessage());
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (lastFocused && lastFocused.isConnected) lastFocused.focus(); });
  }
  let toastTimeout;
  function notify(message) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3600); }
  async function copyText(text, successMessage = 'Mensagem copiada. Cole na conversa com a iLife.') {
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('fallback'); await navigator.clipboard.writeText(text); notify(successMessage); }
    catch {
      const field = document.createElement('textarea'); field.value = text; field.setAttribute('aria-label', 'Mensagem de interesse'); field.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0'; (dialog && dialog.open ? dialog : document.body).appendChild(field); field.focus(); field.select();
      try { if (!document.execCommand('copy')) throw new Error('clipboard'); notify(successMessage); }
      catch { window.prompt('Copie a mensagem para enviar à loja:', text); }
      finally { field.remove(); document.getElementById('copy-inquiry')?.focus(); }
    }
  }
  document.querySelectorAll('.faq-list details').forEach(detail => detail.addEventListener('toggle', () => { if (detail.open) document.querySelectorAll('.faq-list details').forEach(other => { if (other !== detail) other.open = false; }); }));
  const shareButton = document.getElementById('share-bio');
  if (shareButton) shareButton.addEventListener('click', async () => {
    const url = window.location.href;
    try { if (navigator.share) await navigator.share({ title: 'iLife Poá', text: 'Conheça a iLife Poá e explore os iPhones.', url }); else await copyText(url, 'Link copiado. Compartilhe a iLife.'); }
    catch (error) { if (error.name !== 'AbortError') notify('Abra o menu do navegador para compartilhar esta página.'); }
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
  if (config.address) document.querySelectorAll('[data-address]').forEach(el => { el.textContent = config.address; });
})();
