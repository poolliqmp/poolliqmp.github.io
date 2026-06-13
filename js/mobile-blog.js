// ============================================================
// 珠稀翡翠珠宝 - 移动端博客流媒体交互逻辑
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // ===== 顶部导航栏：上滑隐藏，下滑显示 =====
  let lastScrollY = window.scrollY;
  const topNav = document.querySelector('.top-nav');
  const detailProgress = document.querySelector('.detail-progress-bar');
  
  if (topNav) {
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      // 隐藏/显示导航
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        topNav.classList.add('hidden');
      } else {
        topNav.classList.remove('hidden');
      }
      
      // 阅读进度条
      if (detailProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (currentScrollY / docHeight) * 100;
        detailProgress.style.width = scrollPercent + '%';
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  // ===== 下拉刷新 =====
  let startY = 0;
  let isRefreshing = false;
  
  document.addEventListener('touchstart', function(e) {
    if (window.scrollY === 0) {
      startY = e.touches[0].pageY;
    }
  });
  
  document.addEventListener('touchmove', function(e) {
    if (window.scrollY === 0 && !isRefreshing) {
      const diff = e.touches[0].pageY - startY;
      if (diff > 100) {
        isRefreshing = true;
        setTimeout(function() {
          location.reload();
          isRefreshing = false;
        }, 1000);
      }
    }
  });
  
  // ===== 深色模式切换 =====
  const darkModeBtn = document.querySelector('.dark-mode-toggle');
  const html = document.documentElement;
  
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function() {
      html.classList.toggle('dark-mode');
      const isDark = html.classList.contains('dark-mode');
      localStorage.setItem('dark-mode', isDark);
      darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    });
    
    // 检查本地存储
    if (localStorage.getItem('dark-mode') === 'true') {
      html.classList.add('dark-mode');
      darkModeBtn.textContent = '☀️';
    }
  }
  
  // ===== 关注按钮 =====
  const followBtn = document.querySelector('.detail-follow-btn');
  if (followBtn) {
    followBtn.addEventListener('click', function() {
      if (this.textContent === '+ 关注') {
        this.textContent = '已关注';
        this.style.background = '#E5E7EB';
        this.style.color = '#6B7280';
      } else {
        this.textContent = '+ 关注';
        this.style.background = '';
        this.style.color = '';
      }
    });
  }
  
  // ===== 点赞功能 =====
  const likeBtns = document.querySelectorAll('.bottom-action[data-action="like"]');
  likeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('.bottom-action-icon');
      if (this.classList.contains('liked')) {
        this.classList.remove('liked');
        icon.textContent = '🤍';
      } else {
        this.classList.add('liked');
        icon.textContent = '❤️';
        icon.style.animation = 'pulse 0.3s ease';
        setTimeout(function() {
          icon.style.animation = '';
        }, 300);
      }
    });
  });
  
  // ===== 分类标签切换 =====
  const tabs = document.querySelectorAll('.tab-item');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });
  
  // ===== 底部导航切换 =====
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  bottomNavItems.forEach(function(item) {
    item.addEventListener('click', function() {
      bottomNavItems.forEach(function(nav) { nav.classList.remove('active'); });
      this.classList.add('active');
    });
  });
  
  // ===== 评论区折叠/展开 =====
  const commentToggle = document.querySelector('.comment-toggle');
  const commentArea = document.querySelector('.comment-area');
  
  if (commentToggle && commentArea) {
    commentToggle.addEventListener('click', function() {
      commentArea.classList.toggle('collapsed');
      this.textContent = commentArea.classList.contains('collapsed') ? '查看全部评论 ▶' : '收起评论 ▲';
    });
  }
  
  // ===== 分享功能 =====
  const shareBtn = document.querySelector('.bottom-action[data-action="share"]');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      const title = document.querySelector('.card-title, .article-title')?.textContent || '珠稀翡翠珠宝';
      const url = window.location.href;
      
      if (navigator.share) {
        navigator.share({
          title: title,
          url: url
        }).catch(function() {});
      } else {
        // 复制链接
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        alert('链接已复制！可以粘贴分享给朋友~');
      }
    });
  }
  
  // ===== 骨架屏加载效果 =====
  const cards = document.querySelectorAll('.feed-card');
  cards.forEach(function(card, index) {
    card.style.animationDelay = (index * 0.1) + 's';
  });
  
  // ===== 视频自动播放（静音） =====
  const videos = document.querySelectorAll('.card-media[poster]');
  videos.forEach(function(video) {
    video.muted = true;
    video.playsInline = true;
    video.addEventListener('click', function() {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    });
  });
});
