const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line
      .replace(/\-/g, "+")
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return new Uint8Array(rawData.length).map((v, i) => {
    return rawData.charCodeAt(i);
  });
};
export const convertedVapidKey = urlB64ToUint8Array(
  process.env.REACT_APP_VAPID_PUBLIC_KEY as string
);

function sendSubscription(subscription: PushSubscription) {
  const body = JSON.stringify(subscription);
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function initPort() {
  const ctrl = navigator.serviceWorker.controller;
  const channel = new MessageChannel();
  ctrl?.postMessage({ type: 'init' }, [channel.port2]);
  channel.port1.onmessage = (ev) => {
    console.info('serve message from service-worker', ev.data);
    alert(JSON.stringify(ev.data));
  };
}

export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(function (registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.');
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              console.log('No subscription detected, make a request.');
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log('New subscription added.');
                  sendSubscription(newSubscription);
                })
                .catch(function (e) {
                  if (Notification.permission !== 'granted') {
                    console.log('Permission was not granted.');
                  } else {
                    console.error(
                      'An error ocurred during the subscription process.',
                      e
                    );
                  }
                });
            } else {
              console.log('Existed subscription detected.');
              sendSubscription(existedSubscription);
            }
            initPort();
          });
      })
      .catch(function (e) {
        console.error(
          'An error ocurred during Service Worker registration.',
          e
        );
      });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

export function postMessage() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.controller?.postMessage({
      title: 'from-client-title',
      body: 'from-client-body',
    });
  }
}
