// priority: 450
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('mrqx_extra_pack:earth_without_earth')
        .setCastTime(20 * 15)
        .setCooldownSeconds(20 * 120)
        .setBaseManaCost(2000)
        .setCastType('long')
        .setSchool('kubejs:magnificent')
        .setMinRarity('legendary')
        .setMaxLevel(1)
        .setFinishSound('entity.lightning_bolt.thunder')
        .canBeCraftedBy(() => false)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.mrqxEarthWithoutEarth(ctx)
        })
})