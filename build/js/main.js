gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.burger-btn')) {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger-icon');

    burgerBtn.addEventListener('click', () => {
      burgerMenu.classList.toggle('burger-menu--open');
      burgerIcon.classList.toggle('burger-icon--active');
      document.body.classList.toggle('no-scroll');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        burgerMenu.classList.remove('burger-menu--open');
        burgerIcon.classList.remove('burger-icon--active');
        document.body.classList.remove('no-scroll');
      }
    });
  }
  if (document.querySelector('.mission')) {
    const mission = document.querySelector('.mission');
    const missionContent = mission.querySelector('.mission__content');
    const missionItems = gsap.utils.toArray('.mission__content .mission__item');

    let missionDuration = missionContent.clientWidth - mission.clientWidth;
    let documentWidth = document.body.clientWidth; // innerWidth
    let tween;

    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      tween = gsap.to(missionContent, {
        x: `-${missionDuration}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mission',
          pin: true,
          start: 'top top',
          scrub: 1,
          snap: {
            snapTo: 1 / (missionItems.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.1 },
          },
          end: () => '+=' + (missionContent.offsetWidth - documentWidth),
        },
      });
      return () => {
        tween.kill(true);
      };
    });

    function resizableObserver() {
      let breakpoint = window.matchMedia('(min-width: 992px)');
      // console.log(breakpoint.matches);

      const checker = function () {
        if (breakpoint.matches) {
          observ();
        } else {
          document.querySelectorAll('.mission__item').forEach((el) => el.classList.remove('_active'));
        }
      };

      breakpoint.addEventListener('change', checker);
      checker();
    }
    resizableObserver();

    function observ() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('_active');
            } else {
              // entry.target.classList.remove('_active');
            }
          });
        },
        {
          threshold: 0.9,
        }
      );
      document.querySelectorAll('.mission__item').forEach((el) => observer.observe(el));
    }
  }
  if (document.querySelector('.swiper')) {
    const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
      let swiper;

      breakpoint = window.matchMedia(breakpoint);

      const enableSwiper = function (className, settings) {
        swiper = new Swiper(className, settings);

        if (callback) {
          callback(swiper);
        }
      };

      const checker = function () {
        if (breakpoint.matches) {
          return enableSwiper(swiperClass, swiperSettings);
        } else {
          if (swiper !== undefined) swiper.destroy(true, true);
          return;
        }
      };

      breakpoint.addEventListener('change', checker);
      checker();
    };

    const someFunc = (instance) => {
      if (instance) {
        instance.on('slideChange', function (e) {
          // console.log('*** mySwiper.activeIndex', instance.activeIndex);
        });
      }
    };

    resizableSwiper(
      '(min-width: 991px)',
      '.valuables__swiper',
      {
        slidesPerView: 'auto',
        spaceBetween: 30,
        a11y: false,
      },
      someFunc
    );
  }
  if (document.querySelector('.advantages')) {
    const advantageItems = document.querySelectorAll('.advantages__item');
    window.addEventListener('scroll', () => {
      advantageItems.forEach((advantageItem, index) => {
        advantageItem.style.setProperty('--itemIndex', index);
        const advantageItemRect = advantageItem.getBoundingClientRect();
        if (advantageItemRect.top) {
          advantageItem.classList.add('_asd');
        } else {
          advantageItem.classList.remove('_asd');
        }
      });
    });
  }
});
