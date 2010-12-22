/*globals window,document,jQuery*/
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
* * Wijmo Splitter widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.resizable.js
*  jquery.ui.mouse.js
*	jquery.ui.wijutil.js
*
*/
"use strict";
(function ($) {
    $.widget("wijmo.wijsplitter", {
        options: {
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
            /// Type: Dictionary.
            ///	</summary>
            resizeSettings: {
                ///	<summary>
                ///	Define how long (in milliseconds) the animation of 
                /// the sliding will run.
                /// Default: 100.
                /// Type: Number.
                ///	</summary>
                animationDuration: 100,
                ///	<summary>
                ///	The easing that is applied to the animation.
                /// Default: 'swing'.
                /// Type: String.
                ///	</summary>
                easing: "swing",
                ///	<summary>
                ///	A value that determines whether an outline of 
                /// the element is sized.
                /// Default: false.
                /// Type: Boolean.
                ///	</summary>
                ghost: false,
                ///	<summary>
                ///	A value that determines the movement span of incremental resizing. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                increment: 1
            },
            ///	<summary>
            ///	Defines the information for top or left panel of splitter.
            /// Default: {}.
            /// Type: Dictionary.
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
            /// Type: Dictionary.
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
            }
        },

        getOptionsCopy: function () {
            /// <summary>
            /// Gets Splitter options.
            /// </summary>
            return this.options;
        },

        setOption: function (key, value) {
            ///	<summary>
            ///		Sets Splitter options.
            ///	</summary>

            this.options[key] = value;
            return this;
        },

        _create: function () {
            ///	<summary>
            ///		Creates Splitter DOM elements and binds interactive events.
            ///	</summary>
            var eleh = this.element.height();
            this._setStructure();
            this._attachClass();
            this._checkFullSplitMode();
            this._initElements();
            this.refresh();
            //
            $(this.element).trigger("load");
            //
            this._bindEvents();
            this._initResizer();
            //             
            if (window.navigator.userAgent.indexOf('MSIE 6.0') > -1 ||
            window.navigator.userAgent.indexOf('MSIE 7.0') > -1) {
                if (this.options.orientation === "vertical") {                
                    $(".ui-resizable-handle", this.element)
                    .height(eleh);
                }
            }
        },

        destroy: function () {
            ///	<summary>
            ///		Destroy Splitter widget and reset the DOM element.
            ///	</summary>

            var self = this, expander, originalContent, originalStyle;

            if (self._getPanel1()) {
                if (self._getPanel1().is(":ui-wijresizable")) {
                    self._getPanel1().wijresizable('destroy');
                }
            }

            expander = this._getExpander();
            expander.unbind('.' + self.widgetName);
            $(window).unbind('.' + self.widgetName);

            //
            originalContent = this.element.data("originalContent");
            this.element.html(originalContent);
            originalStyle = this.element.data("originalStyle");
            this.element.removeAttr("class");

            if (originalStyle === undefined) {
                this.element.removeAttr("style");
            }
            else {
                this.element.attr("style", originalStyle);
            }
        },

        _setStructure: function () {
            var template1, template2, elems, container, panel1, 
            bar, panel2, content1, content2;
            elems = this.element.find("> div").get();
            if (elems.length === 1) {
                template1 = elems[0];
            }
            else if (elems.length >= 2) {
                template1 = elems[0];
                template2 = elems[1];
            }

            this.element.data("originalStyle", this.element.attr("style"));
            this.element.data("originalContent", this.element.html());
            container = $("<div class=\"wijmo-splitter-wrapper\"></div>");
            this.element.append(container);

            panel1 = $("<div></div>");
            container.append(panel1);
            if (template1) {
                panel1.append(template1);
            }
            else {
                content1 = $("<div></div>");
                panel1.append(content1);
            }

            bar = $("<div><div><span></span></div></div>");
            container.append(bar);

            panel2 = $("<div></div>");
            container.append(panel2);
            if (template2) {
                panel2.append(template2);
            }
            else {
                content2 = $("<div></div>");
                panel2.append(content2);
            }
        },

        _attachClass: function () {
            if (this.options.orientation === "vertical") {
                this.element.addClass("wijmo-wijsplitter-vertical");
                this._getPanel1().addClass("wijmo-wijsplitter-v-panel1");

                this._getPanel1Content()
                .addClass("wijmo-wijsplitter-v-panel1-content ui-widget-content");
                this._getBar().addClass("wijmo-wijsplitter-v-bar ui-widget-header");
                this._getExpander()
                .addClass("wijmo-wijsplitter-v-expander ui-state-default")
                .addClass("ui-corner-tl ui-corner-bl");
                this._getExpander().find("> span")
                .addClass("ui-icon ui-icon-arrowthickstop-1-w");
                this._getPanel2().addClass("wijmo-wijsplitter-v-panel2");

                this._getPanel2Content()
                .addClass("wijmo-wijsplitter-v-panel2-content ui-widget-content");
            }
            else {
                this.element.addClass("wijmo-wijsplitter-horizontal");
                this._getPanel1().addClass("wijmo-wijsplitter-h-panel1");

                this._getPanel1Content()
                .addClass("wijmo-wijsplitter-h-panel1-content ui-widget-content");
                this._getBar().addClass("wijmo-wijsplitter-h-bar ui-widget-header");
                this._getExpander()
                .addClass("wijmo-wijsplitter-h-expander ui-state-default")
                .addClass("ui-corner-tl ui-corner-tr");
                this._getExpander().find("> span")
                .addClass("ui-icon ui-icon-arrowthickstop-1-n");
                this._getPanel2().addClass("wijmo-wijsplitter-h-panel2");

                this._getPanel2Content()
                .addClass("wijmo-wijsplitter-h-panel2-content ui-widget-content");
            }
            //
            this._getExpander().attr("role", "button");
        },

        _getPanel1: function () {
            var panel1 = this.element.find("> div > div:eq(0)");
            return panel1;
        },

        _getPanel1Content: function () {
            var panel1content = this._getPanel1().find("> div:eq(0)");
            return panel1content;
        },

        _getBar: function () {
            var bar = this.element.find("> div > div:eq(1)");
            return bar;
        },

        _getExpander: function () {
            var expander = this._getBar().find("> div");
            return expander;
        },

        _getPanel2: function () {
            var panel2 = this.element.find("> div > div:eq(2)");
            return panel2;
        },

        _getPanel2Content: function () {
            var panel2content = this._getPanel2().find("> div:eq(0)");
            return panel2content;
        },

        _getContainer: function () {
            var container = this.element.find("> div");
            return container;
        },

        _initElements: function () {
            ///	<summary>
            ///	Invalidates the entire surface of the control 
            /// and causes the control to be redrawn.
            ///	</summary>
            var distance, eleW, eleH, barW, expanderH, bw1, 
            bh1, bh2, bw3, barH, expanderW;
            //this.element.css("overflow", "hidden");
            this._getContainer().height(this.element.height());

            this._setPanelsScrollMode();
            distance = this.options.splitterDistance;
            eleW = this.element.width();
            eleH = this.element.height();

            if (this.options.orientation === "vertical") {

                barW = this._getBar().outerWidth();

                if (distance > eleW - barW) {
                    distance = eleW - barW;
                }

                expanderH = this._getExpander().height();
                this._getContainer().width(eleW * 2);

                if (this.options.panel2.collapsed && !this.options.panel1.collapsed) {
                    distance = eleW - barW;
                }

                this._getPanel1().height(eleH);
                this._getPanel1().width(distance);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    bw1 = this._getPanel1Content().borderSize().width;
                    bh1 = this._getPanel1Content().borderSize().height;
                    this._getPanel1Content().css("float", "none")
                    .css("height", eleH - bh1)
                    .css("width", distance - bw1)
                    .css("float", "left");
                }
                else {

                    this._getPanel1Content().setOutHeight(eleH);
                    this._getPanel1Content().setOutWidth(distance);
                }
                if (this.options.panel1.collapsed) {
                    this.element.addClass("wijmo-wijsplitter-v-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("wijmo-wijsplitter-v-expanded");
                    this._getPanel1().css("display", "");
                }
                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    bh2 = this._getBar().borderSize().height;
                    this._getBar().css("float", "none")
                    .height(eleH - bh2)
                    .css("float", "left");
                }
                else {
                    this._getBar().setOutHeight(eleH);
                }

                this._getPanel2().height(eleH);
                this._getPanel2().width(eleW - distance - barW);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    bw3 = this._getPanel2Content().borderSize().width;
                    this._getPanel2Content().css("float", "none")
                    .height(eleH - bw3)
                    .width(eleW - distance - barW - bw3)
                    .css("float", "left");
                }
                else {

                    this._getPanel2Content().setOutHeight(eleH);
                    this._getPanel2Content().setOutWidth(eleW - distance - barW);
                }

                this._getExpander().css("cursor", "pointer");
                this._getExpander().css("top", eleH / 2 - expanderH / 2);

            }
            else {
                barH = this._getBar().outerHeight();

                if (distance > eleH - barH) {
                    distance = eleH - barH;
                }

                expanderW = this._getExpander().width();

                if (this.options.panel2.collapsed && !this.options.panel1.collapsed) {

                    distance = eleH - barH;
                }
                this._getPanel1().width(eleW).height(distance);
                //                this._getPanel1().height(distance);

                this._getPanel1Content().setOutWidth(eleW);
                this._getPanel1Content().setOutHeight(distance);

                if (this.options.panel1.collapsed) {
                    this.element.addClass("wijmo-wijsplitter-h-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("wijmo-wijsplitter-h-expanded");
                    this._getPanel1().css("display", "");
                }

                this._getBar().setOutWidth(eleW);
                this._getPanel2().width(eleW).height(eleH - distance - barH);
                //                this._getPanel2().height(eleH - distance - barH);

                this._getPanel2Content().setOutWidth(eleW);
                this._getPanel2Content().setOutHeight(eleH - distance - barH);

                this._getExpander().css("cursor", "pointer");
                this._getExpander().css("left", eleW / 2 - expanderW / 2);
            }

            if (this.options.showExpander) {
                this._getExpander().css("display", "");
            }
            else {
                this._getExpander().css("display", "none");
            }
        },

        _bindEvents: function () {
            ///	<summary>
            ///	Binds interactive DOM events for Splitter.
            ///	</summary>

            var self = this, bar, expander;
            bar = this._getBar();
            expander = this._getExpander();
            expander.bind('mouseup.' + self.widgetName, self, self._expanderMouseUp);
            expander.bind('mouseover.' + self.widgetName, self, self._expanderMouseOver);
            expander.bind('mousedown.' + self.widgetName, self, self._expanderMouseDown);
            expander.bind('mouseout.' + self.widgetName, self, self._expanderMouseOut);
            bar.bind('mouseover.' + self.widgetName, self, self._barMouseOver);
            bar.bind('mouseout.' + self.widgetName, self, self._barMouseOut);
            $(window).bind('resize.' + self.widgetName, self, self._documentResize);
        },

        _barMouseOver: function (e) {

            $(e.currentTarget).addClass("ui-state-hover");
        },

        _barMouseOut: function (e) {
            $(e.currentTarget).removeClass("ui-state-hover");
        },

        _documentResize: function (e) {
            var self = e.data;
            self.refresh();
        },

        _expanderMouseOver: function (e) {

            $(e.currentTarget).addClass("ui-state-hover");
        },

        _expanderMouseDown: function (e) {

            $(e.currentTarget).addClass("ui-state-active");
        },

        _expanderMouseOut: function (e) {
            $(e.currentTarget).removeClass("ui-state-hover ui-state-active");
        },

        _expanderMouseUp: function (e) {
            var self = e.data, newEv1, newEv2;

            $(e.currentTarget).removeClass("ui-state-active");


            if (!self.options.panel1.collapsed && self.options.panel2.collapsed) {
                self.options.panel2.collapsed = false;
                self._initElements();
                return;
            }

            if (self.options.panel1.collapsed) {
                newEv1 = $.Event("expand");
                $(self.element).trigger(newEv1);
                if (newEv1.isImmediatePropagationStopped()) {
                    return;
                }
            }
            else {
                newEv2 = $.Event("collapse");
                $(self.element).trigger(newEv2);
                if (newEv2.isImmediatePropagationStopped()) {
                    return;
                }
            }

            self.options.panel1.collapsed = !self.options.panel1.collapsed;
            self._initElements();

            if (self.options.orientation === "vertical") {
                self.element
                .removeClass("wijmo-wijsplitter-v-expanded " +
				"wijmo-wijsplitter-v-collapsed");
                self._getExpander()
                .removeClass("ui-corner-tl ui-corner-bl ui-corner-tr ui-corner-br");
                self._getExpander().find("span")
                .removeClass("ui-icon-arrowthickstop-1-w ui-icon-arrowthickstop-1-e");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("wijmo-wijsplitter-v-collapsed");
                    self._getExpander().addClass("ui-corner-tr ui-corner-br");
                    self._getExpander().find("span")
                    .addClass("ui-icon-arrowthickstop-1-e");
                }
                else {
                    self.element.addClass("wijmo-wijsplitter-v-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-bl");
                    self._getExpander().find("span")
                    .addClass("ui-icon-arrowthickstop-1-w");
                }
            }
            else {
                self.element
                .removeClass("wijmo-wijsplitter-h-expanded " +
				"wijmo-wijsplitter-h-collapsed");
                self._getExpander()
                .removeClass("ui-corner-tl ui-corner-tr ui-corner-bl ui-corner-br");
                self._getExpander()
                .find("span")
                .removeClass("ui-icon-arrowthickstop-1-n ui-icon-arrowthickstop-1-s");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("wijmo-wijsplitter-h-collapsed");
                    self._getExpander().addClass("ui-corner-bl ui-corner-br");
                    self._getExpander().find("span")
                    .addClass("ui-icon-arrowthickstop-1-s");
                }
                else {
                    self.element.addClass("wijmo-wijsplitter-h-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-tr");
                    self._getExpander().find("span")
                    .addClass("ui-icon-arrowthickstop-1-n");
                }
            }

            if (self.options.panel1.collapsed) {
                $(self.element).trigger("collapsed");
            }
            else {
                $(self.element).trigger("expanded");
            }
        },

        _initResizer: function () {
            var self = this, eleW, eleH, barW, maxW, minW, barH, maxH, minH;

            eleW = this.element.width();
            eleH = this.element.height();
            //var barSize = this.options.bar.width;

            if (this.options.orientation === "vertical") {
                //var barW = barSize;
                barW = this._getBar().outerWidth();
                //
                maxW = eleW - barW - this.options.panel2.minSize;
                minW = this.options.panel1.minSize;
                if (minW < 2) {
                    minW = 2;
                }
                self._getPanel1().wijresizable({
                    wijanimate: true,
                    minWidth: minW,
                    maxWidth: maxW,
                    handles: 'e',
                    helper: 'wijmo-wijsplitter-v-resize-hepler',
                    animateDuration: self.options.resizeSettings.animationDuration,
                    animateEasing: self.options.resizeSettings.easing,
                    stop: function (e) {
                        self._resizeStop(e, self);
                    }
                });
                self._getPanel1().bind("animating", function (e) {
                    self._animating(e, self);
                });
                self._getPanel1().bind("animated", function (e) {
                    self._animated(e, self);
                });
            }
            else {
                //var barH = barSize;
                barH = this._getBar().outerHeight();
                //
                maxH = eleH - barH - this.options.panel2.minSize;
                minH = this.options.panel1.minSize;
                if (minH < 2) {
                    minH = 2;
                }
                self._getPanel1().wijresizable({
                    wijanimate: true,
                    minHeight: minH,
                    maxHeight: maxH,
                    handles: 's',
                    helper: 'wijmo-wijsplitter-h-resize-hepler',
                    animateDuration: self.options.resizeSettings.animationDuration,
                    animateEasing: self.options.resizeSettings.easing,
                    stop: function (e) {
                        self._resizeStop(e, self);
                    }
                });
                self._getPanel1().bind("animating", function (e) {
                    self._animating(e, self);
                });
                self._getPanel1().bind("animated", function (e) {
                    self._animated(e, self);
                });
            }

            $(".ui-resizable-handle", this.element).bind("mouseover", function (e) {
                self._handlemouseover(e, self); 
            });
            $(".ui-resizable-handle", this.element).bind("mouseout", function (e) {
                self._handlemouseout(e, self); 
            });
        },

        _handlemouseover: function (e, self) {
            if (self.options.orientation === "vertical") {
                $(".wijmo-wijsplitter-v-bar", this.element).addClass("ui-state-hover");
            }
            else {
                $(".wijmo-wijsplitter-h-bar", this.element).addClass("ui-state-hover");
            }
        },

        _handlemouseout: function (e, self) {
            if (self.options.orientation === "vertical") {
                $(".wijmo-wijsplitter-v-bar", this.element).removeClass("ui-state-hover");
            }
            else {
                $(".wijmo-wijsplitter-h-bar", this.element).removeClass("ui-state-hover");
            }
        },

        _animated: function (e, self) {

            self._adjustLayout(self);
            $(self.element).trigger("sized");
        },

        _animating: function (e, self) {

            self._adjustLayout(self);
            $(self.element).trigger("sizing");
        },

        _adjustLayout: function (self) {

            if (self.options.orientation === "vertical") {
                self.options.splitterDistance = self._getPanel1().width();
                self._initElements();
            }
            else {
                self.options.splitterDistance = self._getPanel1().height();
                self._initElements();
            }
        },

        _resizeStop: function (e, self) {
            self._adjustLayout(self);
        },

        _checkFullSplitMode: function () {
            if (this.element.css("width") === "100%" && 
            this.element.css("height") === "100%") {
                this.options.fullSplit = true;
            }
        },

        _setPanelsScrollMode: function () {
            var panel1content, panel2content;
            panel1content = this._getPanel1Content();
            panel2content = this._getPanel2Content();

            if (this.options.panel1.scrollBars === "auto") {
                panel1content.css("overflow", "auto");
            }
            else if (this.options.panel1.scrollBars === "both") {
                panel1content.css("overflow", "scroll");
            }
            else if (this.options.panel1.scrollBars === "none") {
                panel1content.css("overflow", "hidden");
            }
            else if (this.options.panel1.scrollBars === "horizontal") {
                panel1content.css("overflow-x", "scroll").css("overflow-y", "hidden");
                //                panel1content.css("overflow-y", "hidden");
            }
            else if (this.options.panel1.scrollBars === "vertical") {
                panel1content.css("overflow-x", "hidden").css("overflow-y", "scroll");
                //                panel1content.css("overflow-y", "scroll");
            }

            if (this.options.panel2.scrollBars === "auto") {
                panel2content.css("overflow", "auto");
            }
            else if (this.options.panel2.scrollBars === "both") {
                panel2content.css("overflow", "scroll");
            }
            else if (this.options.panel2.scrollBars === "none") {
                panel2content.css("overflow", "hidden");
            }
            else if (this.options.panel2.scrollBars === "horizontal") {
                panel2content.css("overflow-x", "scroll").css("overflow-y", "hidden");
                //                panel2content.css("overflow-y", "hidden");
            }
            else if (this.options.panel2.scrollBars === "vertical") {
                panel2content.css("overflow-x", "hidden").css("overflow-y", "scroll");
                //                panel2content.css("overflow-y", "scroll");
            }

        },

        _setFullSplitMode: function () {
            this.element.css("width", "100%").css("height", "100%");
            //            this.element.css("height", "100%");
        },

        invalidate: function () {
            /// <summary>
            /// Invalidates the entire surface of the control 
            /// and causes the control to be redrawn.
            /// </summary>
            this._initElements();
        },

        refresh: function () {
            ///	<summary>
            ///	refresh layout for Splitter.
            ///	</summary>
            if (this.options.fullSplit) {
                this._setFullSplitMode();
                this._initElements();
                this._adjustPanelContentsForChrome();
            }
        },

        _adjustPanelContentsForChrome: function () {
            var panelW;     
            if (window.navigator.userAgent.indexOf("Chrome") > -1) {
                if (this.options.orientation === "horizontal") {    
                    panelW = $(".wijmo-wijsplitter-h-panel1", this.element)
                    .width();                
                    $(".wijmo-wijsplitter-h-panel1", this.element)
                    .children("div")
                    .outerWidth(panelW);                     
                    $(".wijmo-wijsplitter-h-panel2", this.element)
                    .children("div")
                    .outerWidth(panelW);
                    $(".wijmo-wijsplitter-h-bar", this.element)
                    .outerWidth(panelW);           
                }              
            }            
        }
        //end of Splitter implementations.
    });


}(jQuery));

