$(document).ready(function () {


    var cnt = $('#content').children('div').length - 1;
    $('#themes').change(function () {
        $("link[title='rocket-jqueryui']").attr("href", $(this).val());
    }).wijdropdown();

    $('.code-button').button({ text: false, icons: { primary: 'ui-icon-carat-2-e-w'} });
//    $('#arrow-up').button({ text: false, icons: { primary: 'ui-icon-carat-1-n'} });
//    $('#arrow-down').button({ text: false, icons: { primary: 'ui-icon-carat-1-s'} });
    $('#flyout').button({ text: false, icons: { primary: 'ui-icon-triangle-2-e-w'} });
    $('#close-code').button({ text: false, icons: { primary: 'ui-icon-close'} });
//    $('#arrows').buttonset();
    $('#switcher').buttonset();

    $('.listitem').hover(
        function () {
            $(this).find('a:first').stop().animate({ paddingLeft: '20px', paddingTop: '12px', fontSize: '16px' }, { duration: 250, easing: "easeOutCirc" }).addClass('listitem-hover');
        },
        function () {
            $(this).find('a:first').stop().animate({ paddingLeft: '8px', paddingTop: '8px', fontSize: '10px' }, { duration: 350, easing: "easeOutCirc" }).removeClass('listitem-hover');
        }
    );
    $('.listitem-inner').hover(
        function () {
            $(this).find('a').stop().animate({ paddingLeft: '20px', paddingTop: '12px', fontSize: '16px' }, { duration: 250, easing: "easeOutCirc" }).addClass('listitem-hover');
        },
        function () {
            $(this).find('a').stop().animate({ paddingLeft: '8px', paddingTop: '8px', fontSize: '10px' }, { duration: 350, easing: "easeOutCirc" }).removeClass('listitem-hover');
        }
    );


    if (jQuery.browser.msie && jQuery.browser.version == "6.0") {

    } else {
        $('.listitem').hover(
        function () {
            $(this).siblings().stop().animate({ opacity: '0.25' });
        },
        function () {
            $(this).siblings().stop().animate({ opacity: '1' });
        }
    );
    }



    //    $('#view-code').wijdialog({ autoOpen: false, modal: true, width: '960px', resizable: false, draggable: false });
    //    $('.code-button').click(function () { $('#view-code').wijdialog('open'); return false; });
    //    $('.ui-dialog-titlebar').remove();
    //    $('#view-code-tabs').wijtabs({ alignment: 'left' });
    //    $('#close-code').click(function () {
    //        $('#view-code').wijdialog('close');
    //        return false;
    //    });

    $('#arrow-up').click(function () {

        return false;
    });

    $('#arrow-down').click(function () {

        return false;
    });



    $('#charts-parent').hoverIntent(
        function () {
            $('#charts-children').fadeIn();
        },
        function () {
            $('#charts-children').fadeOut('fast');
        }
    );


    $('#input-parent').hoverIntent(
        function () {
            $('#input-children').fadeIn();
        },
        function () {
            $('#input-children').fadeOut('fast');
        }
    );


    $('#view-code').wijdialog({ autoOpen: false, modal: true, resizable: false, draggable: false, width: 960 });
    $('#view-code').parent().css('overflow', 'visible');
    $('#view-code').siblings(".ui-dialog-titlebar").hide();
    $('#view-code-tabs').wijtabs({ alignment: 'left', scrollable: true });
    $('.code-button').click(function () { $('#view-code').wijdialog('open'); return false; });
    $('#close-code').click(function () {
        $('#view-code').wijdialog('close');
        return false;
    });

});

