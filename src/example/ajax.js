// import * as Rx from 'rxjs'


function request(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function () {
            // console.log('xhr.responseText: ', xhr.responseText);
            const data = JSON.parse(xhr.responseText)
            resolve(data)
        }
        xhr.send()
    })
}

Rx.Observable.prototype.ajax = function (ajaxParams) {
    const oldObserval = this
    return Rx.Observable.create(function (newObserval) {
        oldObserval.subscribe({
            next: reqParams => {
                const xhr = new XMLHttpRequest()
                xhr.open('GET', reqParams)
                xhr.onload = function () {
                    // console.log('xhr.responseText: ', xhr.responseText);
                    const data = JSON.parse(xhr.responseText)
                    newObserval.next(data)
                }
                xhr.send()
            },
            error: (err) => {
                newObserval.error(err)
            },
            complete: () => {
                newObserval.complete()
            },
        })
    })
}


{
    const obs = Rx
        /** 1. */
        .Observable
        .create(observer => {
            const url = 'https://biz.trace.ickd.cn/auto/89481561927'
            observer.next(url)
        })
        .ajax()

    obs.subscribe(data => {
        console.log('observal create:', data)
    })


}

{

    const obs = Rx.BehaviorSubject('https://biz.trace.ickd.cn/auto/89481561927')
    obs.subscribe(reqParams => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', reqParams)
        xhr.onload = function () {
            // console.log('xhr.responseText: ', xhr.responseText);
            const data = JSON.parse(xhr.responseText)
            newObserval.next(data)
        }
        xhr.send()
    })

    obs.next('https://biz.trace.ickd.cn/auto/89481561928')
}



// {
//     // 数据请求的封装
//     const subject = new Rx.BehaviorSubject(0);
//     subject.subscribe(reqParams => {
//         const xhr = new XMLHttpRequest()
//         xhr.open('GET', url)
//         xhr.onload = function () {
//             // console.log('xhr.responseText: ', xhr.responseText);
//             const data = JSON.parse(xhr.responseText)
//             resolve(data)
//         }
//         xhr.send()
//     })
//     subject.next(2)
// }
