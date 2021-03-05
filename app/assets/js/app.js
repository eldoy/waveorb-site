function setActiveLink(options = {}) {
  document.querySelectorAll(options.selector || 'a').forEach(function(el) {
    if (el.pathname == location.pathname) {
      el.classList.add(options.active || 'active')
    }
  })
}
