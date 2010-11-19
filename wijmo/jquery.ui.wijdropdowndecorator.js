/*
*
* Wijmo Library 0.8.2
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
	$.widget("ui.wijdropdowndecorator", {
		options: {
			width: 200,
			height: 250,
			showingAnimation: { effect: "blind" },
			hidingAnimation: { effect: "blind" }
		},
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		focusClass: "ui-state-focus",

		_create: function () {
			if (this.element.attr("tagName").toLowerCase() !== "select" && this.element.attr("size") < 2) {//make sure it's not a listbox.
				return;
			}
			this._activeItem = null;
			this._applySelect(this.element);
		},

		_applySelect: function (n) {
			var self = this;
			//var divWidth = $(n).width();
			var height = $(n).outerHeight();
			$(n).wrap("<div></div>");
			$(n).wrap("<div></div>");
			var dropdownbox = $(n).parent();
			dropdownbox.addClass("ui-helper-hidden");
			var container = dropdownbox.parent();
			container.addClass("ui-wijdropdowndecorator ui-widget ui-widget-content ui-state-default ui-corner-all ui-helper-clearfix");


			var label = $("<label class=\"ui-dropdown-label ui-corner-all\"></label>");
			label.attr("id", self.element.attr("id") + "_select");
			label.attr("name", $(n).attr("name"));
			var inputWrap = $("<div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\"></div>");
			var span = $("<span class=\"ui-icon ui-icon-triangle-1-s\"></span>");
			inputWrap.append(span);

			self._value = $(n).val();

			self.$anthorWarp = $("<a href=\"#\"></a>");
			self.$anthorWarp.append(label);

			//$(n).hide();
			self.div = $("<div>");
			container.append(self.$anthorWarp);
			container.append(inputWrap);
			container.append(self.div);
			container.css({
				width: self.options.width
			});
			self.div.addClass("ui-dropdown");
			label.data("dropdown", self.div);
			var maxIndex = self._getMaxZIndex();

			self.$dropdownList = $("<ul></ul>")
			.addClass("ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset")
			.appendTo(self.div);

			self.element.children().each(function () {//this.element
				var $chilren = $(this);
				if ($chilren.is("option")) {
					var $item = $(this);
					self.$dropdownList.append(buildItem($item));
				}
				else if ($chilren.is("optgroup")) {
					var $list = $("<li class=\"ui-dropdown-optgroup\"></li>");
					var $text = $("<span class=\"ui-optgroup-header ui-priority-primary\">" + $chilren.attr("label") + "</span>");
					var $items = $("<ul class=\"ui-helper-reset ui-dropdown-items\"></ul>");
					$list.append($text).append($items);

					$chilren.children("option").each(function () {
						var $item = $(this);
						$items.append(buildItem($item));
					});
					self.$dropdownList.append($list);
				}

				function buildItem($item) {
					var val = $item.val();
					var text = $item.text();
					var $li = $("<li class=\"ui-dropdown-item ui-corner-all\"><span>" + text + "</span></li>")
					.mousemove(function (event) {//mousemove replace mouseenter to resolve the hovered <li> changed issue when scrolling the ddl
						var current = $(event.target).closest(".ui-dropdown-item");
						if (current !== this.last) {
							self._activate($(this));
						}
						this.last = $(event.target).closest(".ui-dropdown-item");
					});
					$li.data("value", val);
					return $li;
				}
			});

			label.bind("click." + self.widgetName, function () {
				if (!self.div.is(":visible")) {
					self._show();
				}
				else {
					self._hide();
				}
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
				var offset = self.div.offset();
				//console.log($.contains(self.div, $(e.target)));
				if (e.target === label.get(0) || e.target === inputWrap.get(0) || e.target === inputWrap.children().get(0)) {
					return;
				}
				if (e.pageX < offset.left || e.pageX > offset.left + self.div.width()) {
					self.div.hide();
				}
				if (e.pageY < offset.top || e.pageY > offset.top + self.div.height()) {
					self.div.hide();
				}
			});



			self.div.bind("click." + self.widgetName, function (event) {
				var el = $(event.target);
				if (el.closest("li.ui-dropdown-item", $(this)).length > 0) {
					self._setValue();
					$(this).hide();
				}
			});

			height = Math.min(self.options.height, self.$dropdownList.outerHeight());
			self.div.css("z-index", maxIndex + 1).css({
				height: height,
				width: self.options.width
			});
			self.superpanel = self.div.wijsuperpanel().data("wijsuperpanel");
			self.$dropdownList.setOutWidth(self.$dropdownList.parent().parent().innerWidth());
			self.div.hide();

			self.$anthorWarp.bind("keydown." + self.widgetName, function (e) {//Remove Keyboard Event to div
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

		_show: function () {
			var self = this, showingAnimation = self.options.showingAnimation;
			if (showingAnimation != null) {
				self.div.show(showingAnimation.effect, showingAnimation.options, showingAnimation.speed, function () {
					self._initActiveItem();
				});
			}
			else {
				self.div.show();
			}
		},

		_hide: function () {
			var self = this, hidingAnimation = self.options.hidingAnimation;
			if (hidingAnimation != null) {
				self.div.hide(hidingAnimation.effect, hidingAnimation.options, hidingAnimation.speed, hidingAnimation.callback);
			}
			else {
				self.div.hide();
			}
		},

		_setValue: function () {
			var self = this;
			if (self._activeItem) {
				self.$anthorWarp.children("label").text(self._activeItem.text());
				self._value = self._activeItem.data("value");

				if (self.superpanel.vNeedScrollBar) {
					var div = self.div;
					var top = self._activeItem.offset().top,
					height = self._activeItem.outerHeight();
					if (div.offset().top > top) {
						div.wijsuperpanel("scrollTo", 0, top - self.$dropdownList.offset().top);
					}
					else if (div.offset().top < top + height - div.innerHeight()) {
						div.wijsuperpanel("scrollTo", 0, top + height - div.height() - self.$dropdownList.offset().top);
					}
				}
				self.element.val(self._value);
			}
		},

		_initActiveItem: function () {
			var self = this;
			if (self._value) {
				self.$dropdownList.find("li.ui-dropdown-item").each(function () {
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
			self._activeItem.addClass(self.hoverClass);
		},

		_deactivate: function () {
			var self = this;
			if (self._activeItem) {
				self._activeItem.removeClass(self.hoverClass);
			}
		},

		next: function () {
			this._move("next", "first");
		},

		previous: function () {
			this._move("prev", "last");
		},

		_move: function (direction, edge) {
			var self = this;
			if (!self._activeItem) {
				self._activate(self.$dropdownList.find(".ui-dropdown-item:" + edge));
				return;
			}

			var $nextLi = self._activeItem[direction]().eq(0), next;
			if ($nextLi.length) {
				next = self._getNextItem($nextLi, direction, edge);
			}
			else if (self._activeItem.closest(".ui-dropdown-optgroup").length) {
				next = self._getNextItem(self._activeItem.closest(".ui-dropdown-optgroup")[direction](), direction, edge);
			}

			if (next && next.length) {
				self._activate(next);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item:" + edge));
			}
		},

		_getNextItem: function (next, direction, edge) {
			if (next.length) {
				if (next.is(".ui-dropdown-optgroup")) {
					if (!!next.find(">ul>li.ui-dropdown-item").length) {
						return next.find(">ul>li.ui-dropdown-item:" + edge).eq(0);
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
			var self = this;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self.activate(self.element.children(":first"));
					return;
				}
				var base = self._activeItem.offset().top,
				height = self.options.height,
				result = self.$dropdownList.find(".ui-dropdown-item").filter(function () {
					var close = $(self).offset().top - base - height + $(self).height();
					return close < 10 && close > -10;
				});
				if (!result.length) {
					result = self.$dropdownList.find(".ui-dropdown-item:last");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item" + (!self._activeItem || self._isLast() ? ":first" : ":last")));
			}
		},

		previousPage: function () {
			var self = this;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self._activate(self.element.children(":last"));
					return;
				}
				var base = self._activeItem.offset().top,
				height = self.options.height,
				result = self.$dropdownList.find(".ui-dropdown-item").filter(function () {
					var close = $(self).offset().top - base + height - $(self).height();
					return close < 10 && close > -10;
				});

				if (!result.length) {
					result = self.$dropdownList.find(".ui-dropdown-item:first");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item" + (!self._activeItem || self._isFirst() ? ":last" : ":first")));
			}
		},

		_getMaxZIndex: function () {
			var self = this;
			var index = 100;
			if (self.element.data("maxZIndex")) {
				return self.element.data("maxZIndex");
			}
			$("*", document).each(function (i, n) {
				if (parseInt($(n).css("z-index")) > index) {
					index = parseInt($(n).css("z-index"));
				}
			});
			self.element.data("maxZIndex", index);
			return index;
		},

		destroy: function () {
			this.element.closest(".ui-wijdropdowndecorator").find(">div.ui-dropdown-trigger,>div.ui-dropdown,>label.ui-dropdown-label").remove();
			this.element.unwrap().unwrap().removeData("maxZIndex");
			$.Widget.prototype.destroy.apply(this);
		}
	});
})(jQuery);
