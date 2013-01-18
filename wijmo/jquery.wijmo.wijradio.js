/*globals jQuery*/
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
		options: {
			/// <summary>
			/// A value determines the checked state of the radio
			/// Type: Boolean.
			/// Default: null.
			/// </summary>
			checked: null,
			/// <summary>
			/// A function called when checked state is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#tags").wijradio({changed: function(e, data) { } });
			/// Bind to the event by type: wijradiochanged
			/// $("#tags").bind("wijradiochanged", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="EventObj">
			/// The jquery event object.
			changed: null
		},
			
		_create: function () {
			var self = this,
				ele = self.element,
				eleChkState,
				radiobuttonElement, label, targetLabel, boxElement, iconElement;
			
			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

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
				ele.data("radiobuttonElement", radiobuttonElement);
				

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

				ele.bind("click.radio", function () {
					//fixed bug:
					//the "focus()" event fires twice when the radio is clicked
					//ele.focus();
					if (self.options.disabled) {
						return;
					}
					eleChkState = self.options.checked;
					self._refresh();
					if (eleChkState !== self.element.is(":checked")) {
						self._trigger("changed", null, {
							checked: self.options.checked
						});
					}

				}).bind("focus.radio", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.radio", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover")
					.addClass("ui-state-default");
				});

				radiobuttonElement.click(function () {
					if (self.options.disabled) {
						return;
					}
					if (targetLabel.length === 0 || targetLabel.html() === "") {
						//fixed bug:
						//the "focus()" event fires twice when the radio is clicked
						eleChkState = self.options.checked;
						ele.attr("checked", true);
						//ele.attr("checked", true).focus();
						self._refresh();
						ele.change();
						if (eleChkState !== self.element.is(":checked")) {
							self._trigger("changed", null, {
								checked: self.options.checked
							});
						}
					}

				});

				radiobuttonElement.bind("mouseover.radio", function () {
					if (self.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.radio", function () {
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
		
		_setOption: function (key, value) {
			var self = this,
			originalCheckedState = self.options.checked;
			$.Widget.prototype._setOption.apply(this, arguments);

			if (key === 'checked') {
				self.element.attr("checked", value);
				self._refresh();
				if (originalCheckedState !== value) {
					self._trigger("changed", null, {
						checked: value
					});
				}
			}
		},

		_setDefaul: function () {
			var self = this, o = self.options;
			
			if (o.checked !== undefined && 
					o.checked !== null) {
				this.element.attr("checked", o.checked);
			}
			if (this.element.attr("checked")) {
				this.element.parents(".wijmo-wijradio")
				.find("." + this._radiobuttonPre + "-box").children()
				.removeClass("ui-icon-radio-on ui-icon-radio-off")
				.addClass("ui-icon-radio-off");
				this.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
				this.element.data("radiobuttonElement").addClass("ui-state-checked");
			}
		},

		_refresh: function () {
			var name = this.element.attr("name") || "", self = this, radioEle;
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
				
				$(n).parents(".wijmo-wijradio").removeClass("ui-state-checked");
				
				radioEle = $(n).parents(".wijmo-wijradio").find(":radio");
				if (radioEle.wijradio("option", "checked") && 
					radioEle[0] !== self.element[0]) {
					radioEle.wijradio("setCheckedOption", false);
				}
			});

			if (self.element.is(":checked")) {
				self.element.data("iconElement")
				.removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
				self.element.data("boxElement").removeClass("ui-state-default")
				.addClass("ui-state-active").attr("aria-checked", true);
				self.element.data("radiobuttonElement").addClass("ui-state-checked");
			}
			
			self.options.checked  = self.element.is(":checked");
		},

		setCheckedOption: function (value) {
			var self = this, o = self.options;
			
			if (o.checked !== null && o.checked !== value) {
				o.checked = value;
				self._trigger("changed", null, {
					checked: value
				});
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
