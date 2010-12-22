/*globals setTimeout jQuery*/

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
 ** wijprogressbar Widget. V1.0
*
* Copyright (c) Componentone Inc.
*
* Depends:
*	Jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*Optional dependence for effect settings:
*	jquery.effects.core.js
*	jquery.effects.blind.js
*	jquery.effects.bounce.js
*	jquery.effects.clip.js
*	jquery.effects.drop.js
*	jquery.effects.explode.js
*	jquery.effects.fold.js
*	jquery.effects.hightlight.js
*	jquery.effects.pulsate.js
*	jquery.effects.scale.js
*	jquery.effects.shake.js
*	jquery.effects.slide.js
*	jquery.effects.transfer.js
* HTML:
*  <div id="progressbar" style="width:***;height:***"></div>
*/
"use strict";
(function ($) {
	$.widget("wijmo.wijprogressbar", $.ui.progressbar, {
		options: {
			/// <summary>
			///The label's alignment on the progress bar. The value should be "east",
			/// "west", "center", "north", "south" or "running".
			///Default:"center".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelAlign','center').
			///</summary>
			labelAlign: "center",
			/// <summary>
			///The value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','value',60).
			///</summary>
			maxValue: 100,
			/// <summary>
			///The minimum value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','minValue',0).
			///</summary>
			minValue: 0,
			/// <summary>
			///The fill direction of the progress bar.the value should be "east", 
			///"west", "north" or "south".
			///Default:"east".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','fillDirection','east').
			///</summary>
			fillDirection: "east",
			/// <summary>
			///The progressbar's orientation.the value should be 'horizontal'
			/// or 'vertical'.
			///Default:"horizontal".
			///Type:String.
			///Code sample:$('selector').wijprogressbar('option','orientation',
			///'horizontal').
			///</summary>
			///orientation: "horizontal",
			/// <summary>
			///Sets the format of the label text.The available formats are as follows:
			///{0} or {ProgressValue} express the current progress Value.
			///{1} or {PercentProgress} express the current percent of the progress bar.
			///{2} or {RemainingProgress} express the remaining progress of the 
			///progress bar.
			///{3} or {PercentageRemaining} express the remaining percent of 
			///the progress bar.
			///{4} or {Min} express the min Vlaue of the progress bar.
			///{5} or {Max} express the max Value of the progress bar.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelFormatString'
			///,'{0}%').
			///</summary>
			labelFormatString: "{1}%",
			/// <summary>
			///Set the format of the ToolTip of the progress bar,the expression of the 
			///format like the labelFormatString.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','toolTipFormatString'
			///,'{1}%').
			///</summary>
			toolTipFormatString: "{1}%",
			/// <summary>
			///The increment of the progress bar's indicator.
			///Default:1.
			///Type:Number.
			///</summary>
			///Code sample:$('.selector').wijprogressbar('option',
			///'indicatorIncrement',10).
			indicatorIncrement: 1,
			/// <summary>
			///The Image's url of the indicator.
			///Default:"".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','indicatorImage',
			///'images/abc.png').
			///</summary>
			indicatorImage: "",
			/// <summary>
			///The delay of the progressbar's animation.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option',
			///</summary>
			animationDelay: 0,
			/// <summary>
			///The options parameter of the jQuery's animation.
			///Default:"{animated:'progress',duration:500}".
			///Type:Options.
			///Code sample:$('.selector').wijprogressbar('option','animationOptions',
			///{animated:'progress',duration:600}).
			///</summary>
			animationOptions: {
				animated: 'progress',
				duration: 500
			}
		},

		_setOption: function (key, value) {
			var val, self = this;
			switch (key) {
			case "value":
				val = parseInt(value, 10);
				self.options[key] = val;
				self._refreshValue(val);
				break;
			case "maxValue":
			case "minValue":
				val = parseInt(value, 10);
				self.options[key] = val;
				self[key === "maxValue" ? "max" : "min"] = val;
				self._refreshValue();
				break;
			case "labelFormatString":
			case "toolTipFormatString":
				self.options[key] = value;
				self._refreshValue();
				//$.Widget.prototype._setOption.apply(this, arguments);
				break;
			case "orientation":
			case "fillDirection":
			case "labelAlign":
			case "indicatorImage":
				self.options[key] = value;
				self._initElements();
				self._refreshValue();
				//$.Widget.prototype._setOption.apply(this, arguments);
				break;
			case "indicatorIncrement":
				value = (value === 0 ? 1 : value);
				self.options[key] = value;
				self._initElements();
				self._refreshValue();
				break;
			default: 
				break;
			}
			$.Widget.prototype._setOption.apply(self, arguments);
		},

		_create: function () {
			var self = this;
			self.min = self.options.minValue;
			self.max = self.options.maxValue;
			self.element.addClass("wijmo-wijprogressbar");
			$.ui.progressbar.prototype._create.apply(self, arguments);
			self.label = $("<span>")
			.addClass("ui-progressbar-label ui-corner-left").appendTo(self.element);
			self._initElements();
			self._isInit = true;
			self._refreshValue();
		},

		_triggerEvent: function (eventName, oldValue, newValue, cancel) {
			var ea = $.Event(eventName);
			ea.data = {
				oldValue: oldValue,
				newValue: newValue,
				cancel: cancel
			};
			this._trigger(eventName, ea);
			return ea.data.cancel;
		},

		_refreshValue: function () {
			var self = this, value, percent, o, cancel, oldValue;
			if (!self._isInit) {
				return;
			}
			value = self.value();
			percent = (value - self.min) / (self.max - self.min) * 100;
			o = self.options;

			cancel = self._triggerEvent("beforeProgressChanging", 
			self.element.attr("aria-valuenow"), value, false);
			if (cancel) {
				return;
			}
			self.valueDiv.css({
				width: "",
				height: ""
			});
			if (o.animationOptions.animated && o.animationOptions.duration > 0) {
				setTimeout($.proxy(function () {
					var o = self.options.animationOptions,
					animateOptions = {
						content: self.valueDiv,
						complete: $.proxy(function () {
							self._triggerEvent("progressChanged", 
							self.element.attr("aria-valuenow"), value, false);
						}, self),
						step: $.proxy(function (ovalue) {
							self._performAnimating(ovalue);
						}, self),
						processValue: percent
					},
					animations = $.wijmo.wijprogressbar.animations,
					duration = o.duration,
					easing = o.animated;
					if (easing && !animations[easing]) {
						easing = "progress";
					}
					if (!animations[easing]) {
						animations[easing] = function (options) {
							this.progress(options, {
								easing: easing,
								duration: duration || 1000
							});
						};
					}
					animations[easing](animateOptions, self.options.animationOptions);

				}, self), self.options.animationDelay);
			}
			else {
				//trigger the progressChanged event.
				oldValue = self.element.attr("aria-valuenow");
				self._refreshProgress(percent);
				self._triggerEvent("progressChanged", oldValue, value, false);
			}
		},
		_setLabelSide: function () {
			var self = this,
			labelAlign = self.options.labelAlign;
			if (self._isHorizontal()) {
				if (labelAlign === "west" || labelAlign === "east" || 
				labelAlign === "center") {
					self.label.css("width", self.element.width() + 'px');
				}
				else if (labelAlign === "running") {
					self.label.css("width", "auto");
				}
				else {
					self.element.css("line-height", "normal");
					self.valueDiv.css("line-height", "normal");
					self.label.css("height", labelAlign === "north" ? 
					self.element.height() + 'px' : "auto");
				}
			}
			else {
				if (labelAlign === "west" || labelAlign === "east" ||
				labelAlign === "center") {
					self.label.css({ "line-height": self.element.height() + 'px',
					"width": self.element.width() + 'px' });
				}
				else if (labelAlign === "running") {
					self.label.css({ "height": "auto", 
					"width": self.element.width() + 'px' });
				}
				else {
					self.element.css("line-height", "normal");
					self.valueDiv.css("line-height", "normal");
					//self.label.css("height", labelAlign === "north" ?
					// self.element.height() + 'px' : "auto");
				}
			}
		},
		_isHorizontal: function () {
			return this.options.fillDirection === "west" ||
			this.options.fillDirection === "east";
		},

		startTask: function () {
			/// <summary>Start the progress</summary>
			if ($(":animated", this.element).length === 0) {
				var value = this.value();
				this._refreshValue(value);
			}
		},
		stopTask: function () {
			/// <summary>Stop the progress</summary>
			this.valueDiv.stop();
		},
		_initElements: function () {
			var self = this, o = self.options, height;
			self.element.removeClass("wijmo-wijprogressbar-west " +
			"wijmo-wijprogressbar-east" + 
			" wijmo-wijprogressbar-north wijmo-wijprogressbar-south")
			.addClass("wijmo-wijprogressbar-" + o.fillDirection);
			height = self.element.height();
			self.valueDiv.css("line-height", "");
			self.label
			.removeClass("lb_west lb_east lb_south lb_north lb_center lb_running")
			.addClass("lb_" + o.labelAlign)
			.css("line-height", "").css({
				left: "",
				right: "",
				top: "",
				bottom: ""
			});
			if (self._isHorizontal()) {
				self.valueDiv.height(height)
				.css("line-height", height + "px");
			}
			else {
				self.valueDiv.width(self.element.width());
			}
			self._setLabelSide();
			if (self.options.indicatorImage !== "") {
				self.valueDiv.css("background", "transparent url(" + 
				self.options.indicatorImage + ") repeat fixed");
			}
		},

		_refreshProgress: function (value) {
			var self = this, o = self.options, txt, _tooTip,
			nowValue = value * (self.max - self.min) / 100 + self.min,
			cancel = self._triggerEvent("progressChanging",
			self.element.attr("aria-valuenow"), nowValue, false);
			if (cancel) {
				return;
			}
			if (self._isHorizontal()) {
				self.valueDiv.toggleClass(o.fillDirection === "east" ? "ui-corner-right" :
				 "ui-corner-left", value === self.max).width(value + "%");
			}
			else {
				self.valueDiv.toggleClass(o.fillDirection === "south" ? 
				"ui-corner-bottom" : "ui-corner-top", value === self.max)
				.height(value + "%");
			}
			self.element.attr("aria-valuenow", nowValue);
			txt = self._getFormatString(o.labelFormatString, value);
			self._setLabelsText(txt);
			_tooTip = self._getFormatString(o.toolTipFormatString, value);
			self.element.attr("title", _tooTip);
		},

		_performAnimating: function (obj) {
			var self = this, o = self.options, len, eleWidth, labelWidth,
			progressWidth, left, eleHeight, labelHeight, progressHeight, top;
			if (self.options.indicatorIncrement !== 1) {
				len = Math.floor(obj / self.options.indicatorIncrement);
				obj = len * self.options.indicatorIncrement;
			}
			else {
				obj = Math.round(obj);
			}
			self._refreshProgress(obj);

			if (o.labelAlign === "running") {
				if (self._isHorizontal()) {
					eleWidth = self.element.width();
					labelWidth = self.label.outerWidth();
					progressWidth = self.valueDiv.outerWidth();
					left = eleWidth === progressWidth ? eleWidth - labelWidth :
					obj * eleWidth / 100 - labelWidth + labelWidth * 
					(eleWidth - progressWidth) / eleWidth;
					self.label.css(o.fillDirection === "east" ? "left" : "right", left);
				}
				else {
					eleHeight = self.element.height();
					labelHeight = self.label.outerHeight();
					progressHeight = self.valueDiv.outerHeight();
					top = eleHeight === progressHeight ? eleHeight - labelHeight :
					obj * eleHeight / 100 - labelHeight + labelHeight *
					(eleHeight - progressHeight) / eleHeight;
					self.label.css(o.fillDirection === "south" ? "top" : "bottom", top);
				}
			}
		},
		_setLabelsText: function (text) {
			if (!this._isHorizontal() && this.options.labelAlign === "rightOrBottom") {
				this.label.html('<span style=\'position:absolute;bottom:0px;text-align' +
				':center;width:' + this.element.width() + 'px;\'>' + text + '</span>');
				return;
			}

			this.label.html(text);
		},
		_getFormatString: function (format, val) {
			var self = this,
			processValue = parseInt(self.element.attr("aria-valuenow"), 10),
			remainingProcess = self.max - processValue,
			percentProgress = val,
			percentageRemaining = 100 - val,
			r = /\{0\}/g;
			format = format.replace(r, processValue.toString());
			r = /\{ProgressValue\}/g;
			format = format.replace(r, processValue.toString());
			r = /\{1\}/g;
			format = format.replace(r, percentProgress.toString());
			r = /\{PercentProgress\}/g;
			format = format.replace(r, percentProgress.toString());
			r = /\{2\}/g;
			format = format.replace(r, remainingProcess.toString());
			r = /\{RemainingProgress\}/g;
			format = format.replace(r, remainingProcess.toString());
			r = /\{3\}/g;
			format = format.replace(r, percentageRemaining.toString());
			r = /\{PercentageRemaining\}/g;
			format = format.replace(r, percentageRemaining.toString());
			r = /\{4\}/g;
			format = format.replace(r, self.min);
			r = /\{Min\}/g;
			format = format.replace(r, self.min);
			r = /\{5\}/g;
			format = format.replace(r, self.max);
			r = /\{Max\}/g;
			format = format.replace(r, self.max);
			return format;
		},
		destroy: function () {
			this.element.empty().attr("aria-valuemax", "").attr("aria-valuemin", "")
			.attr("aria-valuenow", "");
			this.element.removeClass("wijmo-wijprogressbar ui-widget ui-widget-content" +
			" ui-corner-all wijmo-wijprogressbar-h").attr("title", "").attr("role", "");
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

	$.extend($.wijmo.wijprogressbar, {
		animations: {
			progress: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 1000
				}, options, additions);
				options.content.stop(true, true).animate({
					widthvalue: options.processValue
				}, options);
			}
		}
	});
}(jQuery));
