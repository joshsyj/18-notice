const axios = require('axios')

var open = require("open");

const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: 10000,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQ0ODEwLCJVc2VySW5mbyI6IlRJNHl2Wm1jSzg3a2gzMVZqOHh4TXhCZ0c0a3dqWEltVU51Rk0xcmRDSjFnYkxiZWxlV3FTUk0rVitwR1JSZUcyRmtSa0tac3Q4QkRpdzNpZEZMY2lMaDJGaTdMSklHSnE2bEc0bTk1dkpiWHFHaXBSRDMraVFNYlp3dm9rMUN0Um5wWE4wcDVlRGhacE9NSzRsS0JTZz09IiwibmJmIjoxNjU5Nzk2OTI0LCJleHAiOjE2NjAyMjg5MjQsImlhdCI6MTY1OTc5NjkyNCwiaXNzIjoic2hpYmFfYWRtaW4iLCJhdWQiOiJzaGliYV9hZG1pbiJ9.S-6trHWxkF6iZRIDgrAwepSP3LuaeGszAjSuLmymXjo"
    }
});

const option = {
    19: '活动公告',
    18: '上新公告'
}
function requestList() {
    instance.post('agg/notice/pages', {
        categoryId: 19,
        order: [],
        pageIndex: 1,
        pageSize: 10,
        title: "",
    }).then(res => {
        // console.log(res.data)
        if(res.data){
            let { items } = res.data.data
            // console.log(items)
            if (items && items.length) {
                let first = items[0]
                let time1 = new Date(first.publishTime).getTime()
                let time2 = new Date().getTime() - 60000
    
                if (time1 >= time2) {
                    let content = first.content
                    console.log(content)
                    let reg = /src="([^"]*)">/
                    console.log('最新公告：'+ first.title)
                    open(content.match(reg)[1], "chrome")
                    open('www.baidu.com?公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告', "chrome")
                }
                else{
                    console.log('无公告')
                    setTimeout(()=>{
                        requestList()
                    },3000)
                }
               
            }
            else{
                setTimeout(()=>{
                    requestList()
                },3000)
            }
        } 
        
    }).catch((e) => {
        console.log('服务器异常')
        setTimeout(()=>{
            requestList()
        },3000)
    })
}

// setInterval(()=>{
requestList()
// },2000)
