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
            context.lineWidth = 10;
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            context.strokeStyle = color;
            context.stroke();
        }
		
	}

    this.update = function() {
		if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
		this.dx = -this.dx;
		}
		if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
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

        window.addEventListener('resize', () => {
            this.generate(this.size, this.count);
        })
    }

    static colors = ['#2C3E50','#E74C3C','#ECF0F1','#3498DB','#2980B9'];

    static figures = ["ring", "circle"];

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    generate(size, object_count = 300) {
        this.size = size;
        this.count = object_count;
        this.objects = [];
        for (var i = 0; i < object_count; i++) {
            var radius = random(size[0], size[1]);
            var x = Math.random() * (this.width - radius * 2) + radius;
            var y = Math.random() * (this.height - radius * 2) + radius;
            var dx = (Math.random() - 0.75);
            var dy = (Math.random() - 0.75);
            let color = Background.colors[Math.floor(Math.random() * Background.colors.length)];
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