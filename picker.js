var eventSplitter = /\s+/


// A module that can be mixed in to *any object* in order to provide it
// with custom events. You may bind with `on` or remove with `off` callback
// functions to an event; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = new Events();
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//
function Events() {
}


// Bind one or more space separated events, `events`, to a `callback`
// function. Passing `"all"` will bind the callback to all events fired.
Events.prototype.on = function(events, callback, context) {
  var cache, event, list
  if (!callback) return this

  cache = this.__events || (this.__events = {})
  events = events.split(eventSplitter)

  while (event = events.shift()) {
    list = cache[event] || (cache[event] = [])
    list.push(callback, context)
  }

  return this
}

Events.prototype.once = function(events, callback, context) {
  var that = this
  var cb = function() {
    that.off(events, cb)
    callback.apply(context || that, arguments)
  }
  return this.on(events, cb, context)
}

// Remove one or many callbacks. If `context` is null, removes all callbacks
// with that function. If `callback` is null, removes all callbacks for the
// event. If `events` is null, removes all bound callbacks for all events.
Events.prototype.off = function(events, callback, context) {
  var cache, event, list, i

  // No events, or removing *all* events.
  if (!(cache = this.__events)) return this
  if (!(events || callback || context)) {
    delete this.__events
    return this
  }

  events = events ? events.split(eventSplitter) : keys(cache)

  // Loop through the callback list, splicing where appropriate.
  while (event = events.shift()) {
    list = cache[event]
    if (!list) continue

    if (!(callback || context)) {
      delete cache[event]
      continue
    }

    for (i = list.length - 2; i >= 0; i -= 2) {
      if (!(callback && list[i] !== callback ||
          context && list[i + 1] !== context)) {
        list.splice(i, 2)
      }
    }
  }

  return this
}


// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
Events.prototype.trigger = function(events) {
  var cache, event, all, list, i, len, rest = [], args, returned = true;
  if (!(cache = this.__events)) return this

  events = events.split(eventSplitter)

  // Fill up `rest` with the callback arguments.  Since we're only copying
  // the tail of `arguments`, a loop is much faster than Array#slice.
  for (i = 1, len = arguments.length; i < len; i++) {
    rest[i - 1] = arguments[i]
  }

  // For each event, walk through the list of callbacks twice, first to
  // trigger the event, then to trigger any `"all"` callbacks.
  while (event = events.shift()) {
    // Copy callback lists to prevent modification.
    if (all = cache.all) all = all.slice()
    if (list = cache[event]) list = list.slice()

    // Execute event callbacks except one named "all"
    if (event !== 'all') {
      returned = triggerEvents(list, rest, this) && returned
    }

    // Execute "all" callbacks.
    returned = triggerEvents(all, [event].concat(rest), this) && returned
  }

  return returned
}

Events.prototype.emit = Events.prototype.trigger


// Helpers
// -------

var keys = Object.keys

if (!keys) {
  keys = function(o) {
    var result = []

    for (var name in o) {
      if (o.hasOwnProperty(name)) {
        result.push(name)
      }
    }
    return result
  }
}

// Mix `Events` to object instance or Class function.
Events.mixTo = function(receiver) {
  var proto = Events.prototype

  if (isFunction(receiver)) {
    for (var key in proto) {
      if (proto.hasOwnProperty(key)) {
        receiver.prototype[key] = proto[key]
      }
    }
    Object.keys(proto).forEach(function(key) {
      receiver.prototype[key] = proto[key]
    })
  }
  else {
    var event = new Events
    for (var key in proto) {
      if (proto.hasOwnProperty(key)) {
        copyProto(key)
      }
    }
  }

  function copyProto(key) {
    receiver[key] = function() {
      proto[key].apply(event, Array.prototype.slice.call(arguments))
      return this
    }
  }
}

// Execute callbacks
function triggerEvents(list, args, context) {
  var pass = true

  if (list) {
    var i = 0, l = list.length, a1 = args[0], a2 = args[1], a3 = args[2]
    // call is faster than apply, optimize less than 3 argu
    // http://blog.csdn.net/zhengyinhui100/article/details/7837127
    switch (args.length) {
      case 0: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context) !== false && pass} break;
      case 1: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1) !== false && pass} break;
      case 2: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass} break;
      case 3: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass} break;
      default: for (; i < l; i += 2) {pass = list[i].apply(list[i + 1] || context, args) !== false && pass} break;
    }
  }
  // trigger will return false if one of the callbacks return false
  return pass;
}

