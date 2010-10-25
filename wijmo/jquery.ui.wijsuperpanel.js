/*
 *
 * Wijmo Library 0.6.1
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo SuperPanel widget.
 * 
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.resizable.js
 *	jquery.ui.draggable.js
 *	jquery.effects.core.js
 *	jquery.mousewheel.js
 *
 */
(function($){
	var uiSuperPanelClasses = 'ui-wijsuperpanel ' + 'ui-widget ' + 'ui-widget-content',
		rounderClass = 'ui-corner-all',
		uiStateDisabled = 'ui-state-disabled',
		uiStateHover = 'ui-state-hover',
		uiStateActive = 'ui-state-active',
		uiStateDefault = 'ui-state-default',
		scrollerHandle = 'ui-wijsuperpanel-handle',
		hbarContainerCSS = 'ui-wijsuperpanel-hbarcontainer',
		vbarContainerCSS = 'ui-wijsuperpanel-vbarcontainer',
		innerElementHtml = 
				'<div class="ui-wijsuperpanel-statecontainer">' +
				'<div class="ui-wijsuperpanel-contentwrapper">' +
				'<div class="ui-wijsuperpanel-templateouterwrapper" ></div>' +
				'</div>' +
				'</div>',
		hbarHtml = '<div class="ui-wijsuperpanel-hbarcontainer ui-widget-header">' +
				'<div class="ui-wijsuperpanel-handle ui-state-default ui-corner-all"><span class="ui-icon ui-icon-grip-solid-vertical"></span></div>' +
				'<div class="ui-wijsuperpanel-hbar-buttonleft ui-state-default ui-corner-bl"><span class="ui-icon ui-icon-triangle-1-w"></span></div>' +
				'<div class="ui-wijsuperpanel-hbar-buttonright ui-state-default ui-corner-br"><span class="ui-icon ui-icon-triangle-1-e"></span></div>' +
				'</div>',
		vbarHtml = '<div class="ui-wijsuperpanel-vbarcontainer ui-widget-header">' +
				'<div class="ui-wijsuperpanel-handle ui-state-default ui-corner-all"><span class="ui-icon ui-icon-grip-solid-horizontal"></span></div>' +
				'<div class="ui-wijsuperpanel-vbar-buttontop ui-state-default ui-corner-tr"><span class="ui-icon ui-icon-triangle-1-n"></span></div>' +
				'<div class="ui-wijsuperpanel-vbar-buttonbottom ui-state-default ui-corner-br"><span class="ui-icon ui-icon-triangle-1-s"></span></div>' +
				'</div>',
		hButtons = '<div class="ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonleft"><span class="ui-icon ui-icon-carat-1-w"></span></div>' + 
				'<div class="ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonright"><span class="ui-icon ui-icon-carat-1-e"></span></div>',
		vButtons = '<div class="ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttontop"><span class="ui-icon ui-icon-carat-1-n"></span></div>' +
				'<div class="ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonbottom"><span class="ui-icon ui-icon-carat-1-s"></span></div>';
		 

	$.widget("ui.wijsuperpanel", {
		options: {
			/// <summary>
			/// A value determines whether wijsuperpanel can be resized.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			allowResize: false,
			/// <summary>
			/// A value determines whether wijsuperpanel to automatically refresh when content size or wijsuperpanel size are changed.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			autoRefresh: false,
			/// <summary>
			/// The animation properties of wijsuperpanel scrolling.
			/// Type: Object.
			/// </summary>
			/// <remarks>
			/// Set this options to null to disable animation.
			/// </remarks>
			animationOptions: {
				/// <summary>
				/// A value determines whether to queue animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				queue: false,
				/// <summary>
				/// A value sets the animation duration of the scrolling animation.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				duration: 250,
				/// <summary>
				/// A value sets the animation easing of the scrolling animation.
				/// Default: undefined.
				/// Type: string.
				/// </summary>
				easing: undefined
			},
			
			/// <summary>
			/// A function gets called when thumb buttons of scrollbars dragging stops.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			dragstop: null,
			/// <summary>
			/// A function gets called after panel is painted.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			painted: null,
			/// <summary>
			/// This option contains horizontal scroller settings.
			/// </summary>
			hScroller: {
				/// <summary>
				/// A value determines the position of the horizontal scroll bar. 
				/// Default: 'bottom'.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are 'bottom' and 'top'.
				/// 'bottom' - The horizontal scroll bar is placed at the bottom of the content area.
				/// 'top' - The horizontal scroll bar is placed at the top of the content area.
				/// </remarks>
				scrollBarPosition: 'bottom',
				/// <summary>
				/// A value determines the visibility of the horizontal scroll bar.
				/// Default: 'auto'.
				/// Type: String
				/// </summary>
				/// <remarks>
				/// Possible options are 'auto', 'visible' and 'hidden'.
				/// 'auto' - Shows the scroll when needed.
				/// 'visible' - Scroll bar will always be visible. It's disabled when not needed.
				/// 'hidden' - Scroll bar will be hidden.
				/// </remarks>
				scrollBarVisibility: 'auto',
				/// <summary>
				/// A value determines the scroll mode of horizontal scrolling. 
				/// Default: 'scrollbar'.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are 'scrollbar', 'buttons', 'buttonshover' and 'edge'.
				/// 'scrollbar' - Scroll bars are used for scrolling.
				/// 'buttons' - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are clicked.
				/// 'buttonshover' - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are hovered.
				/// 'edge' - Scrolling occurs when the mouse is moving to the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, scrollMode: 'scrollbar,scrollbuttons' will enable both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: 'scrollbar',
				/// <summary>
				/// A value determines the horizontal scrolling position of wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// A value sets the maximum value of horizontal scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// A value sets the minimum value of horizontal scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// A value sets the large change value of horizontal scroller.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the tracks of scroll bars or presses left or right arrow keys on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll the width of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// A value sets the small change value of horizontal scroller.
				/// Default: null. 
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the arrows of scroll bars, clicks or hovers scroll buttons, presses left or right arrow keys on keyboard, and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of the width of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// A value sets the minimum length, in pixel, of the horizontal scroll bar thumb button.
				/// Default: 6.
				/// Type: Number.
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// An object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// An object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				decreaseButtonPosition: null,
				/// <summary>
				/// A value sets the width of horizontal hovering edge which will trigger the horizontal scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The number specifies the value to add to smallchange or largechange when scrolling the first step(scrolling from scrollMin).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0

			},
			/// <summary>
			/// A value determins whether wijsuperpanel provides keyboard scrolling support.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			keyboardSupport: false,
			/// <summary>
			/// A value determines the time interval to call the scrolling function when doing continuous scrolling.
			/// Default: 100.
			/// Type: Number.
			/// </summary>
			keyDownInterval: 100,
			/// <summary>
			/// A value determines whether wijsuperpanel has mouse wheel support.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			/// <remarks>
			/// Mouse wheel plugin is needed to support this feature.
			/// </remarks>
			mouseWheelSupport: true,
			/// <summary>
			/// A value determines whether to fire the mouse wheel event when wijsuperpanel is scrolled to the end.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			bubbleScrollingEvent: true,
			/// <summary>
			/// Resized event handler. A function gets called when resized event is fired.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			resized: null,
			/// <summary>
			/// An option determines the behavior of resizable widget. See JQuery UI resizable options document.
			/// Type: Object.
			/// </summary>
			resizableOptions: {
				handles: 'all',
				helper: 'ui-widget-content ui-wijsuperpanel-helper'
			},
			/// <summary>
			/// Scrolling event handler. A function called before scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.oldValue: The scrollValue before scrolling occurs.
			/// data.newValue: The scrollValue after scrolling occurs.
			/// data.dir: The direction of the scrolling action. Possible values: 'v'(vertical) and 'h'(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// </param>
			scrolling: null,
			/// <summary>
			/// Scrolled event handler.  A function called after scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: The direction of the scrolling action. Possible values: 'v'(vertical) and 'h'(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// data.afterPosition: The position of content after scrolling occurs.
			/// </param>
			scrolled: null,
			/// <summary>
			/// A value determines whether to show the rounded corner of wijsuperpanel.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showRounder: true,
			/// <summary>
			/// This option contains vertical scroller settings.
			/// </summary>
			vScroller: {
				/// <summary>
				/// A value determines the position of vertical scroll bar. 
				/// Default: 'right'.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: 'left', 'right'.
				/// 'left' - The vertical scroll bar is placed at the left side of the content area.
				/// 'right' - The vertical scroll bar is placed at the right side of the content area.
				/// </remarks>
				scrollBarPosition: 'right',
				/// <summary>
				/// A value determines the visibility of the vertical scroll bar.
				/// Default.: 'auto'. 
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are 'auto', 'visible' and 'hidden'.
				/// 'auto' - Shows the scroll bar when needed.
				/// 'visible' - Scroll bar will always be visible. It's disabled when not needed.
				/// 'hidden' - Scroll bar will be shown.
				/// </remarks>
				scrollBarVisibility: 'auto',
				/// <summary>
				/// A value determines the scroll mode of vertical scrolling. 
				/// Default: 'scrollbar'.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: 'scrollbar', 'buttons', 'buttonshover' and 'edge'.
				/// 'scrollbar' - Scroll bars are used for scrolling.
				/// 'buttons' - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are clicked.
				/// 'buttonshover' - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are hovered.
				/// 'edge' - Scrolling occurs when the mouse is moving to the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, vScrollMode: 'scrollbar,scrollbuttons' will enable both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: 'scrollbar',
				/// <summary>
				/// A value determines the vertical scrolling position of wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// A value sets the maximum value of vertical scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// A value sets the minimum value of vertical scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// A value sets the large change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the tracks of scroll bars or presses left or right arrow keys on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll the height of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// A value sets the small change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the arrows of scroll bars, clicks or hovers scroll buttons, presses left or right arrow keys on keyboard, and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of the height of content.	
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// A value sets the minimum length, in pixel, of the vertical scroll bar thumb button.
				/// Default: 6.
				/// Type: Number
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// An object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// An object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				decreaseButtonPosition: null,
				/// <summary>
				/// A value sets the width of horizontal hovering edge which will trigger the vertical scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The value to add to small change or largechange when scrolling the first step(scrolling from value 0).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0
			}
		},
		
		_setOption: function(key, value){
			
			var self = this;
			var o = self.options;
			var f = self._fields();
			var hd = f.hbarDrag;
			var vd = f.vbarDrag;
			var r = f.resizer;

			// override existing 
			if (key == 'animationOptions') {
				value = $.extend(o.animationOptions, value);
			}
			else if (key == 'hScroller') {
				if (value.scrollLargeChange != undefined && value.scrollLargeChange != null) {
					self._autoHLarge = false;
				}
				value = $.extend(o.hScroller, value);
			}
			else if (key == 'vScroller') {
				if (value.scrollLargeChange != undefined && value.scrollLargeChange != null) {
					self._autoVLarge = false;
				}
				value = $.extend(o.vScroller, value);
			}
			else if (key == 'resizableOptions') {
				value = $.extend(self.resizableOptions, value);
			}
			$.Widget.prototype._setOption.apply(self, arguments);
			switch (key) {
				case "allowResize":
					self._initResizer();
					break;
				case "disabled":
					if (value) {
						if (hd != undefined) {
							hd.draggable('disable');
						}
						if (vd != undefined){
							vd.draggable('disable');
						}
						if (r!=undefined){
							r.resizable('disable');
						}
					}
					else{
						if (hd != undefined) {
							hd.draggable('enable');
						}
						if (vd != undefined){
							vd.draggable('enable');
						}
						if (r!=undefined){
							r.resizable('enable');
						}
					}
					break;
				case 'mouseWheelSupport':
				case 'keyboardSupport':
					self._bindElementEvents(self, f, self.element, o);
					break;
			}
			return self;
		},
		
		_create: function(){
			var self = this;
			var o = self.options;
			o.vScroller.dir = 'v';
			o.hScroller.dir = 'h';
			self.paintPanel();
			self._initResizer();
			if (self.options.disabled){
				self.disable();
			}
			self._detectAutoRefresh();
		},
		
		_detectAutoRefresh: function (){
			// register with auto fresh.
			var self = this;

			var panels = $.ui.wijsuperpanel.panels;
			if (panels == undefined){
				panels = [];
				$.ui.wijsuperpanel.panels = panels;
			}
			panels.push(self);
			// start timer to monitor content.
			if (self.options.autoRefresh){
				if (!$.ui.wijsuperpanel.setAutoRefreshInterval){
					$.ui.wijsuperpanel.setAutoRefreshInterval = self._setAutoRefreshInterval;
					$.ui.wijsuperpanel.setAutoRefreshInterval();
				}
			}
		},
		
		_setAutoRefreshInterval: function (){
			var interval = $.ui.wijsuperpanel.autoRereshInterval;
			var panels = $.ui.wijsuperpanel.panels;
			var intervalID = window.setInterval(function (){
				window.clearInterval(intervalID);
				var count = panels.length;
				var toContinue = false;
				for (var i=0; i<count; i++){
					var panel = panels[i];
					var mainElement = panel.element[0];
					var autoRefresh = panel.options.autoRefresh;
					if (autoRefresh){
						toContinue = true;
					}
					var ele = panel.getContentElement();
					var mark = panel._paintedMark;
					if (panel.options.autoRefresh && ele.is(':visible') &&
					(mark == undefined || 
					mark.width!= ele[0].offsetWidth || mark.height!= ele[0].offsetHeight ||
					mark.mainWidth!=mainElement.offsetWidth || mark.mainHeight!=mainElement.offsetHeight)){
						panel.paintPanel();
					}
				}
				if (toContinue){
					window.setTimeout($.ui.wijsuperpanel.setAutoRefreshInterval, 0);
				}
			}, interval == undefined ? 500 : interval);
		},
		
		destroy: function(){
			/// <summary>
			/// Destroys wijsuperpanel widget and reset the DOM element.
			/// </summary>
			
			var self = this;
			var f = self._fields();
			var ele = self.element;
			// remove this widget from panels array.
			$.ui.wijsuperpanel.panels = $.grep($.ui.wijsuperpanel.panels, function(value) {
				return value != self;
			});
			if (!f.initialized){
				return;
			}
			if (self._radiusKey){
				self.element.css(self._radiusKey,"");
			}
			if (f.intervalID != undefined) {
				window.clearInterval(f.intervalID);
				f.intervalID = undefined;
			}
			// destory widgets
			if (f.resizer != null) {
				f.resizer.resizable('destroy');
			}
			if (f.hbarContainer!= undefined){
				f.hbarDrag.remove();
				f.hbarContainer.unbind('.' + self.widgetName);
			}
			if (f.vbarContainer != undefined) {
				f.vbarDrag.remove();
				f.vbarContainer.unbind('.' + self.widgetName);
			}
			ele.unbind('.' + self.widgetName);
			f.contentWrapper.unbind('.' + self.widgetName);
			var buttons = f.stateContainer.find('>.ui-wijsuperpanel-button');
			buttons.unbind('.' + self.widgetName)
			var templateWrapper = f.templateWrapper;
			templateWrapper.contents().each(function(index, e){
				ele.append(e);
			});
			f.stateContainer.remove();
			if (f.tabindex) {
				ele.removeAttr('tabindex');
			}
			ele.removeClass(uiSuperPanelClasses + ' ' + rounderClass);
			$.Widget.prototype.destroy.apply(self, arguments);
		},
		
		_fields: function(){
			var self = this;
			var ele = self.element;
			var key = self.widgetName + '-fields';
			var d = self._fieldsStore;
			if (d == undefined) {
				d = {};
				ele.data(key, d);
				self._fieldsStore = d;
			}
			return d;
		},
		
		_hasMode: function (scroller, mode){
			var modes = scroller.scrollMode.split(',');
			return $.inArray(mode,modes) > -1;
		},
		
		_bindElementEvents: function(self, f, ele, o){
			// mouse move only edge mode is used.
			var hEdge = self._hasMode(o.hScroller, 'edge');
			var vEdge = self._hasMode(o.vScroller, 'edge');
			var wn = self.widgetName;
			
			if (hEdge || vEdge){
				if (self._mousemoveBind == undefined){
					self._mousemoveBind = true;
					ele.bind('mousemove.' + wn, self, self._contentMouseMove);
				}
			}
			else{
				ele.unbind('mousemove',self._contentMouseMove);
				self._mousemoveBind = undefined;
			}
			if (o.mouseWheelSupport){
				if (self._mouseWheelBind == undefined){
					self._mouseWheelBind = true;
					ele.bind('mousewheel.' +wn, self, self._panelMouseWheel);
				}
			}
			else{
				self.element.unbind('mousewheel', self._panelMouseWheel);
				self._mouseWheelBind = undefined;
			}
			if (o.keyboardSupport){
				if (self._keyboardBind == undefined){
					self._keyboardBind = true;
					ele.bind('keydown.' + wn, self, self._panelKeyDown);
				}
			}
			else{
				ele.unbind('keydown', self._panelKeyDown);
				self._keyboardBind = undefined;
			}
		},

		_dragStop: function(e, self, dir){
			// Handles mouse drag stop event of thumb button.
			
			var data = {
				dragHandle: dir
			};
			self._trigger('dragstop', e, data);
		},
		
		_contentMouseMove: function(e){
			// Handles mouse move event of content area.
			// Edge hover scrolling is handled in this method.
			
			var self = e.data;
			var o = self.options;
			if (o.disabled) {
				return;
			}
			var hScroller = o.hScroller;
			var vScroller = o.vScroller;
			var contentWrapper = $(e.currentTarget);
			var f = self._fields();
			var hMode = self._hasMode(hScroller, 'edge');
			var vMode = self._hasMode(vScroller, 'edge');
			self._clearInterval();
			var mousePagePosition = {
				X: e.pageX,
				Y: e.pageY
			};
			var off = contentWrapper.offset();
			var left = off.left;
			var top = off.top;
			left = mousePagePosition.X - left;
			top = mousePagePosition.Y - top;
			var hEdge = hScroller.hoverEdgeSpan;
			var vEdge = vScroller.hoverEdgeSpan;
			var innerHeight = contentWrapper.innerHeight();
			var innerWidth = contentWrapper.innerWidth();
			var dir = '';
			if (hMode) {
				if (left < hEdge) {
					dir = 'left';
				}
				if (left > (innerWidth - hEdge)) {
					dir = 'right';
				}
			}
			if (vMode) {
				if (top < vEdge) {
					dir = 'top';
				}
				if (top > (innerHeight - vEdge)) {
					dir = 'bottom';
				}
			}
			self._setScrollingInterval(f,dir,self, false);
		},
		
		_setScrollingInterval: function (f, dir, self, large){
			var o = self.options;
			if (dir.length>0){
				f.internalFuncID = window.setInterval(function(){
					self._doScrolling(dir, self, large);
				}, o.keyDownInterval);
			}
		},
		
		_scrollButtonMouseOver: function(e){
			// Scroll buttons mouse over event handler.
			
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.bind('mouseout.' + self.widgetName, self, self._buttonMouseOut);
				button.bind('mousedown.' + self.widgetName, self, self._buttonMouseDown);
				button.bind('mouseup.' + self.widgetName, self, self._buttonMouseUp);
				button.addClass(uiStateHover);
				self._buttonScroll(button, self, 'buttonshover');
			}
		},
		
		_buttonScroll: function(button, self, mode){
			// Do button scroll.

			var dir = '';
			var o = self.options;
			var f = self._fields();
			var hMode = self._hasMode(o.hScroller, mode);
			var vMode = self._hasMode(o.vScroller, mode);
			
			if (button.hasClass('ui-wijsuperpanel-buttonleft') && hMode) {
				dir = 'left';
			}
			else if (button.hasClass('ui-wijsuperpanel-buttonright') && hMode) {
				dir = 'right';
			}
			else if (button.hasClass('ui-wijsuperpanel-buttontop') && vMode) {
				dir = 'top';
			}
			else if (button.hasClass('ui-wijsuperpanel-buttonbottom') && vMode) {
				dir = 'bottom';
			}
			if (dir.length > 0) {
				self._clearInterval();
				self._doScrolling(dir, self, true);
				self._setScrollingInterval(f,dir,self,true);
			}
		},
		
		_buttonMouseDown: function(e){
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.addClass(uiStateActive);
				self._buttonScroll(button, self, 'buttons');
			}
		},
		
		_buttonMouseUp: function(e){
			var self = e.data;
			var button = $(e.currentTarget);
			button.removeClass('ui-state-active');
			self._clearInterval();
		},
		
		_buttonMouseOut: function(e){
			var self = e.data;
			var button = $(e.currentTarget);
			button.unbind('mouseout', self._buttonMouseOut);
			button.unbind('mousedown', self._buttonMouseDown);
			button.unbind('mouseup', self._buttonMouseUp);
			button.removeClass(uiStateHover);
			button.removeClass(uiStateActive);
			self._clearInterval();
		},
		
		_panelKeyDown: function(e){
			// Key down handler.
			
			var self = e.data;
			var o = self.options;
			if (!o.keyboardSupport || o.disabled) {
				return;
			}
			var shift = e.shiftKey;
			var keycode = e.keyCode;
			if (keycode == $.ui.keyCode.LEFT) {
				self._doScrolling('left', self, shift);
			}
			else if (keycode == $.ui.keyCode.RIGHT) {
				self._doScrolling('right', self, shift);
			}
			else if (keycode == $.ui.keyCode.UP) {
				self._doScrolling('top', self, shift);
			}
			else if (keycode == $.ui.keyCode.DOWN) {
				self._doScrolling('bottom', self, shift);
			}
			e.stopPropagation();
			e.preventDefault();
		},
		
		_draggingInternal: function (self, scroller, originalElement){
			var dir = scroller.dir;
			var h = dir === 'h';
			var key = h?'left': 'top';
			
			var left = parseFloat(originalElement[0].style[key].replace('px', '')) - self._getScrollContainerPadding(key);
			var track = self._getTrackLen(dir) - originalElement[h?'outerWidth':'outerHeight']();
			var proportion = left / track;
			var topValue = (scroller.scrollMax - scroller.scrollLargeChange + 1);
			var v = proportion * topValue;
			if (v < scroller.scrollMin) {
				v = scroller.scrollMin;
			}
			if (v > topValue) {
				v = topValue;
			}
			var data = {
				oldValue: scroller.scrollValue,
				newValue: v,
				dir: dir
			};
			if (!self._scrolling(true, self, data)) {
				// event is canceled in scrolling.
				return;
			}
			scroller.scrollValue = v;
			self._setDragAndContentPosition(true, false, dir, "dragging");
		},
		
		_dragging: function(e, self){
			var o = self.options;
			var originalElement = $(e.target);
			var p = originalElement.parent();
			if (p.hasClass(hbarContainerCSS)) {
				self._draggingInternal(self, o.hScroller, originalElement);
			}
			else{
				self._draggingInternal(self, o.vScroller, originalElement);
			} 
		},
		
		_panelMouseWheel: function(e, delta){
			
			
			var self = e.data;
			var o = self.options;
			if (!o.mouseWheelSupport || o.disabled) {
				return;
			}
			//var f = self._fields();
			//var scrollerWrapper = f.stateContainer;
			//var hbarContainer = f.hbarContainer;
			var originalElement = $(e.srcElement || e.originalTarget);
			var dir = '';
			var onHbar = originalElement.closest("."+hbarContainerCSS, self.element).size()>0;
			var hScroller = o.hScroller;
			var vScroller = o.vScroller;
			if (delta > 0) {
				dir =  onHbar ? 'left' : 'top';
			}
			else {
				dir =  onHbar ? 'right' : 'bottom';
			}

			if (dir.length > 0) {
				self._doScrolling(dir, self);
			}
			var scrollEnd = false;
			if (dir == 'left') {
				scrollEnd = !self.hNeedScrollBar || Math.abs(hScroller.scrollValue - hScroller.scrollMin) < 0.001;
			}
			if (dir == 'right') {
				scrollEnd = !self.hNeedScrollBar ||Math.abs(hScroller.scrollValue - (hScroller.scrollMax - self._getHScrollBarLargeChange() + 1)) < 0.001;
			}
			if (dir == 'top') {
				scrollEnd = !self.vNeedScrollBar || Math.abs(vScroller.scrollValue - vScroller.scrollMin) < 0.001;
			}
			if (dir == 'bottom') {
				scrollEnd = !self.vNeedScrollBar ||Math.abs(vScroller.scrollValue - (vScroller.scrollMax - self._getVScrollBarLargeChange() + 1)) < 0.001;
			}
			if (!scrollEnd || !o.bubbleScrollingEvent || dir == 'left' || dir == 'right') {
				e.stopPropagation();
				e.preventDefault();
			}
		},
		
		_documentMouseUp: function(e){
			var self = e.data.self;
			var ele = e.data.ele;
			ele.removeClass(uiStateActive);
			self._clearInterval();
			$(document).unbind('mouseup', self._documentMouseUp);
		},
		
		_scrollerMouseOver: function(e){
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var originalElement = $(e.srcElement || e.originalTarget);
			var ele = null;
			var addhover = false;
			
			if (originalElement.hasClass(uiStateDefault)) {
				ele = originalElement;
				addhover = true;
			}
			else if (originalElement.parent().hasClass(uiStateDefault)) {
				ele = originalElement.parent();
				addhover = true;
			}
			else if (originalElement.hasClass(vbarContainerCSS) || originalElement.hasClass(hbarContainerCSS)) {
				ele = originalElement;
			}
			
			if (ele != null) {
				if (addhover) {
					ele.addClass(uiStateHover);
				}
				ele.bind('mouseout.' + self.widgetName, self, self._elementMouseOut);
				ele.bind('mousedown.' + self.widgetName, self, self._elementMouseDown);
				ele.bind('mouseup.' + self.widgetName, self, self._elementMouseUp);
			}
		},
		
		_elementMouseUp: function(e){
			var ele = $(e.currentTarget);
			//var self = e.data;
			ele.removeClass('ui-state-active');
		},
		
		_elementMouseDown: function(e){
			var ele = $(e.currentTarget);
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var scrollDirection = '';
			var large = false;
			var active = false;
			if (ele.hasClass('ui-wijsuperpanel-vbar-buttontop')) {
				scrollDirection = 'top';
				active = true;
			}
			else if (ele.hasClass('ui-wijsuperpanel-vbar-buttonbottom')) {
				scrollDirection = 'bottom';
				active = true;
			}
			else if (ele.hasClass('ui-wijsuperpanel-hbar-buttonleft')) {
				scrollDirection = 'left';
				active = true;
			}
			else if (ele.hasClass('ui-wijsuperpanel-hbar-buttonright')) {
				scrollDirection = 'right';
				active = true;
			}
			else if (ele.hasClass(scrollerHandle)) {
				ele.addClass('ui-state-active');
				return;
			}
			else if (ele.hasClass(hbarContainerCSS)) {
				var hbarDrag = ele.find('.' + scrollerHandle);
				var pos = hbarDrag.offset();
				if (e.pageX < pos.left) {
					scrollDirection = 'left';
				}
				else {
					scrollDirection = 'right';
				}
				large = true;
			}
			else if (ele.hasClass(vbarContainerCSS)) {
				var vbarDrag = ele.find('.'+scrollerHandle);
				var pos2 = vbarDrag.offset();
				if (e.pageY < pos2.top) {
					scrollDirection = 'top';
				}
				else {
					scrollDirection = 'bottom';
				}
				large = true;
			}
			self._clearInterval();
			self._doScrolling(scrollDirection, self, large);
			var f = self._fields();
			self._setScrollingInterval(f, scrollDirection, self, large);
			if (active) {
				ele.addClass('ui-state-active');
			}
			$(document).bind('mouseup.' + self.widgetName, {
				self: self,
				ele: ele
			}, self._documentMouseUp);
		},
		
		doScrolling: function (dir, large){
			/// <summary>
			/// Do scrolling.
			/// </summary>
			/// <param name="dir" type="string">
			///   Scrolling direction. Options are: 'left', 'right', 'top' and 'bottom'.
			/// </param>
			/// <param name="large" type="Boolean">
			/// Whether to scroll a large change.
			/// </param>

			this._doScrolling(dir, this, large);
		},
		
		_setScrollerValue: function (dir,scroller, smallChange, largeChange, isAdd, isLarge,self){
			//var o = self.options;
			var vMin = scroller.scrollMin;
			var change = isLarge ? largeChange : smallChange;
			var value = scroller.scrollValue;
			if (value == null){
				value = vMin;
			}
			var t = 0;
			if (isAdd){
				var vTopValue = scroller.scrollMax - largeChange + 1;
				if (Math.abs(value - vTopValue) < 0.001) {
					self._clearInterval();
					return false;
				}
				var firstStepChangeFix = scroller.firstStepChangeFix;
				t = value + change;
				if (!isLarge && Math.abs(value - vMin) < 0.0001 && !isNaN(firstStepChangeFix)) {
					t += firstStepChangeFix;
				}
				if (t > vTopValue) {
					t = vTopValue;
				}
			}
			else{
				if (Math.abs(value - vMin) < 0.001) {
					self._clearInterval();
					return false;
				}
				t = value - change;
				if (t < 0) {
					t = vMin;
				}
			}
			var data = {
				oldValue: scroller.scrollValue,
				newValue: t,
				direction: dir,
				dir: scroller.dir
			};
			if (!self._scrolling(true, self, data)){
				return false
			}
			scroller.scrollValue = t;
			return true;
		},
		
		_doScrolling: function(dir, self, large){
			// Does wijsuperpanel scrolling.
			// <param name="dir" type="String">
			// Scroll direction. 
			// Options are: 'left', 'right', 'top' and 'bottom'.
			// </param>
			// <param name="self" type="jQuery">
			// Pointer to the wijsuperpanel widget instance.
			// </param>
			// <param name="large" type="Boolean">
			// Whether to scroll a large change.
			// </param>
			
			var o = self.options;
			var vScroller = o.vScroller;
			var hScroller = o.hScroller;
			var vSmall = self._getVScrollBarSmallChange();
			var vLarge = self._getVScrollBarLargeChange();
			var hLarge = self._getHScrollBarLargeChange();
			var hSmall = self._getHScrollBarSmallChange();

			if (dir == 'top' || dir == 'bottom') {
				if (!self._setScrollerValue(dir, vScroller, vSmall, vLarge, dir == 'bottom', large,self)){
					return;
				}
				dir = 'v';
			}
			else if (dir == 'left' || dir == 'right') {
				if (!self._setScrollerValue(dir, hScroller, hSmall, hLarge, dir == 'right', large,self)){
					return;
				}
				dir = 'h';
			}
			self._setDragAndContentPosition(true, true, dir);
		},
		
		_disableButtonIfNeeded: function(self){
			// Disables scrolling buttons.
			
			var f = self._fields();
			if (f.intervalID>0){
				window.clearInterval(f.intervalID);
			}
			var o = self.options;
			var buttonLeft = f.buttonLeft;
			var buttonRight = f.buttonRight;
			var buttonTop = f.buttonTop;
			var buttonBottom = f.buttonBottom;
			
			if (buttonLeft != undefined){
				var hLargeChange = self._getHScrollBarLargeChange();
				
				var hMax = o.hScroller.scrollMax - hLargeChange + 1;
				var hValue = o.hScroller.scrollValue;
				var hScrollMin = o.hScroller.scrollMin;
				
				if (hValue == undefined) {
					hValue = hScrollMin;
				}
				if (Math.abs(hValue - hScrollMin) < 0.001 || !f.hScrolling) {
					buttonLeft.addClass(uiStateDisabled);
				}
				else {
					buttonLeft.removeClass(uiStateDisabled);
				}
				if (Math.abs(hValue - hMax) < 0.001 || !f.hScrolling) {
					buttonRight.addClass(uiStateDisabled);
				}
				else {
					buttonRight.removeClass(uiStateDisabled);
				}
			}
			if (buttonTop!=undefined){
				var vLargeChange = self._getVScrollBarLargeChange();
				var vMax = o.vScroller.scrollMax - vLargeChange + 1;
				var vValue = o.vScroller.scrollValue;
				var vScrollMin = o.vScroller.scrollMin;
				if (vValue == undefined) {
					vValue = vScrollMin;
				}
				if (Math.abs(vValue - vScrollMin) < 0.001 || !f.vScrolling) {
					buttonTop.addClass(uiStateDisabled);
				}
				else {
					buttonTop.removeClass(uiStateDisabled);
				}
				if (Math.abs(vValue - vMax) < 0.001 || !f.vScrolling) {
					buttonBottom.addClass(uiStateDisabled);
				}
				else {
					buttonBottom.removeClass(uiStateDisabled);
				}
			}
		},
		
		_clearInterval: function(){
			var f = this._fields();
			var intervalID = f.internalFuncID;
			if (intervalID > 0) {
				window.clearInterval(intervalID);
				f.internalFuncID = -1;
			}
		},
		
		_elementMouseOut: function(event){
			var ele = $(event.currentTarget);
			var self = event.data;
			
			ele.unbind('mouseout', self._elementMouseOut);
			ele.unbind('mousedown', self._elementMouseDown);
			ele.unbind('mouseup', self._elementMouseUp);
			
			ele.removeClass(uiStateHover);
		},
		
		scrollChildIntoView: function(child1){
			/// <summary>
			/// Scroll children DOM element to view. 
			/// </summary>
			/// <param name="child" type="DOMElement/JQueryObj">
			/// The child to scroll to.
			/// </param>

			var child = $(child1);
			
			if (child.size() == 0) {
				return;
			}
			var f = this._fields();
			var cWrapper = f.contentWrapper;
			var tempWrapper = f.templateWrapper;
			var left, top;
			var childOffset = child.offset();
			var templateOffset = tempWrapper.offset();
			
			childOffset.leftWidth = childOffset.left + child.outerWidth();
			childOffset.topHeight = childOffset.top + child.outerHeight();
			var cWrapperOffset = cWrapper.offset();
			cWrapperOffset.leftWidth = cWrapperOffset.left + cWrapper.outerWidth();
			cWrapperOffset.topHeight = cWrapperOffset.top + cWrapper.outerHeight();
			
			if (childOffset.left < cWrapperOffset.left) {
				left = childOffset.left - templateOffset.left;
			}
			else 
				if (childOffset.leftWidth > cWrapperOffset.leftWidth) {
					left = childOffset.leftWidth - templateOffset.left - cWrapper.innerWidth();
				}
			if (childOffset.top < cWrapperOffset.top) {
				top = childOffset.top - templateOffset.top;
			}
			else 
				if (childOffset.topHeight > cWrapperOffset.topHeight) {
					top = childOffset.topHeight - templateOffset.top - cWrapper.innerHeight();
				}
			if (left != undefined) {
				this.hScrollTo(left);
			}
			if (top != undefined) {
				this.vScrollTo(top);
			}
		},
		
		hScrollTo: function(x){
			/// <summary>
			/// Scroll to horizontal position.
			/// </summary>
			/// <param name="x" type="Number">
			/// The position to scroll to.
			/// </param>
			var o = this.options;
			//var f = this._fields();
			o.hScroller.scrollValue = this.scrollPxToValue(x, 'h');
			this._setDragAndContentPosition(false, true, 'h', 'nonestop');
		},
		
		vScrollTo: function(y){
			/// <summary>
			/// Scroll to vertical position.
			/// </summary>
			/// <param name="y" type="Number">
			/// The position to scroll to.
			/// </param>

			var o = this.options;
			o.vScroller.scrollValue = this.scrollPxToValue(y, 'v');
			this._setDragAndContentPosition(false, true, 'v', 'nonestop');
		},
		
		scrollPxToValue: function(px, dir){
			/// <summary>
			/// Convert pixel to scroll value.
			/// For example, wijsuperpanel scrolled 50px which is value 1 after conversion.
			/// </summary>
			/// <param name="px" type="Number">
			/// Length of scrolling.
			/// </param>
			/// <param name="dir" type="String">
			/// Scrolling direction. Options are: 'h' and 'v'.
			/// </param>
			
			var o = this.options;
			var m = (dir == 'h' ? 'outerWidth' : 'outerHeight');
			var m1 = (dir == 'h' ? 'contentWidth' : 'contentHeight');
			var scroller = (dir == 'h' ? 'hScroller' : 'vScroller');
			var f = this._fields();
			var cWrapper = f.contentWrapper;
			//var tempWrapper = f.templateWrapper;
			var size = f[m1];
			var contentHeight = cWrapper[m]();
			
			var vMin = o[scroller].scrollMin;
			var vMax = o[scroller].scrollMax;
			var vRange = vMax - vMin;
			var vLargeChange = (dir == 'h' ? this._getHScrollBarLargeChange() : this._getVScrollBarLargeChange());
			var maxv = vRange - vLargeChange + 1;
			var ret = maxv * (px / (size - contentHeight))
			if (ret < vMin) {
				ret = vMin;
			}
			if (ret > maxv) {
				ret = maxv;
			}
			return ret;
		},
		
		scrollTo: function(x, y){
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <param name="x" type="Number">
			/// Horizontal position to scroll to.	
			/// </param>
			/// <param name="y" type="Number">
			/// Vertical position to scroll to.
			/// </param>
			
			this.hScrollTo(x);
			this.vScrollTo(y);
		},
		
		paintPanel: function(){
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if painting is successful, else returns false. 
			/// </returns>
			var self = this;
			var ele = self.element;
			if (ele.is(':visible')) {
				var focused = document.activeElement;
				var o = self.options;
				var f = self._fields();
				if (!f.initialized){
					self._initialize(f,ele,self);
				}
				self._resetLargeChange(self,f,o);
				self._bindElementEvents(self,f, ele, o);
				var templateWrapper = f.templateWrapper;
				templateWrapper.css({ 'float':'left',left:'0px',top:'0px',width:'auto',height:'auto'});
				f.contentWidth = templateWrapper.width();
				f.contentHeight = templateWrapper.height();
				templateWrapper.css('float','');
				self._setRounder(self, ele);
				self._setInnerElementsSize(f, ele);
				self._testScroll(self, f, o);
				self._initScrollBars(self, f, o);
				self._initScrollButtons(self, f, o);
				self._trigger('painted');
				
				self._paintedMark = {date: new Date(), mainWidth:ele[0].offsetWidth, mainHeight:ele[0].offsetHeight, width: f.contentWidth,height: f.contentWidth};
				if (focused!=undefined){
					$(focused).focus();
				}
				return true;
			}
			return false;
		},
		
		_resetLargeChange: function (self,f,o){
			if (self._autoVLarge) {
				o.vScroller.scrollLargeChange = null;
			}
			if (self._autoHLarge) {
				o.hScroller.scrollLargeChange = null;
			}
			f.vTrackLen = undefined;
			f.hTrackLen = undefined;
			if (f.vbarContainer){
				f.vbarContainer.remove();
				f.vbarContainer = undefined;
			}
			if (f.hbarContainer){
				f.hbarContainer.remove();
				f.hbarContainer = undefined;
			}
		},
		
		_initialize: function(f,ele,self){
			f.initialized = true;
			// ensure width and height
			ele.addClass(uiSuperPanelClasses);
			f.oldHeight = ele.css('height');
				var old = ele.css('overflow');
				ele.css('overflow','');
				// set height to element
				ele.height(ele.height());
				ele.css('overflow',old);
			
			self._createAdditionalDom(self,f,ele);
		},
		
		getContentElement: function(){
			/// <summary>
			/// Gets the content element of wijsuperpanel.
			/// </summary>
			/// <returns type="JQueryObj" />

			return this._fields().templateWrapper;
		},
		
		_setButtonPosition: function (self,o, scroller, dir, target,f,state){
			var h = dir == 'h';
			var mouseoverkey = 'mouseover.' + self.widgetName;
			var decKey = h?'buttonLeft':'buttonTop';
			var incKey = h?'buttonRight':'buttonBottom';
			var decButton = f[decKey];
			var incButton = f[incKey];
			if (self._hasMode(scroller, 'buttons') || self._hasMode(scroller, 'buttonshover')) {
				
				var html = h ? hButtons: vButtons;
				if (decButton == undefined){
					var buttons = $(html).appendTo(state);
					buttons.bind(mouseoverkey, self, self._scrollButtonMouseOver);
					f[decKey] = decButton = state.children(h? '.ui-wijsuperpanel-buttonleft':'.ui-wijsuperpanel-buttontop');
					f[incKey] = incButton = state.children(h?'.ui-wijsuperpanel-buttonright':'.ui-wijsuperpanel-buttonbottom');
				}
				var defaultPosition = {
					my: h? 'left' : 'top',
					of: target,
					at: h? 'left' : 'top'
				};
				$.extend(defaultPosition, scroller.decreaseButtonPosition);
				decButton.position(defaultPosition);
				defaultPosition = {
					my: h? 'right' : 'bottom',
					of: target,
					at: h? 'right' : 'bottom'
				};
				$.extend(defaultPosition, scroller.increaseButtonPosition);
				incButton.position(defaultPosition);
			}
			else if (decButton != undefined){
				decButton.remove();
				incButton.remove();
				f[decKey] = f[incKey] = undefined;
			}
		},
		
		_initScrollButtons: function(self, f, o){
			var a = f.contentWrapper;
			var state = f.stateContainer;
			self._setButtonPosition(self, o, o.hScroller, 'h', a,f,state);
			self._setButtonPosition(self, o, o.vScroller, 'v', a,f,state);
		},
		
		_getVScrollBarSmallChange: function(){
			var o = this.options;
			if (o.vScroller.scrollSmallChange == null) {
				var va = this._getVScrollBarLargeChange();
				o.vScroller.scrollSmallChange = va / 2;
			}
			return o.vScroller.scrollSmallChange;
		},
		
		_getVScrollBarLargeChange: function(){
			return this._getLargeChange('v');
		},
		
		_getLargeChange: function (dir){
			var self = this;
			var o = self.options;
			var f = self._fields();
			var v = dir == 'v';
			var scroller = v ? o.vScroller: o.hScroller;
			var clientKey = v? 'clientHeight':'clientWidth';
			var offsetKey = v? 'contentHeight':'contentWidth';
			var autoKey = v? '_autoVLarge':'_autoHLarge';
			
			if (scroller.scrollLargeChange != null) {
				return scroller.scrollLargeChange;
			}
			
			// calculate large change if empty
			var hMax = scroller.scrollMax;
			var hMin = scroller.scrollMin;
			var hRange = hMax - hMin;
			
			var content = f.contentWrapper;
			var contentWidth = content[0][clientKey];
			var wrapperWidth = f[offsetKey];
			
			var percent = contentWidth / (wrapperWidth - contentWidth);
			var large = ((hRange+1)*percent) / (1+ percent);
			if (isNaN(large)){
				large = 0;
			}
			scroller.scrollLargeChange = large;
			
			self[autoKey] = true;
			return scroller.scrollLargeChange;
		},
		
		_getHScrollBarSmallChange: function(){
			var o = this.options;
			if (o.hScroller.scrollSmallChange == null) {
				var va = this._getHScrollBarLargeChange();
				o.hScroller.scrollSmallChange = va / 2;
			}
			return o.hScroller.scrollSmallChange;
		},
		
		_getHScrollBarLargeChange: function(){
			return this._getLargeChange('h');
		},
		
		_initScrollBars: function(self,f,o){
			// Set scroll bar initial position.
			var hScroller = o.hScroller; 
			var hMax = hScroller.scrollMax;
			var hMin = hScroller.scrollMin;
			var hRange = hMax - hMin;
			
			var vScroller = o.vScroller; 
			var vMax = vScroller.scrollMax;
			var vMin = vScroller.scrollMin;
			var vRange = vMax - vMin;
			
			var hbarDrag = f.hbarDrag;
			var vbarDrag = f.vbarDrag;
			if (self.hNeedScrollBar && hbarDrag.is(":visible")) {
				var hLargeChange = self._getHScrollBarLargeChange();
				var track = self._getTrackLen('h');
				var dragLen = self._getDragLength(hRange, hLargeChange, track, o.hScroller.scrollMinDragLength);
				hbarDrag.width(dragLen);
				var difference = hbarDrag.outerWidth() - hbarDrag.width();
				hbarDrag.width( dragLen - difference );
				var icon  = hbarDrag.children('span');
				icon.css('margin-left',(hbarDrag.width() - icon[0].offsetWidth) /2);
				if (track <= hbarDrag.outerWidth()) {
					hbarDrag.hide();
				}
				else {
					hbarDrag.show();
				}
			}
			if (self.vNeedScrollBar && vbarDrag.is(":visible")) {
				var vLargeChange = self._getVScrollBarLargeChange();
				var track1 = self._getTrackLen('v');
				var dragLen1 = self._getDragLength(vRange, vLargeChange, track1, o.vScroller.scrollMinDragLength);
				vbarDrag.height(dragLen1);
				var difference1 = vbarDrag.outerHeight() - vbarDrag.height();
				vbarDrag.height( dragLen1 - difference1 );
				var icon1  = vbarDrag.children('span');
				icon1.css('margin-top',(vbarDrag.height() - icon1[0].offsetHeight) /2);
				if (track1 <= vbarDrag.outerHeight()){
					vbarDrag.hide();
				}
				else {
					vbarDrag.show();
				}
			}
			self._setDragAndContentPosition(false, false, 'both');
		},
		
		_getTrackLen: function(dir){
			// Get the length of the track.
			// <param name="dir" type="String">
			// Options are: 'v' and 'h'.
			// 'v' - Vertical scroll track.
			// 'h' - Horizontal scroll track.
			// </param>
			
			var self = this;
			var f = self._fields();
			//var o = self.options;
			var key = dir + 'TrackLen';
			if (f[key]!=undefined){
				return f[key]; 
			}
			
			var hbarContainer = f.hbarContainer;
			var vbarContainer = f.vbarContainer;
			var track = 0;
			var padding = 0;
			if (dir == 'h') {
				padding = self._getScrollContainerPadding('h');
				track = hbarContainer.innerWidth();
			}
			if (dir == 'v') {
				padding = self._getScrollContainerPadding('v');
				track = vbarContainer.innerHeight();
			}
			f[key] = (track - padding)
			return f[key];
		},
		
		_getScrollContainerPadding: function(paddingType){
			// Get the padding of the scroll bar container.
			var self = this;
			var f = self._fields();
			var padding = 0;
			if (paddingType == 'h') {
				padding = self._getScrollContainerPadding('left') + self._getScrollContainerPadding('right');
			}
			else if (paddingType == 'v') {
				padding = self._getScrollContainerPadding('top') + self._getScrollContainerPadding('bottom');
			}
			else {
				var container;
				if (paddingType == 'left' || paddingType=='right'){
					container = f.hbarContainer;
				}
				else{
					container = f.vbarContainer;
				}
				var key = paddingType + 'Padding';
				if (f[key] != undefined){
					padding = f[key];
					return padding;
				}
				padding = parseFloat(container.css('padding-'+ paddingType ).replace('px', ''));
				f[key] = padding;
			}
			return padding;
		},
		
		_contentDragAnimate: function (dir,animated,hbarContainer,hbarDrag, stop,fireScrollEvent, dragging){
			var self = this;
			var o = self.options;
			var v = dir == 'v';
			var scroller = v? o.vScroller: o.hScroller;
			var tempKey = v? 'outerHeight' : 'outerWidth';
			var wrapKey = v? 'innerHeight' : 'innerWidth';
			var contentKey = v? "contentHeight" : "contentWidth";
			var paddingKey = v?'top': 'left';
			var hMin = scroller.scrollMin;
			var hMax = scroller.scrollMax;
			var hRange = hMax - hMin;
			var hValue = scroller.scrollValue==undefined? hMin : (scroller.scrollValue - hMin);
			var hLargeChange = self._getLargeChange(dir);
			var max = hRange - hLargeChange + 1;
			var f = self._fields();
			var cWrapper = f.contentWrapper;
			var tempWrapper = f.templateWrapper;

			if (hValue > max) {
				hValue = max;
			}
			var contentLeft = (f[contentKey] - cWrapper[wrapKey]()) * (hValue / max);
			if (Math.abs(contentLeft) < 0.001) {
				contentLeft = 0;
			}
			contentLeft = Math.round(contentLeft);
			var dragleft = -1;
			if (hbarContainer!= undefined){
				if (animated && hbarDrag.is(':animated') && stop != 'nonestop') {
					hbarDrag.stop(true, false);
				}
				var track = self._getTrackLen(dir);
				var drag = hbarDrag[tempKey]();
				var r = track - drag;
				var padding = self._getScrollContainerPadding(paddingKey);
				dragleft = (hValue / max) * r + padding;
			}
			if (animated && o.animationOptions !=null) {
				if (dragleft>=0 && dragging !== "dragging"){
					var dragAnimationOptions = $.extend({}, o.animationOptions);
					// not trigger scrolled when stop
					dragAnimationOptions.complete = undefined;
					var properties = v ? { top: dragleft}  : { left: dragleft};
					hbarDrag.animate(properties, dragAnimationOptions);
				}
				var contentAnimationOptions = $.extend({}, o.animationOptions);
				var userComplete = o.animationOptions.complete;
				contentAnimationOptions.complete = function(){
					self._scrollEnd(fireScrollEvent, self, dir);
					if ($.isFunction(userComplete)) {
						userComplete(arguments);
					}
                    
				};
				if (animated && tempWrapper.is(':animated') && stop != 'nonestop') {
					tempWrapper.stop(true, false);
				}
				var properties1 = v ? { top: -contentLeft}  : { left: -contentLeft};
				tempWrapper.animate(properties1, contentAnimationOptions);
			}
			else {
				var key = v ? 'top' : 'left';
				if (dragleft >=0 && dragging !== "dragging") {
					
					hbarDrag[0].style[key] = dragleft + 'px';
				}
				tempWrapper[0].style[key] = -contentLeft + 'px';
				self._scrollEnd(fireScrollEvent, self, dir);
			}
		},
		
		_setDragAndContentPosition: function(fireScrollEvent, animated, dir, stop, dragging){
			var self = this;
			var f = self._fields();
			var hbarContainer = f.hbarContainer;
			var hbarDrag = f.hbarDrag;
			var vbarContainer = f.vbarContainer;
			var vbarDrag = f.vbarDrag;
			if ((dir == 'both' || dir == 'h') && f.hScrolling) {
				self._contentDragAnimate('h',animated,hbarContainer,hbarDrag,stop,fireScrollEvent,dragging);
			}
			if ((dir == 'both' || dir == 'v') && f.vScrolling) {
				self._contentDragAnimate('v',animated,vbarContainer,vbarDrag,stop,fireScrollEvent,dragging);
			}
			if (f.intervalID>0){
				window.clearInterval(f.intervalID);
			}
			f.intervalID = window.setInterval(function(){
				self._disableButtonIfNeeded(self);
			}, 500);
		},
		
		_scrolling: function(fireEvent, self, d){
			var r = true;
			
			if (fireEvent) {
				d.beforePosition  = self.getContentElement().position();
				self._beforePosition = d.beforePosition;
				r = self._trigger("scrolling", null, d);
			}
			return r;
		},
		
		_scrollEnd: function(fireEvent, self, dir){
			if (fireEvent) {
				// use settimeout to return to caller immediately.
				window.setTimeout(function (){
					var content = self.getContentElement();
					if (!content.is(":visible")){
						return;
					}
					var after = self.getContentElement().position();
					var d = {
						dir: dir,
						beforePosition: self._beforePosition,
						afterPosition: after
					}
					self._trigger("scrolled", null, d);
				},0);
			}
		},
		
		_getDragLength: function(range, largeChange, track, min){
			var divide = range / largeChange;
			var dragLength = track / divide;
			var minidrag = min;
			if (dragLength < minidrag || (dragLength + 2) >= track) {
				dragLength = minidrag;
			}
			return Math.round(dragLength);
		},
		
		_needScrollbar: function (scroller, needscroll){
			var scrollbarMode = this._hasMode(scroller, 'scrollbar');
			var barVisibility = scroller.scrollBarVisibility;
			var needScrollBar = scrollbarMode && (barVisibility == 'visible' || (barVisibility == 'auto' && needscroll));
			return needScrollBar;
		},
		
		_bindBarEvent: function (barContainer, barDrag, dir){
			var self = this;
			barContainer.bind('mouseover.' + self.widgetName, self, self._scrollerMouseOver);
			barDrag.draggable({
				axis: dir == 'h' ? 'x': 'y',
				drag: function(e){
					self._dragging(e, self);
				},
				containment: 'parent',
				stop: function(e){
					self._dragStop(e, self, dir);
					$(e.target).removeClass('ui-state-active');
				}
			});
		},
		
		_createBarIfNeeded: function (hNeedScrollBar, scrollerWrapper, dir,html, content ){
			if (hNeedScrollBar) {
				var self = this;
				var f = self._fields();
				var strBarContainer = dir + 'barContainer';
				var strBarDrag = dir + 'barDrag';
				var hbar = dir == 'h';
				var contentLength = content[0][hbar? 'clientHeight':'clientWidth'];
				var c = f[strBarContainer] = $(html);
				scrollerWrapper.append(c);
				var targetBarLen = c[0][hbar?'offsetHeight':'offsetWidth'];
				var d = f[strBarDrag] = c.find('.'+scrollerHandle);
				self._bindBarEvent(c, d, dir);
				
				content[hbar?'height':'width'](contentLength - targetBarLen);
			}
		},
		
		_setScrollbarPosition: function (wrapper, self, content, 
					targetBarContainer, referBarContainer,
					targetNeedScrollBar, referNeedScrollBar, 
					targetScrollBarPosition, referScrollBarPosition,  dir, scrollingNeed){
			var hbar = dir == 'h';
			if (targetNeedScrollBar) {
				var targetBarLen = targetBarContainer[0][hbar?'offsetHeight':'offsetWidth'];
				var targetPadding = self._getScrollContainerPadding(dir);
				var targetBarPosition = hbar ? 'top' :'left';
				var barPosition1 = hbar ? {top: '0px',bottom: 'auto',left: 'auto',right: 'auto'} : {left: '0px',right: 'auto',top: 'auto',bottom: 'auto'};
				var contentPosition1 = hbar ? {top: targetBarLen + 'px'} : {left: targetBarLen + 'px'};
				
				var barPosition2 = hbar ? {top: 'auto',right: 'auto',left: 'auto',bottom: '0px'} : {left: 'auto',right: '0px',top: 'auto',bottom: 'auto'};
				var contentPosition2 = hbar ? {top: ''} : {left: ''};
				//var contentLength = content[0][hbar? 'clientHeight':'clientWidth'];
				var contentLength2 = content[0][hbar? 'clientWidth':'clientHeight'];
				if (targetScrollBarPosition == targetBarPosition) {
					targetBarContainer.css(barPosition1);
					content.css(contentPosition1);
					if (hbar){
						targetBarContainer.children('.ui-wijsuperpanel-hbar-buttonleft').removeClass('ui-corner-bl').addClass('ui-corner-tl');
						targetBarContainer.children('.ui-wijsuperpanel-hbar-buttonright').removeClass('ui-corner-br').addClass('ui-corner-tr');
						targetBarContainer.removeClass('ui-corner-bottom').addClass('ui-corner-top');
					}
					else{
						targetBarContainer.children('.ui-wijsuperpanel-vbar-buttontop').removeClass('ui-corner-tr').addClass('ui-corner-tl');
						targetBarContainer.children('.ui-wijsuperpanel-vbar-buttonbottom').removeClass('ui-corner-br').addClass('ui-corner-bl');
						targetBarContainer.removeClass('ui-corner-right').addClass('ui-corner-left');
					}
				}
				else {
					targetBarContainer.css(barPosition2);
					content.css(contentPosition2);
					if (hbar){
						targetBarContainer.children('.ui-wijsuperpanel-hbar-buttonleft').removeClass('ui-corner-tl').addClass('ui-corner-bl');
						targetBarContainer.children('.ui-wijsuperpanel-hbar-buttonright').removeClass('ui-corner-bl').addClass('ui-corner-br');
						targetBarContainer.removeClass('ui-corner-top').addClass('ui-corner-bottom');
					}
					else{
						targetBarContainer.children('.ui-wijsuperpanel-vbar-buttontop').removeClass('ui-corner-tl').addClass('ui-corner-tr');
						targetBarContainer.children('.ui-wijsuperpanel-vbar-buttonbottom').removeClass('ui-corner-bl').addClass('ui-corner-br');
						targetBarContainer.removeClass('ui-corner-left').addClass('ui-corner-right');
					}
				}
				//content[hbar?'height':'width'](contentLength - targetBarLen);
				var referBarWidth = 0;
				if (referNeedScrollBar) {
					referBarWidth = referBarContainer[0][hbar?'offsetWidth':'offsetHeight'];
					if (referScrollBarPosition == 'left'){
						targetBarContainer.css('right','0px');
					}
					else if (referScrollBarPosition == 'right'){
						targetBarContainer.css('left','0px');
					}
					else if (referScrollBarPosition == 'top'){
						targetBarContainer.css('bottom','0px');
					}
					else if (referScrollBarPosition == 'bottom'){
						targetBarContainer.css('top','0px');
					}
				}
				if (!hbar/*vbar*/ && referNeedScrollBar) {
					referBarWidth = 0;
				}
				
				targetBarContainer[hbar?'width':'height'](contentLength2 - targetPadding);
				self._enableDisableScrollBar(dir, targetBarContainer, !scrollingNeed);
			}
			else {
				wrapper.css(hbar?'left':'top', '');
			}
		},
		
		_testScroll: function(self,f, o){
			var wrapper = f.templateWrapper;
			var content = f.contentWrapper;
			var scrollerWrapper = f.stateContainer;
			var contentWidth = content.innerWidth();
			var contentHeight = content.innerHeight();
			var wrapperWidth = f.contentWidth;
			var wrapperHeight = f.contentHeight;
			f.hScrolling = wrapperWidth > contentWidth;
			f.vScrolling = wrapperHeight > contentHeight;
			
			var hNeedScrollBar = self.hNeedScrollBar = self._needScrollbar(o.hScroller,f.hScrolling);
			self._createBarIfNeeded(self.hNeedScrollBar,scrollerWrapper, 'h' , hbarHtml, content);
			// having h scroll bar, but no vscroll bar, we need to test vscrolling again.
			if (hNeedScrollBar && !f.vScrolling){
				f.vScrolling = wrapper[0].offsetHeight > (contentHeight - f.hbarContainer[0].offsetHeight);
			}
			
			var vNeedScrollBar = self.vNeedScrollBar = self._needScrollbar(o.vScroller,f.vScrolling);
			self._createBarIfNeeded(self.vNeedScrollBar,scrollerWrapper, 'v', vbarHtml, content);

			if (vNeedScrollBar&& !f.hScrolling) {
				f.hScrolling = wrapper[0].offsetWidth > (contentWidth - f.vbarContainer[0].offsetWidth);
				if (f.hScrolling){
					hNeedScrollBar =self.hNeedScrollBar = self._needScrollbar(o.hScroller,f.hScrolling);
					self._createBarIfNeeded(self.hNeedScrollBar,scrollerWrapper, 'h' , hbarHtml, content);
				}
			}

			var hbarContainer = f.hbarContainer;
			var vbarContainer = f.vbarContainer;
			var hbarPosition = o.hScroller.scrollBarPosition;
			var vbarPosition = o.vScroller.scrollBarPosition;

			self._setScrollbarPosition(wrapper, self, content, hbarContainer, 
			vbarContainer, hNeedScrollBar, vNeedScrollBar,hbarPosition, 
			vbarPosition, 'h', f.hScrolling);
			self._setScrollbarPosition(wrapper, self, content, vbarContainer, 
			hbarContainer, vNeedScrollBar, hNeedScrollBar,vbarPosition, 
			hbarPosition, 'v', f.vScrolling);
		},
		
		_enableDisableScrollBar: function(bar, barContainer, disable){
			// Disables scroll bar.
			// <param name="bar" type="String">
			// Scrollbar to disable. 
			// Options are: 'h' and 'v'
			// </param>
			// <param name="barContainer" type="jQuery">
			// The scroll bar container jQuery object.
			// </param>
			// <param name="disable" type="Boolean">
			// Whether to disable scroll bar.
			// </param>

			if (bar === 'v') {
				barContainer[disable ? "addClass" : "removeClass"]('ui-wijsuperpanel-vbarcontainer-disabled');
				barContainer.find('.'+uiStateDefault)[disable ? "addClass" : "removeClass"](uiStateDisabled);
			}
			else if (bar === 'h') {
				barContainer[disable ? "addClass" : "removeClass"]('ui-wijsuperpanel-hbarcontainer-disabled');
				barContainer.find('.'+uiStateDefault)[disable ? "addClass" : "removeClass"](uiStateDisabled);
			}
			barContainer.children('.'+scrollerHandle)[disable ? 'hide' : 'show']();
		},
		
		_initResizer: function(){
			// Initialize reseizer of wijsuperpanel.
			
			var self = this;
			var o = self.options;
			var f = self._fields();
			var resizer = f.resizer;
			
			if (resizer == null && o.allowResize) {
				var resizableOptions = o.resizableOptions;
				var oldstop = resizableOptions.stop;
				resizableOptions.stop = function(e){
					self._resizeStop(e, self);
					if ($.isFunction(oldstop)) {
						oldstop(e)
					}
				}
				f.resizer = resizer = self.element.resizable(resizableOptions);
			}
			if (!o.allowResize && f.resizer != null) {
				resizer.resizable('destroy');
				f.resizer = null;
			}
		},
		
		_resizeStop: function(e, self){
			// give the chance to autoRefresh polling to repaint.
			if (!this.options.autoRefresh){
				self.paintPanel();
			}
			self._trigger("resized");
		},
		
		_createAdditionalDom: function(self, f, ele){

			// make sure the key pressing event work in FireFox.
			if (!ele.attr('tabindex')) {
				ele.attr('tabindex', '-1');
				f.tabindex = true;
			}
			var stateContainer = f.stateContainer = $(innerElementHtml);
			// move child element to content wrapper div of wijsuperpanel.
			f.contentWrapper = stateContainer.children();
			var templateW = f.templateWrapper = f.contentWrapper.children();
			ele.contents().each(function(index, el){
				var jel = $(el);
				if (jel.hasClass('ui-wijsuperpanel-header')){
					f.header = jel;
					return;
				}
				if (jel.hasClass('ui-wijsuperpanel-footer')){
					f.footer = jel;
					return;
				}
				templateW[0].appendChild(el);
			});
			
			// apeend header to first element.
			if (f.header != undefined){
				ele.prepend(f.header);
			}
			ele[0].appendChild(stateContainer[0]);
			// apeend footer to first element.
			if (f.footer != undefined){
				f.footer.insertAfter(stateContainer);
			}
		},
		
		_setRounder: function(self, ele){
			if (this.options.showRounder) {
				ele.addClass(rounderClass);
				if (self._rounderAdded){
					return;
				}
				if ($.browser.msie) {
					return;
				}
				var key1 = key = ''; 
				
				if ($.browser.webkit){
					key = 'WebkitBorderTopLeftRadius';
					key1 = 'WebkitBorderRadius';
				}
				else if ($.browser.mozilla){
					key = 'MozBorderRadiusBottomleft';
					key1 = 'MozBorderRadius';
				}
				else{
					key = 'border-top-left-radius';
					key1 = 'border-radius';
				}
				var value = ele.css(key)
				var border = parseInt(value);
				// adding 1 extra to out-most radius.
				
				ele.css(key1,border +1);
				self._rounderAdded = true;
				self._radiusKey = key1;
			}
			else {
				ele.removeClass(rounderClass);
			}
		},
		
		_setInnerElementsSize: function(f, ele){
			var state = f.stateContainer;
			var content = f.contentWrapper;
			var height = 0;
			if (f.header!=undefined){
				height += f.header.outerHeight();
			}
			if (f.footer!=undefined){
				height += f.footer.outerHeight();
			}
			
			var style = state[0].style;
			var clientHeight = ele[0].clientHeight - height;
			var clientWidth = ele[0].clientWidth;
			// hide element before setting width and height to improve javascript performance in FF3.
			style.display = 'none';
			style.height = clientHeight + 'px';
			style.width = clientWidth + 'px';
			var style2 = content[0].style;
			style2.height = clientHeight + 'px';
			style2.width = clientWidth + 'px';
			style.display = '';
		}
	});
})(jQuery);