jQuery(function ($) {

    $('.left-nav a').not('a[href="#"]').click(function (ev) {
        window.location.hash = this.href.replace(/.+\/([^\/]+)\/index\.html/, '$1') + '|overview';
        loadPage(this.href);
        $('.left-nav a.selected').removeClass('selected');
        $(this).addClass('selected');

        ev.preventDefault();
    });

    $('.left-nav a[href="#"]').click(function () {
        return false;
    });


    if (window.location.hash) {
        if (window.location.hash.indexOf('|') === -1) {
            window.location.hash += '|overview';
        }
        var path = "";
        var pages = window.location.hash.replace("#", "").split("|");
        $('.left-nav a').not('a[href="#"]').each(function () {
            if ($(this).attr("href").indexOf(pages[0]) >= 0) {
                path = $(this).attr("href").replace("index", pages[1]);
            }
        });

        loadPage(path);

    }

    function loadPage(path) {
        var section = path.replace(/\/[^\/]+\.html/, '');
        var header = section.replace(/.+\/([^\/]+)/, '$1').replace(/_/, ' ');

        $('div.content-inner')
			.find('.widget-title .widget-name').text(header)
        //				.append('<div id="demo-config"></div>')
        //				.find('#demo-config')
        //					.append('<div id="demo-frame"></div><div id="demo-link"><a class="demoWindowLink" href="#"><span class="ui-icon ui-icon-newwin"></span>New Window</a></div>')
        //					.find('#demo-link a')
        //						.bind('click', function (ev) {
        //						    window.open(this.href);
        //						    ev.preventDefault();
        //						})
        //					.end()
        //				.end()
            .end();
        $("#placer").hide();

        $('div#secondary')
					.find('#side-menu-list')
						.load(section + '/index.html .demos-nav li', function () {
						    $('#side-menu-list a').each(function () {
						        this.setAttribute('href', section + '/' + this.getAttribute('href').replace(/.+\/([^\/]+)/, '$1'));
						        $(this).attr('target', 'demo-frame');
						        $(this).click(function () {

						            resetDemos();

						            $(this).parents('ul').find('li').removeClass('demo-config-on');
						            $(this).parent().addClass('demo-config-on');
						            $('#demo-notes').fadeOut();

						            //Set the hash to the actual page without ".html"
						            window.location.hash = header + '|' + this.getAttribute('href').match((/\/([^\/\\]+)\.html/))[1];

						            loadDemo(this.getAttribute('href'));

						            return false;
						        });
						    });

						    if (window.location.hash) {
						        var demo = window.location.hash.split('|')[1];
						        $('#side-menu-list a').each(function () {
						            if (this.href.indexOf(demo + '.html') !== -1) {
						                $(this).parents('ul').find('li').removeClass('demo-config-on');
						                $(this).parent().addClass('demo-config-on');
						                resetDemos();
						                loadDemo(this.href);
						            }
						        });
						    }

						    $('#side-menu-list').wijmenu("destroy").wijmenu({ orientation: 'vertical', showAnimation: { animated: "slide", option: { direction: "right" }, duration: 350, easing: "easeOutCirc"} });

						    //updateDemoNotes();
						}).end();

        if (!window.location.hash) {
            resetDemos();
        }
    }

    function loadDemo(path) {
        var directory = path.match(/([^\/]+)\/[^\/\.]+\.html$/)[1];
        $(":wijmo-wijdialog").not("#view-code").wijdialog("close").wijdialog("destroy").remove();

        $.get(path, function (data) {
            var source = data;
            data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
            data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
            data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
            data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
            data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
            data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
            data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
            data = data.replace(/((href|src)=["'])(?!(http|#|\${))/ig, "$1" + directory + "/");

            $(".content-inner").hide("slide", { direction: "down" }, 400, function () {
                $('.widget-description').hide().empty();
                $('.widget-title').css('opacity', '0');
                $('#demo-frame').empty().html(' <img src="explore/images/ajax-loader.gif" style="margin-left: 48%; margin-top: 28%;" />');
                $(".content-inner").css("visibility", "visible").show("slide", { direction: "up" }, 500, function () {
                    $('#demo-style').remove();
                    $('#demo-frame').empty().css("visibility", "visible").html(data);
                    $('#demo-frame style').clone().appendTo('head').attr('id', 'demo-style');
                    $('.widget-description').empty().append($('.demo-description')).fadeIn(1000);
                    $('.widget-title .widget-demo-title').text($('.container .header h2').text());
                    $('.widget-title').animate({ opacity: 1 });
                    $('.container .header h2').remove();
                    //$('#demo-link a').attr('href', path);
                });
            });

            updateDemoSource(source);

            //            if (/default.html$/.test(path)) {
            //                $.get("documentation/docs-" + path.match(/demos\/(.+)\//)[1] + ".html", function (html) {
            //                    $("#demo-source").after(html);
            //                    $("#widget-docs").tabs();
            //                    $(".param-header").click(function () {
            //                        $(this).parent().toggleClass("param-open").end().next().toggle();
            //                    });
            //                    $(".docs-list-header").each(function () {
            //                        var header = $(this);
            //                        var details = header.next().find(".param-details").hide();
            //                        $("a:first", header).click(function () {
            //                            details.show().parent().addClass("param-open");
            //                            return false;
            //                        });
            //                        $("a:last", header).click(function () {
            //                            details.hide().parent().removeClass("param-open");
            //                            return false;
            //                        });
            //                    });
            //                });
            //            }
        }, "html");
    }


    function updateDemoSource(source) {
        if ($('#demo-source').length == 0) {
            $('<div id="demo-source"><div class="source-block"><pre><code></code></pre></div></div>').appendTo('#tabs-1');

        }
        var cleanedSource = source
				.replace('themes/Wijmo/jquery.ui.all.css', 'theme/jquery.ui.all.css')
				.replace(/\s*\x3Clink.*demos\x2Ecss.*\x3E\s*/, '\r\n\t')
				.replace(/\x2E\x2E\x2F\x2E\x2E\x2F/g, '');

        $('#demo-source code').empty().text(cleanedSource);

    }

    function resetDemos() {
        //$(".ui-dialog").remove();

        if (typeof (dispose) == "function") {
            dispose.call();
        }
    }

});


