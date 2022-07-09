(function flexible (window, document) {
  // 获取html根元素
  var docEl = document.documentElement
  // 获取物理像素比  逻辑中断：能获得该属性就获得 没有该属性就让它等于1
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    // 如果页面中有body元素  就设置body的字体大小
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    // 如果页面中没有body(在body上面引入的JS)  则等着页面主要的DOM元素加载完毕再去设置body
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10  设置html元素的文字大小
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize 页面尺寸发生变化的时候 重新设置下rem大小
  window.addEventListener('resize', setRemUnit)
  // 下面三种情况都会刷新页面都会触发 load 事件。
  // a标签的超链接
  // F5或者刷新按钮（强制刷新）
  // 前进后退按钮
  // 但是 火狐中，有个特点，有个“往返缓存”，这个缓存中不仅保存着页面数据，还保存了DOM和JavaScript的状态；实际上是将整个页面都保存在了内存里。
  // 所以此时后退按钮不能刷新页面。
  // 此时可以使用 pageshow事件来触发。这个事件在页面显示时触发，无论页面是否来自缓存。在重新加载页面中，pageshow会在load事件触发后触发；
  // 根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件，注意这个事件给window添加。
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports 有些移动端的浏览器不支持0.5px的写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
