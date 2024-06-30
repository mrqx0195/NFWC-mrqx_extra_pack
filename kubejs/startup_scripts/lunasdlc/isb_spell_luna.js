
StartupEvents.registry('irons_spellbooks:spells', event => {

    event.create('luna_flesh_reforged:void_shock')
        .setCooldownSeconds(1800)
        .setBaseManaCost(150)
        .setManaCostPerLevel(50)
        .setSchool('irons_spellbooks:eldritch')
        .setMinRarity('epic')
        .setMaxLevel(5)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.EldritchVoidShock(ctx)
        })
})