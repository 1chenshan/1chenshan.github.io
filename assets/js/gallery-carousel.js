// 轮播图控制
let currentSlide = 0;
let slideInterval;
let isTransitioning = false;

// 初始化轮播图
function initCarousel() {
    // 开始自动播放
    startAutoSlide();
    
    // 添加触摸支持
    addTouchSupport();
    
    // 添加键盘支持
    addKeyboardSupport();
    
    // 添加鼠标悬停暂停
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // 监听可见性变化，页面不可见时停止自动播放
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}



// 切换到指定幻灯片
function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;
    
    isTransitioning = true;
    
    // 更新指示器
    updateIndicators(slideIndex);
    
    // 获取当前和目标幻灯片
    const slides = document.querySelectorAll('.carousel-slide');
    const currentSlideElement = slides[currentSlide];
    const targetSlideElement = slides[slideIndex];
    
    // 移除当前活动状态
    currentSlideElement.classList.remove('active');
    
    // 添加新的活动状态
    targetSlideElement.classList.add('active');
    
    // 更新当前幻灯片索引
    currentSlide = slideIndex;
    
    // 动画完成后重置状态
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
    
    // 重启自动播放
    restartAutoSlide();
}

// 切换幻灯片（相对位置）
function changeSlide(direction) {
    if (isTransitioning) return;
    
    let newSlide = currentSlide + direction;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    
    if (newSlide >= totalSlides) {
        newSlide = 0;
    } else if (newSlide < 0) {
        newSlide = totalSlides - 1;
    }
    
    goToSlide(newSlide);
}

// 更新指示器
function updateIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 开始自动播放
function startAutoSlide() {
    stopAutoSlide(); // 先清除现有的定时器
    slideInterval = setInterval(() => {
        if (!isTransitioning) {
            changeSlide(1);
        }
    }, 2000);
}

// 停止自动播放
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// 重启自动播放
function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// 添加触摸支持
function addTouchSupport() {
    const carousel = document.querySelector('.carousel-container');
    let startX = 0;
    let startY = 0;
    let isSwipe = false;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = false;
        stopAutoSlide();
    }, { passive: true });

    carousel.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // 确定是水平滑动而不是垂直滚动
        if (deltaX > deltaY && deltaX > 30) {
            isSwipe = true;
            e.preventDefault(); // 阻止页面滚动
        }
    }, { passive: false });

    carousel.addEventListener('touchend', function(e) {
        if (!startX || !isSwipe) {
            startAutoSlide();
            return;
        }
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = startX - endX;
        
        // 滑动距离超过50px才触发切换
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                changeSlide(1); // 向左滑动，下一张
            } else {
                changeSlide(-1); // 向右滑动，上一张
            }
        }
        
        startX = 0;
        startY = 0;
        isSwipe = false;
        startAutoSlide();
    }, { passive: true });
}

// 添加键盘支持
function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        // 只有当轮播图容器在视口中时才响应键盘
        const carousel = document.querySelector('.carousel-container');
        const rect = carousel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                changeSlide(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                changeSlide(1);
                break;
            case ' ': // 空格键暂停/继续
                e.preventDefault();
                if (slideInterval) {
                    stopAutoSlide();
                } else {
                    startAutoSlide();
                }
                break;
        }
    });
}

// 鼠标悬停时暂停自动播放
function addHoverPause() {
    const carousel = document.querySelector('.carousel-container');
    
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在画廊页面
    if (document.querySelector('.carousel-container')) {
        initCarousel();
        addHoverPause();
        
        // 处理窗口大小变化
        window.addEventListener('resize', function() {
            // 重新计算轮播图尺寸（如果需要）
            // 这里可以添加响应式处理逻辑
        });
        
        // 添加交集观察器以优化性能
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!slideInterval) startAutoSlide();
                    } else {
                        stopAutoSlide();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(document.querySelector('.carousel-container'));
        }
    }
});

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    stopAutoSlide();
}); 