function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}

var  Eventor = Events;
var Event = {
    tap: function(element, callback){
        if( !element ) return console.error("tap对象不能为空");
        element.__tap = {};
        element.__tap.event = {
            start: function(e) {
                e.stopPropagation();
                element.__tap.clickabled = true;
                element.__tap.starttime = e.timeStamp;
                element.__tap.startPageX = e.changedTouches[0].pageX;
                element.__tap.startPageY = e.changedTouches[0].pageY;
            },
            move: function(e) {
                if (Math.abs(e.changedTouches[0].pageX - element.__tap.startPageX) >= 5 || 
                    Math.abs(e.changedTouches[0].pageY - element.__tap.startPageY) >= 5) {
                    element.__tap.clickabled = false;
                }
            },
            end: function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.timeStamp - element.__tap.starttime > 30 && 
                    e.timeStamp - element.__tap.starttime < 300 && 
                    element.__tap.clickabled ) {
                    // setTimeout(function() {
                        if (!!callback) {
                            callback(e);
                        }
                    // }, 0);
                }
            },
            click: function(e) {
                e.stopPropagation();
                callback && callback(e);
            }
        }
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
            element.addEventListener('touchstart', element.__tap.event.start, false);
            element.addEventListener('touchmove', element.__tap.event.move, false);
            element.addEventListener('touchend', element.__tap.event.end, false);
        } else {
            element.addEventListener('click', element.__tap.event.click, false);
        }
        return element;
    },
    untap: function(element){
        if( !element ) return console.error("untap对象不能为空");
        element.__tap = element.__tap || {};
        if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && !!element.__tap.event ) {
            element.__tap.event.start && element.removeEventListener('touchstart', element.__tap.event.start, false);
            element.__tap.event.move && element.removeEventListener('touchmove', element.__tap.event.move, false);
            element.__tap.event.end && element.removeEventListener('touchend', element.__tap.event.end, false);
        } else if(!!element.__tap.event) {
            element.__tap.event.click && element.removeEventListener('click', element.__tap.event.click, false);
        }
        return element;
    }

};
window.__tap__ = Event.tap;
window.__untap__ = Event.untap;
var F_tap= Event;

