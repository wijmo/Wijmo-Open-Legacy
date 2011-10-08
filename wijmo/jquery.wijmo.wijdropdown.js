/*globals jQuery,document,window*/
/*
*
* Wijmo Library 1.5.0
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
	"use strict";
	$.widget("wijmo.wijdropdown", {
		options: {
			zIndex: 1000,
			showingAnimation: { effect: "blind" },
			hidingAnimation: { effect: "blind" }
		},
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		focusClass: "ui-state-focus",

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);
			if (key === "disabled") {
				this._labelWrap.toggleClass("ui-state-disabled", value);
				this.element.attr("disabled", value ? "disabled" : "");
			}
		},

		_create: function () {
			var self = this,
				ele = self.element;
			if (ele.get(0).tagName.toLowerCase() !== "select") {
				return;
			}

			self._activeItem = null;
			self._createSelect();
			self._bindEvents();
		},

		_createSelect: function () {
			var self = this,
				ele = self.element,
				width = ele.width(),
				eleWidth = width,
				//height = ele.height(),
				isVisible = ele.is(":visible"),
				selectWrap = ele.wrap("<div></div>").parent()
					.addClass("ui-helper-hidden"),
				container = selectWrap.wrap("<div></div>")
					.parent().attr("role", "select")
					.addClass("wijmo-wijdropdown ui-widget ui-widwijmo-wijdropdownt" +
					"-content ui-state-default ui-corner-all ui-helper-clearfix"),
				label = $("<label class=\"wijmo-dropdown-label ui-corner-all\"></label>")
					.attr("id", ele.get(0).id + "_select")
					.attr("name", ele.attr("name") || ""),
				rightTrigger = $("<div></div>")
					.addClass("wijmo-dropdown-trigger ui-state-default ui-corner-right"),
				labelWrap = $("<a href=\"#\"></a>"),
				listContainer = $("<div>").addClass("wijmo-dropdown"),
				list = $("<ul></ul>")
					.addClass("wijmo-dropdown-list ui-widget-content " +
					"ui-widget ui-corner-all ui-helper-reset").appendTo(listContainer);

			$("<span></span>")
					.addClass("ui-icon ui-icon-triangle-1-s")
					.appendTo(rightTrigger);


			width = Math.max(width, container.width());
			if (ele.get(0).tabIndex !== "") {
				labelWrap.attr("tabindex", ele.attr("tabindex"));
			}

			if (ele.get(0).disabled !== false) {
				self.options.disabled = true;
				labelWrap.addClass("ui-state-disabled");
			}

			labelWrap.append(label);
			container.append(selectWrap)
				.append(labelWrap)
				.append(rightTrigger)
				.append(listContainer);
			eleWidth += parseInt(label.css("padding-left").replace(/px/, ""));
			eleWidth += parseInt(label.css("padding-right").replace(/px/, ""));
			eleWidth -= 16;
			container.width(eleWidth);

			self._buildList(list, listContainer, eleWidth);

			self._rightTrigger = rightTrigger;
			self._label = label;
			self._listContainer = listContainer;
			self._list = list;
			self._value = ele.val();
			self._selectWrap = selectWrap;
			self._labelWrap = labelWrap;

			if (!isVisible) {
				container.hide();
			}

		},

		_buildList: function (list, listContainer, eleWidth) {
			var self = this,
				ele = self.element, height;
			listContainer.show();

			ele.children().each(function (i, n) {
				var item = $(n),
					group, groupText, goupItems;
				if (item.is("option")) {
					list.append(self._buildItem(item));
				}
				else {
					group = $("<li class=\"wijmo-dropdown-optgroup\"></li>");
					groupText = $("<span>" + item.attr("label") + "</span>")
					.addClass("wijmo-optgroup-header ui-priority-primary");
					goupItems = $("<ul></ul>")
					.addClass("ui-helper-reset wijmo-dropdown-items");

					item.children("option").each(function () {
						goupItems.append(self._buildItem($(this)));
					});
					group.append(groupText)
						.append(goupItems);
					list.append(group);
				}
			});

			height = listContainer.height();
			height = list.outerHeight() < height ? list.outerHeight() : height;
			listContainer.css({
				height: height,
				width: eleWidth
			});

			if (listContainer.data("wijsuperpanel")) {
				listContainer.wijsuperpanel("paintPanel");
				self.superpanel = listContainer.data("wijsuperpanel");
			}
			else {
				self.superpanel = listContainer.wijsuperpanel().data("wijsuperpanel");
			}
			if ($.fn.bgiframe) {
				self.superpanel.element.bgiframe();
			}
			list.setOutWidth(list.parent().parent().innerWidth());
			listContainer.hide();
		},

		_handelEvents: function (ele) {
			var self = this,
				namespace = "." + self.widgetName,
				element = self.element;

			ele.bind("click" + namespace, function (e) {
				if (self.options.disabled) {
					return;
				}
				if (self._listContainer.is(":hidden")) {
					self._show();
				}
				else {
					self._hide();
				}
				element.click();
				if (ele.get(0) === self._label.get(0)) {
					e.preventDefault();
				}
				else {
					self._labelWrap.focus();
				}
			}).bind("mouseover" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.addClass(self.hoverClass);
				self._rightTrigger.addClass(self.hoverClass);
				element.trigger('mouseover');
			}).bind("mouseout" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.removeClass(self.hoverClass);
				self._rightTrigger.removeClass(self.hoverClass);
				element.trigger('mouseout');
			}).bind("mousedown" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.addClass(self.activeClass);
				self._rightTrigger.addClass(self.activeClass);
				element.trigger('mousedown');
			}).bind("mouseup" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				self._label.removeClass(self.activeClass);
				self._rightTrigger.removeClass(self.activeClass);
				element.trigger('mouseup');
			});
		},

		_bindEvents: function () {
			var self = this,
				namespace = "." + self.widgetName,
				label = self._label,
				rightTrigger = self._rightTrigger,
				labelWrap = self._labelWrap,
				listContainer = self._listContainer,
				ele = self.element,
				offset;
			self._handelEvents(self._label);
			self._handelEvents(self._rightTrigger);

			$(document.body).bind("click" + namespace, function (e) {
				if (listContainer.is(":hidden")) {
					return;
				}
				offset = listContainer.offset();
				if (e.target === label.get(0) ||
				e.target === rightTrigger.get(0) ||
				e.target === rightTrigger.children().get(0)) {
					return;
				}
				if (e.pageX < offset.left ||
					e.pageX > offset.left + listContainer.width() ||
					e.pageY < offset.top ||
					e.pageY > offset.top + listContainer.height()) {
					self._hide();
				}
			});

			listContainer.bind("click" + namespace, function (e) {
				var target = $(e.target);
				if (target.closest("li.wijmo-dropdown-item", $(this)).length > 0) {
					self._setValue();
					listContainer.hide();
					self.oldVal = ele.val();
					ele.val(self._value);
					if (self.oldVal !== self._value) {
						ele.trigger("change");
					}
				}
				ele.click();
			});

			labelWrap.bind("keydown" + namespace, function (e) {
				if (self.options.disabled) {
					return;
				}
				var keyCode = $.ui.keyCode;
				switch (e.which) {
				case keyCode.UP:
				case keyCode.LEFT:
					self.previous();
					self._setValue();
					break;
				case keyCode.DOWN:
				case keyCode.RIGHT:
					self.next();
					self._setValue();
					break;
				case keyCode.PAGE_DOWN:
					self.nextPage();
					self._setValue();
					break;
				case keyCode.PAGE_UP:
					self.previousPage();
					self._setValue();
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					self._setValue();
					self._listContainer.hide();
					self.oldVal = ele.val();
					ele.val(self._value);
					if (self.oldVal !== self._value) {
						ele.trigger("change");
					}
					break;
				}
				if (e.which !== keyCode.TAB) {
					e.preventDefault();
				}
				ele.trigger('keydown');
			}).bind("focus" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				label.addClass(self.focusClass);
				rightTrigger.addClass(self.focusClass);
				ele.focus();
			}).bind("blur" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				label.removeClass(self.focusClass);
				rightTrigger.removeClass(self.focusClass);
				ele.trigger('blur');
			}).bind("keypress" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				ele.trigger('keypress');
			}).bind("keyup" + namespace, function () {
				if (self.options.disabled) {
					return;
				}
				ele.trigger('keyup');
			});
		},

		_init: function () {
			var self = this;
			self._initActiveItem();
			if (self._activeItem) {
				self._label.text(self._activeItem.text());
			}
		},

		_buildItem: function ($item) {
			var val = $item.val(), text = $item.text(), self = this, $li;
			if (text === "") {
				text = "&nbsp;";
			}
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
			var self = this, listContainer = self._listContainer,
				showingAnimation = self.options.showingAnimation;
			listContainer.css("z-index", "100000");
			if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
				listContainer.parent().css("z-index", "99999");
			}
			if (showingAnimation) {
				listContainer.stop().show(
				showingAnimation.effect,
				showingAnimation.options,
				showingAnimation.speed,
				function () {
					self._initActiveItem();
				});
			}
			else {
				listContainer.show();
			}
		},

		_hide: function () {
			var self = this, listContainer = self._listContainer,
				hidingAnimation = self.options.hidingAnimation;

			if (listContainer.is(":hidden")) {
				return;
			}
			if (hidingAnimation) {
				listContainer.stop(false, true).hide(
				hidingAnimation.effect,
				hidingAnimation.options,
				hidingAnimation.speed,
				function () {
					if ($.isFunction(hidingAnimation.callback)) {
						hidingAnimation.callback.apply(self, arguments);
					}
					if ($.browser.msie && /^[6,7]\.[0-9]+/.test($.browser.version)) {
						listContainer.parent().css("z-index", "");
					}
					listContainer.css("z-index", "");
				});
			}
			else {
				if ($.browser.msie && $.browser.version === "6.0") {
					listContainer.parent().css("z-index", "");
				}
				listContainer.css("z-index", "");
				listContainer.hide();
			}
		},

		_setValue: function () {
			var self = this, listContainer = self._listContainer, top, height;
			if (self._activeItem) {
				self._label.text(self._activeItem.text());
				self._value = self._activeItem.data("value");

				if (self.superpanel.vNeedScrollBar) {
					top = self._activeItem.offset().top;
					height = self._activeItem.outerHeight();
					if (listContainer.offset().top > top) {
						listContainer.wijsuperpanel("scrollTo", 0,
						top - self._list.offset().top);
					}
					else if (listContainer.offset().top < top + height -
						listContainer.innerHeight()) {
						listContainer.wijsuperpanel("scrollTo", 0,
						top + height - listContainer.height() - self._list.offset().top);
					}
				}
			}
		},

		_initActiveItem: function () {
			var self = this;
			if (self._value !== undefined) {
				self._list.find("li.wijmo-dropdown-item").each(function () {
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

		nextPage: function () {
			this._movePage("first");
		},

		previousPage: function () {
			this._movePage("last");
		},

		refresh: function () {
			var self = this, containerWidth;
			if (!self._list) {
				return;
			}

			self._listContainer.show();
			containerWidth = self._listContainer.width();
			self._list.empty();
			self._buildList(self._list, self._listContainer, containerWidth);
			self._value = self.element.val();
			self._initActiveItem();
			if (self._activeItem) {
				self._label.text(self._activeItem.text());
			}
		},

		_move: function (direction, edge) {
			var self = this, $nextLi, next;
			if (!self._activeItem) {
				self._activate(self._list.find(".wijmo-dropdown-item:" + edge));
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
				self._activate(self._list.find(".wijmo-dropdown-item:" + edge));
			}
		},

		_movePage: function (direction) {//argu: "first","last"
			var self = this, base, height, result,
			antiDirection = direction === "first" ? "last" : "first";
			if (self.superpanel.vNeedScrollBar) {
				base = self._activeItem.offset().top;
				height = self.options.height;
				result = self._list.find(".wijmo-dropdown-item")
				.filter(function () {
					var close = $(this).offset().top - base +
					(direction === "first" ? -height : height) + $(this).height(),
					lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});
				if (!result.length) {
					result = self._list.find(".wijmo-dropdown-item:" +
					antiDirection);
				}
				self._activate(result);
			} else {
				self._activate(self._list.find(".wijmo-dropdown-item:" +
				(!self._activeItem ? direction : antiDirection)));
			}
		},

		_getNextItem: function (next, direction, edge) {
			if (next.length) {
				if (next.is(".wijmo-dropdown-optgroup")) {
					if (!!next.find(">ul>li.wijmo-dropdown-item").length) {
						return next.find(">ul>li.wijmo-dropdown-item:" + edge).eq(0);
					} else {
						this._getNextItem(next[direction]().eq(0));
					}
				} else {
					return next;
				}
			}
		},

		destroy: function () {
			this.element.closest(".wijmo-wijdropdown")
			.find(">div.wijmo-dropdown-trigger,>div.wijmo-dropdown," +
			">a").remove();
			this.element.unwrap().unwrap().removeData("maxZIndex");
			$.Widget.prototype.destroy.apply(this);
		}
	});
} (jQuery));
