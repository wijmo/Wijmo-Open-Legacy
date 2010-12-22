/*globals window,document,jQuery,clearTimeout,setTimeout*/

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
*
* Wijmo Menu widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.wijmo.wijutil.js
*	jquery.ui.position.js
*	jquery.ui.effects.core.js
*	jquery.wijmo.wijsuperpanel.js
*
*/
"use strict";
(function ($) {
	$.widget("wijmo.wijmenu", {
		options: {
			/// <summary>
			///An jQuery selector which handle to open the menu or submenu.
			///Default:"".
			///Type:String.
			///Remark:If set to the menu item(the li element) then when it is clicked
			///(if the triggerEvent set to 'click') show ubmenu.If set to a element out
			///of the menu ,click(if the triggerEvent set to 'click') it,open the menu. 
			///</summary>
			trigger: '',
			/// <summary>
			///Specifies the event to show the menu.
			///Default:"click".
			///Type:String.
			///Remark:The value can be seted to 'click','mouseenter','dbclick','rtclick'
			///</summary>
			triggerEvent: 'click',
			///<summary>
			///Location and Orientation of the menu,relative to the button/link userd
			/// to open it. Configuration for the Position Utility,Of option
			///excluded(always configured by widget).Collision also controls collision 
			///detection automatically too.
			///Default:{}.
			///Type:Object.
			///</summary>
			position: {},
			///<summary>
			///Sets showAnimated and hideAnimated if not specified individually.
			///Default:"slide".
			///Type:String.
			///Remark:Users standard animation setting syntax from other widgets.
			///</summary>
			animated: 'slide',
			///<summary>
			///Determines the animationn used during show.
			///Default:"slide".
			///Type:String.
			///Remark:This option uses the standard animation setting syntax from
			/// other widgets.
			///</summary>
			showAnimated: 'slide',
			/// <summary>
			///Determines the animation used during hide.
			///Default:"slide".
			///Type:String.
			///Remark:Users standard animation setting syntax from other widgets.
			///</summary>
			hideAnimated: 'slide',
			///<summary>
			///Determines the speed to show/hide the menu in milliseconds.
			/// Sets showDuration and hideDuration if they are not specified.
			///Default:400.
			///Type:Number.
			///</summary>
			duration: 400,
			///<summary>
			///Determines the speed to show the menu,in milliseconds.
			///Default:400.
			///Type:Number.
			///</summary>
			showDuration: 400,
			///<summary>
			///Determines the speed to hide the menu,in milliseconds.
			///Default:400.
			///Type:Number.
			///</summary>
			hideDuration: 400,
			///<summary>
			///Defines the behavior of the submenu whether it is a popup 
			///menu or an iPod-style navigation list.
			///Default:"flyout".
			///Type:String.
			///Remark:The value should be "flyout" or "sliding".
			///</summary>
			mode: 'flyout',
			///<summary>
			///This option specifies a hash value that sets to superpanel options 
			///when a superpanel is created.
			///Default:null.
			///Type:Object.
			///</summary>
			superPanelOptions: null,
			///<summary>
			/// Defines whether items are checkable.
			///Default:false.
			///Type:Boolean.
			///</summary>
			checkable: false,
			///<summary>
			///Controls the root menus orientation. All submenus are vertical 
			///regardless of the orientation of the root menu.
			///Default:"horizontal".
			///Type:String.
			///Remark:The value should be "horizontal" or "vertical".
			///</summary>
			orientation: 'horizontal',
			///<summary>
			///Determines the i-Pod-style menu's maximum height.
			///Default:200.
			///Type:Number.
			///Remark:This option only used in i-pod style menu. when the menu's heiget 
			///largger than this value,menu show scroll bar.
			///</summary>
			maxHeight: 200,
			/// <summary>
			///Determines whether the i-Pod menu shows a back link or a breadcrumb header
			/// in the menu.
			///Default:true.
			///Type:Boolean.
			///</summary>
			backLink: true,
			///<summary>
			///Sets the text of the back link.
			///Default:"Back".
			///Type:String.
			///</summary>
			backLinkText: 'Back',
			///<summary>
			///Sets the text of the top link.
			///Default:"All".
			///Type:String.
			///</summary>
			topLinkText: 'All',
			///<summary>
			///Sets the top breadcrumb's default Text.
			///Default:"Choose an option".
			///Type:String.
			///</summary>
			crumbDefaultText: 'Choose an option'
		},
		_create: function () {
			//before crete menu items,hide the menu. to avoid show wild uls
			// in the page before init the menu.
			var self = this, o = self.options, ul, li;
			self.element.hide();
			self.cssPre = "wijmo-wijmenu";
			self.nowIndex = 9999;
			self._setAnimationOptions();
			self.refresh();

			if (!self.options.input) {
				self.options.input = self.element.attr("tabIndex", 0);
			}
			self.options.input.bind("keydown.wijmenu", function (event) {
				if (self.options.disabled) {
					return;
				}
				var activeItem = self.element.data("activeItem");
				switch (event.keyCode) {
				case $.ui.keyCode.PAGE_UP:
					self.previousPage(event);
					event.preventDefault();
					event.stopImmediatePropagation();
					break;
				case $.ui.keyCode.PAGE_DOWN:
					self.nextPage(event);
					event.preventDefault();
					event.stopImmediatePropagation();
					break;
				case $.ui.keyCode.UP:
					self.previous(event);
					event.preventDefault();
					event.stopImmediatePropagation();
					break;
				case $.ui.keyCode.DOWN:
					self.next(event);
					event.preventDefault();
					event.stopImmediatePropagation();
					break;
				case $.ui.keyCode.RIGHT:
					if (activeItem) {
						ul = $(">ul", activeItem);
						if (ul.length > 0 && ul.is(":visible")) {
							self.activate(event, ul.children(":first"));
						}
					}
					break;
				case $.ui.keyCode.LEFT:
					ul = activeItem.parent();
					li = ul.parent();
					if (li.is("li")) {
						self.activate(event, li);
					}
					break;
				case $.ui.keyCode.ENTER:
					self.select();
					if (activeItem.length > 0) {
						if (o.mode === "flyout" && activeItem.has("ul").length > 0) {
							self._showFlyoutSubmenu(event, activeItem, activeItem
							.find("ul:first"));
						}
						else {
							activeItem.children(":first").trigger("click");
						}
					}
					event.preventDefault();
					event.stopImmediatePropagation();
					break;
				}
			});
		},
		_destroy: function () {
			var o = this.options, self = this;
			if (o.mode === "flyout") {
				self._killFlyout();
			}
			else {
				self._killDrilldown();
			}
			self._killmenuItems();
			self._killtrigger();
			self.element.unwrap().unwrap();
			self.element.removeData("domObject").removeData("topmenu")
			.removeData("activeItem").removeData("firstLeftValue");
		},
		destroy: function () {
			/// <summary>Removes the wijmenu functionality completely.
			/// This returns the element back to its pre-init state.</summary>
			this._destroy();
			$.Widget.prototype.destroy.apply(this);
		},
		activate: function (event, item) {
			/// <summary>Actives an menu item by deactivating the current item,
			///scrolling the new one into view,if necessary,making it the active item,
			///and triggering a focus event.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to active</param>
			var scrollContainer, active;
			this.deactivate(event);
			if (this.options.mode === "sliding") {
				scrollContainer = this.element.data("domObject").scrollcontainer;
				scrollContainer.wijsuperpanel("scrollChildIntoView", item);
			}
			active = item.eq(0)
			.children(":first")
			.addClass("ui-state-focus")
			.attr("id", "ui-active-menuitem")
			.end();
			this.element.data("activeItem", active);
			this._trigger("focus", event, { item: item });
		},
		deactivate: function (event) {
			/// <summary>Clears the current selection.This method is useful when reopening
			/// a menu which previously had an item selected.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to deactive</param>
			var active = this.element.data("activeItem");
			if (!active) {
				return;
			}
			if (!event || event.keyCode !== $.ui.keyCode.RIGHT) {
				if (active.length > 0) {
					if (this.options.mode === "flyout" && active.has("ul").length > 0) {
						this._hideCurrentSubmenu(active);
					}
				}
			}
			//console.log(active);
			active.children(":first")
			.removeClass("ui-state-focus")
			.removeAttr("id");
			this._trigger("blur");
			this.element.data("activeItem", null);
		},

		next: function (event) {
			/// <summary>Selects the next item based on the active one. Selects the first
			/// item if none is active or if the last one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("next", ".wijmo-wijmenu-item:first", event);
		},

		previous: function (event) {
			/// <summary>Selects the previous item based on the active one. Selects the 
			///last item if none is active or if the first one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("prev", ".wijmo-wijmenu-item:last", event);
		},

		first: function () {
			/// <summary>Determines whether the active item is the first
			/// menu item</summary>
			/// <returns type="Boolean" />
			var active = this.element.data("activeItem");
			return active && !active.prevAll(".wijmo-wijmenu-item").length;
		},

		last: function () {
			/// <summary>Determines whether the active item is the 
			///last menu item</summary>
			/// <returns type="Boolean" />
			var active = this.element.data("activeItem");
			return active && !active.nextAll(".wijmo-wijmenu-item").length;
		},

		nextPage: function (event) {
			/// <summary>This event is similar to the next event,
			///but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this, activeItem, parent, base, close, height, result;
			activeItem = self.element.data("activeItem");
			parent = activeItem.parent();
			if (self.options.mode === "sliding" && self._hasScroll()) {
				// TODO merge with no-scroll-else
				//var activeItem = self.element.data("activeItem");
				//var parent = activeItem.parent();
				if (!activeItem || self.last()) {
					self.activate(event, parent.children(":first"));
					return;
				}
				base = activeItem.offset().top;
				height = this.options.maxHeight;
				result = parent.children("li").filter(function () {
					//var close = $(this).offset().top - base - height + $(this).height();
					close = height - ($(this).offset().top - base + $(this).height());
					// TODO improve approximation
					var lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});

				if (!result.length) {
					result = parent.children(":last");
				}
				this.activate(event, result.last());
			} else {
				this.activate(event, parent
				.children(!activeItem || this.last() ? ":first" : ":last"));
			}
		},
		previousPage: function (event) {
			/// <summary>This event is silimlar to the previous event,
			///but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this, activeItem = self.element.data("activeItem"),
			parent, base, height, result, close;
			parent = activeItem.parent();
			if (self.options.mode === "sliding" && this._hasScroll()) {
				// TODO merge with no-scroll-else								
				if (!activeItem || this.first()) {
					this.activate(event, parent.children(":last"));
					return;
				}
				base = activeItem.offset().top;
				height = this.options.maxHeight;
				result = parent.children("li").filter(function () {
					close = $(this).offset().top - base + height - $(this).height();
					// TODO improve approximation
					var lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});

				// TODO try to catch this earlier when scrollTop 
				//indicates the last page anyway
				if (!result.length) {
					result = parent.children(":first");
				}
				this.activate(event, result.first());
			} else {
				this.activate(event, parent
				.children(!activeItem || this.first() ? ":last" : ":first"));
			}
		},
		select: function (event) {
			/// <summary>Selects the active item,triggering the select event for that
			///item. This event is useful for custom keyboard handling.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var active = this.element.data("activeItem");
			this._trigger("select", event, { item: active });
			this._setCheckable();
		},

		_setCheckable: function () {
			if (this.options.checkable) {
				var item = this.element.data("activeItem");
				item.children(":first").toggleClass("ui-state-active");
			}
		},

		///set options
		_setOption: function (key, value) {
			if (this["_set_" + key]) {
				this["_set_" + key](value);
			}
			this.options[key] = value;
		},

		_set_mode: function (value) {
			this._destroy();
			this.options.mode = value;
			this.refresh();
		},

		_set_orientation: function (value) {
			var self = this, menuContainer = this.element.data("domObject").menucontainer;
			if (this.options.mode === "flyout") {
				menuContainer
				.removeClass(self.cssPre + "-vertical " + self.cssPre + "-horizontal")
				.addClass("wijmo-wijmenu-" + value);
				$(">li:has(ul)", this.element).each(function () {
					if (value === "horizontal") {
						$(">.wijmo-wijmenu-link", this)
						.find(".ui-icon-triangle-1-e")
						.removeClass("ui-icon-triangle-1-e ui-icon-triangle-1-s")
						.addClass("ui-icon-triangle-1-s");
					}
					else {
						$(">.wijmo-wijmenu-link", this)
						.find(".ui-icon-triangle-1-s")
						.removeClass("ui-icon-triangle-1-e ui-icon-triangle-1-s")
						.addClass("ui-icon-triangle-1-e");
					}
				});
			}
			else {
				menuContainer
				.removeClass("wijmo-wijmenu-vertical wijmo-wijmenu-horizontal")
				.addClass("wijmo-wijmenu-vertical");
			}
		},

		_set_triggerEvent: function (value) {
			this._killtrigger();
			this.options.triggerEvent = value;
			var triggerEle = $(this.options.trigger).filter(function () {
				return $(this).closest(".wijmo-wijmenu").length === 0;
			});
			if (triggerEle.length > 0) {
				this._initTrigger(triggerEle);
			}
			if (this.options.mode === "flyout") {
				this._killFlyout();
				this._flyout();
			}
		},

		_set_trigger: function (value) {
			this._killtrigger();
			this.options.triggerEvent = value;
			var triggerEle = $(this.options.trigger).filter(function () {
				return $(this).closest(".wijmo-wijmenu").length === 0;
			});
			if (triggerEle.length > 0) {
				this._initTrigger(triggerEle);
			}
			if (this.options.mode === "flyout") {
				this._killFlyout();
				this._flyout();
			}
		},

		_initTrigger: function (triggerEle) {
			var o = this.options, event = o.triggerEvent, self = this,
			menuContainer, breadcrumb;
			if (triggerEle.is("iframe")) {
				triggerEle = $(triggerEle.get(0).contentWindow.document);
			}
			menuContainer = self.element.data("domObject").menucontainer;
			switch (event) {
			case "click":
				triggerEle.bind("click.wijmenu", function (e) {
					if (o.mode !== "popup") {
						self._displaySubmenu(e, triggerEle, menuContainer);
					}
				});
				break;
			case "mouseenter":
				triggerEle.bind("mouseenter.wijmenu", function (e) {
					self._displaySubmenu(e, triggerEle, menuContainer);
				});
				//.mouseleave(function (e) {						
				//self._hideSubmenu(menuContainer);
				//});
				break;
			case "dblclick":
				triggerEle.bind("dblclick.wijmenu", function (e) {
					self._displaySubmenu(e, triggerEle, menuContainer);
				});
				break;
			case "rtclick":
				triggerEle.bind("contextmenu.wijmenu", function (e) {
					self._displaySubmenu(e, triggerEle, menuContainer);
					e.preventDefault();
				});
				break;
			}
			$(document).bind("click.wijmenudoc", function (e) {
				if (self.element.data("shown")) {
					self.element.data("shown", false);
					return;
				}
				///fixed when click the breadcrumb choose item link to show
				/// the root menu in sliding menu.
				if ($(e.target).parent().is(".wij-menu-all-lists")) {
					return;
				}
				var obj = $(e.target).closest(".wijmo-wijmenu");
				if (obj.length === 0) {
					if (o.mode === "sliding") {
						breadcrumb = $(".wij-menu-breadcrumb", menuContainer);
						self._resetDrilldownMenu(breadcrumb);
					}
					if (o.mode === "flyout" && event !== "mouseenter") {
						self._hideAllMenus();
						return;
					}
					self._hideSubmenu(menuContainer);
				}
			});
		},

		_killtrigger: function () {
			var o = this.options, triggerEle;
			if (o.trigger !== "") {
				triggerEle = $(o.trigger);
				if (triggerEle && triggerEle.length > 0) {
					triggerEle.unbind(".wijmenu");
					$(document).unbind("click.wijmenudoc");
				}
			}
		},

		_setAnimationOptions: function () {
			var o = this.options, showDuration = o.showDuration,
			hideDuration = o.hideAnimated, showAnimated = o.showAnimated,
			hideAnimated = o.hideAnimated, animated = o.animated,
			duration = o.duration;
			if (showAnimated === null) {
				o.showAnimated = animated;
			}
			if (showDuration === null) {
				o.showDuration = duration;
			}
			if (hideAnimated === null) {
				o.hideAnimated = animated;
			}
			if (hideDuration === null) {
				o.hideDuration = duration;
			}
		},
		_move: function (direction, edge, event) {
			var active = this.element.data("activeItem"), next, parent;
			if (!active) {
				this.activate(event, this.element.children(edge));
				return;
			}
			next = $(active)[direction + "All"](".wijmo-wijmenu-item").eq(0);
			//= this.active[direction + "All"](".ui-menu-item").eq(0);
			parent = active.parent();
			if (next.length) {
				this.activate(event, next);
			} else {
				this.activate(event, parent.children(edge));
			}
		},
		refresh: function () {
			/// <summary>Renders all non-menu-items as menuitems,called once by _create.
			///Call this method whenever adding or replaceing items in the menu via DOM
			///operations,for example,via menu.append
			///("<li><a href='#'>new item</a></li>").wijmenu("refresh")</summary>
			var self = this, o = self.options, scrollcontainer, menucontainer,
			domObject, items, triggerEle;
			if (self.element.data("domObject")) {
				self._destroy();
			}
			self.element.wrap("<div><div></div></div>");
			scrollcontainer = self.element.parent();
			menucontainer = scrollcontainer.parent();
			scrollcontainer.addClass("scrollcontainer checkablesupport");
			menucontainer
			.addClass("ui-widget ui-widget-header wijmo-wijmenu ui-corner-all")
			.addClass("ui-helper-clearfix")
			.attr("aria-activedescendant", "ui-active-menuitem");
			//var containerClass = "wijmo-wijmenu-vertical";
			if (o.orientation === "horizontal" && o.mode === "flyout") {
				menucontainer.addClass("wijmo-wijmenu-horizontal");
			}
			domObject = { scrollcontainer: scrollcontainer,
			 menucontainer: menucontainer };
			self.element.data("domObject", domObject);
			self.element.data("topmenu", true);

			items = $("li", self.element);
			if (!self.element.hasClass("wijmo-wijmenu-list ui-helper-reset")) {
				self.element.addClass("wijmo-wijmenu-list ui-helper-reset");
			}

			items.each(function (i, n) {
				//var isFirstLevel = $(n).parent().parent().parent().is(".wijmo-wijmenu");
				var hasSubmenu = $(">ul", n).length > 0, li = $(n),
				icon, link = $(">:first", li);
				if (link.length === 0) {
					li.addClass("wijmo-wijmenu-separator ui-state-default ui-corner-all");
				}
				else {
					li.attr("role", "menuitem");
					if (link.is("a")) {
						link.bind("mouseenter.wijmenuitem", function () {
							$(this).addClass("ui-state-hover");
						}).bind("mouseleave.wijmenuitem", function () {
							$(this).removeClass("ui-state-hover");
						});
						if (!li.hasClass("wijmo-wijmenu-item ")) {
							li.addClass("ui-widget wijmo-wijmenu-item " +
							"ui-state-default ui-corner-all");
							link.addClass("wijmo-wijmenu-link ui-corner-all");
							link.wrapInner("<span>").children("span")
							.addClass("wijmo-wijmenu-text");
							if (hasSubmenu) {
								icon = $("<span>")
								.addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
							}							
						}
					}
					else if (link.is("h1,h2,h3,h4,h5")) {
						li.addClass("ui-widget-header ui-corner-all");
					}
					else {
						li.addClass("ui-widget wijmo-wijmenu-item" +
						"ui-state-default ui-corner-all");
						link.addClass("wijmo-wijmenu-link ui-corner-all");
						if (hasSubmenu) {
							icon = $("<span>").addClass("ui-icon ui-icon-triangle-1-e");
							link.append(icon);
						}
					}
				}
			});
			this.element.show();
			$("ul", self.element).each(function () {
				$(this).addClass("wijmo-wijmenu-list ui-widget-content ui-corner-all")
				.addClass("ui-helper-clearfix wijmo-wijmenu-child ui-helper-reset");
				$(this).hide();
			});
			if (this.options.mode === "flyout") {
				this._flyout();
			}
			//			else if (this.options.mode === "popup") {
			//				this._popup();
			//			}
			else {
				this._drilldown();
			}

			if (o.trigger !== "") {
				triggerEle = $(o.trigger).filter(function () {
					return $(this).closest(".wijmo-wijmenu").length === 0;
				});
				if (triggerEle.length > 0) {
					menucontainer.hide();
					self._initTrigger(triggerEle);
				}
			}
		},

		_showFlyoutSubmenu: function (e, li, subList) {
			var self = this, curList = self.element.data("currentMenuList"), i;
			if (curList !== undefined) {
				for (i = curList.length; i > 0; i--) {
					if (curList[i - 1].get(0) === li.parent().get(0)) {
						break;
					}
					else {
						self._hideSubmenu(curList[i - 1]);

					}
				}
			}
			self._displaySubmenu(e, li.find('.wijmo-wijmenu-link:eq(0)'), subList);
		},

		_getItemTriggerEvent: function (item) {
			var self = this, o = self.options, triggerEvent = "default", triggerEle;
			if (o.trigger !== "") {

				if (item.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else if (self.element.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else {
					item.parents(".wijmo-wijmenu-parent").each(function (i, n) {
						if ($(n).is(o.trigger)) {
							triggerEvent = o.triggerEvent;
							return false;
						}
					});
					if (triggerEvent === "default") {
						triggerEle = $(o.trigger).filter(function () {
							return $(this).closest(".wijmo-wijmenu").length === 0;
						});
						if (triggerEle.length > 0) {
							triggerEvent = o.triggerEvent;
						}
					}
				}
			}
			item.data("triggerEvent", triggerEvent);
			return triggerEvent;
		},

		_flyout: function () {
			var container = this.element.data("domObject").menucontainer, self = this;
			container.attr("role", "menu");
			if (self.options.orientation === "horizontal") {
				container.attr("role", "menubar");
				self.element.children("li:has(ul)").each(function () {
					$(this).children(".wijmo-wijmenu-link").find(".ui-icon-triangle-1-e")
					.removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
				});
			}
			container.find('li:has(ul)').each(function () {
				var allSubLists = $(this).find('ul'), 
				li = $(this).attr("aria-haspopup", true), showTimer, hideTimer,
				triggerEvent = self._getItemTriggerEvent(li), link, subList;
				li.children("ul").attr("role", "menu")
				.attr("aria-activedescendant", "ui-active-menuitem");
				if (triggerEvent !== "default" && 
				self.options.triggerEvent !== "mouseenter") {
					li.removeClass("wijmo-wijmenu-parent")
					.addClass("wijmo-wijmenu-parent");
					link = $(this).find('.wijmo-wijmenu-link:eq(0)');
					subList = link.next();

					switch (self.options.triggerEvent) {
					case "click":
						link.bind("click.wijmenu", function (e) {
							self._showFlyoutSubmenu(e, li, subList);
						});
						break;
					case "dblclick":
						link.bind("dblclick.wijmenu", function (e) {
							self._showFlyoutSubmenu(e, li, subList);
						});
						break;
					case "rtclick":
						link.bind("contextmenu.wijmenu", function (e) {
							self._showFlyoutSubmenu(e, li, subList);
							e.preventDefault();
						});
						break;
					}
					$(document).bind("click.wijmenu", function (e) {
						if (container.is(":animated")) {
							return;
						}
						var obj = $(e.target).closest(".wijmo-wijmenu");
						if (obj.length === 0) {
							allSubLists.each(function () {
								self._hideSubmenu($(this));
							});
						}
					});
					subList.data("notClose", true);
				}
				else {
					li.removeClass("wijmo-wijmenu-parent")
					.addClass("wijmo-wijmenu-parent");
					$(this).find('.wijmo-wijmenu-link:eq(0)').bind("mouseenter.wijmenu",
					function (e) {
						clearTimeout(hideTimer);
						var subList = $(this).next(), link = $(this);
						showTimer = setTimeout(function () {
							self._displaySubmenu(e, link, subList);
						}, 300);
					}).bind("mouseleave.wijmenu",
					function () {
						clearTimeout(showTimer);
						var subList = $(this).next();
						hideTimer = setTimeout(function () {
							self._hideSubmenu(subList);
						}, 400);
					});

					$(this).find('ul .wijmo-wijmenu-link,ul >.ui-widget-header,ul ' +
					'>.wijmo-wijmenu-separator').bind("mouseenter.wijmenu",
					function () {
						clearTimeout(hideTimer);
					}).bind("mouseleave.wijmenu",
					function () {
						hideTimer = setTimeout(function () {
							for (var i = allSubLists.length - 1; i >= 0; i--) {
								self._hideSubmenu($(allSubLists[i]));
							}
						}, 500);
					});
				}
			});


			///when click the menu item hide the submenus.
			container.find(".wijmo-wijmenu-link").bind("click.wijmenu", function (e) {
				if ($(this).is("a")) {
					if (!$(this).next().is("ul")) {
						self._hideAllMenus();
					}
					else if (!(self.options.trigger !== "" && 
					$(this).parent().data("triggerEvent") !== "default" &&
					 self.options.triggerEvent !== "mouseenter")) {
						self._hideAllMenus();
					}
					else {
						var curList = self.element.data("currentMenuList"), item, j;
						if (curList !== undefined) {
							item = $(this).parent();
							//var link = $(this);
							if (item.has("ul").length === 0) {
								for (j = curList.length; j > 0; j--) {
									if (curList[j - 1].get(0) === item.parent().get(0)) {
										break;
									}
									if (curList[j - 1].get(0) !== item.parent().get(0)) {
										self._hideSubmenu(curList[j - 1]);
									}
								}
							}
						}
					}
					self.activate(e, $(this).parent());
				}				
				self.select(e);
			})
			.bind("focusin", function (e) {
				if ($(this).is("a")) {
					self.activate(e, $(this).parent());
				}
			});
		},

		_hideAllMenus: function () {
			var self = this, container, outerTrigger, i, ul;
			ul = self.element.find("ul");
			for (i = ul.length - 1;i >= 0;i--) {
				self._hideSubmenu($(ul[i]));
			}
			if (self.options.trigger !== "") {
				container = self.element.data("domObject").menucontainer;
				if (container.is(":animated")) {
					return;
				}
				outerTrigger = $(self.options.trigger).filter(function () {
					return $(this).closest(".wijmo-wijmenu").length === 0;
				});
				if (outerTrigger.length === 0) {
					return;
				}

				self._hideSubmenu(self.element.data("domObject").menucontainer);
			}
		},

		hideAllMenus: function () {
			this._hideAllMenus();
		},

		_killFlyout: function () {
			var container = this.element.data("domObject").menucontainer.attr("role", "");
			container.find("li").each(function () {
				$(this).removeClass("wijmo-wijmenu-parent").unbind(".wijmenu")
				.children(":first").unbind(".wijmenu").attr("aria-haspopup", "");
			});
			$(document).unbind("click.wijmenu");
		},

		_killmenuItems: function () {
			this.element.removeClass("wijmo-wijmenu-list ui-helper-reset " +
			"wij-menu-content ui-helper-clearfix");
			this.element.find("li").each(function () {
				var item = $(this), link;
				item.removeClass("ui-widget wijmo-wijmenu-item ui-state-default " +
				"ui-corner-all wijmo-wijmenu-parent ui-widget-header " +
				"wijmo-wijmenu-separator");
				link = item.children(".wijmo-wijmenu-link");
				link.removeClass("wijmo-wijmenu-link ui-corner-all ui-state-focus " +
				"ui-state-hover ui-state-active")
				.html(link.children(".wijmo-wijmenu-text").html())
				.unbind(".wijmenu .wijmenuitem");
				item.children("ul").removeClass("wijmo-wijmenu-list ui-widget-content" +
				" ui-corner-all ui-helper-clearfix wijmo-wijmenu-child ui-helper-reset")
				.attr("role", "").attr("aria-activedescendant", "")
				.show().css({ left: "", top: "", position: "" }).attr("hidden", "");
			});
			//this.element.data("domObject").scrollcontainer.wijsuperpanel("destroy");
			this.element.data("domObject").menucontainer.removeClass("");
		},

		_sroll: function () {
			var scroll = this.element.data("domObject").scrollcontainer,
			options = this.options.superPanelOptions || {};
			scroll.height(this.options.maxHeight);			
			scroll.wijsuperpanel(options);
		},

		_hasScroll: function () {
			var scroll = this.element.data("domObject").scrollcontainer;
			return scroll.data("wijsuperpanel").vNeedScrollBar;
		},


		_resetDrillChildMenu: function (el) {
			el.removeClass('wij-menu-scroll')
			.removeClass('wij-menu-current').height('auto');
		},

		_checkDrillMenuHeight: function (el, mycontainer, scrollcontainer) {
			//var o = this.options;
			var self = this, fixPadding;
			//			if (el.height() > o.maxHeight) { //el.addClass('fg-menu-scroll')
			//			};
			//el.css({ height: o.maxHeight });
			mycontainer.height(el.height());
			scrollcontainer.wijsuperpanel("option", "hScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("option", "vScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("paintPanel");
			if (self._hasScroll()) {
				fixPadding = 5;
				if (el.prev().length > 0) {
					fixPadding = el.prev().css("padding-left").replace(/px/g, "");
				}
				el.width(scrollcontainer.find(".wijmo-wijsuperpanel-contentwrapper" +
				":first").width() - fixPadding);
			}
		},

		_resetDrilldownMenu: function (breadcrumb) {
			var self = this, o = self.options,
			container = this.element.data("domObject").menucontainer,
			topList = container.find('.wijmo-wijmenu-list:first'),
			crumbDefaultHeader = $('<li class="wij-menu-breadcrumb-text">' +
			o.crumbDefaultText + '</li>'),
			mycontainer = this.element.wrap("<div>").parent(),
			scrollcontainer = this.element.data("domObject").scrollcontainer;
			$('.wij-menu-current', container).removeClass('wij-menu-current');
			topList.animate({ left: 0 }, o.showDuration, function () {
				$(this).find('ul').each(function () {
					$(this).hide();
					self._resetDrillChildMenu($(this));
				});
				topList.addClass('wij-menu-current');
			});
			$('.wij-menu-all-lists', container).find('span').remove();
			breadcrumb.empty().append(crumbDefaultHeader);
			$('.wij-menu-footer', container).empty().hide();
			self._checkDrillMenuHeight(topList, mycontainer, scrollcontainer);
		},

		_drilldown: function () {
			var self = this,
			mycontainer = self.element.wrap("<div>").parent().css("position", "relative"),
			container = self.element.data("domObject").menucontainer.attr("role", "menu"),
			scrollcontainer = self.element.data("domObject").scrollcontainer,
			o = self.options, fixPadding,
			topList = container.find('.wijmo-wijmenu-list:first'),
			breadcrumb = $('<ul class="wij-menu-breadcrumb ui-widget-default' +
			' ui-corner-all ui-helper-clearfix"></ul>'),
			crumbDefaultHeader = $('<li class="wij-menu-breadcrumb-text">' + 
			o.crumbDefaultText + '</li>'),
			firstCrumbText = (o.backLink) ? o.backLinkText : o.topLinkText,
			firstCrumbClass = (o.backLink) ? 'wij-menu-prev-list' : 'wij-menu-all-lists',
			firstCrumbLinkClass = (o.backLink) ? 'ui-state-default ui-corner-all' : '',
			firstCrumbIcon = (o.backLink) ? 
			'<span class="ui-icon ui-icon-triangle-1-w"></span>' : '',
			firstCrumb = $('<li class="' + firstCrumbClass + '"><a href="#" class="' + 
			firstCrumbLinkClass + '">' + firstCrumbIcon + firstCrumbText + '</a></li>');
			container.addClass('wij-menu-ipod wij-menu-container');
			if (o.backLink) {
				breadcrumb.addClass('wij-menu-footer').appendTo(container).hide();
			}
			else {
				breadcrumb.addClass('wij-menu-header').prependTo(container);
			}
			if (!o.backLink) {
				breadcrumb.append(crumbDefaultHeader);
			}
			topList.addClass('wij-menu-content wij-menu-current ui-widget-content' +
			' ui-helper-clearfix').css({ width: container.width() })
			.find('ul').css({
				width: container.width(),
				left: container.width()
			}).attr("role", "menu").attr("aria-activedescendant", "ui-active-menuitem")
			.addClass('ui-widget-content');
			//.hide();
			mycontainer.height(self.element.height());
			self._sroll();
			if (self._hasScroll()) {
				fixPadding = 5;
				if (topList.children(":first").children(":first").length > 0) {
					fixPadding = topList.children(":first").children(":first")
					.css("padding-left").replace(/px/g, "");
				}
				topList.width(scrollcontainer
				.find(".wijmo-wijsuperpanel-contentwrapper:first").width() - fixPadding);
			}

			self.element.data("firstLeftValue", parseFloat(topList.css('left')));
			$('li>.wijmo-wijmenu-link', topList).each(function () {
				// if the link opens a child menu:
				if ($(this).next().is('ul')) {
					$(this).click(function (e) { // ----- show the next menu			
						var nextList = $(this).next(),
						parentUl = $(this).parents('ul:eq(0)'),
						parentLeft = (parentUl.data("topmenu")) ? 
						0 : parseFloat(topList.css('left')),
						setPrevMenu, crumbText, newCrumb,
						nextLeftVal = Math.round(parentLeft - 
						parseFloat(container.width())),
						footer = $('.wij-menu-footer', container);
						// show next menu	
						self._resetDrillChildMenu(parentUl);
						self._checkDrillMenuHeight(nextList, mycontainer,
						scrollcontainer);
						topList.stop(true, true)
						.animate({ left: nextLeftVal }, o.showDuration);
						nextList.show().addClass('wij-menu-current')
						.attr('aria-expanded', 'true');

						setPrevMenu = function (backlink) {
							var b = backlink,
							c = $('.wij-menu-current', container), prevList;
							if (c.get(0) === self.element.get(0)) {
								return;
							}
							prevList = c.parents('ul:eq(0)');
							c.hide().attr('aria-expanded', 'false');
							self._resetDrillChildMenu(c);
							self._checkDrillMenuHeight(prevList, mycontainer,
							 scrollcontainer);
							prevList.addClass('wij-menu-current')
							.attr('aria-expanded', 'true');
							if (prevList.hasClass('wij-menu-content')) {
								b.remove();
								footer.hide();
							}
						};

						// initialize "back" link
						if (o.backLink) {
							if (footer.find('a').size() === 0) {
								footer.show();
								$('<a href="#"><span class="ui-icon ui-icon-triangle' +
								'-1-w"></span> <span>' + o.backLinkText + '</span></a>')
									.appendTo(footer)
									.click(function () { // ----- show the previous menu
										var b = $(this), prevLeftVal;
										topList.stop(true, true);
										prevLeftVal = parseInt(topList.css('left'), 10) +
										parseInt(container.width(), 10);
										///to fix click the back button too quickly.
										///The menu display wrong.
										if (prevLeftVal > parentLeft) {
											return;
										}
										topList.animate({ left: prevLeftVal }, 
										o.hideDuration, function () {
											setPrevMenu(b);
										});
										//return false;
									});
							}
						}
						// or initialize top breadcrumb
						else {
							if (breadcrumb.find('li').size() === 1) {
								breadcrumb.empty().append(firstCrumb);
								firstCrumb.find('a').click(function () {
									self._resetDrilldownMenu(breadcrumb);
									//return false;
								});
							}
							$('.wij-menu-current-crumb', container)
							.removeClass('wij-menu-current-crumb');
							crumbText = $(this).find('span:eq(0)').text();
							newCrumb = $('<li class="wij-menu-current-crumb">' +
							'<a href="#" class="wij-menu-crumb">' + crumbText + 
							'</a></li>');
							newCrumb.appendTo(breadcrumb)
								.find('a').click(function () {
									if (!$(this).parent().is('.wij-menu-current-crumb')) {
										var newLeftVal = -($('.wij-menu-current')
										.parents('ul').size() - 1) * 180;
										topList.animate({ left: newLeftVal }, 
										o.showDuration, function () {
											setPrevMenu();
										});

										//make this the current crumb, delete all  
										//breadcrumbs, and navigate to the relevant menu
										$(this).parent()
										.addClass('wij-menu-current-crumb')
										.find('span').remove();
										$(this).parent().nextAll().remove();
									}
									//return false;
								});
							newCrumb.prev()
							.append(' <span class="ui-icon ui-icon-carat-1-e"></span>');
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
						//return false;
					});
				}
				// if the link is a leaf node (doesn't open a child menu)
				else {
					$(this).click(function (e) {
						self.activate(e, $(this).parent());
						self.select(e);
						if (self.options.trigger) {
							var triggers = $(self.options.trigger).filter(function () {
								return $(this).closest(".wijmo-wijmenu").length === 0;
							});
							if (triggers.length) {
								self._hideSubmenu(container);
								self._resetDrilldownMenu(breadcrumb);
							}
						}
						if ($(this).attr("href") === "#") {
							e.preventDefault();
						}
					});
				}
			});
		},

		_killDrilldown: function () {
			var domObject = this.element.data("domObject"),
			style = { width: "", height: "" }, superpanel;
			this.element.css(style).removeClass("ui-widget-content");
			domObject.scrollcontainer.css(style);
			superpanel = $(".wijmo-wijsuperpanel-statecontainer",
			 domObject.scrollcontainer);
			domObject.scrollcontainer.append(this.element);
			superpanel.remove();
			domObject.menucontainer.removeClass("wij-menu-ipod wij-menu-container");
			$('.wij-menu-current', domObject.menucontainer)
			.removeClass('wij-menu-current');
			$(".wij-menu-breadcrumb", domObject.menucontainer).remove();
			//			if (!this.element.parent().is(".scrollcontainer")) {
			//				//this.element.unwrap();
			//			}

			this.element.find("li").each(function () {
				var obj = $(this).children(":first");
				obj.unbind("click");
			});
			$("ul", this.element).css({ left: "", width: "" });
			this.element.css("left", "");
		},

		///popup menu
		//		_popup: function () {
		//			var self = this;
		//			var o = self.options;
		//			var triggerElement = o.trigger;
		//			if (triggerElement && triggerElement !==
		// "" && $(triggerElement).length > 0) {
		//				triggerElement = $(triggerElement);
		//				self.element.data("domObject").menucontainer
		//.css("position", "relative");
		//				triggerElement.bind("click.wijmenu", function (e) {
		//					self._displaySubmenu(triggerElement, 
		//self.element.data("domObject").menucontainer, e);
		//				});
		//				self.element.find("a.wijmo-wijmenu-link")
		//.bind("click.wijmenu", function () {
		//					var value = $(this).text();
		//					triggerElement.val(value);
		//					self._hideAllMenus();
		//				});
		//			}
		//		},

		_getItemByValue: function (val) {
			var items = this.element.find("a.wijmo-wijmenu-link").filter(function () {
				return $(this).text() === val;
			});
			if (items.length > 0) {
				return items.eq(0).parent();
			}
			return null;
		},
		//now do not support the popup menu
		/*
		_setPopupPosition: function (e) {
		var self = this;
		var triggerElement = $(self.options.trigger);
		var val = triggerElement.val() || triggerElement.attr("value");
		if (val !== "") {
		var item = self._getItemByValue(val);
		if (item) {
		var offset = triggerElement.offset();
		var height = triggerElement.outerHeight(true);
		var position = item.position();
		var newOffset = {
		left: offset.left,
		top: offset.top - position.top
		};
		self.element.data("domObject").menucontainer.css({
		left: 0,
		top: 0
		}).offset(newOffset);
		self.activate(e, item);
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		}
		else {
		self._setPosition(triggerElement, self.element
		//.data("domObject").menucontainer, false);
		}
		},
		*/
		_displaySubmenu: function (e, item, sublist) {
			var o = this.options, animated = o.animated, option, animationOptions, list;
			//now do not support the popup menu and equal-height menu.
			/*
			var parentUl = null;
			if (item.is(".wijmo-wijmenu-link")) {
			parentUl = item.parent().parent();
			}
			var parentHeight = 0;
			if (parentUl) {
			parentHeight = parentUl.innerHeight();
			if (parentHeight === 0) {
			parentHeight = this.element.data("domObject").menucontainer.innerHeight();
			}
			}
			var tag = false;
			if (parentHeight > 0 && parentHeight === sublist.innerHeight()) {
			tag = true;
			}
			
			sublist.show();
			if (o.mode === "popup") {
			this._setPopupPosition(e);
			}
			else {
			//this._setPosition(item, sublist, tag);

			}
			*/
			if (item.is("a.wijmo-wijmenu-link")) {
				item.addClass("ui-state-active");
			}
			sublist.show();
			this._setPosition(item, sublist);
			this.nowIndex ++;
			this._setZindex(sublist, this.nowIndex);
			sublist.hide();
			this._trigger("showing", e, sublist);
			if (o.showAnimated) {
				animated = o.showAnimated;
			}
			if (animated && $.wijmo.wijmenu.animations[animated]) {
				option = $.extend({
					animated: 'fade',
					duration: 400,
					complete: function () {
						if ($.browser.msie && jQuery.browser.version === "9.0") {
							sublist.wrap("<div></div>");
							sublist.unwrap();
						}
						if ($.browser.msie && jQuery.browser.version === "6.0") {
							sublist.css("overflow", "");
						}
					}
				}, { duration: o.showDuration, animated: o.showAnimated });
				animationOptions = {
					context: sublist,
					show: true
				};
				$.wijmo.wijmenu.animations[animated](option, animationOptions);
			}
			else {
				sublist.show().attr("aria-hidden", false);
			}
			if (this.options.triggerEvent === "click") {
				this.element.data("shown", true);
			}
			else {
				this.element.data("shown", false);
			}

			if (!sublist.is(".wijmo-wijmenu")) {
				if (this.element.data("currentMenuList") === undefined) {
					this.element.data("currentMenuList", []);
				}
				list = this.element.data("currentMenuList");
				list.push(sublist);
				this.element.data("currentMenuList", list);
			}
			//this.element.data("currentMenuList", sublist);
		},

		_hideCurrentSubmenu: function (aItem) {
			var self = this;
			aItem.find("ul").each(function () {
				if (!$(this).data("notClose")) {
					//if (this != item.parent().get(0)&&aItem.get(0)!=item.get(0)) {
					//	self._hideSubmenu($(this));
					//}				
					self._hideSubmenu($(this));
				}
			});
		},
		_hideSubmenu: function (sublist) {
			var o = this.options, self = this,
			animated = o.animated, option, animationOptions, list;
			if (o.hideAnimated) {
				animated = o.showAnimated;
			}
			if (sublist.prev().is(".wijmo-wijmenu-link")) {
				sublist.prev().removeClass("ui-state-active");
			}
			//var 
			if (animated) {
				option = $.extend({
					animated: 'fade',
					duration: 400,
					complete: function () {
						//self.nowIndex--;
						self._setZindex(sublist);
					}
				}, { animated: o.hideAnimated, duration: o.hideDuration });
				animationOptions = {
					context: sublist,
					show: false
				};
				$.wijmo.wijmenu.animations[animated](option, animationOptions);
			}
			else {
				sublist.hide().attr("aria-hidden", true);
				//self.nowIndex--;
				self._setZindex(sublist);
			}
			this.element.data("shown", false);
			list = this.element.data("currentMenuList");
			if (list) {
				list = $.map(list, function (n) {
					return n && (n.get(0) === sublist.get(0)) ? null : n;
				});
				this.element.data("currentMenuList", $.makeArray(list));
			}

		},

		_setZindex: function (ele, value) {
			if (!this.element.data("domObject")) {
				return;
			}
			var menucontainer = this.element.data("domObject").menucontainer;
			if (ele.get(0) === menucontainer.get(0)) {
				return;
			}
			if (value) {
				ele.parent().css("z-index", 10);
				ele.css("z-index", value);
				if (menucontainer.css("z-index") === 0) {
					menucontainer.css("z-index", 9950);
				}
			}
			else {
				ele.css("z-index", "");
				ele.parent().css("z-index", "");
				if ($.browser.msie && $.browser.version < 8 &&
				 $("ul:visible", this.element).length === 0) {
					menucontainer.css("z-index", "");
				}
			}
		},

		_setPosition: function (item, sublist) {
			sublist.css({ left: '0', top: '0', position: 'absolute' });
			var pOption = this._getPosition(item), obj = { of: item };
			//now do not support the equal-height menu.
			/*
			if (tag) {
			var parentUl = item.parent().parent();
			if (!parentUl.is(".wijmo-wijmenu-child")) {
			parentUl = this.element.data("domObject").menucontainer;
			}
			obj = { of: parentUl };
			}
			*/
			sublist.position($.extend(obj, pOption));
		},

		_getPosition: function (item) {
			var o = this.options,
			pOption = { my: 'left top',
				at: 'right top'
			};
			if (o.orientation === "horizontal") {
				if (item.parent().parent().parent().parent().is(".wijmo-wijmenu")) {
					pOption = { my: 'left top',
						at: 'left bottom'
					};
				}
			}

			if (!item.is(".wijmo-wijmenu-link")) {
				pOption = { my: 'left top',
					at: 'left bottom'
				};

			}
			pOption = $.extend(pOption, o.position);
			return pOption;
		}

	});

	$.extend($.wijmo.wijmenu, {
		animations: {
			slide: function (options, addtions) {
				options = $.extend({
					duration: 400,
					easing: "swing"
				}, options, addtions);
				if (options.show) {
					options.context.stop(true, true).animate({
						//opacity: 'show',
						//width: 'show',
						height: 'show'

					}, options).attr("aria-hidden", false);
				}
				else {
					options.context.stop(true, true).animate({
						//opacity: 'hide',
						//width: 'hide',
						height: 'hide'
					}, options).attr("aria-hidden", true);
				}
			}
		}
	});
}(jQuery));


