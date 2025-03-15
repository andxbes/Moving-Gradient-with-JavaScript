import { GlowParticle } from "./glowparticle.js";

const COLORS = [
    { r: 45, g: 74, b: 227 }, //blue
    { r: 250, g: 255, b: 89 }, //yellow
    { r: 255, g: 104, b: 248 },//purpure
    { r: 44, g: 209, b: 252 },//skyblue
    { r: 54, g: 233, b: 84 },//green
];

const COMPOSITE_OPERATIONS = [
    'source-over',
    'saturation',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'lighter',
    'copy',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'difference',
    'exclusion',
    'hue',
    'soft-light',
    'color',
    'luminosity'
];


class App {
    constructor() {
        this.effect = 0;
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 15;
        this.particles = [];
        this.maxRadius = 900;
        this.minRadius = 400;

        this.effectElement = document.getElementById('effect');

        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('click', this.click.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    click() {
        if (this.effect++ >= COMPOSITE_OPERATIONS.length) {
            this.effect = 0;
        }
        const effect = COMPOSITE_OPERATIONS[this.effect];
        this.setCompositeOperation(effect);
    }

    setCompositeOperation(effect) {
        this.ctx.globalCompositeOperation = effect;

        if (this.effectElement) {
            this.effectElement.innerText = effect;
        }
    }


    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.setCompositeOperation(COMPOSITE_OPERATIONS[this.effect]);

        this.createParticles();
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];
        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() *
                (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor]
            );
            if (++curColor >= COLORS.length) {
                curColor = 0;
            }
            this.particles[i] = item;
        }
        console.info(this.particles);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {

            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }


}


window.onload = () => {
    new App();
}
