// priority: 500
ColdSweatEvents.temperatureChanged(event => {
    //温度改变时触发效果的器官
    if (event.getTrait() != $Trait.BODY) return
    let player = event.player
    let typeMap = getPlayerChestCavityTypeMap(player);

    let onlySet = new Set()
    if (typeMap.has('kubejs:tempterature_only')) {
        typeMap.get('kubejs:tempterature_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organPlayerTempteratureOnlyStrategies[organ.id](event, organ)
            }
        })
    }
    if (typeMap.has('kubejs:tempterature')) {
        typeMap.get('kubejs:tempterature').forEach(organ => {
            organPlayerTempteratureStrategies[organ.id](event, organ)
        })
    }
})


/**
 * 玩家温度变化策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayerTempteratureStrategies = {
    'kubejs:ice_rib': function (event, organ) {
        let player = event.player
        let tempterature = ColdSweat.getTemperature(player, 'body')
        if (tempterature >= 0) return
        player.absorptionAmount = Math.floor((-1) * tempterature / 16)
    }
}


/**
 * 玩家温度变化唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayerTempteratureOnlyStrategies = {
    'kubejs:flame_heart': function (event, organ) {
        let player = event.player
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
        let player = event.player
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
        let player = event.player
        let tempterature = (-1) * ColdSweat.getTemperature(player, 'body')
        player.removeAttribute("irons_spellbooks:ice_spell_power", 'kubejsIceLung')
        if (tempterature > 0) {
            player.modifyAttribute("irons_spellbooks:ice_spell_power", 'kubejsIceLung', 0.1 * tempterature / 50, 'multiply_base')
        }
    }
}