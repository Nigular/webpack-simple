!function(win, lib) {
    var timer,
        doc     = win.document,			
        docElem = doc.documentElement,
        vpMeta   = doc.querySelector('meta[name="viewport"]'),
 
        dpr   = 1,
        scale = 1;
 
 
 
    // 插入 viewport meta
    if (!vpMeta) {
        vpMeta = doc.createElement("meta");
         
        vpMeta.setAttribute("name", "viewport");
        vpMeta.setAttribute("content",
            "width=device-width,initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no");
 
        if (docElem.firstElementChild) {	//在头部添加viewpoint
            docElem.firstElementChild.appendChild(vpMeta)
        } else {			// 如果获取不到头部，就用创建元素然后写入发方法来写入到页面里
            var div = doc.createElement("div");
            div.appendChild(vpMeta);
            doc.write(div.innerHTML);
        }
    }
 
    function setFontSize() {
        var winWidth = docElem.getBoundingClientRect().width;
 		if(winWidth>750){winWidth=750}  //限制最大宽度
        // 根节点 fontSize 根据宽度决定（到时候算rem的时候，就用设计稿宽度/）
        var baseSize = winWidth / 10;
        docElem.style.fontSize = baseSize + "px";
    }
 
    // 调整窗口时重置
    win.addEventListener("resize", function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);
 
     
    // orientationchange 时也需要重算下吧（翻转设备）
    win.addEventListener("orientationchange", function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);
 
 
    // pageshow
    // keyword: 倒退 缓存相关
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);
 
    // 设置基准字体
    if ("complete" === doc.readyState) {
        doc.body.style.fontSize = 24/75 + "rem";
    } else {
        doc.addEventListener("DOMContentLoaded", function() {
            doc.body.style.fontSize = 24/75 + "rem";
        }, false);
    }
  
    setFontSize();
 
}(window, window.lib || (window.lib = {}));