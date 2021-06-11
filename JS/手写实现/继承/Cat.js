const Animal = require('./Animal')

class Cat extends Animal{
  constructor() {
    super();
  }
  
  showMiao(){
    console.log(this.color, '===========打印的 ------ showMiao');
  }
}


const cat = new Cat()
cat.showMiao()
cat.showColor()
