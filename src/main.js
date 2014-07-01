/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

chrome.runtime.onStartup.addListener(function() {
	chrome.storage.local.get("windowPositioner", function(data) {
		chrome.windows.getCurrent({}, function(curr) {
			var windows = data.windowPositioner;
			
			for (var i = 0; i < windows.length; i++) {
				if (windows[i].fullScreen) {
					chrome.windows.create({
						"url": windows[i].url,
						"left": windows[i].x,
						"top": windows[i].y,
						"width": windows[i].w,
						"height": windows[i].h
					}, function(w) {
						chrome.windows.update(w.id, {state:'fullscreen'});
					});
				} else {
					chrome.windows.create({
						"url": windows[i].url,
						"left": windows[i].x,
						"top": windows[i].y,
						"width": windows[i].w,
						"height": windows[i].h
					});
				}
			}
			chrome.windows.remove(curr.id);;
		});
	});
})