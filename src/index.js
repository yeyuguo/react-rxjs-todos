import React from 'react';
import ReactDOM from 'react-dom';

import { setupRxDevtools } from 'rx-devtools/rx-devtools';

import App from './App';
import 'rx-devtools/add/operator/debug';

// import Rx from 'rxjs/Rxjs'
// const Rx = require('rxjs/Rxjs')
// console.log('Rx: ', Rx);
setupRxDevtools();




// const interval$ = Rx.Observable.interval(1000)
//     .debug('interval')
//     .startWith(10)
//     .take(10)
//     .filter((val: number) => val % 2 > 0)
//     .map((val: number) => val * 2)
//     .subscribe();

ReactDOM.render(<App />, document.getElementById('root'));