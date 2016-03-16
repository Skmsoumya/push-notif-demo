console.log("Started the SW script");

self.addEventListener("install", function(event) {
	self.skipWaiting();
	console.log("SW installed", event);
});

self.addEventListener("activate", function(event) {
	console.log("SW activated", event);
});

self.addEventListener("push", function(event) {
	console.log("push msg received", event);

	var title = "New Push Message";

	event.waitUntil(
		self.registration.showNotification(title, {
			body: "The message",
			icon: "images/icon.png",
			tags: "My tag"
	}));
});

self.addEventListener("notificationclick", function(event) {
	console.log("notification clicked: tag", event.notification.tag);

	event.notification.close();

	var url = "https://google.com";

	event.waitUntil(
		clients.matchAll({
			type: "window"
		})
		.then(function(windowClients) {
			for(var i = 0; i < windowClients.length; i++) {
				var client = windowClients[i];
				if(client.url === url && "focus" in client) {
					return client.focus();
				}
			}

			if(clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});