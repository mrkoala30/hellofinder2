import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NewpctService } from '../newpct.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit, OnChanges {
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() item: any = null;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public item_loaded: any;
  public youtube: any;

  constructor(private _newService: NewpctService, private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  close() {
   // this.item = null;
    this.item_loaded = null;
    this.youtube = null;
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.visible);
    console.log(this.item);
    if(this.item!=undefined && this.visible){
      //console.log(this.item.enlace);
      this._newService.getItem(this.item.enlace).subscribe(
        result => {
          this.item_loaded = result;
          this.youtube = this.sanitizer.bypassSecurityTrustResourceUrl(this.item_loaded.youtube);

        },
        error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
    }
    if(!this.visible){
      this.close();
    }

    // changes.prop contains the old and the new value...
  }

}
