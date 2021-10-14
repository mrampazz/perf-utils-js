[![Coverage Status](https://coveralls.io/repos/github/mrampazz/perf-utils/badge.svg?branch=main&t=qbBRxr)](https://coveralls.io/github/mrampazz/perf-utils?branch=main)
# perf-utils

Few functions to measure performance and other useful stuff in a node.js app

## Functions

### memLog

```js
// returns value of current heap used by node.js process in MB
function memLog(): number
```

### profileFn

```js
// returns a log of the average execution time of a given function
// calculated over 'iter' iterations
function profileFn(fn: CBFuncVariadicAnyReturn, iter?: Number): ProfileFnLog
```

### sizeof

```js
// returns rough estimate of B used by an object
function sizeof(obj: any): number
```

### compareFnProfile

```js
// compares N fuctions by average execution time over 'iter' iterations
// returns fastest function's log and a list of all the logs calculated
function compareFnProfile(iter: number, ...functions: CBFuncVariadicAnyReturn[]): CompareFnLog;
```
