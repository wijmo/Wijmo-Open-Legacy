/*globals window, wijmoASPNetParseOptions, wijDateOps, Globalize, wijDateCollection,
	document, wijMonthView, wijMyGrid, htmlTextWriter, jQuery*/
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
 ** Wijmo Calendar widget.
*
* Depends:
*	jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.wijpopup.js
*	jquery.effects.core.js	
*	jquery.effects.blind.js
*	jquery.effects.slide.js
*	jquery.effects.scale.js
*	globalize.js
*
*/

(function ($) {
	"use strict";

	var wijDayType = {
		///	<summary>
		///	A general day cell, denotes nothing.
		///	</summary>
		general: 0,
		///	<summary>
		///	A weekend day cell.
		///	</summary>
		weekEnd: 1,
		///	<summary>
		///	A day cell with a date blongs to other month.
		///	</summary>
		otherMonth: 2,
		///	<summary>
		///	A day cell with a date out of the minDate/maxDate range.
		///	</summary>
		outOfRange: 4,
		///	<summary>
		///	A day cell represents today.
		///	</summary>
		today: 8,
		///	<summary>
		///	A custom day cell, which has CSS class 
		/// 'wijmo-wijcalendar-customday' associated.
		///	</summary>
		custom: 16,
		///	<summary>
		///	A day cell in disabled state.
		///	</summary>
		disabled: 32,
		///	<summary>
		///	A day cell in selected state.
		///	</summary>
		selected: 64,
		///	<summary>
		///	A blank day cell.
		///	</summary>
		gap: 128
	};



	$.widget("wijmo.wijcalendar", {
		options: {
			///	<summary>
			///	Gets or sets culture ID.
			/// Default: ''
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({culture: "zh-CN"}); 
			///	</summary>
			culture: '',
			///	<summary>
			///	Gets or sets the number of calendar months in horizontal direction. 
			/// Default: 1
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({monthCols: 2}); 
			///	</summary>
			monthCols: 1,
			///	<summary>
			///	Gets or sets the number of calendar months in vertical direction. 
			/// Default: 1
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({monthRows: 2}); 
			///	</summary>
			monthRows: 1,
			///	<summary>
			///	Gets or sets the format for the title text. 
			/// Default: "MMMM yyyy"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({titleFormat: "MMMM yyyy"}); 
			///	</summary>
			titleFormat: "MMMM yyyy",
			///	<summary>
			///	A Boolean property that determines whether to display calendar title.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showTitle: false}); 
			///	</summary>
			showTitle: true,
			///	<summary>
			///	Gets or sets the display date for the first month view.  
			/// Default: undefined
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({displayDate: new Date(1900,1,1)}); 
			///	</summary>
			displayDate: undefined,
			///	<summary>
			///	Gets or sets the number of day rows. 
			/// Default: 6
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({dayRows: 6}); 
			///	</summary>
			dayRows: 6,
			///	<summary>
			///	Gets or sets the number of day columns. 
			/// Default: 7
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({dayCols: 7}); 
			///	</summary>
			dayCols: 7,
			///	<summary>
			///	Gets or sets the format for the week day. 
			///	Possible values are: "short", "full", "firstLetter" or "abbreviated".
			/// Default: "short"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({weekDayFormat: "abbreviated"}); 
			///	</summary>
			weekDayFormat: "short",
			///	<summary>
			///	A Boolean property that determines whether to display week days.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showWeekDays: false}); 
			///	</summary>
			showWeekDays: true,
			///	<summary>
			///	Determines whether to display week numbers. 
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showWeekNumbers: true}); 
			///	</summary>
			showWeekNumbers: false,
			///	<summary>
			///	Defines different rules for determining the first week of the year. 
			///	Possible values are: "firstDay", "firstFullWeek" or "firstFourDayWeek"
			/// Default: "firstDay"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({calendarWeekRule: "firstDay"}); 
			///	</summary>
			calendarWeekRule: "firstDay",
			///	<summary>
			///	Determines the minimum date to display.
			/// Default: new Date(1900, 0, 1)
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({minDate: new Date(2012, 2, 1)}); 
			///	</summary>
			minDate: new Date(1900, 0, 1),
			///	<summary>
			///	Determines the maximum date to display. 
			/// Default: new Date(2099, 11, 31)
			/// Type: Date
			/// Code example:
			///		$(".selector").wijcalendar({maxDate: new Date(2012, 5, 31)}); 
			///	</summary>
			maxDate: new Date(2099, 11, 31),
			///	<summary>
			///	Determines whether to display the days of the next 
			/// and/or previous month.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showOtherMonthDays: false}); 
			///	</summary>
			showOtherMonthDays: true,
			///	<summary>
			///	Determines whether to add zeroes to days with only one digit 
			/// (for example, "1" would become "01" if this property were set to "true").
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({showDayPadding: true}); 
			///	</summary>
			showDayPadding: false,
			///	<summary>
			///	Gets or sets the date selection mode on the calendar control that
			/// specifies whether the user can select a single day, a week,
			/// or an entire month. 
			/// Default: { day: true, days: true }
			/// Type: Hash Object
			///	Possible fields in hash are: day, days, weekDay, weekNumber, month.
			/// Code example:
			///	$(".selector").wijcalendar({
			/// selectionMode: { day: true, days: true, weekDay: true}}); 
			///	</summary>
			selectionMode: { day: true, days: true },
			///	<summary>
			///	Determines whether the preview buttons are displayed.
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({allowPreview: true}); 
			///	</summary>
			allowPreview: false,
			///	<summary>
			///	Determines whether users can change the view to month/year/decade
			/// while clicking on the calendar title.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({allowQuickPick: false}); 
			///	</summary>
			allowQuickPick: true,
			///	<summary>
			///	Gets or sets the format for the ToolTip. 
			/// Default: "dddd, MMMM dd, yyyy"
			/// Type: String
			/// Code example:
			///	$(".selector").wijcalendar({toolTipFormat: "dddd, MMMM dd, yyyy"}); 
			///	</summary>
			toolTipFormat: "dddd, MMMM dd, yyyy",
			///	<summary>
			///	Gets or sets the text for the 'previous' button's ToolTip. 
			/// Default: "Previous"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({prevTooltip: "Previous"}); 
			///	</summary>
			prevTooltip: "Previous",
			///	<summary>
			///	Gets or sets the text for the 'next' button's ToolTip. 
			/// Default: "Next"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({nextTooltip: "Next"}); 
			///	</summary>
			nextTooltip: "Next",
			///	<summary>
			///	Gets or sets the  "quick previous" button's ToolTip.
			/// Default: "Quick Previous"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({quickPrevTooltip: "Quick Previous"}); 
			///	</summary>
			quickPrevTooltip: "Quick Previous",
			///	<summary>
			///	Gets or sets the "quick next" button's ToolTip.
			/// Default: "Quick Next"
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({quickNextTooltip: "Quick Next"}); 
			///	</summary>
			quickNextTooltip: "Quick Next",
			///	<summary>
			///	Gets or sets the "previous preview" button's ToolTip. 
			/// Default: ""
			/// Type: String
			/// Code example:
			///	$(".selector").wijcalendar({
			/// prevPreviewTooltip: "Preview previous month"});
			///	</summary>
			prevPreviewTooltip: "",
			///	<summary>
			///	Gets or sets the "next preview" button's ToolTip. 
			/// Default: ""
			/// Type: String
			/// Code example:
			///	$(".selector").wijcalendar({
			/// nextPreviewTooltip: "Preview next month"}); 
			///	</summary>
			nextPreviewTooltip: "",
			///	<summary>
			///	Determines the display type of navigation buttons.
			///	Possible values are: "default", "quick" or "none"
			/// Default: 'default'
			/// Type: String
			/// Code example:
			///	$(".selector").wijcalendar({navButtons: "quick"}); 
			///	</summary>
			navButtons: 'default',
			///	<summary>
			///	Detemines the inc/dec steps when clicking the quick navigation button.
			/// Default: 12
			/// Type: Number
			/// Code example:
			///	$(".selector").wijcalendar({quickNavStep: 3}); 
			///	</summary>
			quickNavStep: 12,
			///	<summary>
			///	Determines the month slide direction.
			///	Possible values are: horizontal or vertical
			/// Default: 'horizontal'
			/// Type: String
			/// Code example:
			///	$(".selector").wijcalendar({direction: "vertical"}); 
			///	</summary>
			direction: 'horizontal',
			///	<summary>
			///	Gets or sets the animation duration in milliseconds. 
			/// Default: 250
			/// Type: Number
			/// Code example:
			///		$(".selector").wijcalendar({duration: 500}); 
			///	</summary>
			duration: 250,
			///	<summary>
			///	Determines the animations easing effect.
			/// Default: 'easeInQuad'
			/// Type: String
			/// Code example:
			///		$(".selector").wijcalendar({easing: "easeInQuad"}); 
			///	</summary>
			easing: 'easeInQuad',
			///	<summary>
			///	A Boolean property that determines whether
			/// the wijcalendar widget is a pop-up calendar.
			/// Default: false
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({popupMode: true}); 
			///	</summary>
			popupMode: false,
			///	<summary>
			///	A Boolean property that determines whether to autohide
			/// the calendar in pop-up mode when clicking outside of the calendar.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///		$(".selector").wijcalendar({autoHide: false}); 
			///	</summary>
			autoHide: true,
			/// <summary>
			/// A callback function used for customizing the content,
			/// style and attributes of a day cell.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ 
			/// customizeDate: function($daycell, date, dayType, hover, preview){ } });
			/// </summary>
			/// <param name="$daycell" type="jQuery">
			/// jQuery object that represents table cell of the date to be customized.
			/// </param>
			/// <param name="date" type="Date">Date of the cell.</param>
			/// <param name="dayType" type="Number">
			/// Type of the day. Please see the definition of wijDayType.
			///	</param>
			/// <param name="hover" type="Boolean">
			/// Whether mouse is over the day cell.
			/// </param>
			/// <param name="preview" type="Object">
			/// Whether rendering in preview container.
			/// </param>
			/// <returns type="Boolean">
			/// True if day cell content has been changed
			/// and default cell content will not be applied.
			/// </returns>
			customizeDate: null,
			/// <summary>
			/// A callback function used to customizing the title text on month view.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ title: function (date, format) { } });
			/// </summary>
			///
			/// <param name="date" type="Date">The display date of the month.</param>
			/// <param name="format" type="String">
			/// The title format. Determined by the options.titleFormat.
			/// </param>
			/// <returns type="String">The customized title text.</returns>
			title: null,
			/// <summary>
			/// The beforeSlide event handler. 
			/// A function called before the calendar view slides to another month. 
			/// Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ beforeSlide: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			beforeSlide: null,
			/// <summary>
			/// The afterSlide event handler. 
			/// A function called after the calendar view slided to another month.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ afterSlide: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			afterSlide: null,
			/// <summary>
			/// The beforeSelect event handler. 
			/// A function called before user selects a day by mouse. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ beforeSelect: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.date: The date to be selected.
			///</param>
			beforeSelect: null,
			/// <summary>
			/// The afterSelect event handler. 
			/// A function called after user selects a day by mouse.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ afterSelect: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.date: The selected date.
			///</param>
			afterSelect: null,
			/// <summary>
			/// The selectedDatesChanged event handler. 
			/// A function called after the selectedDates collection changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $(".selector").wijcalendar({ 
			/// selectedDatesChanged: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.dates: The array with all selected date object.
			///</param>
			selectedDatesChanged: null
		},

		_create: function () {
			var self = this;
			
			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}
			
			// Add for parse date options for jUICE. D.H
			if ($.isFunction(window["wijmoASPNetParseOptions"])) {
				wijmoASPNetParseOptions(this.options);
			}

			this.element.addClass("wijmo-wijcalendar ui-datepicker-inline ui-datepicker" +
				" ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
				.attr('role', 'grid');
			this._previewWrapper(this.options.allowPreview);
			this.element.data('preview.wijcalendar', false);
			
			//update for visibility change
			if (self.element.is(":hidden") &&
						self.element.wijAddVisibilityObserver) {
				self.element.wijAddVisibilityObserver(function () {
					self.refresh();
					if (self.element.wijRemoveVisibilityObserver) {
						self.element.wijRemoveVisibilityObserver();
					}
				}, "wijcalendar");
			}
		},

		_init: function () {
			if (this.options.popupMode) {
				var po = { autoHide: !!this.options.autoHide },
					self = this;
				if (this.options.beforePopup) {
					po.showing = this.options.beforePopup;
				}
				if (this.options.afterPopup) {
					po.shown = this.options.afterPopup;
				}
				if (this.options.beforeClose) {
					po.hiding = this.options.beforeClose;
				}

				po.hidden = function (data) {
					self.element.removeData("lastdate.wijcalendar");
					if (self.options.afterClose) {
						self.options.afterClose.call(data);
					}
				};

				this.element.wijpopup(po);
			}

			this._getSelectedDates();
			this._getDisabledDates();
			this._resetWidth();
			this.refresh();
			this.element.width(this.element.width() + 2);
		},

		destroy: function () {
			$.Widget.prototype.destroy.apply(this, arguments);
			this.close();
			this.element.html("");
			this.element.removeClass("wijmo-wijcalendar ui-datepicker-inline " +
				"ui-datepicker ui-widget ui-widget-content ui-helper-clearfix " +
				"ui-corner-all ui-datepicker-multi")
				.removeAttr('role');

			var self = this;
			$.each(["preview", "disableddates", "selecteddates", "dragging",
					"lastdate", "animating"], function (i, prefix) {
						self.element.removeData(prefix + ".wijcalendar");
					});

			this._previewWrapper(false);
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);

			switch (key) {
			case "showWeekDays":
			case "showWeekNumbers":
			case "showTitle":
			case "showOtherMonthDays":
			case "selectionMode":
				this.unSelectAll();
				this._resetWidth();
				this.refresh();
				break;

			case "culture":
				this.refresh();
				break;

			case "allowPreview":
				this._previewWrapper(value);
				this.refresh();
				break;

			case "monthCols":
				if (this._myGrid) {
					this._myGrid = undefined;
				}
				this._resetWidth();
				this.refresh();
				break;

			case "autoHide":
				this.element.wijpopup({ autoHide: this.options.autoHide });
				break;

			case "selectedDates":
				this._getSelectedDates().setDates(value);
				this.refresh();
				break;

			case "disabledDates":
				this._getDisabledDates().setDates(value);
				this.refresh();
				break;
			case "displayDate":
				this.refresh();
				break;
			}
		},

		_previewWrapper: function (add) {
			if (add) {
				if (!this.element.parent()
						.hasClass('wijmo-wijcalendar-preview-wrapper')) {
					this.element.wrap("<div class='wijmo-wijcalendar-preview-wrapper" +
						" ui-helper-clearfix'></div>");
				}
			} else {
				if (this.element.parent().hasClass('wijmo-wijcalendar-preview-wrapper')) {
					this.element.unwrap();
				}
			}
		},

		_isRTL: function () {
			return !!this._getCulture().isRTL;
		},

		refresh: function () {
			/// <summary>Refreshes the calendar.</summary>
			this.element.empty().append(this._createCalendar());
			this.element[(this._isRTL() ? 'add' :
				'remove') + 'Class']('ui-datepicker-rtl');
			this._bindEvents();
		},

		refreshDate: function (date) {
			/// <summary>
			///  Refreshes a single date.
			/// </summary>
			/// <param name="date" type="Date">The date to be refreshed.</param>
			if (!this._monthViews) {
				return;
			}
			if (date < this._groupStartDate || date > this._groupEndDate) {
				return;
			}
			$.each(this._monthViews, function () {
				this._refreshDate(date);
			});
		},

		getDisplayDate: function () {
			/// <summary>Gets the valid display date.</summary>
			var d = this.options.displayDate ? this.options.displayDate : new Date();
			if (wijDateOps.isSameDate(d, new Date(1900, 0, 1))) {
				d = new Date();
			}

			return d;
		},

		getSelectedDate: function () {
			/// <summary>Gets the current selected date.</summary>
			var dates = this.options.selectedDates;
			return (!dates || dates.length === 0) ? null : dates[0];
		},

		selectDate: function (date) {
			/// <summary>
			///  Select a date by code.
			/// </summary>
			/// <param name="date" type="Date">The date to be selected.</param>
			date = new Date(date);
			if (this._getDisabledDates().contains(date)) {
				return false;
			}
			if (date < this.options.minDate || date > this.options.maxDate) {
				return false;
			}

			this._getSelectedDates().add(date);
			this.refreshDate(date);
			return true;
		},

		unSelectDate: function (date) {
			/// <summary>
			///  Unselect a date by code.
			/// </summary>
			/// <param name="date" type="Date">
			/// The date to be removed from the selectedDates collection.
			/// </param>
			date = new Date(date);
			if (this._getDisabledDates().contains(date)) {
				return false;
			}
			if (date < this.options.minDate || date > this.options.maxDate) {
				return false;
			}

			this._getSelectedDates().remove(date);
			this.refreshDate(date);
			return true;
		},

		unSelectAll: function () {
			/// <summary>Unselect all by code.</summary>
			var dates = this.options.selectedDates, i;
			if (dates && dates.length > 0) {
				this._getSelectedDates().clear();
				for (i = 0; i < dates.length; i++) {
					this.refreshDate(dates[i]);
				}
			}
		},

		_slideToDate: function (date) {
			if (wijDateOps.isSameMonth(this.getDisplayDate(), date)) {
				return;
			}

			var visible = this.element.is(":visible");
			if (!visible) {
				this.options.displayDate = date;
			}
			else {
				if (this._trigger('beforeSlide') === false) {
					return;
				}

				if (this._isSingleMonth()) {
					this._playSlideAnimation(date);
				} else {
					this._playMmSlideAnimation(date);
				}
			}
		},

		isPopupShowing: function () {
			/// <summary>Determines whether the calendar is in popup state.</summary>
			return !!this.options.popupMode ? this.element.wijpopup('isVisible') : false;
		},

		popup: function (position) {
			/// <summary>Pops up the calendar at specifies position.</summary>
			/// <param name="position" type="Object">
			/// The position object accepts by the jQuery Position plugin. 
			/// Please see "http://jqueryui.com/demos/position/" for details
			/// of the parameter.
			/// </param>
			this._myGrid = undefined;
			this.refresh();
			this.element.data('dragging.wijcalendar', false);
			if (this.element.data("wijpopup")) {
				this.element.wijpopup('show', position);
			}
		},

		popupAt: function (x, y) {
			/// <summary>
			/// Pops up the calendar at the X/Y position to the document.
			/// </summary>
			/// <param name="x" type="Number">X offset.</param>
			/// <param name="y" type="Number">Y offset.</param>
			this._myGrid = undefined;
			this.refresh();
			this.element.data('dragging.wijcalendar', false);
			if (this.element.data("wijpopup")) {
				this.element.wijpopup('showAt', x, y);
			}
		},

		close: function () {
			/// <summary>Close the calendar if is it in popup state.</summary>
			if (this.isPopupShowing()) {
				this.element.wijpopup('hide');
			}
		},

		_getCulture: function (name) {
			return Globalize.findClosestCulture(name || this.options.culture);
		},

		_getDates: function (token) {
			var name = token.toLowerCase() + ".wijcalendar",
				dates = this.element.data(name);
			if (dates === undefined) {
				dates = new wijDateCollection(this, token);
				this.element.data(name, dates);
			}
			return dates;
		},

		_getDisabledDates: function () {
			return this._getDates('disabledDates');
		},

		_getSelectedDates: function () {
			return this._getDates('selectedDates');
		},

		_onDayDragStart: function (e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		},

		_onDayMouseDown: function (e) {
			e.preventDefault();
			e.stopPropagation();

			var o = this.options, self = this,
				date, args, selected = false,
				selDates = o.selectedDates,
				exist = false,
				dates = [];
			if (e.which !== 1) {
				return false;
			}
			date = this._getCellDate(e.currentTarget);
			if (date === undefined) {
				return false;
			}
			if (!o.selectionMode.day) {
				return false;
			}

			args = { date: date };
			if (this._trigger("beforeSelect", null, args) === false) {
				return false;
			}

			if (!o.selectionMode.days || (!e.metaKey && !e.shiftKey && !e.ctrlKey)) {
				this.unSelectAll();
			}

			if (!!o.selectionMode.days) {
				if (e.shiftKey && this.element.data("lastdate.wijcalendar")) {
					this._selectRange(this.element.data("lastdate.wijcalendar"), date);
					selected = true;
				} else {
					if (e.ctrlKey) {
						this.element.data("lastdate.wijcalendar", date);

						$.each(selDates, function (i, d) {
							if (date.getFullYear() === d.getFullYear() &&
								date.getMonth() === d.getMonth() &&
								date.getDate() === d.getDate()) {
								exist = true;
								return false;
							}
						});

						if (exist) {
							this.unSelectDate(date);
						} else {
							this.selectDate(date);
						}

						selDates = o.selectedDates;
						$.each(selDates, function (i, d) {
							dates.push(new Date(d));
						});

						this._trigger('selectedDatesChanged', null, { dates: dates });
						selected = true;
					}
				}
			}

			if (!selected) {
				this.element.data("lastdate.wijcalendar", date);
				selected = this.selectDate(date);
				this._trigger('selectedDatesChanged', null, { dates: [date] });
			}

			if (selected) {
				this._trigger('afterSelect', null, args);

				if (!!o.selectionMode.days) {
					this.element.data('dragging.wijcalendar', true);
					$(document.body).bind("mouseup." + this.widgetName, function () {
						$(document.body).unbind("mouseup." + self.widgetName);
						self.element.data('dragging.wijcalendar', false);
					});
				}
			}

			return false;
		},

		_onMouseUp: function (e) {
			e.preventDefault();
			e.stopPropagation();

			//var self = this;
			this.element.data('dragging.wijcalendar', false);

			return false;
		},

		_onDayClicked: function (e) {
			var date = this._getCellDate(e.currentTarget);
			if (date === undefined) {
				return false;
			}
			if (!this.options.selectionMode.day) {
				return false;
			}

			if (this.isPopupShowing()) {
				this.close();
			} else {
				if ($(e.currentTarget).hasClass('ui-datepicker-other-month')) {
					this._slideToDate(date);
				}
			}

			return false;
		},

		_onDayMouseEnter: function (e) {
			$(e.currentTarget).attr('state', 'hover');
			this._refreshDayCell(e.currentTarget);

			if (!!this.element.data('dragging.wijcalendar')) {
				var date = this._getCellDate(e.currentTarget);
				if (date === undefined) {
					return;
				}

				this.unSelectAll();
				this._selectRange(this.element.data("lastdate.wijcalendar"), date, true);
			}
		},

		_onDayMouseLeave: function (e) {
			$(e.currentTarget).attr('state', 'normal');
			this._refreshDayCell(e.currentTarget);
		},

		_selectRange: function (start, end, bymouse) {
			if (start !== undefined && start !== new Date(1900, 1, 1)) {
				var minDate = start,
					maxDate = end,
					selDates = [];
				if (start > end) {
					maxDate = start;
					minDate = end;
				}

				while (true) {
					if (minDate > maxDate) {
						break;
					}
					this.selectDate(minDate);
					selDates[selDates.length] = minDate;
					minDate = wijDateOps.addDays(minDate, 1);
				}
				if (!bymouse) {
					this.element.removeData("lastdate.wijcalendar");
				}

				this._trigger('selectedDatesChanged', null, { dates: selDates });
			}
			else {
				this.selectDate(start);
				this._trigger('selectedDatesChanged', null, { dates: [start] });
			}

			return true;
		},

		_getCellDate: function (c) {
			var d = $(c).attr('date');
			return (d === undefined) ? d : new Date(d);
		},

		_getParentTable: function (c) {
			var parents = $(c).parents('table');
			return (parents.length === 0) ? undefined : parents.get(0);
		},

		_initMonthSelector: function (ms) {
			if ($(ms).data('cells') !== undefined) {
				return;
			}

			var tokens = ms.id.split('_'),
				monthID, monthTable, cells = [], i, j, td, dt, row;
			if (tokens[tokens.length - 1] !== 'ms') {
				throw Error.create('not a monthview');
			}
			monthID = (tokens.slice(0, tokens.length - 1)).join('_');
			monthTable = this._getParentTable(ms);
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a monthview');
				}
				for (i = 0; i < monthTable.rows.length; i++) {
					row = monthTable.rows[i];
					for (j = 0; j < row.cells.length; j++) {
						td = row.cells[j];
						if (td) {
							dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a')
										.hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(ms).data('cells', cells);
		},

		_onMonthSelectorClicked: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'),
				selDates = [],
				i, c, d, date;

			this.element.removeData("lastdate.wijcalendar");
			this.unSelectAll();
			for (i = 0; i < cells.length; i++) {
				c = cells[i];
				d = $(c).attr('date');
				if (d !== undefined) {
					date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onMonthSelectorMouseEnter: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onMonthSelectorMouseLeave: function (e) {
			this._initMonthSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_initWeekDaySelector: function (wd) {
			if ($(wd).data('cells') !== undefined) {
				return;
			}

			var tokens = wd.id.split('_'),
				colIndex, monthID, monthTable,
				cells = [], i = 0, tr, td, dt;
			if (tokens[tokens.length - 2] !== 'cs') {
				throw Error.create('not a column');
			}
			colIndex = parseInt(tokens[tokens.length - 1], 10);
			monthID = (tokens.slice(0, tokens.length - 2)).join('_');
			monthTable = this._getParentTable(wd);
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a column');
				}
				/** update for issue 29995
				if (!this._isSingleMonth()) {
					i++;
				}*/
				if (this.options.showWeekDays) {
					i++;
				}
				for (; i < monthTable.rows.length; i++) {
					tr = monthTable.rows[i];
					if (colIndex < tr.cells.length) {
						td = tr.cells[colIndex];
						if (td) {
							dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a')
										.hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(wd).data('cells', cells);
		},

		_onWeekDayClicked: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'),
				selDates = [],
				i, c, d, date;

			this.unSelectAll();
			for (i = 0; i < cells.length; i++) {
				c = $(cells[i]);
				d = c.attr('date');
				if (d !== undefined) {
					date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onWeekDayMouseEnter: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onWeekDayMouseLeave: function (e) {
			this._initWeekDaySelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;

			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_initWeekNumberSelector: function (wn) {
			if ($(wn).data('cells') !== undefined) {
				return;
			}

			var tokens = wn.id.split('_'),
				rowIndex, monthID, monthTable,
				cells = [], tr, i, td, dt;
			if (tokens[tokens.length - 2] !== 'rs') {
				throw Error.create('not a row');
			}
			rowIndex = parseInt(tokens[tokens.length - 1], 10);
			monthID = (tokens.slice(0, tokens.length - 2)).join('_');
			monthTable = this._getParentTable(wn);
			if (monthTable) {
				if (monthTable.id !== monthID) {
					throw Error.create('not a row');
				}
				tr = monthTable.rows[rowIndex];
				if (tr) {
					i = 0;
					if (this.options.showWeekNumbers) {
						i++;
					}
					for (; i < tr.cells.length; i++) {
						td = tr.cells[i];
						if (td) {
							dt = $(td).attr('daytype');
							if (dt !== undefined) {
								if ($(td).find('a')
										.hasClass('ui-priority-secondary') === false) {
									if (this._isSelectable(parseInt(dt, 10))) {
										cells[cells.length] = td;
									}
								}
							}
						}
					}
				}
			}

			$(wn).data('cells', cells);
		},

		_onWeekNumberClicked: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'),
				selDates = [], i, c, d, date;
			this.unSelectAll();
			for (i = 0; i < cells.length; i++) {
				c = $(cells[i]);
				d = c.attr('date');
				if (d !== undefined) {
					date = new Date(d);
					this.selectDate(date);
					selDates[selDates.length] = date;
				}
			}

			this._trigger('selectedDatesChanged', null, { dates: selDates });
			if (this.isPopupShowing()) {
				this.close();
			}

			return false;
		},

		_onWeekNumberMouseEnter: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;
			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseEnter(e);
			}
		},

		_onWeekNumberMouseLeave: function (e) {
			this._initWeekNumberSelector(e.currentTarget);
			var cells = $(e.currentTarget).data('cells'), i;
			for (i = 0; i < cells.length; i++) {
				e.currentTarget = cells[i];
				this._onDayMouseLeave(e);
			}
		},

		_isAnimating: function () {
			return !!this.element.data('animating.wijcalendar');
		},

		_onPreviewMouseEnter: function (e) {
			if (!!this.element.data('previewContainer')) {
				return;
			}
			if (this._isAnimating()) {
				return;
			}

			var btn = $(e.currentTarget),
				btnId = btn.attr('id'),
				mainDate = this.getDisplayDate(),
				months = this.options.monthCols * this.options.monthRows,
				previewContainer = $('<div/>');
			if (btnId === undefined) {
				return;
			}

			if (btnId === "prevPreview") {
				months = -months;
			}

			this.options.displayDate = wijDateOps.addMonths(mainDate, months);
			this.element.data('preview.wijcalendar', true);

			previewContainer.appendTo(document.body);
			previewContainer.hide();
			previewContainer.addClass('wijmo-wijcalendar ui-datepicker-inline ' +
			'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ' +
			'ui-corner-all');
			previewContainer.append(this._createCalendar());

			this.options.displayDate = mainDate;
			this.element.data('preview.wijcalendar', false);
			this._createMonthViews();

			previewContainer.wijpopup({
				showEffect: 'slide',
				showOptions: { direction: (btnId === 'prevPreview' ? 'right' : 'left') },
				hideEffect: 'slide',
				hideOptions: { direction: (btnId === 'prevPreview' ? 'right' : 'left') }
			});
			previewContainer.wijpopup('show', {
				my: (btnId === 'prevPreview' ? 'right top' : 'left top'),
				at: (btnId === 'prevPreview' ? 'left top' : 'right top'),
				of: btn
			});

			this.element.data('previewContainer', previewContainer);
		},

		_onPreviewMouseLeave: function (e) {
			var btn = $(e.currentTarget),
				btnId = btn.attr('id'),
				previewContainer = this.element.data('previewContainer'),
				self = this;
			if (btnId === undefined) {
				return;
			}

			if (previewContainer) {
				if (previewContainer.wijpopup('isAnimating')) {
					window.setTimeout(function () {
						self._onPreviewMouseLeave(e);
					}, 200);
				} else {
					previewContainer.wijpopup('hide');
					this.element.removeData('previewContainer');
				}
			}
		},

		_resetWidth: function () {
			if (!this._myGrid) {
				this.element.css('height', '');
				if (this.options.monthCols > 1) {
					this.element.css('width', 17 * this.options.monthCols + 'em');
					this.element.addClass('ui-datepicker-multi');
				}
				else {
					this.element.css('width', '');
					this.element.removeClass('ui-datepicker-multi');
				}
			}
		},

		_playMmSlideAnimation: function (toDate) {
			var w = this.element.width(),
				h = this.element.height(),
				date = this.getDisplayDate(),
				curContent, newContent, goNext,
				direction = this.options.direction || 'horizontal',
				calendar = this;
			this.element.height(h);

			this.element
				.wrapInner("<div class='wijmo-wijcalendar-multi-aniwrapper'></div>");
			curContent = this.element.find('>:first-child').width(w).height(h);

			newContent = curContent.clone(false);
			newContent.hide();

			this.options.displayDate = toDate;
			this._createMonthViews();
			newContent.empty().append(this._createMonthGroup());
			newContent.appendTo(this.element);

			goNext = toDate > date;

			this.element.data('animating.wijcalendar', true);
			curContent.effect('slide',
			{
				mode: 'hide',
				direction: direction === 'horizontal' ?
					(goNext ? 'left' : 'right') : (goNext ? 'up' : 'down'),
				easing: this.options.easing || 'easeOutBack',
				duration: this.options.duration
			},

			function () {
				curContent.remove();
			});

			newContent.effect('slide',
			{
				direction: direction === 'horizontal' ?
					(goNext ? 'right' : 'left') : (goNext ? 'down' : 'up'),
				easing: this.options.easing || 'easeOutBack',
				duration: this.options.duration
			},

			function () {
				while (newContent.parent().is('.wijmo-wijcalendar-multi-aniwrapper')) {
					newContent.parent().replaceWith(newContent);
				}

				newContent.replaceWith(newContent.contents());
				calendar.element.height('');
				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
				calendar._trigger('afterSlide');
			});
		},

		_playSlideAnimation: function (toDate) {
			if (!this._isSingleMonth()) {
				return;
			}

			var self = this,
				date = this.getDisplayDate(),
				curTable = this.element.find('.ui-datepicker-calendar'),
				wrapper, slideContainer,
				yearStep = 1,
				direction = this.options.direction || 'horizontal',
				goNext = toDate > date,
				months = [], w, h;

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				wrapper = curTable.parent();
			} else {
				wrapper = $.effects.createWrapper(curTable).css({ overflow: 'hidden' });
				wrapper.removeClass('ui-effects-wrapper');
				wrapper.addClass('wijmo-wijcalendar-aniwrapper');
			}

			if (wrapper.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				slideContainer = wrapper.parent();
			} else {
				slideContainer = $.effects.createWrapper(wrapper)
					.css({ overflow: 'hidden' });
				slideContainer.removeClass('ui-effects-wrapper');
				slideContainer.addClass('wijmo-wijcalendar-aniwrapper');
			}

			if (this._myGrid) {
				switch (this._myGrid.gridType) {
				case "month":
					yearStep = 1;
					break;
				case "year":
					yearStep = 10;
					break;
				case "decade":
					yearStep = 100;
					break;
				}
			}

			months[months.length] = toDate;
			w = curTable.outerWidth();
			h = curTable.outerHeight();

			if (direction === 'horizontal') {
				curTable.width(w).css('float', goNext ? 'left' : 'right');
				wrapper.width((months.length + 1) * w);
				wrapper.css('left', goNext ? 0 : -months.length * w)
					.css('position', 'absolute');
			} else {
				wrapper.width(w);
				wrapper.css('top', goNext ? 0 : -months.length * h)
					.css('position', 'absolute');
				wrapper.height((months.length + 1) * h);
			}

			$.each(months, function (index, date) {
				if (self._myGrid === undefined) {
					var mv = new wijMonthView(self, date),
						$view = self._customize(mv.getHtml(true));
					if (direction === 'horizontal') {
						$view.width(w).css('float', goNext ? 'left' : 'right')
							.appendTo(wrapper);
					} else {
						$view.appendTo(wrapper);
					}
				} else {
					if (direction === 'horizontal') {
						$(self._myGrid.getHtml(date, true)).width(w).height(h)
							.css('float', goNext ? 'left' : 'right').appendTo(wrapper);
					} else {
						$(self._myGrid.getHtml(date, true)).height(h).appendTo(wrapper);
					}
				}
			});

			this.options.displayDate = toDate;
			if (this._myGrid === undefined) {
				this._createMonthViews();
			}
			this._refreshTitle();

			this.element.data('animating.wijcalendar', true);
			wrapper.effect('slide',
			{
				mode: 'hide',
				direction: direction === 'horizontal' ? (goNext ? 'left' : 'right') :
					(goNext ? 'up' : 'down'),
				easing: this.options.easing || 'easeOutBack',
				distance: (direction === 'horizontal' ? w : h) * months.length,
				duration: this.options.duration
			},

			function () {
				curTable = wrapper.children(':last');
				while (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					curTable.parent().replaceWith(curTable);
				}
				curTable.css({ 'float': '', 'width': '' });
				self._bindEvents();
				self.element.data('animating.wijcalendar', false);
				self._trigger('afterSlide');
			});
		},

		_onTitleClicked: function () {
			if (!this.options.allowQuickPick || !this._isSingleMonth()) {
				return;
			}
			if (this._isAnimating()) {
				return;
			}

			if (this._myGrid === undefined) {
				this._myGrid = new wijMyGrid(this);
			}
			else {
				switch (this._myGrid.gridType) {
				case "month":
					this._myGrid.gridType = "year";
					break;

				case "year":
					this._myGrid.gridType = "decade";
					break;

				case "decade":
					return;
				}
			}

			this._refreshTitle();
			this.element.width(this.element.width()).height(this.element.height());

			var curTable = this.element.find('.ui-datepicker-calendar'),
				wrapper, container, nextTable,
				w = curTable.outerWidth(),
				h = curTable.outerHeight(),
				selIndex, row, col, toWidth, toHeight,
				toBounds,
				calendar = this;

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				wrapper = curTable.parent();
			} else {
				wrapper = $.effects.createWrapper(curTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper');
			}

			if (wrapper.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				container = wrapper.parent();
			} else {
				container = $.effects.createWrapper(wrapper).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
			}

			nextTable = $(this._myGrid.getHtml(true))
				.css({ position: 'absolute', top: 0, left: 0, opacity: 0 })
				.appendTo(container)
				.height(h);

			selIndex = this._myGrid.getSelectedIndex();
			row = Math.floor(selIndex / 4);
			col = selIndex - (row * 4);

			toWidth = w / 4;
			toHeight = h / 3;

			toBounds = {
				left: toWidth * col,
				top: toHeight * row,
				width: toWidth,
				height: toHeight
			};

			curTable.width("100%").height("100%");
			wrapper.css({ border: 'solid 1px #cccccc' });

			this.element.data('animating.wijcalendar', true);

			wrapper.effect('size',
			{
				to: toBounds,
				duration: this.options.duration || 500
			},
			function () {
				wrapper.remove();
			}
		);

			nextTable.animate(
			{
				opacity: 1
			},
			this.options.duration || 500,
			function () {
				nextTable.css({ position: '', top: '', left: '', filter: '' });
				while (nextTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					nextTable.parent().replaceWith(nextTable);
				}

				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);
		},

		_onMyGridClicked: function (e) {
			if (this._myGrid === undefined) {
				return false;
			}
			if (this._isAnimating()) {
				return false;
			}

			var cell = $(e.currentTarget),
				index = parseInt(cell.attr('index'), 10),
				value = parseInt(cell.attr('value'), 10),
				curTable = this.element.find('.ui-datepicker-calendar'),
				wrapper, container, w, h, bounds,
				$content, date, mv, nextTable,
				calendar = this;
			if (this._myGrid.gridType !== "month") {
				if (!index || index === 11) {
					return false;
				}
			}

			if (!cell.hasClass('ui-state-active')) {
				this._myGrid.select(index, value);
			}

			if (this._myGrid.gridType === "decade") {
				this._myGrid.gridType = "year";
			}
			else {
				if (this._myGrid.gridType === "year") {
					this._myGrid.gridType = "month";
				}
				else {
					this._myGrid = undefined;
				}
			}

			this._refreshTitle();

			w = curTable.outerWidth();
			h = curTable.outerHeight();

			if (curTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
				container = curTable.parent();
			} else {
				container = $.effects.createWrapper(curTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
			}

			bounds = $.extend({}, cell.position(),
				{ width: cell.width(), height: cell.height() });
			if (this._myGrid === undefined) {
				this._createMonthViews();
				date = this.getDisplayDate();
				mv = this._getMonthView(date);
				$content = this._customize(mv.getHtml(true));
			} else {
				$content = $(this._myGrid.getHtml(true));
			}

			nextTable = $content.height(h).appendTo(container);
			wrapper = $.effects.createWrapper(nextTable).css({ overflow: 'hidden' })
				.removeClass('ui-effects-wrapper')
				.addClass('wijmo-wijcalendar-aniwrapper')
				.css($.extend(bounds, {
					border: 'solid 1px #cccccc',
					position: 'absolute'
				}));

			this.element.data('animating.wijcalendar', true);
			wrapper.animate(
			{
				left: 0,
				top: 0,
				width: w,
				height: h
			},
			this.options.duration || 500,
			function () {
				nextTable.css("width", "");
			}
		);

			curTable.animate(
			{
				opacity: 0
			},
			this.options.duration || 500,
			function () {
				curTable.remove();

				while (nextTable.parent().is('.wijmo-wijcalendar-aniwrapper')) {
					nextTable.parent().replaceWith(nextTable);
				}

				if (calendar._myGrid === undefined) {
					calendar.element.width('').height('');
				}

				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);

			return false;
		},

		_onMyGridMouseEnter: function (e) {
			if (this._myGrid === undefined) {
				return;
			}

			var cell = $(e.currentTarget),
				index = parseInt(cell.attr('index'), 10);
			if (this._myGrid.gridType !== "month" && (index < 0 || index > 11)) {
				return;
			}
			cell.addClass("ui-state-hover");
		},

		_onMyGridMouseLeave: function (e) {
			if (this._myGrid === undefined) {
				return;
			}

			var cell = $(e.currentTarget),
				index = parseInt(cell.attr('index'), 10);
			if (this._myGrid.gridType !== "month" && (index < 0 || index > 11)) {
				return;
			}
			cell.removeClass("ui-state-hover");
		},

		_bindEvents: function () {
			if (!this.element.data('preview.wijcalendar') &&
					!this.options.disabledState && !this.options.disabled) {
				this.element.find('div .wijmo-wijcalendar-navbutton')
						.unbind().bind('mouseout.wijcalendar', function () {
							var el = $(this);
							el.removeClass('ui-state-hover');
							if (el.hasClass('ui-datepicker-next-hover')) {
								el.removeClass('ui-datepicker-next-hover');
							} else if (el.hasClass('ui-datepicker-prev-hover')) {
								el.removeClass('ui-datepicker-prev-hover');
							}
						}).bind('mouseover.wijcalendar', function () {
							var el = $(this);
							el.addClass('ui-state-hover');
							if (el.hasClass('ui-datepicker-next')) {
								el.addClass('ui-datepicker-next-hover');
							} else if (el.hasClass('ui-datepicker-prev')) {
								el.addClass('ui-datepicker-prev-hover');
							}
						}).bind('click.wijcalendar',
							$.proxy(this._onNavButtonClicked, this));

				this.element.unbind(".wijcalendar").bind({
					"mouseup.wijcalendar": $.proxy(this._onMouseUp, this)
				});

				this.element.find(".ui-datepicker-title").unbind()
						.bind('mouseout.wijcalendar', function () {
							$(this).removeClass('ui-state-hover');
						}).bind('mouseover.wijcalendar', function () {
							$(this).addClass('ui-state-hover');
						}).bind('click.wijcalendar', $.proxy(this._onTitleClicked, this));

				this.element.find(".wijmo-wijcalendar-prevpreview-button, " +
						".wijmo-wijcalendar-nextpreview-button")
					.unbind('mouseenter.wijcalendar')
					.unbind('mouseleave.wijcalendar').bind({
						"mouseenter.wijcalendar":
							$.proxy(this._onPreviewMouseEnter, this),
						"mouseleave.wijcalendar":
							$.proxy(this._onPreviewMouseLeave, this)
					});

				if (this._myGrid === undefined) {
					this.element.find(".wijmo-wijcalendar-day-selectable").unbind().bind({
						"click.wijcalendar": $.proxy(this._onDayClicked, this),
						"mouseenter.wijcalendar": $.proxy(this._onDayMouseEnter, this),
						"mouseleave.wijcalendar": $.proxy(this._onDayMouseLeave, this),
						"mousedown.wijcalendar": $.proxy(this._onDayMouseDown, this),
						"dragstart.wijcalendar": $.proxy(this._onDayDragStart, this)
					});
					if (!!this.options.selectionMode.month) {
						this.element.find(".wijmo-wijcalendar-monthselector").unbind()
							.bind({
								"click.wijcalendar":
								$.proxy(this._onMonthSelectorClicked, this),
								"mouseenter.wijcalendar":
								$.proxy(this._onMonthSelectorMouseEnter, this),
								"mouseleave.wijcalendar":
								$.proxy(this._onMonthSelectorMouseLeave, this)
							});
					}
					if (!!this.options.selectionMode.weekDay) {
						this.element.find(".ui-datepicker-week-day").unbind().bind({
							"click.wijcalendar": $.proxy(this._onWeekDayClicked, this),
							"mouseenter.wijcalendar":
								$.proxy(this._onWeekDayMouseEnter, this),
							"mouseleave.wijcalendar":
								$.proxy(this._onWeekDayMouseLeave, this)
						});
					}
					if (!!this.options.selectionMode.weekNumber) {
						this.element.find(".wijmo-wijcalendar-week-num").unbind().bind({
							"click.wijcalendar": $.proxy(this._onWeekNumberClicked, this),
							"mouseenter.wijcalendar":
								$.proxy(this._onWeekNumberMouseEnter, this),
							"mouseleave.wijcalendar":
								 $.proxy(this._onWeekNumberMouseLeave, this)
						});
					}
				} else {
					this.element.find(".wijmo-wijcalendar-day-selectable").unbind().bind({
						"click.wijcalendar": $.proxy(this._onMyGridClicked, this),
						"mouseenter.wijcalendar": $.proxy(this._onMyGridMouseEnter, this),
						"mouseleave.wijcalendar": $.proxy(this._onMyGridMouseLeave, this)
					});
				}
			}
		},

		_isSelectable: function (dayType) {
			var o = this.options;
			return (o.showOtherMonthDays && (dayType & wijDayType.otherMonth)) ||
				!(dayType &
				(wijDayType.outOfRange | wijDayType.disabled | wijDayType.otherMonth));
		},

		_getCellClassName: function (dayType, date, previewMode) {
			var o = this.options,
				cssCell = '',
				cssText = 'ui-state-default',
				allowSelDay = (!!o.selectionMode.day || !!o.selectionMode.days);

			previewMode = previewMode || false;
			if (!previewMode && !o.disabledState && !o.disabled && allowSelDay &&
					this._isSelectable(dayType)) {
				cssCell += " wijmo-wijcalendar-day-selectable";
			}

			if ((dayType & wijDayType.weekEnd)) {
				cssCell += ' ui-datepicker-week-end';
			}
			if ((dayType & wijDayType.otherMonth)) {
				cssCell += ' ui-datepicker-other-month';
				cssText += ' ui-priority-secondary';
			}
			if ((dayType & wijDayType.outOfRange)) {
				cssCell += ' wijmo-wijcalendar-outofrangeday';
				cssText += ' ui-priority-secondary';
			}
			if ((dayType & wijDayType.gap)) {
				cssCell += ' wijmo-wijcalendar-gap';
			} else {
				if ((dayType & wijDayType.disabled)) {
					cssCell += ' ui-datepicker-unselectable';
					cssText += ' ui-state-disabled';
				}
				if ((dayType & wijDayType.today)) {
					cssCell += ' ui-datepicker-days-cell-over ui-datepicker-today';
					cssText += ' ui-state-highlight';
				}
				if ((dayType & wijDayType.selected) &&
				((dayType & (wijDayType.outOfRange | wijDayType.disabled)) === 0)) {
					cssCell += ' ui-datepicker-current-day';
					cssText += ' ui-state-active';
				}
				if ((dayType & wijDayType.gap)) {
					cssCell += ' wijmo-wijcalendar-gap';
				}
				if ((dayType & wijDayType.custom)) {
					cssCell += ' wijmo-wijcalendar-customday';
				}
			}

			return { cssCell: cssCell, cssText: cssText };
		},

		_onNavButtonClicked: function (e) {
			if (this._isAnimating()) {
				return false;
			}

			var step = 1,
				btnId = $(e.currentTarget).attr('id'),
				date = this.getDisplayDate(),
				nextDate = date;
			if (this._myGrid === undefined) {
				step = btnId.indexOf('quick') >= 0 ? this.options.quickNavStep : 1;
				step = btnId.indexOf('next') >= 0 ? step : -step;
				step = step * this.options.monthRows * this.options.monthCols;
				nextDate = wijDateOps.addMonths(date, step);
			}
			else {
				step = btnId.indexOf('next') >= 0 ? 1 : -1;
				switch (this._myGrid.gridType) {
				case "month":
					nextDate = wijDateOps.addYears(date, step);
					break;
				case "year":
					nextDate = wijDateOps.addYears(date, step * 10);
					break;
				case "decade":
					nextDate = wijDateOps.addYears(date, step * 100);
					break;
				}
			}

			this._slideToDate(nextDate);
			return false;
		},

		_getMonthGroupHtml: function () {
			var date = this.getDisplayDate(), mv, width, hw,
				r, c;
			if (this._isSingleMonth()) {
				mv = this._getMonthView(date);
				mv.showPreview = this.options.allowPreview &&
					!this.element.data('preview.wijcalendar');
				return mv.getHtml();
			}

			width = 100 / this.options.monthCols + '%';
			hw = new htmlTextWriter();
			for (r = 0; r < this.options.monthRows; r++) {
				for (c = 0; c < this.options.monthCols; c++) {
					hw.writeBeginTag('div');
					hw.writeAttribute('class', 'ui-datepicker-group' +
						(c === 0 ? ' ui-datepicker-group-first' : '') +
						(c === this.options.monthCols - 1 ?
						' ui-datepicker-group-last' : ''));
					hw.writeAttribute('style', 'width:' + width);
					hw.writeTagRightChar();
					mv = this._getMonthView(date);
					mv.showPreview = false;
					hw.write(mv.getHtml());
					hw.writeEndTag('div');
					date = wijDateOps.addMonths(date, 1);
				}

				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-row-break');
				hw.writeTagRightChar();
				hw.writeEndTag('div');
			}

			return hw.toString();
		},

		_getCalendarHtml: function () {
			this._createMonthViews();
			var hw = new htmlTextWriter();
			hw.write(this._getMonthGroupHtml());
			return hw.toString();
		},

		_customizeDayCell: function ($dayCell) {
			if ($dayCell.attr("state") === undefined) {
				$dayCell.attr("state", 'normal');
			}
			if ($dayCell.attr("daytype") === undefined) {
				return;
			}
			if ($dayCell.attr("date") === undefined) {
				return;
			}

			var dayType = parseInt($dayCell.attr("daytype"), 10),
				date = new Date($dayCell.attr("date")),
				hover = $dayCell.attr("state") === 'hover';

			this.options.customizeDate($dayCell, date, dayType, hover);
		},

		_customize: function (html) {
			var o = this.options, self = this, $h = $(html);
			if (!$.isFunction(o.customizeDate)) {
				return $h;
			}

			$.each($h.find('.wijmo-wijcalendar-day-selectable'),
					function (index, dayCell) {
						self._customizeDayCell($(dayCell));
					});

			return $h;
		},

		_createCalendar: function () {
			return this._customize($(this._getCalendarHtml()));
		},

		_createMonthGroup: function () {
			return this._customize($(this._getMonthGroupHtml()));
		},

		_getMonthID: function (date) {
			return date.getFullYear() + '_' + (date.getMonth() + 1);
		},

		_createMonthViews: function () {
			this._monthViews = {};
			var monthID = '',
				date = this.getDisplayDate(), row, col,
				mv, count;
			for (row = 0; row < this.options.monthRows; row++) {
				for (col = 0; col < this.options.monthCols; col++) {
					monthID = this._getMonthID(date);
					this._monthViews[monthID] = new wijMonthView(this, date);

					if (row === 0) {
						if (col === 0) {
							this._monthViews[monthID].isFirst = true;
						}

						if (col === this.options.monthCols - 1) {
							this._monthViews[monthID].isLast = true;
						}
					}
					date = wijDateOps.addMonths(date, 1);
				}
			}
			date = this.getDisplayDate();
			monthID = this._getMonthID(date);
			mv = this._monthViews[monthID];
			if (mv) {
				this._groupStartDate = mv.getStartDate();
			}
			count = this.options.monthRows * this.options.monthCols;
			if (count > 1) {
				date = wijDateOps.addMonths(date, count - 1);
				monthID = this._getMonthID(date);
				mv = this._monthViews[monthID];
			}
			if (mv) {
				this._groupEndDate = mv.getEndDate();
			}
		},

		_getMonthView: function (date) {
			var monthID = this._getMonthID(date);
			return this._monthViews[monthID];
		},

		_getId: function () {
			return this.element.attr("id");
		},

		_getChildElement: function (id) {
			var child = this.element.find('[id*=\'' + id + '\']');
			return child.length === 0 ? undefined : child;
		},

		_refreshDayCell: function (dayCell) {
			var $dc = $(dayCell),
				o = this.options,
				dayType, date, hover, txt;
			if ($dc.attr("state") === undefined) {
				$dc.attr("state", 'normal');
			}
			if ($dc.attr("daytype") === undefined) {
				return;
			}
			if ($dc.attr("date") === undefined) {
				return;
			}

			dayType = parseInt($dc.attr("daytype"), 10);
			date = new Date($dc.attr("date"));
			hover = $dc.attr("state") === 'hover';

			$dc.attr('class', this._getCellClassName(dayType, date).cssCell);
			$dc.removeAttr('aria-selected');
			if (dayType & wijDayType.selected) {
				$dc.attr('aria-selected', true);
			}

			if ($.isFunction(o.customizeDate)) {
				if (this._customizeDayCell($dc)) {
					return;
				}
			}

			txt = $dc.find('a');
			if (txt.length > 0) {
				txt.toggleClass("ui-state-hover", hover);
				txt.toggleClass("ui-state-active",
					((dayType & wijDayType.selected) !== 0));
			}
		},

		_isSingleMonth: function () {
			return this.options.monthCols * this.options.monthRows === 1;
		},

		_splitString: function (s, sep, count) {
			if (count === undefined) {
				return s.split(sep);
			}
			var ret = [],
				arr = s.split(sep), i;
			for (i = 0; i < arr.length; i++) {
				if (i >= count) {
					ret[count - 1] = ret[count - 1] + sep + arr[i];
				}
				else {
					ret.push(arr[i]);
				}
			}
			return ret;
		},

		_getNavButtonHtml: function (id, cls, imgClass, tooltip) {
			var hw = new htmlTextWriter();
			hw.writeBeginTag('a');
			hw.writeAttribute('id', id);
			hw.writeAttribute('class', cls);
			hw.writeAttribute('role', 'button');
			hw.writeAttribute('href', '#');
			if (tooltip) {
				hw.writeAttribute('title', tooltip);
				hw.writeAttribute('aria-label', tooltip);
			}
			hw.writeTagRightChar();
			hw.writeBeginTag('span');
			hw.writeAttribute('class', imgClass);
			hw.writeTagRightChar();
			if (tooltip) {
				hw.write(tooltip);
			}
			hw.writeEndTag('span');
			hw.writeEndTag('a');
			return hw.toString();
		},

		_getTitleText: function (monthDate) {
			if (this._myGrid !== undefined) {
				return this._myGrid.getTitle();
			} else {
				var d = monthDate || this.getDisplayDate(),
					f = this.options.titleFormat || 'MMMM yyyy';

				if ($.isFunction(this.options.title)) {
					return this.options.title(d, f) || this._formatDate(f, d);
				}

				return this._formatDate(f, d);
			}
		},

		_refreshTitle: function () {
			this.element.find('.ui-datepicker-title').html(this._getTitleText());
		},

		_fillTitle: function (hw, date) {
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-datepicker-title wijmo-wijcalendar-title' +
				' ui-state-default ui-corner-all');
			hw.writeTagRightChar();
			hw.write(this._getTitleText(date));
			hw.writeEndTag('div');
		},

		_getHeaderHtml: function (monthDate, prevButtons, nextButtons) {
			var previewMode = !!this.element.data('preview.wijcalendar'),
				buttons = previewMode ? 'none' : (this._isSingleMonth() ?
					this.options.navButtons : 'default'),
				isRTL = this.element.is('.ui-datepicker-rtl'),
				hw = new htmlTextWriter();
			if (buttons === 'quick') {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-widget-header wijmo-wijcalendar-header' +
					' ui-helper-clearfix ui-corner-all');
				hw.writeAttribute('role', 'heading');
				hw.writeTagRightChar();
				if (!!prevButtons) {
					hw.write(this._getNavButtonHtml('quickprev',
						'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all',
						'ui-icon ui-icon-seek-' + (isRTL ? 'next' : 'prev'),
						this.options.quickPrevTooltip.replace('#',
							this.options.quickNavStep)));
				}
				hw.writeBeginTag('div');
				hw.writeAttribute('class',
					'ui-datepicker-header wijmo-wijcalendar-header-inner');
				hw.writeTagRightChar();
				if (!!prevButtons) {
					hw.write(this._getNavButtonHtml('prev',
						'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all',
						'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'),
						this.options.prevTooltip));
				}
				this._fillTitle(hw, monthDate);
				if (!!nextButtons) {
					hw.write(this._getNavButtonHtml('next',
						'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all',
						'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'),
						this.options.nextTooltip));
				}
				hw.writeEndTag('div');
				if (!!nextButtons) {
					hw.write(this._getNavButtonHtml('quicknext',
						'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all',
						'ui-icon ui-icon-seek-' + (isRTL ? 'prev' : 'next'),
						this.options.quickNextTooltip.replace('#',
							this.options.quickNavStep)));
				}
				hw.writeEndTag('div');
			} else {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-header ui-widget-header' +
					' ui-datepicker-header ui-helper-clearfix ui-corner-all');
				hw.writeAttribute('role', 'heading');
				hw.writeTagRightChar();

				if (buttons !== 'none' && !!prevButtons) {
					hw.write(this._getNavButtonHtml('prev',
						'wijmo-wijcalendar-navbutton ui-datepicker-prev ui-corner-all',
						'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'),
						this.options.prevTooltip));
				}
				this._fillTitle(hw, monthDate);

				if (buttons !== 'none' && !!nextButtons) {
					hw.write(this._getNavButtonHtml('next',
						'wijmo-wijcalendar-navbutton ui-datepicker-next ui-corner-all',
						'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'),
						this.options.nextTooltip));
				}
				hw.writeEndTag('div');
			}

			return hw.toString();
		},

		_formatDate: function (format, date) {
			if (!wijDateOps.getTicks(date)) {
				return '&nbsp;';
			}

			return Globalize.format(date, format, this._getCulture());
		}
	});



	var htmlTextWriter = function () {
		this._html = [];
	};
	htmlTextWriter.prototype = {
		_html: null,
		writeTagLeftChar: function () {
			this._html[this._html.length] = '<';
		},
		writeTagRightChar: function () {
			this._html[this._html.length] = '>';
		},
		write: function (text) {
			this._html[this._html.length] = ' ' + text + ' ';
		},
		writeBeginTag: function (tagName) {
			this._html[this._html.length] = '<' + tagName;
		},
		writeEndTag: function (tagName) {
			this._html[this._html.length] = '</' + tagName + '>';
		},
		writeFullBeginTag: function (tagName) {
			this._html[this._html.length] = '<' + tagName + '>';
		},
		writeSelfClosingTagEnd: function () {
			this._html[this._html.length] = '/>';
		},
		writeAttribute: function (name, value) {
			if (value === undefined || value === null) {
				return;
			}
			this._html[this._html.length] = ' ' + name + '=\"';
			this._html[this._html.length] = value;
			this._html[this._html.length] = '\"';
		},
		clean: function () {
			this._html = [];
		},
		toString: function () {
			return this._html.join('');
		}
	};


	var wijDateOps = {
		addDays: function (date, days) {
			var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
			if (days) {
				if (dt.getDate() === date.getDate()) {
					dt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
					dt.setTime(dt.getTime() + (days * 24 * 3600 * 1000));
				}
			}
			return dt;
		},

		addMonths: function (date, months) {
			return new Date(date.getFullYear(), date.getMonth() + months, 1);
		},

		addYears: function (date, years) {
			return this.addMonths(date, years * 12);
		},

		getDate: function (date) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate());
		},

		getTicks: function (date) {
			return date.valueOf();
		},

		isSameDate: function (date1, date2) {
			return date1.getFullYear() === date2.getFullYear() &&
				date1.getMonth() === date2.getMonth() &&
					date1.getDate() === date2.getDate();
		},

		isSameMonth: function (date1, date2) {
			return date1.getFullYear() === date2.getFullYear() &&
				date1.getMonth() === date2.getMonth();
		},

		getDaysInMonth: function (date) {
			return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		},

		getWeekStartDate: function (date, firstDayOfWeek) {
			return new Date(date.getFullYear(), date.getMonth(),
				date.getDate() - ((date.getDay() - firstDayOfWeek + 7) % 7));
		},

		getDayOfYear: function (date) {
			var start = new Date(date.getFullYear(), 0, 1),
				distance = this.getTicks(date) - this.getTicks(start),
				days = distance / (24 * 60 * 60 * 1000);
			return Math.floor(days) + 1;
		},

		getFirstDayWeekOfYear: function (date, firstDayOfWeek) {
			var days = this.getDayOfYear(date) - 1,
				offset = date.getDay() - (days % 7),
				weeks;
			offset = ((offset - firstDayOfWeek) + 14) % 7;
			weeks = ((days + offset) / 7);
			return Math.floor(weeks) + 1;
		},

		getDayOfWeek: function (date, firstDayOfWeek) {
			return ((date.getDay() - firstDayOfWeek + 7) % 7);
		},

		getWeekOfYearFullDays: function (time, rule, firstDayOfWeek, fullDays) {
			var days = this.getDayOfYear(time) - 1,
				offset = (this.getDayOfWeek(time, firstDayOfWeek)) - (days % 7);
			offset = ((firstDayOfWeek - offset) + 14) % 7;
			if ((offset) && (offset >= fullDays)) {
				offset -= 7;
			}
			offset = days - offset;
			if (offset >= 0) {
				return (Math.floor(offset / 7) + 1);
			}
			return this.getWeekOfYearFullDays(this.addDays(time, -(days + 1)),
				rule, firstDayOfWeek, fullDays);
		},

		getWeekOfYear: function (date, rule, firstDayOfWeek) {
			switch (rule) {
			case "firstDay":
				return this.getFirstDayWeekOfYear(date, firstDayOfWeek);
			case "firstFullWeek":
				return this.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 7);
			case "firstFourDayWeek":
				return this.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 4);
			}
			return this.getFirstDayWeekOfYear(date, firstDayOfWeek);
		},

		getDateToken: function (date) {
			return date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate();
		}
	};


	var wijMonthView = function (calendar, displayDate) {
		this.calendar = calendar;

		if (displayDate === undefined ||
				wijDateOps.isSameDate(displayDate, new Date(1900, 0, 1))) {
			displayDate = new Date();
		}

		this.displayDate = displayDate;
		this.id = this.calendar._getId() + '_' + this.calendar._getMonthID(displayDate);
		this.isFirst = false;
		this.isLast = false;
		this.showPreview = false;
		this.culture = this.calendar._getCulture();
		this._calcDates(this.displayDate);
	};


	wijMonthView.prototype = {
		_calcDates: function (date) {
			var daysInMonth = wijDateOps.getDaysInMonth(date);
			this._startDateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
			this._endDateInMonth = wijDateOps.addDays(this._startDateInMonth,
				daysInMonth - 1);
			this._startDate = wijDateOps.getWeekStartDate(this._startDateInMonth,
				this.culture.calendar.firstDay);
			this._endDate = wijDateOps.addDays(this._startDate,
				this.calendar.options.dayRows * this.calendar.options.dayCols - 1);
		},

		_isFirstMonth: function () {
			var date = this.calendar.getDisplayDate();
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},

		_isLastMonth: function () {
			var date = this.calendar.getDisplayDate();
			date = new Date(date.getFullYear(), date.getMonth(), 1);
			date = wijDateOps.addMonths(date,
				this.calendar.options.monthCols * this.calendar.options.monthRows - 1);
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},

		getStartDate: function () {
			return this._startDate;
		},

		getEndDate: function () {
			return this._endDate;
		},

		_getMonthDate: function () {
			if (this._startDateInMonth === undefined) {
				this._calcDates(this.getDisplayDate());
			}
			return this._startDateInMonth;
		},

		_setMonthDate: function (date) {
			this._calcDates(date);
		},

		_getWeekDayText: function (day, format) {
			format = format || "short";
			var days = this.culture.calendar.days,
				text = '';
			switch (format) {
			case "full":
				text = days.names[day];
				break;
			case "firstLetter":
				text = days.names[day].substring(0, 1);
				break;
			case "abbreviated":
				text = days.namesAbbr[day];
				break;
			default:
				text = days.namesShort[day];
				break;
			}
			return text;
		},

		_getRowCount: function () {
			var o = this.calendar.options;
			return o.showWeekDays ? o.dayRows + 1 : o.dayRows;
		},

		_getColCount: function () {
			var o = this.calendar.options;
			return o.showWeekNumbers ? o.dayCols + 1 : o.dayCols;
		},

		_getDayType: function (date) {
			var o = this.calendar.options,
			dayType = wijDayType.general,
			dow = date.getDay(),
			weekEnd = dow === 6 || dow === 0, // Saturday or Sunday
			outOfRange = date < o.minDate || date > o.maxDate,
			otherMonth = date < this._startDateInMonth || date > this._endDateInMonth,
			isDisabled = outOfRange || this.calendar._getDisabledDates().contains(date),
			isSelected = this.calendar._getSelectedDates().contains(date),
			today = new Date(),
			isToday = wijDateOps.isSameDate(date, today),
			isCustom = false;
			if (weekEnd) {
				dayType |= wijDayType.weekEnd;
			}
			if (isToday) {
				dayType |= wijDayType.today;
			}
			if (isDisabled) {
				dayType |= wijDayType.disabled;
			}
			if (otherMonth) {
				dayType |= wijDayType.otherMonth;
			}
			if (outOfRange) {
				dayType |= wijDayType.outOfRange;
			}
			if (isSelected) {
				dayType |= wijDayType.selected;
			}
			if (isCustom) {
				dayType |= wijDayType.custom;
			}
			if (otherMonth && !o.showOtherMonthDays) {
				dayType |= wijDayType.gap;
			}
			return dayType;
		},

		_refreshDate: function (date) {
			if (date < this._startDate || date > this._endDate) {
				return;
			}
			var o = this.calendar.options,
				offset = (Math.floor(Math.abs(date - this._startDate) /
					(24 * 60 * 60 * 1000))),
				row = Math.floor(offset / this.calendar.options.dayCols),
				col = Math.floor(offset % this.calendar.options.dayCols),
				tbl, r, dayCell, dayType;
			if (o.showWeekNumbers) {
				col++;
			}
			if (o.showWeekDays) {
				row++;
			}

			tbl = $("#" + this.id, this.calendar.element).get(0);
			if (tbl) {
				if (row < tbl.rows.length) {
					r = tbl.rows[row];
					if (col < r.cells.length) {
						dayCell = r.cells[col];
						dayType = this._getDayType(date);
						$(dayCell).attr('daytype', dayType.toString());
						this.calendar._refreshDayCell(dayCell);
					}
				}
			}
		},

		_fillDayCell: function (hw, date, previewMode) {
			var o = this.calendar.options,
				custom = null,
				text = date.getDate().toString(),
				tooltip = this.calendar._formatDate(o.toolTipFormat ||
					"dddd, MMMM dd, yyyy", date),
				dayType = this._getDayType(date),
				selectable = this.calendar._isSelectable(dayType),
				css = this.calendar._getCellClassName(dayType, date, previewMode);

			text = (o.showDayPadding && text.length === 1) ? '0' + text : text;

			hw.writeBeginTag('td');
			hw.writeAttribute('daytype', (dayType).toString());
			if (selectable) {
				hw.writeAttribute('title', tooltip);
				hw.writeAttribute('aria-label', tooltip);
			}
			hw.writeAttribute('date', date.toDateString());
			hw.writeAttribute('class', css.cssCell);
			hw.writeAttribute('role', 'gridcell');
			if (!selectable) {
				hw.writeAttribute('aria-disabled', 'true');
			}
			hw.writeTagRightChar();

			if ((dayType & wijDayType.gap)) {
				hw.write('&#160;');
			} else {
				if (custom && custom.content) {
					hw.write(custom.content);
				} else {
					hw.writeBeginTag('a');
					hw.writeAttribute('class', css.cssText);
					hw.writeAttribute('href', '#');
					hw.writeAttribute('onclick', 'return false;');
					hw.writeTagRightChar();
					hw.write(text);
					hw.writeEndTag('a');
				}
			}

			hw.writeEndTag('td');
		},

		getHtml: function (tableOnly) {
			tableOnly = !!tableOnly;
			var o = this.calendar.options,
				previewMode = !!this.calendar.element.data('preview.wijcalendar'),
				hw = new htmlTextWriter(), i, j,
				dayOfWeek, weekStartDate, weekEnd, colIndex, txt, fullTxt,
				date, wnDate, rowIndex, weekNumber;

			if (!tableOnly && o.showTitle) {
				hw.write(this.calendar._getHeaderHtml(this._startDateInMonth,
					this.isFirst, this.isLast));
			}

			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'wijmo-wijcalendar-prevpreview-button');
				hw.writeAttribute('role', 'button');
				hw.writeAttribute('aria-haspopup', 'true');
				hw.writeAttribute('id', 'prevPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.prevPreviewTooltip);
				hw.writeAttribute('aria-label', o.prevPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}

			hw.writeBeginTag('table');
			hw.writeAttribute('id', this.id);
			hw.writeAttribute('class', 'ui-datepicker-calendar wijmo-wijcalendar-table');
			hw.writeAttribute('role', 'grid');
			hw.writeAttribute('summary',
				this.calendar._getTitleText(this._startDateInMonth));
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			if (o.showWeekDays) {
				hw.writeFullBeginTag('thead');
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_ms');
					hw.writeAttribute('class',
						'ui-datepicker-week-col wijmo-wijcalendar-monthselector' +
						(!!o.selectionMode.month ? ' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'columnheader');
					hw.writeTagRightChar();

					if (!!o.selectionMode.month && !previewMode 
							&& !o.disabledState && !o.disabled) {
						hw.writeBeginTag('a');
						hw.writeAttribute('class', 'ui-icon ui-icon-triangle-1-se');
						hw.writeSelfClosingTagEnd();
					} else {
						hw.write('Wk');
					}

					hw.writeEndTag('th');
				}

				dayOfWeek = this._startDate.getDay();
				weekStartDate = this._startDate;
				for (i = 0; i < o.dayCols; i++) {
					weekEnd = dayOfWeek === 6 || dayOfWeek === 0;
					colIndex = i + ((o.showWeekNumbers) ? 1 : 0);
					txt = this._getWeekDayText(dayOfWeek, o.weekDayFormat);
					fullTxt = this._getWeekDayText(dayOfWeek, "full");
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_cs_' + colIndex);
					hw.writeAttribute('class', 'ui-datepicker-week-day' +
						(weekEnd ? ' ui-datepicker-week-end' : '') +
						(!!o.selectionMode.weekDay ?
						' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'columnheader');
					hw.writeTagRightChar();

					hw.writeBeginTag('span');
					hw.writeAttribute('title', fullTxt);
					hw.writeAttribute('aria-label', fullTxt);
					hw.writeTagRightChar();
					hw.write(txt);
					hw.writeEndTag('span');

					hw.writeEndTag('th');
					dayOfWeek = ((dayOfWeek + 1) % 7);
					weekStartDate = wijDateOps.addDays(weekStartDate, 1);
				}
				hw.writeEndTag('tr');
				hw.writeEndTag('thead');
			}

			hw.writeFullBeginTag('tbody');
			date = this._startDate;
			wnDate = this._startDateInMonth;
			for (i = 0; i < o.dayRows; i++) {
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					rowIndex = i + ((o.showWeekDays) ? 1 : 0);
					hw.writeBeginTag('td');
					hw.writeAttribute('id', this.id + '_rs_' + rowIndex);
					hw.writeAttribute('class',
						'ui-datepicker-week-col wijmo-wijcalendar-week-num' +
						(!!o.selectionMode.weekNumber ?
						' wijmo-wijcalendar-selectable' : ''));
					hw.writeAttribute('role', 'rowheader');
					hw.writeTagRightChar();
					weekNumber = wijDateOps.getWeekOfYear(wnDate,
						o.calendarWeekRule, this.culture.calendar.firstDay);
					hw.write(weekNumber);
					hw.writeEndTag('td');
					wnDate = wijDateOps.addDays(wnDate, o.dayCols);
				}
				for (j = 0; j < o.dayCols; j++) {
					this._fillDayCell(hw, date, previewMode);
					date = wijDateOps.addDays(date, 1);
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('tbody');
			hw.writeEndTag('table');

			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'wijmo-wijcalendar-nextpreview-button');
				hw.writeAttribute('role', 'button');
				hw.writeAttribute('aria-haspopup', 'true');
				hw.writeAttribute('id', 'nextPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.nextPreviewTooltip);
				hw.writeAttribute('aria-label', o.nextPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}

			return hw.toString();
		}
	};


	var wijDateCollection = function (calendar, optionName) {
		this._calendar = calendar;
		this._optionName = optionName;
		this._normalize();
	};

	wijDateCollection.prototype = {
		_calendar: null,
		_optionName: 'selectedDates',

		getDates: function () {
			if (this._calendar.options[this._optionName] === undefined) {
				this._calendar.options[this._optionName] = [];
			}

			return this._calendar.options[this._optionName];
		},

		setDates: function (dates) {
			this._calendar.options[this._optionName] = dates;
			this._normalize();
		},

		getCount: function () {
			return this.getDates().length;
		},

		clear: function () {
			this.setDates([]);
		},

		add: function (date) {
			this.addRange(date, date);
		},

		remove: function (date) {
			this.removeRange(date, date);
		},

		indexOf: function (date) {
			if (!this.getCount()) {
				return -1;
			}
			return this._findRangeBound(date, true, false);
		},

		contains: function (date) {
			return this.indexOf(date) !== -1;
		},

		removeRange: function (start, end) {
			if (!this.getCount()) {
				return;
			}
			var startIndex = this._findRangeBound(start, false, true),
				endIndex = this._findRangeBound(end, false, false),
				dates, startSlice, endSlice;
			if (startIndex < 0 || endIndex < 0) {
				return;
			}
			if (startIndex > endIndex) {
				return;
			}
			dates = this.getDates();
			if (dates[endIndex] > end) {
				return;
			}
			startSlice = (!startIndex) ? [] : dates.slice(0, startIndex);
			endSlice = endIndex >= (dates.length - 1) ? [] :
				dates.slice(endIndex + 1);
			this.setDates(startSlice.concat(endSlice));
		},

		addRange: function (start, end) {
			this.removeRange(start, end);
			var dates = this.getDates(),
				insertIndex = this._findRangeBound(start, false, true),
				startSlice = (!insertIndex) ? [] : dates.slice(0, insertIndex),
				endSlice = dates.slice(insertIndex),
				midSlice = [],
				curDate;
			start = wijDateOps.getDate(start);
			end = wijDateOps.getDate(end);
			for (curDate = start; curDate <= end;
					curDate = wijDateOps.addDays(curDate, 1)) {
				midSlice[midSlice.length] = curDate;
			}
			this.setDates(startSlice.concat(midSlice.concat(endSlice)));
		},

		_findRangeBound: function (date, exact, isStart) {
			var dates = this.getDates(),
							low = 0,
							hi = dates.length,
							index;
			while (low < hi) {
				index = (low + hi) >> 1;
				if (wijDateOps.isSameDate(date, dates[index])) {
					return index;
				}
				if (date < dates[index]) {
					hi = index;
				}
				else {
					low = index + 1;
				}
			}
			if (exact) {
				return -1;
			}
			return (isStart) ? low : hi;
		},

		_parseDate: function (date) {
			var strDate;
			if (!date) {
				date = new Date();
			} else {
				if (typeof date === 'string') {
					strDate = date;
				}
			}

			if (strDate) {
				strDate = strDate.replace(/-/g, '/');

				try {
					date = new Date(strDate);
					if (isNaN(date)) {
						date = new Date();
					}
				}
				catch (e) {
					date = new Date();
				}
			}

			return date;
		},

		_normalize: function () {
			//Normalize the array
			var dates = this._calendar.options[this._optionName],
				self = this, newDates;
			if ($.isArray(dates)) {
				newDates = $.map(dates, function (d, i) {
					return self._parseDate(d);
				});

				this._calendar.options[this._optionName] = newDates.sort(function (a, b) {
					return a.getTime() - b.getTime();
				});
			}
		}
	};

	var wijMyGrid = function (calendar) {
		this.gridType = "month";
		this.calendar = calendar;
		this.culture = calendar._getCulture();
	};

	wijMyGrid.prototype = {
		gridType: "month",
		calendar: null,
		culture: undefined,

		select: function (index, value) {
			var date = this.calendar.getDisplayDate();
			switch (this.gridType) {
			case "month":
				date.setMonth(value);
				break;
			case "year":
				date.setFullYear(value);
				break;
			case "decade":
				date.setFullYear(value);
				break;
			}

			this.calendar.options.displayDate = date;
		},

		getSelectedIndex: function () {
			var date = this.calendar.getDisplayDate(),
				year = date.getFullYear(),
				startYear = Math.floor(year / 10) * 10 - 1,
				startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
			case "month":
				return date.getMonth();
			case "year":
				return year - startYear;
			case "decade":
				return Math.floor((year - startDecade) / 10);
			}
			return 0;
		},

		getTitle: function () {
			var date = this.calendar.getDisplayDate(),
					year = date.getFullYear(),
					startYear = Math.floor(year / 10) * 10 - 1,
					startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
			case "month":
				return year.toString();
			case "year":
				return (startYear + 1) + " - " + (startYear + 10);
			case "decade":
				return (startDecade + 10) + " - " + (startDecade + 109);
			}
			return '';
		},

		getHtml: function (date, tableOnly) {
			if (date === undefined) {
				date = this.calendar.getDisplayDate();
			} else {
				if (typeof (date) === 'boolean') {
					tableOnly = date;
					date = this.calendar.getDisplayDate();
				}
			}

			tableOnly = !!tableOnly;
			var o = this.calendar.options,
				rows = 3, cols = 4,
				hw = new htmlTextWriter(),
				height, year, startMonth, startYear, startDecade,
				ms, i, j,
				index, selected, outofRange, cellText, v, cls;
			if (o.showTitle && !tableOnly) {
				hw.write(this.calendar._getHeaderHtml(null, true, true));
			}

			height = 100 / rows + '%';
			height = '30%';
			hw.writeBeginTag('table');
			hw.writeAttribute('class', 'ui-datepicker-calendar wijmo-wijcalendar-mygrid');
			hw.writeAttribute('role', 'grid');
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			year = date.getFullYear();
			startMonth = date.getFullYear() * 12;
			startYear = Math.floor(year / 10) * 10 - 1;
			startDecade = Math.floor(year / 100) * 100 - 10;
			ms = this.culture.calendar.months;


			for (i = 0; i < rows; i++) {
				hw.writeBeginTag('tr');
				hw.writeAttribute('height', height);
				hw.writeTagRightChar();
				for (j = 0; j < cols; j++) {
					index = i * 4 + j;
					selected = false;
					outofRange = false;
					cellText = '';
					v = null;
					switch (this.gridType) {
					case "month":
						if (date.getMonth() === index) {
							selected = true;
						}
						v = index;
						cellText = ms.namesAbbr[index];
						outofRange = ((startMonth + index) <
					(o.minDate.getFullYear() * 12 + o.minDate.getMonth())) ||
					((startMonth + index) >
					(o.maxDate.getFullYear() * 12 + o.maxDate.getMonth()));
						break;
					case "year":
						if (index === 0 || index === 11) {
							outofRange = true;
						}
						v = startYear + index;
						if (v < o.minDate.getFullYear() || v > o.maxDate.getFullYear()) {
							outofRange = true;
						} else {
							selected = (year === v);
						}
						cellText = v.toString();
						break;
					case "decade":
						if (index === 0 || index === 11) {
							outofRange = true;
						}
						v = startDecade + index * 10;
						if (v + 10 < o.minDate.getFullYear() ||
						v > o.maxDate.getFullYear()) {
							outofRange = true;
						} else {
							selected = (year >= v && year < (v + 10));
						}
						cellText = v.toString() + '-<br/>' + (v + 9).toString();
						break;
					}

					cls = 'ui-datepicker-week-day';
					if (outofRange) {
						cls = cls + ' ui-datepicker-other-month ' +
							'ui-priority-secondary ui-datepicker-unselectable';
					} else {
						if (!o.disabledState && !o.disabled) {
							cls += " wijmo-wijcalendar-day-selectable";
						}
					}

					cls += " " + 'ui-state-default' +
						(outofRange ? ' ui-state-disabled' : '') +
						(selected ? ' ui-state-active ui-state-highlight' : '');

					hw.writeBeginTag('td');
					hw.writeAttribute('class', cls);
					hw.writeAttribute('role', 'gridcell');
					//hw.writeAttribute('width', width);
					hw.writeAttribute('index', index.toString());
					hw.writeAttribute('value', v.toString());
					hw.writeAttribute('other', outofRange.toString());
					hw.writeTagRightChar();

					hw.writeBeginTag('a');
					hw.writeAttribute('href', '#');
					hw.writeTagRightChar();
					hw.write(cellText);
					hw.writeEndTag('a');
					hw.writeEndTag('td');
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('table');
			return hw.toString();
		}
	};


} (jQuery));
