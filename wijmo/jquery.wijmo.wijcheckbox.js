/*globals jQuery*/
/*
 *
 * Wijmo Library 2.1.0
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
(function ($) {
	"use strict";
	var checkboxId = 0;
	$.widget("wijmo.wijcheckbox", {
		_csspre: "wijmo-checkbox",
		_init: function () {
			var self = this,
				ele = self.element,
				o = self.options,
				checkboxElement, label, targetLabel, boxElement, iconElement;
			if (ele.is(":checkbox")) {
				if (!ele.attr("id")) {
					ele.attr("id", self._csspre + checkboxId);
					checkboxId += 1;
				}
				if (ele.parent().is("label")) {
					checkboxElement = ele.parent()
					.wrap("<div class='" + self._csspre + "-inputwrapper'></div>")
					.parent()
					.wrap("<div></div>").parent().addClass(self._csspre + " ui-widget");
					label = ele.parent();
					label.attr("for", ele.attr("id"));
					checkboxElement.find("." + self._csspre + "-inputwrapper")
					.append(ele);
					checkboxElement.append(label);
				}
				else {
					checkboxElement = ele
					.wrap("<div class='" + self._csspre + "-inputwrapper'></div>")
					.parent().wrap("<div></div>").parent()
					.addClass(self._csspre + " ui-widget");
				}
				targetLabel = $("label[for='" + ele.attr("id") + "']");
				if (targetLabel.length > 0) {
					checkboxElement.append(targetLabel);
					targetLabel.attr("labelsign", "C1");
				}
				if (ele.is(":disabled")) {
					self._setOption("disabled", true);
				}
				boxElement = $("<div class='" + self._csspre +
				"-box ui-widget ui-state-" +
				(o.disabled ? "disabled" : "default") +
				" ui-corner-all'><span class='" +
				self._csspre + "-icon'></span></div>");
				iconElement = boxElement.children("." + self._csspre + "-icon");
				checkboxElement.append(boxElement);
				ele.data("iconElement", iconElement);
				ele.data("boxElement", boxElement);

				boxElement.removeClass(self._csspre + "-relative")
				.attr("role", "checkbox")
				.bind("mouseover", function () {
					ele.mouseover();
				}).bind("mouseout", function () {
					ele.mouseout();
				});
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(self._csspre + "-relative");
				}
				ele.bind("click.checkbox", function (e) {
					self.refresh(e);
				}).bind("focus.checkbox", function () {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				}).bind("keydown.checkbox", function (e) {
					if (e.keyCode === 32) {
						if (o.disabled) {
							return;
						}
						self.refresh();
					}
				});

				boxElement.bind("click.checkbox", function (e) {
					ele.get(0).checked = !ele.get(0).checked;
					ele.change();
					ele.focus();
					self.refresh(e);
				});

				self.refresh();
				checkboxElement.bind("mouseover.checkbox", function (e) {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");

				}).bind("mouseout.checkbox", function (e) {
					if (o.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus")
					.addClass("ui-state-default");
				});
				
				//update for fixed tooltip can't take effect 
				checkboxElement.attr("title", ele.attr("title"));
			}
		},

		refresh: function (e) {
			/// Use the refresh method to set the checkbox element's style.
			var self = this;
			self.element.data("iconElement")
			.toggleClass("ui-icon ui-icon-check", self.element.get(0).checked);
			self.element.data("boxElement")
			.toggleClass("ui-state-active", self.element.get(0).checked)
			.attr("aria-checked", self.element.get(0).checked);
			if (e) {
				e.stopPropagation();
			}
		},

		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			var self = this, boxelement = self.element.parent().parent();
			boxelement.children("div." + self._csspre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
} (jQuery));
