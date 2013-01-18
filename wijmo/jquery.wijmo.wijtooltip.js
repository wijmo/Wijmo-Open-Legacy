/*globals window document clearTimeout setTimeout jQuery */
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
*
* Wijmo Tooltip widget.
* 
* Depends:
*	jQuery.1.7.1.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jQuery.ui.position.js
*	jquery.bgiframe-2.1.3-pre.js
*/
(function ($) {
	"use strict";
	var defaultTooltipKey = "@wijtp@",
		tipCss = "wijmo-wijtooltip",
		calloutCssPrefix = tipCss + "-arrow-",
		parseF = parseFloat,
		win = window,
		doc = document,
		math = Math,
		max = math.max,
		oldTipPos = {};

	$.widget("wijmo.wijtooltip", {
		options: {
			/// <summary>
			/// Sets the tooltip's content..
			/// Type: String or Function.
			/// Default: "".
			/// Remarks: The value can be a string, html code, or a function. 
			/// If it is a function, then the content will be 
			/// the function's return value.
			/// Code example: $(".selector").wijtooltip("option", "content", "content").
			/// </summary>
			content: '',
			/// <summary>
			/// Specifies a value that sets the tooltip's title.
			/// Type: String or Function.
			/// Default: "".
			/// Code example: $(".selector").wijtooltip("option", "title", "title");
			/// Remark: The value can be a string, html code, or a function. 
			/// If it is a function, then the title will be 
			/// the function's return value.
			/// </summary>
			title: "",
			/// <summary>
			/// Determines how to close the tooltip. Behaviors include auto or sticky.
			/// Type: String.
			/// Default: "auto".
			/// Options: "auto", "none" and "sticky".
			/// Code example: $(".selector")
			///				.wijtooltip("option", "closeBehavior", "auto").
			/// </summary>
			closeBehavior: 'auto',
			/// <summary>
			/// If true, then the tooltip moves with the mouse. 
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijtooltip("option", "mouseTrailing", false).
			/// </summary>
			mouseTrailing: false,
			/// <summary>
			/// Sets the event that will cause the tooltip to appear.
			/// Type: String
			/// Default: "hover".
			/// Options: "hover", "click", "focus", "rightClick", "custom".
			/// Code example: $(".selector").wijtooltip("option", "triggers", "hover").
			/// </summary>
			triggers: 'hover',
			/// <summary>
			/// Sets the tooltip's position mode in relation to the 'relativeTo', 
			/// 'offsetX', and 'offsetY' properties. For example, 
			/// here is the jQuery ui position's position:
			/// {my:'top left',at:'right bottom',offset:}.
			/// Type: Object.
			/// Default: { my: "left bottom", at: "right top", offset: null}
			/// Code expamle: $(".selector").wijtooltip("option", "position",
			///				{my: 'left bottom', at: 'right top', offset: '0 0'}).
			/// </summary>
			position: {
				my: 'left bottom',
				at: 'right top',
				offset: null
			},
			/// <summary>
			/// Determines whether to show the callout element.
			/// Type: Boolean.
			/// Default: true.
			/// Code example: $(".selector").wijtooltip("option", "showCallout", true).
			/// </summary>
			showCallout: true,
			/// <summary>
			/// Sets showAnimation and hideAnimation if they are 
			/// not specified individually.
			/// Default: { animated: "fade", duration: 500, easing: null }.
			/// Type: Object.
			/// Remark: User's standard animation setting syntax from other widgets.
			/// Code example:
			/// $(".selector").wijtooltip("option", "animation", 
			/// {animated: "fade", duration: 400, easing: null})
			/// </summary>
			animation: { animated: "fade", duration: 500, easing: null },
			/// <summary>
			/// Determines the animation effect that will be shown. 
			/// Type: Object.
			/// Default: {}.
			/// Remarks: This should be an object value. Possible values include:
			/// 'animated', 'duration', and 'easing'. 
			/// This property works with jQuery animation..
			/// Code example: $(".selector").wijtooltip("option", "showAnimation",
			///				{animated: "fade", duration: 500, easing: "linear"}).
			/// </summary>
			showAnimation: {},
			/// <summary>
			/// Determines whether the animation effect can be seen.
			/// Type: Object.
			/// Default: {animated: 'fade', duration:500, easing: null}.
			/// Remarks: This should be an object value, 
			/// like the showAnimation property. 
			/// Code example: $(".selector").wijtooltip("option", "hideAnimation",
			///				{animated: "fade", duration: 500, easing: null}).
			/// </summary>
			hideAnimation: {},
			/// <summary>
			/// Determines the length of the delay before the tooltip appears. 
			/// Type: Number
			/// Default: 150.
			/// Code example: $(".selector").wijtooltip("option", "showDelay", 200).
			/// </summary>
			showDelay: 150,
			/// <summary>
			/// Determines the length of the delay before the tooltip disappears.
			/// Type: Number.
			/// Default: 150.
			/// Code example: $(".selector").wijtooltip("option", "hideDelay", 200).
			/// </summary>
			hideDelay: 150,
			/// <summary>
			/// Sets the callout's offset changing animation..
			/// Type: Object.
			/// Default: {duration: 1000, disabled: false, easing: null}.
			/// Code example: $(".selector").wijtooltip("option",
			///				"calloutAnimation", {easing: "swing", duration: 200}).
			/// </summary>
			calloutAnimation: { duration: 1000, disabled: false, easing: null },
			/// <summary>
			/// Determines the callout's class style. 
			/// If true, then the callout triangle will be filled..
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijtooltip("option", "calloutFilled", false).
			/// </summary>
			calloutFilled: false,
			/// <summary>
			/// A value that indicates whether to show the modal tooltip.
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijtooltip("option", "modal", true).
			/// </summary>
			modal: false,
			/// <summary>
			/// A value that indicates which group the tooltip belongs to.
			/// Type: String.
			/// Default: null.
			/// Code example: $(".selector").wijtooltip("option", "group", "A").
			/// </summary>
			group: null,
			/// <summary>
			/// A function that defines a callback when user use ajax to set 
			/// content property.
			/// Default: false.
			/// Type: Function.
			/// Code example: $(".selector").wijtooltip("option", 
			/// "ajaxCallback", function () {}).
			/// Remark: In ajax's complete callback method, user set callback 
			/// data to the content option.
			/// </summary>
			ajaxCallback: null,
			/// <summary>
			/// Trigegred before showing the tooltip
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("showing",function(e, ui){})
			/// Bind to the event by type: wijtooltipshowing
			/// $(".selector").bind("wijtooltipshowing", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget.
			/// </param>
			/// <returns type="Boolean">
			/// Return false to cancel the showing event.
			/// </returns>
			showing: null,
			/// <summary>
			/// Triggered once the tooltip has shown.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("shown",function(e, ui){})
			/// Bind to the event by type: wijtooltipshown
			/// $(".selector").bind("wijtooltipshown", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			shown: null,
			/// <summary>
			/// Triggered before hiding the tooltip.If data.cancel is 
			/// set to true, then the tooltip is no longer hidden
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("hiding", function(e, ui){})
			/// Bind to the event by type: wijtooltiphiding
			/// $(".selector").bind("wijtooltiphiding", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			/// <returns type="Boolean">
			/// Return false to cancel the hiding event.
			/// </returns>
			hiding: null,
			/// <summary>
			/// Triggered once the tooltip has hidden.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $(".selector").wijtooltip("hidden",function(e, ui){})
			/// Bind to the event by type: wijtooltiphidden
			/// $(".selector").bind("wijtooltiphidden", function(e, ui) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object. 
			/// </param>
			/// <param name="ui" type="Object">
			/// The wijtooltip widget object.
			/// </param>
			hidden: null,
			/// <summary>
			/// A value that indicates whether to set user-defined class.
			/// Type: String.
			/// Default: "".
			/// Code example:
			/// $(".selector").wijtooltip("option", "cssClass", cssClass).
			/// </summary>
			cssClass: ""
		},

		_setOption: function (key, value) {
			var self = this,
				funName = "_set_" + key,
				oldValue = self.options[key];

			$.Widget.prototype._setOption.apply(self, arguments);

			if ($.isPlainObject(value)) {
				self.options[key] = $.extend({}, oldValue, value);
			}

			if (self[funName]) {
				self[funName](oldValue);
			}
		},

		

		//fix the issue 21416: cssClass does not show.
		_set_cssClass: function () {
			var self = this,
				o = self.options,
				cssClass = o.cssClass,
				tooltip = self._tooltip;

			if (!tooltip) {
				return;
			}
			if (!tooltip.hasClass(cssClass)) {
				tooltip.addClass(cssClass);
			}
		},

		_set_content: function (value) {
			var self = this;
			if (self._isAjaxCallback) {
				self._callbacked = true;
				//self.options.content = value;
				//self._setText();
				self.show();
				self._callbacked = false;
			}
			else {
				self._setText();
			}
		},

		_create: function () {
			var self = this,
				o = self.options,
				element = self.element,
				id = element && element.attr("id"),
				describedBy = "",
				cssClass = "",
				key = o.group || defaultTooltipKey,
				tooltip = $.wijmo.wijtooltip._getTooltip(key);

			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

			if (tooltip) {
				tooltip.count++;
			} else {
				tooltip = self._createTooltip();
				tooltip.count = 0;
				$.wijmo.wijtooltip._tooltips[key] = tooltip;
			}

			//fix the issue 21416: cssClass does not show.
			cssClass = o.cssClass ? o.cssClass : "";
			if (!tooltip.hasClass(cssClass)) {
				tooltip.addClass(cssClass);
			}

			o.position.of = self.element;
			self._bindLiveEvents();
			self._tooltip = tooltip;

			if (id !== "") {
				describedBy = tooltip.attr("aria-describedby");
				describedBy = describedBy === undefined ? "" : describedBy + " ";

				tooltip.attr("aria-describedby", describedBy + id);
			}
		},

		destroy: function () {
			/// <summary>
			///	Removes the wijtooltip functionality completely.
			///	This returns the element back to its pre-init state.
			/// </summary>
			var self = this,
				element = self.element,
				key = self.options.group || defaultTooltipKey;

			element.unbind(".tooltip");
			element.attr("title", self._content);
			$.wijmo.wijtooltip._removeTooltip(key);

			$.Widget.prototype.destroy.apply(self);
		},

		widget: function () {
			/// <summary>
			/// Returns the wijtooltip element.
			/// Code example:
			/// $("#tooltip").wijtooltip("widget");
			/// </summary>
			return this._tooltip;
		},

		//public methods
		show: function () {
			/// <summary>
			///	Shows the tooltip
			/// Code example:
			/// $("#tooltip").wijtooltip("show");
			/// </summary>
			var self = this,
				tooltip = self._tooltip,
				o = self.options;

			if (!tooltip || o.disabled) {
				return;
			}

			if (tooltip._showAnimationTimer) {
				clearTimeout(tooltip._showAnimationTimer);
				tooltip._showAnimationTimer = null;
			}
			if (tooltip._showAtAnimationTimer) {
				clearTimeout(tooltip._showAtAnimationTimer);
				tooltip._showAtAnimationTimer = null;
			}
			if (tooltip._hideAnimationTimer) {
				clearTimeout(tooltip._hideAnimationTimer);
				tooltip._hideAnimationTimer = null;
			}

			tooltip.stop(true, true);

			if (o.ajaxCallback && $.isFunction(o.ajaxCallback) && !self._callbacked) {
				self._isAjaxCallback = true;
				o.ajaxCallback.call(self.element);
				return;
			}
			self._setText();

			tooltip._showAnimationTimer =
				setTimeout(function () {
					//self._setText();
					oldTipPos = tooltip.offset();
					if (o.mouseTrailing) {
						self._setCalloutCss();
						return;
					}
					self._setPosition();

					self._showTooltip();
				}, self.options.showDelay);
		},

		showAt: function (point) {
			/// <summary>
			///	Show the tooltip at the specified position
			///	</summary>
			/// <param name="point" type="Object">
			///	A point value that indicates the position that tooltip will be shown.
			/// Code example:
			/// $("#tooltip").wijtooltip("showAt", {x:100, y:120});
			/// </param>
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				calloutPos = {},
				offsetX = 0,
				offsetY = 0,
				offset = {},
				calloutShape, border, hBorder, vBorder,
				width, height;
			if (!tooltip || !callout) {
				return;
			}

			tooltip.stop(true, true);
			
			if (tooltip._showAtAnimationTimer) {
				clearTimeout(tooltip._showAtAnimationTimer);
				tooltip._showAtAnimationTimer = null;
			}
			if (tooltip._hideAnimationTimer) {
				clearTimeout(tooltip._hideAnimationTimer);
				tooltip._hideAnimationTimer = null;
			}

			tooltip._showAtAnimationTimer =
				setTimeout(function () {
					var visible = tooltip.is(":visible");
					self._setText();
					oldTipPos = tooltip.offset();

					tooltip.offset({ left: 0, top: 0 })
						.show();
					calloutPos = callout.position();
					offsetX = calloutPos.left;
					offsetY = calloutPos.top;

					border = self._getBorder(callout);
					hBorder = border.left || border.right;
					vBorder = border.top || border.bottom;

					width = tooltip.width();
					height = tooltip.height();

					calloutShape = self._getCalloutShape();

					offset = {
						"rt": {
							left: point.x - width - hBorder,
							top: point.y - offsetY
						},
						"rc": {
							left: point.x - width - hBorder,
							top: point.y - height / 2
						},
						"rb": {
							left: point.x - width - hBorder,
							top: point.y - offsetY - vBorder
						},
						"lt": {
							left: point.x + hBorder,
							top: point.y - offsetY
						},
						"lc": {
							left: point.x + hBorder,
							top: point.y - height / 2
						},
						"lb": {
							left: point.x + hBorder,
							top: point.y - offsetY - vBorder
						},
						"tl": {
							left: point.x - offsetX,
							top: point.y + vBorder
						},
						"tc": {
							left: point.x - width / 2,
							top: point.y + vBorder
						},
						"tr": {
							left: point.x - offsetX - hBorder,
							top: point.y + vBorder
						},
						"bl": {
							left: point.x - offsetX,
							top: point.y - height - vBorder
						},
						"bc": {
							left: point.x - width / 2,
							top: point.y - height - vBorder
						},
						"br": {
							left: point.x - offsetX - hBorder,
							top: point.y - height - vBorder
			            },
			            "cc": {
			                left: point.x - width / 2,
			                top: point.y - height / 2
			            }
					}[calloutShape];

					calloutShape = self._flipTooltip(offset, calloutShape, border);
					self._setUnfilledCallout(calloutShape);
					tooltip.offset(offset);//.hide();
					if (!visible) {
						tooltip.hide();
					}
					self._calloutShape = calloutShape;
					self._showTooltip();
				}, self.options.showDelay);
		},

		hide: function () {
			/// <summary>
			///	Hides the tooltip
			/// Code example:
			/// $("#tooltip").wijtooltip("hide");
			/// </summary>
			var self = this,
				tooltip = self._tooltip;

			if (!tooltip) {
				return;
			}

			if (tooltip._showAnimationTimer) {
				clearTimeout(tooltip._showAnimationTimer);
				tooltip._showAnimationTimer = null;
			}
			if (tooltip._showAtAnimationTimer) {
				clearTimeout(tooltip._showAtAnimationTimer);
				tooltip._showAtAnimationTimer = null;
			}
			if (tooltip._hideAnimationTimer) {
				clearTimeout(tooltip._hideAnimationTimer);
				tooltip._hideAnimationTimer = null;
			}
			//clearTimeout(tooltip._showAnimationTimer);
			tooltip._hideAnimationTimer =
				setTimeout($.proxy(self._hideTooltip, self), self.options.hideDelay);
		},

		//begin private methods
		_createTooltip: function () {
			var self = this,
				cornerAllCss = "ui-corner-all",
				widgetContentCss = "ui-widget-content",
				stateDefaultCss = "ui-state-default",
				widgetHeaderCss = "ui-widget-header",
				tooltip = $("<div class = '" + tipCss + " ui-widget " +
							widgetContentCss + " " + cornerAllCss + "'></div>"),
				container = $("<div class='" + tipCss + "-container'></div>"),
				callout = $("<div class='" + widgetContentCss + " " +
							tipCss + "-pointer '>" + "<div class='" +
							tipCss + "-pointer-inner'></div></div>"),
				title = $("<div class = '" + tipCss + "-title " +
							widgetHeaderCss + " " + cornerAllCss + "'></title>"),
				closeBtn = $("<a href='#' class = '" + tipCss + "-close " +
							stateDefaultCss + " " + cornerAllCss + "'></a>");

			closeBtn.append($("<span class = 'ui-icon ui-icon-close'></span>"))
					.bind("click", $.proxy(self._onClickCloseBtn, self));

			tooltip.append(title)
				.append(closeBtn)
				.append(container)
				.append(callout)
				.css("position", "absolute")
				.attr("role", "tooltip")
				.appendTo("body")
				.hide();

			tooltip._container = container;
			tooltip._callout = callout;
			tooltip._closeBtn = closeBtn;
			tooltip._title = title;

			return tooltip;
		},

		_bindLiveEvents: function () {
			var self = this,
				o = self.options,
				element = self.element;

			if (self._content === undefined) {
				self._content = element.attr("title");
				element.attr("title", "");
			}

			element.unbind('.tooltip');

			if (o.mouseTrailing) {
				element.bind("mousemove.tooltip", function (e) {
					if (o.disabled) {
						return;
					}
					var offset = o.position.offset || "",
					offsets = offset.split(" ");
					if (offsets.length === 2) {
						self.showAt({ x: e.pageX + parseInt(offsets[0], 10),
							y: e.pageY + parseInt(offsets[1], 10)
						});
					}
					else {
						self.showAt({ x: e.pageX, y: e.pageY });
					}
				});
			}

			switch (o.triggers) {
			case "hover":
				element.bind("mouseover.tooltip", $.proxy(self.show, self))
				.bind("mouseout.tooltip", $.proxy(self._hideIfNeeded, self));
				break;
			case "click":
				element.bind("click.tooltip", $.proxy(self.show, self));
				break;
			case "focus":
				element.bind("focus.tooltip", $.proxy(self.show, self))
				.bind("blur.tooltip", $.proxy(self._hideIfNeeded, self));
				break;
			case "rightClick":
				element.bind("contextmenu.tooltip", function (e) {
						self.show();
						e.preventDefault();
					});
				break;
			}
		},

		_hideIfNeeded: function () {
			var self = this,
				o = self.options,
				closeBehavior = o.closeBehavior;

			if (closeBehavior === "sticky" || o.modal ||
				closeBehavior === "none" || o.disabled) {
				return;
			}

			self.hide();
		},

		_flipTooltip: function (pos, calloutShape, calloutBorder) {
			var self = this,
				tooltip = self._tooltip,
				bound = { width: tooltip.width(), height: tooltip.height() },
				flipCallout = self._flipCallout(pos, bound, calloutShape),
				flip = flipCallout && flipCallout.flip,
				width, height;

			if (!tooltip || !flipCallout || (!flip.h && !flip.v)) {
				return flipCallout.calloutShape;
			}

			width = tooltip.width();
			height = tooltip.height();

			if (flip.h === "l") {
				pos.left -= (width + calloutBorder.right * 2) + 1;
			} else if (flip.h === "r") {
				pos.left += (width + calloutBorder.left * 2) + 1;
			} else if (flip.v === "t") {
				pos.top -= (height + calloutBorder.bottom * 2) + 1;
			} else if (flip.v === "b") {
				pos.top += (height + calloutBorder.top * 2) + 1;
			}

			return flipCallout.calloutShape;
		},

		_flipCallout: function (pos, bound, calloutShape) {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				flip = { h: false, v: false },
				jqWin = $(win),
				collision = (o.position.collision || "flip").split(" ");

			if (collision.length === 1) {
				collision[1] = collision[0];
			}

			if (!tooltip || (collision[0] !== "flip" && collision[1] !== "flip")) {
				return { flip: flip };
			}

			if (collision[0] === "flip") {
				if (pos.left < 0 || pos.left + bound.width >
					jqWin.width() + jqWin.scrollLeft()) {
					flip.h = true;
				}
			}

			if (collision[0] === "flip") {
				if (pos.top < 0 || pos.top + bound.height >
					jqWin.height() + jqWin.scrollTop()) {
					flip.v = true;
				}
			}

			//fix the issue 21386, calloutShape undefind
			if (o.showCallout) {
				if (flip.h) {
					if (calloutShape.indexOf('l') > -1) {
						calloutShape = calloutShape.replace(/l/, 'r');
						flip.h = "l";
					} else if (calloutShape.indexOf('r') > -1) {
						calloutShape = calloutShape.replace(/r/, 'l');
						flip.h = "r";
					}
				}

				if (flip.v) {
					if (calloutShape.indexOf('t') > -1) {
						calloutShape = calloutShape.replace(/t/, 'b');
						flip.v = "t";
					} else if (calloutShape.indexOf('b') > -1) {
						calloutShape = calloutShape.replace(/b/, 't');
						flip.v = "b";
					}
				}
				if (flip.h || flip.v) {
					self._removeCalloutCss();
					tooltip.addClass(calloutCssPrefix + calloutShape);
				}
			}
			/*
			if (flip.h) {
			if (calloutShape.indexOf('l') > -1) {
			calloutShape = calloutShape.replace(/l/, 'r');
			flip.h = "l";
			} else if (calloutShape.indexOf('r') > -1) {
			calloutShape = calloutShape.replace(/r/, 'l');
			flip.h = "r";
			}
			}

			if (flip.v) {
			if (calloutShape.indexOf('t') > -1) {
			calloutShape = calloutShape.replace(/t/, 'b');
			flip.v = "t";
			} else if (calloutShape.indexOf('b') > -1) {
			calloutShape = calloutShape.replace(/b/, 't');
			flip.v = "b";
			}
			}
			if (flip.h || flip.v) {
			self._removeCalloutCss();
			tooltip.addClass(calloutCssPrefix + calloutShape);
			} 
			*/

			return { flip: flip, calloutShape: calloutShape };
		},

		//methods for options setters
		_set_position: function (oldValue) {
			var self = this,
				o = self.options,
				val = o.position;

			if (o.showCallout) {
				if (oldValue.my !== val.my || oldValue.at !== val.at) {
					self._setPosition();
				}

				self._setCalloutOffset(true);
			}

			//fix the issue 21467.
			self._setText();
		},

		_set_showCallOut: function (value) {
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout;

			if (!tooltip || !callout) {
				return;
			}

			if (value) {
				self._setCalloutCss();
				callout.show();
			} else {
				callout.hide();
			}
		},

		_set_closeBehavior: function () {
			var self = this,
				tooltip = self._tooltip,
				closeBtn = tooltip && tooltip._closeBtn;

			if (closeBtn) {
				closeBtn[self.options.closeBehavior === "sticky" ? "show" : "hide"]();
			}
		},

		_set_triggers: function () {
			this._bindLiveEvents();
		},

		_set_mouseTrailing: function () {
			this._bindLiveEvents();
		},
		//end of methods for options setters.

		_getCalloutShape: function () {
			var self = this,
				position = self.options.position,
				makeArr = function (items) {
					return $.map(items, function (item) {
						return item.substr(0, 1);
					});
				},
				myItems = makeArr(position.my.split(" ")),
				atItems = makeArr(position.at.split(" ")),
				shape = [];

			if (myItems.length === 2) {
				shape = myItems;
			}

			if (myItems[0] === atItems[0]) {
				if ((myItems[1] === 't' && atItems[1] === 'b') ||
					(myItems[1] === 'b' && atItems[1] === 't')) {
					shape.reverse();
				}
			} else if (atItems[0] === 'c') {
				shape.reverse();
			}

			if (shape[0] === 'c') {
				shape.reverse();
			}

			return shape.join("");
		},

		_setCalloutCss: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				cssName = "",
				calloutShape = "";

			if (!o.showCallout) {
				return;
			}

			self._removeCalloutCss();
			calloutShape = self._getCalloutShape();
			cssName = calloutCssPrefix + calloutShape;

			if (tooltip) {
				tooltip.addClass(cssName);
			}

			return calloutShape;
		},

		_removeCalloutCss: function () {
			var tooltip = this._tooltip;

			if (tooltip) {
				$.each(["tl", "tc", "tr",
					"bl", "bc", "br",
					"rt", "rc", "rb",
					"lt", "lc", "lb", "cc"], function (idx, compass) {
						var cssName = calloutCssPrefix + compass;

						if (tooltip.hasClass(cssName)) {
							tooltip.removeClass(cssName);
							return false;
						}
					});
			}
		},

		_getBorder: function (element) {
			var obj = {};

			$.each(["top", "right", "left", "bottom"], function (idx, compass) {
				obj[compass] = parseF(element.css("border-" + compass + "-width"));
			});

			return obj;
		},

		_setPosition: function () {
			var self = this,
				o = self.options,
				position = o.position,
				tooltip = self._tooltip,
				isHidden = tooltip.is(":hidden"),
				calloutShape = self._setCalloutCss(),
				arrCalloutShape = calloutShape ? calloutShape.split('') : null,
				offset = [0, 0],
				sOffset = "",
				callout = tooltip._callout,
				border, top, left, right, bottom,
				bound = { width: tooltip.width(), height: tooltip.height() },
				flipCallout, flip;

			if (isHidden) {
				tooltip.show();
			}

			tooltip.css({ left: 0, top: 0 });

			if (o.showCallout) {
				border = self._getBorder(callout);
				left = parseF(callout.css("left"));
				top = parseF(callout.css("top"));
				right = parseF(callout.css("right"));
				bottom = parseF(callout.css("bottom"));

				switch (arrCalloutShape[0]) {
				case "l":
					offset[0] = border.right;
					break;
				case "r":
					offset[0] = -border.left;
					break;
				case "b":
					offset[1] = bottom;
					break;
				case "t":
					offset[1] = -top;
					break;
				}

				switch (arrCalloutShape[1]) {
				case "t":
					offset[1] = -top;
					break;
				case "b":
					offset[1] = bottom;
					break;
				case "r":
					offset[0] = right;
					break;
				case "l":
					offset[0] = -left;
					break;
				}

				sOffset = offset.join(" ");
			}

			tooltip.position({ my: position.my, at: position.at, of: position.of,
				offset: sOffset, collision: "none none"
			});

			flipCallout = self._flipCallout(tooltip.offset(), bound, calloutShape);
			flip = flipCallout.flip;

			if (flip.h || flip.v) {
				tooltip.css({ left: 0, top: 0 });
				tooltip.position({ my: position.my, at: position.at, of: position.of,
					offset: sOffset, collision: position.collision
				});
			}

			if (o.showCallout) {
				self._setUnfilledCallout(calloutShape);
			}

			self._calloutShape = calloutShape;

			if (isHidden) {
				tooltip.hide();
			}
		},

		_setCalloutOffset: function (showCalloutAnimation) {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				calloutShape = self._calloutShape,
				horizontal = false,
				offset = o.position.offset,
				value = "",
				offsetItems = [],
				calloutAnimation = o.calloutAnimation;

			if (!callout) {
				return;
			}

			if (!offset || offset.length === 0) {
				return;
			}

			callout.stop(true, true);

			$.each(["tr", "tc", "tl", "bl", "bc", "br"], function (idx, compass) {
				if (calloutShape === compass) {
					horizontal = true;
					return false;
				}
			});

			if (offset) {
				offsetItems = offset.split(" ");

				if (offsetItems.length === 2) {
					value = horizontal ? offsetItems[0] : offsetItems[1];
				} else if (offsetItems.length === 1) {
					value = offsetItems[0];
				}
			}

			//when 'position.offset' is set "none none", 
			//the properties left and top of the 'callout' element in the tooltip
			//need to be removed.
			if (offsetItems && offsetItems.length === 2 && 
				offsetItems[0] === "none" && offsetItems[1] === "none") {
				callout.css("left", "").css("top", "");
			}
			else if (value === "none") {
				callout.css(horizontal ? "left" : "top", "");
			}
			else if (value !== "") {
				if (showCalloutAnimation && !showCalloutAnimation.disabled) {
					callout.animate(horizontal ? { left: value} : { top: value },
						calloutAnimation.duration, calloutAnimation.easing);
				} else {
					callout.css(horizontal ? "left" : "top", value);
				}
			}
		},

		_setUnfilledCallout: function (calloutShape) {
			var self = this,
				tooltip = self._tooltip,
				callout = tooltip && tooltip._callout,
				innerCallout = callout && callout.children(),
				arrCalloutSharp = calloutShape.split(''),
				borderColor = tooltip && tooltip.css("background-color");

			if (!innerCallout) {
				return;
			}

			innerCallout.css({
				"border-left-color": "",
				"border-top-color": "",
				"border-bottom-color": "",
				"border-right-color": ""
			});

			if (!self.options.calloutFilled) {
				switch (arrCalloutSharp[0]) {
				case "l":
					innerCallout.css("border-right-color", borderColor);
					break;
				case "t":
					innerCallout.css("border-bottom-color", borderColor);
					break;
				case "r":
					innerCallout.css("border-left-color", borderColor);
					break;
				case "b":
					innerCallout.css("border-top-color", borderColor);
					break;
				}
			}
		},

		_showTooltip: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				showAnimation,
				animations, curPos,
				closeBtn = tooltip && tooltip._closeBtn,
				callout = tooltip && tooltip._callout;

			if (!tooltip) {
				return;
			}


			if (self._trigger("showing", null, self) === false) {
				return;
			}


			if (closeBtn) {
				closeBtn[o.closeBehavior === "sticky" ? "show" : "hide"]();
			}

			if (callout) {
				callout[o.showCallout ? "show" : "hide"]();
			}

			self._showModalLayer();
			tooltip.css("z-index", 99999);

			if ($.fn.wijshow) {
				animations = {
					show: true,
					context: tooltip
				};

				showAnimation = $.extend({}, o.animation, o.showAnimation);

				if (tooltip.is(":visible")) {
					curPos = tooltip.offset();
					tooltip.offset(oldTipPos);
					$.extend(animations, { pos: curPos });
					showAnimation.animated = "tooltipSlide";
				}
				tooltip.wijshow(showAnimation, $.wijmo.wijtooltip.animations,
					animations, null, function () {
						self._trigger("shown");
					});
			} else {
				tooltip.show();
				self._trigger("shown");
			}
			self._setCalloutOffset(false);
		},

		_hideTooltip: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				hideAnimation = $.extend({}, o.animation, o.hideAnimation),
				animations;

			if (!tooltip) {
				return;
			}

			if (self._trigger("hiding", null, self) === false) {
				return;
			}

			self._hideModalLayer();

			if ($.fn.wijhide) {
				animations = {
					show: false,
					context: tooltip
				};
				tooltip.wijhide(hideAnimation, $.wijmo.wijtooltip.animations,
				animations, null, function () {
					self._trigger("hidden");
					tooltip.css("z-index", "");
				});
			} else {
				tooltip.hide();
				self._trigger("hidden");
				tooltip.css("z-index", "");
			}
		},

		_getContent: function (content) {
			var obj = { data: "" }, retValue;
			if ($.isFunction(content)) {
				retValue = content.call(this.element, obj);
				if (obj.data !== "") {
					return obj.data;
				}
				else {
					return retValue;
				}
			} else if (window[content] &&
					$.isFunction(window[content])) {
				// if window[content/title] is a function, then get the
				// function value.
				retValue = window[content].call(this.element, obj);
				if (obj.data !== "") {
					return obj.data;
				}
				else {
					return retValue;
				}
			}
			return content;
		},

		_setText: function () {
			var self = this,
				o = self.options,
				tooltip = self._tooltip,
				content = "",
				title = "",
				jqTitle = tooltip && tooltip._title;

			if (!tooltip) {
				return;
			}

			content = self._getContent(o.content);
			content = content === "" ? self._content : content;
			tooltip._container.html(content);

			title = self._getContent(o.title);

			if (title !== "") {
				jqTitle.html(title).show();
			} else {
				jqTitle.hide();
			}
		},

		_showModalLayer: function () {
			var self = this,
				modalLayer = null;

			if (self.options.modal) {
				modalLayer = $("<div>")
					.addClass("ui-widget-overlay")
					.css("z-index", 99000)
					.width(self._getDocSize("Width"))
					.height(self._getDocSize("Height"))
					.appendTo("body");

				$(window).bind("resize.wijtooltip", function () {
				    modalLayer.width(self._getDocSize("Width"))
                        .height(self._getDocSize("Height"));
				});

				self._tooltip._modalLayer = modalLayer;
			}
		},

		_hideModalLayer: function () {
			var self = this,
				modalLayer = self._tooltip._modalLayer;

			if (modalLayer) {
				modalLayer.css("z-index", "")
					.remove();

				$(window).unbind("resize.wijtooltip");
			}
		},

		_getDocSize: function (name) {
			var scrollValue,
				offsetValue,
				de = "documentElement",
				body = "body";

			// handle IE 6
			if ($.browser.msie && $.browser.version < 9) {
				scrollValue = max(
					doc[de]["scroll" + name],
					doc[body]["scroll" + name]
				);

				offsetValue = max(
					doc[de]["offset" + name],
					doc[body]["offset" + name]
				);

				return (scrollValue < offsetValue ?
					($(win)[name.toLowerCase()]() + 'px') :
					scrollValue + 'px');
			} else {
				return $(doc)[name.toLowerCase()]() + 'px';
			}
		},

		//begin event handler methods
		_onClickCloseBtn: function (e) {
			this.hide();
			e.preventDefault();
		}
		//end event handler methods	
	});

	$.extend($.wijmo.wijtooltip, {
		animations: {
			fade: function (options, additions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, additions);
				options.context.stop(true, true).animate(options.show ?
				{ opacity: 'show'} : { opacity: 'hide' }, options);
			},
			tooltipSlide: function (options, additions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, additions);
				options.context.stop(true, true).animate({
					left: options.pos.left,
					top: options.pos.top
				}, options);
			}
		},

		_tooltips: {},

		_getTooltip: function (key) {
			return $.wijmo.wijtooltip._tooltips[key];
		},

		_removeTooltip: function (key) {
			var tooltip = $.wijmo.wijtooltip._tooltips[key];

			if (tooltip) {
				tooltip.count--;

				if (tooltip.count <= 0) {
					tooltip.remove();
					$.wijmo.wijtooltip._tooltips[key] = null;
				}


				//tooltip = null;
			}
		}
	});
} (jQuery));