var PickerDialog = function(option){
	this.params = {};
	if( Object.prototype.toString.call(option) === '[object Object]' ){
		this.params = {
            "input": option.input || "",
            "container": document.querySelector(option.input) || "",
            "innerHTML": option.innerHTML || "",
            "onOpen": option.onOpen || function(){},
            "onClose": option.onClose || function(){},
            "_open": option._open || function(){},
            "_close": option._close || function(){}
        };
        this.input = document.querySelector(option.input);
	}
	
	// input不存在提示处理
	if (!this.params || !this.params.input) {
        console.error('picker-dialog: input对应的dom对象不存在');
        return false;
    }
    if( !this.params.container || !this.params.container ){
        console.error('picker-dialog: container对应的dom对象不存在');
        return false;
    }
	// 透明黑色遮罩
	if( !!document.querySelectorAll('.picker-mask').length<=0 ){
		var divMask = document.createElement('a');
		divMask.className = 'picker-mask';
		divMask.href = 'javascript:void(0);';
		document.body.appendChild(divMask);
	}
	var div = document.createElement('div');
	div.className = 'picker-dialog';
	document.body.appendChild(div);
	this.mask = document.querySelector(".picker-mask");
	this.container = document.querySelectorAll(".picker-dialog");
	this.container = this.container[ this.container.length-1 ];
	this.container.innerHTML = this.params.innerHTML;
	this._hackInputFocus();
    this._bindEvents();
	option = null;
	return this;
}
Eventor.mixTo(PickerDialog);
PickerDialog.prototype._hackInputFocus = function() {
    // 兼容安卓微信，在input上面增加一层遮罩层，安卓微信没法禁用不可编辑
    var _inputMask = document.createElement('div');
    var _input = this.params.container;
    var _parent = _input.parentNode;
    var _inputMaskPage = document.getElementById(_input.getAttribute('id') + 'Mask');
    if( _inputMaskPage ){
        _inputMaskPage.style.width = (_input.offsetWidth + _input.clientLeft * 2) + 'px';
        _inputMaskPage.style.height = (_input.offsetHeight + _input.clientTop * 2) + 'px';
        _inputMaskPage.style.position = 'absolute';
        _inputMaskPage.style.left = _input.offsetLeft + "px";
        _inputMaskPage.style.top = _input.offsetTop + "px";
    } else {
        _inputMask.style.width = (_input.offsetWidth + _input.clientLeft * 2) + 'px';
        _inputMask.style.height = (_input.offsetHeight + _input.clientTop * 2) + 'px';
        _inputMask.style.position = 'absolute';
        _inputMask.style.left = _input.offsetLeft + "px";
        _inputMask.style.top = _input.offsetTop + "px";
        _inputMask.setAttribute('id', _input.getAttribute('id') + 'Mask');
        _parent.insertBefore(_inputMask, _input);
        this.input = document.getElementById(_input.getAttribute('id') + 'Mask');
    }
    this._bindEventInput();
    return this;
};
PickerDialog.prototype.updateInputPosition = function(){
    this._hackInputFocus();
}
PickerDialog.prototype._bindEventInput = function() {
    // 设置input被触发的事件
    var _this = this;
    F_tap.untap( this.input );
    var inputEvent = function(){
        _this.show();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.container.offsetHeight; // picker高度
            var inputTop = _this.input.getBoundingClientRect().top + scrollTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
            } else {
            }
        }());
    };
    F_tap.tap( this.input, inputEvent);
    F_tap.tap( this.params.container, inputEvent);
    return this;

};
// input输入框如果不在可视区域内，将其滑动到可视区域
PickerDialog.prototype.scrollAnimate = function(position, timestamp) {
    var _this = this;
    var needs = (document.body.scrollTop - position) / timestamp * 25;
    var old = -1;
    _this.interval = setInterval(function() {
        if (Math.abs(document.body.scrollTop - position) < Math.abs(needs)) {
            clearInterval(_this.interval);
        }
        old = document.body.scrollTop;
        document.body.scrollTop = old - needs;
        if( old == document.body.scrollTop ){
        	clearInterval(_this.interval);
        }
    }, 8);
    return this;
};
PickerDialog.prototype._bindEvents = function(){
	var _this = this;
	function triggerClick(e){
		_this.hide();
		_this.emit('close');
	}

	F_tap.tap( this.mask, triggerClick );
	this.container.addEventListener("touchmove", function(e){
		e.stopPropagation();
		e.preventDefault();
		return false;
	}, false);
	// this.mask.tap(triggerClick);
	//this.setClick(this.mask, triggerClick);
	return this;
}
PickerDialog.prototype.show = function(){
	var _this = this;
	_this.mask.classList.add("show");
	_this.container.classList.add("modal-in");
    _this.params._open && _this.params._open(this);
	_this.params.onOpen && _this.params.onOpen(this);
	return this;
}
PickerDialog.prototype.hide = function(){
	var _this = this;
	_this.mask.classList.remove("show");
	_this.container.classList.remove("modal-in");
    _this.params._close && _this.params._close(this);
	_this.params.onClose && _this.params.onClose(this);
	return this;
}
PickerDialog.prototype.html = function(html){
	var _this = this;
	this.container.innerHTML = html;
	return this;
}

// 每个条目的高度
var ITEM_HEIGHT = 34;

// 留白区域高度折算成条目的数量
var BLANK_ITEM_NUMBER = 3;

// 快速拖动时的速度调节因数
var SPEED_FACTOR = 3;

// touchstart -> touchend 的间隔时间小于此值时执行滚动动画
var MAX_ANIMATION_TOUCH_MOVE_TIME = 200;

// 最长滚动动画时长
var MAX_ANIMATION_TIME = 1500;

// 回弹动画时长
var RESET_POSITION_ANIMATION_TIME = 0.2;

// 慢速拖动动画时长
var SLOW_DRAG_ANIMATION_TIME = 0.1;

// 回调函数延迟毫秒数
var CALLBACK_DELAY = 50;

var ITEM_CLASS = 'basescroller-item';
var SELECTED_CLASS = 'basescroller-selected';

