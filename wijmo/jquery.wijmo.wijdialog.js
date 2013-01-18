/*globals window,document,jQuery,setTimeout*/
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
* * Wijmo Dialog widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.dialog.js
*	jquery.wijmo.wijutil.js
*
*/
(function ($) {
	"use strict";
	var uiStateHover = "ui-state-hover", zonCSS = "wijmo-wijdialog-defaultdockingzone";

	$.widget("wijmo.wijdialog", $.ui.dialog, {
		options: {
			/// <summary>
			/// An object determines the caption buttons to show on wijdialog title bar. 
			/// Type: Object.
			/// Default: {}
			/// </summary>
			/// <remarks>
			/// The default value for this option is: 
			/// {
			/// pin: {visible: true, click: self.pin, 
			/// iconClassOn: "ui-icon-pin-w", iconClassOff:"ui-icon-pin-s"},
			/// refresh: {visible: true, click: self.refresh, 
			/// iconClassOn: "ui-icon-refresh"},
			/// toggle: {visible: true, click: self.toggle},
			/// minimize: {visible: true, click: self.minimize, 
			/// iconClassOn: "ui-icon-minus"},
			/// maximize: {visible: true, click: self.maximize, 
			/// iconClassOn: "ui-icon-extlink"},
			/// close: {visible: true, click: self.close, 
			/// iconClassOn: "ui-icon-close"}
			/// };
			/// Each button is represented by an object in this object. 
			/// property name: The name of the button.
			/// visible: A value specifies whether this button is visible.
			/// click: The event handler to handle the click event of this button.
			/// iconClassOn: Icon for normal state.
			/// iconClassOff: Icon after clicking.
			/// </remarks>
			captionButtons: {},
			/// <summary>
			/// A value determines the settings of the animation effect 
			/// to be used when the wijdialog is collapsed.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			collapsingAnimation: null,
			/// <summary>
			/// A value determines the settings of the animation effect 
			/// to be used when the wijdialog is expanded.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			expandingAnimation: null,
			/// <summary>
			/// A URL string specifies the URL for the iframe element inside wijdialog.
			/// Type: String.
			/// Default: "".
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// A string specifies the ID of the DOM element to 
			/// dock to when wijdialog is minimized.
			/// Type: String.
			/// Default: "".
			/// </summary>
			minimizeZoneElementId: "",
			/// <summary>
			/// Buttoncreating event handler. 
			/// A function gets called before the caption buttons are created. 
			/// A user could use this event to change the array of the buttons to 
			/// change, add, or remove buttons from title bar. 
			/// The buttoncreating event handler is a function that gets called 
			/// before the caption buttons are created. 
			/// Type: Function 
			/// Default: null 
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ buttonCreating: function (e, data) { } });
			/// Bind to the event by type: wijdialogbuttoncreating
			/// $(".selector").bind("wijdialogbuttoncreating", function(e, data) { } );
			/// </summary>
			/// Parameters:
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// Buttons array that will be created. 
			buttonCreating: null,
			/// <summary>
			/// The stateChanged event handler.
			/// A function called when the state ("minimized", "maximized", "normal") 
			/// of this dialog is changed.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ stateChanged: function (e, data) { } });
			/// Bind to the event by type: wijdialogstatechanged
			/// $(".selector").bind("wijdialogstatechanged", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.
			/// data.originalState:The original state of the dialog
			/// data.state:The current state of the dialog
			/// </param>
			stateChanged: null,
			/// <summary>
			/// The stateChanged event handler.
			/// A function called when the dialog lose focus.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijdialog({ blur: function (e, data) { } });
			/// Bind to the event by type: wijdialogstatechanged
			/// $(".selector").bind("wijdialogblur", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.
			/// data.el: The DOM element of this dialog.
			/// </param>
			blur: null
		},

		_create: function () {
			var self = this,
				o = self.options;

			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}

			//Add support for jUICE!
			if ($.isArray(o.buttons)) {
				$.each(o.buttons, function (idx, value) {
					var c = value.click;
					if (c && (typeof c === "string") && window[c]) {
						value.click = window[c];
					}
				});
			}
			//end

			self.form = self.element.closest("form[id]"); // for asp.net

			$.ui.dialog.prototype._create.apply(self, arguments);
			self.uiDialog.addClass("wijmo-wijdialog");
			self._initWijWindow();
			self._bindWindowResize();
			self._attachDraggableResizableEvent();
			self.originalPosition = o.position;
			self.isPin = false;

			if (self.form.length) {
				self.uiDialog.appendTo(self.form);
			}
		},

		_makeDraggable: function () {
			$.ui.dialog.prototype._makeDraggable.apply(this, arguments);
			this.uiDialog.draggable("option", "cancel", ".wijmo-wijdialog-captionbutton");
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv();
				}
				self.disabledDiv.appendTo("body");
				if ($.browser.msie) {
					self.uiDialog.draggable("disable");
				}
			}
			else if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
				if ($.browser.msie) {
					self.uiDialog.draggable("enable");
				}
			}
		},

		_createDisabledDiv: function () {
			var self = this,
			//Change your outerelement here
				ele = self.uiDialog,
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

		destroy: function () {
			var self = this;

			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option

			$.ui.dialog.prototype.destroy.apply(self, arguments);
			self.element.unbind(".wijdialog")
			.removeData('wijdialog');
		},

		_attachDraggableResizableEvent: function () {
			var self = this, uiDialog = self.uiDialog, o = self.options;
			if (o.draggable && uiDialog.draggable) {
				uiDialog.bind("dragstop", function (event, ui) {
					self._saveNormalState();
					self._destoryIframeMask();
				}).bind("dragstart", function (event, ui) {
					self._createIframeMask();
				});
			}
			if (o.resizable && uiDialog.resizable) {
				uiDialog.bind("resizestop", function (event, ui) {
					self._saveNormalState();
					self._destoryIframeMask();
				}).bind("resizestart", function (event, ui) {
					self._createIframeMask();
				});
			}
		},

		//fixed iframe bug.
		_createIframeMask: function () {
			var self = this;
			if (self.innerFrame) {
				self.mask = $("<div style='width:100%;height:100%;position:absolute;" +
                "top:0px;left:0px;z-index:" + ($.ui.dialog.maxZ + 1) + "'></div>")
                .appendTo(self.uiDialog);
			}
		},

		_destoryIframeMask: function () {
			var self = this;
			if (self.innerFrame && self.mask) {
				self.mask.remove();
				self.mask = undefined;
			}
		},

		_initWijWindow: function () {
			var self = this, isIn = true;
			self._createCaptionButtons();
			self._checkUrl();
			//self.uiDialogButtonPane = $(".ui-dialog-buttonpane", self.uiDialog);

			self.uiDialog.bind("mousedown", function (event) {
				var el = event.target;
				if (!$.contains(self.element[0], el)) {
					self.uiDialog.focus();
				}
			})
			.bind("mouseenter", function (event) {
				isIn = true;
			})
			.bind("mouseleave", function (event) {
				isIn = false;
			})
			.bind("focusout", function (event) {
				if (!isIn) {
					self._trigger("blur", event, {
						el: self.element
					});
				}
			});
		},

		//		_setMinWidth:function(){
		//			var textWidth = $("#ui-dialog-title-dialog").width(),
		//			iconWidth = $(".wijmo-wijdialog-captionbutton:eq(0)")
		//			.width(),
		//			minWidth = textWidth + 
		//			$(".wijmo-wijdialog-captionbutton").length * iconWidth;
		//			self._setOption("minWidth",minWidth);
		//		},

		_checkUrl: function () {
			var self = this, o = self.options, url = o.contentUrl,
			innerFrame =
			$('<iframe style="width:100%;height:99%;" frameborder="0"></iframe>');
			if (typeof url === "string" && url.length > 0) {
				self.element.addClass("wijmo-wijdialog-hasframe");
				//innerFrame.attr("src", url);
				self.element.append(innerFrame);
				self.innerFrame = innerFrame;
			}
			self.contentWrapper = self.element;
		},

		_setOption: function (key, value) {
			var self = this;
			$.ui.dialog.prototype._setOption.apply(self, arguments);
			//			if (key === "captionButtons") {
			//				// self._createCaptionButtons();
			//				// todo: reset captionButtons
			//			}
			//			//Add for support disabled option at 2011/7/8
			//			else 
			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
			else if (key === "contentUrl") {
				if (self.innerFrame) {
					self.innerFrame.attr("src", value);
				}
				else {
					self._checkUrl();
				}
			} else if (key = "captionButtons") {
				self._createCaptionButtons();
			}
		},

		_createCaptionButtons: function () {
			var captionButtons = [], self = this, o = self.options, i,
			buttons = {
				pin: {
					visible: true,
					click: self.pin,
					iconClassOn: "ui-icon-pin-w",
					iconClassOff: "ui-icon-pin-s"
				},
				refresh: {
					visible: true,
					click: self.refresh,
					iconClassOn: "ui-icon-refresh"
				},
				toggle: {
					visible: true,
					click: self.toggle,
					iconClassOn: "ui-icon-carat-1-n",
					iconClassOff: "ui-icon-carat-1-s"
				},
				minimize: {
					visible: true,
					click: self.minimize,
					iconClassOn: "ui-icon-minus"
				},
				maximize: {
					visible: true,
					click: self.maximize,
					iconClassOn: "ui-icon-extlink"
				},
				close: {
					visible: true,
					click: self.close,
					iconClassOn: "ui-icon-close"
				}
			},
			oCaptionButtons = o.captionButtons, uiDialogTitlebar = self.uiDialogTitlebar;
			uiDialogTitlebar
			.children(".ui-dialog-titlebar-close, .wijmo-wijdialog-captionbutton")
			.remove();

			$.each(buttons, function (name, value) {
				if (oCaptionButtons && oCaptionButtons[name]) {
					$.extend(value, oCaptionButtons[name]);
				}
				captionButtons.push({ button: name, info: value });
			});
			self._trigger("buttonCreating", null, captionButtons);
			for (i = 0; i < captionButtons.length; i++) {
				self._createCaptionButton(captionButtons[i], uiDialogTitlebar);
			}
		},

		_createCaptionButton: function (buttonHash, uiDialogTitlebar, notAppendToHeader) {
			var self = this, buttonObject,
			buttonCSS = "wijmo-wijdialog-titlebar-" + buttonHash.button,
			button = uiDialogTitlebar.children("." + buttonCSS),
			info = buttonHash.info, buttonIcon = $("<span></span>");
			if (info.visible) {
				if (button.size() === 0) {
					buttonIcon.addClass(
						"ui-icon " +
						info.iconClassOn
					)
					.text(info.text || buttonHash.button);
					buttonObject = $('<a href="#"></a>')
					.append(buttonIcon)
					.addClass(buttonCSS + " ui-corner-all wijmo-wijdialog-captionbutton")
					.attr("role", "button")
					.hover(
						function () {
							buttonObject.addClass(uiStateHover);
						},
						function () {
							buttonObject.removeClass(uiStateHover);
						}
					)
					.click(function (event) {
						if (buttonIcon.hasClass(info.iconClassOff)) {
							buttonIcon.removeClass(info.iconClassOff);
						}
						else {
							buttonIcon.addClass(info.iconClassOff);
						}
						if ($.isFunction(info.click)) {
							info.click.apply(self, arguments);
						}
						return false;
					});
					if (notAppendToHeader) {
						return buttonObject;
					}
					else {
						buttonObject.appendTo(uiDialogTitlebar);
					}
				}
				self[buttonHash.button + "Button"] = buttonObject;
			}
			else {
				button.remove();
			}
		},

		pin: function () {
			///	<summary>
			///		Pins the wijdialog instance so that it could not be moved.
			///	</summary>
			var drag = this.isPin, buttonIcon = this.pinButton.children("span");

			if (!drag) {
				if (buttonIcon.length) {
					if (!buttonIcon.hasClass("ui-icon-pin-s")) {
						buttonIcon.addClass("ui-icon-pin-s");
					}
				}
			}
			else {
				buttonIcon.removeClass("ui-icon-pin-s");
			}
			this._enableDisableDragger(!drag);
			this.isPin = !drag;
		},

		refresh: function () {
			///	<summary>
			///		Refreshes the iframe content in wijdialog.
			///	</summary>

			var fr = this.innerFrame;
			if (fr !== undefined) {
				fr.attr("src", fr.attr("src"));
			}
		},

		toggle: function () {
			var self = this, buttonIcon = self.toggleButton.children("span");

			// TODO : toggle animation and event invoking.
			if (!self.minimized) {
				if (self.collapsed === undefined || !self.collapsed) {
					self.collapsed = true;
					if (!buttonIcon.hasClass("ui-icon-carat-1-s")) {
						buttonIcon.addClass("ui-icon-carat-1-s");
					}
					self._collapseDialogContent(true);
				}
				else {
					self.collapsed = false;
					if (buttonIcon.hasClass("ui-icon-carat-1-s")) {
						buttonIcon.removeClass("ui-icon-carat-1-s");
					}
					self._expandDialogContent(true);
				}
			}
		},

		_expandDialogContent: function (fireEvent) {
			var self = this, o = self.options, animationSetting = o.expandingAnimation;
			self.uiDialog.height("auto");
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.show(
				animationSetting.animated,
				animationSetting.options,
				animationSetting.duration,
				function (e) {
					self.uiDialog.css("height", self._toggleHeight);
					if ($.isFunction(animationSetting.callback)) {
						animationSetting.callback(e);
					}
					if (o.resizable) {
						self._enableDisableResizer(false);
					}
				});
			}
			else {
				self.contentWrapper.show();
				if (o.resizable) {
					self._enableDisableResizer(false);
				}
				self.uiDialog.css("height", self.toggleHeight);
			}
		},

		_collapseDialogContent: function (fireEvent) {
			var self = this, o = self.options, animationSetting = o.collapsingAnimation;
			if (o.resizable) {
				self._enableDisableResizer(true);
			}
			self._toggleHeight = self.uiDialog[0].style.height;
			self.uiDialog.height("auto");
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.hide(
				animationSetting.animated,
				animationSetting.options,
				animationSetting.duration);
			}
			else {
				self.contentWrapper.hide();
			}

			self._enableDisableDragger(self.isPin);
		},

		_enableDisableResizer: function (disabled) {
			var dlg = this.uiDialog;
			dlg.resizable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		_enableDisableDragger: function (disabled) {
			var dlg = this.uiDialog;
			if (!this.options.draggable) {
				return;
			}
			dlg.draggable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		minimize: function () {
			///	<summary>
			///		Minimizes wijdialog.
			///	</summary>

			var self = this, dlg = self.uiDialog, o = self.options, miniZone = null,
			$from = $("<div></div>"), $to = $("<div></div>"), defaultZone, scrollTop, top,
			originalPosition, originalSize = {}, position, size = {},
			content = "uiDialog", originalState;
			//content has 2 value 'uiDialog' for normal content,'copy' for iframe
			//to resolve the issue that iframe reload when minimize.  

			//Only minimize from normal,maximized state
			if (!self.minimized) {

				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				originalState = self.getState();
				if (self.maximized) {
					self.maximized = false;
					self.restoreButton.remove();
					//fixed bug can't minimize window when it's maximized
					$(window).unbind(".onWinResize");
				}
				else { // minimize from normal state
					if (self.collapsed) {
						self._expandDialogContent(false);
					}
					self._saveNormalState();
				}
				// disable resizer
				self._enableDisableResizer(true);
				//hide content

				if (self.collapsed) {
					self._collapseDialogContent(false);
				}

				$from.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.contentWrapper.hide();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.hide();
				}
				// remove size restriction
				dlg.height("auto");
				dlg.width("auto");

				self._doButtonAction(self.minimizeButton, "hide");
				self._restoreButton(true, self.minimizeButton, "After");
				self._doButtonAction(self.pinButton, "hide");
				self._doButtonAction(self.refreshButton, "hide");
				self._doButtonAction(self.toggleButton, "hide");
				self._doButtonAction(self.maximizeButton, "show");

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton", self.uiDialog)
					.css("float", "left");
				}

				if (self.innerFrame) {
					content = "copy";
					self[content] = self.uiDialog.clone();
					self[content].empty();
					self.uiDialogTitlebar.appendTo(self[content]);
				}

				if (o.minimizeZoneElementId.length > 0) {
					miniZone = $("#" + o.minimizeZoneElementId);
				}
				if (miniZone !== null && miniZone.size() > 0) {
					miniZone.append(self[content]);
				}
				else {
					defaultZone = $("." + zonCSS);
					if (defaultZone.size() === 0) {
						defaultZone = $('<div class="' + zonCSS + '"></div>');
						$(document.body).append(defaultZone);
					}
					defaultZone.append(self[content])
					    .css("z-index", dlg.css("z-index"));
				}
				self[content].css("position", "static");
				self[content].css("float", "left");

				if ($.browser.msie && $.browser.version === '6.0') {
					scrollTop = $(document).scrollTop();
					top = document.documentElement.clientHeight -
					defaultZone.height() + scrollTop;
					defaultZone.css({ position: 'absolute', left: "0px", top: top });
				}

				$to.appendTo(document.body)
				.css({
					top: self[content].offset().top,
					left: self[content].offset().left,
					height: self[content].innerHeight(),
					width: self[content].innerWidth(),
					position: "absolute"
				});
				self.uiDialog.hide();
				if (self.innerFrame) {
					self[content].hide();
				}
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 100, function () {
					$from.remove();
					$to.remove();
					self[content].show();
					self.minimized = true;
					position = self.uiDialog.position();
					size.width = self.uiDialog.width();
					size.height = self.uiDialog.height();
					self._enableDisableDragger(true);
					self._trigger('resize', null, {
						originalPosition: originalPosition,
						originalSize: originalSize,
						position: position,
						size: size
					});
					self._trigger("stateChanged", null, {
						originalState: originalState,
						state: "minimized"
					});
				});
			}
		},

		_doButtonAction: function (button, action) {
			if (button !== undefined) {
				button.removeClass(uiStateHover);
				button[action]();
			}
		},

		maximize: function () {
			var self = this, w = $(window), originalPosition,
			originalSize = {}, position, size = {}, state;

			if (!self.maximized) {
				self._enableDisableDragger(false);
				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				// maximized from minimized state
				if (self.minimized) {
					self.restore(); //bug in IE when minimize -> maximize -> restore
				}
				else {
					if (self.collapsed) {
						self._expandDialogContent(false);
					}
					self._saveNormalState();
					state = "normal";
				}
				self.maximized = true;
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.hide();
					self._restoreButton(true, self.maximizeButton, "Before");
				}

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton").css("float", "");
				}

				self._onWinResize(self, w);
				if (self.collapsed) {
					self._collapseDialogContent(false);
				}

				/// TODO : bind resize event.
				if (!self.collapsed) {
					self._enableDisableDragger(true);
				}
				self.uiDialog.resizable({ disabled: true });
				self.uiDialog.removeClass("ui-state-disabled");

				position = self.uiDialog.position();
				size.width = self.uiDialog.width();
				size.height = self.uiDialog.height();
				self._trigger('resize', null, {
					originalPosition: originalPosition,
					originalSize: originalSize,
					position: position,
					size: size
				});

				if (state === "normal") {
					self._trigger("stateChanged", null, {
						originalState: "normal",
						state: "maximized"
					});
				}
			}
		},

		_bindWindowResize: function () {
			var self = this, w = $(window), top, scrollTop, defaultZone;
			w.resize(function () {
				if (self.maximized) {
					self._onWinResize(self, w);
				}
			});

			//fixed ie 6 position:fixed
			if ($.browser.msie && $.browser.version === '6.0') {
				w.bind("scroll.wijdialog resize.wijdialog", function () {
					if (self.minimized) {
						scrollTop = $(document).scrollTop();
						defaultZone = self.uiDialog.parent();
						top = document.documentElement.clientHeight -
						defaultZone.height() + scrollTop;
						defaultZone.css({ top: top });
					}
				});
			}
		},

		_saveNormalState: function () {
			var self = this, dialog = self.uiDialog, ele = self.element;
			if (!self.maximized) {
				self.normalWidth = dialog.css("width");
				self.normalLeft = dialog.css("left");
				self.normalTop = dialog.css("top");
				self.normalHeight = dialog.css("height");

				self.normalInnerHeight = ele.css("height");
				self.normalInnerWidth = ele.css("width");
				self.normalInnerMinWidth = ele.css("min-width");
				self.normalInnerMinHeight = ele.css("min-height");
			}
		},

		_onWinResize: function (self, w) {
			self.uiDialog.css("top", w.scrollTop());
			self.uiDialog.css("left", w.scrollLeft());
			self.uiDialog.setOutWidth(w.width());
			self.uiDialog.setOutHeight(w.height());
			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
			self._size();
			if (self.collapsed) {//fixed bug when resize on maxmize and collapse state.
				self.uiDialog.height("auto");
				self.contentWrapper.hide();
			}
		},

		_restoreButton: function (show, button, position) {
			var self = this,
			buttonHash = { button: "restore", info: {
				visible: show,
				click: self.restore,
				iconClassOn: "ui-icon-newwin"
			}
			},
			restore = self._createCaptionButton(buttonHash, self.uiDialogTitlebar, true);
			if (show) {
				restore["insert" + position](button);
				self.restoreButton = restore;
			}
		},

		_appendToBody: function (dlg) {
			if (!this.innerFrame) {
				dlg.appendTo(document.body);
			}
			else {
				this.uiDialogTitlebar.prependTo(dlg);
				dlg.show();
			}
		},

		restore: function () {
			/// <summary>
			///		Restores wijdialog to normal size.
			/// </summary>

			var self = this, dlg = self.uiDialog, originalPosition, originalSize = {},
			position, size = {}, $from = $("<div></div>"), $to = $("<div></div>"),
			content = "uiDialog", state;
			//content has 2 value 'uiDialog' for normal content,'copy' for iframe
			//to resolve the issue that iframe reload when minimize on ff & webkit.  

			// restore form minimized state.
			if (self.minimized) {
				self.minimized = false;
				self._enableDisableDragger(false);
				if (self.innerFrame) {
					content = "copy";
					if (!self[content]) {
						content = "uiDialog";
					}
				}

				originalPosition = self[content].position();
				originalSize.width = self[content].width();
				originalSize.height = self[content].height();
				$from.appendTo(document.body)
				.css({
					top: self[content].offset().top,
					left: self[content].offset().left,
					height: self[content].innerHeight(),
					width: self[content].innerWidth(),
					position: "absolute"
				});

				dlg.css("position", "absolute");
				dlg.css("float", "");

				self._appendToBody(dlg);

				self._enableDisableResizer(false);
				if (!self.isPin) {
					self._enableDisableDragger(false);
				}
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.show();
				}
				$to.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.uiDialog.hide();
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 150, function () {
					self.uiDialog.show();
					position = self.uiDialog.position();
					size.width = self.uiDialog.width();
					size.height = self.uiDialog.height();
					$from.remove();
					$to.remove();
					if (self.copy) {
						self.copy.remove();
					}
					self._trigger('resize', null, {
						originalPosition: originalPosition,
						originalSize: originalSize,
						position: position,
						size: size
					});

					state = self.getState();

					self._trigger("stateChanged", null, {
						originalState: "minimized",
						state: state
					});
				});

				if (self.collapsed) {
					self._collapseDialogContent();
				}
				self._doButtonAction(self.minimizeButton, "show");
				self._doButtonAction(self.restoreButton, "remove");
				self._doButtonAction(self.pinButton, "show");
				self._doButtonAction(self.refreshButton, "show");
				self._doButtonAction(self.toggleButton, "show");

				if ($.browser.webkit) {
					$(".wijmo-wijdialog-captionbutton").css("float", "");
				}
			}
			else if (self.maximized) {
				self.maximized = false;
				originalPosition = self.uiDialog.position();
				originalSize.width = self.uiDialog.width();
				originalSize.height = self.uiDialog.height();
				$(window).unbind(".onWinResize");
				if (self.collapsed) {
					self._expandDialogContent();
				}
				self._enableDisableResizer(false);
				if (!self.isPin) {
					self._enableDisableDragger(false);
				}
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.collapsed) {
					self._collapseDialogContent();
				}
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.show();
					self._restoreButton(false, self.maximizeButton, "before");
				}
				position = self.uiDialog.position();
				size.width = self.uiDialog.width();
				size.height = self.uiDialog.height();
				self._trigger('resize', null, {
					originalPosition: originalPosition,
					originalSize: originalSize,
					position: position,
					size: size
				});
				state = self.getState();

				self._trigger("stateChanged", null, {
					originalState: "maximized",
					state: state
				});
			}
		},

		getState: function () {
			/// <summary>
			///		Gets the state of this dialog, the possible values are: 
			//		"minimized", "maximized", "normal".
			/// </summary>
			var self = this;
			return self.minimized ? "minimized" :
			(self.maximized ? "maximized" : "normal");
		},

		reset: function () {
			/// <summary>
			///		Resets the properties ("width" ,"height", "position") 
			///     to their default values.
			/// </summary>
			var self = this;
			self.normalWidth = self.normalLeft =
			self.normalTop = self.normalHeight =
			self.normalInnerHeight = self.normalInnerWidth =
			self.normalInnerMinWidth = self.normalInnerMinHeight = undefined;
			self._setOption("position", self.originalPosition);
		},

		open: function () {
			var self = this, o = self.options;

			if ((o.hide === "drop" || o.hide === "bounce") && $.browser.msie) {
				//fixed bug when effect "drop" on IE
				self.uiDialog.css("filter", "auto");
			}

			if (!self.innerFrame) {
				if (!self.minimized) {
					$.ui.dialog.prototype.open.apply(self, arguments);
					//					if (!self.maximized) {
					//						self._restoreToNormal();
					//					}
				}
				else {
					self.uiDialog.show();
					self._isOpen = true;
				}
				self.uiDialog.wijTriggerVisibility();
			}
			else {
				self.innerFrame.attr("src", o.contentUrl);
				if (!self.minimized) {
					$.ui.dialog.prototype.open.apply(self, arguments);
				}
				else {
					self.uiDialogTitlebar.show();
					self._isOpen = true;
				}
			}
			if (self.collapsed) {
				self._collapseDialogContent();
			}

			if (o.disabled) {
				if (self.disabledDiv) {
					self.disabledDiv.show();
				}
				else {
					self.disable();
				}
			}
		},

		close: function () {
			var self = this, o = self.options;
			if ($.ui.dialog.prototype.close.apply(self, arguments)) {
				if (self.innerFrame) {
					self.innerFrame.attr("src", "");
					if (self.minimized) {
						self.uiDialogTitlebar.hide();
					}
				}
				if (self.disabledDiv && o.disabled) {
					self.disabledDiv.hide();
				}
			}
		},

		_restoreToNormal: function () {
			var self = this, dialog = self.uiDialog, ele = self.element;
			dialog.css("width", self.normalWidth);
			dialog.css("left", self.normalLeft);
			dialog.css("top", self.normalTop);
			dialog.css("height", self.normalHeight);

			ele.css("height", self.normalInnerHeight);
			ele.css("width", self.normalInnerWidth);
			ele.css("min-width", self.normalInnerMinWidth);
			ele.css("min-height", self.normalInnerMinHeight);

			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
		}
	});

	$.extend($.ui.dialog.overlay, {
		create: function (dialog) {
			$.ui.dialog.latestDlg = dialog;
			if (this.instances.length === 0) {
				// prevent use of anchors and inputs
				// we use a setTimeout in case the overlay is created from an
				// event that we're going to be cancelling (see #2804)
				setTimeout(function () {
					// handle $(el).dialog().dialog('close') (see #4065)
					if ($.ui.dialog.overlay.instances.length) {
						$(document).bind($.ui.dialog.overlay.events, function (event) {
							// stop events if the z-index of the target is < the z-index of the overlay
							// we cannot return true when we don't want to cancel the event (#3523)
							// var dlg = $(event.target).closest(".wijmo-wijdialog");
							//	if (!dlg.length) {
							//	dlg = dialog.element;
							// }

							if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ &&
							!$.contains($.ui.dialog.latestDlg.element[0], event.target)) {
								return false;
							}
						});
					}
				}, 1);

				// allow closing by pressing the escape key
				$(document).bind('keydown.dialog-overlay', function (event) {
					if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

						dialog.close(event);
						event.preventDefault();
					}
				});

				// handle window resize
				$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
			}

			var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

			if ($.fn.bgiframe) {
				$el.bgiframe();
			}

			this.instances.push($el);
			return $el;
		},

		height: function () {
			var scrollHeight,
				offsetHeight;
			// handle IE 6
			if ($.browser.msie) {
				scrollHeight = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);
				offsetHeight = Math.max(
					document.documentElement.offsetHeight,
					document.body.offsetHeight
				);

				if (scrollHeight < offsetHeight) {
					return $(window).height() + 'px';
				} else {
					return scrollHeight + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).height() + 'px';
			}
		},

		width: function () {
			var scrollWidth,
				offsetWidth;
			// handle IE 6
			if ($.browser.msie) {
				scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);

				if (scrollWidth < offsetWidth) {
					return $(window).width() + 'px';
				} else {
					return scrollWidth + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).width() + 'px';
			}
		}
	});

} (jQuery));
