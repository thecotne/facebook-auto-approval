function approveAllInCurrentGroup() {
	document.querySelector('#pagelet_group_requests [ajaxify*=confirm_bulk_action]:not([ajaxify*=ignore])').click();

	let watcher = setInterval(() => {
		let layerConfirm = document.querySelector('.layerConfirm:not([disabled])');
		if (layerConfirm) {
			clearInterval(watcher);
			layerConfirm.click();
			document.querySelector('#fbNotificationsJewel > a').click();
		};
	}, 50);
}

function onNotificationChange() {
	document.getElementById('notificationsCountValue').addEventListener('DOMNodeInserted', e => {
		if (e.target.textContent == '0') return;
		document.querySelector('#groupsUnifiedQueue [ajaxify*="groups/unified_queue/async_response/?queue=requests&groupid"]').click();
		let watcher = setInterval(() => {
			if (document.querySelector('#pagelet_group_requests [ajaxify*=confirm_bulk_action]:not([ajaxify*=ignore])')) {
				clearInterval(watcher);
				if (e.target.textContent == '0') return;
				approveAllInCurrentGroup();
			};
		}, 50);
	});
}

onNotificationChange();
