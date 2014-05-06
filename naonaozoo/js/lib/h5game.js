/**
 * 工具类
 */
if(typeof window.wyx === 'undefined'){
	window.wyx = {};
}
if(typeof window.wyx.h5game === 'undefined'){
	window.wyx.h5game = {};
}
//获取页面实际大小
wyx.h5game.getPageSize = function() {
	var xScroll, yScroll, pageHeight, pageWidth, arrayPageSize,windowWidth, windowHeight;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	if (self.innerHeight) { // all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	if (xScroll < windowWidth) {
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = [pageWidth, pageHeight, windowWidth, windowHeight];
	return arrayPageSize;
};

wyx.h5game.isEventSupported = (function() {
	// 根据特有的事件创建对应的 HTML 元素
	var TAGNAMES = {
		'select' : 'input',
		'change' : 'input',
		'submit' : 'form',
		'reset' : 'form',
		'error' : 'img',
		'load' : 'img',
		'abort' : 'img'
	};
	function isEventSupported(eventName) {
		var el = document.createElement(TAGNAMES[eventName] || 'div');
		eventName = 'on' + eventName;
		//检测元素是否已经包含了对应的事件
		var isSupported = (eventName in el);
		// 如果没有对应事件，则尝试增加对应事件，然后判断是否为回调
		if (!isSupported) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] === 'function';
		}
		el = null;
		return isSupported;
	}
	return isEventSupported;
})();

wyx.h5game.extend = function(target) {
	var emptyArray = [], slice = emptyArray.slice;
	slice.call(arguments, 1).forEach(function(source) {
		for (var key in source) {
			target[key] = source[key];
		}
	});
	return target;
};