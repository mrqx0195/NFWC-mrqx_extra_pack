// priority: 450
// 灿芒之星（防止视觉效果异常）
PlayerEvents.tick(event => {
    if (!event.level.isClientSide()) return
    let player = event.player
    if (player.getUseItem().id == 'mrqx_extra_pack:radiant_star') {
        /** @type {Internal.ClientLevel} */
        let levelData = event.level.levelData
        levelData.setGameTime(levelData.getGameTime() + 60 - 1)
        levelData.setDayTime(levelData.getDayTime() + 60 - 1)
    }
})