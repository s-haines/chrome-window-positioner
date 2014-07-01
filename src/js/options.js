$(function() {
	
	function WindowRow(aUrl, aX, aY, aW, aH, aFullScreen) {
		this.url = (typeof aUrl != "undefined") ? aUrl : "";
		this.x = (typeof aX != "undefined") ? aX : "";
		this.y = (typeof aY != "undefined") ? aY : "";
		this.w = (typeof aW != "undefined") ? aW : "";
		this.h = (typeof aH != "undefined") ? aH : "";
		this.fullScreen = (typeof aFullScreen != "undefined") ? aFullScreen : false;
		this.toString = function() {
			var out = '<tr>';
			out += '<td><input type="text" placeholder="URL" value="' + this.url + '" size="65" /></td>';
			out += '<td><input type="text" placeholder="X" value="' + this.x + '" size="5" /></td>';
			out += '<td><input type="text" placeholder="Y" value="' + this.y + '" size="5" /></td>';
			out += '<td><input type="text" placeholder="Width" value="' + this.w + '" size="5" /></td>';
			out += '<td><input type="text" placeholder="Height" value="' + this.h + '" size="5" /></td>';
			out += '<td><input type="checkbox"' + (this.fullScreen ? ' checked="checked"' : '') + ' /></td>';
			out += '<td><button class="deleteRowButton">X</button></td>';
			out += '</tr>';
			return out;
		}
		
	};
	
	
	$("#newRowButton").click(function() {
		$("#windows > tbody:last").append((new WindowRow()).toString());
	});
	
	$(document).on("click", ".deleteRowButton", function() {
		var row = $(this).closest("tr");
		row.remove();
	});
	
	$("#saveButton").click(save);
	$("#cancelButton").click(load);
	$("#resetButton").click(function() {
		reset();
		load();
	});
	
	function save() {
		var windows = [];
		$.each($("#windows > tbody tr"), function(i,v) {
			e = $(v);
			windows.push({
				"url": e.find("input").eq(0).val(),
				"x": parseInt(e.find("input").eq(1).val()),
				"y": parseInt(e.find("input").eq(2).val()),
				"w": parseInt(e.find("input").eq(3).val()),
				"h": parseInt(e.find("input").eq(4).val()),
				"fullScreen": e.find("input").eq(5).is(":checked")
			});
		});
		chrome.storage.local.set({
			windowPositioner: windows
		});
	};
	
	function load() {
		chrome.storage.local.get("windowPositioner", function(data) {
			$("#windows > tbody:last").find("tr").remove();
			var windows = data.windowPositioner;
			$.each(windows, function(i,e) {
				var row = new WindowRow(e.url, e.x, e.y, e.w, e.h, e.fullScreen);
				$("#windows > tbody:last").append(row.toString());
			});
		});
	};
	
	function reset() {
		chrome.storage.local.remove("windowPositioner");
	};
	
	load();
	
});