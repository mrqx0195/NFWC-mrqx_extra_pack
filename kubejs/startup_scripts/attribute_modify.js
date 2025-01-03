// priority: 1000
global.attributes = {}

StartupEvents.registry('attribute', event => {
    global.attributes.MAGNIFICENT_SPELL_POWER = event.create('magnificent_spell_power', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)
    global.attributes.MAGNIFICENT_SPELL_RESISTANCE = event.create('magnificent_spell_resistance', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)

    global.attributes.CANDY_SPELL_POWER = event.create('candy_spell_power', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)
    global.attributes.CANDY_SPELL_RESISTANCE = event.create('candy_spell_resistance', 'irons_spells_js:spell').setDefaultValue(1.0).setMinimumValue(0.0).setMaximumValue(10.0)


    event.createCustom("kubejs:critical_hit", () => new $RangedAttribute("attribute.kubejs.critical_hit", 0, -1024, 1024).setSyncable(true))
    event.createCustom("kubejs:critical_damage", () => new $RangedAttribute("attribute.kubejs.critical_hit", 1.5, -1024, 1024).setSyncable(true))
})


ForgeModEvents.onEvent('net.minecraftforge.event.entity.EntityAttributeModificationEvent', event => {
    event.types.forEach(type => {
        event.add(type, global.attributes.MAGNIFICENT_SPELL_POWER.get())
        event.add(type, global.attributes.MAGNIFICENT_SPELL_RESISTANCE.get())
        event.add(type, global.attributes.CANDY_SPELL_POWER.get())
        event.add(type, global.attributes.CANDY_SPELL_RESISTANCE.get())
    })
    event.add($EntityType.PLAYER, "kubejs:critical_hit")
    event.add($EntityType.PLAYER, "kubejs:critical_damage")
})