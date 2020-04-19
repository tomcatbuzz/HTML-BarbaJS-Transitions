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

// Remove later
barba.hooks.before(data => {
  console.log(data.current.url.path, 'This is Current');
});

function changeNav(bigNum, smallNum1, smallNum2) {
  const navBtns = document.querySelectorAll('a');
    gsap.set(navBtns[bigNum], {
      color: 'black',
      fontSize: '3rem'
    });
    gsap.set(navBtns[smallNum1], {
      color: '#D9D9D9',
      fontSize: '2rem'
    });
    gsap.set(navBtns[smallNum2], {
      color: '#D9D9D9',
      fontSize: '2rem'
      });  
}

barba.init({
  sync: true,
  transitions: [{
    async once(data) {
      contentAnimation();
      if(data.next.url.path == '/' || data.next.url.path == '/index.html')
        changeNav(0, 1, 2);
      else if(data.next.url.path == '/about.html')
        changeNav(1, 0, 2);
      else
        changeNav(2, 0, 1);
    },
    async enter(data) {
      contentAnimation();
      if(data.next.url.path == '/' || data.next.url.path == '/index.html')
        changeNav(3, 4, 5);
      else if(data.next.url.path == '/about.html')
        changeNav(4, 3, 5);
      else
        changeNav(5, 4, 3);
      console.log(data.next.url.path);
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

// barba.init({
//   sync: true,
//   transitions: [{
//     async leave(data) {
//       const done = this.async();
//       pageTransition();
//       await delay(1500);
//       done();
//     },
//     async enter(data) {
//       contentAnimation();
//       if(data.next.url.path == '/' || data.next.url.path == '/index.html')
//         changeNavNumber(3, 4, 5);
//       else if(data.next.url.path == '/about.html')
//         changeNavNumber(4, 3, 5);
//       else
//         changeNavNumber(5, 4, 3);
//     },
//     async once(data) {
//       contentAnimation();
//       if(data.next.url.path == '/' || data.next.url.path == '/index.html')
//         changeNavNumber(0, 1, 2);
//       else if(data.next.url.path == '/about.html')
//         changeNavNumber(1, 0, 2);
//       else
//         changeNavNumber(2, 0, 1);
//     }
//   }],
//   debug: true
// });



// Barba.Dispatcher.on('newPageReady', function(currentStatus) {
//   const link = currentStatus.url.split(window.location.origin)[1].substring(1); // get path of current page

//   const navigation             = document.querySelector('.navigation');
//   const navigationLinks        = navigation.querySelectorAll('.navigation__link');
//   const navigationLinkIsActive = navigation.querySelector(`[href="${link}"]`);

//   Array.prototype.forEach.call(navigationLinks, (navigationLink) => navigationLink.classList.remove('is-active')); // remove CSS class 'is-active' from all .navigation__links

//   navigationLinkIsActive.classList.add('is-active'); // add CSS class to current .navigation__link

// });

// Barba.Dispatcher.on('newPageReady', function(newStatus, oldStatus, container, html) {
//   const navs = $(html).find('[data-barba-update]') // New ones
//   $('[data-barba-update]').each((i,el) => $(el).html($(navs[i]).html())) // Replace each old ones
// });