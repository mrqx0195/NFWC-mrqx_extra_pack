// priority: 100
LootJS.modifiers(event => {
    
    function addBossLootLuna(entity) {
        return event.addEntityLootModifier(entity)
            .apply(ctx => {
                let entity = ctx.entity
                let diffLevelNum = 1
                if (entity.persistentData.contains('diffLevel')) {
                    diffLevelNum = entity.persistentData.getInt('diffLevel')
                }
                if (diffLevelNum >= 12 &&
                (entity.hasEffect('kubejs:glare_of_god') ||
                    entity.hasEffect('kubejs:gaze_of_god') ||
                    entity.hasEffect('kubejs:glimpse_of_god'))) {
                    if (ctx.player) {
                        let typeMap = getPlayerChestCavityTypeMap(ctx.player);
                        if (typeMap.has('kubejs:archotech')){
                            ctx.player.give(Item.of('luna_flesh_reforged:archotech_capsule'))
                        }
                    }
                }
            })
    }
    
    bossTypeList.forEach(entityId => {
        addBossLootLuna(entityId)
    })
    
    event.addEntityLootModifier('minecraft:zombie')
        .addLoot(LootEntry.of('luna_flesh_reforged:zombie_brain').when((c) => c.randomChance(0.1)));

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['minecraft:ancient_city'], false)
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_azathoth').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_cthulhu').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_hastur').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_nyarlathotep').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_shubniggurath').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_yogsothoth').when((c) => c.randomChance(0.005)))
    

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['minecraft:the_nether'], false)
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_azathoth').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_cthulhu').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_hastur').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_nyarlathotep').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_shubniggurath').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_yogsothoth').when((c) => c.randomChance(0.005)))

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['#kubejs:graveyard'], false)
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_azathoth').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_cthulhu').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_hastur').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_nyarlathotep').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_shubniggurath').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('luna_flesh_reforged:charm_yogsothoth').when((c) => c.randomChance(0.005)))

})
