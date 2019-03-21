
import * as Rx from 'rxjs'
// import { setupRxDevtools } from 'rx-devtools/rx-devtools';
// import 'rx-devtools/add/operator/debug';
// console.log('setupRxDevtools: ', setupRxDevtools);
// setupRxDevtools();

// 创建 demo 标识
function createFlags(flag) {
    return `----- ${flag} ------> `
}

// 创建 start 和 end 标识
{
    const flag = 'template demo'
    const flags = createFlags(flag)
    console.log(flags + 'start:');
    console.log(flags + 'end!');
}


/** 测试 生成标准示例 
 * 
// 创建 demo 标识
function createFlags(flag) {
    return `----- ${flag} ------> `
}

// 函数创建表识
function createDemo(themeName, fn) {

    const flag = themeName || 'template demo'
    const flags = createFlags(flag)
    console.log(flags + 'start:');

    // const returnFn = await new Promise((resolve, reject) => {
    //     const result = fn(...args)
    //     console.log(flags + 'end!');
    // })
    return async function (...args) {
        const result = await fn(...args)
        console.log('result: ', result);
        console.log(flags + 'end!');
        return result
    }

}

var test = createDemo('test测试', function (n) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(n + ' add async ')
        }, 300)
    })
})
test('hhhh')


*/

{
    const flag = 'create 1'
    const flags = createFlags(flag)
    console.log(flags + 'start:');
    let obs = Rx.Observable.create(observe => observe.next(1))
    obs.subscribe(data => {
        console.log(flags + '1.', data);
    })
    obs.subscribe(data => {
        console.log(flags + '2.', data);
    })
    console.log(flags + 'end!');
}


{
    console.log('----- create 2 ------')
    let obs = Rx.Observable.create(observe => observe.next(Date.now()))
    obs.subscribe(data => {
        console.log('1. data: ', data);
    })

    obs.subscribe(data => {
        console.log('2. data: ', data);
    })
}

{
    console.log('----- publish 1 ------')
    let obs = Rx.Observable.create(observe => {
        console.log('publish 会导致有无订阅，都会先发布数据')
        return observe.next(Date.now())
    })
        .publish()


    // obs.connect() // 会导致 subscribe 不触发， 只能被消费一次

    obs.subscribe(data => {
        console.log('1. data: ', data);
    })

    obs.subscribe(data => {
        console.log('2. data: ', data);
    })
    console.log('subscribe 不会被触发')
    console.log(Date.now())
    setTimeout(() => {
        obs.connect()
    }, 1000)
}


{
    const keys = 'publish 1.5'
    // console.log(`----- ${keys} ------`)

    let obs = Rx.Observable
        .create((observer => {
            // observer.next('xxxx')
        }))
        .publish()


    // obs.connect() // 会导致 subscribe 不触发， 只能被消费一次

    obs.subscribe(data => {
        console.log('1. data: ', data);
    })

    obs.subscribe(data => {
        console.log('2. data: ', data);
    })
    console.log('subscribe 不会被触发')
    obs.connect()
    // setTimeout(() => {
    //     obs.connect()
    // }, 1000)
}







