// 首页过渡动画控制
function navigateToGallery() {
    const body = document.body;
    
    // 添加过渡动画类
    body.classList.add('page-transition-out');
    
    // 动画完成后跳转到gallery页面
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 1000); // 与CSS动画时长匹配
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有减少动效的设置
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // 如果用户偏好减少动效，则缩短动画时间
        const style = document.createElement('style');
        style.textContent = `
            .page-transition-out {
                animation-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 为按钮添加键盘可访问性
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateToGallery();
            }
        });
        
        // 添加按钮点击波纹效果
        exploreBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // 如果没有ripple动画，则添加
            if (!document.querySelector('style[data-ripple]')) {
                const rippleStyle = document.createElement('style');
                rippleStyle.setAttribute('data-ripple', 'true');
                rippleStyle.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
            }
            
            this.appendChild(ripple);
            
            // 清理波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // 监听键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 按空格键或回车键也可以进入画廊
        if ((e.key === ' ' || e.key === 'Enter') && e.target === document.body) {
            e.preventDefault();
            navigateToGallery();
        }
    });
});

// 处理浏览器前进后退
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        // 如果页面是从缓存中恢复的，重新初始化动画状态
        document.body.classList.remove('page-transition-out');
    }
}); 