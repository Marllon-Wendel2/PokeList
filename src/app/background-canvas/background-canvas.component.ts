import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`,
  styleUrls: ['./background-canvas.component.css'],
})
export class BackgroundCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  pokeballs: Pokeball[] = [];
  image = new Image();

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas(canvas);

    window.addEventListener('resize', () => this.resizeCanvas(canvas));

    this.image.src = 'pokeball.png';
    this.image.onload = () => {
      for (let i = 0; i < 40; i++) {
        this.pokeballs.push(
          new Pokeball(canvas.width, canvas.height, this.image)
        );
      }
      this.animate(canvas);
    };
  }

  resizeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  animate(canvas: HTMLCanvasElement) {
    const draw = () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of this.pokeballs) {
        p.update(canvas);
        p.draw(this.ctx);
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
}

class Pokeball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  img: HTMLImageElement;

  constructor(width: number, height: number, image: HTMLImageElement) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.dx = (Math.random() - 0.5) * 0.3;
    this.dy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 40 + 20;
    this.img = image;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }

  update(canvas: HTMLCanvasElement) {
    this.x += this.dx;
    this.y += this.dy;

    // rebote nas bordas
    if (this.x < 0 || this.x + this.size > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y + this.size > canvas.height) this.dy *= -1;
  }
}
