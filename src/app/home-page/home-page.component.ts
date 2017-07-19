import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    constructor() { }
    ngOnInit(){
        let main=$('.main');
        var width=main.width();
        main.height(width*9/16+'px');
        var scale=width/1920;
        $('body').css('font-size',scale*12+'px');



    }
    toAdmin(){
        // this.router.go(number)
    }
}
