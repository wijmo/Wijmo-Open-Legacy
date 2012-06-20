/*globals window,document,jQuery*/
/*
*
* Wijmo Library 2.1.2
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
	"use strict";
	$.widget("wijmo.wijslider", $.ui.slider, {
		options: {
			/// <summary>
			/// Raised when the mouse is over the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseOver event:
			/// $("#element").wijslider({ buttonMouseOver: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseOver", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseOver: null,
			/// <summary>
			/// Raised when the mouse leaves the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseOut event:
			/// $("#element").wijslider({ buttonMouseOut: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseOut", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseOut: null,
			/// <summary>
			/// Raised when the mouse is down on the decrement button or decrement button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseDown event:
			/// $("#element").wijslider({ buttonMouseDown: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseDown", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseDown: null,
			/// <summary>
			/// Raised when the mouse is up on the decrement button or increment button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonMouseUp event:
			/// $("#element").wijslider({ buttonMouseUp: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonMouseUp", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button. 
			/// </param>
			buttonMouseUp: null,
			/// <summary>
			/// Raised when the decrement or increment button is clicked.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the buttonClick event:
			/// $("#element").wijslider({ buttonClick: function (e, args) { 
			/// alert(args.buttonType); } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsliderbuttonClick", function(e, args) {
			/// alert(args.buttonType); });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the button infos.
			/// data.buttonType: A string value that indicates the type name of button.
			/// </param>
			buttonClick: null,
			/// <summary>
			/// Determines whether the user is able to 
			/// drag the fill between the buttons. 
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
			///  $("#selector").wijslider({
			///      dragFill: false
			///  });
			/// </summary>
			dragFill: true,
			/// <summary>
			/// A value prevent the two range handles from being placed on top of 
			/// one another.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#selector").wijslider({
			///      minRange: 25
			///  });
			/// </summary>
			minRange: 0
		},

		_setOption: function (key, value) {
			///	<summary>
			///		Sets Slider options.
			///	</summary>

			var self = this;

			$.ui.slider.prototype._setOption.apply(self, arguments);
			this.options[key] = value;

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element.parent());
			} else if (key === "range") {
				self._setRangeOption(value);
			}
			//end for disabled option
			return this;
		},
		
		_setRangeOption:function(value) {
			var self = this,
			element = self.element,
			o = self.options;
			
			if ( value ) {
				if ( value === true ) {
					if ( !o.values ) {
						o.values = [ self._valueMin(), self._valueMin() ];
					}
					if ( o.values.length && o.values.length !== 2 ) {
						o.values = [ o.values[0], o.values[0] ];
					}
				}

				self.range = $( "<div></div>" )
					.appendTo( self.element )
					.addClass( "ui-slider-range" +
					// note: this isn't the most fittingly semantic framework class for this element,
					// but worked best visually with a variety of themes
					" ui-widget-header" + 
					( ( o.range === "min" || o.range === "max" ) ? " ui-slider-range-" + o.range : "" ) );
			} else {
				self.range.remove();
			}
			self._refreshValue();
		},

		_create: function () {
			///	<summary>
			///		Creates Slider DOM elements and binds interactive events.
			///	</summary>
			var self = this,
				element = self.element,
				o = self.options,
				jqElement, val, vals, idx, len,
				ctrlWidth, ctrlHeight, container, decreBtn, increBtn,
				decreBtnWidth, decreBtnHeight, increBtnWidth,
				increBtnHeight, thumb, thumbWidth, thumbHeight,
				dbtop, ibtop, dbleft, ibleft;

			self._oriStyle = element.attr("style");
			
			if (element.is(":input")) {
				if (o.orientation === "horizontal") {
					jqElement = $("<div></div>")
					.width(element.width()).appendTo(document.body);
				} else {
					jqElement = $("<div></div>")
					.height(element.height()).appendTo(document.body);
				}

				val = element.val();
				if (val !== "") {
					try {
						vals = val.split(";");
						len = vals.length;

						if (len > 0) {
							for (idx = 0; idx < len; idx++) {
								vals[idx] = parseInt(vals[idx], 10);
							}

							if (len === 1) {
								o.value = vals[0];
							} else {
								o.values = vals;
							}
						}
					} catch (e) {
					}
				}

				element.data(self.widgetName, jqElement.wijslider(o))
					.after($(document.body).children("div:last")).hide();

				//Add for support disabled option at 2011/7/8
				if (o.disabledState) {
					var dis = o.disabled;
					self.disable();
					o.disabled = dis;
				}
				//end for disabled option

				return;
			}

			$.ui.slider.prototype._create.apply(self, arguments);

			element.data("originalStyle", element.attr("style"));
			element.data("originalContent", element.html());

			ctrlWidth = element.width();
			ctrlHeight = element.height();
			container = $("<div></div>");

			if (o.orientation === "horizontal") {
				container.addClass("wijmo-wijslider-horizontal");
			} else {
				container.addClass("wijmo-wijslider-vertical");
			}
			container.width(ctrlWidth).height(ctrlHeight);

			decreBtn = $("<a class=\"wijmo-wijslider-decbutton\"><span></span></a>");
			increBtn = $("<a class=\"wijmo-wijslider-incbutton\"><span></span></a>");
			element.wrap(container).before(decreBtn).after(increBtn);

			self._attachClass();

			decreBtnWidth = decreBtn.outerWidth();
			decreBtnHeight = decreBtn.outerHeight();
			increBtnWidth = increBtn.outerWidth();
			increBtnHeight = increBtn.outerHeight();
			thumb = element.find(".ui-slider-handle");
			thumbWidth = thumb.outerWidth();
			thumbHeight = thumb.outerHeight();
			//update code for height and width calculation at 2011/7/12
			//element.removeAttr("style");
			//end for height and width calculation

			if (o.orientation === "horizontal") {
				dbtop = ctrlHeight / 2 - decreBtnHeight / 2;
				decreBtn.css("top", dbtop).css("left", 0);
				ibtop = ctrlHeight / 2 - increBtnHeight / 2;
				increBtn.css("top", ibtop).css("right", 0);

				element.css("left", decreBtnWidth + thumbWidth / 2 - 1)
				.css("top", ctrlHeight / 2 - element.outerHeight() / 2)
				.width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
			} else {
				dbleft = ctrlWidth / 2 - decreBtnWidth / 2;
				decreBtn.css("left", dbleft).css("top", 0);
				ibleft = ctrlWidth / 2 - increBtnWidth / 2;
				increBtn.css("left", ibleft).css("bottom", 0);

				element
				.css("left", ctrlWidth / 2 - element.outerWidth() / 2)
				.css("top", decreBtnHeight + thumbHeight / 2 + 1)
				.height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
			}

			//Add for support disabled option at 2011/7/8
			if (o.disabledState) {
				var dis = o.disabled;
				self.disable();
				o.disabled = dis;
			}
			//end for disabled option

			self._bindEvents();
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-disabled")
				.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		destroy: function () {
			///	<summary>
			///	Remove the slider functionality completely. 
			/// This will return the element back to its pre-init state.
			///	</summary>
			var self = this, decreBtn, increBtn;
			decreBtn = this._getDecreBtn();
			increBtn = this._getIncreBtn();
			decreBtn.unbind('.' + self.widgetName);
			increBtn.unbind('.' + self.widgetName);
			$.ui.slider.prototype.destroy.apply(this, arguments);
			
			//update for destroy by wh at 2011/11/11
			//this.element.parent().removeAttr("class");
			//this.element.parent().html("");
			$("a", self.element.parent()).remove();
			self.element.unbind('.' + self.widgetName);
			self.element.unwrap();
			if (self._oriStyle === undefined) {
				self.element.removeAttr("style");
			} else {
				self.element.attr("style", self._oriStyle);
			}
			self.element.removeData(self.widgetName)
			.removeData("originalStyle")
			.removeData("originalContent");
			//end
			
			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
		},

		_slide: function (event, index, newVal) {
			var self = this,
				o = self.options,
				minRange = o.minRange,
				newValue = newVal,
				values;

			if (o.range) {
				values = self.values();
				if (index === 0 && values[1] - minRange < newVal) {
					newValue = values[1] - minRange;
				} else if (index === 1 && values[0] + minRange > newVal) {
					newValue = values[0] + minRange;
				}
			}

			$.ui.slider.prototype._slide.call(self, event, index, newValue);
		},

		_getDecreBtn: function () {
			var decreBtn = this.element.parent().find(".wijmo-wijslider-decbutton");
			return decreBtn;
		},

		_getIncreBtn: function () {
			var increBtn = this.element.parent().find(".wijmo-wijslider-incbutton");
			return increBtn;
		},

		_attachClass: function () {
			this._getDecreBtn().addClass("ui-corner-all ui-state-default")
			.attr("role", "button");
			this._getIncreBtn().addClass("ui-corner-all ui-state-default")
			.attr("role", "button");

			this.element.parent().attr("role", "slider")
			.attr("aria-valuemin", this.options.min)
			.attr("aria-valuenow", "0")
			.attr("aria-valuemax", this.options.max);

			if (this.options.orientation === "horizontal") {
				this.element.parent().addClass("wijmo-wijslider-horizontal");
				this._getDecreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-w");
				this._getIncreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-e");
			} else {
				this.element.parent().addClass("wijmo-wijslider-vertical");
				this._getDecreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-n");
				this._getIncreBtn().find("> span")
				.addClass("ui-icon ui-icon-triangle-1-s");
			}
		},

		_bindEvents: function () {
			var self = this, decreBtn, increBtn;
			decreBtn = this._getDecreBtn();
			increBtn = this._getIncreBtn();
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
			var self = e.data, data, decreBtn;
			
			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseOver', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.addClass("ui-state-hover");
		},

		_increBtnMouseOver: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseOver', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.addClass("ui-state-hover");
		},

		_decreBtnMouseOut: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseOut', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.removeClass("ui-state-hover ui-state-active");
		},

		_increBtnMouseOut: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseOut', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.removeClass("ui-state-hover ui-state-active");
		},

		_decreBtnMouseDown: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseDown', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.addClass("ui-state-active");

			//if the mouse release util the mouse out, the track still take effect.
			//added by wuhao 2011/7/16
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: decreBtn
			}, self._documentMouseUp);

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}
			//end for mouse release

			self._intervalID = window.setInterval(function () {
				self._decreBtnHandle(self);
			}, 200);

		},

		_documentMouseUp: function (e) {
			var self = e.data.self, ele = e.data.ele;
			if (self.options.disabledState) {
				return;
			}

			ele.removeClass("ui-state-active");

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}

			$(document).unbind("mouseup." + self.widgetName, self._documentMouseUp);
		},

		_intervalID: null,
		_increBtnMouseDown: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseDown', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.addClass("ui-state-active");

			//if the mouse release util the mouse out, the track still take effect.
			//added by wuhao 2011/7/16
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: increBtn
			}, self._documentMouseUp);

			if (self._intervalID !== null) {
				window.clearInterval(self._intervalID);
				self._intervalID = null;
			}
			//end for mouse release

			self._intervalID = window.setInterval(function () {
				self._increBtnHandle(self);
			}, 200);
		},

		_decreBtnMouseUp: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "decreButton" };
			self._trigger('buttonMouseUp', e, data);
			//
			decreBtn = self._getDecreBtn();
			decreBtn.removeClass("ui-state-active");

			window.clearInterval(self._intervalID);
		},

		_increBtnMouseUp: function (e) {
			var self = e.data, data, increBtn;

			if (self.options.disabledState) {
				return;
			}

			data = { buttonType: "increButton" };
			self._trigger('buttonMouseUp', e, data);
			//
			increBtn = self._getIncreBtn();
			increBtn.removeClass("ui-state-active");

			window.clearInterval(self._intervalID);
		},

		_decreBtnHandle: function (sender) {
			if (sender.options.orientation === "horizontal") {
				sender._decre();
			} else {
				sender._incre();
			}
		},

		_decreBtnClick: function (e) {
			var self = e.data, data;

			if (self.options.disabledState) {
				return;
			}
			
			//note: step1: slide the slider btn, the change event has fired;
			//step2: then click the decre button, the change event don't fired.
			self._mouseSliding = false;
			//end
			self._decreBtnHandle(self);
			data = { buttonType: "decreButton", value: self.value() };
			self._trigger('buttonClick', e, data);
		},

		_increBtnHandle: function (sender) {
			if (sender.options.orientation === "horizontal") {
				sender._incre();
			} else {
				sender._decre();
			}
		},

		_increBtnClick: function (e) {
			var self = e.data, data;

			if (self.options.disabledState) {
				return;
			}
			//note: step1: slide the slider btn, the change event has fired;
			//step2: then click the decre button, the change event don't fired.
			self._mouseSliding = false;
			//end
			self._increBtnHandle(self);
			data = { buttonType: "increButton", value: self.value() };
			self._trigger('buttonClick', e, data);
		},

		_decre: function () {
			var curVal = this.value();
			//
			if (!this.options.range && !this.options.values) {
				curVal = this.value();
				if (curVal <= this.options.min) {
					this.value(this.options.min);
				} else {
					this.value(curVal - this.options.step);
				}
			} else {
				curVal = this.values(0);
				if (curVal <= this.options.min) {
					this.values(0, this.options.min);
				} else {
					this.values(0, curVal - this.options.step);
				}
			}
			//
			this.element.parent()
			.attr("aria-valuenow", this.value());
		},

		_incre: function () {
			var curVal = this.value();
			//
			if (!this.options.range && !this.options.values) {
				curVal = this.value();
				if (curVal >= this.options.max) {
					this.value(this.options.max);
				} else {
					this.value(curVal + this.options.step);
				}
			} else {
				curVal = this.values(1);
				if (curVal >= this.options.max) {
					this.values(1, this.options.max);
				} else {
					this.values(1, curVal + this.options.step);
				}
			}
			//
			this.element.parent()
			.attr("aria-valuenow", this.value());

		},

		_mouseInit: function () {
			var self = this;
			//update for knockout: 
			//animate works only for every other click
			//if (this.options.dragFill)
			if (this.options.dragFill && this.options.range) {
				this._preventClickEvent = false;
				//update for unbind by wh at 2011/11/11
				//this.element.bind('click', function (event) {
				this.element.bind('click.' + self.widgetName, function (event) {
				//end for unbind
					if (self._dragFillStart > 0) {
						self._dragFillStart = 0;
					} else {
						$.ui.slider.prototype._mouseCapture.apply(self, arguments);
					}
				});
			}
			$.ui.mouse.prototype._mouseInit.apply(this, arguments);
		},

		_mouseCapture: function (event) {
			this.element.parent()
			.attr("aria-valuenow", this.value());
			//
			if (this.options.dragFill) {
				if (event.target.className === "ui-slider-range ui-widget-header") {
					this.elementSize = {
						width: this.element.outerWidth(),
						height: this.element.outerHeight()
					};
					this.elementOffset = this.element.offset();
					return true;
				} else {
					return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
				}
			} else {
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
				if (event.target) {
					if (event.target.className === "ui-slider-range ui-widget-header") {
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
			var distance, eleLength, movValue, v, v0, v1;
			if (this.options.dragFill) {
				distance = event.pageX - this._oldX;
				//var position = { x: event.pageX, y: event.pageY };
				//var movValue = this._normValueFromMouse(position);
				eleLength = this.element.outerWidth();
				if (this.options.orientation === "vertical") {
					eleLength = this.element.outerHeight();
					distance = -(event.pageY - this._oldY);
				}
				movValue = (this.options.max - this.options.min) / eleLength * distance;
				//document.title = distanceX + "|" + movValue;

				if (this._dragFillTarget) {
					if (this.options.orientation === "vertical") {
						$(document.documentElement).css("cursor", "s-resize");
					} else {
						$(document.documentElement).css("cursor", "w-resize");
					}
					if (this._dragFillStart > 0) {
						v = this._rangeValue;
						/* if (normValue + v >= this.options.max) {
						this.values(0, this.options.max - v);
						this.values(1, this.options.max);
						}
						else {
						}*/
						this.values(0, this._oldValue1 + movValue);
						this.values(1, this._oldValue1 + movValue + v);
						v0 = this.values(0);
						v1 = this.values(1);
						if (v0 + v > this.options.max) {
							this.values(0, this.options.max - v);
						}
						if (v1 - v < this.options.min) {
							this.values(1, this.options.min + v);
						}
					}
					this._dragFillStart++;
					return false;
				} else {
					return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
				}
			} else {
				return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
			}
		},

		_mouseStop: function (event) {
			var returnVal = $.ui.slider.prototype._mouseStop.apply(this, arguments);
			if (this.options.dragFill) {
				$(document.documentElement).css("cursor", "default");
				window.setTimeout(function () {
					this._dragFillTarget = false;
					this._dragFillStart = 0;
				}, 500);
			}
			return returnVal;
		}
	});
} (jQuery));

