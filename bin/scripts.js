$(document).ready(function(){
    ScrollReveal().reveal('.reveal', { origin: 'bottom', distance: '100px', duration: 2000});
    ScrollReveal().reveal('.s1', { origin: 'bottom', distance: '100px', duration: 2000});
    ScrollReveal().reveal('.s2', { origin: 'bottom', distance: '100px', duration: 2000, delay: 600});
    ScrollReveal().reveal('.s3', { origin: 'bottom', distance: '100px', duration: 2000, delay: 1200});

     $('.slideshow').slick({
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 751,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              slidesToShow: 1
            }
          }
        ]
      });

      //$(".modalSlideshow").slick({
      //  dots: true
      //});

      $(function () {
        var slickOpts = {
            dots: true,
            infinite: true
        };
        // Init the slick
        $('.modalSlideshow').slick(slickOpts);
        var slickEnabled = true;
       
    });
      
    // Add smooth scrolling to all links
    $(".ancor").on('click', function(event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });
  
function mobileMenu(icon) {
    icon.classList.toggle("change");
    $('#mySidebar').toggleClass("sidebarOpen");
}

var canvas = document.querySelector('canvas');
if(canvas){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//c.fillStyle = 'cyan';
//c.fillRect(100, 100, 100, 100);
//c.fillStyle = 'yellow';
//c.fillRect(400, 100, 100, 100);
//c.fillStyle = 'magenta';
//c.fillRect(300, 300, 100, 100);

//c.beginPath();
//c.moveTo(50, 300);
//c.lineTo(300, 100);
//c.lineTo(400, 300);
//c.strokeStyle = "magenta"
//c.stroke();

//for(var i = 0; i < 3; i++){
//    var x = Math.random() * window.innerWidth;
//    var y = Math.random() * window.innerHeight;
//    c.beginPath();
//    c.arc(x, y, 30, 0, Math.PI * 2, false);
//    c.strokeStyle = 'yellow';
//    c.stroke();
//}

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    'lightgrey',
    'grey',
    'white'
];

//window.addEventListener('mousemove', function(event){
//    mouse.x = event.x;
//    mouse.y = event.y;
//})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + radius > innerWidth || this.x - radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y + radius > innerHeight || this.y - radius < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
            
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

//var x = Math.random() * window.innerWidth;
//var y = Math.random() * window.innerHeight;
//var dx = (Math.random() - 0.5) * 8;
//var dy = (Math.random() - 0.5) * 8;
//var radius = 30;

var circleArray = [];

function init() {
    circleArray = [];

    if(window.innerWidth > 751){
        var amount = 1000;
    } else {
        var amount = 200;
    }

    for(var i = 0; i < amount; i++){
        var radius = Math.random() * 1 + 1;
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }

}

init();
animate();
}