/*
*
* Wijmo KnockoutJS Binding Library 2.1.1
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://wijmo.com/license
*
*
* * Wijmo KnockoutJS Binding Factory.
*
* Depends:
*  knockoutjs.js
*
*/
(function ($, ko) {

    //extend ko.numericObservable
    ko.numericObservable = function (initialValue) {
        var _actual = ko.observable(initialValue);

        var result = ko.dependentObservable({
            read: function () {
                return _actual();
            },
            write: function (newValue) {
                var parsedValue = parseFloat(newValue);
                _actual(isNaN(parsedValue) ? newValue : parsedValue);
            }
        });

        return result;
    };

    ko.wijmo = ko.wijmo || {};

    ko.wijmo.customBindingFactory = function () {
        var self = this,
        updatingFromEvents = false,
        updatingFromOtherObservables = false;

        self.customBinding = function (options) {
            var binding = {},
                widgetName = options.widgetName,
                widget;

            binding.init = function (element, valueAccessor, allBindingAccessor, viewModel) {
                //element: The DOM element involved in this binding
                //valueAccessor: A JavaScript function that you can call to get the current model property 
                //	that is involved in this binding. Call this without passing any parameters 
                //	(i.e., call valueAccessor()) to get the current model property value.
                //allBindingsAccessor: A JavaScript function that you can call to get all the model properties 
                //	bound to this DOM element. Like valueAccessor, call it without any parameters to get the 
                //	current bound model properties.
                //viewModel: The view model object that was passed to ko.applyBindings. 
                //	Inside a nested binding context, this parameter will be set to the current data item 
                //	(e.g., inside a with: person binding, viewModel will be set to person).
                var va = ko.utils.unwrapObservable(valueAccessor()),
                    opts;
                //init widget
                var opts = ko.toJS(va);
                widget = $(element)[widgetName](opts).data(widgetName);

                $.each(va, function (key, value) {
                    if (!options.observableOptions || !options.observableOptions[key]) {
                        return true;
                    }
                    var observableOption = options.observableOptions[key],
                        optType = observableOption.type;
                    if (!ko.isObservable(value)) {
                        return true;
                    }
                    //attach event.
                    var attachEvents = observableOption.attachEvents;
                    if (attachEvents) {
                        $.each(attachEvents, function (idx, ev) {
                            ko.utils.registerEventHandler(element, widgetName + ev.toLowerCase(), function () {
                                if (updatingFromOtherObservables) {
                                    return;
                                }
                                updatingFromEvents = true;

                                if ($.isFunction(observableOption.onChange)) {
                                    observableOption.onChange.call(observableOption, widget, value, arguments);
                                } else {
                                    var newVal = $(element)[widgetName]("option", key);

                                    //TODO: If newVal is reference type, we should extend it before assignment
                                    value(newVal);
                                }

                                updatingFromEvents = false;
                            });
                        });
                    }
                });
            };

            binding.update = function (element, valueAccessor, allBindingAccessor, viewModel) {
                //element: The DOM element involved in this binding
                //valueAccessor: A JavaScript function that you can call to get the current model property 
                //	that is involved in this binding. Call this without passing any parameters 
                //	(i.e., call valueAccessor()) to get the current model property value.
                //allBindingsAccessor: A JavaScript function that you can call to get all the model properties 
                //	bound to this DOM element. Like valueAccessor, call it without any parameters to get the 
                //	current bound model properties.
                //viewModel: The view model object that was passed to ko.applyBindings. 
                //	Inside a nested binding context, this parameter will be set to the current data item 
                //	(e.g., inside a with: person binding, viewModel will be set to person).

                var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
                $.each(valueUnwrapped, function (key, value) {
                    //The observable can be used like following: style: { width: percentMax() * 100 + '%' },
                    //the style.width is not an observable value and cannot be observed in ko.computed.
                    //So we need to check if the value is updated in binding.update.
                    var observableOption = options.observableOptions[key];
                    if (observableOption) {
                        var optType = observableOption.type;
                        val = ko.toJS(ko.utils.unwrapObservable(value)),
                        widgetVal = $(element)[widgetName]("option", key);

                        if (optType && optType === 'numeric') {
                            var parsedVal = parseFloat(val);
                            val = isNaN(parsedVal) ? val : parsedVal;
                        }
                        if (!equals(val, widgetVal)) {
                            updateOptions(element, widgetName, key, val);
                        }
                    }

                });
            };

            executeOptions = function (element, widgetName) {
                var data = $(element).data(widgetName + '_ko'), hash = (data) ? data : {};
                if (!$.isEmptyObject(hash)) {
                    $(element).data(widgetName + '_ko', 0);
                    for (var key in hash) {
                        var val = hash[key];
                        $(element)[widgetName]("option", key, val);
                    }
                }
            };

            updateOptions = function (element, widgetName, key, val) {
                var data = $(element).data(widgetName + '_ko'), hash = (data) ? data : {};
                hash[key] = val;
                $(element).data(widgetName + '_ko', hash);
                setTimeout(function () {
                    updatingFromOtherObservables = true;
                    executeOptions(element, widgetName);
                    updatingFromOtherObservables = false;
                }, 100);

            };

            equals = function (sourceValue, targetValue) {
                var equal = false;
                if ((sourceValue === undefined) || (sourceValue === null)) {
                    return false;
                }
                if (sourceValue === targetValue) {
                    return true;
                }
                if ((targetValue === undefined) || (targetValue === null) || (sourceValue.constructor !== targetValue.constructor)) {
                    return false;
                }
                if ($.isPlainObject(sourceValue)) {
                    equal = true;
                    $.each(sourceValue, function (key, val) {
                        if (typeof targetValue[key] === 'undefined') {
                            equal = false;
                            return false;
                        }
                        if (!equals(val, targetValue[key])) {
                            equal = false;
                            return false;
                        }
                    });
                } else if ($.isArray(sourceValue)) {
                    if (sourceValue.length !== targetValue.length) {
                        return false;
                    }
                    equal = true;
                    $.each(sourceValue, function (idx, val) {
                        if (!equals(val, targetValue[idx])) {
                            equal = false;
                            return false;
                        }
                    });
                } else if (isDate(sourceValue)) {
                    return sourceValue == targetValue;
                }
                return equal;
            };

            isDate = function (obj) {
                if (!obj) {
                    return false;
                }
                return (typeof obj === 'object') && obj.constructor === Date;
            };

            ko.bindingHandlers[options.widgetName] = binding;
        };
    };

    ko.wijmo.customBindingFactory = new ko.wijmo.customBindingFactory();

    var createCustomBinding = ko.wijmo.customBindingFactory.customBinding.bind(ko.wijmo.customBindingFactory);

    //Wijmo Bindings
    createCustomBinding({
        widgetName: "wijbarchart",
        observableOptions: {
            disabled: {},
            stacked: {},
            header: {
            },
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijbubblechart",
        observableOptions: {
            disabled: {},
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijcompositechart",
        observableOptions: {
            disabled: {},
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijlinechart",
        observableOptions: {
            disabled: {},
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijpiechart",
        observableOptions: {
            disabled: {},
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijscatterchart",
        observableOptions: {
            disabled: {},
            dataSource: {},
            seriesList: {
                type: 'array',
                attachEvents: ['serieschanged']
            },
            seriesStyles: {
                type: 'array'
            },
            seriesHoverStyles: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijlineargauge",
        observableOptions: {
            disabled: {},
            min: {
                type: 'numeric'
            },
            max: {
                type: 'numeric'
            },
            value: {
                type: 'numeric'
            },
            ranges: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijradialgauge",
        observableOptions: {
            disabled: {},
            min: {
                type: 'numeric'
            },
            max: {
                type: 'numeric'
            },
            value: {
                type: 'numeric'
            },
            ranges: {
                type: 'array'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijslider",
        observableOptions: {
            disabled: {},
            animate: {},
            max: {
                type: 'numeric'
            },
            min: {
                type: 'numeric'
            },
            orientation: {},
            range: {},
            step: {
                type: 'numeric'
            },
            value: {
                type: 'numeric',
                attachEvents: ['change', 'slide']
            },
            values: {
                type: 'array',
                attachEvents: ['change', 'slide']
            },
            dragFill: {},
            minRange: {
                type: 'numeric'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijprogressbar",
        observableOptions: {
            disabled: {},
            value: {
                type: 'numeric',
                attachEvents: ['change']
            },
            labelAlign: {},
            maxValue: {
                type: 'numeric'
            },
            minValue: {
                type: 'numeric'
            },
            fillDirection: {},
            orientation: {},
            labelFormatString: {},
            toolTipFormatString: {},
            indicatorIncrement: {
                type: 'numeric'
            },
            indicatorImage: {},
            animationDelay: {
                type: 'numeric'
            },
            animationOptions: {}
        }
    });

    createCustomBinding({
        widgetName: "wijrating",
        observableOptions: {
            disabled: {},
            min: {
                type: 'numeric'
            },
            max: {
                type: 'numeric'
            },
            value: {
                type: 'numeric',
                attachEvents: ['rated', 'reset']
            },
            count: {
                type: 'numeric'
            },
            totalValue: {
                type: 'numeric'
            },
            split: {
                type: 'numeric'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijgallery",
        observableOptions: {
            disabled: {},
            autoPlay: {},
            showTimer: {},
            interval: {
                type: 'numeric'
            },
            showCaption: {},
            showCounter: {},
            showPager: {},
            thumbnails: {},
            thumbsDisplay: {
                type: 'numeric'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijcarousel",
        observableOptions: {
            disabled: {},
            auto: {},
            showTimer: {},
            interval: {
                type: 'numeric'
            },
            loop: {},
            showPager: {},
            showCaption: {},
            display: {
                type: 'numeric'
            },
            preview: {},
            step: {
                type: 'numeric'
            }
        }
    });

    createCustomBinding({
        widgetName: "wijsplitter",
        observableOptions: {
            disabled: {},
            showExpander: {},
            splitterDistance: {
                type: 'numeric',
                attachEvents: ['sized']
            },
            fullSplit: {}
        }
    });

    createCustomBinding({
        widgetName: "wijsuperpanel",
        observableOptions: {
            disabled: {},
            allowResize: {},
            autoRefresh: {},
            mouseWheelSupport: {},
            showRounder: {}
        }
    });

    createCustomBinding({
        widgetName: "wijtooltip",
        observableOptions: {
            disabled: {},
            closeBehavior: {},
            mouseTrailing: {},
            showCallout: {},
            showDelay: {
                type: 'numeric'
            },
            hideDelay: {
                type: 'numeric'
            },
            calloutFilled: {},
            modal: {},
            triggers: {}
        }
    });

    createCustomBinding({
        widgetName: "wijvideo",
        observableOptions: {
            disabled: {},
            fullScreenButtonVisible: {},
            showControlsOnHover: {}
        }
    });

    createCustomBinding({
        widgetName: "wijtabs",
        observableOptions: {
            disabled: {},
            collapsible: {}
        }
    });

    createCustomBinding({
        widgetName: "wijexpander",
        observableOptions: {
            disabled: {},
            allowExpand: {},
            expanded: {
                attachEvents: ['aftercollapse', 'afterexpand']
            },
            expandDirection: {}
        }
    });

    createCustomBinding({
        widgetName: "wijdialog",
        observableOptions: {
            disabled: {},
            autoOpen: {},
            draggable: {},
            modal: {},
            resizable: {}
        }
    });

    createCustomBinding({
        widgetName: "wijcalendar",
        observableOptions: {
            disabled: {},
            showTitle: {},
            showWeekDays: {},
            showWeekNumbers: {},
            showOtherMonthDays: {},
            showDayPadding: {},
            allowPreview: {},
            allowQuciPick: {},
            popupMode: {},
            selectedDates: {
                type: 'array',
                attachEvents: ['selecteddateschanged'],
                onChange: function (widgetInstance, viewModelValue, originalEventArgs) {
                    var dates = originalEventArgs[1].dates;
                    if (ko.isObservable(viewModelValue)) {
                        viewModelValue(dates);
                    } else {
                        viewModelValue = dates;
                    }
                }
            }
        }
    });

    createCustomBinding({
        widgetName: "wijaccordion",
        observableOptions: {
            disabled: {},
            requireOpenedPane: {},
            selectedIndex: {
                attachEvents: ['selectedindexchanged']
            }
        }
    });

    createCustomBinding({
        widgetName: "wijtree",
        observableOptions: {
            disabled: {},
            allowTriState: {},
            autoCheckNodes: {},
            autoCollapse: {},
            showCheckBoxes: {},
            showExpandCollapse: {},
            nodes: {
                type: "array",
                attachEvents: ['nodeCheckChanged', 'nodeCollapsed', 'nodeExpanded',
                               'nodeTextChanged', 'selectedNodeChanged']
            }
        }
    });

    createCustomBinding({
        widgetName: "wijgrid",
        observableOptions: {
            disabled: {},
            data: {
                type: 'array',
                attachEvents: ['aftercelledit'],
                onChange: function (widgetInstance, viewModelValue, originalEventArgs) {
                    var cell = originalEventArgs[1].cell,
                        rowIndex = cell.row().dataItemIndex,
                        dataKey = cell.column().dataKey,
                        newValue = cell.value(),
                        rowToUpdate = ko.isObservable(viewModelValue)
                            ? viewModelValue()[rowIndex]
                            : viewModelValue[rowIndex];


                    if ($.isFunction(rowToUpdate[dataKey])) {
                        rowToUpdate[dataKey](newValue);
                    } else {
                        rowToUpdate[dataKey] = newValue;
                    }
                }
            }
        }
    });

    createCustomBinding({
        widgetName: "wijevcal",
        observableOptions: {
            disabled: {},
            eventsData: {
                type: 'array',
                attachEvents: ['eventsdatachanged']
            },
            appointments: {
                type: 'array',
                attachEvents: ['eventsdatachanged']
            }
        }
    });

    createCustomBinding({
        widgetName: "wijpager",
        observableOptions: {
            disabled: {},
            pageCount: { type: "numeric" },
            pageIndex: {
                type: "numeric",
                attachEvents: ['pageindexchanged']
            }
        }
    });

    createCustomBinding({
        widgetName: "wijeditor",
        observableOptions: {
            disabled: {},
            editorMode: {},
            showPathSelector: {},
            mode: {},
            showFooter: {}
        }
    });

    createCustomBinding({
        widgetName: "wijlist",
        observableOptions: {
            disabled: {},
            listItems: {
                type: 'array'
            },
            selectionMode: {},
            autoSize: {},
            maxItemsCount: {
                type: 'numeric'
            },
            addHoverItemClass: {},
            keepHightlightOnMouseLeave: {}
        }
    });

    createCustomBinding({
        widgetName: "wijcombobox",
        observableOptions: {
            disabled: {},
            data: {
                type: 'array'
            },
            labelText: {},
            showTrigger: {},
            triggerPosition: {},
            autoFilter: {},
            autoComplete: {},
            highlightMatching: {},
            selectionMode: {},
            isEditable: {},
            selectedIndex: {
                type: 'numeric',
                attachEvents: ['changed']
            }
        }
    });

    createCustomBinding({
        widgetName: "wijmenu",
        observableOptions: {
            disabled: {},
            trigger: {},
            triggerEvent: {},
            mode: {},
            checkable: {},
            orientation: {}
        }
    });

    createCustomBinding({
        widgetName: "wijtextbox",
        observableOptions: {
            disabled: {}
        }
    });

    createCustomBinding({
        widgetName: "wijdropdown",
        observableOptions: {
            disabled: {}
        }
    });

    createCustomBinding({
        widgetName: "wijcheckbox",
        observableOptions: {
            disabled: {}
        }
    });

    createCustomBinding({
        widgetName: "wijradio",
        observableOptions: {
            disabled: {}
        }
    });


    //jQuery UI Bindings

    createCustomBinding({
        widgetName: "accordion",
        observableOptions: {
            disabled: {}
        }
    });

    createCustomBinding({
        widgetName: "autocomplete",
        observableOptions: {
            disabled: {},
            source: {}
        }
    });

    createCustomBinding({
        widgetName: "button",
        observableOptions: {
            disabled: {},
            label: {}
        }
    });

    createCustomBinding({
        widgetName: "datepicker",
        observableOptions: {
            disabled: {}
        }
    });

    createCustomBinding({
        widgetName: "dialog",
        observableOptions: {
            disabled: {},
            autoOpen: {},
            draggable: {},
            modal: {},
            resizable: {}
        }
    });

    createCustomBinding({
        widgetName: "progressbar",
        observableOptions: {
            disabled: {},
            value: {
                type: 'numeric'
            }
        }
    });

    createCustomBinding({
        widgetName: "slider",
        observableOptions: {
            disabled: {},
            value: {
                type: 'numeric',
                attachEvents: ['change']
            },
            min: {
                type: 'numeric'
            },
            max: {
                type: 'numeric'
            },
            values: {
                type: 'array',
                attachEvents: ['change']
            }
        }
    });

    createCustomBinding({
        widgetName: "tabs",
        observableOptions: {
            disabled: {},
            selected: {
                type: 'numeric'
            }
        }
    });

} (jQuery, ko));
