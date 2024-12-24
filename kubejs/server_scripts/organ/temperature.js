// priority: 500
ColdSweatEvents.temperatureChanged(event => {
    //温度改变时触发效果的器官
    if (event.getTrait() != $Trait.CORE) return
    let player = event.entity
    if (!player.isPlayer()) return
    let typeMap = getPlayerChestCavityTypeMap(player);

    let onlySet = new Set()
    if (typeMap.has('kubejs:temperature_only')) {
        typeMap.get('kubejs:temperature_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organPlayertemperatureOnlyStrategies[organ.id](event, organ)
            }
        })
    }
    if (typeMap.has('kubejs:temperature')) {
        typeMap.get('kubejs:temperature').forEach(organ => {
            organPlayertemperatureStrategies[organ.id](event, organ)
        })
    }
})


/**
 * 玩家温度变化策略
 * @constant
 * @type {Object<string,function(Internal.TempChangedEventJS, organ):void>}
 */
const organPlayertemperatureStrategies = {
    'kubejs:ice_rib': function (event, organ) {
        let player = event.entity
        if (!player.isPlayer()) return
        let temperature = ColdSweat.getTemperature(player, 'body')
        let oldTemperature = event.oldTemperature
        if (temperature >= 0) return
        player.absorptionAmount += (-1) * (temperature - oldTemperature) / 16
        player.modifyAttribute("minecraft:generic.knockback_resistance", 'kubejsIceRib', - temperature / 150, 'addition')
    }
}


/**
 * 玩家温度变化唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayertemperatureOnlyStrategies = {
    'kubejs:flame_heart': function (event, organ) {
        let player = event.entity
        if (!player.isPlayer()) return
        if (ColdSweat.getTemperature(player, 'body') > 50) {
            let typeMap = getPlayerChestCavityTypeMap(player)
            let amplifier = 0
            if (typeMap.has('kubejs:flame')) {
                amplifier = amplifier + typeMap.get('kubejs:flame').length
            }
            let value = Math.max(Math.floor(amplifier * 0.5), 0)
            player.potionEffects.add('kubejs:overload', 30, value, false, false)
        }
    },
    'kubejs:ice_heart': function (event, organ) {
        let player = event.entity
        if (!player.isPlayer()) return
        if (ColdSweat.getTemperature(player, 'body') < -50) {
            let typeMap = getPlayerChestCavityTypeMap(player)
            let amplifier = 0
            if (typeMap.has('kubejs:ice')) {
                amplifier = amplifier + typeMap.get('kubejs:ice').length
            }
            let value = Math.max(Math.floor(amplifier * 0.5), 0)
            player.potionEffects.add('kubejs:ice', 30, value, false, false)
        }
    },
    'kubejs:ice_lung': function (event, organ) {
        let player = event.entity
        if (!player.isPlayer()) return
        let temperature = (-1) * ColdSweat.getTemperature(player, 'body')
        player.removeAttribute("irons_spellbooks:ice_spell_power", 'kubejsIceLung')
        if (temperature > 0) {
            player.modifyAttribute("irons_spellbooks:ice_spell_power", 'kubejsIceLung', 0.1 * temperature / 10, 'multiply_base')
        }
    },
    'kubejs:hydra_fiery_blood_essence': function (event, organ) {
        let player = event.entity
        if (!player.isPlayer()) return
        let temperature = ColdSweat.getTemperature(player, 'body')
        player.removeAttribute("irons_spellbooks:fire_spell_power", 'kubejsHydraFieryBloodEssence')
        if (temperature > 0) {
            player.modifyAttribute("irons_spellbooks:fire_spell_power", 'kubejsHydraFieryBloodEssence', 0.1 * temperature / 20, 'multiply_base')
        }
    }
}