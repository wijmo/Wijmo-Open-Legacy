/*globals jQuery*/
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
 * * Wijmo CheckBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 *
 */
"use strict";
(function ($) {
	var checkboxId = 0;
	$.widget("wijmo.wijcheckbox", {
		_csspre: "wijmo-checkbox",
		_init: function () {
			var that = this, checkboxElement, label, targetLabel, boxElement, iconElement;
			if (that.element.is(":checkbox")) {
				if (!that.element.attr("id")) {
					that.element.attr("id", that._csspre + checkboxId);
					checkboxId += 1;
				}
				if (that.element.parent().is("label")) {
					checkboxElement = that.element.parent()
					.wrap("<div class='" + that._csspre + "-inputwrapper'></div>")
					.parent()
					.wrap("<div></div>").parent().addClass(that._csspre + " ui-widget");
					label = that.element.parent();
					label.attr("for", that.element.attr("id"));
					checkboxElement.find("." + that._csspre + "-inputwrapper")
					.append(that.element);
					checkboxElement.append(label);
				}
				else {
					checkboxElement = that.element
					.wrap("<div class='" + that._csspre + "-inputwrapper'></div>")
					.parent().wrap("<div></div>").parent()
					.addClass(that._csspre + " ui-widget");
				}
				targetLabel = $("label[for='" + that.element.attr("id") + "']");
				if (targetLabel.length > 0) {
					checkboxElement.append(targetLabel);
					targetLabel.attr("labelsign", "C1");
				}
				boxElement = $("<div class='" + that._csspre + 
				"-box ui-widget ui-state-default ui-corner-all'><span class='" + 
				that._csspre + "-icon'></span></div>");
				iconElement = boxElement.children("." + that._csspre + "-icon");
				checkboxElement.append(boxElement);
				that.element.data("iconElement", iconElement);
				that.element.data("boxElement", boxElement);
				if (that.element.is(":disabled")) {
					that._setOption("disabled", true);
				}
				boxElement.removeClass(that._csspre + "-relative")
				.attr("role", "checkbox");
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(that._csspre + "-relative");
				}
				that.element.bind("click.checkbox", function () {
					that.refresh();
				}).bind("focus.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				}).bind("keydown.checkbox", function (e) {
					if (e.keyCode === 32) {
						that.element.attr("checked", !that.element.attr("checked"));
						that.refresh();
					}
				});
				checkboxElement.click(function () {
					//if (targetLabel.length === 0 || targetLabel.html() === "") {
					that.element.attr("checked", !that.element.attr("checked"));
					that.element.focus();
					that.refresh();
					//}

				});
				that.refresh();
				checkboxElement.bind("mouseover.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus")
					.addClass("ui-state-default");
				});
			}
		},

		refresh: function () {
			var self = this;
			self.element.data("iconElement")
			.toggleClass("ui-icon ui-icon-check", self.element.is(":checked"));
			self.element.data("boxElement")
			.toggleClass("ui-state-active", self.element.is(":checked"))
			.attr("aria-checked", self.element.is(":checked"));
		},

		destroy: function () {
			var self = this, boxelement = self.element.parent().parent();
			boxelement.children("div." + self._csspre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
}(jQuery));
