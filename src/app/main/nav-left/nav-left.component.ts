import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent implements OnInit {

    constructor() { }
    actLi="";
    ngOnInit() {
        // console.log('location',window.location)
        // this.actLi="ccp";
        console.log();
        $('.sub-menu').click(function(){
            $(this).toggleClass('ad-li-active').siblings('.ad-li-active').removeClass('ad-li-active');
            
        })

        console.log(window.location.hash);
        let hash=window.location.hash;
        var mainMenu=hash.split('/')[2];
        var subMenu=hash.split('/')[3];

        $('.'+mainMenu+'-menu').addClass('ad-active');
        $('.'+mainMenu+'-'+subMenu).addClass('ad-li-active')

    }
    toggle(data){
        
        $('.'+data+'-menu').toggleClass("ad-active");
        $('.'+data+'-menu').siblings(".ad-active").removeClass('ad-active');
    }

 

}
