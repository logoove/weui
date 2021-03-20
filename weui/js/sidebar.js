(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.SidebarJS = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
    return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sidebarjs_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebarjs = 'sidebarjs';
var isTouch = ('ontouchstart' in window);
var isVisible = sidebarjs + "--is-visible";
var isMoving = sidebarjs + "--is-moving";
var LEFT_POSITION = 'left';
var RIGHT_POSITION = 'right';
var TRANSITION_DURATION = 400;
var POSITIONS = [LEFT_POSITION, RIGHT_POSITION];
var SidebarJS = (function () {
    function SidebarJS(_d, _a) {
        document.querySelector("[" + _d + "]").setAttribute(sidebarjs, _d);
        document.querySelector("[" + _d + "-toggle]").setAttribute(sidebarjs + "-toggle", _d);

        var _b = _a === void 0 ? {} : _a, component = _b.component, container = _b.container, background = _b.background, documentMinSwipeX = _b.documentMinSwipeX, documentSwipeRange = _b.documentSwipeRange, nativeSwipe = _b.nativeSwipe, nativeSwipeOpen = _b.nativeSwipeOpen, position = _b.position;
        this.component = component || document.querySelector("[" + _d + "]");
        this.container = container || SidebarJS.create(sidebarjs + "-container");
        this.background = background || SidebarJS.create(sidebarjs + "-background");
        this.documentMinSwipeX = documentMinSwipeX || 10;
        this.documentSwipeRange = documentSwipeRange || 40;
        this.nativeSwipe = nativeSwipe !== false;
        this.nativeSwipeOpen = nativeSwipeOpen !== false;
        var hasAllConfigDOMElements = component && container && background;
        if (!hasAllConfigDOMElements) {
            try {
                this.transcludeContent();
            }
            catch (e) {
                throw new Error('You must define an element with [sidebarjs] attribute');
            }
        }
        if (this.nativeSwipe) {
            this.addNativeGestures();
            if (this.nativeSwipeOpen) {
                this.addNativeOpenGestures();
            }
        }
        this.setPosition(position);
        this.addAttrsEventsListeners(this.component.getAttribute(sidebarjs));
        this.background.addEventListener('click', this.close.bind(this));
    }
    SidebarJS.prototype.toggle = function () {
        this.component.classList.contains(isVisible) ? this.close() : this.open();
    };
    SidebarJS.prototype.open = function () {
        this.component.classList.add(isVisible);
    };
    SidebarJS.prototype.close = function () {
        this.component.classList.remove(isVisible);
    };
    SidebarJS.prototype.isVisible = function () {
        return this.component.classList.contains(isVisible);
    };
    SidebarJS.prototype.setPosition = function (position) {
        var _this = this;
        this.component.classList.add(isMoving);
        this.position = POSITIONS.indexOf(position) >= 0 ? position : LEFT_POSITION;
        POSITIONS.forEach(function (POS) { return _this.component.classList.remove(sidebarjs + "--" + POS); });
        this.component.classList.add(sidebarjs + "--" + (this.hasRightPosition() ? RIGHT_POSITION : LEFT_POSITION));
        setTimeout(function () { return _this.component.classList.remove(isMoving); }, TRANSITION_DURATION);
    };
    SidebarJS.prototype.addAttrsEventsListeners = function (sidebarName) {
        var actions = ['toggle', 'open', 'close'];
        for (var i = 0; i < actions.length; i++) {
            var elements = document.querySelectorAll("[" + sidebarjs + "-" + actions[i] + "=\"" + sidebarName + "\"]");
            for (var j = 0; j < elements.length; j++) {
                if (!SidebarJS.elemHasListener(elements[j])) {
                    elements[j].addEventListener('click', this[actions[i]].bind(this));
                    SidebarJS.elemHasListener(elements[j], true);
                }
            }
        }
    };
    SidebarJS.prototype.hasLeftPosition = function () {
        return this.position === LEFT_POSITION;
    };
    SidebarJS.prototype.hasRightPosition = function () {
        return this.position === RIGHT_POSITION;
    };
    SidebarJS.prototype.transcludeContent = function () {
        this.container.innerHTML = this.component.innerHTML;
        this.component.innerHTML = '';
        this.component.appendChild(this.container);
        this.component.appendChild(this.background);
    };
    SidebarJS.prototype.addNativeGestures = function () {
        this.component.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.component.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.component.addEventListener('touchend', this.onTouchEnd.bind(this));
        this.component.addEventListener('mousedown', this.onTouchStart.bind(this));
        this.component.addEventListener('mousemove', this.onTouchMove.bind(this));
        this.component.addEventListener('mouseup', this.onTouchEnd.bind(this));
    };
    SidebarJS.prototype.addNativeOpenGestures = function () {
        document.addEventListener('touchstart', this.onSwipeOpenStart.bind(this));
        document.addEventListener('touchmove', this.onSwipeOpenMove.bind(this));
        document.addEventListener('touchend', this.onSwipeOpenEnd.bind(this));
    };
    SidebarJS.prototype.onTouchStart = function (e) {
        this.initialTouch = (isTouch ? e.touches[0].pageX : e.pageX);
    };
    SidebarJS.prototype.onTouchMove = function (e) {
        var documentSwiped = this.initialTouch - (isTouch ? e.touches[0].clientX : e.clientX);;
        var sidebarMovement = this.getSidebarPosition(documentSwiped);
        this.touchMoveSidebar = -documentSwiped;
        if (sidebarMovement <= this.container.clientWidth) {
            this.moveSidebar(this.touchMoveSidebar);
        }
    };
    SidebarJS.prototype.onTouchEnd = function () {
        this.component.classList.remove(isMoving);
        Math.abs(this.touchMoveSidebar) > (this.container.clientWidth / 3.5) ? this.close() : this.open();
        this.container.removeAttribute('style');
        this.background.removeAttribute('style');
        delete this.initialTouch;
        delete this.touchMoveSidebar;
    };
    SidebarJS.prototype.moveSidebar = function (movement) {
        this.component.classList.add(isMoving);
        SidebarJS.vendorify(this.container, 'transform', "translate(" + movement + "px, 0)");
        this.changeBackgroundOpacity(movement);
    };
    SidebarJS.prototype.changeBackgroundOpacity = function (movement) {
        var opacity = 0.3 - (Math.abs(movement) / (this.container.clientWidth * 3.5));
        this.background.style.opacity = (opacity).toString();
    };
    SidebarJS.prototype.onSwipeOpenStart = function (e) {
        if (this.targetElementIsBackground(e)) {
            return;
        }
        var clientWidth = document.body.clientWidth;
        var touchPositionX = (isTouch ? e.touches[0].clientX : e.clientX);
        var documentTouch = this.hasLeftPosition() ? touchPositionX : clientWidth - touchPositionX;
        if (documentTouch < this.documentSwipeRange) {
            this.onTouchStart(e);
        }
    };
    SidebarJS.prototype.onSwipeOpenMove = function (e) {
        if (!this.targetElementIsBackground(e) && this.initialTouch && !this.isVisible()) {
            var documentSwiped = (isTouch ? e.touches[0].clientX : e.clientX) - this.initialTouch;
            var sidebarMovement = this.getSidebarPosition(documentSwiped);
            if (sidebarMovement > 0) {
                SidebarJS.vendorify(this.component, 'transform', 'translate(0, 0)');
                SidebarJS.vendorify(this.component, 'transition', 'none');
                this.openMovement = sidebarMovement * (this.hasLeftPosition() ? -1 : 1);
                this.moveSidebar(this.openMovement);
            }
        }
    };
    SidebarJS.prototype.onSwipeOpenEnd = function () {
        if (this.openMovement) {
            delete this.openMovement;
            this.component.removeAttribute('style');
            this.onTouchEnd();
        }
    };
    SidebarJS.prototype.getSidebarPosition = function (swiped) {
        return (this.container.clientWidth - (this.hasLeftPosition() ? swiped : -swiped));
    };
    SidebarJS.prototype.targetElementIsBackground = function (e) {
        var touchedElement = e.target;
        return touchedElement.hasAttribute(sidebarjs + "-background");
    };
    SidebarJS.create = function (element) {
        var el = document.createElement('div');
        el.setAttribute(element, '');
        return el;
    };
    SidebarJS.vendorify = function (el, prop, val) {
        var Prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        var prefs = ['Moz', 'Webkit', 'O', 'ms'];
        el.style[prop] = val;
        for (var i = 0; i < prefs.length; i++) {
            el.style[prefs[i] + Prop] = val;
        }
        return el;
    };
    SidebarJS.elemHasListener = function (elem, value) {
        return elem && (value === true || value === false) ? elem.sidebarjsListener = value : !!elem.sidebarjsListener;
    };
    Object.defineProperty(SidebarJS, "version", {
        get: function () {
            return '2.2.0';
        },
        enumerable: true,
        configurable: true
    });
    return SidebarJS;
}());
exports.default = SidebarJS;

});

var sidebarjs = unwrapExports(sidebarjs_1);

return sidebarjs;

})));
