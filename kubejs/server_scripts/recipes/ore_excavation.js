// priority: 800
ServerEvents.recipes(event => {
  event.recipes.createoreexcavation
    .drilling('iceandfire:silver_ore', '{"translate": "createoreexcavation.kubejs.silver_ore"}', 2, 600)
    .drill('createoreexcavation:diamond_drill')
    .alwaysInfinite()
    .stress(384)
    .biomeWhitelist('minecraft:is_overworld')
    .id('kubejs:drilling_silver')

  event.recipes.createoreexcavation
    .drilling('minecraft:lapis_lazuli', '{"translate": "createoreexcavation.kubejs.lapis_lazuli"}', 10, 400)
    .alwaysInfinite()
    .stress(256)
    .biomeWhitelist('minecraft:is_overworld')
    .id('kubejs:drilling_lapis')

  event.recipes.createoreexcavation
    .drilling("minecraft:gold_nugget", '{"translate": "createoreexcavation.kubejs.gold_nugget"}', 20, 100)
    .alwaysInfinite()
    .stress(192)
    .biomeWhitelist('minecraft:is_nether')
    .id('kubejs:drilling_nether_gold')

  event.recipes.createoreexcavation
    .drilling([Item.of('minecraft:ancient_debris').withChance(0.3), Item.of('minecraft:gold_nugget').withChance(0.8), Item.of('minecraft:netherrack').withChance(0.8), Item.of('minecraft:magma_block').withChance(0.5)], '{"translate": "createoreexcavation.kubejs.ancient_debris"}', 1, 4000)
    .drill('createoreexcavation:netherite_drill')
    .alwaysInfinite()
    .stress(2048)
    .fluid('minecraft:lava 500')
    .biomeWhitelist('minecraft:is_nether')
    .id('kubejs:drilling_netherite')

  event.recipes.createoreexcavation
    .drilling([Item.of('irons_spellbooks:arcane_debris').withChance(0.3), Item.of('irons_spellbooks:arcane_essence').withChance(0.8), Item.of('irons_spellbooks:cinder_essence').withChance(0.5)], '{"translate": "createoreexcavation.kubejs.arcane_debris"}', 1, 4000)
    .drill('createoreexcavation:netherite_drill')
    .alwaysInfinite()
    .stress(2048)
    .fluid('hexerei:quicksilver_fluid 50')
    .biomeWhitelist('minecraft:is_overworld')
    .id('kubejs:drilling_arcane')

  event.recipes.createoreexcavation
    .extracting('minecraft:lava 500', '{"translate": "createoreexcavation.kubejs.lava"}', 5, 100)
    .drill('createoreexcavation:diamond_drill')
    .alwaysInfinite()
    .stress(512)
    .biomeWhitelist('minecraft:is_overworld')
    .id('extracting_lava_overworld')

  event.recipes.createoreexcavation
    .extracting('minecraft:lava 1000', '{"translate": "createoreexcavation.kubejs.lava"}', 50, 100)
    .drill('createoreexcavation:diamond_drill')
    .alwaysInfinite()
    .stress(512)
    .biomeWhitelist('minecraft:is_nether')
    .id('extracting_lava_nether')

  event.recipes.createoreexcavation
    .extracting('hexerei:quicksilver_fluid 250', '{"translate": "createoreexcavation.kubejs.quicksilver_fluid"}', 2, 800)
    .drill('createoreexcavation:diamond_drill')
    .alwaysInfinite()
    .stress(640)
    .biomeWhitelist('minecraft:is_overworld')
    .id('extracting_quicksilver')
})