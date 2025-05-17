import { Directive, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { Input,HostListener } from "@angular/core";

@Directive({
     selector: '[appHighlite]'
})
export class AppHighlite implements OnInit{

    @Input() appHighlite:string='';
    @Input() appHighliteColor:string='red';
    

    constructor(private element:ElementRef,private renderer:Renderer2)
    {

    }

    ngOnInit(): void {
      this.element.nativeElement.backgroundColor ="red";
        this.renderer.setStyle( this.element.nativeElement,'background-color',this.appHighlite);
        if (this.appHighliteColor) {
            this.renderer.setStyle(this.element.nativeElement, 'color', this.appHighliteColor);
          }
    }

   // Listen for mouseleave event
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'transparent');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'black');
  }
}