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

}


/**
 * 玩家温度变化唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayertemperatureOnlyStrategies = {
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