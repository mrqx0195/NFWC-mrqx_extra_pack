// priority: 450
NetworkEvents.dataReceived('mrqx_mq_sync', event => {
    let player = event.player
    let data = event.data
    if (player && data) {
        if (data.getBoolean('unlock')) player.getPersistentData().putBoolean('mrqx_mq', true)
        else player.getPersistentData().putBoolean('mrqx_mq', false)
    }
})