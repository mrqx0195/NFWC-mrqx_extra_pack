const mrqxEntityLootStrategies = {

}

var assign1 = Object.assign(entityLootStrategies, mrqxEntityLootStrategies);

const mrqxEntityLootOnlyStrategies = {
    // 冒险者证章
    'mrqx_extra_pack:adventurers_badge': function (event, organ) {
        let count = 1
        let diffStage = event.player.stages.getAll().toArray().find(ele => ele.startsWith('difficult_level_'))
        let diffLevelNum = 1
        if (diffStage) {
            diffLevelNum = diffStage.match('difficult_level_(\\d+)')[1]
        }
        while (diffLevelNum--) {
            if (Math.random() > 0.1) {
                count++
            }
        }
        event.loot.forEach(loot => {
            loot.setCount(loot.getCount() * count)
        })
    },

    // 死狱之魂
    'mrqx_extra_pack:prison_soul': function (event, organ) {
        let player = event.killerEntity
        let instance = player.getChestCavityInstance()
        let soul = instance.inventory.getItem(organ.Slot)
        soul.nbt.put('killcount', organ.tag.killcount + 1)
        global.initChestCavityIntoMap(player, false)
        if (player.persistentData.contains(organActive) && player.persistentData.getInt(organActive) == 1) {
            global.updatePlayerActiveStatus(player)
        }
    },
}

var assign2 = Object.assign(entityLootOnlyStrategies, mrqxEntityLootOnlyStrategies);

const mrqxChestLootStrategies = {

}

var assign3 = Object.assign(chestLootStrategies, mrqxChestLootStrategies);

const mrqxChestLootOnlyStrategies = {

}

var assign4 = Object.assign(chestLootOnlyStrategies, mrqxChestLootOnlyStrategies);