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
 * * Wijmo List widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.wijmo.wijutil.js
 *  jquery.ui.wijsuperpanel.js
 *  
 */
(function ($) {
	"use strict";
	var listCSS = "ui-widget ui-widget-content ui-corner-all wijmo-wijlist",
		listItemCSS = "wijmo-wijlist-item",
		listItemCSSAlternate = listItemCSS + "-alternate",
		listItemCSSSelected = listItemCSS + "-selected",
		listItemCSSFirst = listItemCSS + "-first",
		listItemCSSLast = listItemCSS + "-last",
		stateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		activeItem = "wijmo-wijlistitem-active",
		selectedActive = listItemCSSSelected + " " + uiStateActive,
		itemKey = "item.wijlist";
	$.widget("wijmo.wijlist", {
		options: {
		    /// <summary>
		    /// wijdataview to which this wijlist is bound.
		    /// Default: null.
		    /// Type: wijdataview
		    /// </summary>
		    /// <remarks>
		    /// This option is used if this wijlist is bound to a wijdataview.
		    /// In that case, you can also specify a mapping option to 
            /// select the properties to bind to,
		    /// and the listItems option returns an array of objects containing 
            /// value and label property values determined by that mapping.
		    /// </remarks>
		    dataSource: null,
			/// <summary>
			/// An array that specifies the listItem collections of wijlist.
			/// Example: listItems: [{label: "label1", value: "value1"},
			///                  {label: "label2", value: "value2"},
			///                  {label: "label3", value: "value3"}]
			/// Default: [].
			/// Type: Array.
			/// Code example:$("#element").wijlist("option","listItems",listItems); 
			/// </summary>
			listItems: [],
			/// <summary>
			/// Select event handler of wijlist. A function will be called 
			/// when any item in the list is selected.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the selected event:
			/// $("#element").wijlist({ selected: function (e, data) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistselected", function(e, data) { });
			/// </summary>
			/// <param name="e" type="eventObj">
			/// The jquery event object.
			///	</param>
			/// <param name="data" type="Object">
			/// By data.item to obtain the item selected. 
			/// By data.item.element to obtain the li DOM element selected.
			///	</param>
			selected: null,
			/// <summary>
			/// A value indicates the list items can be single-selected or multi-selected
			/// Default: "single".
			/// Type: String.
			/// Code example:$("#element").wijlist("option","selectionMode",'single');
			/// </summary>
			/// <remarks>
			/// Options are "single" and "multiple". This option should not be set 
			/// again after initialization.
			/// </remarks>
			selectionMode: "single",
			/// <summary>
			/// A value determines whether to auto-size wijlist.
			/// Default: false.
			/// Type: String.
			/// Code example:$("#element").wijlist("option","autoSize",true);
			/// </summary>
			autoSize: false,
			/// <summary>
			/// A value specifies the maximum number of items that will be displayed 
			/// if the autoSize option is also set to true.
			/// Default: 5.
			/// Type: Number.
			/// Code example:$("#element").wijlist("option","maxItemsCount",6);
			/// </summary>
			maxItemsCount: 5,
			/// <summary>
			/// A value determines whether to add ui-state-hover class to list
			/// item when mouse enters.
			/// Default: true.
			/// Type: Boolean.
			/// Code example:$("#element").wijlist("option","addHoverItemClass",false);
			/// </summary>
			addHoverItemClass: true,
			/// <summary>
			/// The option indicates the customized options of wijsuperpanel when the wijsuperpanel is created. 
			/// (superpanel is container of the list, detailed options please refer the wijsuperpanel widget)
			/// Default: null.
			/// Type: Object.
			/// Code example:$("#element").wijlist("option","superPanelOptions",null);
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// A value indicates whether wijlist is disabled.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:$("#element").wijlist("option","disabled",true);
			/// </summary>
			disabled: false,
			/// <summary>
			/// A function called when the mouse enters the item and before any 
			/// logic in the hover event is processed.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the focusing event:
			/// $("#element").wijlist({ focusing: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistfocusing", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: could be set in handler to override rendered label of item.
			/// </param>
			/// <returns>
			/// returns false to cancel item focusing.
			/// </returns>
			focusing: null,
			/// <summary>
			/// A function called when the mouse enters the item and 
			/// after the hover event logic is processed
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the focus event:
			/// $("#element").wijlist({ focus: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistfocus", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			focus: null,
			/// <summary>
			/// A function called when the mouse leaves the item.
			/// Type: Function.
			/// Default: null.
			/// Supply a callback function to handle the blur event:
			/// $("#element").wijlist({ blur: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistblur", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object, event object passed in to activate method.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			blur: null,
			/// <summary>
			/// A function called before an item is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the itemRendering event:
			/// $("#element").wijlist({ itemRendering: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistitemRendering", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			itemRendering: null,
			/// <summary>
			/// A function called after a list item is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the itemRendered event:
			/// $("#element").wijlist({ itemRendered: function (e, item) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistitemRendered", function(e, item) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: The <LI> element with this item.
			/// item.list: The wijlist instance.
			/// item.label: The label of the item.
			/// item.value: The value of the item.
			/// item.text: This parameter can be set in the handler to override 
			/// the rendered label of the item.
			/// </param>
			itemRendered: null,
			/// <summary>
			/// A function called after list is rendered.
			/// Default: null.
			/// Type: Function.
			/// Supply a callback function to handle the listRendered event:
			/// $("#element").wijlist({ listRendered: function (e, list) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijlistlistRendered", function(e, list) { });
			/// </summary>
			/// <param name="event" type="EventObject">
			/// The jquery event object.
			/// </param>
			/// <param name="list" type="Object">
			/// The list to be rendered.
			/// </param>
			listRendered: null,
			/// <summary>
			/// A value determines the highlight state when the mouse leaves an item.
			/// Default: Boolean.
			/// Type: false.
			/// Code example:$("#element")
			///		.wijlist("option","keepHightlightOnMouseLeave",true);
			/// </summary>
			keepHightlightOnMouseLeave: false
		},

		removeAll: function () {
			///	<summary>
			///	The method removes all items in the wijlist.
			/// Code example: $("#element").wijlist("removeAll");
			///	</summary>

			var self = this;
			self.items = [];
			self._refresh();
		},

		addItem: function (item, index) {
			///	<summary>
			///	Add the specified item into the list by index.
			/// Code example: $("#element")
			///				.wijlist("addItem", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// The item that need to be inserted.
			/// </param>
			/// <param name="index" type="Number">
			/// The position of the inserted item.
			/// </param>

			var self = this;
			self._checkData();
			if (index === null || index === undefined) {
				self.items.push(item);
			}
			else {
				if (self.items) {
					self.items.splice(index, 0, item);
				}
			}
			self._refresh();
		},

		removeItem: function (item) {
			///	<summary>
			///	Remove the specified item from the wijlist.
			/// Code example: $("#element")
			///		.wijlist("removeItem", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// Indicates the item to be removed.
			/// </param>

			var self = this, index;
			self._checkData();
			index = self.indexOf(item);
			if (index >= 0) {
				self.removeItemAt(index);
			}
		},

		indexOf: function (item) {
			///	<summary>
			///	Return the index of the specified list item. 
			/// Code example: $("#element")
			///			.wijlist("indexOf", {label: "label1", value: "value1"});
			///	</summary>
			/// <param name="item" type="Object">
			/// Indicates the specified item.
			/// </param>

			var self = this, index = -1, i = 0, oItem;
			self._checkData();
			for (i = 0; i < self.items.length; i++) {
				oItem = self.items[i];
				if (oItem.label === item.label && oItem.value === item.value) {
					index = i;
					break;
				}
			}
			return index;
		},
		
		findIndexByLabel: function (label) {
			/// <summary> 
			/// Allows the user to find the index of first matched list item by item's label.
			/// Return the index of first matched list item.
			/// If there is no matched list item, it will return -1. 
			/// Code Example:$("#element").wijlist("findIndexByLabel","label");
			/// </summary>
			/// <param name="label" type="String">
			/// Indicates the specified item's label that used to search.
			/// </param>
			
			var self = this, index = -1, i = 0, oItem;
			if (label === null ||
					label === undefined) {
				return index;
			}
			self._checkData();
			for (i = 0; i < self.items.length; i++) {
				oItem = self.items[i];
				if (oItem.label === label) {
					index = i;
					break;
				}
			}
			return index;
		},

		removeItemAt: function (index) {
			///	<summary>
			///	Remove the specified item by index from the wijlist widget.
			/// Code example: $("#element").wijlist("removeItemAt", 3);
			///	</summary>
			/// <param name="item" type="Object">
			/// Index of the item to be removed.
			/// </param>

			var self = this;
			self._checkData();
			self.items.splice(index, 1);
			self._refresh();
		},

		_checkData: function () {
			var self = this;
			if (!self.items) {
				self.items = [];
			}
		},

		_refresh: function () {
			var self = this;
			self.renderList();
			self.refreshSuperPanel();
		},

		_setOption: function (key, value) {
			var self = this, selectedItem, 
			isBind, renderItems;

			$.Widget.prototype._setOption.apply(self, arguments);

			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			} else if (key === "selectionMode") {
				selectedItem = self.selectedItem;
				if (selectedItem) {
					selectedItem.selected = false;
					if (selectedItem.element) {
						selectedItem.element.removeClass(selectedActive);
					}
					self.selectedItem = undefined;
				}
				$.each(self.selectedItems, function (index, i) {
					i.selected = false;
					i.element.removeClass(selectedActive);
				});
				self.selectedItem = [];
			} else if (key === "listItems") {
				isBind = self._isBind();
				if (isBind) {
					renderItems = self._getRenderItems();
					self.setItems(renderItems);
				} else {
					self.setItems(value);
				}
				self.renderList();
				self.refreshSuperPanel();
			} else if (key === "dataSource") {
				isBind = self._isBind();
				if (isBind) {
					renderItems = self._getRenderItems();
					self.setItems(renderItems);
					self.renderList();
					self.refreshSuperPanel();
				}
			} else if (key === "autoSize" || key === "maxItemsCount") {
				self.refreshSuperPanel();
			}
		},

		_create: function () {
			var self = this, ele = this.element, o = this.options,
			renderItems;
			
			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}
			
			ele.addClass(listCSS).attr({
				role: "listbox",
				"aria-activedescendant": activeItem,
				"aria-multiselectable": o.selectionMode === "multiple"
			}).bind("click." + self.widgetName, self, self._onListClick);

			if (ele.is("div") && ele.children().is("ul")) {
				self._isInnerData = true;
				self._templates = [];
				$.each($("ul > li", ele), function (idx, liNode) {
					self._templates.push({ templateHtml: liNode.innerHTML });
				});

				self._oriChildren = ele.children().hide();
			}

			self.ul = $("<ul class='wijmo-wijlist-ul'></ul>").appendTo(ele);

			if (o.listItems !== null) {
				renderItems = self._getRenderItems();
				if (renderItems) {
					self.setItems(renderItems);
					self.renderList();
					self.refreshSuperPanel();
				}
			}
			
			//update for visibility change
			if (self.element.is(":hidden") &&
						self.element.wijAddVisibilityObserver) {
				self.element.wijAddVisibilityObserver(function () {
					self.refreshSuperPanel();
					if (self.element.wijRemoveVisibilityObserver) {
						self.element.wijRemoveVisibilityObserver();
					}
				}, "wijlist");
			}

			if (o.disabled) {
				self.disable();
			}
		},
		
		_isBind: function () {
			var o = this.options,
			listItems = o.listItems;
			
			if (listItems !== null && 
					listItems.label &&
					listItems.label.bind) {
				return true;
			}
			return false;
		},
		
		_getRenderItems: function () {
			var o = this.options,
			listItems = o.listItems;
			
			if (listItems !== null) {
				if ($.isArray(listItems) && listItems.length > 0 && 
						typeof (listItems[0].label) === "string") {
					return listItems;
				} else if (listItems.label && listItems.label.bind) {
					return this._getMappingItems();
				} else {
					return null;
				}
			} 
			return null;
		},
		
		_getMappingItems: function () {
			var o = this.options, dataSource = o.dataSource, listItems = o.listItems,
			mappingItems, labelKey, valueKey;
			if (!dataSource || !listItems) {
				return null;
			}
			
			if (!listItems.label || !listItems.label.bind ||
					!listItems.value || !listItems.value.bind) {
				return null;
			}
			
			labelKey = listItems.label.bind;
			valueKey = listItems.value.bind;
			
			//1.Array
			if (dataSource && dataSource.length !== 0) {
				mappingItems = [];

				$.each(dataSource, function (i, item) {
					mappingItems.push({label: item[labelKey], value: item[valueKey]});
				});
				
				return mappingItems;
			}
			return null;
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
				ele = outerEle || self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-disabled")
						.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		},

		setTemplateItems: function (data) {
			this._setItemsByExtend(data, true);
		},

		setItems: function (items) {
			///	<summary>
			///	Sets Items to be rendered by the wijlist widget. 
			/// This will return the element back to its pre-init state.
			/// Code example: $("#element")
			///		.wijlist("setItems",{label: "label1", value: "value1"});
			///	</summary>
			/// <param name="items" type="Array">
			/// Items to be rendered by the wijlist. 
			/// </param>

			this._setItemsByExtend(items, false);
		},

		_setItemsByExtend: function (items, isExtend) {
			/// <summary>
			/// Sets Items to be rendered by the wijlist.
			/// </summary>
			/// <param name="items" type="Array">
			/// Items array to be rendered.  The array contains object like 
			///{label: "label", value: "value"}.
			/// </param>
			var self = this, selectedItems;

			if (isExtend) {
				//update for 24130 issue at 2012/7/20
				//first load the items by keydown, the 
				//items.length will not be equal self._templates.length				
				if (self._templates && items && 
						items.length !== self._templates.length) {
					return;
				}
				self.items = items;
				//end
				if (!self.items) {
					self.items = [];
				}
				$.each(self._templates, function (idx) {
					if (self.items[idx]) {
						self.items[idx].templateHtml = self._templates[idx].templateHtml;
					} else {
						self.items.push({ 
							templateHtml: self._templates[idx].templateHtml,
							label: items[idx].label,
							value: items[idx].value	
						});
					}
				});
			} else {
				self.items = items;
			}

			if (!items) {
				return null;
			}

			selectedItems = $.grep(items, function (a) {
				return a.selected;
			});
			if (self.options.selectionMode === "single") {
				self.selectedItems = [];
				self.selectedItem = selectedItems.length > 0 ?
									selectedItems[0] : undefined;
			}
			else {
				self.selectedItems = selectedItems;
			}
		},
		
		filterItems: function (searchTerm, autoFilter, needHighlightMatching, hightWord) {
			var self = this,
			term1 = self._escapeRegex(searchTerm), matcher,
			label,
			liText = '',
			css = null,
			itemsChanged = false,
			topHit = null;
			/// TODO : start with or contains and case sensitive.
			if (!this.items) {
				return null;
			}
			
			if ($("li[wijhidden].wijmo-wijlist-item", self.element) && 
					$("li[wijhidden].wijmo-wijlist-item", self.element).length > 0) {
				itemsChanged = true;
			}
			
			if ($("span.ui-priority-primary", self.element) && 
					$("span.ui-priority-primary", self.element).length > 0) {
				itemsChanged = true;
			}
			
			if (!itemsChanged && 
					(!searchTerm || searchTerm.length === 0)) {
				$.each(this.items, function (index, item) {
					if (item.selected) {
						self.activate(null, item, false);
						if (item.element) {
							item.element.addClass(selectedActive);
						}
						self.selectedItem = item;
					} else {
						if (item.element && 
								item.element.hasClass(selectedActive)) {
							item.element.removeClass(selectedActive);
						}
					}
				});
				return;
			}
			
			matcher = new RegExp(term1, "i");
			$.each(this.items, function (index, item) {
				label = item.label;
				// if text is set, text will override label value.
				if (item.templateHtml) {
					label = item.templateHtml;
				} else if (item.text !== undefined) {
					label = item.text;
				}
				/* remove the code the close the dropdown list
				 * when close the dropdown list, all items need to 
				 * restore original style, see resetItemsStyle*/
				if ($("span.ui-priority-primary", item.element).length > 0) {
					item.element.empty().append(label);
				}
				//filter still use the item.label;
				var matchResult = matcher.exec(item.label);
				if (matchResult === null && autoFilter) {
					item.element.hide();
					item.element.attr("wijhidden","wijhidden");
				}
				else {
					// update for: when using the key to active the item 
					// the active item is incorrect at 2012/8/13
					if (item.selected) {
						self.activate(null, item, false);
						item.element.addClass(selectedActive);
						self.selectedItem = item;
					} else {
						if (item.element.hasClass(selectedActive)) {
							item.element.removeClass(selectedActive);
						}
					}
					
					if (needHighlightMatching) {
						liText = label.replace(
								new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +
										term1 +
								")(?![^<>]*>)(?![^&;]+;)", "gi"),
								"<span class='ui-priority-primary'>$1</span>");
						item.element.html(liText);
					}

					if (!item.element.is(":visible")) {
						item.element.show();
						item.element.removeAttr("wijhidden");
					}

					//update for 25224 issue at 2012/8/13
					if (term1 !== undefined && term1.length !== 0 &&
							topHit === null && matchResult &&
							matchResult.index === 0) {
						//self.activate(null, item, true);
						topHit = item;
					}
				}
			});
			return topHit;
		},

		popItem: function () {
			///	<summary>
			///	Remove the last item in the wijlist. 
			/// Code example: $("#element").wijlist("popItem");
			///	</summary>

			var self = this;
			self._checkData();
			self.items.pop();
			self._refresh();
		},

		getList: function () {
			/// <summary>
			/// Gets the JQuery object reference of the <ul> element of the wijlist widget.
			/// Code example: $("#element").wijlist("getList");
			/// </summary>
			/// <returns type="JQueryObj">
			/// ul JQuery reference.
			/// </returns>

			return this.ul;
		},

		_onListClick: function (e) {
			if (!$(e.target).closest(".wijmo-wijlist-item").length) {
				return;
			}
			var self = e.data;
			self.select(e);
		},

		destroy: function () {
			///	<summary>
			///	Remove the wijlist functionality completely. 
			/// This will return the element back to its pre-init state.
			/// Code example: $("#element").wijlist("destroy");
			///	</summary>

			var self = this, ele = this.element;
			if (self.superPanel !== undefined) {
				self.superPanel.destroy();
			}

			ele.removeClass("wijmo-wijobserver-visibility")
			.removeClass(listCSS).removeAttr("role")
			.removeAttr("aria-activedescendant").unbind("." + self.widgetName);
			self.ul.remove();

			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}

			if (self._isInnerData) {
				self._oriChildren.show();
			}

			$.Widget.prototype.destroy.apply(self, arguments);
		},

		activate: function (event, item, scrollTo) {
			///	<summary>
			///	The method activates an item in the wijlist and will allow the list to scrollTo the item.
			/// Code example: 
			/// var item = {element:$(".wijmo-wijlist-item:first"),list:$("#list")
			///			.wijlist()};
			/// $("#element").wijlist("activate", null, item, false); 
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

			var self = this, active, activeElement;
			self.deactivate();
			if (item === null || item === undefined) {
				return;
			}
			if (self._trigger("focusing", event, item) === false) {
				return;
			}
			active = self.active = item;
			activeElement = item.element;
			if (activeElement) {
				if (self.options.addHoverItemClass) {
					activeElement.addClass(stateHover);
				}
				activeElement.attr("id", activeItem);
			}
			if (scrollTo && self.superPanel !== undefined) {
				self.superPanel.scrollChildIntoView(activeElement);
			}
			if (self.element.is(":visible")) {
				self._trigger("focus", event, item);
			}
		},

		deactivate: function () {
			/// <summary>
			/// Deactivates activated items in the wijlist widget.
			/// Code example: $("#element").wijlist("deactivate");
			/// </summary>

			var self = this,
				a = self.active, ele;
			if (!a) {
				return;
			}
			ele = a.element;
			self._trigger("blur", null, a);
			if (ele) {
				ele.removeClass(stateHover).removeAttr("id");
			}
			self.active = undefined;
		},

		next: function (event) {
			/// <summary>
			/// Moves focus to the next item.
			/// Code example: $("#element").wijlist("next");
			/// </summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>

			this.move("next", "." + listItemCSS + ":first", event);
		},

		nextPage: function () {
			/// <summary>
			/// Turns to the next page of the list.
			/// Code example: $("#element").wijlist("nextPage");
			/// </summary>

			this.superPanel.doScrolling("bottom", true);
		},

		previous: function (event) {
			/// <summary>
			/// Moves focus to the previous item. 
			/// Code example: $("#element").wijlist("previous");
			/// </summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>

			this.move("prev", "." + listItemCSS + ":last", event);
		},

		previousPage: function () {
			/// <summary>
			/// Turns to the previous page of the wijlist.
			/// Code example: $("#element").wijlist("previousPage");
			/// </summary>

			this.superPanel.doScrolling("top", true);
		},

		first: function () {
			/// <summary>
			/// Tests that the focus is at the first list item.
			/// Code example: $("#element").wijlist("first");
			/// </summary>

			return this.active && !this.active.element.prev().length;
		},

		last: function () {
			/// <summary>
			/// Tests that the focus is at the last list item.
			/// Code example: $("#element").wijlist("last");
			/// </summary>

			return this.active && !this.active.element.next().length;
		},

		move: function (direction, edge, event) {
			/// <summary>
			/// Move focus between items.
			/// </summary>

			var self = this, item, next;
			if (!self.active) {
				item = self.ul.children(":visible" + edge).data(itemKey);
				self.activate(event, item, true);
				return;
			}
			next = self.active.element[direction + "All"](":visible." + listItemCSS).eq(0);
			/*
			if (!self._templates) {
				next = self.active.element[direction + "All"]("." + listItemCSS).eq(0);
			} else {
				//add for only visible item will be moved
				next = self.active.element[direction + "All"](":visible." + listItemCSS).eq(0);
			}*/
			
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

			var self = this,
				ele, selectedIndex,
				item, singleMode, previous;
			
			if (self.active === undefined) {
				return;
			} 
			
			ele = self.active.element;
			if (ele === undefined || ele.attr("wijhidden")) {
				return;
			}
			item = ele.data(itemKey);
			if (!item) {
				return;
			}
			//end 
			singleMode = self.options.selectionMode === "single";
			if (singleMode) {
				previous = self.selectedItem;
				ele.addClass(selectedActive).attr("aria-selected", "true");
				item.selected = true;
				if (previous !== undefined && item !== previous) {
					previous.selected = false;
					if (previous.element) {
						previous.element.removeClass(selectedActive)
						.removeAttr("aria-selected");
					}
				}
				self.selectedItem = item;
				selectedIndex = $.inArray(item, self.items);

				self._trigger("selected", event, {
					item: item,
					previousItem: previous,
					selectedIndex: selectedIndex,
					data: data
				});
			}
			else {
				item.selected = !item.selected;
				if (item.selected) {
					ele.addClass(selectedActive).attr("aria-selected", "true");
				}
				else {
					ele.removeClass(selectedActive).removeAttr("aria-selected", "true");
				}
				selectedIndex = [];
				self.selectedItems = $.grep(self.items, function (a, index) {
					if (a.selected) {
						selectedIndex.push(index);
					}
				    return a.selected;
				});
				
				
				self._trigger("selected", event, {
					selectedIndex: selectedIndex,
					item: item,
					selectedItems: self.selectedItems
				});
			}
		},

		_findItemsByValues: function (values) {
			var itemFound, found = [];

			found = $.grep(this.items, function (itm, i) {
				itemFound = false;
				for (var j = 0; j < values.length; j++) {
					if (itm.value === values[j]) {
						itemFound = true;
					}
				}
				return itemFound;
			});

			return found;
		},

		_findItemsByIndices: function (indices) {
			var self = this, len = this.items.length, found = [];

			$.each(indices, function (index, value) {
				if (value >= 0 && value < len) {
					found.push(self.items[value]);
				}
			});

			return found;
		},

		getItems: function (indices) {
			/// <summary>
			/// Allows the user to find list items by indices or values.
			/// Code Example:$("#element").wijlist("getItems",5);
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// This parameter could be a string, number, array of string,
			/// array of number.
			/// If parameter is a number or an array of number,
			/// it's used as the index/indices of the item(s) to get.
			/// If parameter is a string or an array of string,
			/// it's used as the value/values of the item(s) to get.
			/// </param>

			var self = this, isNumber, byArray, searchTerms, foundItems;

			byArray = $.isArray(indices);
			isNumber = (!byArray) && typeof(indices) === "number" || 
				(byArray && typeof(indices[0]) === "number");
			searchTerms = byArray ? indices : [indices];
			foundItems = isNumber ?
			self._findItemsByIndices(searchTerms) : self._findItemsByValues(searchTerms);
			return foundItems;
		},

		selectItems: function (indices, triggerSelected) {
			/// <summary>
			/// Selects item(s) in the list by item index/indices or value(s).
			/// Code Example:$("#element").wijlist("selectItems",5, false);
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// This parameter could be a string, number, array of string,
			/// array of number.
			/// If parameter is a number or an array of number,
			/// it's used as the index/indices of the item(s) to get.
			/// If parameter is a string or an array of string,
			/// it's used as the value/values of the item(s) to get.
			/// </param>
			/// <param name="triggerSelected" type="Boolean">
			/// Whether to trigger selected event of list.
			/// </param>

			var self = this, singleMode = this.options.selectionMode === "single",
			item, previous, foundItems;

			foundItems = self.getItems(indices);
			if (singleMode) {
				if (foundItems.length > 0) {
					item = foundItems[0];
					item.selected = true;
					item.element.addClass(selectedActive);
				}
				previous = self.selectedItem;
				if (previous) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				if (triggerSelected) {
					self._trigger("selected", null, {
						item: item,
						previousItem: previous
					});
				}
			}
			else {
				$.each(foundItems, function (index, itm) {
					itm.selected = true;
					itm.element.addClass(selectedActive);
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				if (triggerSelected) {
					self._trigger("selected", null, {
						selectedItems: self.selectedItems
					});
				}
			}
		},

		unselectItems: function (indices) {
			/// <summary>
			/// Unselects list items by items' indices.
			/// Code Example:$("#element").wijlist("unselectItems",5);
			/// </summary>
			/// <param name="indices" type="Array">
			/// Indices of items to unselect.
			/// </param>

			var self = this, mode = this.options.selectionMode, selectedItem, foundItems;

			if (mode === "single") {
				selectedItem = self.selectedItem;
				if (selectedItem) {
					selectedItem.selected = false;
					selectedItem.element.removeClass(selectedActive);
					self.selectedItem = undefined;
				}
			}
			else {
				foundItems = self.getItems(indices);
				$.each(foundItems, function (index, i) {
					i.selected = false;
					i.element.removeClass(selectedActive);
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
			}
		},

		renderList: function () {
			/// <summary>
			/// Render the wijlist widget on the client browser.
			/// Code Example:$("#element").wijlist("renderList");
			/// </summary>
			var self = this, ul = this.ul, o = this.options, items,
			count, singleMode, i, item, licollection;
			ul.empty();
			// returns if no items to render.
			items = self.items;
			if (items === undefined) {
				return;
			}
			count = items.length;
			if (items === undefined || items === null && count === 0) {
				return;
			}
			singleMode = o.selectionMode === "single";
			//for performance change
			licollection = [];
			for (i = 0; i < count; i++) {
				item = items[i];
				//self._renderItem(ul, item, i, singleMode);
				licollection.push(self._renderItem(ul, item, i, singleMode));
			}
			//for performance change
			$(licollection).appendTo(ul);
			if (count > 0) {
				if (items[0].element) {
					items[0].element.addClass(listItemCSSFirst);
				}
				if (items[count - 1].element) {
					items[count - 1].element.addClass(listItemCSSLast);
				}
			}
			self._trigger("listRendered", null, self);

		},


		_renderItem: function (ul, item, index, singleMode) {
			var self = this,
			li = $("<li role='option' class='wijmo-wijlist-item ui-corner-all'></li>"), 
			label, url;
			item.element = li;
			item.list = self;
			if (self._trigger("itemRendering", null, item) === false) {
				return;
			}
			label = item.label;
			if (item.title) {
				li.attr("title", item.title);
			}
			// if text is set, text will override label value.
			if (item.templateHtml) {
				label = item.templateHtml;
			} else if (item.text !== undefined) {
				label = item.text;
			}
			// binds list item event
			li.bind("mouseover", function (event) {
				self.activate(event, item, false);
			}).bind("mouseout", function () {
				if (!self.options.keepHightlightOnMouseLeave) {
					self.deactivate();
				}
			}).data(itemKey, item).append(label);//.appendTo(ul);
			// render image
			if (!self._isInnerData) {
				// render image
				url = item.imageUrl;
				if (url !== undefined && url.length > 0) {
					li.prepend("<img src='" + item.imageUrl + "'>");
				}
			}
			// add selected items
			if (item.selected) {
				self.activate(null, item, false);
				li.addClass(selectedActive);
			}
			if (index % 2 === 1) {
				li.addClass(listItemCSSAlternate);
			}
			self._trigger("itemRendered", null, item);
			return li;
		},
		
		_escapeRegex: function (value) {
			if (value === undefined) {
				return value;
			}
			return value.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");
		},
		
		//update for juice
		adjustOptions: function () {
			var o = this.options, i;
			if (o.data !== null) {
				for (i = 0; i < o.listItems.length; i++) {
					delete o.listItems[i].element;
					delete o.listItems[i].list;
				}
			}
			return o;
		},

		refreshSuperPanel: function () {
			/// <summary>
			/// Reset the layout of superpanel to reflect the change in content.
			/// Code Example:$("#element").wijlist("refreshSuperPanel");
			/// </summary>

			var self = this, ele = this.element, o = this.options, ul = this.ul,
			singleItem = ul.children(".wijmo-wijlist-item:first"),
			headerHeight,
			ulOuterHeight,
			eleInnerWidth,
			adjustHeight = null, h, percent, small, vScroller, large, spOptions, pt;
			if (!ele.is(":visible")) {
				return false;
			}
			ulOuterHeight = ul.outerHeight();
			eleInnerWidth = ele.innerWidth();
			if (o.autoSize) {
				adjustHeight = singleItem.outerHeight(true) * o.maxItemsCount;
			}

			if (adjustHeight !== null) {
				ele.height(Math.min(adjustHeight, ulOuterHeight));
			}
			h = ele.innerHeight();
			percent = h / (ulOuterHeight - h);
			large = (101 * percent) / (1 + percent);
			small = (singleItem.outerHeight() / (ulOuterHeight - h)) * (101 - large);
			if (self.superPanel === undefined) {
				spOptions = {
					allowResize: false,
					keyboardSupport: false,
					bubbleScrollingEvent: true,
					hScroller: {
						scrollBarVisibility: "hidden"
					},
					vScroller: {
						scrollSmallChange: small,
						scrollLargeChange: large
					}
				};

				$.extend(spOptions, o.superPanelOptions);
				self.superPanel = ele.wijsuperpanel(spOptions).data("wijsuperpanel");
				//update for fixing can't show all dropdown items by wuhao 
				if (self.superPanel.vNeedScrollBar) {
					ul.setOutWidth(eleInnerWidth - 18);
					self.superPanel.refresh();
				}
				//end for issue
			}
			else {
				vScroller = self.superPanel.options.vScroller;
				vScroller.scrollLargeChange = large;
				vScroller.scrollSmallChange = small;
				//update for fixing can't show all dropdown items by wuhao
				self.superPanel.paintPanel();
				if (self.superPanel.vNeedScrollBar) {
					ul.setOutWidth(eleInnerWidth - 18);
					self.superPanel.refresh();
				} else {
					ul.setOutWidth(ele.outerWidth());
					headerHeight = ele
					.children(".wijmo-wijsuperpanel-header").outerHeight();
					//update for case 24248 at 2012/7/27
					//Note: not good method for doing this
					if (headerHeight !== null &&
							headerHeight !== undefined) {
						ele.height(ulOuterHeight + headerHeight);
					}
					//end 
					self.superPanel.refresh();
				}
				//end for issue
			}
			pt = ul.css("padding-top");
			if (pt.length > 0) {
				vScroller = self.superPanel.options.vScroller;
				vScroller.firstStepChangeFix = self.superPanel
				.scrollPxToValue(parseFloat(pt), "v");
			}
			else {
				vScroller.firstStepChangeFix = 0;
			}
			ul.setOutWidth(ul.parent().parent().innerWidth());
		}
	});
} (jQuery));