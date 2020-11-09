export default function throttle(func, wait) {

  let timeOut = null;
  if (timeOut) {
    return false;
  }
  return function (...args) {
    clearTimeout(timeOut); //一定要清除定时器
    timeOut = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
