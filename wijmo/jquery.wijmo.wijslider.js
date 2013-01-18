/*globals window,document,jQuery*/
/*
*
* Wijmo Library 2.3.4
* http://wijmo.com/
*
* Copyright(c) GrapeCity, Inc.  All rights reserved.
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

		widgetEventPrefix: "wijslider",

		_setOption: function (key, value) {
			///	<summary>
			///		Sets Slider options.
			///	</summary>

			var self = this;

			if (key === "values") {
				value = self._pre_set_values(value);
				self.options[key] = value;
				self._setValuesOption();
			} else {
				$.ui.slider.prototype._setOption.apply(self, arguments);
			}

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element.parent());
			} else if (key === "range") {
				self._setRangeOption(value);
			}
			//end for disabled option
			return this;
		},

		_setRangeOption: function (value) {
			var self = this,
			o = self.options,
			valueMin;

			if (value === true) {
				if (!o.values || (o.values && o.values.length === 0)) {
					valueMin = self._valueMin();
					o.values = [valueMin, valueMin];
				} else if (o.values.length && o.values.length !== 2) {
					valueMin = o.values[0];
					o.values = [valueMin, valueMin];
				}
				self._refresh_handle(2);
			}
			self._re_createRange();
			self._refreshValue();
		},

		_setValuesOption: function () {
			var self = this,
			valsLength = 0,
			i;

			self._animateOff = true;
			self._refreshValue();
			if ($.isArray(self.options.values)) {
				valsLength = self.options.values.length;
			}
			for (i = 0; i < valsLength; i++) {
				self._change(null, i);
			}
			self._animateOff = false;
		},

		_re_createRange: function () {
			var self = this,
				o = self.options;

			if (self.range) {
				self.range.remove();
			}
			if (o.range) {
				self.range = $("<div></div>")
					.appendTo(self.element)
					.addClass("ui-slider-range ui-widget-header" +
						((o.range === "min" || o.range === "max") ?
									" ui-slider-range-" + o.range : ""));
			}
		},

		_pre_set_values: function (values) {
			var self = this,
				o = self.options,
				newHandleLen = 1,
				value;

			newHandleLen = values && values.length ? values.length : 1;
			if (o.range === true) {
				if (!values || (values && values.length === 0)) {
					value = self._valueMin();
					values = [value, value];
				} else if (values.length && values.length !== 2) {
					value = values[0];
					values = [value, value];
				}
				newHandleLen = 2;
			}
			self._refresh_handle(newHandleLen);
			self._re_createRange();
			return values;
		},

		_refresh_handle: function (newHandleLen) {
			var self = this,
				handleLen = self.handles.length,
				handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
				handles = [], i;

			if (handleLen !== newHandleLen) {
				if (newHandleLen > handleLen) {
					for (i = handleLen; i < newHandleLen; i++) {
						handles.push(handle);
					}
					self.element.append(handles.join(""));
				} else {
					self.element
						.find(".ui-slider-handle")
						.eq(newHandleLen - 1)
						.nextAll()
						.remove();
				}
				self.handles = self.element.find(".ui-slider-handle");
			}
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
				thumb;

			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

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

			self._container = element.parent();
			self._attachClass();
			thumb = element.find(".ui-slider-handle");

			self._adjustSliderLayout(decreBtn, increBtn, thumb);

			//Add for support disabled option at 2011/7/8
			if (o.disabledState) {
				var dis = o.disabled;
				self.disable();
				o.disabled = dis;
			}
			//end for disabled option

			//update for visibility change
			if (self.element.is(":hidden") &&
						self.element.wijAddVisibilityObserver) {
				self.element.wijAddVisibilityObserver(function () {
					self._refresh();
					if (self.element.wijRemoveVisibilityObserver) {
						self.element.wijRemoveVisibilityObserver();
					}
				}, "wijslider");
			}

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

		refresh: function () {
			/// <summary>
			/// Refresh the wijslider widget.
			/// </summary>

			// note: when the original element's width is setted by percent
			// it's hard to adjust the position and size, so first destroy then
			// recreate
			//this._refresh();
			var widgetObject = this.element.data("wijslider"),
			wijmoWidgetObject = this.element.data("wijmoWijslider");

			this.destroy();

			this.element.data("wijslider", widgetObject);
			this.element.data("wijmoWijslider", wijmoWidgetObject);

			this._create();
		},

		_refresh: function () {
			var self = this,
			increBtn, decreBtn, thumb;

			//			self.destroy();
			//			self._create();

			decreBtn = self._container.find(".wijmo-wijslider-decbutton");
			increBtn = self._container.find(".wijmo-wijslider-incbutton");
			thumb = self._container.find(".ui-slider-handle");

			self._adjustSliderLayout(decreBtn, increBtn, thumb);
			self._refreshValue();
		},

		_adjustSliderLayout: function (decreBtn, increBtn, thumb) {
			var self = this,
			element = self.element,
			o = self.options,
			ctrlWidth, ctrlHeight,
			decreBtnWidth, decreBtnHeight, increBtnWidth,
			increBtnHeight, thumbWidth, thumbHeight,
			dbtop, ibtop, dbleft, ibleft;

			ctrlWidth = self._container.width();
			ctrlHeight = self._container.height();

			decreBtnWidth = decreBtn.outerWidth();
			decreBtnHeight = decreBtn.outerHeight();
			increBtnWidth = increBtn.outerWidth();
			increBtnHeight = increBtn.outerHeight();

			thumbWidth = thumb.outerWidth();
			thumbHeight = thumb.outerHeight();

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

			if (o.range === true) {
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
			var self = this, decreBtn, increBtn, ele;
			decreBtn = this._getDecreBtn();
			increBtn = this._getIncreBtn();
			ele = self.element;
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

			ele.bind('mouseup.' + self.widgetName, self, self._elementMouseupEvent);
		},

		_decreBtnMouseOver: function (e) {
			var self = e.data, data, decreBtn;

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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
			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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

			if (self.options.disabledState ||
					self.options.disabled) {
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
			var self = this,
				curVal = self.value(),
				o = self.options,
				min = o.min,
				step = o.step;
			//
			if (o.values && o.values.length) {
				curVal = self.values(0);
				if (curVal <= min) {
					self.values(0, min);
				} else {
					self.values(0, curVal - step);
				}
			} else {
				curVal = self.value();
				if (curVal <= min) {
					self.value(min);
				} else {
					self.value(curVal - step);
				}
			}
			//
			self.element.parent()
			.attr("aria-valuenow", self.value());
		},

		_incre: function () {
			var self = this,
				curVal = self.value(),
				o = self.options,
				max = o.max,
				step = o.step,
				index;
			//
			if (o.values && o.values.length) {
				index = o.values.length === 1 ? 0 : 1;
				curVal = self.values(index);
				if (curVal >= max) {
					self.values(index, max);
				} else {
					self.values(index, curVal + step);
				}
			} else {
				curVal = self.value();
				if (curVal >= max) {
					self.value(max);
				} else {
					self.value(curVal + step);
				}
			}
			//
			self.element.parent()
			.attr("aria-valuenow", self.value());

		},

		_elementMouseupEvent: function (e) {
			var self = e.data;
			if (self.options.dragFill && self.options.range) {
				if (self._dragFillStart > 0) {
					self._dragFillStart = 0;
				} else {
					$.ui.slider.prototype._mouseCapture.apply(self, arguments);
				}
			}
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
					try {
						return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
					} catch (e) {

					}
				}
			} else {
				try {
					return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
				} catch (e) {

				}
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

