jQuery(function ($) {

	$('.left-nav a').click(function (ev) {
		window.location.hash = this.href.replace(/.+\/([^\/]+)\/index\.html/, '$1') + '|overview';
		loadPage(this.href);
		$('.left-nav a.selected').removeClass('selected');
		$(this).addClass('selected');

		ev.preventDefault();
	});

	//    $(function () {
	//        var done;
	//        $('.left-nav a').click(function () {
	//            if (done) return;
	//            done = true;
	//            $(this).append('<span class="ui-icon ui-icon-circle-arrow-e"></span>');
	//        });
	//    });


	if (window.location.hash) {
		if (window.location.hash.indexOf('|') === -1) {
			window.location.hash += '|overview';
		}
		var path = window.location.href.replace(/(index\.html)?#/, '');
		path = path.replace('\|', '/') + '.html';
		loadPage(path);
	}

	function loadPage(path) {
		var section = path.replace(/\/[^\/]+\.html/, '');
		var header = section.replace(/.+\/([^\/]+)/, '$1').replace(/_/, ' ');

		$('div.normal')
				.empty()
				.append('<h3 class="demo-header">' + header + '</h3>')
				.append('<div id="demo-config"></div>')
				.find('#demo-config')
					.append('<div id="demo-frame"></div><div id="demo-link"><a class="demoWindowLink" href="#"><span class="ui-icon ui-icon-newwin"></span>New Window</a></div>')
					.find('#demo-link a')
						.bind('click', function (ev) {
							window.open(this.href);
							ev.preventDefault();
						})
					.end()

				.end()
			;


		$('div.demos-nav')
					.find('#demo-config-menu')
						.load(section + '/index.html .demos-nav', function () {
							$('#demo-config-menu a').each(function () {
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
								$('#demo-config-menu a').each(function () {
									if (this.href.indexOf(demo + '.html') !== -1) {
										$(this).parents('ul').find('li').removeClass('demo-config-on');
										$(this).parent().addClass('demo-config-on');
										resetDemos();
										loadDemo(this.href);
									}
								});
							}

							updateDemoNotes();
						})
					.end();

		if (!window.location.hash) {
			resetDemos();
		}
	}

	function loadDemo(path) {
		var directory = path.match(/([^\/]+)\/[^\/\.]+\.html$/)[1];
		$.get(path, function (data) {
			var source = data;
			data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
			data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
			data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
			data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
			data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
			data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
			data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
			data = data.replace(/((href|src)=["'])(?!(http|#))/ig, "$1" + directory + "/");

			$('#demo-style').remove();
			$('#demo-frame').empty().html(data);
			$('#demo-frame style').clone().appendTo('head').attr('id', 'demo-style');
			$('#demo-link a').attr('href', path);
			updateDemoNotes();
			updateDemoSource(source);

			if (/default.html$/.test(path)) {
				$.get("documentation/docs-" + path.match(/demos\/(.+)\//)[1] + ".html", function (html) {
					$("#demo-source").after(html);
					$("#widget-docs").tabs();
					$(".param-header").click(function () {
						$(this).parent().toggleClass("param-open").end().next().toggle();
					});
					$(".docs-list-header").each(function () {
						var header = $(this);
						var details = header.next().find(".param-details").hide();
						$("a:first", header).click(function () {
							details.show().parent().addClass("param-open");
							return false;
						});
						$("a:last", header).click(function () {
							details.hide().parent().removeClass("param-open");
							return false;
						});
					});
				});
			}
		});
	}

	function updateDemoNotes() {
		var notes = $('#demo-frame .demo-description');
		if ($('#demo-notes').length == 0) {
			$('<div id="demo-notes"></div>').insertAfter('#demo-config');
		}
		$('#demo-notes').hide().empty().html(notes.html());
		$('#demo-notes').show();
		notes.hide();
	}

	function updateDemoSource(source) {
		if ($('#demo-source').length == 0) {
			$('<div id="demo-source"><a href="#" class="source-closed"><span class="ui-icon ui-icon-triangle-1-e"></span>View Source</a><div class="source-block"><pre><code></code></pre></div></div>').insertAfter('#demo-notes');
			$('#demo-source').find(">a").click(function () {
				$(this).toggleClass("source-closed").toggleClass("source-open").next().toggle();
				$('.ui-icon', $(this)).toggleClass('ui-icon-triangle-1-e').toggleClass('ui-icon-triangle-1-s');
				return false;
			}).end().find(">div").hide();
		}
		var cleanedSource = source
				.replace('themes/Wijmo/jquery.ui.all.css', 'theme/jquery.ui.all.css')
				.replace(/\s*\x3Clink.*demos\x2Ecss.*\x3E\s*/, '\r\n\t')
				.replace(/\x2E\x2E\x2F\x2E\x2E\x2F/g, '');

		$('#demo-source code').empty().text(cleanedSource);
	}

	function resetDemos() {
		$(".ui-dialog").remove();

		if (typeof (dispose) == "function") {
			dispose.call();
		}
	}

});


