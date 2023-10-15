document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const gravity = 0.5;

    // Player class
    class Player {
        constructor(position) {
            this.position = position;
            this.width = 100;
            this.height = 100;
            this.velocity = {
                x: 0,
                y: 1
            };
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.closePath();
        }

        update() {
            this.draw();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            
            if (this.position.y + this.height + this.velocity.y < canvas.height) {
                this.velocity.y += gravity;
            } else {
                this.velocity.y = 0;
            }
        }
    };


    let player_1 = new Player({x: 0, y: 0});

    const keys = {
        up: {
            pressed: false
        },
        right: {
            pressed: false
        },
        down: {
            pressed: false
        },
        left: {
            pressed: false
        },
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player_1.update();

        player_1.velocity.x = 0;

        if (keys.right.pressed) player_1.velocity.x = 5;
        else if (keys.left.pressed) player_1.velocity.x = -5;
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('keydown', e => {
        switch(e.key) {
            case 'w':
            case 'ArrowUp':
                keys.up.pressed = true;
            break;

            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = true;
            break;

            case 's':
            case 'ArrowDown':
                keys.down.pressed = true;
            break;

            case 'd':
            case 'ArrowRight':
                keys.right.pressed = true;
            break;
        }
    });

    window.addEventListener('keyup', e => {
        switch(e.key) {
            case 'w':
            case 'ArrowUp':
                keys.up.pressed = false;
            break;

            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = false;
            break;

            case 's':
            case 'ArrowDown':
                keys.down.pressed = false;
            break;

            case 'd':
            case 'ArrowRight':
                keys.right.pressed = false;
            break;
        }
    });
});