var TEMPLATE =
'<div class="basescroller-component"> \
  <div class="basescroller-mask"></div> \
  <div class="basescroller-current-indicator"></div> \
  <div class="basescroller-scroller"></div> \
</div>';

var BaseScroller = function(opts) {
  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = TEMPLATE;
  this.scrollerComponent = tempContainer.firstElementChild;
  this.scroller = this.scrollerComponent.lastElementChild;

  opts = opts || {};

  var itemsNumber = opts.itemsNumber;
  if (itemsNumber && itemsNumber % 2 == 0) {
    throw new Error('Option itemsNumber must be odd number');
  }

  this.itemHeight = parseInt(opts.itemHeight) || ITEM_HEIGHT;
  this.blankItemNumber = itemsNumber ? (itemsNumber - 1) / 2 : BLANK_ITEM_NUMBER;

  // 留白区域高度
  this.blankEdgeHeight = this.itemHeight * this.blankItemNumber;

  // scroller 能达到的最大 translate Y 值，通过 -webkit-transform 设置
  this.maxTransitionY = this.itemHeight * (this.blankItemNumber + 1);

  var container = opts.container;
  if (container && container.nodeType == Node.ELEMENT_NODE) {
    container.appendChild(this.scrollerComponent);
  }

  this.parentHeight = this.blankEdgeHeight * 2 + this.itemHeight;

  if (opts.className) {
    this.scrollerComponent.className = opts.className + ' basescroller-component';
  }

  if (opts.data) {
    this.render(opts.data);
  }

  this.callback = opts.selectedCallback;
  this._resetHeight();

  this.startYInMove = 0;
  this.touch = null;
  this._init();
}

