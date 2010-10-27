/*
 *
 * Wijmo Library 0.7.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Slider widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.mouse.js
 *  jquery.ui.widget.js
 *  jquery.ui.slider.js
 *  jquery.ui.wijutil.js
 *  
 */
(function ($) {

    $.widget("ui.wijslider", $.ui.slider, {
        options: {
            /// <summary>
            /// A value determines whether the fill may be dragged between the buttons. 
            /// Default: true.
            /// Type: Boolean.
            /// </summary>
            dragFill: true
        },

        _setOption: function (key, value) {
            ///	<summary>
            ///		Sets Slider options.
            ///	</summary>
            this.options[key] = value;
            return this;
        },

        _create: function () {
            ///	<summary>
            ///		Creates Slider DOM elements and binds interactive events.
            ///	</summary>
            $.ui.slider.prototype._create.apply(this, arguments);
            //
            this.element.data("originalStyle", this.element.attr("style"));
            this.element.data("originalContent", this.element.html());
            var ctrlWidth = this.element.width();
            var ctrlHeight = this.element.height();

            var container = $('<div></div>');
            if (this.options.orientation == "horizontal") {
                container.addClass("ui-wijslider-horizontal");
            }
            else {
                container.addClass("ui-wijslider-vertical");
            }
            container.width(ctrlWidth);
            container.height(ctrlHeight);
            var decreBtn = $('<a class="ui-wijslider-decbutton"><span></span></a>');
            var increBtn = $('<a class="ui-wijslider-incbutton"><span></span></a>');
            this.element.wrap(container);
            this.element.before(decreBtn);
            this.element.after(increBtn);
            this._attachClass();

            var decreBtnWidth = this._getDecreBtn().outerWidth();
            var decreBtnHeight = this._getDecreBtn().outerHeight();
            var increBtnWidth = this._getIncreBtn().outerWidth();
            var increBtnHeight = this._getIncreBtn().outerHeight();
            var thumb = this.element.find(".ui-slider-handle");
            var thumbWidth = thumb.outerWidth();
            var thumbHeight = thumb.outerHeight();
            this.element.removeAttr("style");

            if (this.options.orientation == "horizontal") {
                var dbtop = ctrlHeight / 2 - decreBtnHeight / 2;
                this._getDecreBtn().css("top", dbtop).css("left", 0);
                var ibtop = ctrlHeight / 2 - increBtnHeight / 2;
                this._getIncreBtn().css("top", ibtop).css("right", 0);
                //
                this.element.css("left", decreBtnWidth + thumbWidth / 2 - 1).css("top", ctrlHeight / 2 - this.element.outerHeight() / 2).width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
//                this.element.css("top", ctrlHeight / 2 - this.element.outerHeight() / 2);
//                this.element.width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
            }
            else {
                var dbleft = ctrlWidth / 2 - decreBtnWidth / 2;
                this._getDecreBtn().css("left", dbleft).css("top", 0);
                var ibleft = ctrlWidth / 2 - increBtnWidth / 2;
                this._getIncreBtn().css("left", ibleft).css("bottom", 0);
                //
                this.element.css("left", ctrlWidth / 2 - this.element.outerWidth() / 2).css("top", decreBtnHeight + thumbHeight / 2 + 1).height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
//                this.element.css("top", decreBtnHeight + thumbHeight / 2 + 1);
//                this.element.height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
            }

            this._bindEvents();
        },

        destroy: function () {
            ///	<summary>
            ///		Destroy Slider widget and reset the DOM element.
            ///	</summary>
            var self = this;
            var decreBtn = this._getDecreBtn();
            var increBtn = this._getIncreBtn();
            decreBtn.unbind('.' + self.widgetName);
            increBtn.unbind('.' + self.widgetName);
            $.ui.slider.prototype.destroy.apply(this, arguments);
            this.element.parent().removeAttr("class");
            this.element.parent().html("");
        },

        _getDecreBtn: function () {
            var decreBtn = this.element.parent().find(".ui-wijslider-decbutton");
            return decreBtn;
        },

        _getIncreBtn: function () {
            var increBtn = this.element.parent().find(".ui-wijslider-incbutton");
            return increBtn;
        },

        _attachClass: function () {
            this._getDecreBtn().addClass("ui-corner-all ui-state-default");
            this._getIncreBtn().addClass("ui-corner-all ui-state-default");

            if (this.options.orientation == "horizontal") {
                this.element.parent().addClass("ui-wijslider-horizontal");
                this._getDecreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-w");
                this._getIncreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-e");
            }
            else {
                this.element.parent().addClass("ui-wijslider-vertical");
                this._getDecreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-n");
                this._getIncreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-s");
            }
        },

        _bindEvents: function () {
            var self = this;
            var decreBtn = this._getDecreBtn();
            var increBtn = this._getIncreBtn();
            //
            decreBtn.bind('click.' + self.widgetName, self, self._decreBtnClick);
            increBtn.bind('click.' + self.widgetName, self, self._increBtnClick);
            //
            decreBtn.bind('mouseover.' + self.widgetName, self, self._decreBtnMouseOver);
            decreBtn.bind('mouseout.' + self.widgetName, self, self._decreBtnMouseOut);
            decreBtn.bind('mousedown.' + self.widgetName, self, self._decreBtnMouseDown);
            decreBtn.bind('mouseup.' + self.widgetName, self, self._decreBtnMouseUp);

            increBtn.bind('mouseover.' + self.widgetName, self, self._increBtnMouseOver);
            increBtn.bind('mouseout.' + self.widgetName, self, self._increBtnMouseOut);
            increBtn.bind('mousedown.' + self.widgetName, self, self._increBtnMouseDown);
            increBtn.bind('mouseup.' + self.widgetName, self, self._increBtnMouseUp);
        },

        _decreBtnMouseOver: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseover', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.addClass("ui-state-hover");
        },

        _increBtnMouseOver: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseover', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.addClass("ui-state-hover");
        },

        _decreBtnMouseOut: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseout', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.removeClass("ui-state-hover ui-state-active");
        },

        _increBtnMouseOut: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseout', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.removeClass("ui-state-hover ui-state-active");
        },

        _decreBtnMouseDown: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmousedown', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.addClass("ui-state-active");
        },

        _increBtnMouseDown: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmousedown', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.addClass("ui-state-active");
        },

        _decreBtnMouseUp: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseup', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.removeClass("ui-state-active");
        },

        _increBtnMouseUp: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseup', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.removeClass("ui-state-active");
        },


        _decreBtnClick: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            //
            if (self.options.orientation == "horizontal") {
                self._decre();
            }
            else {
                self._incre();
            }
            //
            self._trigger('buttonclick', e, data);
        },

        _increBtnClick: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };            
            //
            if (self.options.orientation == "horizontal") {
                self._incre();
            }
            else {
                self._decre();
            }
            //
            self._trigger('buttonclick', e, data);
        },

        _decre: function () {
            var curVal = this.value();
            //
            if (this.options.range == false && this.options.values == null) {
                curVal = this.value();
                if (curVal <= this.options.min) {
                    this.value(this.options.min);
                }
                else {
                    this.value(curVal - this.options.step);
                }
            }
            else {
                curVal = this.values(0);
                if (curVal <= this.options.min) {
                    this.values(0, this.options.min);
                }
                else {
                    this.values(0, curVal - this.options.step);
                }
            }
        },

        _incre: function () {
            var curVal = this.value();
            //
            if (this.options.range == false && this.options.values == null) {
                curVal = this.value();
                if (curVal >= this.options.max) {
                    this.value(this.options.max);
                }
                else {
                    this.value(curVal + this.options.step);
                }
            }
            else {
                curVal = this.values(1);
                if (curVal >= this.options.max) {
                    this.values(1, this.options.max);
                }
                else {
                    this.values(1, curVal + this.options.step);
                }
            }
        },

        _mouseInit: function () {
            if (this.options.dragFill) {
                var self = this;
                this._preventClickEvent = false;
                this.element.bind('click', function (event) {
                    if (self._dragFillStart > 0) {
                        self._dragFillStart = 0;
                    }
                    else {
                        $.ui.slider.prototype._mouseCapture.apply(self, arguments);
                    }
                });
            }
            $.ui.mouse.prototype._mouseInit.apply(this, arguments);
        },

        _mouseCapture: function (event) {
            if (this.options.dragFill) {
                if (event.target.className == "ui-slider-range ui-widget-header") {
                    this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight()
                    };
                    this.elementOffset = this.element.offset();
                    return true;
                }
                else {
                    return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
                }
            }
            else {
                return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
            }
        },

        _dragFillTarget: false,
        _dragFillStart: 0,
        _rangeValue: 0,
        _oldValue1: 0,
        _oldValue2: 0,
        _oldX: 0,
        _oldY: 0,

        _mouseStart: function (event) {
            if (this.options.dragFill) {
                if (event.target != null) {
                    if (event.target.className == "ui-slider-range ui-widget-header") {
                        this._dragFillTarget = true;
                        this._rangeValue = this.values(1) - this.values(0);
                        this._oldValue1 = this.values(0);
                        this._oldValue2 = this.values(1);
                        this._oldX = event.pageX;
                        this._oldY = event.pageY;
                        
                        return true;
                    }
                }
                this._dragFillTarget = false;
            }
            return true;
        },

        _mouseDrag: function (event) {
            if (this.options.dragFill) {
                var distance = event.pageX - this._oldX;
                //var position = { x: event.pageX, y: event.pageY };
                //var movValue = this._normValueFromMouse(position);
                var eleLength = this.element.outerWidth();
                if (this.options.orientation === "vertical") {
                    eleLength = this.element.outerHeight();
                    distance = -(event.pageY - this._oldY);
                }
                var movValue = (this.options.max - this.options.min) / eleLength * distance;
                //document.title = distanceX + "|" + movValue;

                if (this._dragFillTarget) {
                    if (this.options.orientation === "vertical") {
                        $(document.documentElement).css("cursor", "s-resize");
                    }
                    else {
                        $(document.documentElement).css("cursor", "w-resize");
                    }
                    if (this._dragFillStart > 0) {
                        var v = this._rangeValue;
                        /* if (normValue + v >= this.options.max) {
                        this.values(0, this.options.max - v);
                        this.values(1, this.options.max);
                        }
                        else {
                        }*/
                        this.values(0, this._oldValue1 + movValue);
                        this.values(1, this._oldValue1 + movValue + v);
                        var v0 = this.values(0);
                        var v1 = this.values(1);
                        if (v0 + v > this.options.max) {
                            this.values(0, this.options.max - v);
                        }
                        if (v1 - v < this.options.min) {
                            this.values(1, this.options.min + v);
                        }
                    }
                    this._dragFillStart++;
                    return false;
                }
                else {
                    return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
                }
            }
            else {
                return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
            }
        },

        _mouseStop: function (event) {
            var returnVal = $.ui.slider.prototype._mouseStop.apply(this, arguments);
            if (this.options.dragFill) {
                $(document.documentElement).css("cursor", "default");
                window.setTimeout(function () { this._dragFillTarget = false; this._dragFillStart = 0; }, 500);
            }
            return returnVal;
        }
    });

})(jQuery);


 