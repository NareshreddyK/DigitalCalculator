import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  /** Template reference to the canvas element */
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  @Input() captchaSize: number = 6;

  captcha: string = '';
  captchaCode: string = '';
  invalidCaptcha: boolean = false;
  @Output() onCaptchaValidated = new EventEmitter<boolean>();

  constructor() { }

  ngAfterViewInit() {
    this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  /**
  * Draws something using the context we obtained earlier on
  */
  private draw() {
    setTimeout(() => {
      this.context.font = "30px Arial";
      this.context.textBaseline = 'middle';
      this.context.textAlign = 'center';
      const x = (this.myCanvas.nativeElement as HTMLCanvasElement).width / 2;
      const y = (this.myCanvas.nativeElement as HTMLCanvasElement).height / 2;
      this.context.fillText(this.captcha, x, y);
    }, 1000);
  }

  ngOnInit() {
    this.capture();
  }

  capture() {
    let result = '';
    const characters = '0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk0Ll1Mm2Nn3Oo4Pp5Qq6Rr7Ss8Tt9Uu9Vv8Ww7Xx6Yy5Zz4';
    for (var i = 0; i < this.captchaSize; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        characters.length));
    }
    this.captcha = result;
    this.onCaptchaValidated.emit(false);
    this.draw();
  }

  captureRefresh() {
    const canvasWidth = (this.myCanvas.nativeElement as HTMLCanvasElement).width;
    const canvasHight = (this.myCanvas.nativeElement as HTMLCanvasElement).height;
    this.context.clearRect(0, 0, canvasWidth, canvasHight);
    this.capture();
  }

  validate() {
    if (this.captcha === this.captchaCode) {
      this.invalidCaptcha = false;
      this.onCaptchaValidated.emit(true);
    } else {
      this.invalidCaptcha = this.captchaCode.length === this.captchaSize ? true : false;
      this.onCaptchaValidated.emit(false);
    }
  }

}

