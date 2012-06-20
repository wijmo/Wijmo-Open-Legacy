/*globals jQuery*/
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
 * * Wijmo RadioButtonDecorator widget.
 * 
 * Depends:
 *   jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
	"use strict";
	var radiobuttonId = 0;
	$.widget("wijmo.wijradio", {
		_radiobuttonPre: "wijmo-wijradio",
		_create: function () {
			var self = this,
				ele = self.element,
				radiobuttonElement, label, targetLabel, boxElement, iconElement;

			if (ele.is(":radio")) {
				if (!ele.attr("id")) {
					ele.attr("id", "wijmo-radio-" + radiobuttonId);
					radiobuttonId += 1;
				}
				if (ele.parent().is("label")) {
					radiobuttonElement = ele.parent().wrap("<div class='" +
					self._radiobuttonPre + "-inputwrapper'></div>").parent()
					.wrap("<div></div>").parent()
					.addClass(self._radiobuttonPre + " ui-widget");
					label = ele.parent();
					label.attr("for", ele.attr("id"));
					radiobuttonElement.find("." + self._radiobuttonPre + "-inputwrapper")
					.append(ele);
					radiobuttonElement.append(label);

				}
				else {
					radiobuttonElement = ele
					.wrap("<div class='" + self._radiobuttonPre + "-inputwrapper'></div>")
					.parent().wrap("<div></div>").parent()
					.addClass(self._radiobuttonPre + " ui-widget");
				}
				targetLabel = $("label[for='" + ele.attr("id") + "']");
				if (targetLabel.length > 0) {
					radiobuttonElement.append(targetLabel);
					targetLabel.attr("labelsign", "wij");
					//targetLabel.attr("tabindex", 0);
				}

				if (ele.is(":disabled")) {
					self._setOption("disabled", true);
				}

				boxElement = $("<div class='" + self._radiobuttonPre +
				"-box ui-widget " + 
				(self.options.disabled ? "ui-state-disabled" : "ui-state-default") + 
				" ui-corner-all'><span class='" +
				self._radiobuttonPre + "-icon'></span></div>");
				iconElement = boxElement.children("." + self._radiobuttonPre + "-icon");
				radiobuttonElement.append(boxElement);
				iconElement.addClass("ui-icon ui-icon-radio-on");
				ele.data("iconElement", iconElement);
				ele.data("boxElement", boxElement);
				

				boxElement.removeClass(self._radiobuttonPre + "-relative")
				.attr("role", "radio")
				.bind("mouseover", function () {
					ele.mouseover();
				}).bind("mouseout", function () {
					ele.mouseout();
				});
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(self._radiobuttonPre + "-relative");
				}
				self._setDefaul();
				//			boxElement.css("margin-top","9px");

				ele.bind("click.checkbox", function () {
					//fixed bug:
					//the "focus()" event fires twice when the radio is clicked
					//ele.focus();
					self._refresh();
				}).bind("focus.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				});

				radiobuttonElement.click(function () {
					if (targetLabel.length === 0 || targetLabel.html() === "") {
						//fixed bug:
						//the "focus()" event fires twice when the radio is clicked
						ele.attr("checked", true);
						//ele.attr("checked", true).focus();
						self._refresh();
						ele.change();
					}

				});

				radiobuttonElement.bind("mouseover.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus")
					.addClass("ui-state-default");
				});
				
				//update for fixed tooltip can't take effect 
				radiobuttonElement.attr("title", ele.attr("title"));
			}
		},

		_setDefaul: function () {
			if (this.element.attr("checked")) {
				this.element.parents(".wijmo-wijradio")
				.find("." + this._radiobuttonPre + "-box").children()
				.removeClass("ui-icon-radio-on ui-icon-radio-off")
				.addClass("ui-icon-radio-off");
				this.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
			}
		},

		_refresh: function () {
			var name = this.element.attr("name") || "", self = this;
			if (name === "") {
				return;
			}
			$("[name='" + name + "']").each(function (i, n) {
				$(n).parents(".wijmo-wijradio")
				.find("." + self._radiobuttonPre + "-box").children()
				.removeClass("ui-icon-radio-on ui-icon-radio-off")
				.addClass("ui-icon-radio-on");
				$(n).parents(".wijmo-wijradio")
				.find("." + self._radiobuttonPre + "-box")
				.removeClass("ui-state-active").addClass("ui-state-default")
				.attr("aria-checked", false);
			});

			if (self.element.is(":checked")) {
				self.element.data("iconElement")
				.removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
				self.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
			}

		},

		refresh: function () {
			/// Use the refresh method to set the radio button's style.
			this._refresh();
		},

		destroy: function () {
			/// Remove the functionality completely. 
			/// This will return the element back to its pre-init state.
			var self = this, boxelement = self.element.parent().parent();
			boxelement.children("div." + self._radiobuttonPre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
} (jQuery));
