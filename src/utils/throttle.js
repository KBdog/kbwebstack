/**
 * 节流函数
 * @param {*} fn 是我们需要包装的事件回调
 * @param {*} wait 是每次推迟执行的等待时间
 */
const throttle = (fn, wait = 1500) => {
    let inThrottle, lastFn, lastTime;
    return function() {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};
export default throttle;
