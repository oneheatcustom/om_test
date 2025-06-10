(() => {
  // Логіка при зміні URL
  const handleUrlChange = () => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith('smartico_dl=')) return;

    const value = hash.replace('smartico_dl=', '');
    console.log('🎯 Smartico DL Triggered:', value);

    // Твоя логіка
    if (value && window._smartico) {
      window._smartico.dp(value);
      window.history.replaceState(null, document.title, window.location.href.split('#')[0]);
    }
  };

  // Слухач для hashchange
  window.addEventListener('hashchange', () => {
    console.log('🔄 hashchange');
    handleUrlChange();
  });

  // Слухач для popstate (назад/вперед в історії)
  window.addEventListener('popstate', () => {
    console.log('🔁 popstate');
    handleUrlChange();
  });

  // Патчимо pushState та replaceState
  const patchHistoryMethod = (method) => {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      const event = new Event(method);
      event.arguments = arguments;
      window.dispatchEvent(event);
      return result;
    };
  };

  patchHistoryMethod('pushState');
  patchHistoryMethod('replaceState');

  // Слухачі на pushState / replaceState
  window.addEventListener('pushState', () => {
    console.log('📌 pushState');
    handleUrlChange();
  });

  window.addEventListener('replaceState', () => {
    console.log('✏️ replaceState');
    handleUrlChange();
  });

  console.log('✅ URL change tracker initialized');
})();
