// priority: 500
StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('endless_dream')
        .setCastTime(20)
        .setCooldownSeconds(60)
        .setBaseManaCost(100)
        .setManaCostPerLevel(50)
        .setCastType('long')
        .setSchool('kubejs:candy')
        .setMinRarity('common')
        .setMaxLevel(10)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.endlessDream(ctx)
        })

    event.create('dream_of_needles')
        .setCastTime(60)
        .setCooldownSeconds(10)
        .setBaseManaCost(100)
        .setManaCostPerLevel(50)
        .setCastType('long')
        .setSchool('kubejs:candy')
        .setMinRarity('common')
        .setMaxLevel(10)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.dreamOfNeedles(ctx)
        })

    event.create('dream_of_singing')
        .setCastTime(40)
        .setCooldownSeconds(120)
        .setBaseManaCost(100)
        .setManaCostPerLevel(50)
        .setCastType('long')
        .setSchool('kubejs:candy')
        .setMinRarity('common')
        .setMaxLevel(10)
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return
            global.dreamOfSinging(ctx)
        })
})

