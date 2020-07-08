import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';
import {HttpClient} from '@angular/common/http';
declare const Konva: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {
  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('hexagon') hexagon: KonvaComponent;
  @ViewChild('shapecircle') shapecircle: KonvaComponent;
  @ViewChild('shapeEight1') shapeEight1: KonvaComponent;
  @ViewChild('shapeEight2') shapeEight2: KonvaComponent;
  @ViewChild('shapeGround') shapeGround: KonvaComponent;
  readonly ROOT_URL='http://localhost:8080/simapi/webapi/';
  posts:any;
  
  XCir:any=0.0;
  YCir:any=0.0;
  XEig:any=0.0;
  YEig:any=0.0;
  XGro:any=0.0;
  YGro:any=0.0;
  Xline:any=0.0;
  Yline:any=0.0;

  interval:any;
  mouseFirstX:any=0;
  mouseFirstY:any=0;
  mouseNextX:any=1;
  mouseNextY:any=1;


newPoint:boolean=false;
 visCir:boolean=true
 visEig:boolean=false
 visGro:boolean=false;
  speed:any=10;
  
  getCircle():Observable<JSON>{
    this.posts=this.http.get<JSON>(this.ROOT_URL+'circlepath');
   
    return this.posts;
    
  }
  getEight():Observable<JSON>{
    this.posts=this.http.get<JSON>(this.ROOT_URL+'eightpath');
   
    return this.posts;
    
  }
  getGround():Observable<JSON>{
    this.posts=this.http.get<JSON>(this.ROOT_URL+'groundpath');
   
    return this.posts;
    
  }

  getLine():Observable<JSON>{
    
     
    // console.log("this.newPoint"+this.newPoint);
    this.posts=this.http.get<JSON>(this.ROOT_URL+'linepath/'+this.mouseFirstX+'/'+this.mouseFirstY+'/'+this.mouseNextX+'/'+this.mouseNextY+'/'+this.newPoint);
   
    return this.posts;
    
  }

  
  circle(){
    var that=this;
    this.getLine().subscribe((l)=>{
     
      this.getCircle().subscribe((e)=>{
        if(that.newPoint){
          that.XCir=parseFloat(e["x"])+parseFloat(l["x"]);
          that.YCir=parseFloat(e["y"])+parseFloat(l["y"]);
    

        }else{
          that.XCir=parseFloat(e["x"]);
          that.YCir=parseFloat(e["y"]);
    

        }
       
        
       });
      
     });
   
  }
  eight(){
    var that=this;
    this.getLine().subscribe((l)=>{
     
      this.getEight().subscribe((e)=>{
        
        if(that.newPoint){
          that.XEig=parseFloat(e["x"])+parseFloat(l["x"]);
          that.YEig=parseFloat(e["y"])+parseFloat(l["y"]);
    

        }else{
          that.XEig=parseFloat(e["x"]);
          that.YEig=parseFloat(e["y"]);
    

        }
  
        
       });
      
     });
  }
  ground(){
    var that=this;
    this.getLine().subscribe((l)=>{
     
      this.getGround().subscribe((e)=>{
       
        if(that.newPoint){
          that.XGro=parseFloat(e["x"])+parseFloat(l["x"]);
          that.YGro=parseFloat(e["y"])+parseFloat(l["y"]);
    

        }else{
          that.XGro=parseFloat(e["x"]);
          that.YGro=parseFloat(e["y"]);
    

        }
  
        
       });
      
     });
  }

 
  
    public timer = setInterval(() => {
      if(this.visCir)
      this.circle();
      if(this.visGro)
      this.ground();
      if(this.visEig)
      this.eight();
     
    },10)
  
  
  constructor(private http:HttpClient){
    
  

     


  }

  public edited = false;
  public configStage: Observable<any> = of({
    width: 1000,
    height:550
  });
 
  public configItem: Observable<any> = of({
    x: 200,
    y: 100,
    sides: 20,
    radius: 10,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 0
    
    
  });

  public configCircle: Observable<any> = of({
    x: 500,
    y: 300,
    radius: 100,
    
    stroke: 'black',
    strokeWidth: 2,
    angle: 10,
  });

  public configEight1: Observable<any> = of({
    x: 400,
    y: 300,
    radius: 100,
    
    stroke: 'black',
    strokeWidth: 0
  });
  public configEight2: Observable<any> = of({
    x: 600,
    y: 300,
    radius: 100,
    
    stroke: 'black',
    strokeWidth: 0
  });

  public configShape: Observable<any> = of({
    sceneFunc: function(context: any) {
      context.beginPath();
      context.moveTo(400, 250);
      
      context.lineTo(600, 250);
      context.arc(600, 300, 50, 1.5 * Math.PI, 0.5 * Math.PI);
      context.moveTo(600, 350);
      context.lineTo(400, 350);
      context.arc(400, 300, 50, 0.5 * Math.PI, 1.5 * Math.PI);
     
 
      // special Konva.js method
      context.fillStrokeShape(this);
    },
    
    stroke: 'black',
    strokeWidth: 0
  });















 onCircle(enent:MouseEvent){
  console.log("mouse cir");
  this.visCir=true;
  this.visEig=false;
  this.visGro=false;
  this.shapecircle
  .getStage()
  .strokeWidth(2)
  this.shapeEight1
  .getStage()
  .strokeWidth(0)
  

  this.shapeEight2
  .getStage()
  .strokeWidth(0)

 

this.shapeGround
.getStage()
.strokeWidth(0)



 }
 onEight(enent:MouseEvent){
  console.log("mouse eig");
  this.visCir=false;
  this.visEig=true;
  this.visGro=false;
  this.shapecircle
    .getStage()
    .strokeWidth(0)

  this.shapeEight1
  .getStage()
  .strokeWidth(2)

  this.shapeEight2
  .getStage()
  .strokeWidth(2)
this.shapeGround
  .getStage()
  .strokeWidth(0)


 }
 onGround(enent:MouseEvent){
  console.log("mouse gro");
  this.visCir=false;
  this.visEig=false;
  this.visGro=true;

  this.shapecircle
  .getStage()
  .strokeWidth(0)

this.shapeEight1
.getStage()
.strokeWidth(0)

this.shapeEight2
.getStage()
.strokeWidth(0)

this.shapeGround
.getStage()
.strokeWidth(2)

 }

 logText(value: string): void {
  this.speed=parseInt(value);

  clearInterval(this.timer);
  this.timer = setInterval(() => {
    if(this.visCir)
    this.circle();
    if(this.visGro)
    this.ground();
    if(this.visEig)
    this.eight();
   
  }, this.speed);
}




  clickEvent(event:MouseEvent ){

 
   this.mouseFirstX=this.mouseNextX;
   this.mouseFirstY=this.mouseNextY;
   
   
  
    this.mouseNextX=event.clientX-500;
    this.mouseNextY=event.clientY-300;	
  
      
  
    var that=this

    that.shapecircle
    .getStage()
    .setY(event.clientY) 
     
    .setX(event.clientX)
    

  

    that.shapeEight1
    .getStage()
    .setY(event.clientY) 
     
    .setX(event.clientX-100)

    that.shapeEight2
    .getStage()
    .setY(event.clientY) 
     
    .setX(event.clientX+100)

   

    this.shapeGround
    .getStage()
    .sceneFunc( 
      
      function(context: any) {
        context.beginPath();
        context.moveTo(event.clientX-100,event.clientY- 50);
        
        context.lineTo(event.clientX+100, event.clientY- 50);
        context.arc(event.clientX+100, event.clientY, 50, 1.5 * Math.PI, 0.5 * Math.PI);
        context.moveTo(event.clientX+100,event.clientY+50);
        context.lineTo(event.clientX-100, event.clientY+50);
        context.arc(event.clientX-100, event.clientY, 50, 0.5 * Math.PI, 1.5 * Math.PI);
       
   
        // special Konva.js method
        context.fillStrokeShape(this);
      }
      
      
    )


   



    
    
   
  
   
 this.newPoint=true;
 

  }
  ngAfterViewInit() {
   
    const ng = this;
    const anim = new Konva.Animation(function test(frame: any) {
    var that=ng;
      if(that.visCir){
       
   

       console.log("new cir x "+that.XCir)
       console.log("new cir y "+that.YCir)

      
      
          ng.hexagon
            .getStage()
            .setY(that.YCir) 
             
            .setX(that.XCir)
            
    
        

       

      }else if(that.visEig){

        
        
        
      
      
          ng.hexagon
            .getStage()
            .setY(that.YEig)
             
            .setX(that.XEig);
    
         

      }else if(that.visGro){


        
        
        
      
      
          ng.hexagon
            .getStage()
            .setY(that.YGro+that.Yline)
             
            .setX(that.XGro+that.Xline );
    
      


      }
        
    }, ng.layer.getStage());

    
    anim.start();
  

  
  



  }



}