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
});
