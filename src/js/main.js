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
});
