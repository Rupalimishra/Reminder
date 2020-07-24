
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("alarm", alarm);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Alarm',
        message: alarm.name,
        buttons: [{
            title: 'Keep it Flowing.'
        }],
        priority: 0
    });
    const audio = new Audio('./Old-alarm-clock-sound.mp3');
    audio.play();
})
