// priority: 100
LootJS.modifiers(event => {
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