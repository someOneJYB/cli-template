/**
 * 监听 DOM 元素尺寸变化的实用函数
 * @param element - 要监听的 DOM 元素
 * @param callback - 尺寸变化时的回调函数
 * @param options - 配置选项
 * @returns 取消监听的函数
 */
export function observeElementSize(
  element: HTMLElement,
  callback: (size: { width: number; height: number }) => void,
  options: {
    /** 是否在初始化时立即触发回调 */
    immediate?: boolean;
    /** 监听的盒子模型类型 */
    box?: 'content-box' | 'border-box';
    /** 节流时间（毫秒） */
    throttle?: number;
  } = {}
): () => void {
  // 参数验证
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('First argument must be a valid HTMLElement');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }
  
  // 配置默认值
  const {
    immediate = true,
    box = 'content-box',
    throttle = 100
  } = options;
  
  // 检查浏览器是否支持 ResizeObserver
  if (typeof ResizeObserver === 'undefined') {
    console.warn('ResizeObserver is not supported in this browser. Falling back to window resize events.');
    return fallbackResizeObserver(element, callback, immediate, throttle);
  }
  
  let lastWidth = 0;
  let lastHeight = 0;
  let lastTime = 0;
  
  // 创建 ResizeObserver 实例
  const observer = new ResizeObserver((entries) => {
    const now = Date.now();
    
    // 节流处理
    if (now - lastTime < throttle) return;
    lastTime = now;
    
    for (const entry of entries) {
      const { width, height } = getSizeFromEntry(entry, box);
      
      // 检查尺寸是否实际发生变化
      if (width !== lastWidth || height !== lastHeight) {
        lastWidth = width;
        lastHeight = height;
        callback({ width, height });
      }
    }
  });
  
  // 开始观察元素
  observer.observe(element, { box });
  
  // 立即触发一次回调
  if (immediate) {
    const rect = element.getBoundingClientRect();
    const width = box === 'content-box' ? 
      rect.width - getTotalPadding(element) : 
      rect.width;
    const height = box === 'content-box' ? 
      rect.height - getTotalPadding(element, false) : 
      rect.height;
    
    lastWidth = width;
    lastHeight = height;
    callback({ width, height });
  }
  
  // 返回取消监听的函数
  return () => {
    observer.disconnect();
  };
}

/** 从 ResizeObserverEntry 获取尺寸 */
function getSizeFromEntry(
  entry: ResizeObserverEntry, 
  box: 'content-box' | 'border-box'
): { width: number; height: number } {
  // 优先使用现代 API
  if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
    const size = entry.borderBoxSize[0];
    if (box === 'border-box') {
      return { width: size.inlineSize, height: size.blockSize };
    }
  }
  
  if (entry.contentBoxSize && entry.contentBoxSize.length > 0) {
    const size = entry.contentBoxSize[0];
    if (box === 'content-box') {
      return { width: size.inlineSize, height: size.blockSize };
    }
  }
  
  // 降级方案：使用 contentRect
  const rect = entry.contentRect;
  if (box === 'content-box') {
    return { width: rect.width, height: rect.height };
  }
  
  // 对于 border-box，需要计算边框
  const computedStyle = window.getComputedStyle(entry.target);
  const borderLeft = parseFloat(computedStyle.borderLeftWidth) || 0;
  const borderRight = parseFloat(computedStyle.borderRightWidth) || 0;
  const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
  const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;
  
  return {
    width: rect.width + borderLeft + borderRight,
    height: rect.height + borderTop + borderBottom
  };
}

/** 获取元素的总内边距 */
function getTotalPadding(
  element: HTMLElement, 
  horizontal: boolean = true
): number {
  const style = window.getComputedStyle(element);
  if (horizontal) {
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  }
  return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
}

/** 降级方案：当 ResizeObserver 不可用时 */
function fallbackResizeObserver(
  element: HTMLElement,
  callback: (size: { width: number; height: number }) => void,
  immediate: boolean,
  throttle: number
): () => void {
  let lastWidth = element.offsetWidth;
  let lastHeight = element.offsetHeight;
  let lastTime = 0;
  
  // 立即触发一次回调
  if (immediate) {
    callback({ width: lastWidth, height: lastHeight });
  }
  
  // 窗口大小变化监听
  const resizeHandler = () => {
    const now = Date.now();
    if (now - lastTime < throttle) return;
    
    const newWidth = element.offsetWidth;
    const newHeight = element.offsetHeight;
    
    if (newWidth !== lastWidth || newHeight !== lastHeight) {
      lastWidth = newWidth;
      lastHeight = newHeight;
      callback({ width: newWidth, height: newHeight });
    }
    
    lastTime = now;
  };
  
  window.addEventListener('resize', resizeHandler);
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('resize', resizeHandler);
  };
}