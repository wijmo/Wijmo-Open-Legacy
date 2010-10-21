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
(function ($) {
    $.widget("ui.wijsplitter", {
        options: {
            /// <summary>
            /// A value determines whether the expander of Splitter is allowed to be shown.
            /// Default: true.
            /// Type: Boolean.
            /// </summary>
            showExpander: true,
            ///	<summary>
            ///	A value indicates the location of the splitter, in pixels, from the left or top edge of the splitter.
            /// Default: 100.
            /// Type: Number.
            ///	</summary>
            splitterDistance: 100,
            ///	<summary>
            ///	A value indicating the horizontal or vertical orientation of the splitter panels.
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
            ///	A value defines the animation while the bar of splitter is beeing dragged.
            /// Default: {}.
            /// Type: Dictionary.
            ///	</summary>
            resizeSettings: {
                ///	<summary>
                ///	Define how long (in milliseconds) the animation of the sliding will run.
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
                ///	A value that determines whether an outline of the element is sized.
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
                ///	Gets or sets the minimum distance in pixels when resizing the splitter. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                minSize: 1,
                ///	<summary>
                ///	A value determining whether splitter panel is collapsed or expanded. 
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
            ///	<summary>
            ///	Defines the information for bottom or right panel of splitter.
            /// Default: {}.
            /// Type: Dictionary.
            ///	</summary>
            panel2: {
                ///	<summary>
                ///	Gets or sets the minimum distance in pixels when resizing the splitter. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                minSize: 1,
                ///	<summary>
                ///	Gets or sets a value determining whether splitter panel is collapsed or expanded. 
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
        },

        destroy: function () {
            ///	<summary>
            ///		Destroy Splitter widget and reset the DOM element.
            ///	</summary>

            var self = this;

            if (self._getPanel1() != null) {
                if (self._getPanel1().is(":ui-wijresizable")) {
                    self._getPanel1().wijresizable('destroy');
                }
            }

            var expander = this._getExpander();
            expander.unbind('.' + self.widgetName);
            $(window).unbind('.' + self.widgetName);

            //
            var originalContent = this.element.data("originalContent");
            this.element.html(originalContent);
            var originalStyle = this.element.data("originalStyle");
            this.element.removeAttr("class");

            if (originalStyle == undefined) {
                this.element.removeAttr("style");
            }
            else {
                this.element.attr("style", originalStyle);
            }
        },

        _setStructure: function () {
            var template1;
            var template2;
            var elems = this.element.find("> div").get();
            if (elems.length == 1) {
                template1 = elems[0];
            }
            else if (elems.length >= 2) {
                template1 = elems[0];
                template2 = elems[1];
            }

            this.element.data("originalStyle", this.element.attr("style"));
            this.element.data("originalContent", this.element.html());

            var container = $("<div class=\"ui-splitter-wrapper\"></div>");
            this.element.append(container);

            var panel1 = $("<div></div>");
            container.append(panel1);
            if (template1 != null) {
                panel1.append(template1);
            }
            else {
                var content1 = $("<div></div>");
                panel1.append(content1);
            }

            var bar = $("<div><div><span></span></div></div>")
            container.append(bar);

            var panel2 = $("<div></div>");
            container.append(panel2);
            if (template2 != null) {
                panel2.append(template2);
            }
            else {
                var content2 = $("<div></div>");
                panel2.append(content2);
            }
        },

        _attachClass: function () {
            if (this.options.orientation == "vertical") {
                this.element.addClass("ui-wijsplitter-vertical");
                this._getPanel1().addClass("ui-wijsplitter-v-panel1");

                this._getPanel1Content().addClass("ui-wijsplitter-v-panel1-content ui-widget-content");
                this._getBar().addClass("ui-wijsplitter-v-bar ui-widget-header");
                this._getExpander().addClass("ui-wijsplitter-v-expander ui-state-default ui-corner-tl ui-corner-bl");
                this._getExpander().find("> span").addClass("ui-icon ui-icon-arrowthickstop-1-w");
                this._getPanel2().addClass("ui-wijsplitter-v-panel2");

                this._getPanel2Content().addClass("ui-wijsplitter-v-panel2-content ui-widget-content");
            }
            else {
                this.element.addClass("ui-wijsplitter-horizontal");
                this._getPanel1().addClass("ui-wijsplitter-h-panel1");

                this._getPanel1Content().addClass("ui-wijsplitter-h-panel1-content ui-widget-content");
                this._getBar().addClass("ui-wijsplitter-h-bar ui-widget-header");
                this._getExpander().addClass("ui-wijsplitter-h-expander ui-state-default ui-corner-tl ui-corner-tr");
                this._getExpander().find("> span").addClass("ui-icon ui-icon-arrowthickstop-1-n");
                this._getPanel2().addClass("ui-wijsplitter-h-panel2");

                this._getPanel2Content().addClass("ui-wijsplitter-h-panel2-content ui-widget-content");
            }
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
            ///	Invalidates the entire surface of the control and causes the control to be redrawn.
            ///	</summary>

            //this.element.css("overflow", "hidden");
            this._getContainer().height(this.element.height());

            this._setPanelsScrollMode();
            var distance = this.options.splitterDistance;
            var eleW = this.element.width();
            var eleH = this.element.height();
            //var barSize = this.options.bar.width;

            if (this.options.orientation == "vertical") {

                //var barW = barSize;
                var barW = this._getBar().outerWidth();

                if (distance > eleW - barW) {
                    distance = eleW - barW;
                }

                var expanderH = this._getExpander().height();
                this._getContainer().width(eleW * 2);

                if (this.options.panel2.collapsed && this.options.panel1.collapsed == false) {
                    distance = eleW - barW;
                }

                this._getPanel1().height(eleH);
                this._getPanel1().width(distance);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    var bw1 = this._getPanel1Content().borderSize().width;
                    var bh1 = this._getPanel1Content().borderSize().height;
                    this._getPanel1Content().css("float", "none");
                    this._getPanel1Content().css("height", eleH - bh1);
                    this._getPanel1Content().css("width", distance - bw1);
                    this._getPanel1Content().css("float", "left");
                }
                else {

                    this._getPanel1Content().setOutHeight(eleH);
                    this._getPanel1Content().setOutWidth(distance);
                }
                if (this.options.panel1.collapsed) {
                    this.element.addClass("ui-wijsplitter-v-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("ui-wijsplitter-v-expanded");
                    this._getPanel1().css("display", "");
                }
                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    //var bw2 = this._getBar().borderSize().width;
                    var bh2 = this._getBar().borderSize().height;
                    this._getBar().css("float", "none");
                    //this._getBar().width(barW - bw2);
                    this._getBar().height(eleH - bh2);
                    this._getBar().css("float", "left");
                }
                else {
                    //this._getBar().setOutWidth(barW);
                    this._getBar().setOutHeight(eleH);
                }

                this._getPanel2().height(eleH);
                this._getPanel2().width(eleW - distance - barW);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    var bw3 = this._getPanel2Content().borderSize().width;
                    //var bh3 = this._getPanel2Content().borderSize().height;
                    this._getPanel2Content().css("float", "none");
                    this._getPanel2Content().height(eleH - bw3);
                    this._getPanel2Content().width(eleW - distance - barW - bw3);
                    this._getPanel2Content().css("float", "left");
                }
                else {

                    this._getPanel2Content().setOutHeight(eleH);
                    this._getPanel2Content().setOutWidth(eleW - distance - barW);
                }

                this._getExpander().css("cursor", "pointer");
                this._getExpander().css("top", eleH / 2 - expanderH / 2);

            }
            else {
                //var barH = barSize;
                var barH = this._getBar().outerHeight();

                if (distance > eleH - barH) {
                    distance = eleH - barH;
                }

                var expanderW = this._getExpander().width();

                if (this.options.panel2.collapsed && this.options.panel1.collapsed == false) {

                    distance = eleH - barH;
                }
                this._getPanel1().width(eleW);
                this._getPanel1().height(distance);

                this._getPanel1Content().setOutWidth(eleW);
                this._getPanel1Content().setOutHeight(distance);

                if (this.options.panel1.collapsed) {
                    this.element.addClass("ui-wijsplitter-h-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("ui-wijsplitter-h-expanded");
                    this._getPanel1().css("display", "");
                }

                this._getBar().setOutWidth(eleW);
                //this._getBar().setOutHeight(barH);
                this._getPanel2().width(eleW);
                this._getPanel2().height(eleH - distance - barH);

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

            var self = this;
            var bar = this._getBar();
            var expander = this._getExpander();
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
            $(e.currentTarget).removeClass("ui-state-hover");
            $(e.currentTarget).removeClass("ui-state-active");
        },

        _expanderMouseUp: function (e) {

            $(e.currentTarget).removeClass("ui-state-active");

            var self = e.data;
            if (self.options.panel1.collapsed == false && self.options.panel2.collapsed) {
                self.options.panel2.collapsed = false;
                self._initElements();
                return;
            }

            if (self.options.panel1.collapsed) {
                var newEv1 = $.Event("expand");
                $(self.element).trigger(newEv1);
                if (newEv1.isImmediatePropagationStopped()) {
                    return;
                }
            }
            else {
                var newEv2 = $.Event("collapse");
                $(self.element).trigger(newEv2);
                if (newEv2.isImmediatePropagationStopped()) {
                    return;
                }
            }

            self.options.panel1.collapsed = !self.options.panel1.collapsed;
            self._initElements();

            if (self.options.orientation == "vertical") {
                self.element.removeClass("ui-wijsplitter-v-expanded");
                self.element.removeClass("ui-wijsplitter-v-collapsed");
                self._getExpander().removeClass("ui-corner-tl");
                self._getExpander().removeClass("ui-corner-bl");
                self._getExpander().removeClass("ui-corner-tr");
                self._getExpander().removeClass("ui-corner-br");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-w");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-e");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("ui-wijsplitter-v-collapsed");
                    self._getExpander().addClass("ui-corner-tr ui-corner-br");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-e");
                }
                else {
                    self.element.addClass("ui-wijsplitter-v-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-bl");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-w");
                }
            }
            else {
                self.element.removeClass("ui-wijsplitter-h-expanded");
                self.element.removeClass("ui-wijsplitter-h-collapsed");
                self._getExpander().removeClass("ui-corner-tl");
                self._getExpander().removeClass("ui-corner-tr");
                self._getExpander().removeClass("ui-corner-bl");
                self._getExpander().removeClass("ui-corner-br");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-n");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-s");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("ui-wijsplitter-h-collapsed");
                    self._getExpander().addClass("ui-corner-bl ui-corner-br");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-s");
                }
                else {
                    self.element.addClass("ui-wijsplitter-h-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-tr");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-n");
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

            var eleW = this.element.width();
            var eleH = this.element.height();
            //var barSize = this.options.bar.width;
            var self = this;
            if (this.options.orientation == "vertical") {
                //var barW = barSize;
                var barW = this._getBar().outerWidth();
                //
                var maxW = eleW - barW - this.options.panel2.minSize;
                var minW = this.options.panel1.minSize;
                if (minW < 2) {
                    minW = 2;
                }
                self._getPanel1().wijresizable({ wijanimate: true, minWidth: minW, maxWidth: maxW, handles: 'e', helper: 'ui-wijsplitter-v-resize-hepler', animateDuration: self.options.resizeSettings.animationDuration, animateEasing: self.options.resizeSettings.easing, stop: function (e) { self._resizeStop(e, self); } });
                self._getPanel1().bind("animating", function (e) { self._animating(e, self); });
                self._getPanel1().bind("animated", function (e) { self._animated(e, self); });
            }
            else {
                //var barH = barSize;
                var barH = this._getBar().outerHeight();
                //
                var maxH = eleH - barH - this.options.panel2.minSize;
                var minH = this.options.panel1.minSize;
                if (minH < 2) {
                    minH = 2;
                }
                self._getPanel1().wijresizable({ wijanimate: true, minHeight: minH, maxHeight: maxH, handles: 's', helper: 'ui-wijsplitter-h-resize-hepler', animateDuration: self.options.resizeSettings.animationDuration, animateEasing: self.options.resizeSettings.easing, stop: function (e) { self._resizeStop(e, self); } });
                self._getPanel1().bind("animating", function (e) { self._animating(e, self); });
                self._getPanel1().bind("animated", function (e) { self._animated(e, self); });
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

            if (self.options.orientation == "vertical") {
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
            if (this.element.css("width") == "100%" && this.element.css("height") == "100%") {
                this.options.fullSplit = true;
            }
        },

        _setPanelsScrollMode: function () {

            var panel1content = this._getPanel1Content();
            var panel2content = this._getPanel2Content();

            if (this.options.panel1.scrollBars == "auto") {
                panel1content.css("overflow", "auto");
            }
            else if (this.options.panel1.scrollBars == "both") {
                panel1content.css("overflow", "scroll");
            }
            else if (this.options.panel1.scrollBars == "none") {
                panel1content.css("overflow", "hidden");
            }
            else if (this.options.panel1.scrollBars == "horizontal") {
                panel1content.css("overflow-x", "scroll");
                panel1content.css("overflow-y", "hidden");
            }
            else if (this.options.panel1.scrollBars == "vertical") {
                panel1content.css("overflow-x", "hidden");
                panel1content.css("overflow-y", "scroll");
            }

            if (this.options.panel2.scrollBars == "auto") {
                panel2content.css("overflow", "auto");
            }
            else if (this.options.panel2.scrollBars == "both") {
                panel2content.css("overflow", "scroll");
            }
            else if (this.options.panel2.scrollBars == "none") {
                panel2content.css("overflow", "hidden");
            }
            else if (this.options.panel2.scrollBars == "horizontal") {
                panel2content.css("overflow-x", "scroll");
                panel2content.css("overflow-y", "hidden");
            }
            else if (this.options.panel2.scrollBars == "vertical") {
                panel2content.css("overflow-x", "hidden");
                panel2content.css("overflow-y", "scroll");
            }

        },

        _setFullSplitMode: function () {
            this.element.css("width", "100%");
            this.element.css("height", "100%");
        },

        invalidate: function () {
            /// <summary>
            /// Invalidates the entire surface of the control and causes the control to be redrawn.
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
            }
        }
        //end of Splitter implementations.
    })


})(jQuery);

(function ($) {

    $.widget("ui.wijresizable", $.ui.resizable, {

        options: {
            wijanimate: false
        }

    });

    $.ui.plugin.add("wijresizable", "wijanimate", {

        stop: function (event, ui) {

            var self = $(this).data("wijresizable"), o = self.options;
            self.element.css("width", self.originalSize.width);
            self.element.css("height", self.originalSize.height);

            var pr = self._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
                					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
                						soffsetw = ista ? 0 : self.sizeDiff.width;

            var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
                					left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
                						top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

            self.element.animate(
                			$.extend(style, top && left ? { top: top, left: left} : {}), {
                			    duration: o.animateDuration,
                			    easing: o.animateEasing,
                			    step: function () {

                			        var data = {
                			            width: parseInt(self.element.css('width'), 10),
                			            height: parseInt(self.element.css('height'), 10),
                			            top: parseInt(self.element.css('top'), 10),
                			            left: parseInt(self.element.css('left'), 10)
                			        };

                			        if (pr && pr.length)
                                    { 
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
                			}
                		);
        }

    });


})(jQuery);



