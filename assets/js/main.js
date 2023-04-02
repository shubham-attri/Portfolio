/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

var canvas = document.querySelector( 'canvas' );
var context = canvas.getContext( '2d' );

var time = 0,
    velocity = 0.1,
    velocityTarget = 0.1,
    width,
    height,
    lastX,
    lastY;

var MAX_OFFSET = 400;
var SPACING = 4;
var POINTS = MAX_OFFSET / SPACING;
var PEAK = MAX_OFFSET * 0.25;
var POINTS_PER_LAP = 6;
var SHADOW_STRENGTH = 6;

setup();

function setup() {

  resize();
  step();

  window.addEventListener( 'resize', resize );
  window.addEventListener( 'mousedown', onMouseDown );
  document.addEventListener( 'touchstart', onTouchStart );

}

function resize() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

}

function step() {

  time += velocity;
  velocity += ( velocityTarget - velocity ) * 0.3;

  clear();
  render();

  requestAnimationFrame( step );

}

function clear() {

  context.clearRect( 0, 0, width, height );

}

function render() {

  var x, y,
      cx = width/2,
      cy = height/2;

  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = '#7b59f3';
  context.shadowColor = '#7b59f3';
  context.lineWidth = 2;
  context.beginPath();

  for( var i = POINTS; i > 0; i -- ) {

    var value = i * SPACING + ( time % SPACING );

    var ax = Math.sin( value/POINTS_PER_LAP ) * Math.PI,
        ay = Math.cos( value/POINTS_PER_LAP ) * Math.PI;

    x = ax * value,
        y = ay * value * 0.35;

    var o = 1 - ( Math.min( value, PEAK ) / PEAK );

    y -= Math.pow( o, 2 ) * 200;
    y += 200 * value / MAX_OFFSET;
    y += x / cx * width * 0.1;

    context.globalAlpha = 1 - ( value / MAX_OFFSET );
    context.shadowBlur = SHADOW_STRENGTH * o;

    context.lineTo( cx + x, cy + y );
    context.stroke();

    context.beginPath();
    context.moveTo( cx + x, cy + y );

  }

  context.lineTo( cx, cy - 200 );
  context.lineTo( cx, 0 );
  context.stroke();

}

function onMouseDown( event ) {

  lastX = event.clientX;
  lastY = event.clientY;

  document.addEventListener( 'mousemove', onMouseMove );
  document.addEventListener( 'mouseup', onMouseUp );

}

function onMouseMove( event ) {

  var vx = ( event.clientX - lastX ) / 100;
  var vy = ( event.clientY - lastY ) / 100;

  if( event.clientY < height/2 ) vx *= -1;
  if( event.clientX > width/2 ) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.clientX;
  lastY = event.clientY;

}

function onMouseUp( event ) {

  document.removeEventListener( 'mousemove', onMouseMove );
  document.removeEventListener( 'mouseup', onMouseUp );

}

function onTouchStart( event ) {

  event.preventDefault();

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;

  document.addEventListener( 'touchmove', onTouchMove );
  document.addEventListener( 'touchend', onTouchEnd );

}

function onTouchMove( event ) {

  var vx = ( event.touches[0].clientX - lastX ) / 100;
  var vy = ( event.touches[0].clientY - lastY ) / 100;

  if( event.touches[0].clientY < height/2 ) vx *= -1;
  if( event.touches[0].clientX > width/2 ) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;

}

function onTouchEnd( event ) {

  document.removeEventListener( 'touchmove', onTouchMove );
  document.removeEventListener( 'touchend', onTouchEnd );

}


// HOME ANIMATION

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};


