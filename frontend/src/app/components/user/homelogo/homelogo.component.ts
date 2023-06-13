import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-homelogo',
  templateUrl: './homelogo.component.html',
  styleUrls: ['./homelogo.component.scss']
})
export class HomeLogoComponent implements OnInit,AfterViewInit {
  public _logos: any[]=[
    {
      title:'INSTALLATIONS CUSTOMIZED TO YOUR REQUIREMENTS',
      img:'assets/images/av-installations-and-customization-ics.jpg'
    },
    {
      title:'CONFERENCE SOLUTIONS THAT SCALE WITH YOU',
      img:'assets/images/24x7x365-customer-support-services.jpg'
    },
    {
      title:'24\/7, 365 SUPPORT TO MINIMIZE DOWNTIME',
      img:'assets/images/24x7x365-customer-support-services.jpg'
    },   
  ];
  // public _logos:any[]=[];
  public _slide:any={
    src:"",
    thumbSrc:"",
    layerWidth:960,
    layerWidthTablet:960,
    layerWidthMobile:560,
    layerHeight:480,
    layerHeightTablet:480,
    layerHeightMobile:800,
    elements:[
      {
        type:"text",
        mode:"content",
        content:"",
        contentAnimationType:"animating",
        customCSS:"letter-spacing: 0.5px;text-shadow: 0 2px 2px rgba(0,0,0,0.25);font-family: Gilroy Medium !important;",
        display:"block", 
        fontSize:"80px",
        fontFamily:"initial",
        fontWeight:700,
        textColor:"#ffffff",
        borderRadius:0,
        position:{"x":"center","y":"center","offsetX":0,"offsetY":0},
        startAnimation:{"animation":"fadeInDown","speed":1200,"delay":600},
        endAnimation:{"animation":"fadeOut","speed":1000},
        textAlign:"center",
        backgroundColor:"rgba(255,255,255,0)",
        lineHeight:"100px",
        typingAnimation:{"loop":false,"cursor":true},
        marginTop:40,
        marginBottom:40,
        color:"#ffffff",
        mobile:{"display":"block","fontSize":"40px","fontWeight":700,"lineHeight":"50px","marginBottom":40,"marginRight":0,"marginTop":25,"mode":"content","paddingRight":0,"position":{"offsetX": 0, "x": 'center', "y": 'center', "offsetY": 0},"textAlign":"center"},
        tablet:{"mode":"content","position":{"offsetX":0,"x":"center","y":"center","offsetY":0},"display":"block","fontSize":"60px","fontWeight":700,"lineHeight":"90px"}
      },
      {
        type:"text",
        mode:"canvas",
        contentAnimationType:"animating",
        customCSS:"letter-spacing: 0.5px;text-shadow: 0 2px 2px rgba(0,0,0,0.25);",
        display:"block",
        fontSize:"16px",
        fontFamily:"initial",
        fontWeight:"normal",
        textColor:"#ffffff",
        backgroundColor:"rgba(255,255,255,0)",
        borderRadius:0,
        color:"#ffffff",
        position:{"x":"center","y":"center","offsetX":0,"offsetY":0},
        typingAnimation:{"speed":50,"loop":false,"loopDelay":750,"cursor":true,"startDelay":0,"freezeAt":0,"unfreezeAfter":0},
        startAnimation:{"animation":"fadeIn","speed":500,"delay":0},
        endAnimation:{"animation":"fadeOut","speed":500,"delay":0},
        width:"3840px",
        height:"2160px",
        minWidth:"3840px",
        maxWidth:"3840px",
        hover:{"textColor":"rgba(0,0,0,0.3)"},
        mobile:{"display":"block","fontSize":"40px","fontWeight":700,"lineHeight":"50px","marginBottom":40,"marginRight":0,"marginTop":25,"mode":"content","paddingRight":0,"position":{"offsetX": 0, "x": 'center', "y": 'center', "offsetY": 0},"textAlign":"center"},
        tablet:{"mode":"content","position":{"offsetX":0,"x":"center","y":"center","offsetY":0},"display":"block","fontSize":"60px","fontWeight":700,"lineHeight":"90px"}
      }
    ],
    transitionEffect:"slide",
    transitionDuration:1000,
    urlTarget:"_self",
    direction:"left",
    blur:2,
    distance:5,
    brightness:2
  };
  public logos: any={
    slides: [],
    initialSlide:0,
    hashNavigation:{"enable":false},
    width:688,
    height: 378,
    fullscreen:true,
    ratio:2,
    ratioTablet:2,
    ratioMobile:0.8,
    buttons:{"pauseVisible":false,"muteVisible":false,"startVideoMuted":true},
    loading:{"backgroundColor":"#FFFFFF","textColor":"#1c1c1c","fadeEffect":true,"color":"#E32F23","style":"style2"},
    autoplay:{"enable":true,"delay":6000,"disableOnInteraction":true,"reverseDirection":false},
    responsive:1,
    navigation:{"enable":false,"normal":{"color":"#ffffff"},"style":"effect6","color":"#FFFFFF"},
    pagination:{"enable":1,"style":"effect6","dynamicBullets":false,"clickable":true,"type":"bullets","normal":{"backgroundColor":"rgba(255,255,255,0.19)","border":"none","width":"40px","height":"4px","opacity":1,"borderRadius":"0px","boxShadow":"none"},"active":{"backgroundColor":"#03b5c3","border":"none","width":"40px","height":"4px","opacity":1,"borderRadius":"0px","boxShadow":"none"},"hover":{"backgroundColor":"#03b5c3","border":"none","width":"40px","height":"6px","opacity":1,"borderRadius":"0px","boxShadow":"none"},"backgroundColor":"#FFFFFF30","borderRadius":"0px","boxShadow":"none","opacity":1,"width":"40px","height":"3px","border":"none","backgroundColorActive":"#FFFFFF","borderRadiusActive":"0px","boxShadowActive":"none","opacityActive":1,"widthActive":"40px","heightActive":"3px","borderActive":"none","backgroundColorHover":"#FFFFFF","borderRadiusHover":"0px","boxShadowHover":"none","opacityHover":1,"widthHover":"40px","heightHover":"3px","borderHover":"none"},
    stopOnLastSlide:0,
    layerWidth:'80%',
    layerHeight:'100%',
    grabCursor: true,
    parallax:0.1,
    layerWidthMin:'560px',
    layerWidthMax: '80%',
    layerHeightMin: '750px',
    layerWidthMobile: '80%',
    layerWidthMinMobile: '600px',
    layerHeightMobile: '100%',
    layerHeightMinMobile:'750px',
    tabletSize: 1024,
    mobileSize:768,
    keyboard:{"enable":true},
    wheelNavigation:{"enable":false,"stopOnLast":false,"interval":2000},
    lightbox:{"backgroundColor":"#000000F2","closeColor":"#FFFFFF"},
    shadow: 'off',
    layerWidthTablet: '80%',
    layerWidthMinTablet: '600px',
    layerHeightTablet: '100%',
    layerHeightMinTablet: '750px',
    thumbs:{"enable":false,"position":"bottom","slidesPerView":3,"spaceBetween":0,"thumbWidth":"100","thumbHeight":"60","spaceAround":"3","outsideSlider":true,"centered":true},
    transitionType:"webgl",
    forceResponsive:false,
    forceFullscreen:false,
    layerStarOnTransitionStart:false,
    lightboxMode:{"enable":false,"text":"open in LIGHTBOX","fontColor":"#6C6C6C","hoverColor":"#333333","fontFamily":"Arial","fontSize":"20"},
    resetVideos:false,
    videoAutoplay:true,
  };
  public currentPath: any;
  public currentMenu:any;
  constructor(public location: Location, private router: Router,public storeService: StoreService) {
    this.currentPath = location.path(); 
    
  }

  ngOnInit() {
    
  }  
  ngAfterViewInit(): void {
    this.storeService.data$.subscribe((data)=>{ 
      this.currentMenu = data;      
      for(let i=0; i< Object.keys( this.currentMenu).length;i++){
        if(this.currentPath.includes(this.currentMenu[i].url)){
          
            let images = this.currentMenu[i].images;
            images = images.replace(/'/g, '"');
            this._logos = JSON.parse(images); 
            this.logos.slides = this._logos && this._logos.map((item:any)=>{
              let newSlide : any = new Object();
              Object.assign(newSlide, this._slide);
              newSlide.elements = JSON.parse(JSON.stringify(this._slide.elements));            
              newSlide.src = item.img;
              newSlide.thumbSrc = item.img;
              newSlide.elements[0].content = item.title;
              return newSlide;
            });
           this.logos = JSON.stringify(this.logos);
                
        }
      } 
    });
  }
  onMousey(){
    const a = document.getElementById('scroll');
    a?.scrollIntoView({behavior: 'smooth'});
  }

}
