(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.testRx = mod.exports;
    }
})(this, function () {
    'use strict';

    // import * as Rx from 'rxjs'
    // import { setupRxDevtools } from 'rx-devtools/rx-devtools';
    // import 'rx-devtools/add/operator/debug';
    // console.log('setupRxDevtools: ', setupRxDevtools);
    // setupRxDevtools();

    {
        var obs = Rx.Observable.create(function (observe) {
            return observe.next(1);
        });
        obs.subscribe(function (data) {
            console.log('data: ', data);
        });
    }
});
