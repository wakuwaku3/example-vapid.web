let port;
function show(event,data){
  port && port.postMessage(data);
  const options = {
    body: data.body,
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
}
self.addEventListener('push', event => {
  const data = event.data.json()
  show(event,data)
})
self.addEventListener('message', event => {
  const data = event.data
  if (data.type==='init'){
    port = event.ports[0]
    return
  }
  show(event,data)
})