// second canvas
// const canvas = document.getElementById("canvas1");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let particleArray = [];
// // let aboutMe = "I am a enthusiastic college student Studing Computer Science and Design @IIIT-Delhi."
// // let aboutMe1 = "Yes! you read it right :) "
// // let aboutMe2 = "I am Learning to design a project as well as code it."
// // let aboutMe3 = "From my early early childhood I used to solve random logical reasoning problem, which has helped me to develop a mindset to always look for something better and not giving up. Which is a necessary skill to both debug code or iterate on a design."
// // let aboutMe4 = "I have also development a design thinking over past few semester, which has helped me bringing a unique and Customer oriented approch."
// let d = "M402.5,277Q397,304,415.5,354.5Q434,405,397,423Q360,441,321.5,440Q283,439,249,442.5Q215,446,174.5,448.5Q134,451,105.5,423Q77,395,99,346Q121,297,115,273.5Q109,250,76,212.5Q43,175,105,177.5Q167,180,184,172.5Q201,165,214.5,144Q228,123,253.5,104Q279,85,302.5,101.5Q326,118,370.5,115Q415,112,416,150.5Q417,189,412.5,219.5Q408,250,402.5,277Z";
//
// let pathh = new Path2D(d);
//
//
// // get mouse mouse position ///////////////////////////////
// let mouse = {
//
//   x: null,
//   y: null,
//   radius: 20
// }
//
//
//
// var text2 = document.createElement('div');
// text2.style.position = 'absolute';
// text2.style.width = 5;
// text2.style.height = 5;
// text2.style.backgroundColor = "Green";
// text2.innerHTML = "If you didn't see logo/left area is empty click here";
// text2.style.top = 0 + 'px';
// text2.style.left = 0 + 'px';
// text2.onclick = function() {
//   window.open("./about.html")
// }
// document.body.appendChild(text2);
//
//
// window.addEventListener('mousemove',
//     function(event) {
//       mouse.x = event.x;
//       mouse.y = event.y;
//     });
//
// function drawImage() {
//   let imageWidth = png.width || png.naturalWidth;
//   let imageHeight = png.height || png.naturalHeight;
//   const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   class Particle {
//     constructor(x, y, color, size) {
//       this.x = x + canvas.width / 15,
//           this.y = y + canvas.height / 4,
//           this.color = color,
//           this.size = 2,
//           this.baseX = x + canvas.width / 15,
//           this.baseY = y + canvas.height / 4,
//           this.density = ((Math.random() * 10) + 2);
//     }
//     draw() {
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.closePath();
//       ctx.fill();
//     }
//     update() {
//       ctx.fillStyle = this.color;
//       // check mouse position/particle position - collision detection
//       let dx = mouse.x - this.x;
//       let dy = mouse.y - this.y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       let forceDirectionX = dx / distance;
//       let forceDirectionY = dy / distance;
//       // distance past which the force is zero
//       var maxDistance = 80;
//       var force = (maxDistance - distance) / maxDistance;
//
//       // if we go below zero, set it to zero.
//       if (force < 0) force = 0;
//
//       let directionX = (forceDirectionX * force * this.density) * 0.9;
//       let directionY = (forceDirectionY * force * this.density) * 0.9;
//
//       if (distance < mouse.radius + this.size) {
//         this.x -= directionX;
//         this.y -= directionY;
//       } else {
//         if (this.x !== this.baseX) {
//           let dx = this.x - this.baseX;
//           let dy = this.y - this.baseY;
//           this.x -= dx / 5;
//         }
//         if (this.y !== this.baseY) {
//           let dx = this.x - this.baseX;
//           let dy = this.y - this.baseY;
//           this.y -= dy / 5;
//         }
//       }
//       this.draw();
//     }
//   }
//
//   function init() {
//     particleArray = [];
//
//     for (var y = 0, y2 = data.height; y < y2; y++) {
//       for (var x = 0, x2 = data.width; x < x2; x++) {
//         if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
//           let positionX = x;
//           let positionY = y;
//           let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," + data.data[(y * 4 * data.width) + (x * 4) + 1] + "," + data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";
//
//           particleArray.push(new Particle(positionX * 4, positionY * 4, color));
//
//         }
//       }
//     }
//
//   }
//   wrapText(ctx, "How much wood would a woodchuck chuck if a woodchuck could chuck wood?", 20, 20, 150, 14);
//
//
//   function wrapText(context, text, x, y, maxWidth, fontSize) {
//     var words = text.split(' ');
//     var line = '';
//     var lineHeight = fontSize / 1.5;
//
//
//     ctx.font = fontSize + " Georgia";
//
//     for (var n = 0; n < words.length; n++) {
//       var testLine = line + words[n] + ' ';
//       var metrics = context.measureText(testLine);
//       var testWidth = metrics.width;
//       if (testWidth > maxWidth) {
//         context.fillText(line, x, y);
//         line = words[n] + ' ';
//         y += lineHeight;
//       } else {
//         line = testLine;
//       }
//     }
//     context.fillText(line, x, y);
//     return (y);
//   }
//
//   function animate() {
//     requestAnimationFrame(animate);
//     ctx.fillStyle = 'rgba(0,0,0,.2)';
//     ctx.fillRect(0, 0, innerWidth, innerHeight);
//     // ctx.clearRect(0,0,innerWidth,innerHeight);
//     // ctx.fillStyle = "r";
//     ctx.fill(pathh);
//     ctx.fillStyle = 'rgba(255,255,255,1)';
//     // ctx.font = "20px Georgia";
//     // ctx.fillText("Hover above", canvas.width * .08, canvas.height * .85);
//
//     ctx.font = "6vw Georgia";
//     // ctx.fillText("About Me", canvas.width * .45, canvas.height * .15);
//
//     ctx.font = "2vw Georgia";
//     // var last = wrapText(ctx, aboutMe, canvas.width * .35, canvas.height * .35, canvas.width * .5, canvas.height * 0.07);
//     // var last1 = wrapText(ctx, aboutMe1, canvas.width * .35, last + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
//     // var last2 = wrapText(ctx, aboutMe2, canvas.width * .35, last1 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
//     // var last3 = wrapText(ctx, aboutMe3, canvas.width * .35, last2 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
//     // var last4 = wrapText(ctx, aboutMe4, canvas.width * .35, last3 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
//
//     for (let i = 0; i < particleArray.length; i++) {
//       particleArray[i].update();
//     }
//   }
//   init();
//   animate();
//
//   // RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
//   window.addEventListener('resize',
//       function() {
//         canvas.width = innerWidth;
//         canvas.height = innerHeight;
//         init();
//       });
// }
//
//
// var png = new Image();
// png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAABkCAMAAAAysdnFAAAABlBMVEVHcExH/zEoBeJcAAAAAnRSTlMA/1uRIrUAAAEmSURBVEiJ7dVLEsJACATQ6ftf2pUJ9IdQrrTKWSl5EoaQ8RxdgAkyudcKDVSZg04ZmRjBzBp0QRMLxUg47Y7iz01o35T1Sza5gbYGCnAC7dv1xZRgYLstPnN4cK6W6nwPkkttmx2wcXVLG9evJkcPMLg+EcnxiOW+PLtzNu6chTPr777IpXnmVJt89H4GpweXcde7MbrybqgLitxBV3jn6nfD9duu6DyIqjqvuhNV4O2SkvNHVG3SXZei2H3zWI2zQyIujBy5NMDP0/t3v+i2p8nCoYSyAzYO2Dhg44CNK2DleinJ0cWtw8KFCtT5nZfQ2CGNNWbdSYxqbl3v6ShhmA/5TMvsaDgGuagxWy3eM2jEvQfybxGWv8fMMsy9mpWFljGNaFovqv0HGcpCuOMAAAAASUVORK5CYII=";
//
// // Run drawImage after page has been fully loaded
// window.addEventListener('load', (event) => {
//
//   ctx.drawImage(png, 0, 0);
//   drawImage();
// });

