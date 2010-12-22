/*globals jQuery */
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
* * Wijmo TextBoxDecorator widget.
* 
* Depends:
*  jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
"use strict";
(function ($) {
	$.widget("wijmo.wijtextbox", {
		options: {
		},
		_create: function () {
			var self = this, e = self.element;
			if (!(self.element.attr("tagName").toLowerCase() === "input" || 
			self.element.attr("tagName").toLowerCase() === "textarea")) {
				return;
			}
			if (!(self.element.attr("type").toLowerCase() === "text" || 
			self.element.attr("type").toLowerCase() === "password")) {
				if (self.element.attr("tagName").toLowerCase() === "input") {
					return;
				}
			}
			
			e.addClass("wijmo-wijtextbox ui-widget ui-state-default ui-corner-all");
			self.element.bind("mouseover." + self.widgetName, function () {
				e.addClass("ui-state-hover");
			}).bind("mouseout." + self.widgetName, function () {
				e.removeClass("ui-state-hover");
			}).bind("mousedown." + self.widgetName, function () {
				e.addClass("ui-state-active");
			}).bind("mouseup." + self.widgetName, function () {
				e.removeClass("ui-state-active");
			}).bind("focus." + self.widgetName, function () {
				e.addClass("ui-state-focus");
			}).bind("blur." + self.widgetName, function () {
				e.removeClass("ui-state-focus");
			});
		},
		destroy: function () {
			var self = this;
			self.element.removeClass("ui-widget ui-state-default ui-corner-all " +
			"ui-state-hover ui-state-active wijmo-wijtextbox")
			.unbind("." + self.widgetName);
			$.Widget.prototype.destroy.apply(self);
		}
	});
}(jQuery));
