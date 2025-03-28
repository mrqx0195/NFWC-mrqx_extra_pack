// priority: 500
StartupEvents.registry('irons_spellbooks:schools', event => {
    event.create('magnificent')
        .setName(Text.of(Text.translatable("school.kubejs.magnificent")).darkPurple())
        .setFocus('kubejs:magnificent_focus')
        .setPowerAttribute('kubejs:magnificent_spell_power')
        .setResistanceAttribute('kubejs:magnificent_spell_resistance')
        .setDefaultCastSound('irons_spellbooks:cast.generic.holy')

    event.create('candy')
        .setName(Text.of(Text.translatable("school.kubejs.candy")).color('#fcc2e4'))
        .setFocus('kubejs:candy_focus')
        .setPowerAttribute('kubejs:candy_spell_power')
        .setResistanceAttribute('kubejs:candy_spell_resistance')
        .setDefaultCastSound('irons_spellbooks:cast.generic.holy')
})