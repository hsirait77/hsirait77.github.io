
const hamBtn = document.querySelector('.hamburger');
const layerMenu = document.querySelector('.primary-navigation ');
const navLink = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.logo');

// remove active link
const linkAction = () => {
    layerMenu.classList.remove('active');
    hamBtn.classList.remove('active');
     document.body.classList.remove('body-overflow');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

// hamburger menu
hamBtn.addEventListener('click', function () {
	    hamBtn.classList.toggle('active'); 
	    layerMenu.classList.toggle('active');
	    document.body.classList.toggle('body-overflow');
});

const navbar = document.querySelector('nav');
 // Dynamic Background Switch Handler on Scroll
   window.addEventListener("scroll", function() {
        // Run scroll location calculation cleanly across devices
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        // Trigger style modification after moving down 50px
        if (scrollPosition > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

   // scroll sections active link 
   const sections = document.querySelectorAll('section[id]');
   const scrollActive = () => {
    const scrollY = window.pageYOffset; 
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        sectionClass = document.querySelector('.header a[href*=' + sectionId + ']'
         );
        if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight ) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');

        }
    });
}
window.addEventListener('scroll', scrollActive);

// smooth scrool clik the link

for( let i = 0; i < navLink.length; i++ ){
         navLink[i].addEventListener('click', function(event) {
                // call the smoothScroll function
               function smoothScroll(event) {
                   event.preventDefault();
                   const targetId = event.currentTarget.getAttribute('href') === '#' ? 'header' :  event.currentTarget.getAttribute('href');
                   const duration = 1000;
                   const targetPosition = document.querySelector(targetId).offsetTop;
                   const startPosition = window.pageYOffset;
                   const distance = targetPosition - startPosition;
                  let start = null;
                  window.requestAnimationFrame(step);
                  function step(timestamp) {
                    if( !start ) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, isInOutQuadCubic(progress, startPosition, distance, duration));
                    if( progress < duration) window.requestAnimationFrame(step);
                     function isInOutQuadCubic(t, b, c, d) {
                          t /= d / 2;
                          if( t < 1 ) return c / 2 * t * t * t + b;
                          t -= 2
                          return c / 2 * (t * t * t + 2) + b; 
                      }
                  }
               } 
               smoothScroll(event);
         });
    }

