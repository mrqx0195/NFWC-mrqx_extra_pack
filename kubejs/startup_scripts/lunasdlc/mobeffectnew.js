
StartupEvents.registry('mob_effect', event => {
    event.create('luna_flesh_reforged:lunatouch_attack')
        .beneficial()
        .modifyAttribute('forge:attack_range', 'kubejsAttackRange', 2, "addition")
        .color(Color.DARK_RED)
})