BaseScroller.prototype = {
  currentValue: null,
  prevValue: null,

  _init: function() {
    var self = this;
    this._setTransitionDuratoin(RESET_POSITION_ANIMATION_TIME);
    this._bindEvents();
  },

  _bindEvents: function() {
    var self = this;
    var itemHeight = this.itemHeight;
    var blankEdgeHeight = this.blankEdgeHeight;
    var scroller = this.scroller;
    var parent = this.scrollerComponent;
    var parentHeight = this.parentHeight;
    var touchStartTime;

    parent.addEventListener('touchstart', function(e) {
      var changedTouch = e.changedTouches[0];
      self._setTransitionDuratoin(0);
      touchStartTime = +new Date();
      self.startY = self.startYInMove = changedTouch.clientY;
      clearTimeout(self.callbackTimer);
    }, false);

    parent.addEventListener('touchmove', function(e) {
      e.preventDefault();
      self.touch = e.changedTouches[0];
      self._setPosition();
    }, false);

    parent.addEventListener('touchend', function(e) {
      var changedTouch = e.changedTouches[0];
      var now = +new Date();
      var currentTransitionY = self._getCurrentTransitionY();
      var targetTransitionY;
      var animationTime;
      var isFlick = false;
      var offsetY = changedTouch.clientY - self.startY;
      if (offsetY == 0) {
        return;
      }

      // 快速滑动
      if (now - touchStartTime < MAX_ANIMATION_TOUCH_MOVE_TIME) {
        isFlick = true;

        // 通过速度和剩余长度可以得出动画要进行多久，固定一个时间，最长滚动多长时间
        var speed = Math.abs(offsetY) / (now - touchStartTime) / SPEED_FACTOR;

        // 计算要拖到底部或顶部需要的时间和目标位移值
        if (offsetY < 0) {
          // 向上拖动
          animationTime = Math.abs(-(self.scrollerHeight - parentHeight) - currentTransitionY) / speed;
          targetTransitionY = -(self.scrollerHeight - parentHeight) - blankEdgeHeight;
        } else {
          // 向下拖动
          animationTime = Math.abs(currentTransitionY) / speed;
          targetTransitionY = blankEdgeHeight;
        }

        // 计算实际动画执行时间
        if (animationTime > MAX_ANIMATION_TIME) {
          animationTime = MAX_ANIMATION_TIME;
          var scrollDistance = speed * animationTime;
          targetTransitionY = offsetY < 0 ?
            currentTransitionY - scrollDistance : currentTransitionY + scrollDistance;
        }


        targetTransitionY = Math.round(targetTransitionY / itemHeight) * itemHeight;
        animationTime = animationTime / 1000;
      } else {
        // 慢速拖动
        animationTime = SLOW_DRAG_ANIMATION_TIME;
        targetTransitionY = Math.round(currentTransitionY / itemHeight) * itemHeight;
      }

      // 处理滚动内容超出组件显示范围的情况
      if (targetTransitionY > blankEdgeHeight) {
        targetTransitionY = blankEdgeHeight;
      } else if (targetTransitionY < self.minTransitionY + itemHeight) {
        targetTransitionY = self.minTransitionY + itemHeight
      }

      // 如果实际滚动距离很短，使用慢速拖动的动画时间
      if (Math.abs(targetTransitionY - currentTransitionY) < blankEdgeHeight) {
        animationTime = SLOW_DRAG_ANIMATION_TIME;
      }

      self._setTransitionDuratoin(animationTime);
      self._setTransformY(targetTransitionY);

      // 获取选中元素的索引
      var index = Math.abs(targetTransitionY / itemHeight - self.blankItemNumber)
      var selectedElem = scroller.children[parseInt(index)];
      if (selectedElem) {
        self._selectElem(selectedElem);

        // 选中后回调选中值
        self.prevValue = self.currentValue;
        self.currentValue = selectedElem.dataset.value;
        if (typeof self.callback == 'function') {
          self.callbackTimer = setTimeout(function() {
            self.callback(self.currentValue, self.prevValue);
          }, CALLBACK_DELAY);
        }
      }

      self.touch = null;
    }, false);
  },

  _resetHeight: function() {
    this.scrollerHeight = this.scroller.childElementCount * this.itemHeight;
    this.minTransitionY = -(this.scrollerHeight + this.maxTransitionY - this.parentHeight);
  },

  _setPosition: function(changedTouch) {
    changedTouch = changedTouch || this.touch;
    if (!changedTouch) {
      return;
    }

    var clientY = changedTouch.clientY;
    var offsetY = clientY - this.startYInMove;

    var currentTransitionY = this._getCurrentTransitionY();
    var newClientY = currentTransitionY + offsetY;
    if (newClientY > this.maxTransitionY) {
      newClientY = this.maxTransitionY;
    } else if (newClientY < this.minTransitionY) {
      newClientY = this.minTransitionY;
    }

    this._setTransformY(newClientY);
    this.startYInMove = clientY;
  },

  _setTransitionDuratoin: function(s) {
    var value = 'all ' + s + 's ease-out';
    this.scroller.style.webkitTransition = value;
    this.scroller.style.transition = value;
  },

  _setTransformY: function(transitionY) {
    this.scroller.style.webkitTransform = 'translate3d(0, ' + transitionY + 'px, 0)';
  },

  _getCurrentTransitionY: function() {
    var transform = this.scroller.style.webkitTransform;
    return transform ? parseFloat(transform.split(',')[1].trim()) : 0;
  },

  _getRealTransitionY: function() {
    var computedStyle = window.getComputedStyle(this.scroller);
    var match = computedStyle['-webkit-transform'].match(/,\s?(-?\d+)\)/);
    if (match && match.length == 2) {
      return parseFloat(match[1]);
    } else {
      return 0;
    }
  },

  _selectElem: function(elem) {
    var lastSelectedElem = this.scroller.querySelector('.' + SELECTED_CLASS);
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(SELECTED_CLASS);
    }
    elem.classList.add(SELECTED_CLASS);
  },

  selectByIndex: function(index) {
    var scroller = this.scroller;
    if (index < 0 || index > scroller.childElementCount - 1) {
      return false;
    }

    var transitionY = this.blankEdgeHeight - this.itemHeight * index;
    this._setTransitionDuratoin(RESET_POSITION_ANIMATION_TIME);
    this._setTransformY(transitionY);

    var selectedElem = scroller.children[index];
    this._selectElem(selectedElem);
    this.prevValue = this.currentValue;
    this.currentValue = selectedElem.dataset.value;
  },

  select: function(value) {
    if (value === undefined || value === null) {
      return this;
    }

    var children = this.scroller.children;
    for (var i = 0, len = children.length; i < len; i++) {
      if (children[i].dataset.value == value) {
        this.selectByIndex(i);
        return;
      }
    }
    return this;
  },

  selectThenCallback: function(value) {
    this.select(value);
    if (typeof this.callback == 'function') {
      this.callback(this.currentValue, this.prevValue);
    }
    return this;
  },

  getValue: function() {
    return this.currentValue;
  },

  setSelectedCallback: function(callback) {
    this.callback = callback;
    return this;
  },

  render: function(data) {
    if (!data || data.length == 0 || data.constructor !== Array) {
      return false;
    }

    var html = '';
    if (data[0].constructor === Object) {
      data.forEach(function(elem) {
        html += '<div class="' + ITEM_CLASS + '" data-value="' + elem.value + '">' +
          elem.name+ '</div>';
      });
    } else {
      data.forEach(function(elem) {
        html += '<div class="' + ITEM_CLASS + '" data-value="' + elem + '">' + elem + '</div>';
      });
    }

    this.scroller.innerHTML = html;
    this._resetHeight();
    this.selectByIndex(0);
    return this;
  },

  destroy : function() {
    this.scrollerComponent.parentNode.removeChild(this.scrollerComponent);
  },

  appendTo: function(container) {
    if (container && container.nodeType == Node.ELEMENT_NODE) {
      container.appendChild(this.scrollerComponent);
      this._resetHeight();
    }
  }
};

