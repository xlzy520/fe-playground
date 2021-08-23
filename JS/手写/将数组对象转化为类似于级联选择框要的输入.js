const child = (value)=> {
  return {
    value,
    children: []
  }
}

// 局限性不好
const transform = (data)=> {
  const map = {}
  const res = []
  data.forEach(v=> {
    if (map[v.province]) {
      if (map[v.city]) {
        map[v.city].children.push(child(v.area))
      } else {
        let city = child(v.city)
        let area = { value: v.area }
        city.children.push(area)
        map[v.city] = city
        map[v.province].children.push(city)
      }
    } else {
      let province = child(v.province)
      let city = child(v.city)
      let area = { value: v.area }
      city.children.push(area)
      province.children.push(city)
      map[v.province] = province
      map[v.city] = city
      res.push(province)
    }
  })
  return res
}


const input = [
  {province:'广东',city:'深圳',area:'宝安'},
  {province:'广东',city:'深圳',area:'南山'},
  {province:'广东',city:'汕头',area:'潮阳'},
  {province:'广东',city:'广州',area:'天河'},
  {province:'浙江',city:'杭州',area:'西湖'},
]

const data = transform(input)
console.log(data);


const keys = ['province', 'city', 'area']
const transform2 = (data)=> {
  const map = {}
  data.forEach(v=> {
    if (map[v.province]) {
    
    } else {
    
    }
  })
}
