// 浮动分类标签和分享按钮脚本

document.addEventListener('DOMContentLoaded', function() {
  // 获取分类数据
  const categories = [
    {name: '翡翠知识', url: '/categories/翡翠知识/'},
    {name: '翡翠鉴赏', url: '/categories/翡翠鉴赏/'},
    {name: '公告', url: '/categories/公告/'}
  ];
  
  // 只在文章页面显示浮动分类和分享按钮
  if (document.querySelector('.article-type-post')) {
    // 创建浮动分类标签
    const floatingCategories = document.createElement('div');
    floatingCategories.id = 'floating-categories';
    floatingCategories.innerHTML = `
      <div class="category-title">📚 文章目录</div>
      <ul class="category-list">
        ${categories.map(cat => `
          <li class="category-item">
            <a href="${cat.url}" class="category-link">
              ${cat.name}
              <span class="category-count">文章</span>
            </a>
          </li>
        `).join('')}
      </ul>
    `;
    document.body.appendChild(floatingCategories);
    
    // 创建分享按钮
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    shareButtons.innerHTML = `
      <h4>分享到</h4>
      <div class="share-list">
        <a href="#" class="share-item share-weixin" onclick="shareToWeixin('${document.title}', '${window.location.href}')" title="微信">
          <i class="fa fa-weixin"></i> 微信
        </a>
        <a href="#" class="share-item share-weibo" onclick="shareToWeibo('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="微博">
          <i class="fa fa-weibo"></i> 微博
        </a>
        <a href="#" class="share-item share-qzone" onclick="shareToQZone('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="QQ空间">
          <i class="fa fa-qq"></i> QQ空间
        </a>
        <a href="#" class="share-item share-douyin" onclick="shareToDouyin('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="抖音">
          <i class="fa fa-music"></i> 抖音
        </a>
        <a href="#" class="share-item share-xiaohongshu" onclick="shareToXiaoHongShu('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="小红书">
          <i class="fa fa-heart"></i> 小红书
        </a>
        <a href="#" class="share-item share-toutiao" onclick="shareToTouTiao('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="头条">
          <i class="fa fa-newspaper-o"></i> 头条
        </a>
        <a href="#" class="share-item share-baidu" onclick="shareToBaidu('${encodeURIComponent(document.title)}', '${encodeURIComponent(window.location.href)}')" title="百度">
          <i class="fa fa-baidu"></i> 百度
        </a>
      </div>
    `;
    
    // 将分享按钮添加到文章底部
    const articleFooter = document.querySelector('.article-footer');
    if (articleFooter) {
      articleFooter.parentNode.insertBefore(shareButtons, articleFooter.nextSibling);
    }
  }
  
  // 分享功能实现
  window.shareToWeixin = function(title, url) {
    alert('请截图分享给微信朋友或朋友圈\n标题：' + title + '\n链接：' + url);
  };
  
  window.shareToWeibo = function(title, url) {
    window.open('https://service.weibo.com/share/share.php?title=' + title + '&url=' + url + '&pic=', '_blank');
  };
  
  window.shareToQZone = function(title, url) {
    window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + title, '_blank');
  };
  
  window.shareToDouyin = function(title, url) {
    alert('请截图后打开抖音App分享\n标题：' + title + '\n链接：' + url);
  };
  
  window.shareToXiaoHongShu = function(title, url) {
    alert('请截图后打开小红书App分享\n标题：' + title + '\n链接：' + url);
  };
  
  window.shareToTouTiao = function(title, url) {
    window.open('https://mp.toutiao.com/profile_webapi/graphic/publish/?title=' + title + '&source=blog_content&url=' + url, '_blank');
  };
  
  window.shareToBaidu = function(title, url) {
    window.open('https://ziyuan.baidu.com/college/courseinfo?id=266&page=3#h3-article-4', '_blank');
  };
});