var PickerCore = BaseScroller;
function getNode(tag, classname, value) {
    var node = document.createElement(tag);
    node.className = classname || "";
    node.innerHTML = value || "";
    return node;
}
var Picker = function(option) {
    var _this = this;
    if( Object.prototype.toString.call(option) === '[object Object]' ){
        this.params = {
            "itemsNumber": option.itemsNumber || 7,
            "itemHeight": option.itemHeight || 30,
            "cols": option.cols || [],
            "input": option.input || "",
            "inputContainer": document.querySelector(option.input) || "",
            "toolbarTemplate": option.toolbarTemplate || ('<div class="picker-toolbar">' +
                '<a href="javascript:void(0);" class="picker-toolbar-left">取消</a><a href="javascript:void(0);" class="picker-toolbar-right">完成</a>' +
                '</div>'),
            "formatValue": option.formatValue || function(picker, values) {
                return values.join(" ");
            },
            "after": option.after,
            "_open": function(){ // 内部打开事件
                _this.inputSelf.value = _this.params.formatValue(_this, _this._getValues());
            },
            "_close": function(){

            }
        };
        this.input = document.querySelector(option.input);
        this.inputSelf = this.input;
        if (!!option.container) {
            this.params.container = option.container || "";
            this.container = document.querySelector(option.container);
        }
        if (!!option.onOpen) this.params.onOpen = option.onOpen;
        if (!!option.onClose) this.params.onClose = option.onClose;
        if (!!option.onChange) this.params.onChange = option.onChange;

        option = null;
    };
    if (this.isError()) return false;
    this.init();
    return this;
};
Eventor.mixTo(Picker);
Picker.prototype.isError = function() {
    if (!this.input) {
        console.error('input对应的dom对象不存在');
        return true;
    }
    if( !!this.params.container && !this.container ){
        console.error('container对应的dom对象不存在');
        return true;
    }
    return false;
};
Picker.prototype.init = function() {
    this.input.setAttribute('readonly', 'readonly');
    this.input.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    // this._hackInputFocus();
    if (this.container) {
        this.dialog = {};
        this.dialog.container = this.container;
        this.dialog.container.innerHTML = '<div class="picker-cols"></div>';
        this._wrap = this.dialog.container.querySelector('.picker-cols');
        this.initPickerCore();
    } else {
        this.initDialog();
        this.initPicker();
        this.initPickerCore();
        this._bindEventToolbar();
    }
    this.params.after && this.params.after(this);
    this._getValues();
    return this;
};
Picker.prototype.destroy = function() {
    if ((this.container.classList + "").indexOf("modal-in") > 0) this.dialog.hide();
    if (!!this.params.container) this.container.innerHTML = "";
    else this.container.remove();
    // this.input.untap();
    F_tap.untap( this.input );
    clearTimeout(this.timeout);
    for (var i in this) {
        delete this[i];
    }
};
Picker.prototype.initPicker = function() {
    this._wrap = this.container.querySelector('.picker-cols');
    return this;
};
Picker.prototype.initDialog = function() {
    this.dialog = new PickerDialog(this.params);
    //this._wrap = this.dialog.container;
    if (!this.params.container) {
        this.container = this.dialog.container;
        this.container.innerHTML = this.params.toolbarTemplate + '<div class="picker-cols"></div>';
    }
    return this;
};
Picker.prototype.close = function() {
    return this.dialog.hide(), this.params.onClose && this.params.onClose(this), this;
};
Picker.prototype.open = function() {
    // this.inputSelf.value = this.params.formatValue(this, this._getValues());
    return this.dialog.show(), this.params.onOpen && this.params.onOpen(this), this;
};
Picker.prototype.initPickerCore = function() {
    var _this = this;
    this.cols = [];
    var _cols = this.params.cols;
    for (var i = 0; i < _cols.length; i++) {
        if (_cols[i].divider === true) {
            this._wrap.appendChild(getNode("div", "basescroller-divider", _cols[i].content));

        } else {
            if (!_cols[i].values) continue;
            //if( !!_cols[i].values ){
            if (!!_cols[i].displayValues) {
                var _data = [];
                for (var j = 0; j < _cols[i].values.length; j++) {
                    _data.push({
                        "name": _cols[i].displayValues[j] || _cols[i].values[j],
                        "value": _cols[i].values[j]
                    });
                }
            } else {
                var _data = _cols[i].values;
            }
            var option = {
                container: this._wrap,
                data: _data,
                itemHeight: this.params.itemHeight,
                itemsNumber: this.params.itemsNumber,
                selectedCallback: (function() {
                    var _i = i;
                    return function(_new, _old) {
                        if (!!_cols[_i].onChange) _cols[_i].onChange(_this, _new, _old);
                        else if (!!_this.params.onChange) _this.params.onChange(_this, _new, _old);
                        _this.inputSelf.value = _this.params.formatValue(this, _this._getValues());
                    }
                }())
            };
            var _temp = new PickerCore(option);
            _temp.container = _temp.scrollerComponent;
            _temp.items = _temp.container.querySelectorAll(".basescroller-item");
            delete _temp.scrollerComponent;
            _temp.values = _cols[i].values;
            _temp.replaceValues = function(values, displayValues) {
                _this._InitCssPickerCore();
                if (!displayValues) this.render(values);
                else {
                    var arr = [];
                    for (var i = 0; i < values.length; i++) {
                        arr.push({
                            "name": displayValues[i] || values[i],
                            "value": values[i]
                        });
                    }
                    this.render(arr);
                }
            };
            this.cols.push(_temp);

            //}
        }
    }
    // picker-core 样式


    // picker-core 样式
    this._wrap.appendChild(getNode("div", "basescroller-current-indicator-all"));
    this._component = this.container.querySelectorAll('.basescroller-component');
    // this.picker.scroller = this.dialog.container.querySelectorAll('.basescroller-scroller');
    this._InitCssPickerCore();
    return this;
};
Picker.prototype._InitCssPickerCore = function() {
    var _this = this;
    // 设置选择项的width、text-align
    _this._setCssWidth();
    this.timeout = setTimeout(function() {
        if( !!_this.params ){
            _this._setCssWidth();
            _this._wrap.style.height = _this.params.itemsNumber * _this.params.itemHeight + "px";

            var _item = _this._wrap.querySelectorAll(".basescroller-item");
            var _indicator = _this._wrap.querySelectorAll(".basescroller-current-indicator");
            var _indicatorAll = _this._wrap.querySelector(".basescroller-current-indicator-all");
            for (var i = 0; i < _this._component.length; i++) {
                _this._component[i].style.height = _this.params.itemsNumber * _this.params.itemHeight + "px";
            }
            for (var i = 0; i < _indicator.length; i++) {
                _indicator[i].style.height = _this.params.itemHeight - 2 + "px";
                _indicator[i].style.top = _this.params.itemHeight * (_this.params.itemsNumber - 1) / 2 + "px";
            }
            _indicatorAll.style.top = _this.params.itemHeight * (_this.params.itemsNumber - 1) / 2 + "px";
            _indicatorAll.style.height = _this.params.itemHeight - 2 + "px";
            for (var i = 0; i < _item.length; i++) {
                _item[i].style.height = _this.params.itemHeight + "px";
                _item[i].style.lineHeight = _this.params.itemHeight + "px";
            }
        }
    }, 100);
    return this;
};
Picker.prototype._setCssWidth = function() {
    for (var i = 0; i < this._component.length; i++) {
        var componentWidth = this._component[i].querySelector(".basescroller-scroller");
        componentWidth = !!componentWidth ? componentWidth.offsetWidth : this._component[i].offsetWidth;
        this._component[i].style.width = !!this.params.cols[i].width ? this.params.cols[i].width + 'px' : componentWidth + 'px';
        this._component[i].style.textAlign = this.params.cols[i].textAlign || 'center';
    }
}
Picker.prototype.setValue = function(values) {
    // 设置新值给当前的选项列
    if (Object.prototype.toString.call(values) == "[object Array]") {
        for (var i = 0; i < this.cols.length; i++) {
            if (!!values[i]) {
                this.cols[i].select(values[i]);
            }
        }
    } else console.error("setValue的参数必须是数组");
}
Picker.prototype._bindEventToolbar = function() {
    // 设置左右toolbar按钮的事件
    var _this = this;
    var toolbarRight = _this.container.querySelector('.picker-toolbar-right');
    if (toolbarRight) {
        _this.on('toolbarRight', function(e) {
            _this.close();
        });
        toolbarRight.click = function(e) {
            _this.emit('toolbarRight', e);
        };
        F_tap.tap( toolbarRight, toolbarRight.click );
        // toolbarRight.tap(toolbarRight.click);
    };
    
        var toolbarLeft = _this.container.querySelector('.picker-toolbar-left');
    if (toolbarLeft) {
        _this.on('toolbarLeft', function(e) {
            _this.close();
        });
        toolbarLeft.click = function(e) {
            _this.emit('toolbarLeft', e);
        };
        F_tap.tap( toolbarLeft, toolbarLeft.click );
        // toolbarRight.tap(toolbarRight.click);
    };
    
};
Picker.prototype._bindEventInput11111 = function() {
    // 设置input被触发的事件
    var _this = this;
    F_tap.untap( this.input );
    F_tap.tap( this.input, function(){
        _this.open();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
            }
        }());
    } );
    // this.input.untap();
    // this.input.tap(function() {
    //     _this.open();
    //     // 如果input被picker遮挡到，则滚动input至可视区域
    //     (function() {
    //         var clientHeight = document.documentElement.clientHeight; //  浏览器高度
    //         var scrollTop = document.body.scrollTop; // 滚动高度
    //         var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
    //         var inputTop = _this.input.offsetTop; // input相对body高度
    //         var inputHeight = _this.input.offsetHeight; // input高度
    //         if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
    //             _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
    //         }
    //     }());
    // });
    F_tap.tap( this.params.inputContainer, function(){
        _this.open();
        // 如果input被picker遮挡到，则滚动input至可视区域
        (function() {
            var clientHeight = document.documentElement.clientHeight; //  浏览器高度
            var scrollTop = document.body.scrollTop; // 滚动高度
            var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
            var inputTop = _this.input.offsetTop; // input相对body高度
            var inputHeight = _this.input.offsetHeight; // input高度
            if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
                _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
            }
        }());
    } );
    // this.params.inputContainer.tap(function() {
    //     _this.open();
    //     // 如果input被picker遮挡到，则滚动input至可视区域
    //     (function() {
    //         var clientHeight = document.documentElement.clientHeight; //  浏览器高度
    //         var scrollTop = document.body.scrollTop; // 滚动高度
    //         var pickerHeight = _this.dialog.container.offsetHeight; // picker高度
    //         var inputTop = _this.input.offsetTop; // input相对body高度
    //         var inputHeight = _this.input.offsetHeight; // input高度
    //         if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
    //             _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
    //         }
    //     }());
    // });
    return this;
};
Picker.prototype._getValues = function() {
    var _temp = [];
    for (var i = 0; i < this.cols.length; i++) {
        if (this.cols[i].getValue) _temp.push(this.cols[i].getValue());
    };
    this.values = _temp;
    return _temp;
}
