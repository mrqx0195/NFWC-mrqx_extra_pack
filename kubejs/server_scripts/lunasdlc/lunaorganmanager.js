// priority: 1000

// 只有当玩家手持开胸器并打开gui界面的时候才触发初始化效果
PlayerEvents.inventoryClosed((event) => {
    let player = event.player;
    checkAndHideAllBar(player)
    if (player.mainHandItem != 'chestcavity:chest_opener' && player.offHandItem != 'chestcavity:chest_opener') {
        return;
    }
    global.initChestCavityIntoMap(player, true)
    let itemMap = getPlayerChestCavityItemMap(player)
    if (itemMap.has('luna_flesh_reforged:archotech_lastinger') || itemMap.has('luna_flesh_reforged:archotech_dragon_appendix')) {
        global.updatePlayerActiveStatus(event.player)
        player.persistentData.putInt(organActive, 1)
    }
});