const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
// let aboutMe = "I am a enthusiastic college student Studing Computer Science and Design @IIIT-Delhi."
// let aboutMe1 = "Yes! you read it right :) "
// let aboutMe2 = "I am Learning to design a project as well as code it."
// let aboutMe3 = "From my early early childhood I used to solve random logical reasoning problem, which has helped me to develop a mindset to always look for something better and not giving up. Which is a necessary skill to both debug code or iterate on a design."
// let aboutMe4 = "I have also development a design thinking over past few semester, which has helped me bringing a unique and Customer oriented approch."
let d = "M402.5,277Q397,304,415.5,354.5Q434,405,397,423Q360,441,321.5,440Q283,439,249,442.5Q215,446,174.5,448.5Q134,451,105.5,423Q77,395,99,346Q121,297,115,273.5Q109,250,76,212.5Q43,175,105,177.5Q167,180,184,172.5Q201,165,214.5,144Q228,123,253.5,104Q279,85,302.5,101.5Q326,118,370.5,115Q415,112,416,150.5Q417,189,412.5,219.5Q408,250,402.5,277Z";

let pathh = new Path2D(d);


// get mouse mouse position ///////////////////////////////
let mouse = {

    x: null,
    y: null,
    radius: 20
}



var text2 = document.createElement('div');
text2.style.position = 'absolute';
text2.style.width = 5;
text2.style.height = 5;
text2.style.backgroundColor = "Green";
text2.innerHTML = "If you didn't see logo/left area is empty click here";
text2.style.top = 0 + 'px';
text2.style.left = 0 + 'px';
text2.onclick = function() {
    window.open("./about.html")
}
document.body.appendChild(text2);


window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

function drawImage() {
    let imageWidth = png.width || png.naturalWidth;
    let imageHeight = png.height || png.naturalHeight;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    class Particle {
        constructor(x, y, color, size) {
            this.x = x + canvas.width / 15,
                this.y = y + canvas.height / 4,
                this.color = color,
                this.size = 2,
                this.baseX = x + canvas.width / 15,
                this.baseY = y + canvas.height / 4,
                this.density = ((Math.random() * 10) + 2);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            ctx.fillStyle = this.color;
            // check mouse position/particle position - collision detection
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            // distance past which the force is zero
            var maxDistance = 80;
            var force = (maxDistance - distance) / maxDistance;

            // if we go below zero, set it to zero.
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.x -= dx / 5;
                }
                if (this.y !== this.baseY) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.y -= dy / 5;
                }
            }
            this.draw();
        }
    }

    function init() {
        particleArray = [];

        for (var y = 0, y2 = data.height; y < y2; y++) {
            for (var x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," + data.data[(y * 4 * data.width) + (x * 4) + 1] + "," + data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";

                    particleArray.push(new Particle(positionX * 4, positionY * 4, color));

                }
            }
        }

    }
    wrapText(ctx, "How much wood would a woodchuck chuck if a woodchuck could chuck wood?", 20, 20, 150, 14);


    function wrapText(context, text, x, y, maxWidth, fontSize) {
        var words = text.split(' ');
        var line = '';
        var lineHeight = fontSize / 1.5;


        ctx.font = fontSize + " Georgia";

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        return (y);
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0,0,0,.2)';
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        // ctx.clearRect(0,0,innerWidth,innerHeight);
        // ctx.fillStyle = "r";
        ctx.fill(pathh);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        // ctx.font = "20px Georgia";
        // ctx.fillText("Hover above", canvas.width * .08, canvas.height * .85);

        ctx.font = "6vw Georgia";
        // ctx.fillText("About Me", canvas.width * .45, canvas.height * .15);

        ctx.font = "2vw Georgia";
        // var last = wrapText(ctx, aboutMe, canvas.width * .35, canvas.height * .35, canvas.width * .5, canvas.height * 0.07);
        // var last1 = wrapText(ctx, aboutMe1, canvas.width * .35, last + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
        // var last2 = wrapText(ctx, aboutMe2, canvas.width * .35, last1 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
        // var last3 = wrapText(ctx, aboutMe3, canvas.width * .35, last2 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);
        // var last4 = wrapText(ctx, aboutMe4, canvas.width * .35, last3 + canvas.height * .07, canvas.width * .6, canvas.height * 0.07);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();

    // RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
    window.addEventListener('resize',
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });
}


var png = new Image();
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAABkCAMAAAAysdnFAAAABlBMVEVHcExH/zEoBeJcAAAAAnRSTlMA/1uRIrUAAAEmSURBVEiJ7dVLEsJACATQ6ftf2pUJ9IdQrrTKWSl5EoaQ8RxdgAkyudcKDVSZg04ZmRjBzBp0QRMLxUg47Y7iz01o35T1Sza5gbYGCnAC7dv1xZRgYLstPnN4cK6W6nwPkkttmx2wcXVLG9evJkcPMLg+EcnxiOW+PLtzNu6chTPr777IpXnmVJt89H4GpweXcde7MbrybqgLitxBV3jn6nfD9duu6DyIqjqvuhNV4O2SkvNHVG3SXZei2H3zWI2zQyIujBy5NMDP0/t3v+i2p8nCoYSyAzYO2Dhg44CNK2DleinJ0cWtw8KFCtT5nZfQ2CGNNWbdSYxqbl3v6ShhmA/5TMvsaDgGuagxWy3eM2jEvQfybxGWv8fMMsy9mpWFljGNaFovqv0HGcpCuOMAAAAASUVORK5CYII=";

// Run drawImage after page has been fully loaded
window.addEventListener('load', (event) => {

    ctx.drawImage(png, 0, 0);
    drawImage();
});