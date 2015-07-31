chrome.runtime.onConnect.addListener(function (channel) {
    channel.onMessage.addListener(function (message, port) {
        if (message[0] !== 'WebRTCSnoop') return;
        console.log(new Date(), message[1], message[2]);
        chrome.pageAction.show(port.sender.tab.id);
    });
});
