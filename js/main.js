var sub,
	reg,
	isSubscribed = false;
var subscribeButton = document.querySelector("button");

if("serviceWorker" in navigator) {
	console.log("service worker is supported");

	navigator.serviceWorker.register("sw.js").then(function() {
		return navigator.serviceWorker.ready;
	}).then(function( serviceWorkerRegistration ) {
		reg = serviceWorkerRegistration;
		subscribeButton.disabled = false;

		console.log("Service Worker is ready", reg);
	}).catch(function(err) {
		console.log("service worker not ready", err);
	});
}

subscribeButton.addEventListener("click", function() {
	if(isSubscribed) {
		unsubscribe();
	}

	else {
		subscribe();
	}
});

function subscribe() {
	reg.pushManager.subscribe({
		userVisibleOnly: true
	})
	.then(function(pushSub) {
		sub = pushSub;
		console.log("Enabled Subscription", sub.endpoint);
		subscribeButton.textContent = "Unsubscribe";
		isSubscribed = true;
	});
}

function unsubscribe() {
	sub.unsubscribe().then (function(event) {
		subscribeButton.textContent = "Subscribe";
		console.log("Unsubscribed", event);
		isSubscribed = false;
	})
	.catch(function(err) {
		console.log("Error in unsubscribing", err);
		subscribeButton.textContent = "Subscribe";
	});
} 

// **************  API Key::: AIzaSyCJ8KPbsedvGhqvaTlQeBj8h9ZGcbIHywA ********
// ************** Project no::: 624577331182 **************
// ******** Subscription Id:::: exK7lLkNJhM:APA91bEtlMp0N81hMCs_aRWV6yOydRJM8oe8ks1cnd3bLKzm7op5eLQUdA0JnnnlA95qFbvbXhResZAU2zSr5TceyAMftQkNhvUd5zuc18LYmsxKCmsnuiJbAUqvudknoj2T6Iv-QWK3


// curl --header "Authorization: key=AIzaSyCJ8KPbsedvGhqvaTlQeBj8h9ZGcbIHywA" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"cc3TIHHoE2s:APA91bFnKF0RJuXUCDvcSMLCytBY_XpyJLn5DSlJyiCZZ84VxfFbs97IKorywzwzQDh-_iYGCaG6_YvrgATozzpooSuGKWV5SPWFBiFWvefSlBDMwWUJF4H0KKgQeZsREoH8QPso3om_\"]}"