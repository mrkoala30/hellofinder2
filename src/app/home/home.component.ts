import { Component, OnInit } from '@angular/core';
import { NewpctService } from '../newpct.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NewpctService]
})
export class HomeComponent implements OnInit {
  show: any;
  home: any;
  forka: any;
  bluerip: any;
  select_item: any;
  showDialog = false;

  constructor(private _newService: NewpctService) { }

  ngOnInit() {
    this.loadHome();
    this.load4k();
    this.loadBluRip();
  }

  setDialog(){
    console.log("dialog");
  }

  loadHome(){
    this._newService.loadHome().subscribe(
      result => {
       this.home = result.items
       this.show = this.home;
        //console.log(result.items);
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  load4k(){
    this._newService.load4k().subscribe(
      result => {
        this.forka = result.items
        //console.log(this.forka);
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  loadSeries720p(){
  }

  loadBluRip(){
    this._newService.loadBlueRip().subscribe(
      result => {
        this.bluerip = result.items
        //console.log(this.forka);
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  loadFor(){
    console.log();
  }

  toDialog(item: any){
    //console.log("todialog" + item);
    this.select_item = item;
  }


}
