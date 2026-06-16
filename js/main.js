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
  var searchBtn = document.querySelector('.search-btn');
  var posts = document.querySelectorAll('.post-card');

  function doSearch() {
    if (!searchInput || !posts.length) return;
    var query = searchInput.value.trim().toLowerCase();
    var activeCategory = null;
    var activeTab = document.querySelector('.filter-tab.active');
    if (activeTab) activeCategory = activeTab.getAttribute('data-category');
    filterPosts(posts, query, activeCategory);
  }

  if (searchInput && posts.length > 0) {
    searchInput.addEventListener('input', function () {
      doSearch();
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      doSearch();
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

  // ---- Share Buttons ----
  var siteUrl = location.origin;
  var sharePlatforms = {
    wechat: { label: '微信', icon: '\ud83d\udcac', url: function(title, url) {
      // 微信：复制链接，提示扫码分享
      return null;
    }},
    weibo: { label: '微博', icon: '\ud83d\udfe5', url: function(title, url) {
      return 'https://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    }},
    xhs: { label: '小红书', icon: '\ud83d\udd25', url: function(title, url) {
      // 小红书：复制链接
      return null;
    }},
    qq: { label: 'QQ', icon: '\ud83d\udc71', url: function(title, url) {
      return 'https://connect.qq.com/widget/share/shareshare.html?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    }},
    zhihu: { label: '知乎', icon: '\ud83d\udcda', url: function(title, url) {
      return 'https://www.zhihu.com/question/share?url=' + encodeURIComponent(url);
    }},
    baidu: { label: '贴吧', icon: '\ud83d\udcdc', url: function(title, url) {
      return 'https://tieba.baidu.com/f/share/sharePost?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    }}
  };

  function createShareSection() {
    var postPage = document.querySelector('.post-page');
    if (!postPage) return;

    var title = document.querySelector('.post-page-title');
    if (!title) return;

    var articleTitle = title.textContent.trim();
    var articleUrl = siteUrl + location.pathname;

    var shareDiv = document.createElement('div');
    shareDiv.className = 'share-section';

    var box = document.createElement('div');
    box.className = 'share-box';

    var shareTitle = document.createElement('div');
    shareTitle.className = 'share-title';
    shareTitle.textContent = '\ud83d\udce3 分享到';
    box.appendChild(shareTitle);

    var btnContainer = document.createElement('div');
    btnContainer.className = 'share-buttons';

    // Build platform buttons
    Object.keys(sharePlatforms).forEach(function(key) {
      var platform = sharePlatforms[key];
      var btn = document.createElement('button');
      btn.className = 'share-btn ' + key;
      btn.innerHTML = platform.icon + ' ' + platform.label;
      btn.setAttribute('data-platform', key);
      btn.setAttribute('data-title', articleTitle);
      btn.setAttribute('data-url', articleUrl);
      btnContainer.appendChild(btn);
    });

    // Copy link button
    var copyBtn = document.createElement('button');
    copyBtn.className = 'share-btn copy-link';
    copyBtn.innerHTML = '\ud83d\udccb 复制链接';
    copyBtn.setAttribute('data-url', articleUrl);
    copyBtn.setAttribute('data-title', articleTitle);
    btnContainer.appendChild(copyBtn);

    box.appendChild(btnContainer);
    shareDiv.appendChild(box);

    // Insert after post-page-content, before back-btn
    var postContent = document.querySelector('.post-page-content');
    var backBtnWrap = document.querySelector('.post-page')?.querySelector(':scope > div:last-child');
    if (postContent && backBtnWrap) {
      postPage.insertBefore(shareDiv, backBtnWrap.nextSibling);
    } else {
      postPage.appendChild(shareDiv);
    }

    // Bind events
    btnContainer.querySelectorAll('.share-btn').forEach(function(b) {
      b.addEventListener('click', function() {
        var platform = this.getAttribute('data-platform');
        var t = this.getAttribute('data-title');
        var u = this.getAttribute('data-url');

        if (platform === 'copy-link') {
          copyToClipboard(u);
          return;
        }

        var sp = sharePlatforms[platform];
        var link = sp.url(t, u);
        if (link) {
          window.open(link, '_blank', 'width=600,height=400,noopener,noreferrer');
        } else if (platform === 'wechat' || platform === 'xhs') {
          copyToClipboard(u);
          showToast('已复制链接，请在' + sp.label + '中粘贴分享');
        }
      });
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('链接已复制到剪贴板');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('链接已复制到剪贴板'); }
    catch(e) { showToast('复制失败，请手动复制链接'); }
    document.body.removeChild(ta);
  }

  function showToast(msg) {
    var toast = document.querySelector('.share-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'share-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2500);
  }

  createShareSection();

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
