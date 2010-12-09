/*globals window document clearTimeout setTimeout jQuery */
/*
*
* Wijmo Library 0.9.0
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
*   jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
"use strict";
(function ($) {
	$.widget("wijmo.wijtooltip", {
		options: {
			/// <summary>
			///A value that sets the tooltip's content.
			///Remarks:The value can be a string,html code,or a function.If it's a
			/// function,then the content will be the function's return value.
			///Type:String or Function.
			///Default:"".
			///Code example:$(".selector").wijtooltip("option","content","my content").
			///</summary>
			content: '',
			/// <summary>
			///Specifies a value that sets the tooltip's title
			///Type:String or Function.
			///Default:"".
			///Code example:$(".selector").wijtooltip("option","title","my title");
			///Remark:The value can be a string,HTML,or a function.If it is a function,
			///then the content will be the function's return value.
			///</summary>
			title: "",
			/// <summary>
			/// A value that determines how to close the tooltip.
			///Behaviors include auto or sticky.
			///Type:String.
			///Default:"auto".
			///Code example:$(".selector").wijtooltip("option","closeBehavior","auto").
			///</summary>
			closeBehavior: 'auto',
			/// <summary>
			///If true,then the tooltip moves with the mouse.
			///Type:Boolean.
			///Default:false.
			///Code example:$(".selector").wijtooltip("option","mouseTrailing",false).
			///</summary>
			mouseTrailing: false,
			/// <summary>
			///Sets the show tooltip's event
			///Remarks:The value should be 'hover','click','focus','rightClick','custom'.
			///Type:String
			///Default:"hover".
			///Code example:$(".selector").wijtooltip("option","triggers","hover").
			///</summary>
			triggers: 'hover',
			/// <summary>
			///Sets the tooltip's position mode .For example here is the jQuery ui 
			///position's position:{my:'top left',at:'right buttom',offset:null}. 
			///Type:Object.
			///Default:{
			///	my: 'left bottom',
			///	at: 'right top',
			///	offset: null
			///}
			///Code expamle:$(".selector").wijtooltip("option","position",
			///{my: 'left bottom',at: 'right top',offset: '0 0'}).
			///</summary>
			position: {
				my: 'left bottom',
				at: 'right top',
				offset: null
			},
			/// <summary>
			///Determines whether to show the callout element.
			///Type:Boolean.
			///Default:true.
			///Code example:$(".selector").wijtooltip("option","showCallout",true).
			///</summary>
			showCallout: true,
			/// <summary>
			///Determines the animation effect that will be shown.
			///Remarks:This should be an object value.Possible values include:'animated',
			///'duration',and 'easing'.This property works with jQuery animation.
			///Type:Object.
			///Default:{animated: 'fade',duration:500}.
			///Code example:$(".selector").wijtooltip("option","showAnimation",
			///{animated:fade,duration:500}).
			///</summary>
			showAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			////Determines the animation effect that will be hidden.
			///Remarks:This should be an object value,like the showAnimation property.
			///If 'animated' set to false. then hide the tooltip without animation.
			///Type:Object.
			///Default:{animated: 'fade',duration:500}.
			///Code example:$(".selector").wijtooltip("option","hideAnimation",
			///{animated:'fade',duration:500}).
			///</summary>
			hideAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			///Determines the length of the delay before the tooltip appears.
			///Type:Number
			///Default:0.
			///Code example:$(".selector").wijtooltip("option","showDelay",200).
			///</summary>
			showDelay: 150,
			/// <summary>
			///Determines the length of the delay before the tooltip disappears.
			///Type:Number.
			///Default:0.
			///Code example:$(".selector").wijtooltip("option","hideDelay",200).
			///</summary>
			hideDelay: 150,
			/// <summary>
			///Sets the callout's offset changing animation.
			///Remarks:The value is an object,
			///like the following:{duration:100,easing:'swing'}.
			///Type:Object.
			///Default:{}.
			///Code example:$(".selector")
			///.wijtooltip("option","calloutAnimation",{duration:200}).
			///</summary>
			calloutAnimation: {},
			/// <summary>
			///Determines the callout's class style.If true,
			///then the callout triangle will be filled.
			///Type:Boolean.
			///Default:true.
			///Code example:$(".selector").wijtooltip("option","calloutFilled",true).
			///</summary>
			calloutFilled: true,

			modal: false

		},
		_setOption: function (key, value) {
			if ($.isPlainObject(value)) {
				value = $.extend(this.options[key], value);
			}
			//console.log(value);
			if (key === "position") {
				this.element.data("oldPos", this.options[key]);
			}
			$.Widget.prototype._setOption.apply(this, arguments);
			if ($.isFunction(this["_set_" + key])) {
				this["_set_" + key](value);
			}
		},
		_setPositionOffset: function (flag) {
			var domElement = this.element.data("domElements"), calloutAnimation,
			arrowClass, horition, arr, value, offset, array;
			domElement.callout.stop(true, true);
			calloutAnimation = $.extend({ duration: 1000 }, 
			this.options.calloutAnimation);
			//var tooltip = this.element.data("tooltip");
			arrowClass = this.element.data("arrowClass")
			.replace(/wijmo-wijtooltip-arrow-/, "");
			horition = false;
			arr = ["tr", "tc", "tl", "bl", "bc", "br"];
			$.each(arr, function (i, n) {
				if (arrowClass === n) {
					horition = true;
				}
			});
			value = "";
			offset = this.options.position.offset;
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
						domElement.callout.css("left", value + "px");
					}
					else {
						domElement.callout.css("top", value + "px");
					}
				}
				else {
					if (horition) {
						domElement.callout.animate({ left: value },
						calloutAnimation.duration, calloutAnimation.easing);
					}
					else {
						domElement.callout.animate({ top: value },
						calloutAnimation.duration, calloutAnimation.easing);
					}
				}

			}
		},

		_set_triggers: function () {
			//this._unbindTargetElements();+
			this.element.unbind(".tooltip");
			this._attachEventToElement();
		},

		_set_position: function (value) {
			if (this.options.showCallout) {
				if (!this.isCreateTooltip) {
					this._createTooltip();
					this.isCreateTooltip = true;
				}
				var oldpos = this.element.data("oldPos");
				if (oldpos.my !== value.my || oldpos.at !== value.at) {
					this._setCalloutCss();
					this._setposition();
				}
				this._setPositionOffset();
			}

		},

		_set_showCallOut: function (value) {
			this.element.removeClass("wijmo-wijtooltip-arrow-tr " +
			"wijmo-wijtooltip-arrow-tc wijmo-wijtooltip-arrow-tl " +
			"wijmo-wijtooltip-arrow-br wijmo-wijtooltip-arrow-bc " +
			"wijmo-wijtooltip-arrow-bl wijmo-wijtooltip-arrow-rb " +
			"wijmo-wijtooltip-arrow-rc wijmo-wijtooltip-arrow-rt " +
			"wijmo-wijtooltip-arrow-lb wijmo-wijtooltip-arrow-lc " +
			"wijmo-wijtooltip-arrow-lt");
			var domElement = this.element.data("domElements");
			if (value) {
				if (!this.isCreateTooltip) {
					this._createTooltip();
					this.isCreateTooltip = true;
				}
				this._setCalloutCss();
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
			if (!this.isCreateTooltip) {
				this._createTooltip();
				this.isCreateTooltip = true;
			}
			this._setCloseBtnCss();
		},
		_set_mouseTrailing: function () {
			this.element.unbind(".tooltip");
			this._attachEventToElement();
		},

		destroy: function () {
			/// <summary>Removes the wijtooltip functionality completely.
			///This returns the element back to its pre-init state.</summary>
			this.element.unbind(".tooltip");
			this.isCreateTooltip = false;
			$.Widget.prototype.destroy.apply(this);
			if (this.element.data("tooltip")) {
				this.element.data("tooltip").remove();
			}
			this.element.attr("title", this.title);
			this.element.removeData("tooltip").removeData("arrowClass")
			.removeData("domElements").removeData("fixedArrowClass").removeData("offset")
			.removeData("oldPos").removeData("showDelay");
		},

		widget: function () {
			return this.element.data("tooltip") || this.element;
		},

		_create: function () {
			this.element.data("oldPos", this.options.position);
			this.options.position.of = this.element;
			this._attachEventToElement();
			this.element.data("offset", this.options.position.offset);
			this.isCreateTooltip = false;
		},

		_createTooltip: function () {
			this._setStructure();
			this._initializeDomElements();
			var domElement = this.element.data("domElements"),
			tooltip = this.element.data("tooltip");
			if (this.element.attr("id") !== "") {
				tooltip.attr("aria-describedby", this.element.attr("id"));
			}
			tooltip.hide();
			this._setCalloutCss();
			if (this.options.showCallout) {
				domElement.callout.show();
			}
			else {
				domElement.callout.hide();
			}
		},

		_setStructure: function () {
			var tooltip = $("<div>"),			
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
			this.element.data("domElements", {
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
			this.element.data("tooltip", tooltip);
			this._setCloseBtnCss();
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
			if (!this.options.showCallout) {
				this.options.position.offset = this.element.data("offset");
				return;
			}
			var o = this.options, my = o.position.my, arrat, oldcss,
			arr = my.split(" "), cssname = '', tooltip;
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
			if (this.element.data('arrowClass')) {
				oldcss = this.element.data('arrowClass');
				oldcss = oldcss.substr(oldcss.length - 2, 1);
			}

			cssname = 'wijmo-wijtooltip-arrow-' + cssname;
			tooltip = this.element.data("tooltip");
			tooltip.removeClass("wijmo-wijtooltip-arrow-tr " +
			"wijmo-wijtooltip-arrow-tc wijmo-wijtooltip-arrow-tl " +
			"wijmo-wijtooltip-arrow-br wijmo-wijtooltip-arrow-bc " +
			"wijmo-wijtooltip-arrow-bl wijmo-wijtooltip-arrow-rb " +
			"wijmo-wijtooltip-arrow-rc wijmo-wijtooltip-arrow-rt " +
			"wijmo-wijtooltip-arrow-lb wijmo-wijtooltip-arrow-lc " +
			"wijmo-wijtooltip-arrow-lt");
			tooltip.addClass(cssname);
			this.element.data("arrowClass", cssname);

		},

		_initializeDomElements: function () {
			var tooltip = this.element.data("tooltip");
			tooltip.bind("mouseout", $.proxy(this._onMouseOutTooltipElement, this));
			tooltip.bind("mouseover", $.proxy(this._onMouseOverTooltipElement, this));
			this.element.data("domElements").closebtn
			.bind("click", $.proxy(this._onClickCloseBtn, this));
		},

		_attachEventToElement: function () {
			if (this.title === undefined) {
				this.title = this.element.attr("title");
				this.element.attr("title", "");
			}
			var self = this;
			this.element.unbind('.tooltip');
			if (this.options.mouseTrailing) {
				this.element.bind("mousemove.tooltip", function () {
					self._setposition();
					self.show();
				});
			}

			switch (this.options.triggers) {
			case "hover":
				this.element.bind("mouseover.tooltip", function () {
					self.show();
				}).bind("mouseout.tooltip", function () {
					if (self.options.closeBehavior === "sticky" || self.options.modal ||
					self.options.closeBehavior === "none") {
						return;
					}
					self.hide();
				});
				break;
			case "click":
				this.element.bind("click.tooltip", function () {
					self.show();
				});
				break;
			case "focus":
				this.element.bind("focus.tooltip", function () {
					self.show();
				}).bind("blur.tooltip", function () {
					if (self.options.closeBehavior === "sticky") {
						return;
					}
					self.hide();
				});
				break;
			case "rightClick":
				this.element.bind("contextmenu.tooltip", function (e) {
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
			if (this.options.closeBehavior === "sticky" ||
			this.options.closeBehavior === "none") {
				return;
			}
			if (!this._isPointInsideRectWithOutBorder({
				X: e.pageX,
				Y: e.pageY
			}, this.element.data("tooltip"))) {
				this.hide();
			}
		},

		_onMouseOverTooltipElement: function (e) {
			if (this.options.closeBehavior === "auto" && !this.options.mouseTrailing) {
				if (!this.element.data("currentElement") ||
				this._isPointInsideRectWithOutBorder({
					X: e.pageX,
					Y: e.pageY
				}, this.element.data("currentElement"))) {
					this.hide();
				}
			}
		},

		_onClickCloseBtn: function () {
			this.hide();
		},
		//begin tooltip mouse events

		//end tooltip mouse events
		_setposition: function () {
			var tooltip = this.element.data("tooltip"),
			isHidden = tooltip.is(":hidden"), option, offsetstr, arrowClass, str, strArr,
			offset, domelement, borderTop, borderLeft, borderRight, borderBottom,
			top, left, right, bottom, position;
			if (isHidden) {
				tooltip.show();
			}
			option = $.extend(this.options.position, {});
			tooltip.css({ left: 0, top: 0 });
			//if (!this.element.data("fixed")) {
			offsetstr = "";
			if (this.options.showCallout) {
				arrowClass = this.element.data("arrowClass");
				str = arrowClass.substr(arrowClass.length - 2, 2);
				strArr = str.split("");
				offset = [];
				//----change the position offset to set the callout.
				//offset[0] = parseInt(offset[0]);
				//offset[1] = parseInt(offset[1]);
				offset[0] = offset[1] = 0;
				//console.log(arrowClass);
				domelement = this.element.data("domElements");
				borderTop = domelement.callout.css("border-top-width")
				.replace(/px/g, '') * 1;
				borderLeft = domelement.callout.css("border-left-width")
				.replace(/px/g, '') * 1;
				borderRight = domelement.callout.css("border-right-width")
				.replace(/px/g, '') * 1;
				borderBottom = domelement.callout.css("border-bottom-width")
				.replace(/px/g, '') * 1;
				top = domelement.callout.css("top").replace(/px/g, '') * 1;
				left = domelement.callout.css("left").replace(/px/g, '') * 1;
				right = domelement.callout.css("right").replace(/px/g, '') * 1;
				bottom = domelement.callout.css("bottom").replace(/px/g, '') * 1;

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
			this.element.data("fixedArrowClass", false);
			tooltip.position({ my: option.my, at: option.at, of: option.of,
			 offset: offsetstr, collision: option.collision });
			if (this.options.showCallout) {
				this._calloutflip(position);
				this._set_unfilledCallout();
			}
			if (isHidden && !(this.options.relativeTo === "mouse" &&
			this.options.mouseTrailing)) {
				tooltip.hide();
			}
		},

		_set_unfilledCallout: function (calloutCss) {
			
			if (!calloutCss) {
				calloutCss = this.element.data("arrowClass");
				if (this.element.data("fixedArrowClass")) {
					calloutCss = this.element.data("fixedArrowClass");
				}
			}
			var tooltip = this.element.data("tooltip"),
			domObject = this.element.data("domElements"),
			innerCallout = domObject.callout.children();
			innerCallout.css({
				"border-left-color": "",
				"border-top-color": "",
				"border-bottom-color": "",
				"border-right-color": ""
			});
			if (this.options.calloutFilled) {
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
			var tooltip = this.element.data("tooltip"),
			changeset = { left: false, top: false },
			win = $(window), over, cssname;
			if (this.options.position.at[0] !== 'center') {
				if (position.left < 0) {
					changeset.left = true;
				}
				over = position.left + tooltip.width() - win.width() - win.scrollLeft();
				if (over > 0) {
					changeset.left = true;
				}
			}
			if (this.options.position[1] !== 'center') {
				over = position.top + tooltip.height() - win.height() - win.scrollTop();
				if (position.top < 0) {
					changeset.top = true;
				}
				if (over > 0) {
					changeset.top = true;
				}
			}
			cssname = this.element.data("arrowClass");
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
				tooltip.removeClass("wijmo-wijtooltip-arrow-tr " +
				"wijmo-wijtooltip-arrow-tc wijmo-wijtooltip-arrow-tl " +
				"wijmo-wijtooltip-arrow-br wijmo-wijtooltip-arrow-bc " +
				"wijmo-wijtooltip-arrow-bl wijmo-wijtooltip-arrow-rb " +
				"wijmo-wijtooltip-arrow-rc wijmo-wijtooltip-arrow-rt " +
				"wijmo-wijtooltip-arrow-lb wijmo-wijtooltip-arrow-lc " +
				"wijmo-wijtooltip-arrow-lt");
				tooltip.addClass("wijmo-wijtooltip-arrow-" + cssname);
			}
			this.element.data("fixedArrowClass", cssname);
		},
		_showTooltip: function () {
			var o = this.options, aimateOptions, animations, duration, easing,
			ea = {
				ui: this,
				cancel: false
			},
			tooltip = this.element.data("tooltip");
			if (!tooltip) {
				return;
			}
			this._trigger("showing", ea);
			if (ea.cancel) {
				return;
			}
			this._showModal();
			tooltip.css("z-index", this._getMaxZIndex());
			if (o.showAnimation.animated && !this.options.mouseTrailing) {
				aimateOptions = {
					show: true,
					context: tooltip,
					complete: $.proxy(function () {
						this._trigger("shown");

					}, this)
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
				this._trigger("shown");
			}
			this._setPositionOffset(true);
			//this._setCalloutOffset();
		},
		_hideTooltip: function () {
			var o = this.options,
			ea = new $.Event('hidding.tooltip'), tooltip, aimateOptions,
			animations, duration, easing;
			ea.data = {
				ui: this,
				cancel: false
			};
			this._trigger("hidding");
			if (ea.data.cancel) {
				return;
			}
			this._hideModal();
			tooltip = this.element.data("tooltip");
			if (o.hideAnimation.animated) {
				aimateOptions = {
					show: false,
					context: tooltip,
					complete: $.proxy(function () {
						this._trigger("hidden");
					}, this)
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
				this._trigger("hidden");
			}
		},
		_setText: function () {
			var domElement = this.element.data("domElements"), strtitle,
			currentElement = this.element, strret, title, titlevalue,
			content = this.options.content, self = this;
			if ($.isFunction(content)) {
				strret = content.call(self.element, function (data) {
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

					domElement.container.html(currentElement ?
					this.title : '');
				}
			}

			domElement.title.show();
			title = this.options.title;
			titlevalue = "";
			if ($.isFunction(title)) {
				strtitle = title.call(this.element, function (data) {
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

		_getMaxZIndex: function () {
			var zindex = 0;
			$("*").each(function () {
				var index = $(this).css("z-index");
				if (!isNaN(index)) {
					index = parseInt(index, 10);
					if (index > zindex) {
						zindex = index;
					}
				}

			});
			return zindex + 1;
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
			if (this.options.modal) {
				var modalDiv = $("<div>");
				modalDiv.addClass("ui-widget-overlay")
				.css("z-index", this._getMaxZIndex())
				.width(this._getDocWidth()).height(this._getDocHeight());
				modalDiv.appendTo("body");
				this.element.data("modalDiv", modalDiv);
			}
		},

		_hideModal: function () {
			if (this.element.data("modalDiv")) {
				this.element.data("modalDiv").remove();
			}
		},

		//begin public methods
		show: function () {
			/// <summary>Shows the tooltip</summary>
			if (!this.isCreateTooltip) {
				this._createTooltip();
				this.isCreateTooltip = true;
			}
			var tooltip = this.element.data("tooltip");
			tooltip.stop(true, true);
			this._setText();
			//this._setheight();

			if (this.element.data("arrowClass")) {
				tooltip.removeClass(this.element.data("arrowClass"));
			}
			this._setCalloutCss();
			//tooltip.hide();
			this._setposition();
			clearTimeout(this.element.data("showDelay"));
			//this.element.show();
			this.element.data("showDelay", 
			setTimeout($.proxy(this._showTooltip, this), this.options.showDelay));
			//this._showTooltip();
			//var self = this;
			//var calloutInner = self.element.data("domElements")
			//.callout.children().first();

		},
		showAt: function (point) {
			/// <summary>show the tooltip at a point position</summary>
			/// <param name="point" type="Object">It's a point.
			///the value should like{x:0,y:0}</param>
			if (!this.isCreateTooltip) {
				this._createTooltip();
				this.isCreateTooltip = true;
			}
			var tooltip = this.element.data("tooltip"), borderRight, borderBottom,
			offsetx, offsety, calloutcss, domelement, borderTop, borderLeft,
			borderh, borderv, offset, width, height, collision, newCss, arr;
			tooltip.stop(true, true);
			this._setText();
			//this._setheight();
			tooltip.offset({ left: 0, top: 0 });
			tooltip.show();
			offsetx = 0;
			offsety = 0;
			calloutcss = this.element.data("arrowClass");
			domelement = this.element.data("domElements");
			offsetx = domelement.callout.position().left;
			offsety = domelement.callout.position().top;
			borderTop = domelement.callout.css("border-top-width").replace(/px/g, '') * 1;
			borderLeft = domelement.callout.css("border-left-width")
			.replace(/px/g, '') * 1;
			borderRight = domelement.callout.css("border-right-width")
			.replace(/px/g, '') * 1;
			borderBottom = domelement.callout.css("border-bottom-width")
			.replace(/px/g, '') * 1;
			borderh = borderLeft === 0 ? borderRight : borderLeft;
			borderv = borderTop === 0 ? borderBottom : borderTop;
			offset = {};
			width = tooltip.width();
			height = tooltip.height();
			collision = (this.options.position.collision || "flip").split(" ");
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
			newCss = this._showAtflip(calloutcss, offset);
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
			this._set_unfilledCallout(newCss);
			tooltip.offset(offset);
			tooltip.hide();
			this.element.data("showDelay", 
			setTimeout($.proxy(this._showTooltip, this), this.options.showDelay));

		},

		_showAtflip: function (calloutcss, offset) {
			var collision = (this.options.position.collision || "flip").split(" "),
			cssname, tooltip, width, height, domelement, borderTop, borderLeft,
			borderRight, borderBottom, win;
			if (collision[0] !== "flip" && collision[1] !== "flip") {
				return;
			}
			cssname = calloutcss.substr(calloutcss.length - 2, 2);
			tooltip = this.element.data("tooltip");
			width = tooltip.width();
			height = tooltip.height();
			domelement = this.element.data("domElements");
			borderTop = domelement.callout.css("border-top-width").replace(/px/g, '') * 1;
			borderLeft = domelement.callout.css("border-left-width")
			.replace(/px/g, '') * 1;
			borderRight = domelement.callout.css("border-right-width")
			.replace(/px/g, '') * 1;
			borderBottom = domelement.callout.css("border-bottom-width")
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
			tooltip.removeClass("wijmo-wijtooltip-arrow-tr " +
			"wijmo-wijtooltip-arrow-tc wijmo-wijtooltip-arrow-tl " +
			"wijmo-wijtooltip-arrow-br wijmo-wijtooltip-arrow-bc " +
			"wijmo-wijtooltip-arrow-bl wijmo-wijtooltip-arrow-rb " +
			"wijmo-wijtooltip-arrow-rc wijmo-wijtooltip-arrow-rt " +
			"wijmo-wijtooltip-arrow-lb wijmo-wijtooltip-arrow-lc " +
			"wijmo-wijtooltip-arrow-lt");
			tooltip.addClass("wijmo-wijtooltip-arrow-" + cssname);
			return cssname;
		},

		hide: function () {
			/// <summary>Hides the tooltip</summary>
			clearTimeout(this.element.data("showDelay"));
			clearTimeout(this.element.data("hideDelay"));
			this.element.data("hideDelay", 
			setTimeout($.proxy(this._hideTooltip, this), this.options.hideDelay));
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
