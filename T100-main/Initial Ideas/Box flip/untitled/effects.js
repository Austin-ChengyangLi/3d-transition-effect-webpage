$(document).ready(function() {
    const $hero = $('.hero');
    const $overlay = $('.overlay');
    const $sections = $('section');
    const headerHeight = $('header').height();

    let lastScrollTop = 0;
    let ticking = false;

    function doAnimations(scrollTop) {
        // Handle hero rotation
        let heroEffectFactor = Math.min(scrollTop / headerHeight, 1);
        let heroRotation = Math.min(heroEffectFactor * 90, 90);
        $hero.css({
            '-webkit-transform': 'rotateX(' + heroRotation + 'deg)',
            'transform': 'rotateX(' + heroRotation + 'deg)'
        });
        $overlay.css('opacity', heroEffectFactor);

        // Handle section rotations, except for the last section
        $sections.each(function(index) {
            if (index === $sections.length - 1) return;  // Skip last section

            var $section = $(this);
            var sectionOffset = $section.offset().top;
            var sectionHeight = $section.outerHeight();
            var sectionBottom = sectionOffset + sectionHeight;
            var windowBottom = scrollTop + $(window).height();

            if (windowBottom > sectionOffset && scrollTop < sectionBottom) {
                var effectStart = sectionBottom - 100;
                if (windowBottom > effectStart) {
                    var effectFactor = (windowBottom - effectStart) / 100;
                    var rotation = -Math.min(effectFactor * 90, 90);
                    $section.css({
                        '-webkit-transform': 'rotateX(' + rotation + 'deg)',
                        'transform': 'rotateX(' + rotation + 'deg)'
                    });
                } else {
                    $section.css({
                        '-webkit-transform': 'rotateX(0deg)',
                        'transform': 'rotateX(0deg)'
                    });
                }
            }
        });
    }

    function onScroll() {
        lastScrollTop = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                doAnimations(lastScrollTop);
                
                // 新增的动画触发逻辑
                const scrollPos = $(window).scrollTop() + $(window).height();
                $('section').each(function() {
                    const sectionTop = $(this).offset().top;
                    const sectionHeight = $(this).outerHeight();
                    if (scrollPos > sectionTop + sectionHeight / 2) {
                        $(this).addClass('animate');
                    } else {
                        $(this).removeClass('animate');
                    }
                });
    
                ticking = false;
            });
            ticking = true;
        }
    }
    

    $(window).scroll(onScroll);
});



function activateSlide(index) {
    const slides = document.querySelectorAll('#item2 .slide'); // 确保只选择item2中的幻灯片
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.left = "100%"; // 重置到视图外
    });
    slides[index].classList.add('active');
    slides[index].style.left = "0"; // 活动的幻灯片移动到视图中
}

let currentSlide = 0;
function nextSlide() {
    currentSlide = (currentSlide + 1) % document.querySelectorAll('#item2 .slide').length;
    activateSlide(currentSlide);
}

setInterval(nextSlide, 3000); // 每3秒切换到下一张图片
