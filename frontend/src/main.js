//import "./style.css";
import Phaser from "phaser";

const sizes = {
    width: window.screen.width,
    height: window.screen.height - 300, // Subtract the height of the footer
};

const speedDown = 30000;
const gameTimeInSeconds = 60; // Set the game time in seconds

class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game");
        this.player;
        this.cursor;
        this.playerSpeed = 1300;
        this.points = 0;
        this.textScore;
        this.textTime;
        this.elapsedTime = 0;
        this.timerEvent;
    }

    preload() {
        this.load.image("background", "assets/background.png");
    }

    create() {
        // Add background
        this.add.image(0, 0, "background").setOrigin(0, 0);

        // Create a black rectangle sprite for the basket
        this.player = this.physics.add.sprite(0, sizes.height - 100, 'blackRect').setOrigin(0, 0);
        this.player.setDisplaySize(50, 100); // Set size of the rectangle
        this.player.setTint(0x000000); // Set color to black
        this.player.setImmovable(true);
        this.player.body.allowGravity = true;
        this.player.setCollideWorldBounds(true);

        // Handle keyboard input
        this.cursor = this.input.keyboard.createCursorKeys();

        // Display score and time
        this.textScore = this.add.text(sizes.width - 120, 10, `Score: ${this.points}`, {
            fontFamily: "Roboto",
            fontSize: "28px",
            fill: "#f00"
        });
        this.textTime = this.add.text(10, 10, `Time: ${gameTimeInSeconds}`, {
            fontFamily: "Roboto",
            fontSize: "28px",
            fill: "#f00"
        });

        // Start the game timer
        this.startTimer();
    }

    update() {
        const { left, right, up, down } = this.cursor;

        let velocityX = 0;
        let velocityY = 0;
        let scaleX = 1;
        let scaleY = 1.5;

        if (this.player.body.touching.down) {
            velocityY = -this.playerSpeed;
        }
        if (left.isDown) {
            velocityX = -this.playerSpeed;
            scaleX = -1.5;
        } else if (right.isDown) {
            velocityX = this.playerSpeed;
            scaleX = 1.5;
        } else if (up.isDown) {
            velocityY = -this.playerSpeed;
            scaleY = 2;
        } else if (down.isDown) {
            velocityY = this.playerSpeed;
            scaleY = -2;
        }
        this.player.setVelocity(velocityX, velocityY);

        // Tween scaleX if it has changed
        if (scaleX !== this.player.scaleX) {
            this.tweenScaleXTo(scaleX);
        }

        // Tween scaleY if it has changed
        if (scaleY !== this.player.scaleY) {
            this.tweenScaleYTo(scaleY);
        }

        // Update the displayed time
        this.textTime.setText(`Time: ${gameTimeInSeconds + this.elapsedTime -60}`);
    }

    // Function to start the game timer
    startTimer() {
        this.timerEvent = this.time.addEvent({
            delay: 1000, // 1000 milliseconds = 1 second
            loop: true,
            callback: () => {
                this.elapsedTime++; // Increment elapsed time
                if (this.elapsedTime >= gameTimeInSeconds) {
                    // Game over if elapsed time exceeds game time
                    this.gameOver();
                }
            }
        });
    }

    // Function to tween scaleX property
    tweenScaleXTo(scaleX) {
        this.tweens.add({
            targets: this.player,
            scaleX: scaleX,
            duration: 200, // Duration of the tween in milliseconds
            ease: 'Linear', // Easing function
        });
    }

    // Function to tween scaleY property
    tweenScaleYTo(scaleY) {
        this.tweens.add({
            targets: this.player,
            scaleY: scaleY,
            duration: 200, // Duration of the tween in milliseconds
            ease: 'Linear', // Easing function
        });
    }

    getRandomX() {
        return Math.floor(Math.random() * 480)
    }

    // Function to handle game over
    gameOver() {
        // Stop the game timer
        this.timerEvent.destroy();
        // Add your game over logic here
    }
}

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedDown },
            debug: true,
        },
    },
    scene: [GameScene],
};

const game = new Phaser.Game(config);

