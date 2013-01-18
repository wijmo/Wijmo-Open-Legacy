/*globals window,document,jQuery*/
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
* * Wijmo Splitter widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*	jquery.ui.mouse.js
*	jquery.wijmo.wijutil.js
*
*/
(function ($) {
	"use strict";
	var splitterCssPrefix = "wijmo-wijsplitter-",
		wrapperCss = splitterCssPrefix + "wrapper",
		hSplitterCss = splitterCssPrefix + "horizontal",
		vSplitterCss = splitterCssPrefix + "vertical",
		hSplitterCssPrefix = splitterCssPrefix + "h-",
		vSplitterCssPrefix = splitterCssPrefix + "v-",
		contentCssSuffix = "-content",
	//pnl1Css = "panel1",
	//pnl2Css = "panel2",
		panelCss = {
			panel1: {
				n: "panel1",
				content: "panel1" + contentCssSuffix
			},
			panel2: {
				n: "panel2",
				content: "panel2" + contentCssSuffix
			}
		},
	//pnl1ContentCss = pnl1Css + contentCssSuffix,
	//pnl2ContentCss = pnl2Css + contentCssSuffix,
		barCss = "bar",
		expanderCss = "expander",
		widgetHeaderCss = "ui-widget-header",
		widgetContentCss = "ui-widget-content",
		stateDefaultCss = "ui-state-default",
		stateHoverCss = "ui-state-hover",
		stateActiveCss = "ui-state-active",
		cornerCssPrefix = "ui-corner-",
		iconCss = "ui-icon",
		arrowCssPrefix = "ui-icon-triangle-1-",
		collapsedCss = "collapsed",
		expandedCss = "expanded",
		resizeHelperCss = "resize-helper";

	$.widget("wijmo.wijsplitter", {
		options: {
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called at client side when dragging the splitter.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the sizing event:
			/// $("#element").wijsplitter({ sizing: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittersizing", function () { });
			/// </summary>
			sizing: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called at client side when finish dragging the splitter.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the sized event:
			/// $("#element").wijsplitter({ sized: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittersized", function () { });
			/// </summary>
			sized: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called before panel1 is expanded out.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the expand event:
			/// $("#element").wijsplitter({ expand: function () { return false; } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplitterexpand", function () { return false; });
			/// </summary>
			expand: null,
			/// <summary>
			/// Gets or sets the javascript function name that 
			/// would be called before panel1 is collapsed.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the collapse event:
			/// $("#element").wijsplitter({ collapse: function () { return false; } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittercollapse", function () { return false; });
			/// </summary>
			collapse: null,
			/// <summary>
			/// Gets or sets the javascript function name that would be called 
			/// when panel1 is expanded out by clicking the collapse/expand image.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the expanded event:
			/// $("#element").wijsplitter({ expanded: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplitterexpanded", function () { });
			/// </summary>
			expanded: null,
			/// <summary>
			/// Gets or sets the javascript function name that would be called 
			/// when panel1 is collapsed by clicking the collapse/expand image.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a callback function to handle the collapsed event:
			/// $("#element").wijsplitter({ collapsed: function () { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijsplittercollapsed", function () { });
			/// </summary>
			collapsed: null,
			/// <summary>
			/// A value indicates the z-index of Splitter bar.
			/// Default: -1.
			/// Type: Number.
			/// </summary>
			barZIndex: -1,
			/// <summary>
			/// A value determines whether the expander of Splitter
			/// is allowed to be shown.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showExpander: true,
			///	<summary>
			///	A value indicates the location of the splitter, in pixels,
			/// from the left or top edge of the splitter.
			/// Default: 100.
			/// Type: Number.
			///	</summary>
			splitterDistance: 100,
			///	<summary>
			///	A value indicating the horizontal or vertical orientation
			/// of the splitter panels.
			/// Default: 'vertical'.
			/// Type: String.
			///	</summary>
			orientation: 'vertical',
			///	<summary>
			///	A value that indicates whether or not the control is full of document. 
			/// Default: false.
			/// Type: Boolean.
			///	</summary>
			fullSplit: false,
			///	<summary>
			///	A value defines the animation while the bar of splitter 
			/// is beeing dragged.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			resizeSettings: {
				animationOptions: {
					///	<summary>
					///	Define how long (in milliseconds) the animation of 
					/// the sliding will run.
					/// Default: 100.
					/// Type: Number.
					///	</summary>
					duration: 100,
					///	<summary>
					///	The easing that is applied to the animation.
					/// Default: 'swing'.
					/// Type: String.
					///	</summary>
					easing: "swing",
					///	<summary>
					///	A value that determines whether use the animation. 
					/// Default: false.
					/// Type: Boolean.
					///	</summary>
					disabled: false
				},
				///	<summary>
				///	A value that determines whether an outline of 
				/// the element is sized.
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				ghost: false
			},
			///	<summary>
			///	Defines the information for top or left panel of splitter.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			panel1: {
				///	<summary>
				///	Gets or sets the minimum distance in pixels when 
				/// resizing the splitter. 
				/// Default: 1.
				/// Type: Number.
				///	</summary>
				minSize: 1,
				///	<summary>
				///	A value determining whether splitter panel is 
				/// collapsed or expanded. 
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				collapsed: false,
				///	<summary>
				///	Gets or sets the type of scroll bars to display 
				/// for splitter panel.
				/// Default: 'auto'.
				/// Type: String.
				///	</summary>
				scrollBars: "auto"
			},
			///	<summary>
			///	Defines the information for bottom or right panel of splitter.
			/// Default: {}.
			/// Type: Object.
			///	</summary>
			panel2: {
				///	<summary>
				///	Gets or sets the minimum distance in pixels when 
				/// resizing the splitter.
				/// Default: 1.
				/// Type: Number.
				///	</summary>
				minSize: 1,
				///	<summary>
				///	Gets or sets a value determining whether splitter 
				/// panel is collapsed or expanded. 
				/// Default: false.
				/// Type: Boolean.
				///	</summary>
				collapsed: false,
				///	<summary>
				///	Gets or sets the type of scroll bars to display for splitter panel.
				/// Default: 'auto'.
				/// Type: String.
				///	</summary>
				scrollBars: "auto"
			},
			/// <summary>
			/// Specifies which panel should be collapsed after clicking the expander of splitter.
			/// Possible values are: "panel1" & "panel2".
			/// Default: "panel1".
			/// Type: String.
			/// </summary>
			collapsingPanel: "panel1"
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options, expander,
				oldValue = $.extend({}, o[key]);

			if (key === "fullSplit") {
				self._setFullSplit(value);
			} else if ($.isPlainObject(o[key])) {
				if (key === "panel1" &&
					value.collapsed !== undefined) {
					//if(value.collapsed) { o.panel2.collapsed = false; }
					self._setPanel1Collapsed(value.collapsed);
				} else if (key === "panel2" &&
					value.collapsed !== undefined) {
					//if(value.collapsed) { o.panel1.collapsed = false; }
					self._setPanel2Collapsed(value.collapsed);
				}
				o[key] = $.extend(true, o[key], value);

				return;
			}

			$.Widget.prototype._setOption.apply(self, arguments);

			if (oldValue !== value) {
				if (key === "orientation") {
					self.refresh();
				} else if (key === "collapsingPanel") {
					self.refresh();
				} else if (key === "fullSplit") {
					self.refresh(true, false);
				} else if (key === "splitterDistance") {
					self.refresh(false, false);
					self._trigger("sized");
				} else if (key === "showExpander") {
					expander = self._fields.expander;
					if (expander && expander.length) {
						expander.css("display", value ? "" : "none");
					}
				}
			}

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
		},

		_create: function () {
			var self = this,
				element = self.element,
				o = self.options;

			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

			self._fields = {
				width: element.width(),
				height: element.height()
			};

			if (o.fullSplit) {
				self._setFullSplit(true);
			}

			self._splitterify();
			self._updateElementsCss();
			self._updateElements();
			self._bindEvents();
			self._initResizer();

			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option

			//fixed bug 28059
			if (self.element.wijAddVisibilityObserver) {
				self.element.wijAddVisibilityObserver(function () {
					if (o.fullSplit) {
						//self.refresh();
						self._updateElements();
						self._initResizer();
					}
				}, "wijsplitter");
			}

			self._trigger("load", null, self);
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
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight(),
				css = {
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				};
			if ($.browser.msie) {
				$.extend(css, {
					"background-color":"#fff",
					opacity:0.1
				});
			}
			return $("<div></div>")
				.addClass("ui-disabled")
				.css(css);
		},

		destroy: function () {
			var self = this,
				element = self.element,
				fields = self._fields,
				wrapper = fields.wrapper,
				expander = fields.expander,
				bar = fields.bar,
				panel1 = fields.panel1,
				panel2 = fields.panel2,
				originalStyle = fields.originalStyle,
				widgetName = self.widgetName,
				oriPnl1Content = fields.oriPnl1Content,
				oriPnl2Content = fields.oriPnl2Content,
				oriPnl1ContentStyle = fields.oriPnl1ContentStyle,
				oriPnl2ContentStyle = fields.oriPnl2ContentStyle;

			if (panel1 && panel1.n.is(":ui-resizable")) {
				panel1.n.resizable('destroy');
			}

			if (oriPnl1Content) {
				oriPnl1Content.removeClass(vSplitterCssPrefix + panel1.contentCss +
				" " + hSplitterCssPrefix + panel1.contentCss +
				" " + widgetContentCss);

				if (oriPnl1ContentStyle === undefined) {
					oriPnl1Content.removeAttr("style");
				} else {
					oriPnl1Content.attr("style", oriPnl1ContentStyle);
				}

				oriPnl1Content.appendTo(element);
			}

			if (oriPnl2Content) {
				oriPnl2Content.removeClass(vSplitterCssPrefix + panel2.contentCss +
				" " + hSplitterCssPrefix + panel2.contentCss +
				" " + widgetContentCss);

				if (oriPnl2ContentStyle === undefined) {
					oriPnl2Content.removeAttr("style");
				} else {
					oriPnl2Content.attr("style", oriPnl2ContentStyle);
				}

				oriPnl2Content.appendTo(element);
			}

			panel1.n.unbind('.' + widgetName);
			expander.unbind('.' + widgetName);
			bar.unbind('.' + widgetName);
			$(window).unbind('.' + widgetName);

			wrapper.remove();
			element.removeClass(vSplitterCss + " " + hSplitterCss);

			if (originalStyle === undefined) {
				element.removeAttr("style");
			} else {
				element.attr("style", originalStyle);
			}

			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}

			self._fields = null;
		},

		refresh: function (size, state) {
			/// <summary>
			/// Forces the widget to recreate the splitter.
			/// </summary>
			/// <param name="size" type="Boolean">
			/// A boolean value to indicate whether the refresh is triggered
			/// because the size of widget is changed.
			/// </param>
			/// <param name="state" type="Boolean">
			/// A boolean value to indicate whether the refresh is triggered 
			/// because the state of expander is changed(expanded/collapsed).
			/// </param>
			var self = this,
				fields = self._fields,
				panel1 = fields.panel1;

			if (fields._isResizing) {
				return;
			}

			if (state || state === undefined) {
				self._updateElementsCss();
			}

			self._updateElements();

			if (size || size === undefined) {
				if (panel1 && panel1.n.is(":ui-resizable")) {
					panel1.n.resizable('destroy');
				}

				self._initResizer();
			}
		},

		_splitterify: function () {
			var self = this,
				element = self.element,
				o = self.options,
				fields = self._fields,
				wrapper, bar, expander, icon,
				pnl1 = { n: null, content: element.find(">div:eq(0)") },
				pnl2 = { n: null, content: element.find(">div:eq(1)") };

			fields.originalStyle = element.attr("style");

			//create wrapper
			wrapper = $("<div></div>").appendTo(element);

			//create panel1
			pnl1.n = $("<div></div>").appendTo(wrapper);

			//create panel1 content if needed.
			if (pnl1.content.length === 0) {
				pnl1.content = $("<div></div>");
			} else {
				fields.oriPnl1Content = pnl1.content;
				fields.oriPnl1ContentStyle = pnl1.content.attr("style");
			}

			pnl1.content.appendTo(pnl1.n);

			//create bar.
			bar = $("<div></div>").appendTo(wrapper);

			if (o.barZIndex !== -1) {
				bar.css("z-index", o.barZIndex);
			}

			//create expander.
			expander = $("<div></div>").appendTo(bar)
					.attr("role", "button");

			//create icon.
			icon = $("<span></span>").appendTo(expander);

			//create panel2
			pnl2.n = $("<div></div>").appendTo(wrapper);

			//create panel2 content if needed.
			if (pnl2.content.length === 0) {
				pnl2.content = $("<div></div>");
			} else {
				fields.oriPnl2Content = pnl2.content;
				fields.oriPnl2ContentStyle = pnl2.content.attr("style");
			}

			pnl2.content.appendTo(pnl2.n);

			fields.wrapper = wrapper;
			fields.panel1 = pnl1;
			fields.panel2 = pnl2;
			fields.bar = bar;
			fields.expander = expander;
			fields.icon = icon;
		},

		_updateElementsCss: function () {
			var self = this,
				element = self.element,
				o = self.options,
				isVertical = o.orientation === "vertical",
				fields = self._fields,
				wrapper = fields.wrapper,
				collapsingPanel = o.collapsingPanel,
				otherPanel = o.collapsingPanel === 'panel1' ? 'panel2' : 'panel1',
				bar = fields.bar,
				expander = fields.expander,
				icon = fields.icon;

			//add class to the outmost markup.
			//add comments by RyanWu@20110817.
			//For fixing the issue#16391.
			//			element.removeClass(vSplitterCss + " " + hSplitterCss +
			//				" " + vSplitterCssPrefix + expandedCss +
			//				" " + vSplitterCssPrefix + collapsedCss +
			//				" " + hSplitterCssPrefix + expandedCss +
			//				" " + hSplitterCssPrefix + collapsedCss)
			//				.addClass(isVertical ? vSplitterCss : hSplitterCss);
			element.removeClass(vSplitterCss + " " + hSplitterCss)
				.addClass(isVertical ? vSplitterCss : hSplitterCss);
			//end by RyanWu@20110817.

			//add class to wrapper
			wrapper.attr("class", wrapperCss);

			//add class to panel1
			fields[collapsingPanel].n.removeClass(
					vSplitterCssPrefix + panelCss[collapsingPanel].n + " " +
					hSplitterCssPrefix + panelCss[collapsingPanel].n)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + panelCss[collapsingPanel].n);

			//add class to panel1 content.
			fields[collapsingPanel].content.removeClass(
					vSplitterCssPrefix + panelCss[collapsingPanel].content + " " +
					hSplitterCssPrefix + panelCss[collapsingPanel].content + " " +
					widgetContentCss)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + panelCss[collapsingPanel].content + " " + widgetContentCss);


			//add class to bar.
			bar.attr("class", (isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + barCss + " " + widgetHeaderCss)
				.css("width", "").css("height", "");

			//add class to expander.
			expander.attr("class", cornerCssPrefix + (isVertical ?
					"bl " + vSplitterCssPrefix : "tr " + hSplitterCssPrefix) +
					expanderCss + " " + stateDefaultCss)
				.css("left", "").css("top", "");

			//add class to icon.
			icon.attr("class", iconCss + " " + arrowCssPrefix +
					(isVertical ? "w" : "n"));

			//add class to panel2
			fields[otherPanel].n.removeClass(
					vSplitterCssPrefix + panelCss[otherPanel].n + " " +
					hSplitterCssPrefix + panelCss[otherPanel].n)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + panelCss[otherPanel].n);

			//add class to panel2 content.
			fields[otherPanel].content.removeClass(
					vSplitterCssPrefix + panelCss[otherPanel].content + " " +
					hSplitterCssPrefix + panelCss[otherPanel].content + " " +
					widgetContentCss)
				.addClass((isVertical ? vSplitterCssPrefix :
					hSplitterCssPrefix) + panelCss[otherPanel].content + " " +
					widgetContentCss);

			// if panel1.collapsed = true, then we need update 
			// the expander icon's css.
			self._updateExpanderCss();
		},

		_updateExpanderCss: function () {
			var self = this,
				o = self.options,
			//element = self.element,
				fields = self._fields,
				expander = fields.expander,
				icon = fields.icon,
				isVertical = o.orientation === "vertical",
				panel2IsCollapsing = o.collapsingPanel !== "panel1",
				cssPrefix = isVertical ? vSplitterCssPrefix : hSplitterCssPrefix,
				collapsedExpCorner1Css = ["bl", "tr", "tr", "bl"][isVertical * 2 + panel2IsCollapsing],
				collapsedExpCorner2Css = ["br", "tl"][+panel2IsCollapsing],
				collapsedIconCss = ["s", "n", "e", "w"][isVertical * 2 + panel2IsCollapsing],
				expandedExpCorner1Css = ["tr", "bl", "bl", "tr"][isVertical * 2 + panel2IsCollapsing],
				expandedExpCorner2Css = ["tl", "br"][+panel2IsCollapsing],
				expandedIconCss = ["n", "s", "w", "e"][isVertical * 2 + panel2IsCollapsing];

			expander.removeClass(cssPrefix + o.collapsingPanel + "-" + expandedCss +
				" " + cssPrefix + o.collapsingPanel + "-" + collapsedCss +
				" " + cornerCssPrefix + collapsedExpCorner1Css +
				" " + cornerCssPrefix + collapsedExpCorner2Css +
				" " + cornerCssPrefix + expandedExpCorner1Css +
				" " + cornerCssPrefix + expandedExpCorner2Css);

			icon.removeClass(arrowCssPrefix + collapsedIconCss +
				" " + arrowCssPrefix + expandedIconCss);

			if (o.panel1.collapsed || o.panel2.collapsed) {
				//element.addClass(cssPrefix + collapsedCss);
				expander.addClass(cornerCssPrefix + collapsedExpCorner1Css +
					" " + cornerCssPrefix + collapsedExpCorner2Css +
					" " + cssPrefix + o.collapsingPanel + "-" + collapsedCss);
				icon.addClass(arrowCssPrefix + collapsedIconCss);
			} else {
				//element.addClass(cssPrefix + expandedCss);
				expander.addClass(cornerCssPrefix + expandedExpCorner1Css +
					" " + cornerCssPrefix + expandedExpCorner2Css +
					" " + cssPrefix + o.collapsingPanel + "-" + expandedCss);
				icon.addClass(arrowCssPrefix + expandedIconCss);
			}
		},

		_updateElements: function () {
			var self = this,
				element = self.element,
				o = self.options,
				distance = o.splitterDistance,
				collapsingPanel = o.collapsingPanel,
				otherPanel = o.collapsingPanel === 'panel1' ? 'panel2' : 'panel1', fields = self._fields,
				wrapper = fields.wrapper,
				pnl1 = fields.panel1,
				pnl2 = fields.panel2,
				bar = fields.bar,
				expander = fields.expander,
				width = element.width(),
				height = element.height(),
				barW, barH;

			wrapper.height(height);
			self._setPanelsScrollMode();

			if (o.orientation === "vertical") {
				barW = bar.outerWidth(true);

				if (distance > width - barW) {
					distance = width - barW;
				}

				//fixed bug 29981
				//To prevent panel2 be a new line by the css "float:left"
				wrapper.width(width * 2);

				if (o.panel1.collapsed) {
					if (collapsingPanel === "panel1") {
						expander.addClass(vSplitterCssPrefix + "panel1" + "-" + collapsedCss);
					}
					fields.panel1.n.css("display", "none");
					fields.panel2.n.css("display", "");
					distance = 0;
				} else {
					if (collapsingPanel === "panel1") {
						expander.addClass(vSplitterCssPrefix + "panel1" + "-" + expandedCss);
					}
					fields.panel1.n.css("display", "");
					fields.panel2.n.css("display", o.panel2.collapsed ? "none" : "");
				}

				if (o.panel2.collapsed) {
					if (collapsingPanel === "panel2") {
						expander.addClass(vSplitterCssPrefix + "panel2" + "-" + collapsedCss);
					}
					fields.panel2.n.css("display", "none");
					distance = (collapsingPanel === "panel1") ?
							width - barW : width;
				} else {
					if (collapsingPanel === "panel2") {
						expander.addClass(vSplitterCssPrefix + "panel2" + "-" + expandedCss);
					}
					fields.panel2.n.css("display", "");
				}

				if (!o.panel1.collapsed && !o.panel2.collapsed) {
					expander.addClass(vSplitterCssPrefix + o.collapsingPanel + "-" + expandedCss);
				}

				if (collapsingPanel === "panel1") {
					fields.panel1.n.height(height).width(distance);
					fields.panel2.n.height(height).width(width - distance - barW);
				} else {
					fields.panel1.n.height(height).width(distance - barW);
					fields.panel2.n.height(height).width(width - distance);
					fields.panel2.content.width(width - distance);
				}

				fields.panel1.content.outerHeight(height, true);
				bar.outerHeight(height, true);
				fields.panel2.content.outerHeight(height, true);

				expander.css("cursor", "pointer")
					.css("top", height / 2 - expander.outerHeight(true) / 2);
			} else {
				barH = bar.outerHeight(true);

				if (distance > height - barH) {
					distance = height - barH;
				}

				if (o.panel1.collapsed) {
					if (collapsingPanel === "panel1") {
						expander.addClass(hSplitterCssPrefix + "panel1" + "-" + collapsedCss);
					}
					fields.panel1.n.css("display", "none");
					fields.panel2.n.css("display", "");
					distance = 0;
				} else {
					if (collapsingPanel === "panel1") {
						expander.addClass(hSplitterCssPrefix + "panel1" + "-" + expandedCss);
					}
					fields.panel1.n.css("display", "");
					fields.panel2.n.css("display", o.panel2.collapsed ? "none" : "");
				}

				if (o.panel2.collapsed) {
					if (collapsingPanel === "panel2") {
						expander.addClass(hSplitterCssPrefix + "panel2" + "-" + collapsedCss);
					}
					fields.panel2.n.css("display", "none");
					distance = (collapsingPanel === "panel1") ?
							height - barH : height;
				} else {
					if (collapsingPanel === "panel2") {
						expander.addClass(hSplitterCssPrefix + "panel2" + "-" + expandedCss);
					}
					fields.panel2.n.css("display", "");
				}

				if (collapsingPanel === "panel1") {
					fields.panel1.n.width(width).height(distance);
					fields.panel2.n.width(width).height(height - distance - barH);
					fields.panel1.content.outerHeight(distance, true);
					fields.panel2.content.outerHeight(height - distance - barH, true);
				} else {
					fields.panel1.n.width(width).height(distance - barH);
					fields.panel2.n.width(width).height(height - distance);
					fields.panel1.content.outerHeight(distance - barH, true);
					fields.panel2.content.outerHeight(height - distance, true);
				}

				expander.css("cursor", "pointer")
					.css("left", width / 2 - expander.outerWidth(true) / 2);
			}

			expander.css("display", o.showExpander ? "" : "none");
		},

		_setFullSplit: function (value) {
			var self = this,
				fields = self._fields,
				width = value ? "100%" : fields.width,
				height = value ? "100%" : fields.height;

			self.element.css("width", width).css("height", height);
		},

		_setPanel1Collapsed: function (collapsed, e) {
			var self = this,
				o = self.options,
				oldCollapsed = o.panel1.collapsed,
				resizableHandle = $(".ui-resizable-handle", self.element);

			if (oldCollapsed === collapsed) {
				return;
			}

			if (o.collapsingPanel === 'panel1') {
				if (!self._trigger(oldCollapsed ? "expand" : "collapse", e, null)) {
					return;
				}
			}

			o.panel1.collapsed = collapsed;

			if (collapsed) {
				o.panel2.collapsed = false;
				if (o.collapsingPanel === 'panel2')
					resizableHandle.hide();
			} else {
				resizableHandle.show();
			}

			self._updateElements();
			self._updateExpanderCss();

			if (o.collapsingPanel === 'panel1') {
				self._trigger(collapsed ? "collapsed" : "expanded", e, null);
			}
		},

		_setPanel2Collapsed: function (collapsed, e) {
			var self = this,
				o = self.options,
				oldCollapsed = o.panel2.collapsed,
				resizableHandle = $(".ui-resizable-handle", self.element);

			if (oldCollapsed === collapsed) {
				return;
			}

			if (o.collapsingPanel === 'panel2') {
				if (!self._trigger(oldCollapsed ? "expand" : "collapse", e, null)) {
					return;
				}
			}

			o.panel2.collapsed = collapsed;

			if (collapsed) {
				o.panel1.collapsed = false;
				if (o.collapsingPanel === 'panel1')
					resizableHandle.hide();
			} else {
				resizableHandle.show();
			}

			self._updateElements();
			self._updateExpanderCss();

			if (o.collapsingPanel === 'panel2') {
				self._trigger(collapsed ? "collapsed" : "expanded", e, null);
			}
		},

		_bindEvents: function () {
			var self = this,
				o = self.options,
				fields = self._fields,
				bar = fields.bar,
				expander = fields.expander,
				widgetName = self.widgetName;

			expander.bind("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.addClass(stateHoverCss);
			})
			.bind("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.removeClass(stateHoverCss).removeClass(stateActiveCss);
			})
			.bind("mousedown." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				expander.addClass(stateActiveCss);
			})
			.bind("mouseup." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}

				expander.removeClass(stateActiveCss);

				if (o.collapsingPanel === 'panel1') {
					self._setPanel1Collapsed(!o.panel1.collapsed, e);
				} else {
					self._setPanel2Collapsed(!o.panel2.collapsed, e);
				}
			});

			bar.bind("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.addClass(stateHoverCss);
			})
			.bind("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.removeClass(stateHoverCss);
			});

			fields.panel1.n.bind("animating." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				self._adjustLayout(self);
				self._trigger("sizing", e, null);
			})
			.bind("animated." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				self._adjustLayout(self);
				self._trigger("sized", e, null);
			});

			$(".ui-resizable-handle", self.element)
			.live("mouseover." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.addClass(stateHoverCss);
			})
			.live("mouseout." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				bar.removeClass(stateHoverCss);
			});

			$(window).bind("resize." + widgetName, function (e) {
				if (o.disabled) {
					return;
				}
				if (o.fullSplit && self.element.is(":visible")) {
					//self.refresh();
					self._updateElements();
					self._initResizer();
				}
			});
		},

		_initResizer: function () {
			var self = this,
				element = self.element,
				o = self.options,
				fields = self._fields,
				bar = fields.bar,
				collapsingPanel = o.collapsingPanel,
				otherPanel = o.collapsingPanel === 'panel1' ? 'panel2' : 'panel1',
				resizeSettings = o.resizeSettings,
				animation = resizeSettings.animationOptions,
				duration = animation.disabled ? 0 : animation.duration,
				width = element.width(),
				height = element.height(),
				barW, maxW, minW, barH, maxH, minH,
				resizableHandle;

			if (o.orientation === "vertical") {
				barW = bar.outerWidth(true);
				maxW = width - barW - o[otherPanel].minSize;
				minW = o[collapsingPanel].minSize;

				if (minW < 2) {
					minW = 2;
				}

				fields.panel1.n.resizable({
					wijanimate: true,
					minWidth: minW,
					maxWidth: maxW,
					handles: 'e',
					helper: vSplitterCssPrefix + resizeHelperCss,
					animateDuration: duration,
					animateEasing: animation.easing,
					ghost: resizeSettings.ghost,
					start: function () {
						fields._isResizing = true;
					},
					stop: function () {
						fields._isResizing = false;
					}
				});
			} else {
				barH = bar.outerHeight(true);
				maxH = height - barH - o[otherPanel].minSize;
				minH = o[collapsingPanel].minSize;

				if (minH < 2) {
					minH = 2;
				}

				fields.panel1.n.resizable({
					wijanimate: true,
					minHeight: minH,
					maxHeight: maxH,
					handles: 's',
					helper: hSplitterCssPrefix + resizeHelperCss,
					animateDuration: duration,
					animateEasing: animation.easing,
					ghost: resizeSettings.ghost,
					start: function () {
						fields._isResizing = true;
					},
					stop: function () {
						fields._isResizing = false;
					}
				});
			}

			resizableHandle = $(".ui-resizable-handle", element);
			if (o[otherPanel].collapsed) {
				resizableHandle.hide();
			} else {
				resizableHandle.show();
			}

			if ($.browser.msie && ($.browser.version < 7)) {
				if (o.orientation === "vertical") {
					resizableHandle.height(element.height());
				}
			}
		},

		_adjustLayout: function (self) {
			var o = self.options,
				fields = self._fields,
				panel1 = fields.panel1,
				distance = o.orientation === "vertical" ?
					panel1.n.width() : panel1.n.height();

			if (o.splitterDistance === distance) {
				return;
			}

			o.splitterDistance = distance;
			self._updateElements();
		},

		_setPanelsScrollMode: function () {
			var self = this,
				fields = self._fields,
				o = self.options,
				pnlScrollBars = [o.panel1.scrollBars, o.panel2.scrollBars];

			$.each([fields.panel1, fields.panel2], function (idx, pnl) {
				if (pnlScrollBars[idx] === "auto") {
					pnl.content.css("overflow", "auto");
				} else if (pnlScrollBars[idx] === "both") {
					pnl.content.css("overflow", "scroll");
				} else if (pnlScrollBars[idx] === "none") {
					pnl.content.css("overflow", "hidden");
				} else if (pnlScrollBars[idx] === "horizontal") {
					pnl.content.css("overflow-x", "scroll").css("overflow-y", "hidden");
				} else if (pnlScrollBars[idx] === "vertical") {
					pnl.content.css("overflow-x", "hidden").css("overflow-y", "scroll");
				}
			});
		}
		//end of Splitter implementations.
	});
} (jQuery));

