/*globals window document clearTimeout setTimeout jQuery */
/*
*
* Wijmo Library 1.0.0
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
*
* Wijmo Tooltip widget.
* 
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
"use strict";
(function ($) {
	$.widget("wijmo.wijtooltip", {
		options: {
			/// <summary>
			/// A value that sets the tooltip's content.
			/// Remarks:The value can be a string,html code,or a function.If it's a
			/// function,then the content will be the function's return value.
			/// Type:String or Function.
			/// Default:"".
			/// Code example:$(".selector").wijtooltip("option","content","my content").
			/// </summary>
			content: '',
			/// <summary>
			/// Specifies a value that sets the tooltip's title
			/// Type:String or Function.
			/// Default:"".
			/// Code example:$(".selector").wijtooltip("option","title","my title");
			/// Remark:The value can be a string,HTML,or a function.If it is a function,
			/// then the content will be the function's return value.
			/// </summary>
			title: "",
			/// <summary>
			/// A value that determines how to close the tooltip.
			/// Behaviors include auto or sticky.
			/// Type:String.
			/// Default:"auto".
			/// Code example:$(".selector").wijtooltip("option","closeBehavior","auto").
			/// </summary>
			closeBehavior: 'auto',
			/// <summary>
			/// If true,then the tooltip moves with the mouse.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtooltip("option","mouseTrailing",false).
			/// </summary>
			mouseTrailing: false,
			/// <summary>
			/// Sets the show tooltip's event
			/// Remarks:The value should be 'hover','click','focus','rightClick','custom'.
			/// Type:String
			/// Default:"hover".
			/// Code example:$(".selector").wijtooltip("option","triggers","hover").
			/// </summary>
			triggers: 'hover',
			/// <summary>
			/// Sets the tooltip's position mode .For example here is the jQuery ui 
			/// position's position:{my:'top left',at:'right buttom',offset:null}. 
			/// Type:Object.
			/// Default:{
			///	my: 'left bottom',
			///	at: 'right top',
			///	offset: null
			/// }
			/// Code expamle:$(".selector").wijtooltip("option","position",
			///{my: 'left bottom',at: 'right top',offset: '0 0'}).
			/// </summary>
			position: {
				my: 'left bottom',
				at: 'right top',
				offset: null
			},
			/// <summary>
			/// Determines whether to show the callout element.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtooltip("option","showCallout",true).
			/// </summary>
			showCallout: true,
			/// <summary>
			/// Determines the animation effect that will be shown.
			/// Remarks:This should be an object value.Possible values include:'animated',
			/// 'duration',and 'easing'.This property works with jQuery animation.
			/// Type:Object.
			/// Default:{animated: 'fade',duration:500}.
			/// Code example:$(".selector").wijtooltip("option","showAnimation",
			/// {animated:fade,duration:500}).
			/// </summary>
			showAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			/// Determines the animation effect that will be hidden.
			/// Remarks:This should be an object value,like the showAnimation property.
			/// If 'animated' set to false. then hide the tooltip without animation.
			/// Type:Object.
			/// Default:{animated: 'fade',duration:500}.
			/// Code example:$(".selector").wijtooltip("option","hideAnimation",
			/// {animated:'fade',duration:500}).
			/// </summary>
			hideAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			/// Determines the length of the delay before the tooltip appears.
			/// Type:Number
			/// Default:0.
			/// Code example:$(".selector").wijtooltip("option","showDelay",200).
			/// </summary>
			showDelay: 150,
			/// <summary>
			/// Determines the length of the delay before the tooltip disappears.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtooltip("option","hideDelay",200).
			/// </summary>
			hideDelay: 150,
			/// <summary>
			/// Sets the callout's offset changing animation.
			/// Remarks:The value is an object,
			/// like the following:{duration:100,easing:'swing'}.
			/// Type:Object.
			/// Default:{}.
			/// Code example:$(".selector")
			/// .wijtooltip("option","calloutAnimation",{duration:200}).
			/// </summary>
			calloutAnimation: {},
			/// <summary>
			/// Determines the callout's class style.If true,
			/// then the callout triangle will be filled.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtooltip("option","calloutFilled",true).
			/// </summary>
			calloutFilled: true,

			modal: false

		},
		_setOption: function (key, value) {
			var self = this;
			if ($.isPlainObject(value)) {
				value = $.extend(self.options[key], value);
			}
			//console.log(value);
			if (key === "position") {
				self.element.data("oldPos", self.options[key]);
			}
			$.Widget.prototype._setOption.apply(self, arguments);
			if ($.isFunction(self["_set_" + key])) {
				self["_set_" + key](value);
			}
		},
		_setPositionOffset: function (flag) {
			var self = this, 
			callout = self.element.data("domElements").callout, calloutAnimation,
			arrowClass, horition, arr, value, offset, array,
			o = self.options;
			callout.stop(true, true);
			calloutAnimation = $.extend({ duration: 1000 }, 
			o.calloutAnimation);
			//var tooltip = this.element.data("tooltip");
			arrowClass = self.element.data("arrowClass")
			.replace(/wijmo-wijtooltip-arrow-/, "");
			horition = false;
			arr = ["tr", "tc", "tl", "bl", "bc", "br"];
			$.each(arr, function (i, n) {
				if (arrowClass === n) {
					horition = true;
				}
			});
			value = "";
			offset = o.position.offset;
			if (offset) {
				array = offset.split(" ");
				if (array.length === 2) {
					if (horition) {
						value = array[0];
					}
					else {
						value = array[1];
					}
				}
			}
			if (value !== "") {
				if (flag) {
					if (horition) {
						callout.css("left", value + "px");
					}
					else {
						callout.css("top", value + "px");
					}
				}
				else {
					if (horition) {
						callout.animate({ left: value },
						calloutAnimation.duration, calloutAnimation.easing);
					}
					else {
						callout.animate({ top: value },
						calloutAnimation.duration, calloutAnimation.easing);
					}
				}

			}
		},

		_set_triggers: function () {
			this._attachEventToElement();
		},

		_set_position: function (value) {
			var self = this, oldpos;
			if (self.options.showCallout) {
				if (!self.isCreateTooltip) {
					self._createTooltip();
					self.isCreateTooltip = true;
				}
				oldpos = self.element.data("oldPos");
				if (oldpos.my !== value.my || oldpos.at !== value.at) {
					self._setCalloutCss();
					self._setposition();
				}
				self._setPositionOffset();
			}

		},

		_removeCalloutCss: function () {
			var ele = this.element.data("tooltip");
			if (ele) {
				ele.removeClass("wijmo-wijtooltip-arrow-tr " +
				"wijmo-wijtooltip-arrow-tc wijmo-wijtooltip-arrow-tl " +
				"wijmo-wijtooltip-arrow-br wijmo-wijtooltip-arrow-bc " +
				"wijmo-wijtooltip-arrow-bl wijmo-wijtooltip-arrow-rb " +
				"wijmo-wijtooltip-arrow-rc wijmo-wijtooltip-arrow-rt " +
				"wijmo-wijtooltip-arrow-lb wijmo-wijtooltip-arrow-lc " +
				"wijmo-wijtooltip-arrow-lt");
			}
		},

		_set_showCallOut: function (value) {
			var self = this, domElement;
			self._removeCalloutCss();
			domElement = self.element.data("domElements");
			if (value) {
				if (!self.isCreateTooltip) {
					self._createTooltip();
					self.isCreateTooltip = true;
				}
				self._setCalloutCss();
				if (domElement) {
					domElement.callout.show();
				}
			}
			else {
				if (domElement) {
					domElement.callout.hide();
				}
			}
		},
		_set_closeBehavior: function () {
			var self = this;
			if (!self.isCreateTooltip) {
				self._createTooltip();
				self.isCreateTooltip = true;
			}
			self._setCloseBtnCss();
		},
		_set_mouseTrailing: function () {
			this.element.unbind(".tooltip");
			this._attachEventToElement();
		},

		destroy: function () {
			/// <summary>Removes the wijtooltip functionality completely.
			///This returns the element back to its pre-init state.</summary>
			var self = this, ele = self.element;
			ele.unbind(".tooltip");
			self.isCreateTooltip = false;
			$.Widget.prototype.destroy.apply(self);
			if (ele.data("tooltip")) {
				ele.data("tooltip").remove();
			}
			ele.attr("title", self.title);
			ele.removeData("tooltip").removeData("arrowClass")
			.removeData("domElements").removeData("fixedArrowClass").removeData("offset")
			.removeData("oldPos").removeData("showDelay");
		},

		widget: function () {
			return this.element.data("tooltip") || this.element;
		},

		_create: function () {
			var self = this, o = self.options, ele = self.element;
			ele.data("oldPos", o.position);
			o.position.of = ele;
			self._attachEventToElement();
			ele.data("offset", o.position.offset);
			self.isCreateTooltip = false;
		},

		_createTooltip: function () {
			var self = this, domElement, tooltip, ele = self.element;
			self._setStructure();
			self._initializeDomElements();
			domElement = ele.data("domElements");
			tooltip = ele.data("tooltip");
			if (ele.attr("id") !== "") {
				tooltip.attr("aria-describedby", ele.attr("id"));
			}
			tooltip.hide();
			self._setCalloutCss();
			if (self.options.showCallout) {
				domElement.callout.show();
			}
			else {
				domElement.callout.hide();
			}
		},

		_setStructure: function () {
			var tooltip = $("<div>"), self = this,			
			container = $("<div class='wijmo-wijtooltip-container'>"),
			callout = $("<div class='ui-widget-content wijmo-wijtooltip-pointer '>" +
			"<div class='wijmo-wijtooltip-pointer-inner'></div></div>"),
			title = $("<div>"),
			closebtn = $("<a href='#'></a>"),
			closespan = $("<span>");
			tooltip.addClass("wijmo-wijtooltip");
			closebtn.addClass("wijmo-wijtooltip-close ui-state-default ui-corner-all");
			closespan.addClass("ui-icon ui-icon-close");
			closebtn.append(closespan);
			self.element.data("domElements", {
				container: container,
				callout: callout,
				closebtn: closebtn,
				title: title
			});
			//jga            title.append(closebtn);
			title.addClass("wijmo-wijtooltip-title ui-widget-header ui-corner-all");
			tooltip.append(title);
			tooltip.append(closebtn);
			tooltip.append(container);
			tooltip.append(callout);
			tooltip.addClass("ui-widget ui-widget-content ui-corner-all");
			//container.addClass("ui-widget-content");
			tooltip.css("position", "absolute").attr("role", "tooltip");
			tooltip.appendTo("body");
			self.element.data("tooltip", tooltip);
			self._setCloseBtnCss();
		},

		_setCloseBtnCss: function () {
			var domElement = this.element.data("domElements");
			if (this.options.closeBehavior === "sticky") {
				domElement.closebtn.show();
			}
			else {
				domElement.closebtn.hide();
			}
		},

		_setCalloutCss: function () {
			var self = this,
			o = this.options, my = o.position.my, arrat, oldcss,
			arr = my.split(" "), cssname = '', tooltip;
			if (!o.showCallout) {
				o.position.offset = self.element.data("offset");
				return;
			}
			if (arr.length === 2) {
				cssname += arr[0].substr(0, 1);
				cssname += arr[1].substr(0, 1);
			}
			arrat = o.position.at.split(" ");
			if (arr[0] === arrat[0]) {
				if ((arr[1] === 'top' && arrat[1] === 'bottom') || 
				(arr[1] === 'bottom' && arrat[1] === 'top')) {
					cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
				}
			}
			else if (arrat[0] === 'center') {
				cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
			}
			if (cssname.substr(0, 1) === 'c') {
				cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
			}
			if (self.element.data('arrowClass')) {
				oldcss = self.element.data('arrowClass');
				oldcss = oldcss.substr(oldcss.length - 2, 1);
			}
			cssname = 'wijmo-wijtooltip-arrow-' + cssname;
			tooltip = self.element.data("tooltip");
			self._removeCalloutCss();
			tooltip.addClass(cssname);
			self.element.data("arrowClass", cssname);

		},

		_initializeDomElements: function () {
			var self = this,
			tooltip = self.element.data("tooltip");
			tooltip.bind("mouseout", $.proxy(self._onMouseOutTooltipElement, self));
			tooltip.bind("mouseover", $.proxy(self._onMouseOverTooltipElement, self));
			self.element.data("domElements").closebtn
			.bind("click", $.proxy(self._onClickCloseBtn, self));
		},

		_attachEventToElement: function () {
			var self = this, o = self.options, ele = self.element;
			if (self.title === undefined) {
				self.title = ele.attr("title");
				ele.attr("title", "");
			}
			
			ele.unbind('.tooltip');
			if (o.mouseTrailing) {
				ele.bind("mousemove.tooltip", function () {
					self._setposition();
					self.show();
				});
			}

			switch (o.triggers) {
			case "hover":
				ele.bind("mouseover.tooltip", function () {
					self.show();
				}).bind("mouseout.tooltip", function () {
					if (o.closeBehavior === "sticky" || o.modal ||
					o.closeBehavior === "none") {
						return;
					}
					self.hide();
				});
				break;
			case "click":
				ele.bind("click.tooltip", function () {
					self.show();
				});
				break;
			case "focus":
				ele.bind("focus.tooltip", function () {
					self.show();
				}).bind("blur.tooltip", function () {
					if (o.closeBehavior === "sticky") {
						return;
					}
					self.hide();
				});
				break;
			case "rightClick":
				ele.bind("contextmenu.tooltip", function (e) {
					self.show();
					e.preventDefault();
				});
				break;
			case "custom":
				break;
			}
		},

		///judgy if the point is in element
		_isPointInsideRectWithOutBorder: function (point, _element) {
			var obj = $(_element),
			bnd = {
				X: obj.offset().left,
				Y: obj.offset().top,
				Width: obj.outerWidth(true),
				Height: obj.outerHeight(true)
			};
			if (point.X <= bnd.X || point.X >= (bnd.X + bnd.Width)) {
				return false;
			}
			if (point.Y <= bnd.Y || point.Y >= (bnd.Y + bnd.Height)) {
				return false;
			}
			return true;
		},

		// end tooltip mouse events
		_onMouseOutTooltipElement: function (e) {
			var self = this, o = self.options;
			if (o.closeBehavior === "sticky" ||
			o.closeBehavior === "none") {
				return;
			}
			if (!self._isPointInsideRectWithOutBorder({
				X: e.pageX,
				Y: e.pageY
			}, self.element.data("tooltip"))) {
				self.hide();
			}
		},

		_onMouseOverTooltipElement: function (e) {
			var self = this, o = self.options, ele = self.element;
			if (o.closeBehavior === "auto" && !o.mouseTrailing) {
				if (!ele.data("currentElement") ||
				self._isPointInsideRectWithOutBorder({
					X: e.pageX,
					Y: e.pageY
				}, ele.data("currentElement"))) {
					self.hide();
				}
			}
		},

		_onClickCloseBtn: function (e) {
			this.hide();
			e.preventDefault();
		},
		//begin tooltip mouse events

		//end tooltip mouse events
		_setposition: function () {
			var self = this, o = self.options, ele = self.element,
			tooltip = ele.data("tooltip"),
			isHidden = tooltip.is(":hidden"), option, offsetstr, arrowClass, str, strArr,
			offset, callout, borderTop, borderLeft, borderRight, borderBottom,
			top, left, right, bottom, position;
			if (isHidden) {
				tooltip.show();
			}
			option = $.extend(o.position, {});
			tooltip.css({ left: 0, top: 0 });
			//if (!this.element.data("fixed")) {
			offsetstr = "";
			if (o.showCallout) {
				arrowClass = ele.data("arrowClass");
				str = arrowClass.substr(arrowClass.length - 2, 2);
				strArr = str.split("");
				offset = [];
				//----change the position offset to set the callout.
				//offset[0] = parseInt(offset[0]);
				//offset[1] = parseInt(offset[1]);
				offset[0] = offset[1] = 0;
				//console.log(arrowClass);
				callout = ele.data("domElements").callout;
				borderTop = callout.css("border-top-width")
				.replace(/px/g, '') * 1;
				borderLeft = callout.css("border-left-width")
				.replace(/px/g, '') * 1;
				borderRight = callout.css("border-right-width")
				.replace(/px/g, '') * 1;
				borderBottom = callout.css("border-bottom-width")
				.replace(/px/g, '') * 1;
				top = callout.css("top").replace(/px/g, '') * 1;
				left = callout.css("left").replace(/px/g, '') * 1;
				right = callout.css("right").replace(/px/g, '') * 1;
				bottom = callout.css("bottom").replace(/px/g, '') * 1;

				switch (strArr[0]) {
				case "l":
					offset[0] = borderRight;
					break;
				case "r":
					offset[0] = -borderLeft;
					break;
				case "b":
					offset[1] = bottom;
					break;
				case "t":
					offset[1] = -top;
					break;
				}
				switch (strArr[1]) {
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
				offsetstr = offset.join(" ");
				//}
			}
			tooltip.position({ my: option.my, at: option.at, of: option.of,
			 offset: offsetstr, collision: 'none none' });
			position = tooltip.offset();
			tooltip.css({ left: 0, top: 0 });
			ele.data("fixedArrowClass", false);
			tooltip.position({ my: option.my, at: option.at, of: option.of,
			 offset: offsetstr, collision: option.collision });
			if (o.showCallout) {
				self._calloutflip(position);
				self._set_unfilledCallout();
			}
			if (isHidden && !(o.relativeTo === "mouse" &&
			o.mouseTrailing)) {
				tooltip.hide();
			}
		},

		_set_unfilledCallout: function (calloutCss) {
			var self = this, ele = self.element, tooltip = ele.data("tooltip"),
			domObject = ele.data("domElements"),
			innerCallout = domObject.callout.children();
			if (!calloutCss) {
				calloutCss = ele.data("arrowClass");
				if (ele.data("fixedArrowClass")) {
					calloutCss = ele.data("fixedArrowClass");
				}
			}
			innerCallout.css({
				"border-left-color": "",
				"border-top-color": "",
				"border-bottom-color": "",
				"border-right-color": ""
			});
			if (self.options.calloutFilled) {
				switch (calloutCss) {
				case "lt":
				case "lc":
				case "lb":
					innerCallout.css("border-right-color", 
					tooltip.css("background-color"));
					break;
				case "tl":
				case "tc":
				case "tr":
					innerCallout.css("border-bottom-color", 
					tooltip.css("background-color"));
					break;
				case "rt":
				case "rc":
				case "rb":
					innerCallout.css("border-left-color", 
					tooltip.css("background-color"));
					break;
				case "bl":
				case "bc":
				case "br":
					innerCallout.css("border-top-color", 
					tooltip.css("background-color"));
					break;
				}
			}
		},

		_calloutflip: function (position) {
			var self = this, ele = self.element, tooltip = ele.data("tooltip"),
			changeset = { left: false, top: false }, o = self.options,
			win = $(window), over, cssname;
			if (o.position.at[0] !== 'center') {
				if (position.left < 0) {
					changeset.left = true;
				}
				over = position.left + tooltip.width() - win.width() - win.scrollLeft();
				if (over > 0) {
					changeset.left = true;
				}
			}
			if (o.position[1] !== 'center') {
				over = position.top + tooltip.height() - win.height() - win.scrollTop();
				if (position.top < 0) {
					changeset.top = true;
				}
				if (over > 0) {
					changeset.top = true;
				}
			}
			cssname = ele.data("arrowClass");
			cssname = cssname.substr(cssname.length - 2, 2);
			if (changeset.left) {
				if (cssname.indexOf('l') > -1) {
					cssname = cssname.replace(/l/, 'r');
				}
				else if (cssname.indexOf('r') > -1) {
					cssname = cssname.replace(/r/, 'l');
				}
			}
			if (changeset.top) {
				if (cssname.indexOf('t') > -1) {
					cssname = cssname.replace(/t/, 'b');
				}
				else if (cssname.indexOf('b') > -1) {
					cssname = cssname.replace(/b/, 't');
				}
			}
			if (changeset.left || changeset.top) {
				self._removeCalloutCss();
				tooltip.addClass("wijmo-wijtooltip-arrow-" + cssname);
			}
			ele.data("fixedArrowClass", cssname);
		},
		_showTooltip: function () {
			var self = this, ele = self.element, 
			o = self.options, aimateOptions, animations, duration, easing,
			ea = {
				ui: self,
				cancel: false
			},
			tooltip = ele.data("tooltip");
			if (!tooltip) {
				return;
			}
			self._trigger("showing", ea);
			if (ea.cancel) {
				return;
			}
			self._showModal();
			tooltip.css("z-index", 99999);
			if (o.showAnimation.animated && !o.mouseTrailing) {
				aimateOptions = {
					show: true,
					context: tooltip,
					complete: function () {
						self._trigger("shown");
					}
				};
				animations = $.wijmo.wijtooltip.animations;
				duration = o.showAnimation.duration;
				easing = o.showAnimation.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'fade';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](o.showAnimation, aimateOptions);
			}
			else {
				tooltip.show();
				self._trigger("shown");
			}
			self._setPositionOffset(true);
			//this._setCalloutOffset();
		},
		_hideTooltip: function () {
			var self = this, o = self.options,
			ea = new $.Event('hidding.tooltip'), tooltip, aimateOptions,
			animations, duration, easing;
			ea.data = {
				ui: self,
				cancel: false
			};
			self._trigger("hidding");
			if (ea.data.cancel) {
				return;
			}
			self._hideModal();
			tooltip = self.element.data("tooltip");
			if (!tooltip) {
				return;
			}
			if (o.hideAnimation.animated) {
				aimateOptions = {
					show: false,
					context: tooltip,
					complete: function () {
						self._trigger("hidden");
						tooltip.css("z-index", "");
					}
				};
				animations = $.wijmo.wijtooltip.animations;
				duration = o.hideAnimation.duration;
				easing = o.hideAnimation.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'fade';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](o.hideAnimation, aimateOptions);
			}
			else {
				tooltip.hide();
				self._trigger("hidden");
				tooltip.css("z-index", "");
			}
		},
		_setText: function () {
			var self = this, ele = self.element, 
			domElement = ele.data("domElements"), strtitle, strret, title, titlevalue,
			content = self.options.content;
			if ($.isFunction(content)) {
				strret = content.call(ele, function (data) {
					if (data) {
						domElement.container.html(data);
					}
				});
				if (strret) {
					domElement.container.html(strret);
				}
			}
			else {
				if (content !== "") {
					domElement.container.html(content);
				}
				else {

					domElement.container.html(ele ?
					self.title : '');
				}
			}

			domElement.title.show();
			title = self.options.title;
			titlevalue = "";
			if ($.isFunction(title)) {
				strtitle = title.call(ele, function (data) {
					if (data) {
						titlevalue = data;
					}
				});
				if (strtitle) {
					titlevalue = strtitle;
				}
			}
			else {
				if (title !== "") {
					titlevalue = title;
				}
			}
			if (titlevalue !== "") {
				domElement.title.show();
				domElement.title.html(titlevalue);
			}
			else {
				domElement.title.hide();
			}
		},

		_getDocHeight: function () {
			var scrollHeight,
			offsetHeight;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
				offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

				if (scrollHeight < offsetHeight) {
					return $(window).height() + 'px';
				} else {
					return scrollHeight + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).height() + 'px';
			}
		},

		_getDocWidth: function () {
			var scrollWidth,
			offsetWidth;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);

				if (scrollWidth < offsetWidth) {
					return $(window).width() + 'px';
				} 
				else {
					return scrollWidth + 'px';
				}
			} 
			else {
				return $(document).width() + 'px';
			}
		},

		_showModal: function () {
			var self = this, modalDiv;
			if (self.options.modal) {
				modalDiv = $("<div>");
				modalDiv.addClass("ui-widget-overlay")
				.css("z-index", 99000)
				.width(self._getDocWidth()).height(self._getDocHeight());
				modalDiv.appendTo("body");
				self.element.data("modalDiv", modalDiv);
			}
		},

		_hideModal: function () {
			if (this.element.data("modalDiv")) {
				this.element.data("modalDiv").css("z-index", "").remove();
			}
		},

		//begin public methods
		show: function () {
			/// <summary>Shows the tooltip</summary>
			var self = this, tooltip, ele = self.element;
			if (!self.isCreateTooltip) {
				self._createTooltip();
				self.isCreateTooltip = true;
			}
			tooltip = ele.data("tooltip");
			tooltip.stop(true, true);
			self._setText();
			//this._setheight();

			if (ele.data("arrowClass")) {
				tooltip.removeClass(ele.data("arrowClass"));
			}
			self._setCalloutCss();
			//tooltip.hide();
			self._setposition();
			clearTimeout(ele.data("showDelay"));
			//this.element.show();
			ele.data("showDelay", 
			setTimeout($.proxy(self._showTooltip, self), self.options.showDelay));
			//this._showTooltip();
			//var self = this;
			//var calloutInner = self.element.data("domElements")
			//.callout.children().first();

		},
		showAt: function (point) {
			/// <summary>show the tooltip at a point position</summary>
			/// <param name="point" type="Object">It's a point.
			///the value should like{x:0,y:0}</param>
			var tooltip, borderRight, borderBottom, self = this, ele = self.element,
			offsetx, offsety, calloutcss, callout, borderTop, borderLeft,
			borderh, borderv, offset, width, height, collision, newCss, arr;

			if (!self.isCreateTooltip) {
				self._createTooltip();
				self.isCreateTooltip = true;
			}
			tooltip = ele.data("tooltip");
			tooltip.stop(true, true);
			self._setText();
			//this._setheight();
			tooltip.offset({ left: 0, top: 0 });
			tooltip.show();
			offsetx = 0;
			offsety = 0;
			calloutcss = ele.data("arrowClass");
			callout = ele.data("domElements").callout;
			offsetx = callout.position().left;
			offsety = callout.position().top;
			borderTop = callout.css("border-top-width").replace(/px/g, '') * 1;
			borderLeft = callout.css("border-left-width")
			.replace(/px/g, '') * 1;
			borderRight = callout.css("border-right-width")
			.replace(/px/g, '') * 1;
			borderBottom = callout.css("border-bottom-width")
			.replace(/px/g, '') * 1;
			borderh = borderLeft === 0 ? borderRight : borderLeft;
			borderv = borderTop === 0 ? borderBottom : borderTop;
			offset = {};
			width = tooltip.width();
			height = tooltip.height();
			collision = (self.options.position.collision || "flip").split(" ");
			if (collision.length === 1) {
				collision[1] = collision[0];
			}
			switch (calloutcss) {
			case "wijmo-wijtooltip-arrow-rt":
				offset.left = point.x - width - borderh;
				offset.top = point.y - offsety;
				break;
			case "wijmo-wijtooltip-arrow-rc":
				offset.left = point.x - width - borderh;
				offset.top = point.y - height / 2;
				break;
			case "wijmo-wijtooltip-arrow-rb":
				offset.left = point.x - width - borderh;
				offset.top = point.y - offsety - borderv;
				break;
			case "wijmo-wijtooltip-arrow-lt":
				offset.left = point.x + borderh;
				offset.top = point.y - offsety;
				break;
			case "wijmo-wijtooltip-arrow-lc":
				offset.left = point.x - offsetx;
				offset.top = point.y - height / 2;
				break;
			case "wijmo-wijtooltip-arrow-lb":
				offset.left = point.x - offsetx;
				offset.top = point.y - offsety - borderv;
				break;
			case "wijmo-wijtooltip-arrow-tl":
				offset.left = point.x - offsetx;
				offset.top = point.y - offsety;
				break;
			case "wijmo-wijtooltip-arrow-tc":
				offset.left = point.x - width / 2;
				offset.top = point.y - offsety;
				break;
			case "wijmo-wijtooltip-arrow-tr":
				offset.left = point.x - offsetx - borderh;
				offset.top = point.y - offsety;
				break;
			case "wijmo-wijtooltip-arrow-bl":
				offset.left = point.x - offsetx;
				offset.top = point.y - height - borderv;
				break;
			case "wijmo-wijtooltip-arrow-bc":
				offset.left = point.x - width / 2;
				offset.top = point.y - height - borderv;
				break;
			case "wijmo-wijtooltip-arrow-br":
				offset.left = point.x - offsetx - borderh;
				offset.top = point.y - height - borderv;
				break;
			}
			//console.log(offset);
			newCss = self._showAtflip(calloutcss, offset);
			///let the position out of the target element.
			arr = [];
			arr[0] = newCss.substr(0, 1);
			arr[1] = newCss.substr(1, 1);
			$.each(arr, function (i, n) {
				switch (n) {
				case "l":
					offset.left += 1;
					break;
				case "r":
					offset.left -= 1;
					break;
				case "t":
					offset.top += 1;
					break;
				case "b":
					offset.top -= 1;
					break;
				}
			});
			//console.log(offset);
			self._set_unfilledCallout(newCss);
			tooltip.offset(offset);
			tooltip.hide();
			ele.data("showDelay", 
			setTimeout($.proxy(self._showTooltip, self), self.options.showDelay));

		},

		_showAtflip: function (calloutcss, offset) {
			var self = this, ele = self.element,
			collision = (self.options.position.collision || "flip").split(" "),
			cssname, tooltip, width, height, callout, borderTop, borderLeft,
			borderRight, borderBottom, win;
			if (collision[0] !== "flip" && collision[1] !== "flip") {
				return;
			}
			cssname = calloutcss.substr(calloutcss.length - 2, 2);
			tooltip = ele.data("tooltip");
			width = tooltip.width();
			height = tooltip.height();
			callout = ele.data("domElements").callout;
			borderTop = callout.css("border-top-width").replace(/px/g, '') * 1;
			borderLeft = callout.css("border-left-width")
			.replace(/px/g, '') * 1;
			borderRight = callout.css("border-right-width")
			.replace(/px/g, '') * 1;
			borderBottom = callout.css("border-bottom-width")
			.replace(/px/g, '') * 1;
			win = $(window);
			if (collision[1] === "flip") {
				if (cssname.indexOf('t') > -1) {
					if (offset.top + height > win.height()) {
						offset.top -= (height + borderBottom * 2);
						cssname = cssname.replace(/t/, 'b');
					}
				}
				if (cssname.indexOf('b') > -1) {
					if (offset.top < 0) {
						offset.top += (height + borderTop * 2);
						cssname = cssname.replace(/b/, 't');
					}
				}
			}
			if (collision[0] === "flip") {
				if (cssname.indexOf('l') > -1) {
					if (offset.left + width > win.width()) {
						offset.left -= (width + borderRight * 2);
						cssname = cssname.replace(/l/, 'r');
					}
				}
				if (cssname.indexOf('r') > -1) {
					if (offset.left - borderRight < 0) {
						offset.left += (width + borderLeft * 2);
						cssname = cssname.replace(/r/, 'l');
					}
				}
			}
			self._removeCalloutCss();
			tooltip.addClass("wijmo-wijtooltip-arrow-" + cssname);
			return cssname;
		},

		hide: function () {
			/// <summary>Hides the tooltip</summary>
			var self = this, ele = self.element;
			clearTimeout(ele.data("showDelay"));
			clearTimeout(ele.data("hideDelay"));
			ele.data("hideDelay", 
			setTimeout($.proxy(self._hideTooltip, self), self.options.hideDelay));
			//this._hideTooltip();
		}

		//end public methods

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
			}
		}
	});
}(jQuery));
