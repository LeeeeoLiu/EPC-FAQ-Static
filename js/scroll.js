// 获取到焦点元素滚动到可视区
function activeElementScrollIntoView() {
    var activeElement = document.activeElement;
    console.log(activeElement)
    var editable = activeElement.getAttribute('contenteditable')

    // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
    if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' || editable === '' ||
        editable) {
        setTimeout(function () {
            activeElement.scrollIntoView();
        }, 1000)
    }
}

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    console.log('isIOS');
    /* 获取窗口滚动条高度 */
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    };

    var oldScrollTop = getScrollTop() || 0; // 记录当前滚动位置

    document.body.addEventListener('focusin', () => { //软键盘弹起事件
        console.log("ios 键盘弹起");
    });
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
        console.log("ios 键盘收起");
        var ua = window.navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { //键盘收起页面空白问题
            document.body.scrollTop = oldScrollTop;
            document.documentElement.scrollTop = oldScrollTop;
        }

    });
} else if (/(Android)/i.test(navigator.userAgent)) {

    console.log('isAndroid');
    var winHeight = $(window).height(); //获取当前页面高度
    $(window).resize(function () {
        var thisHeight = $(this).height();
        console.log("old window height:" + winHeight)
        console.log("new window height:" + thisHeight)
        if (winHeight - thisHeight > 140) {
            //键盘弹出
            console.log("android 键盘弹起");
            activeElementScrollIntoView();
        } else {
            console.log("android 键盘收起");
            //键盘收起
        }
    })
} else {
    console.log('isPC');
}