var events = new Events();
events.add = function(obj) {
  obj.events = { };
}
events.implement = function(fn) {
  fn.prototype = Object.create(Events.prototype);
}

function Events() {
  this.events = { };
}
Events.prototype.on = function(name, fn) {
  var events = this.events[name];
  if (events == undefined) {
    this.events[name] = [ fn ];
    this.emit('event:on', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:on', fn);
    }
  }
  return this;
}
Events.prototype.once = function(name, fn) {
  var events = this.events[name];
  fn.once = true;
  if (!events) {
    this.events[name] = [ fn ];
    this.emit('event:once', fn);
  } else {
    if (events.indexOf(fn) == -1) {
      events.push(fn);
      this.emit('event:once', fn);
    }
  }
  return this;
}
Events.prototype.emit = function(name, args) {
  var events = this.events[name];
  if (events) {
    var i = events.length;
    while(i--) {
      if (events[i]) {
        events[i].call(this, args);
        if (events[i].once) {
          delete events[i];
        }
      }
    }
  }
  return this;
}
Events.prototype.unbind = function(name, fn) {
  if (name) {
    var events = this.events[name];
    if (events) {
      if (fn) {
        var i = events.indexOf(fn);
        if (i != -1) {
          delete events[i];
        }
      } else {
        delete this.events[name];
      }
    }
  } else {
    delete this.events;
    this.events = { };
  }
  return this;
}

var userPrefix;