(function ($) {
	"use strict";
	$.ui.plugin.add("resizable", "wijanimate", {
		stop: function (event, ui) {
			var self = $(this).data("resizable"),
				o = self.options,
				element = self.element,
				pr = self._proportionallyResizeElements,
				ista = pr.length && (/textarea/i).test(pr[0].nodeName),
				soffseth = ista && $.ui.hasScroll(pr[0], 'left') ?
							 0 : self.sizeDiff.height,
				soffsetw = ista ? 0 : self.sizeDiff.width,
				style, left, top;

			element.css("width", self.originalSize.width)
				.css("height", self.originalSize.height);

			style = { width: (self.size.width - soffsetw),
				height: (self.size.height - soffseth)
			};
			left = (parseInt(element.css('left'), 10) +
					(self.position.left - self.originalPosition.left)) || null;
			top = (parseInt(element.css('top'), 10) +
					(self.position.top - self.originalPosition.top)) || null;

			element.animate($.extend(style, top && left ? {
				top: top,
				left: left
			} : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function () {
					var data = {
						width: parseInt(element.css('width'), 10),
						height: parseInt(element.css('height'), 10),
						top: parseInt(element.css('top'), 10),
						left: parseInt(element.css('left'), 10)
					};

					if (pr && pr.length) {
						$(pr[0]).css({ width: data.width, height: data.height });
					}

					// propagating resize, and updating values for each animation step
					self._updateCache(data);
					self._propagate("resize", event);
					element.trigger("animating");
				},
				complete: function () {
					element.trigger("animated");
				}
			});
		}
	});
} (jQuery));
