// 模态框和画廊管理
let currentModal = null;
let currentMediaList = [];
let currentMediaIndex = 0;

// 各类别的媒体数据（示例数据）
const mediaData = {
    human: {
        title: "人文摄影",
        items: [
            { type: 'image', src: 'assets/images/folders/human/a8a3039077852db4c9b4025e7ee0d96a.JPG', alt: '人文街拍' },
            { type: 'image', src: 'assets/images/folders/human/85d57d98049019e9f5a61be01dcd5f9d.JPG', alt: '生活瞬间' },
            { type: 'image', src: 'assets/images/folders/human/4b4e19887bf447d93fd81522646913a3.JPG', alt: '人物特写' },
            { type: 'image', src: 'assets/images/folders/human/0a87321920fe39a7200f116c31578f27.JPG', alt: '城市人文' },
            { type: 'image', src: 'assets/images/folders/human/c2faeec427482119d6308c3e9328e2dd.JPG', alt: '人文故事' },
            { type: 'image', src: 'assets/images/folders/human/9a077010af97254e0fc18998d9e53416.JPG', alt: '街头剪影' },
            { type: 'image', src: 'assets/images/folders/human/2ce76231d527d6d7b7e1e214caa6a765.JPG', alt: '人文场景' },
            { type: 'image', src: 'assets/images/folders/human/72fa2a2551d0658e48127ec329d2dfa4.JPG', alt: '生活记录' },
            { type: 'image', src: 'assets/images/folders/human/96ce3bfe1630d5a166d108dcdd02396e.JPG', alt: '人文纪实' },
            { type: 'image', src: 'assets/images/folders/human/00d38a5c93432cdb494842292921de41.JPG', alt: '城市故事' },
            { type: 'image', src: 'assets/images/folders/human/2e28f81917272b6a92dd8912713324cc.JPG', alt: '人物写真' },
            { type: 'image', src: 'assets/images/folders/human/140186ae24afe8dce97bd38397d37ed7.JPG', alt: '街头故事' },
            { type: 'image', src: 'assets/images/folders/human/f5452c30fae459d46d69940a86a9f021.JPG', alt: '人文瞬间' },
            { type: 'image', src: 'assets/images/folders/human/81c271f1a348c41539838e27a5d7ff39.JPG', alt: '街头生活' },
            { type: 'image', src: 'assets/images/folders/human/c7fbbfa50a879e7a5dee7ddd46cdb7ce.JPG', alt: '人文观察' },
            { type: 'image', src: 'assets/images/folders/human/88af2c5ef4d54f22c04af707c3663b0b.JPG', alt: '城市印象' },
            { type: 'image', src: 'assets/images/folders/human/4476819678925e68e60f4e3873be9771.JPG', alt: '人文记录' },
            { type: 'image', src: 'assets/images/folders/human/23a6635b76db1df99aaae32d00492cf7.JPG', alt: '街头故事' },
            { type: 'image', src: 'assets/images/folders/human/9aa0addd1d6141b3d4ee760349181fca.JPG', alt: '人文探索' },
            { type: 'image', src: 'assets/images/folders/human/954d1a965e518e83bae742c47eefce58.JPG', alt: '城市生活' },
            { type: 'image', src: 'assets/images/folders/human/25f4b3b5ae35f742eb52ecb4bfc602b9.JPG', alt: '人文视角' },
            { type: 'image', src: 'assets/images/folders/human/da652cb19c17a51c46d330e1060d9f15.JPG', alt: '街头艺术' },
            { type: 'image', src: 'assets/images/folders/human/ac787a72d33b547833debfec2791ae79.JPG', alt: '人文色彩' },
            { type: 'image', src: 'assets/images/folders/human/6cef557d8ad6c96f53a1ab7c53d10981.JPG', alt: '城市剪影' },
            { type: 'image', src: 'assets/images/folders/human/189ebe9bb6e231207d73c022b5b911b3.JPG', alt: '人文风景' },
            { type: 'image', src: 'assets/images/folders/human/9d3e8103292abad012a5a2f59322f4ae.JPG', alt: '街头记忆' }
        ]
    },
    research: {
        title: "科研记录",
        items: [
            { type: 'image', src: 'assets/images/folders/research/0fd3da5cf286d00cfe72ac7decf7e41e.JPG', alt: '实验室研究' },
            { type: 'image', src: 'assets/images/folders/research/670665443677ca7d265954952685b5c3.JPG', alt: '数据分析' },
            { type: 'image', src: 'assets/images/folders/research/3ac2ad4d2b755edf8217f446432b3750.JPG', alt: '实验过程' },
            { type: 'image', src: 'assets/images/folders/research/bf66f96b880ef2d9ad18277218bdcadf.JPG', alt: '研究成果' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20241116_171511.jpg', alt: '实验记录' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20241120_221635.jpg', alt: '研究进展' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20250114_202159.jpg', alt: '实验数据' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20250218_160827.jpg', alt: '研究方法' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20250218_160838.jpg', alt: '实验观察' },
            { type: 'image', src: 'assets/images/folders/research/IMG_20250519_153651.jpg', alt: '实验设备' },
            { type: 'image', src: 'assets/images/folders/research/a2ca5f429c311ae2d31b91aad340e121.JPG', alt: '实验分析' },
            { type: 'image', src: 'assets/images/folders/research/259311daf56b5a49964681f1d0669eb9.JPG', alt: '研究探索' },
            { type: 'image', src: 'assets/images/folders/research/ea1127e8d5578801c0c8accbb39b70b0.JPG', alt: '实验记录' },
            { type: 'image', src: 'assets/images/folders/research/020d4a7c24d784047f23647b3bff554b.JPG', alt: '研究数据' },
            { type: 'image', src: 'assets/images/folders/research/0ee47fe24028c608aa67d8f8d2f01b31.JPG', alt: '实验过程' },
            { type: 'image', src: 'assets/images/folders/research/20e7e8312d101afb7f0d811de262884c.JPG', alt: '研究成果' }
        ]
    },
    life: {
        title: "生活随拍",
        items: [
            { type: 'image', src: 'assets/images/folders/life/4831f8ddec2125e832f5278896ce841b.JPG', alt: '生活日常' },
            { type: 'image', src: 'assets/images/folders/life/08d46b76a86b0ad1aa95493629a3be0e.JPG', alt: '美好时光' },
            { type: 'image', src: 'assets/images/folders/life/0c1d9ff09dbb4952c36300c1b8b0515a.JPG', alt: '生活记录' },
            { type: 'image', src: 'assets/images/folders/life/130823325f6b2dda85d72087029a91f6.JPG', alt: '日常点滴' },
            { type: 'image', src: 'assets/images/folders/life/c27380bab7b62ab4bd2d7e19213e6460.JPG', alt: '生活瞬间' },
            { type: 'image', src: 'assets/images/folders/life/a8c2dd16b3eea23a9b99442b11330683.JPG', alt: '温馨时刻' },
            { type: 'image', src: 'assets/images/folders/life/3228ab7736ac3d21969a3bbca02f8cce.JPG', alt: '日常生活' },
            { type: 'image', src: 'assets/images/folders/life/29927c69f185dca34647cde079ff8140.JPG', alt: '生活剪影' },
            { type: 'image', src: 'assets/images/folders/life/11961140b16703fc1567ea510707eace.JPG', alt: '日常故事' },
            { type: 'image', src: 'assets/images/folders/life/137cf572aefdbd088b01f2182515c033.JPG', alt: '生活印记' },
            { type: 'image', src: 'assets/images/folders/life/18ee167f728717a42d9bf601418dffae.JPG', alt: '生活色彩' },
            { type: 'image', src: 'assets/images/folders/life/756801bded9beb44153242c0540b2164.JPG', alt: '日常风景' },
            { type: 'image', src: 'assets/images/folders/life/9c4394f3af42bbf5f2b42e7ba5bc6ea8.JPG', alt: '生活细节' },
            { type: 'image', src: 'assets/images/folders/life/96b755aec8eb02b4ef266c915a568043.JPG', alt: '日常记录' },
            { type: 'image', src: 'assets/images/folders/life/efadf8f099bd6b4d9ae2ea7216e3c2f3.JPG', alt: '生活片段' },
            { type: 'image', src: 'assets/images/folders/life/da0478ce862de6b2244ced4b502c4399.JPG', alt: '日常瞬间' },
            { type: 'image', src: 'assets/images/folders/life/7d92484658738de62abb1990348177f2.JPG', alt: '生活故事' },
            { type: 'image', src: 'assets/images/folders/life/1fd57153da1ea89bb7b01a0bb86fe8da.JPG', alt: '日常生活' },
            { type: 'image', src: 'assets/images/folders/life/babff3465d522a158b051ac8e6f619b4.JPG', alt: '生活记忆' },
            { type: 'image', src: 'assets/images/folders/life/35d88a639cc1ed7e010ec5e416927259.JPG', alt: '日常印象' },
            { type: 'video', src: 'assets/videos/folders/life/30dbe9dafb52e0ec1dc1716c255edfee.MOV', poster: 'assets/images/folders/life/3b1ee2623a36e76f0dcd461b704f7b68.JPG', alt: '生活视频' },
            { type: 'image', src: 'assets/images/folders/life/b9359c5a97a06f578304be9cfe7251ee.JPG', alt: '日常时光' },
            { type: 'image', src: 'assets/images/folders/life/39a2f1f0dcc73238daf74b481dbd8ff0.JPG', alt: '生活点滴' },
            { type: 'image', src: 'assets/images/folders/life/cb06a42d81cc864d3e259bbb5ac5e6d1.JPG', alt: '日常剪影' },
            { type: 'image', src: 'assets/images/folders/life/39a3ac7769d678f4ddf02e59f85c9a54.JPG', alt: '生活画面' }
        ]
    },
    hobby: {
        title: "兴趣爱好",
        items: [
            { type: 'image', src: 'assets/images/folders/hobby/IMG_20250815_133117.jpg', alt: '创意摄影作品' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20250815_133956.mp4', poster: 'assets/images/folders/hobby/IMG_20250121_174506.jpg', alt: '创作过程记录' },
            { type: 'image', src: 'assets/images/folders/hobby/IMG_20241105_123430.jpg', alt: '艺术创作' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20250104_170952.mp4', poster: 'assets/images/folders/hobby/IMG_20241102_201932.jpg', alt: '兴趣展示' },
            { type: 'image', src: 'assets/images/folders/hobby/IMG_20241029_203124.jpg', alt: '创意瞬间' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20241029_205452.mp4', poster: 'assets/images/folders/hobby/IMG_20241025_233951.jpg', alt: '创作花絮' },
            { type: 'image', src: 'assets/images/folders/hobby/MEITU_20241025_234230160.jpg', alt: '艺术作品' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20241021_232412.mp4', poster: 'assets/images/folders/hobby/IMG_20241008_223707.jpg', alt: '创作记录' },
            { type: 'image', src: 'assets/images/folders/hobby/IMG_20241008_121124.jpg', alt: '兴趣探索' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20240920_235142.mp4', poster: 'assets/images/folders/hobby/IMG_20240913_225446.jpg', alt: '创意视频' },
            { type: 'image', src: 'assets/images/folders/hobby/IMG_20240913_224434.jpg', alt: '艺术表达' },
            { type: 'video', src: 'assets/videos/folders/hobby/VID_20240920_234857.mp4', poster: 'assets/images/folders/hobby/IMG_20240913_223252.jpg', alt: '兴趣分享' }
        ]
    },
    food: {
        title: "美食记录",
        items: [
            { type: 'image', src: 'assets/images/folders/food/IMG_20240928_130900.jpg', alt: '精致美食' },
            { type: 'image', src: 'assets/images/folders/food/26d46e0a6c65622563919bc8077715d8.JPG', alt: '美味佳肴' },
            { type: 'image', src: 'assets/images/folders/food/4493a97c8e497b4b13dd65745656d940.JPG', alt: '美食探索' },
            { type: 'image', src: 'assets/images/folders/food/b4db43abc00940c56ed6f946a0ffecf7.JPG', alt: '美食记录' },
            { type: 'image', src: 'assets/images/folders/food/9e0c327a6349d0a9d8d463863f1ee9a8.JPG', alt: '美食分享' },
            { type: 'image', src: 'assets/images/folders/food/03d4dfe991b8141484da1e728187f81e.JPG', alt: '美食故事' },
            { type: 'image', src: 'assets/images/folders/food/790bdcc462fdb182517086fc0fedc6dc.JPG', alt: '美食瞬间' },
            { type: 'image', src: 'assets/images/folders/food/e1bc876218512d04c5e802f1c7628720.JPG', alt: '美食创作' },
            { type: 'image', src: 'assets/images/folders/food/f3d7539dd36ed80af43e1c97eea4d754.JPG', alt: '美食体验' },
            { type: 'image', src: 'assets/images/folders/food/4fb099825da3bf3b542ef25565791006.JPG', alt: '美食记忆' },
            { type: 'image', src: 'assets/images/folders/food/47cca8404534cba8aba667b2f05a8223.JPG', alt: '美食摄影' },
            { type: 'image', src: 'assets/images/folders/food/4bd7808dea0f6f36119802d693882281.JPG', alt: '美食风格' },
            { type: 'image', src: 'assets/images/folders/food/d799f26d81fdf428fc2285a2141e0817.JPG', alt: '美食艺术' },
            { type: 'image', src: 'assets/images/folders/food/59fcdea999d76b36a2cd35c3181cd7da.JPG', alt: '美食生活' },
            { type: 'image', src: 'assets/images/folders/food/094bb0a12ed2a034652f55dd8af1756c.JPG', alt: '美食记录' },
            { type: 'image', src: 'assets/images/folders/food/587964e0883221e2536f9f242303bf8a.JPG', alt: '美食时光' },
            { type: 'image', src: 'assets/images/folders/food/464c8727c344a062a06a17e79c94990b.JPG', alt: '美食印象' },
            { type: 'image', src: 'assets/images/folders/food/5939a3498a39ad0e234c73d038e0af7d.JPG', alt: '美食故事' }
        ]
    }
};

// 打开模态框
function openModal(category) {
    const modal = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const masonryGrid = document.getElementById('masonryGrid');
    
    if (!mediaData[category]) return;
    
    currentModal = category;
    const categoryData = mediaData[category];
    
    // 设置标题
    modalTitle.textContent = categoryData.title;
    
    // 清空并重新生成网格内容
    masonryGrid.innerHTML = '';
    
    // 添加媒体项目
    categoryData.items.forEach((item, index) => {
        const mediaItem = createMediaItem(item, index);
        masonryGrid.appendChild(mediaItem);
    });
    
    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 添加动画类
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // 为模态框添加点击外部关闭功能
    modal.addEventListener('click', handleModalBackdropClick);
    
    // 添加键盘ESC关闭功能
    document.addEventListener('keydown', handleModalKeydown);
}

// 创建媒体项目元素
function createMediaItem(item, index) {
    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    mediaItem.onclick = () => openLightbox(index);
    
    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.poster = item.poster || '';
        video.alt = item.alt;
        video.muted = true;
        video.controls = false;
        video.preload = 'metadata';
        
        // 悬停预览效果
        mediaItem.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play().catch(() => {});
            setTimeout(() => {
                if (video.currentTime > 0) video.pause();
            }, 3000);
        });
        
        mediaItem.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        
        mediaItem.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        mediaItem.appendChild(img);
    }
    
    return mediaItem;
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // 清理事件监听器
    modal.removeEventListener('click', handleModalBackdropClick);
    document.removeEventListener('keydown', handleModalKeydown);
    
    // 停止所有视频播放
    const videos = modal.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    currentModal = null;
}

// 处理模态框背景点击
function handleModalBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeModal();
    }
}

// 处理模态框键盘事件
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// 打开Lightbox
function openLightbox(mediaIndex) {
    if (!currentModal || !mediaData[currentModal]) return;
    
    currentMediaList = mediaData[currentModal].items;
    currentMediaIndex = mediaIndex;
    
    const lightbox = document.getElementById('lightboxOverlay');
    const lightboxMedia = document.getElementById('lightboxMedia');
    
    // 显示当前媒体
    updateLightboxMedia();
    
    // 显示lightbox
    lightbox.classList.add('active');
    
    // 添加键盘支持
    document.addEventListener('keydown', handleLightboxKeydown);
    
    // 添加背景点击关闭
    lightbox.addEventListener('click', handleLightboxBackdropClick);
}

// 更新Lightbox媒体内容
function updateLightboxMedia() {
    const lightboxMedia = document.getElementById('lightboxMedia');
    const currentItem = currentMediaList[currentMediaIndex];
    
    lightboxMedia.innerHTML = '';
    
    if (currentItem.type === 'video') {
        const video = document.createElement('video');
        video.src = currentItem.src;
        video.controls = true;
        video.autoplay = true;
        video.muted = false;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        lightboxMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = currentItem.src;
        img.alt = currentItem.alt;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        lightboxMedia.appendChild(img);
    }
}

// 切换Lightbox媒体
function changeLightboxMedia(direction) {
    currentMediaIndex += direction;
    
    if (currentMediaIndex >= currentMediaList.length) {
        currentMediaIndex = 0;
    } else if (currentMediaIndex < 0) {
        currentMediaIndex = currentMediaList.length - 1;
    }
    
    updateLightboxMedia();
}

// 关闭Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightboxOverlay');
    
    lightbox.classList.remove('active');
    
    // 停止视频播放
    const video = lightbox.querySelector('video');
    if (video) {
        video.pause();
    }
    
    // 清理事件监听器
    document.removeEventListener('keydown', handleLightboxKeydown);
    lightbox.removeEventListener('click', handleLightboxBackdropClick);
}

// 处理Lightbox键盘事件
function handleLightboxKeydown(e) {
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            changeLightboxMedia(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            changeLightboxMedia(1);
            break;
        case ' ':
            e.preventDefault();
            const video = document.querySelector('#lightboxOverlay video');
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
            break;
    }
}

// 处理Lightbox背景点击
function handleLightboxBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
}

// 卡片弹跳动画
function addCardClickAnimation(cardElement) {
    cardElement.style.transform = 'scale(0.95)';
    cardElement.style.transition = 'transform 0.15s ease-out';
    
    setTimeout(() => {
        cardElement.style.transform = 'scale(1)';
    }, 150);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为卡片添加点击动画
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            addCardClickAnimation(this);
        });
        
        // 添加键盘支持
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // 使卡片可获得焦点
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
    });
    
    // 优化图片加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // 观察所有延迟加载的图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}); 