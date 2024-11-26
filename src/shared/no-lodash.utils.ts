// See: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

export function throttle<T extends (...args: any[]) => void>(func: T, timeWindow: number) {
  var lastTime = 0;
  return function (...args: Parameters<T>) {
    var now = Date.now();
    if (now - lastTime >= timeWindow) {
      func(...args);
      lastTime = now;
    }
  };
}
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
