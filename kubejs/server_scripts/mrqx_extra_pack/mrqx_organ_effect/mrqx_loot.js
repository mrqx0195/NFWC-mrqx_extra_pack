// priority: 450

/**
 * 器官实体掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxEntityLootStrategies = {

}

var assign_entity_loot = Object.assign(entityLootStrategies, mrqxEntityLootStrategies)

/**
 * 器官实体掉落唯一策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxEntityLootOnlyStrategies = {
    // 冒险者证章
    'mrqx_extra_pack:adventurers_badge': function (event, organ) {
        let count = 1
        let diffStage = event.getPlayer().stages.getAll().toArray().find(ele => ele.startsWith('difficult_level_'))
        let diffLevelNum = 1
        if (diffStage) {
            diffLevelNum = diffStage.match('difficult_level_(\\d+)')[1]
        }
        while (diffLevelNum--) {
            if (Math.random() < 0.1) {
                count++
            }
        }
        event.loot.forEach(loot => {
            loot.setCount(loot.getCount() * count)
        })
    },

    // 死狱之魂
    'mrqx_extra_pack:prison_soul': function (event, organ) {
        let player = event.getPlayer()
        let count = player.persistentData.getInt('mrqx_kill_count') ?? 0
        player.persistentData.putInt('mrqx_kill_count', count + 1)
    },

    // “镜花水月”肾
    'mrqx_extra_pack:kidney_moon_in_the_water': function (event, organ) {
        let player = event.getPlayer()
        player.setHealth(player.getHealth() + player.getMaxHealth() * 0.05)
    },

    // 国王的水晶
    'mrqx_extra_pack:kings_crystal': function (event, organ) {
        let player = event.getPlayer()
        if (Math.floor(player.getHealth()) <= 1) {
            event.addLoot('lightmanscurrency:coin_copper')
        }
    },

    // 墨染
    'mrqx_extra_pack:mrqx0195': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        event.removeLoot(ItemFilter.ALWAYS_TRUE)
    },

    // ‌“记录者”
    'mrqx_extra_pack:recorder': function (event, organ) {
        let entityType = event.getEntity().getType()
        let player = event.getPlayer()
        let tag = player.persistentData.getCompound('mrqxRecorder')
        tag.putInt(entityType, (tag.getInt(entityType) ?? 0) + 1)
        player.persistentData.put('mrqxRecorder', tag)
    },

    // ‌原罪·贪婪「玛门」
    'mrqx_extra_pack:sin_avaritia_mammon': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        event.loot.forEach(loot => {
            loot.setCount(loot.getCount() * 2)
        })
    },

    // ‌原罪·罪源
    'mrqx_extra_pack:origin_sin': function (event, organ) {
        entityLootOnlyStrategies['mrqx_extra_pack:sin_avaritia_mammon'](event, organ)
    },

    // ‌“罪与罚”
    'mrqx_extra_pack:sin_and_judgement': function (event, organ) {
        entityLootOnlyStrategies['mrqx_extra_pack:origin_sin'](event, organ)
    },
}

var assign_entity_loot_only = Object.assign(entityLootOnlyStrategies, mrqxEntityLootOnlyStrategies)

/**
 * 器官箱子掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxChestLootStrategies = {

}

var assign_chest_loot = Object.assign(chestLootStrategies, mrqxChestLootStrategies)

/**
 * 器官箱子掉落唯一策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxChestLootOnlyStrategies = {
    // 墨染
    'mrqx_extra_pack:mrqx0195': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        event.removeLoot(ItemFilter.ALWAYS_TRUE)
    },

    // ‌原罪·贪婪「玛门」
    'mrqx_extra_pack:sin_avaritia_mammon': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        event.loot.forEach(loot => {
            loot.setCount(loot.getCount() * 2)
        })
    },

    // ‌原罪·罪源
    'mrqx_extra_pack:origin_sin': function (event, organ) {
        chestLootOnlyStrategies['mrqx_extra_pack:sin_avaritia_mammon'](event, organ)
    },

    // ‌“罪与罚”
    'mrqx_extra_pack:sin_and_judgement': function (event, organ) {
        chestLootOnlyStrategies['mrqx_extra_pack:origin_sin'](event, organ)
    },
}

var assign_chest_loot_only = Object.assign(chestLootOnlyStrategies, mrqxChestLootOnlyStrategies)