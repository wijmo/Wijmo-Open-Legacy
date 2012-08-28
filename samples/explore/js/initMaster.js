(function () {
	window.UrlLinkedPaneHistory = (function () {
		var self = this;
		function UrlLinkedPaneHistory(options) {
			var handleStateChange;
			//UrlLinkedPaneHistory.__super__.constructor.call(this, options.entries);
			self.urlLinkOptions = options;
			handleStateChange = function () {
				//update by wh
				var state = History.getState(),
					widgetPara = parseUrl(state.url),
					currentEntry = state.data.currentEntry,
					lastpath = window.lastpath,
					paneID = widgetPara ? widgetPara.paneId : "widgetIndex";

				switchIcons(paneID);

				removeDialogueLayer();
				initTabSelection();

				if (!widgetPara || widgetPara.paneId === "") {
				    //$('#' + "location-widgetIndex").show();
				    $("#widgetTitle").html("WELCOME");
				    loadFavoriteWidgets();
					showPane($("#location-widgetIndex"), getSlideOption(currentEntry))
				} else if (widgetPara.paneId === "widgets") {
	                $("#widgetTitle").html("WIDGETS");
	                loadWidgets();
					showPane($("#location-widgets"), getSlideOption(currentEntry));
				} else if (widgetPara.paneId === "widgetContent") {
					var isAnimate = $("#location-widgetContent").hasClass("active");
					var opt = {
						direction: getSlideOption(currentEntry).direction,

						loaded: function () {
							var lastPath = window.lastSamplePath,
								path = widgetPara.widgetName + "/" + widgetPara.widgetPage + ".html";
							if (lastPath === path && $("#SampleContainer").html() !== "") {
								return;
							}
							window.lastSamplePath = path;
							$("#widgetTitle").html(widgetPara.widgetName.toUpperCase());
                            loadSampleList(widgetPara.widgetName);
							loadDemo(path, ".single-widget", loadWidgetCompleteCallBack,
								isAnimate);
							loadSource(path, ".single-widget", loadWidgetCompleteCallBack,
								isAnimate);
						}
					}
					showPane($("#location-widgetContent"), opt);
				}
			};
			handleStateChange();
			History.Adapter.bind(window, 'statechange', handleStateChange);
			window.isReload = false;
		}

		oppositeDirection = function (direction) {
			var dir = { left: "right", right: "left" };
			return dir[direction];
		}


		showPane = function (pane, options) {
			//widget content show 
			if (pane.hasClass("active")) {
				if (options.loaded) {
					options.loaded(options);
				}
				$(".active").show();
				return;
			}

			//paste url to loacation directly
			if (options.direction === null && !pane.hasClass("active")) {
				pane.show();
				$(".active").removeClass("active");
				pane.addClass("active");
				if (options.loaded) {
					options.loaded(options);
				}
				return;
			}

			//different pane animation
			$(".active").hide("slide", { direction: oppositeDirection(options.direction) }, 400, function () {
				$(".active").removeClass("active");
				pane.show("slide", { direction: options.direction }, 500, function () {
					pane.addClass("active");
					if (options.loaded) {
						options.loaded(options);
					}
		            setBodyContainerHeight();
				});
			});

		};
		return UrlLinkedPaneHistory;
	})();
}).call(this);