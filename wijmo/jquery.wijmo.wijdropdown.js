/*globals jQuery,document,window*/
"use strict";
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
* * Wijmo Dropdown widget.
* 
* Depends:
*  jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
(function ($) {
	$.widget("wijmo.wijdropdown", {
		options: {
			width: 200,
			height: 250,
			zIndex: 1000,
			showingAnimation: { effect: "blind" },
			hidingAnimation: { effect: "blind" }
		},
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		focusClass: "ui-state-focus",

		_create: function () {
			if (this.element.attr("tagName").toLowerCase() !== "select" &&
			this.element.attr("size") < 2) {
				return;
			}
			this._activeItem = null;
			this._applySelect(this.element);
		},

		_applySelect: function (n) {
			var self = this, height = $(n).outerHeight(), dropdownbox,
			container, label, inputWrap, span, maxIndex;

			$(n).wrap("<div></div>");
			$(n).wrap("<div></div>");
			dropdownbox = $(n).parent().addClass("ui-helper-hidden");

			container = dropdownbox.parent().attr("role", "select")
			.addClass("wijmo-wijdropdown ui-widget ui-widwijmo-wijdropdownt-content " +
			"ui-state-default ui-corner-all ui-helper-clearfix");

			label = $("<label class=\"wijmo-dropdown-label ui-corner-all\"></label>")
			.attr("id", self.element.attr("id") + "_select")
			.attr("name", $(n).attr("name"));
			inputWrap = $("<div></div>")
			.addClass("wijmo-dropdown-trigger ui-state-default ui-corner-right");
			span = $("<span></span>")
			.addClass("ui-icon ui-icon-triangle-1-s")
			.appendTo(inputWrap);

			self._value = $(n).val();

			self.$anthorWarp = $("<a href=\"#\"></a>");
			self.$anthorWarp.append(label);

			self.div = $("<div>");
			container.append(self.$anthorWarp);
			container.append(inputWrap);
			container.append(self.div);
			container.css({
				width: self.options.width
			});
			self.div.addClass("wijmo-dropdown");
			label.data("dropdown", self.div);

			self.$dropdownList = $("<ul></ul>")
			.addClass("wijmo-dropdown-list ui-widget-content " +
			"ui-widget ui-corner-all ui-helper-reset")
			.appendTo(self.div);

			self.element.children().each(function () {//this.element
				var $chilren = $(this), $item, $items, $list, $text;
				if ($chilren.is("option")) {
					$item = $(this);
					self.$dropdownList.append(self._buildItem($item));
				}
				else if ($chilren.is("optgroup")) {
					$list = $("<li class=\"wijmo-dropdown-optgroup\"></li>");
					$text = $("<span>" +
					$chilren.attr("label") + "</span>")
					.addClass("wijmo-optgroup-header ui-priority-primary");
					$items = $("<ul></ul>")
					.addClass("ui-helper-reset wijmo-dropdown-items");
					$list.append($text).append($items);

					$chilren.children("option").each(function () {
						var $item = $(this);
						$items.append(self._buildItem($item));
					});
					self.$dropdownList.append($list);
				}
			});

			label.bind("click." + self.widgetName, function (event) {
				if (!self.div.is(":visible")) {
					self._show();
				}
				else {
					self._hide();
				}
				event.preventDefault();
			}).bind("mouseover." + self.widgetName, function () {
				label.addClass(self.hoverClass);
				inputWrap.addClass(self.hoverClass);
			}).bind("mouseout." + self.widgetName, function () {
				label.removeClass(self.hoverClass);
				inputWrap.removeClass(self.hoverClass);
			}).bind("mousedown." + self.widgetName, function () {
				label.addClass(self.activeClass);
				inputWrap.addClass(self.activeClass);
			}).bind("mouseup." + self.widgetName, function () {
				label.removeClass(self.activeClass);
				inputWrap.removeClass(self.activeClass);
			});

			inputWrap.bind("click." + self.widgetName, function () {
				if (!self.div.is(":visible")) {
					self._show();
				}
				else {
					self._hide();
				}
				self.$anthorWarp.focus();
			}).bind("mouseover." + self.widgetName, function () {
				label.addClass(self.hoverClass);
				inputWrap.addClass(self.hoverClass);
			}).bind("mouseout." + self.widgetName, function () {
				label.removeClass(self.hoverClass);
				inputWrap.removeClass(self.hoverClass);
			}).bind("mousedown." + self.widgetName, function () {
				label.addClass(self.activeClass);
				inputWrap.addClass(self.activeClass);
			}).bind("mouseup." + self.widgetName, function () {
				label.removeClass(self.activeClass);
				inputWrap.removeClass(self.activeClass);
			});

			$(document.body).bind("click." + self.widgetName, function (e) {
				var div = self.div,
					offset;

				if (div.is(":hidden")) {
					return;
				}
				offset = div.offset();
				if (e.target === label.get(0) ||
				e.target === inputWrap.get(0) ||
				e.target === inputWrap.children().get(0)) {
					return;
				}
				//Add comments by RyanWu@20101124.
				//For fixing the issue that hide method maybe be invoked 
				//twice when clicking on some special places.
				//				if (e.pageX < offset.left || 
				//				e.pageX > offset.left + self.div.width()) {
				//					self.div.hide();
				//				}
				//				if (e.pageY < offset.top || 
				//				e.pageY > offset.top + self.div.height()) {
				//					self.div.hide();
				//				}
				if (e.pageX < offset.left || e.pageX > offset.left + div.width() ||
					e.pageY < offset.top || e.pageY > offset.top + div.height()) {
					self._hide();
				}
				//end by RyanWu@20101124.
			});



			self.div.bind("click." + self.widgetName, function (event) {
				var el = $(event.target);
				if (el.closest("li.wijmo-dropdown-item", $(this)).length > 0) {
					self._setValue();
					$(this).hide();
				}
			});

			height = Math.min(self.options.height, self.$dropdownList.outerHeight());

			maxIndex = self._getMaxZIndex();
			self.div.css({
				height: height,
				width: self.options.width
			});
			self.superpanel = self.div.wijsuperpanel().data("wijsuperpanel");

			if ($.fn.bgiframe) {
				self.superpanel.element.bgiframe();
			}
			self.$dropdownList
			.setOutWidth(self.$dropdownList.parent().parent().innerWidth());
			self.div.hide();

			self.$anthorWarp.bind("keydown." + self.widgetName, function (e) {
				var keyCode = $.ui.keyCode;
				switch (e.which) {
				case keyCode.UP:
				case keyCode.LEFT:
					self.previous();
					self._setValue();
					e.preventDefault();
					break;
				case keyCode.DOWN:
				case keyCode.RIGHT:
					self.next();
					self._setValue();
					e.preventDefault();
					break;
				case keyCode.PAGE_DOWN:
					self.nextPage(true);
					self._setValue();
					e.preventDefault();
					break;
				case keyCode.PAGE_UP:
					self.previousPage(true);
					self._setValue();
					e.preventDefault();
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					self._setValue();
					self.div.hide();
					e.preventDefault();
					break;
				}
			}).bind("focus." + self.widgetName, function () {
				label.addClass(self.focusClass);
				inputWrap.addClass(self.focusClass);
			}).bind("blur." + self.widgetName, function () {
				label.removeClass(self.focusClass);
				inputWrap.removeClass(self.focusClass);
			});
		},

		_init: function () {
			var self = this;
			self._initActiveItem();
			if (self._activeItem) {
				self.$anthorWarp.children("label").text(self._activeItem.text());
			}
		},

		_buildItem: function ($item) {
			var val = $item.val(), text = $item.text(), self = this,
				$li = $("<li class=\"wijmo-dropdown-item ui-corner-all\"><span>" +
					text + "</span></li>")
					.mousemove(function (event) {
						var current = $(event.target).closest(".wijmo-dropdown-item");
						if (current !== this.last) {
							self._activate($(this));
						}
						this.last = $(event.target).closest(".wijmo-dropdown-item");
					}).attr("role", "option");
			$li.data("value", val);
			return $li;
		},

		_show: function () {
			var self = this, showingAnimation = self.options.showingAnimation,
				div = self.div;
			div.css("z-index", "100000");
			if ($.browser.msie && ($.browser.version === "6.0" || 
			$.browser.version === "7.0")) {
				div.parent().css("z-index", "99999");
			}
			if (showingAnimation) {
				div.stop().show(
				showingAnimation.effect,
				showingAnimation.options,
				showingAnimation.speed,
				function () {
					self._initActiveItem();
				});
			}
			else {
				div.show();
			}
		},

		_hide: function () {
			var self = this,
				hidingAnimation = self.options.hidingAnimation,
				div = self.div;

			if (div.is(":hidden")) {
				return;
			}
			if (hidingAnimation) {
				div.stop(false, true).hide(
				hidingAnimation.effect,
				hidingAnimation.options,
				hidingAnimation.speed,
				function () {
					if ($.isFunction(hidingAnimation.callback)) {
						hidingAnimation.callback.apply(self, arguments);
					}
					if ($.browser.msie && $.browser.version === "6.0" ||
					$.browser.version === "7.0") {
						div.parent().css("z-index", "");
					}
					div.css("z-index", "");
				});
			}
			else {
				if ($.browser.msie && $.browser.version === "6.0") {
					div.parent().css("z-index", "");
				}
				div.css("z-index", "");
				div.hide();
			}
		},

		_setValue: function () {
			var self = this, div = self.div, top, height;
			if (self._activeItem) {
				self.$anthorWarp.children("label").text(self._activeItem.text());
				self._value = self._activeItem.data("value");

				if (self.superpanel.vNeedScrollBar) {
					top = self._activeItem.offset().top;
					height = self._activeItem.outerHeight();
					if (div.offset().top > top) {
						div.wijsuperpanel("scrollTo", 0,
						top - self.$dropdownList.offset().top);
					}
					else if (div.offset().top < top + height - div.innerHeight()) {
						div.wijsuperpanel("scrollTo", 0,
						top + height - div.height() - self.$dropdownList.offset().top);
					}
				}
				self.element.val(self._value);
			}
		},

		_initActiveItem: function () {
			var self = this;
			if (self._value) {
				self.$dropdownList.find("li.wijmo-dropdown-item").each(function () {
					if ($(this).data("value") === self._value) {
						self._activate($(this));
					}
				});
			}
		},

		_activate: function (item) {
			var self = this;
			self._deactivate();
			self._activeItem = item;
			self._activeItem.addClass(self.hoverClass).attr("aria-selected", true);
		},

		_deactivate: function () {
			var self = this;
			if (self._activeItem) {
				self._activeItem.removeClass(self.hoverClass)
				.attr("aria-selected", false);
			}
		},

		next: function () {
			this._move("next", "first");
		},

		previous: function () {
			this._move("prev", "last");
		},

		_move: function (direction, edge) {
			var self = this, $nextLi, next;
			if (!self._activeItem) {
				self._activate(self.$dropdownList.find(".wijmo-dropdown-item:" + edge));
				return;
			}

			$nextLi = self._activeItem[direction]().eq(0);
			if ($nextLi.length) {
				next = self._getNextItem($nextLi, direction, edge);
			}
			else if (self._activeItem.closest(".wijmo-dropdown-optgroup").length) {
				next = self._getNextItem(self._activeItem
				.closest(".wijmo-dropdown-optgroup")[direction](),
				direction, edge);
			}

			if (next && next.length) {
				self._activate(next);
			} else {
				self._activate(self.$dropdownList.find(".wijmo-dropdown-item:" + edge));
			}
		},

		_getNextItem: function (next, direction, edge) {
			if (next.length) {
				if (next.is(".wijmo-dropdown-optgroup")) {
					if (!!next.find(">ul>li.wijmo-dropdown-item").length) {
						return next.find(">ul>li.wijmo-dropdown-item:" + edge).eq(0);
					}
					else {
						this._getNextItem(next[direction]().eq(0));
					}
				}
				else {
					return next;
				}
			}
		},

		_isFirst: function () { },

		_isLast: function () { },

		nextPage: function () {
			var self = this, base, height, result;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self.activate(self.element.children(":first"));
					return;
				}
				base = self._activeItem.offset().top;
				height = self.options.height;
				result = self.$dropdownList.find(".wijmo-dropdown-item")
				.filter(function () {
					var close = $(this).offset().top - base - height + $(this).height(),
					lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});
				if (!result.length) {
					result = self.$dropdownList.find(".wijmo-dropdown-item:last");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".wijmo-dropdown-item" +
				(!self._activeItem || self._isLast() ? ":first" : ":last")));
			}
		},

		previousPage: function () {
			var self = this, base, height, result;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self._activate(self.element.children(":last"));
					return;
				}
				base = self._activeItem.offset().top;
				height = self.options.height;
				result = self.$dropdownList.find(".wijmo-dropdown-item")
				.filter(function () {
					var close = $(this).offset().top - base + height - $(this).height(),
					lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});

				if (!result.length) {
					result = self.$dropdownList.find(".wijmo-dropdown-item:first");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".wijmo-dropdown-item" +
				(!self._activeItem || self._isFirst() ? ":last" : ":first")));
			}
		},

		_getMaxZIndex: function () {
			var self = this, index = 100;
			if (self.element.data("maxZIndex")) {
				return self.element.data("maxZIndex");
			}
			$("*", document).each(function (i, n) {
				if (window.parseInt($(n).css("z-index")) > index) {
					index = window.parseInt($(n).css("z-index"));
				}
			});
			self.element.data("maxZIndex", index);
			return index;
		},

		destroy: function () {
			this.element.closest(".wijmo-wijdropdown")
			.find(">div.wijmo-dropdown-trigger,>div.wijmo-dropdown," +
			">label.wijmo-dropdown-label").remove();
			this.element.unwrap().unwrap().removeData("maxZIndex");
			$.Widget.prototype.destroy.apply(this);
		}
	});
}(jQuery));