(function ($) {

	$.widget("ui.wijresizable", $.ui.resizable, {
		options: {
			wijanimate: false
		}
	});

	$.ui.plugin.add("wijresizable", "wijanimate", {

		stop: function (event, ui) {
			var self = $(this).data("wijresizable"), 
            o = self.options, pr, style, data, ista, soffseth, soffsetw, left, top;
			self.element.css("width", self.originalSize.width);
			self.element.css("height", self.originalSize.height);

			pr = self._proportionallyResizeElements;
            ista = pr.length && (/textarea/i).test(pr[0].nodeName);
			soffseth = ista && $.ui.hasScroll(pr[0], 'left') ? 0 : self.sizeDiff.height;
			soffsetw = ista ? 0 : self.sizeDiff.width;

			style = { width: (self.size.width - soffsetw), 
            height: (self.size.height - soffseth) };
			left = (parseInt(self.element.css('left'), 10) + 
            (self.position.left - self.originalPosition.left)) || null;
			top = (parseInt(self.element.css('top'), 10) + 
            (self.position.top - self.originalPosition.top)) || null;

			self.element.animate($.extend(style, top && left ? { 
				top: top,
				left: left 
			}: {}), {
					duration: o.animateDuration,
					easing: o.animateEasing,
					step: function () {

						data = {
							width: parseInt(self.element.css('width'), 10),
							height: parseInt(self.element.css('height'), 10),
							top: parseInt(self.element.css('top'), 10),
							left: parseInt(self.element.css('left'), 10)
						};

						if (pr && pr.length) {
							$(pr[0]).css({ width: data.width, height: data.height });
						}

						// propagating resize, and updating values for each animation step
						self._updateCache(data);
						self._propagate("resize", event);
						self.element.trigger("animating");
					},
					complete: function () {
						self.element.trigger("animated");
					}
				});
		}

	});


}(jQuery));
