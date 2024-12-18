ClientEvents.tick(event => {
    if (global.OrganSkill.consumeClick()) {
        event.player.sendData('ogran_key_pressed')
    }
})
