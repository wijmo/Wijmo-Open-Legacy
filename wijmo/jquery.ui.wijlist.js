/*
 *
 * Wijmo Library 0.7.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo List widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.wijsuperpanel.js
 *  
 */
(function ($) {
	var listCSS = 'ui-widget ui-widget-content ui-corner-all ui-wijlist',
		listItemCSS = 'ui-wijlist-item',
		listItemCSSAlternate = listItemCSS + '-alternate',
		listItemCSSSelected = listItemCSS + '-selected',
		
		listItemCSSFirst = listItemCSS + '-first',
		listItemCSSLast = listItemCSS + '-last',
		stateHover = 'ui-state-hover',
		uiStateActive = "ui-state-active",
		  activeItem = 'ui-active-wijlistitem',
		  selectedActive = listItemCSSSelected + ' ' + uiStateActive,
		itemKey = 'item.wijlist';
	$.widget("ui.wijlist", {
		options: {
			/// <summary>
			/// Select event handler of wijlist. A function will be called when any item in the list is selected.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// By data.item to obtain the item selected. 
			/// By data.item.element to obtain the li DOM element selected.
			///	</param>
			selected: null,
			/// <summary>
			/// A value indicates the selection mode of wijlist.
			/// Default: 'single'.
			/// Type: String.
			/// </summary>
			/// <remarks>
			/// Options are 'single' and 'multiple'. This option should not be set again after initialization.
			/// </remarks>
			selectionMode: 'single',
			/// <summary>
			/// A value determines whether to auto-size wijlist.
			/// Default: false.
			/// Type: String.
			/// </summary>
			autoSize: false,
			/// <summary>
			/// A value specifies the max items count to display if autoSize is set to true.
			/// Default: 5.
			/// Type: Number.
			/// </summary>
			maxItemsCount: 5,
			/// <summary>
			/// A value determines whether to add ui-state-hover class to list item when mouse enters.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			addHoverItemClass: true,
			/// <summary>
			/// A hash value sets to supepanel options when superpanel is created.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// A value indicates whether wijlist is disabled.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			disabled: false,
			/// <summary>
			/// A function called before an item is focused.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item to be activated.
			///	</param>
			/// <returns>
			/// returns false to cancel item focusing.
			/// </returns>
			focusing: null,
			/// <summary>
			/// A function called after an item is focused.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item to be activated.
			///	</param>
			focus: null,
			/// <summary>
			/// A function called when an item loses focus.
			/// Type: Function.
			/// Default: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item.
			///	</param>
			blur: null,
			/// <summary>
			/// A function called before an item is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: LI element with this item.
			/// item.list: wijlist instance.
			/// item.label: label of item.
			/// item.value: value of item.
			/// item.text: could be set in handler to override rendered label of item.
			///	</param>
			itemrendering: null,
			/// <summary>
			/// A function called after a item is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="item" type="Object">
			/// item rendered.
			///	</param>
			itemrendered: null,
			/// <summary>
			/// A function called after list is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="list" type="Object">
			/// list rendered.
			///	</param>
			listrendered: null,
			/// <summary>
			/// A value determines whether to keep item highlight when mouse is leaving list. 
			/// Default: Boolean.
			/// Type: false.
			/// </summary>
			keepHightlightOnMouseLeave: false
		},

		_create: function () {
			var self = this;
			var ele = self.element;
			ele.addClass(listCSS).attr({
				role: "listbox",
				"aria-activedescendant": activeItem
			}).bind('click.' + self.widgetName, self, self._onListClick);
			self.ul = $('<ul class="ui-wijlist-ul"></ul>').appendTo(ele);
			if (self.options.disabled) {
				self.disable();
			}
		},

		setItems: function (items) {
			/// <summary>
			/// Sets Items to be rendered by the wijlist.
			/// </summary>
			/// <param name="items" type="Array">
			/// Items array to be rendered.  The array contains object like {label: 'label', value: 'value'}.
			///	</param>
			this.items = items;
		},

		getList: function () {
			/// <summary>
			/// Gets the JQuery object reference of the ul element of wijlist.
			/// </summary>
			/// <returns type="JQueryObj">
			/// ul JQuery reference.
			/// </returns>

			return this.ul;
		},

		_onListClick: function (e) {
			if (!$(e.target).closest(".ui-wijlist-item").length) {
				return;
			}
			var self = e.data;
			self.select(e);
		},

		destroy: function () {
			/// <summary>
			/// Destroys wijlist.
			/// </summary>

			var self = this;
			var ele = self.element;
			if (self.superPanel !== undefined) {
				self.superPanel.destroy();
			}

			ele.removeClass(listCSS).removeAttr('role').removeAttr('aria-activedescendant');
			ele.unbind('.' + self.widgetName);
			self.ul.remove();

			$.Widget.prototype.destroy.apply(self, arguments);
		},

		activate: function (event, item, scrollTo) {
			///	<summary>
			///		Activates a wijlist item.
			///	</summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>
			/// <param name="item" type="wijlistItem">
			/// wijlistItem to activate.
			///	</param>
			/// <param name="scrollTo" type="Boolean">
			/// Whether to scroll activated item to view.
			///	</param>

			var self = this;
			self.deactivate();
			if (item == null || item == undefined) {
				return;
			}
			if (self._trigger('focusing', event, item) == false) {
				return;
			}
			var active = self.active = item.element;
			if (self.options.addHoverItemClass) {
				active.addClass(stateHover);
			}
			self.active.attr("id", activeItem);
			if (scrollTo && self.superPanel != undefined) {
				self.superPanel.scrollChildIntoView(active);
			}
			self._trigger("focus", event, item);
		},

		deactivate: function () {
			/// <summary>
			/// Deactivates activated items.
			/// </summary>

			var self = this;
			var a = self.active;
			if (!a) {
				return;
			}
			self._trigger("blur", null, a);
			a.removeClass(stateHover).removeAttr("id");
			self.active = undefined;
		},

		next: function (event) {
			/// <summary>
			/// Moves focus to the next item. 
			/// </summary>

			this.move("next", "." + listItemCSS + ":first", event);
		},

		nextPage: function () {
			/// <summary>
			/// Turns to the next page of the list.
			/// </summary>

			this.superPanel.doScrolling('bottom', true);
		},

		previous: function (event) {
			/// <summary>
			/// Moves focus to the previous item. 
			/// </summary>

			this.move("prev", "." + listItemCSS + ":last", event);
		},

		previousPage: function () {
			/// <summary>
			/// Turns to the previous page of the wijlist.
			/// </summary>

			this.superPanel.doScrolling('top', true);
		},

		first: function () {
			/// <summary>
			/// Tests that the focus is at the first item.
			/// </summary>

			return this.active && !this.active.prev().length;
		},

		last: function () {
			/// <summary>
			/// Tests that the focus is at the last item.
			/// </summary>

			return this.active && !this.active.next().length;
		},

		move: function (direction, edge, event) {
			/// <summary>
			/// Move focus between items.
			/// </summary>

			var self = this;
			if (!self.active) {
				var item = self.ul.children(edge).data(itemKey);
				self.activate(event, item, true);
				return;
			}
			var next = self.active[direction + "All"]("." + listItemCSS).eq(0);
			if (next.length) {
				self.activate(event, next.data(itemKey), true);
			}
			else {
				self.activate(event, self.element.children(edge).data(itemKey), true);
			}
		},

		select: function (event, data) {
			/// <summary>
			/// Selects active list item.
			/// </summary>
			///

			var self = this;
			if (self.active == undefined) {
				return;
			}

			var ele = self.active;
			var item = ele.data(itemKey);

			var singleMode = self.options.selectionMode == 'single';
			if (singleMode) {
				var previous = self.selectedItem;
				ele.addClass(selectedActive);
				item.selected = true;
				if (previous != undefined && item != previous) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				self._trigger("selected", event, {
					item: item,
					previousItem: previous,
					data: data
				});
			}
			else {
				item.selected = !item.selected;
				if (item.selected) {
					ele.addClass(selectedActive);
				}
				else {
					ele.removeClass(selectedActive);
				}
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				self._trigger("selected", event, {
					item: item,
					selectedItems: self.selectedItems
				});
			}
		},

		selectItems: function (indices, triggerSelected) {
			/// <summary>
			/// Selects multiple items in the list.
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// Indices of items to select.
			/// </param>

			var self = this;
			var singleMode = self.options.selectionMode == 'single';
			var len = self.items.length;
			if (singleMode) {
				var item;
				if (indices >= 0 && indices < len) {
					item = self.items[indices];
					item.selected = true;
					item.element.addClass(selectedActive);
				}
				else {
					return;
				}
				var previous = self.selectedItem;
				if (previous != undefined && previous != null) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				if (triggerSelected) {
					self._trigger("selected", event, {
						item: item,
						previousItem: previous
						//,
						//data: data
					});
				}
			}
			else {
				$.each(indices, function (index, value) {
					if (value >= 0 && value < len) {
						var i = self.items[value];
						i.selected = true;
						i.element.addClass(selectedActive);
					}
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				if (triggerSelected) {
					self._trigger("selected", event, {
						selectedItems: self.selectedItems
					});
				}
			}
		},

		unselectItems: function (indices) {
			/// <summary>
			/// Unselects items by items’ indices.
			/// </summary>
			/// <param name="indices" type="Array">
			/// Indices of items to unselect.
			/// </param>

			var self = this;
			var mode = self.options.selectionMode;
			var len = self.items.length;
			if (mode == 'single') {
				var selectedItem = self.selectedItem;
				if (selectedItem != undefined) {
					selectedItem.selected = false;
					selectedItem.element.removeClass(selectedActive);
					self.selectedItem = undefined;
				}
			}
			else {
				$.each(indices, function (index, value) {
					if (value >= 0 && value < len) {
						var i = self.items[value];
						i.selected = false;
						i.element.removeClass(selectedActive);
					}
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
			}
		},

		renderList: function () {
			/// <summary>
			/// Render items of wijlist.
			/// </summary>
			var self = this;
			var ul = self.ul;
			var o = self.options;
			ul.empty();
			self.selectedItem = undefined;
			self.selectedItems = [];
			// returns if no items to render.
			var items = self.items;
			if (items == undefined) {
				return;
			}
			var count = items.length;
			if (items == undefined || items == null && count == 0) {
				return;
			}
			var singleMode = o.selectionMode == 'single';
			for (var i = 0; i < count; i++) {
				var item = items[i];
				self._renderItem(ul, item, i, singleMode);
			}
			items[0].element.addClass(listItemCSSFirst);
			items[count - 1].element.addClass(listItemCSSLast);
			self._trigger('listrendered', null, self);
		},


		_renderItem: function (ul, item, index, singleMode) {
			var self = this;
			var li = $('<li class="ui-wijlist-item ui-corner-all"></li>');
			item.element = li;
			item.list = self;
			if (self._trigger('itemrendering', null, item) == false) {
				return;
			}
			var label = item.label;
			// if text is set, text will override label value.
			if (item.text != undefined) {
				label = item.text;
			}
			// binds list item event
			li.mouseenter(function (event) {
				self.activate(event, item, false);
			}).mouseleave(function () {
				if (!self.options.keepHightlightOnMouseLeave) {
					self.deactivate();
				}
			}).data(itemKey, item).append(label).appendTo(ul);
			// render image
			var url = item.imageUrl;
			if (url != undefined && url.length > 0) {
				li.prepend('<img src="' + item.imageUrl + '">');
			}
			// add selected items
			if (item.selected == true) {
			    li.addClass(selectedActive);
				if (singleMode && self.selectedItem == undefined) {
					self.selectedItem = item;
				}
				else {
					self.selectedItems.push(item);
				}
			}
			if (index % 2 == 1) {
				li.addClass(listItemCSSAlternate);
			}
			self._trigger('itemrendered', null, item);
		},

		refreshSuperPanel: function () {
			/// <summary>
			/// Reset the layout of superpanel to reflect the change in content.
			/// </summary>

			var self = this;
			var ele = self.element;
			if (!ele.is(':visible')) {
				return false;
			}
			var o = self.options;
			var ul = self.ul;
			var singleItem = ul.children('.ui-wijlist-item:first');
			var adjustHeight = null;
			if (o.autoSize) {
				adjustHeight = singleItem.outerHeight(true) * o.maxItemsCount;
			}

			if (adjustHeight != null) {
				ele.height(Math.min(adjustHeight, ul.outerHeight()));
			}
			var h = ele.innerHeight();
			var percent = h / (ul.outerHeight() - h);
			var large = (101 * percent) / (1 + percent);
			var small = (singleItem.outerHeight() / (ul.outerHeight() - h)) * (101 - large);
			var vScroller;
			if (self.superPanel == undefined) {
				var spOptions = {
					allowResize: false,
					keyboardSupport: false,
					bubbleScrollingEvent: true,
					hScroller: {
						scrollBarVisibility: 'hidden'
					},
					vScroller: {
						scrollSmallChange: small,
						scrollLargeChange: large
					}
				};

				$.extend(spOptions, o.superPanelOptions);
				self.superPanel = ele.wijsuperpanel(spOptions).data('wijsuperpanel');
			}
			else {
				vScroller = self.superPanel.options.vScroller;
				vScroller.scrollLargeChange = large;
				vScroller.scrollSmallChange = small;
				self.superPanel.paintPanel();
			}
			var pt = ul.css('padding-top');
			if (pt.length > 0) {
				vScroller = self.superPanel.options.vScroller;
				vScroller.firstStepChangeFix = self.superPanel.scrollPxToValue(parseFloat(pt), 'v');
			}
			else {
				vScroller.firstStepChangeFix = 0;
			}
			ul.setOutWidth(ul.parent().parent().innerWidth());
		}
	});
} (jQuery));
