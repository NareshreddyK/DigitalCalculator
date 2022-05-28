import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[rowColor]'
})
export class RowColorDirective implements OnInit {
  @Input('rowColor') rowColor: any;
  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    if (this.rowColor) {
      this.changeBackgroundColor('white');
    } else {
      this.changeBackgroundColor('grey');
    }
  }

  private changeBackgroundColor(color: string) {
    this.elRef.nativeElement.style.backgroundColor = color;
  }
}