var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
              .call(styles)
              .join('')
              .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  userPrefix = {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();

function bindEvent(element, type, handler) {
  if(element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

function Viewport(data) {
  events.add(this);

  var self = this;

  this.element = data.element;
  this.fps = data.fps;
  this.sensivity = data.sensivity;
  this.sensivityFade = data.sensivityFade;
  this.touchSensivity = data.touchSensivity;
  this.speed = data.speed;

  this.lastX = 0;
  this.lastY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.positionX = 1122;
  this.positionY = 136;
  this.torqueX = 0;
  this.torqueY = 0;

  this.down = false;
  this.upsideDown = false;

  this.previousPositionX = 0;
  this.previousPositionY = 0;

  this.currentSide = 0;
  this.calculatedSide = 0;


  bindEvent(document, 'mousedown', function() {
    self.down = true;
  });

  bindEvent(document, 'mouseup', function() {
    self.down = false;
  });

  bindEvent(document, 'keyup', function() {
    self.down = false;
  });

  bindEvent(document, 'mousemove', function(e) {
    self.mouseX = e.pageX;
    self.mouseY = e.pageY;
  });

  bindEvent(document, 'touchstart', function(e) {

    self.down = true;
    e.touches ? e = e.touches[0] : null;
    self.mouseX = e.pageX / self.touchSensivity;
    self.mouseY = e.pageY / self.touchSensivity;
    self.lastX  = self.mouseX;
    self.lastY  = self.mouseY;
  });

  bindEvent(document, 'touchmove', function(e) {
    if(e.preventDefault) {
      e.preventDefault();
    }

    if(e.touches.length == 1) {

      e.touches ? e = e.touches[0] : null;

      self.mouseX = e.pageX / self.touchSensivity;
      self.mouseY = e.pageY / self.touchSensivity;

    }
  });

  bindEvent(document, 'touchend', function(e) {
    self.down = false;
  });

  setInterval(this.animate.bind(this), this.fps);

}
events.implement(Viewport);
Viewport.prototype.animate = function() {

  this.distanceX = (this.mouseX - this.lastX);
  this.distanceY = (this.mouseY - this.lastY);

  this.lastX = this.mouseX;
  this.lastY = this.mouseY;

  if(this.down) {
    this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity;
    this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity;
  }

  if(Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
    if(!this.down) {
      this.torqueX *= this.sensivityFade;
      this.torqueY *= this.sensivityFade;
    }

    this.positionY -= this.torqueY;

    if(this.positionY > 360) {
      this.positionY -= 360;
    } else if(this.positionY < 0) {
      this.positionY += 360;
    }

    if(this.positionY > 90 && this.positionY < 270) {
      this.positionX -= this.torqueX;

      if(!this.upsideDown) {
        this.upsideDown = true;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }

    } else {

      this.positionX += this.torqueX;

      if(this.upsideDown) {
        this.upsideDown = false;
        this.emit('upsideDown', { upsideDown: this.upsideDown });
      }
    }

    if(this.positionX > 360) {
      this.positionX -= 360;
    } else if(this.positionX < 0) {
      this.positionX += 360;
    }

    if(!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
      if(this.upsideDown) {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 3;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 2;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 5;
        } else {
          this.calculatedSide = 4;
        }
      } else {
        if(this.positionX >= 42 && this.positionX <= 130) {
          this.calculatedSide = 5;
        } else if(this.positionX >= 131 && this.positionX <= 223) {
          this.calculatedSide = 4;
        } else if(this.positionX >= 224 && this.positionX <= 314) {
          this.calculatedSide = 3;
        } else {
          this.calculatedSide = 2;
        }
      }
    } else {
      if(this.positionY >= 46 && this.positionY <= 130) {
        this.calculatedSide = 6;
      }

      if(this.positionY >= 220 && this.positionY <= 308) {
        this.calculatedSide = 1;
      }
    }

    if(this.calculatedSide !== this.currentSide) {
      this.currentSide = this.calculatedSide;
      this.emit('sideChange');
    }

  }

  this.element.style[userPrefix.js + 'Transform'] = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)';

  if(this.positionY != this.previousPositionY || this.positionX != this.previousPositionX) {
    this.previousPositionY = this.positionY;
    this.previousPositionX = this.positionX;

    this.emit('rotate');

  }

}
var viewport = new Viewport({
  element: document.getElementsByClassName('cube')[0],
  fps: 20,
  sensivity: .1,
  sensivityFade: .93,
  speed: 2,
  touchSensivity: 1.5
});

function Cube(data) {
  var self = this;

  this.element = data.element;
  this.sides = this.element.getElementsByClassName('side');

  this.viewport = data.viewport;
  this.viewport.on('rotate', function() {
    self.rotateSides();
  });
  this.viewport.on('upsideDown', function(obj) {
    self.upsideDown(obj);
  });
  this.viewport.on('sideChange', function() {
    self.sideChange();
  });
}
Cube.prototype.rotateSides = function() {
  var viewport = this.viewport;
  if(viewport.positionY > 90 && viewport.positionY < 270) {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)';
  } else {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)';
  }
}
Cube.prototype.upsideDown = function(obj) {

  var deg = (obj.upsideDown == true) ? '180deg' : '0deg';
  var i = 5;

  while(i > 0 && --i) {
    this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')';
  }

}
Cube.prototype.sideChange = function() {

  for(var i = 0; i < this.sides.length; ++i) {
    this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image';
  }

  this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active';

}

new Cube({
  viewport: viewport,
  element: document.getElementsByClassName('cube')[0]
});
