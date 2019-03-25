IE8不支持的部分css3属性

1.1 border-radius 圆角

border: 1px solid #696;
padding: 60px 0;
text-align: center; width: 200px;
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
background: #EEFF99;
behavior: url(/PIE.htc); 


说明：不支持单边的圆角属性，比如： border-top-left-radius，但是你可以这样来写：
border-radius 圆角
border-radius: 5px 10px 15px 20px; 

1.2 box-shadow 盒子阴影

border: 1px solid #696;
padding: 60px 0;
text-align: center; width: 200px;
-webkit-box-shadow: #666 0px 2px 3px;
-moz-box-shadow: #666 0px 2px 3px;
box-shadow: #666 0px 2px 3px;
background: #EEFF99;
behavior: url(/PIE.htc);


说明：不支持text-shadow(文本阴影)
box-shadow 盒子阴影

1.3 border-image 图片边框

 

color: white;
border: 8px solid #013D7A;
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
-webkit-border-image: url(img/border.png) 8 8 8 8 stretch;
-moz-border-image: url(img/border.png) 8 8 8 8 stretch;
border-image: url(img/border.png) 8 8 8 8 fill stretch;
behavior: url(PIE.htc);

 

1.4 CSS3 Backgrounds 背景渐变

 

background: #CCC; 
background: -webkit-gradient(linear, 0 0, 0 100%, from(#CCC) to(#EEE)); 
background: -webkit-linear-gradient(#CCC, #EEE); 
background: -moz-linear-gradient(#CCC, #EEE); 
background: -ms-linear-gradient(#CCC, #EEE); 
background: -o-linear-gradient(#CCC, #EEE); 
background: linear-gradient(#CCC, #EEE); 
-pie-background: linear-gradient(#CCC, #EEE); 
behavior: url(PIE.htc);

 

说明：只支持linear-gradient，并且不可以为渐变制定方向（线性渐变）

 

高级运用：
background-size: 50px;

background-image: -webkit-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: -moz-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: -ms-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: -o-linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
background-image: linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent);
-pie-background: linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent) 0 0 / 50px #0ae;
behavior: url(/PIE.htc);

 

1.5 RGBA 颜色值

 

padding: 60px 0;
background: #000;
background: rgba(0,0,0,.2);
-pie-background: rgba(0,0,0,.2);

 

说明：不支持box-shadow

 

1.6 IE6 png 透明

 

.png img{
　　-pie-png-fix: true;
　　behavior: url(/PIE.htc);
}
.png{
　　background-image:url(img.png);
　　-pie-background:url(img.png);
　　behavior: url(/PIE.htc);
}

 

说明：图片直接用-pie-png-fix: true，背景图片使用-pie-background来修复IE6下png透明的问题

 

1.7 解决IE浏览器部分版本不支持background-size属性问题

 

 width: 1440px;
height: 667px;
background:url(slide-bg.jpg) top left no-repeat;

-ms-background-size:cover;
 background-size:cover;

filter:

progid:DXImageTransform.Microsoft.AlphaImageLoader(src='slide-bg.jpg',sizingMethod='scale');

 

1.8 解决低版本IE不兼容border-image

width: 900px;

height: 600px;
border-style: solid;
border-width: 33px;
-moz-border-image: url(1.jpg) 2 27 17 36 round;
-webkit-border-image: url(1.jpg) 2 27 17 36 round;
-o-border-image: url(1.jpg) 2 27 17 36 round;
border-image: url(1.jpg) 2 27 17 36 round;
behavior: url(PIE.htc);

 

1.9

opacity//元素透明度属性

使用filter:alpha(opacity:0);兼容IE8
