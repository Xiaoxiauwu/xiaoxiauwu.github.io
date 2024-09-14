document.addEventListener('DOMContentLoaded', function () {
	var codeBlocks = document.getElementsByTagName('code');

	for (var i = 0; i < codeBlocks.length; i++) {
		var codeBlock = codeBlocks[i];
		if (!codeBlock.classList.contains("cpcode")) {
			continue;
		}

		var button = document.createElement('button');
		button.textContent = '复制代码';
		button.classList.add('copy-button'); // add CSS class
		codeBlock.parentNode.insertBefore(button, codeBlock.nextSibling);

		var clipboard = new ClipboardJS(button, {
			target: function (trigger) {
				return trigger.previousSibling;
			}
		});
		clipboard.on('success', function (e) {
			e.clearSelection();
			var notification = document.createElement('div');
			notification.textContent = 'Copied!';
			button.textContent = 'Copied!';
			notification.classList.add('notification');
			document.body.appendChild(notification);
			setTimeout(function () {
				notification.style.opacity = '0';
				setTimeout(function () {
					document.body.removeChild(notification);
					button.textContent = 'Copy';
				}, 1000);
			}, 1000);
			this.$Tips.tipWarningBox("复制成功");
			//console.log('已复制到剪贴板:', e.text);
		});
		clipboard.on('error', function (e) {
			console.error('复制失败:', e.action);
			Toast("复制失败",1500);
		});
	}
});