function getDays(year,month){
  var isLeap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month-1] || (isLeap ? 29 : 28);
}
function getWeekArr(year,month){
  var date = new Date(year,month-1)
  var weekDate=[]
  var firstWeekDays=7-date.getDay()
  var restDays=getDays(year,month)-firstWeekDays
  var weeks=Math.ceil(restDays/7)+1
  weekDate.push(`${year}-${month}-1`)
  for (var w=2;w<=weeks;w++){
    weekDate.push(`${year}-${month}-${firstWeekDays+7*(w-2)+1}`)
  }
  return weekDate
}

getWeekArr(2018,10)
