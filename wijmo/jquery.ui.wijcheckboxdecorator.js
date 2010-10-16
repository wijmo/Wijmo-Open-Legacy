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
 * * Wijmo CheckBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 *
 */
(function ($) {
    var checkboxId = 0;
    $.widget("ui.wijcheckboxdecorator", {
        _init: function () {
            var that = this;
            var e = this.element;
            if (e.is(":checkbox")) {
                if (!this.element.attr("id")) {
                    this.element.attr("id", "ui-checkbox-" + checkboxId);
                    checkboxId += 1;
                }

                var checkboxElement;
                if (this.element.parent().is("label")) {
                    checkboxElement = this.element.parent().wrap("<div class='ui-checkbox-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass("ui-checkbox ui-widget");
                    var label = this.element.parent();
                    label.attr("for", this.element.attr("id"));
                    checkboxElement.find(".ui-checkbox-inputwrapper").append(this.element);
                    checkboxElement.append(label);

                }
                else {
                    checkboxElement = this.element.wrap("<div class='ui-checkbox-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass("ui-checkbox ui-widget");
                }

                //var checkboxElement=this.element.wrap("<div class='ui-checkbox-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass("ui-checkbox ui-widget");
                //inputwraper.wrap(checkbox);
                var targetLabel = $("label[for='" + this.element.attr("id") + "']");
                if (targetLabel.length === 0) {
                }
                else {
                    checkboxElement.append(targetLabel);
                    targetLabel.attr("labelsign", "C1");
                    //targetLabel.attr("tabindex", 0);
                }
                if (targetLabel.length > 0) {
                    //this._addAttrs(e, targetLabel);
                }
                var boxElement = $("<div class='ui-checkbox-box ui-widget ui-state-default ui-corner-all'><span class='ui-checkbox-icon'></span></div>");
                var iconElement = boxElement.children(".ui-checkbox-icon");
                checkboxElement.append(boxElement);
                this.element.data("iconElement", iconElement);
                this.element.data("boxElement", boxElement);
                if (this.element.is(":disabled")) {
                    this._setOption("disabled", true);
                }
                boxElement.removeClass("ui-checkbox-relative");
                if (targetLabel.length == 0 || targetLabel.html() === "") {
                    boxElement.addClass("ui-checkbox-relative");
                }

                this.element.bind("click.checkbox", function () {
                    that.refresh();
                }).bind("focus.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
                }).bind("blur.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-focus").not(".ui-state-hover").addClass("ui-state-default");
                })

                checkboxElement.click(function () {
                    if (targetLabel.length == 0 || targetLabel.html() === "") {
                        that.element.attr("checked", !that.element.attr("checked"));
                        that.refresh();
                    }

                })
                this.refresh();
                checkboxElement.bind("mouseover.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
                }).bind("mouseout.checkbox", function () {
                    if (that.options.disabled) {
                        return;
                    }
                    boxElement.removeClass("ui-state-hover").not(".ui-state-focus").addClass("ui-state-default");
                });
            }
        },

        refresh: function () {
            this.element.data("iconElement").toggleClass("ui-icon ui-icon-check", this.element.is(":checked"));
            this.element.data("boxElement").toggleClass("ui-state-active", this.element.is(":checked"));
        },


        _addAttrs: function (oldele, newele) {
            if (newele) {
                var attrs = oldele.get(0).attributes;
                $.each(attrs, function (i, n) {
                    var name = n.name.toLowerCase();
                    if (name == 'type' || name == 'id') {
                        return true;
                    }
                    try {
                        newele.attr(n.name, n.nodeValue);
                    }
                    catch (ex)
                    { }
                });
            }

        },
        destroy: function () {
            var boxelement = this.element.parent().parent();
            boxelement.children("div.ui-checkbox-box").remove();
            //this.element.parent().unwrap();
            this.element.unwrap();
            this.element.unwrap();
            $.Widget.prototype.destroy.apply(this);
        }
    });
})(jQuery);
