function pageTransition() {
  const tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: .5, 
    scaleY: 1, 
    transformOrigin: 'bottom left', 
    stagger: .2
  });
  tl.to('ul.transition li', {
    duration: .5, 
    scaleY: 0, 
    transformOrigin: 'bottom left', 
    stagger: .1, 
    delay: .1 
  });
}

function contentAnimation() {
  const tl = gsap.timeline();
  tl.from('.left', { 
    duration: 1.5, 
    translateY: 50, 
    opacity: 0 
  });
  tl.to('img', { 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' 
  }, '-=1.1');
}

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
} 

// Remove later used as hook example
barba.hooks.before(data => {
  console.log(data.current.url.path, 'This is PAGE');
});

function changeNav() {
  const currentLocation = location.href;
  const navBtns = document.querySelectorAll('li > a');
  const menuLength = navBtns.length;
    for (let i = 0; i < menuLength; i ++) {
      if(navBtns[i].href === currentLocation) {
        gsap.set(navBtns[i], {
          color: 'blue',
          fontSize: '2rem'
        });
      } else {
        gsap.set(navBtns[i], {
          color: '#D9D9D9',
          fontSize: '1rem'
        });
      }
      console.log(currentLocation);
    }
}

barba.init({
  sync: true,
  transitions: [{
    async once(data) {
      contentAnimation();
      changeNav();
      
      console.log(document.querySelectorAll('li > a'), 'This is Data ONCE');
      console.log(data.current.url.path, 'This is PAGE ONCE');
    },
    async enter(data) {
      contentAnimation();
      changeNav();
      
      console.log(document.querySelectorAll('li > a'), 'This is Data ENTER');
      console.log(data.current.url.path, 'This is PAGE ENTER');
    },
    async leave(data) {
      const done = this.async();
      pageTransition();
      await delay(1500);
      done();
    }
  }],
  debug: true
});
