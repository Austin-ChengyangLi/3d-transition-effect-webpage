;(function () {
  document.documentElement.classList.add('is-loaded')
  document.documentElement.classList.remove('is-loading')

  setTimeout(() => {
    document.documentElement.classList.add('is-ready')
  }, 100)

  const scrollElement = document.querySelector('#js-scroll')
  let options = {
    el: scrollElement, // 设置滚动容器元素
    smooth: true, // 设置为平滑滚动
    getSpeed: true, // 添加滚动事件的速度
    getDirection: true, // 添加滚动事件的方向
  }

  // 判断是否为横向滚动
  if (scrollElement.getAttribute('data-horizontal') == 'true') {
    options.direction = 'horizontal' // 设置为横向滚动
    options.gestureDirection = 'both' // 定义在实例中滚动的手势方向
    options.tablet = {
      smooth: true, // 设置为平滑滚动
      direction: 'horizontal', // 设置为横向滚动
      horizontalGesture: true, // 允许在横向滚动时使用手势
    }
    options.smartphone = {
      smooth: false,
    }
    options.reloadOnContextChange = true // 允许在desktop 、 tablet和smartphone上下文之间切换时重新加载页面。
  }

  const scroll = new LocomotiveScroll(options)
  let dynamicBackgrounds = []
  let dynamicColorElements = []
  const headerHeight = $('.header').height()
  const $hero = $('.hero')
  let ticking = false
  let parallaxSceneVisible = false
  let text = document.getElementById('text')
  let leaf = document.getElementById('leaf')
  let hill1 = document.getElementById('hill1')
  let hill4 = document.getElementById('hill4')
  let hill5 = document.getElementById('hill5')
  text.style.marginTop = 0
  text.style.opacity = 0
  leaf.style.opacity = 0
  hill5.style.opacity = 0
  hill4.style.opacity = 0
  hill1.style.opacity = 0

  scroll.on('scroll', (instance) => {
    // console.log('instance.scroll.y: ', instance.scroll.y)
    // isStartHoverTransformEffect && startHoverEffectTransform()
    if (parallaxSceneVisible) {
      const rect = parallaxSceneEl.getBoundingClientRect()
      const distanceToViewportBottom = Math.abs(window.innerHeight - rect.bottom)
      text.style.opacity = 1
      leaf.style.opacity = 1
      hill5.style.opacity = 1
      hill4.style.opacity = 1
      hill1.style.opacity = 1
      text.style.marginTop = distanceToViewportBottom * 1.5 + 'px'
      leaf.style.top = distanceToViewportBottom * -1.5 + 'px'
      leaf.style.left = distanceToViewportBottom * 1.5 + 'px'
      hill5.style.left = distanceToViewportBottom * 1.5 + 'px'
      hill4.style.left = distanceToViewportBottom * -1.5 + 'px'
      hill1.style.top = distanceToViewportBottom * 0.5 + 'px'
    }
    // 11565
    const progress = (360 * instance.scroll.y) / instance.limit.y
    let heroEffectFactor = Math.min(instance.scroll.y / headerHeight, 1)
    let heroRotation = Math.min(heroEffectFactor * 90, 90)
    $hero.css({
      '-webkit-transform': 'rotateX(' + heroRotation + 'deg)',
      transform: 'rotateX(' + heroRotation + 'deg)',
    })

    scroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`

    dynamicBackgrounds.forEach((obj) => {
      obj.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`
    })
    dynamicColorElements.forEach((obj) => {
      obj.el.style.color = `hsl(${progress}, 11%, 81%)`
    })

    document.documentElement.setAttribute('data-direction', instance.direction)

    // 盒子旋转
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCubes(instance.scroll.y)
        ticking = false
      })
      ticking = true
    }
  })

  scroll.on('call', (value, way, obj) => {
    if (value === 'dynamicBackground') {
      if (way === 'enter') {
        dynamicBackgrounds.push({
          id: obj.id,
          el: obj.el,
        })
      } else {
        for (var i = 0; i < dynamicBackgrounds.length; i++) {
          if (obj.id === dynamicBackgrounds[i].id) {
            dynamicBackgrounds.splice(i, 1)
          }
        }
      }
    } else if (value === 'dynamicColor') {
      if (way === 'enter') {
        dynamicColorElements.push({
          id: obj.id,
          el: obj.el,
        })
      } else {
        for (var i = 0; i < dynamicColorElements.length; i++) {
          if (obj.id === dynamicColorElements[i].id) {
            dynamicColorElements.splice(i, 1)
          }
        }
      }
    }
  })

  // cube rotate start
  const cubeContainers = document.querySelectorAll('.cube-container')
  const items = document.querySelectorAll('.item')
  const projectNames = ['CHENGYANG', 'XUERUI', 'WENBO', 'ZIYANG']
  function updateCubes(scrollY) {
    const yRoation = (scrollY / 4) % 360
    const scrollOffset = scrollY * 0.25

    cubeContainers.forEach((container, containerIndex) => {
      const cubes = container.querySelectorAll('.cube')

      cubes.forEach((cube, cubeIndex) => {
        let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1
        cube.style.transform = `translateZ(100px) rotateX(${yRoation * rotationDirection}deg)`
        // console.log('yRoation * rotationDirection: ', yRoation * rotationDirection)
      })
      const frontBackTextPosition = 50 + scrollOffset
      const topBottomTextPosition = 50 - scrollOffset

      container.querySelectorAll('.front p, .back p').forEach((p) => {
        p.style.left = `${frontBackTextPosition}%`
      })

      container.querySelectorAll('.top p, .bottom p').forEach((p) => {
        p.style.left = `${topBottomTextPosition}%`
      })
    })
  }
  function populateText() {
    items.forEach((item, itemIndex) => {
      const projectName = projectNames[itemIndex % projectNames.length]
      const sides = item.querySelectorAll('.side p')
      const textContent = Array(80).fill(projectName).join('&nbsp;&nbsp;&nbsp;&nbsp;')
      sides.forEach((side) => (side.innerHTML = textContent))
    })
  }
  window.onload = function () {
    populateText()
    // updateCubes(window.scrollY);
  }
  // cube rotate end

  // hover-effect start
  const hoverEffectEl = document.querySelector('.hover-effect-item.item01')
  const hoverEffectContainerEl = document.querySelector('.hover-effect-container')
  let isNext = true // 是否下一张
  const hoverEffectItem01 = new hoverEffect({
    parent: hoverEffectEl, // 将注入动画的 DOM 元素。动画图像将采用父母的尺寸
    intensity: 0.3, // 用于确定失真效果的强度。 0表示无效果，1表示完全失真。
    // image1: './images/img3_hd.png',
    // image2: './images/img4_hd.png',
    image1: img3_hd_base64,
    image2: img4_hd_base64,
    // displacementImage: './images/img27.jpg', // 用于在两个主图像之间进行过渡的Image
    displacementImage: img27_base64, // 用于在两个主图像之间进行过渡的Image
    imagesRatio: 1080 / 1920, // 默认应用方形纵横比，如果想要background: cover行为类型，请指定一个值。用法： image height / image width
    hover: false, // 设置为 false，则悬停时不会触发动画
  })

  // 使用 IntersectionObserver 监听元素的可见性
  const observer = new IntersectionObserver(
    (entries, observer) => {
      // entries.forEach(entry => {
      //   if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
      //     // 当容器接近视口顶部并且尚未固定时，执行吸附操作
      //     const hoverEffectContainerElTop = hoverEffectContainerEl.getBoundingClientRect().top
      //
      //     console.log('hoverEffectContainerElTop: ', hoverEffectContainerElTop)
      //     if (hoverEffectContainerElTop <= 100) {
      //       isPinned = true
      //       // 停止 LocomotiveScroll 滚动
      //       scroll.stop()
      //
      //       // 覆盖 section 元素的 transform 样式
      //       // hoverEffectSectionEl.style.transform = 'none'
      //       // 使用 requestAnimationFrame 在下一帧强制覆盖 section 元素的 transform 样式
      //       hoverEffectSectionEl.style.transform = 'none !important'
      //       // 固定元素到顶部
      //       hoverEffectContainerEl.style.position = 'fixed';
      //       hoverEffectContainerEl.style.top = '0';
      //       hoverEffectContainerEl.style.left = '0';
      //
      //       // 停止 LocomotiveScroll 滚动
      //       console.log('------ 可以停止了 ------')
      //       // 禁止 locomotive-scroll 继续更新 transform
      //       scroll.update();
      //
      //
      //       // // 禁止页面继续滚动
      //       // document.body.style.overflow = 'hidden'
      //     }
      //     // isStartHoverTransformEffect = true
      //   } else {
      //     isStartHoverTransformEffect = false
      //   }
      //   // if (entry.isIntersecting) {
      //   //   console.log('元素完全在视口内')
      //   //   isStartHoverTransformEffect = true
      //   // } else {
      //   //   console.log('元素不在视口内')
      //   //   isStartHoverTransformEffect = false
      //   // }
      // })
      entries.forEach((entry) => {
        const hoverEffectContainerElTop = hoverEffectContainerEl.getBoundingClientRect().top
        // console.log('hoverEffectContainerElTop: ', hoverEffectContainerElTop)
        // 当容器接近视口顶部并且尚未固定时，执行吸附操作
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.8 &&
          hoverEffectContainerElTop <= 100
        ) {
          // 使用 scrollTo 方法平滑滚动到 hoverEffectSectionEl 顶部
          scroll.scrollTo(hoverEffectEl, {
            callback() {
              console.log('------ 滚动完成 ------')
              if (isNext) {
                hoverEffectItem01.next()
              } else {
                hoverEffectItem01.previous()
              }
              isNext = !isNext
            },
            duration: 200,
          })
        }
        // if (entry.isIntersecting) {
        //   console.log('元素完全在视口内')
        //   isStartHoverTransformEffect = true
        // } else {
        //   console.log('元素不在视口内')
        //   isStartHoverTransformEffect = false
        // }
      })
    },
    {
      threshold: 0.9, // 当元素超过80%内容进入视口时触发回调
    }
  )
  observer.observe(hoverEffectContainerEl)
  // hover-effect end
  // parallax start
  const parallaxSceneEl = document.querySelector('.parallax-scene')
  const parallax_scene = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const parallaxSceneElTop = parallaxSceneEl.getBoundingClientRect().top
        console.log('🌈🌈🌈 parallaxSceneElTop: ', parallaxSceneElTop)
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          console.log('元素完全在视口内')
          parallaxSceneVisible = true
        } else {
          console.log('元素不在视口内')
          parallaxSceneVisible = false
        }
      })
    },
    {
      threshold: 0.3, // 当元素超过80%内容进入视口时触发回调
    }
  )
  parallax_scene.observe(parallaxSceneEl)
  // parallax end
})()
