(function() {
    // 让技能条在可视区时展示动画
    const bars = document.querySelectorAll('.skill-bar-fill');
    
    // 为每个技能卡设置 data-target 并观测
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cardBars = entry.target.querySelectorAll('.skill-bar-fill');
                cardBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-target');
                    if (targetWidth) {
                        bar.style.width = targetWidth;
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.card').forEach(card => {
        const barsInCard = card.querySelectorAll('.skill-bar-fill');
        if (barsInCard.length > 0) {
            barsInCard.forEach(bar => {
                const w = bar.style.width; 
                bar.setAttribute('data-target', w);
                bar.style.width = '0%';
            });
            observer.observe(card);
        }
    });

    // 回退方案：如果浏览器不支持 IntersectionObserver，直接显示所有进度条
    if (!window.IntersectionObserver) {
        bars.forEach(bar => {
            const w = bar.getAttribute('data-target') || bar.style.width;
            bar.style.width = w;
        });
    }
})();