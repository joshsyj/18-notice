const axios = require('axios')

var open = require("open");
let timeout = 10000

const instance = axios.create({
    baseURL: 'https://m.18art.art/api/',
    timeout: timeout,
    headers: {
        origin: 'https://m.18art.art',
        'content-type': 'application/json;charset=UTF-8',
        //153
        'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIyNTg1OSwiVXNlckluZm8iOiJhYnlrald2MUFlSVA1SUxzNS84MzdLOVlkRmd5R0JrNUdxS3piN3VEWCtaclJpeXRPdVBuamVZUVB2TmJ2RXdVYXhybUJwTnNjVVJKL3p5eGJSWWNXU2l4VUpaMkJYVVMxOWtZZ2pyV2dCaGFxeXk1REpKZWJOVE90TFZ0aVMxQUdNQWloNTlUbUcxSHpNMjhLa0sxeVE9PSIsIm5iZiI6MTY2MDA5NjgxMCwiZXhwIjoxNjYwMzEyODEwLCJpYXQiOjE2NjAwOTY4MTAsImlzcyI6InNoaWJhX2FkbWluIiwiYXVkIjoic2hpYmFfYWRtaW4ifQ.8UFCFARkDJqloWJx0WxDHF3iRnkEjUYUNg6ddMo4mtE"
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
        if (res.data) {
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
                    console.log('最新公告：' + first.title)
                    open(content.match(reg)[1], "chrome")
                    open('www.baidu.com?公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告公告', "chrome")
                }
                else {
                    console.log('无公告')
                    setTimeout(() => {
                        requestList()
                    }, timeout)
                }

            }
            else {
                setTimeout(() => {
                    requestList()
                }, timeout)
            }
        }

    }).catch((e) => {
        console.log('服务器异常')
        setTimeout(() => {
            requestList()
        }, timeout)
    })
}

// setInterval(()=>{
requestList()
// },2000)
