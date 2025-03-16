// priority: 950
const mrqxDiscWares = [
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:abyssgazer_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:arghena_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:dantalion_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:desive_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:designant_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:rain_of_conflict_in_a_radiant_abyss_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:inverted_world_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:straight_into_the_lights_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:kirakira_noel_story_disc')], 1),
    new SimpleWares([Item.of('lightmanscurrency:coin_diamond').withCount(1)], [Item.of('mrqx_disc_pack:fudahuang_disc')], 1),
]
mrqxDiscWares.forEach(ware => {
    SpecialWares.push(ware)
})