import * as Rx from 'rxjs'

function createFlags(flag) {
    return `----- ${flag} ------> `
}

// 创建 start 和 end 标识
{
    const flag = ' template demo '
    const flags = createFlags(flag)
    console.log(flags + ' start: ');
    console.log(flags + ' end! ');
}

// 用于事例的回调 打印 函数
function fn(tag) {
    return function (data) {
        console.log(tag + ' : ' + data)
    }
}


Rx.Observable.prototype.tag = function (flag) {
    const oldObserval = this
    return Rx.Observable.create(function (newObserver) {
        oldObserval.subscribe({
            next: (data) => {
                console.log(`----- ${flag} ------> `)
                newObserver.next(data)
            },
            error: (err) => {
                console.error(`----- ${flag} - error ------> `, err)
                newObserver.error(err)
            },
            complete: (data) => {
                console.error(`-----${flag} -complete ------> `)
                newObserver.complete()
            }
        })
    })
}



{
    // 同步代码执行
    const observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        setTimeout(() => {
            observer.next(4);
            observer.complete();
        }, 1000);
    }).tag('tag hhhhhhh');

    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');
}


{
    // 同步代码执行
    const observable = Rx.Observable.create(function (observer) {
        console.log('Hello');
        observer.next(42);
        observer.next(100);
        observer.next(200);
        setTimeout(() => {
            observer.next(300); // 异步执行
        }, 1000);
    });

    console.log('before');
    observable.subscribe(function (x) {
        console.log(x);
    });
    console.log('after');

}



{
    // 多播的实现1
    const flag = ' 多播 subject demo '
    const flags = createFlags(flag)
    console.log(flags + ' start: ');

    const subject = new Rx.Subject()
    subject.subscribe((v) => console.log('observerA: ' + v))
    subject.subscribe((v) => console.log('observerB: ' + v))

    const source = Rx.Observable.from([1, 2, 3]);
    source.subscribe(subject)

    console.log(flags + 'end!');
}


{
    /** 多播的实现2 
     * multicasted 底层是由多播 subject 原理实现的 
     * */

    const flag = ' 多播 multicast demo '
    const flags = createFlags(flag)
    console.log(flags + ' start: ');

    const source = Rx.Observable.from([1, 2, 3]);
    const subject = new Rx.Subject();
    const multicasted = source.multicast(subject);
    // 在底层使用了 `subject.subscribe({...})`:
    multicasted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });
    multicasted.subscribe({
        next: (v) => console.log('observerB: ' + v)
    });
    // 在底层使用了 `source.subscribe(subject)`:
    multicasted.connect();

    console.log(flags + 'end!');



}



