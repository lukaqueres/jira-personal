function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Figure(canvas, type, size, color, x, y, dx, dy) {
    context = canvas.getContext('2d');
    this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.size = size;
    this.type = type;
    this.color = color;

    this.canvas = canvas;

    this.draw = function() {
        
        context.beginPath();
        if ( type == "circle" ) {
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            context.fillStyle = this.color;
            context.fill();
        }
        else if ( type == "ring" ) {
            context.lineWidth = ( this.size / 3 );
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            context.strokeStyle = color;
            context.stroke();
        }
		
	}

    this.update = function() {
		if (this.x + this.size > this.canvas.width || this.x - this.size < -250) { // 0
		this.dx = -this.dx;
		}
		if (this.y + this.size > this.canvas.height || this.y - this.size < -250) {
		this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
    
}

class Background {
    constructor( canvas ) {
        if ( !canvas instanceof HTMLCanvasElement ) {
            return  console.log(`${canvas} is not Canvas Element`);
        }

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.objects = [];

        this.size = [10, 20];
        this.count = 10;
        this.canvas.setAttribute("width", window.innerWidth);
        this.canvas.setAttribute("height", window.innerHeight);

        this.regen_fillers();

        window.addEventListener('resize', () => {
            this.canvas.setAttribute("width", window.innerWidth);
            this.canvas.setAttribute("height", window.innerHeight);

            this.regen_fillers();

            this.generate(this.size, this.count);
        })
    }

    static figures = ["ring", "circle"];

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    regen_fillers() {

        let gradient_x = this.context.createLinearGradient(0, 0, this.width, this.height );
        gradient_x.addColorStop(0, "#ffd500");
        gradient_x.addColorStop(0.3, "#ffd500");
        gradient_x.addColorStop(0.6, "#ffd5005c");
        gradient_x.addColorStop(1, "#ffd500");


        let gradient_y = this.context.createLinearGradient(0, 0, ( this.width / 2 ), ( this.height / 2 ));
        gradient_y.addColorStop(0, "#5c0099");
        gradient_y.addColorStop(0.3, "#5c0099");
        gradient_y.addColorStop(0.6, "#5c00995c");
        gradient_y.addColorStop(1, "#5c0099");


        this.fillers = ['#ffd500','#5c0099','#1C1C3A', '#ffffff', gradient_x, gradient_y];

    }

    generate(size, object_dencity = 1) {
        this.size = size;
        this.count = ( ( this.width * this.height ) / 147456 )/ object_dencity; // Per 4 sq inches
        this.count = Math.round(this.count <= 1000 ? this.count : 50)
        if ( this.count < 2 ) { this.count = 2; }
        this.objects = [];
        for (var i = 0; i < this.count; i++) {
            var radius = random(size[0], size[1]);
            var x = Math.random() * (this.width - radius * 2) + radius;
            var y = Math.random() * (this.height - radius * 2) + radius;
            var dx = (Math.random() - 0.85);
            var dy = (Math.random() - 0.85);
            let color = this.fillers[Math.floor(Math.random() * this.fillers.length)];
            let type = Background.figures[Math.floor(Math.random() * Background.figures.length)];
            this.objects.push(new Figure(this.canvas, type, radius, color, x, y, dx, dy));
    	}
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    }

    animate() {
        window.requestAnimationFrame(() => { this.animate() });
        this.context.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
    }

}