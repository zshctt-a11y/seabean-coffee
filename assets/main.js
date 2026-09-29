(function () {
  // 页头：滚动后变实底
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 60) header.classList.add('solid');
      else header.classList.remove('solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 当前导航高亮
  var page = (location.pathname.split('/').pop() || 'index.html').split('#')[0];
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href').split('#')[0];
    if (href === page) a.classList.add('active');
  });

  // 图片缺失回退：任一图片 404 时整页切换为品牌渐变占位
  var photos = ['hero_sea_coffee.jpg', 'shop_exterior.jpg', 'shop_interior.jpg', 'shop_seating.jpg'];
  var failed = 0;
  photos.forEach(function (f) {
    var im = new Image();
    im.onerror = function () {
      failed++;
      if (failed >= 1) document.documentElement.classList.add('no-photos');
    };
    im.src = 'assets/' + f;
  });

  // 入场动效
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
