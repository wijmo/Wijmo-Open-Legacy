/*
 *
 * Wijmo Library 0.8.0
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
	var radiobuttonId = 0;
	$.widget("ui.wijradiobuttondecorator", {
		_radiobuttonPre: "ui-wijradiobutton",
		_create: function () {
			var that = this;
			if (this.element.is(":radio")) {
				if (!that.element.attr("id")) {
					that.element.attr("id", "ui-radio-" + radiobuttonId);
					radiobuttonId += 1;
				}
				var radiobuttonElement;
				if (that.element.parent().is("label")) {
					radiobuttonElement = that.element.parent().wrap("<div class='" + that._radiobuttonPre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._radiobuttonPre + " ui-widget");
					var label = that.element.parent();
					label.attr("for", that.element.attr("id"));
					radiobuttonElement.find("." + that._radiobuttonPre + "-inputwrapper").append(that.element);
					radiobuttonElement.append(label);

				}
				else {
					radiobuttonElement = that.element.wrap("<div class='" + that._radiobuttonPre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._radiobuttonPre + " ui-widget");
				}
				var targetLabel = $("label[for='" + that.element.attr("id") + "']");
				if (targetLabel.length > 0) {
					radiobuttonElement.append(targetLabel);
					targetLabel.attr("labelsign", "wij");
					//targetLabel.attr("tabindex", 0);
				}
				var boxElement = $("<div class='" + that._radiobuttonPre + "-box ui-widget ui-state-default ui-corner-all'><span class='" + that._radiobuttonPre + "-icon'></span></div>");
				var iconElement = boxElement.children("." + that._radiobuttonPre + "-icon");
				radiobuttonElement.append(boxElement);
				iconElement.addClass("ui-icon ui-icon-radio-off");
				that.element.data("iconElement", iconElement);
				that.element.data("boxElement", boxElement);
				if (that.element.is(":disabled")) {
					that._setOption("disabled", true);
				}

				boxElement.removeClass(that._radiobuttonPre + "-relative");
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(that._radiobuttonPre + "-relative");
				}
				that._refresh();
				//			boxElement.css("margin-top","9px");

				that.element.bind("click.checkbox", function () {
					that._refresh();
				}).bind("focus.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover").addClass("ui-state-default");
				});

				radiobuttonElement.click(function () {
					if (targetLabel.length === 0 || targetLabel.html() === "") {
						that.element.attr("checked", true);
						that._refresh();
					}

				});

				radiobuttonElement.bind("mouseover.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus").addClass("ui-state-default");
				});

			}
		},

		_refresh: function () {
			var name = this.element.attr("name");
			var self = this;
			$("[name=" + name + "]").each(function (i, n) {
				$(n).parents(".ui-wijradiobutton").find("." + self._radiobuttonPre + "-box").children().removeClass("ui-icon-radio-on ui-icon-radio-off").addClass("ui-icon-radio-on");
				$(n).parents(".ui-wijradiobutton").find("." + self._radiobuttonPre + "-box").removeClass("ui-state-active").addClass("ui-state-default");
			});
			if (self.element.is(":checked")) {
				self.element.data("iconElement").removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
				self.element.data("boxElement").removeClass("ui-state-default").addClass("ui-state-active");
			}
		},
		destroy: function () {
			var self = this;
			var boxelement = self.element.parent().parent();
			boxelement.children("div." + self._radiobuttonPre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
})(jQuery);
