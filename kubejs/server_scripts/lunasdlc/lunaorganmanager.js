// priority: 999

// 只有当玩家手持开胸器并打开gui界面的时候才触发初始化效果
PlayerEvents.inventoryClosed((event) => {
    let player = event.player;
    checkAndHideAllBar(player)
    if (player.mainHandItem != 'chestcavity:chest_opener' && player.offHandItem != 'chestcavity:chest_opener') {
        return;
    }
    initChestCavityIntoMap(player, true);
    let itemMap = getPlayerChestCavityItemMap(player)
    if (itemMap.has('luna_flesh_reforged:archotech_lastinger')) {
        global.updatePlayerActiveStatus(event.player)
        player.persistentData.putInt(organActive, 1)
    }
});