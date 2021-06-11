class Animal {
  constructor() {
    this.color = 'red'
  }
  
  showColor() {
    console.log(this.color, '===========打印的 ------ showColor');
  }
}

module.exports = Animal
