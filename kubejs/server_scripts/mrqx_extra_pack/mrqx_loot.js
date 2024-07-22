// priority: 9

/**
 * 器官实体掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxEntityLootStrategies = {

}

var assign1 = Object.assign(entityLootStrategies, mrqxEntityLootStrategies);

/**
 * 器官实体掉落唯一策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
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
}

var assign2 = Object.assign(entityLootOnlyStrategies, mrqxEntityLootOnlyStrategies);

/**
 * 器官箱子掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxChestLootStrategies = {

}

var assign3 = Object.assign(chestLootStrategies, mrqxChestLootStrategies);

/**
 * 器官箱子掉落唯一策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const mrqxChestLootOnlyStrategies = {

}

var assign4 = Object.assign(chestLootOnlyStrategies, mrqxChestLootOnlyStrategies);

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['#tetra:forged_ruins'], false)
        .addLoot(LootEntry.of('mrqx_extra_pack:cpu').when((c) => c.randomChance(0.06)))
        .addLoot(LootEntry.of('mrqx_extra_pack:magic_fast_charging_cpu').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('mrqx_extra_pack:magic_overload_cpu').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('mrqx_extra_pack:magic_glass_cannon_cpu').when((c) => c.randomChance(0.02)))
})