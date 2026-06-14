/* ============================================
   珠稀翡翠珠宝 - 主脚本
   ============================================ */

(function () {
  'use strict';

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // ---- Active Nav Link ----
  var currentPath = location.pathname.replace(/\/$/, '');
  if (currentPath === '/') currentPath = '';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = link.getAttribute('href').replace(/\/$/, '');
    if (href === currentPath || (href === '/' && currentPath === '')) {
      link.classList.add('active');
    }
  });

  // ---- Home Page: Search ----
  var searchInput = document.querySelector('.search-wrapper input');
  var posts = document.querySelectorAll('.post-card');

  if (searchInput && posts.length > 0) {
    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();
      filterPosts(posts, query, null);
    });
  }

  // ---- Home Page: Category Filter ----
  var filterTabs = document.querySelectorAll('.filter-tab');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');

      var category = this.getAttribute('data-category');
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      filterPosts(posts, query, category);
    });
  });

  function filterPosts(posts, query, category) {
    var visibleCount = 0;
    var noPosts = document.querySelector('.no-posts');

    posts.forEach(function (post) {
      var postCategory = post.getAttribute('data-category') || '';
      var postTitle = post.querySelector('h2 a')
        ? post.querySelector('h2 a').textContent.toLowerCase()
        : '';
      var postSummary = post.querySelector('.post-summary')
        ? post.querySelector('.post-summary').textContent.toLowerCase()
        : '';

      var matchQuery = !query || postTitle.indexOf(query) !== -1 || postSummary.indexOf(query) !== -1;
      var matchCategory = !category || category === '全部' || postCategory === category;

      if (matchQuery && matchCategory) {
        post.classList.remove('hidden');
        visibleCount++;
      } else {
        post.classList.add('hidden');
      }
    });

    if (noPosts) noPosts.remove();

    if (visibleCount === 0) {
      var msg = document.createElement('div');
      msg.className = 'no-posts';
      msg.textContent = '没有找到匹配的文章';
      document.querySelector('.posts-grid').appendChild(msg);
    }
  }

  // ---- Back to Top ----
  var backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
