function Person(name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log(this.name);
}

const person = new Person('lzy')
console.log(person.name);
person.sayName()


// 模拟

function mockNew() {
  const constructor = [].shift.call(arguments)
  const obj = Object.create(constructor.prototype)
  let ret = constructor.apply(obj, arguments)
  return ret instanceof Object ? ret : obj
}

const mockPerson = mockNew(Person, 'lzy')
console.log(mockPerson.name);
mockPerson.sayName()


function P() {}
var p1 = new P();
P.prototype.age = 18;
P.prototype = {
  constructor: P,
  name: 'zz'
}
P.prototype.num = 20;
P.prototype.age = 20;
console.log(p1.__proto__);
console.log(P.prototype);
console.log(p1.name);
console.log(p1.age, 'dd');
console.log(p1.num); //undefined
var p2 = new P();
console.log(p2.name);
