PlayerEvents.tick(event=>{
    let player = event.player
    let typeMap = getPlayerChestCavityTypeMap(player);


    //若温度抗性属性未激活，则激活之
    if (!player.persistentData.contains('burn_cold_point')){
        player.persistentData.putInt('burn_cold_point',0)
    }
    if (typeMap.has('kubejs:burn_cold_point')) {
        if (player.persistentData.getInt('burn_cold_point') != 1){
            let bPoint = 0
            let cPoint = 0
            typeMap.get('kubejs:burn_cold_point').forEach(organ => {
                bPoint += global.ORGAN_BURNING_AND_COLD_POINTS.get(organ.id)[0]
                cPoint += global.ORGAN_BURNING_AND_COLD_POINTS.get(organ.id)[1]
            })
            player.modifyAttribute("cold_sweat:burning_point",'kubejsBpoint',bPoint,'addition')
            player.modifyAttribute("cold_sweat:freezing_point",'kubejsCpoint',cPoint,'addition')
            player.persistentData.putInt('burn_cold_point',1)
        }
    }
    else{  
        if (player.persistentData.getInt('burn_cold_point') == 1){
            player.removeAttribute("cold_sweat:burning_point",'kubejsBpoint')
            player.removeAttribute("cold_sweat:freezing_point",'kubejsCpoint')
            player.persistentData.putInt('burn_cold_point',0)
        }
    }
    //温度改变时触发效果的器官
    if (player.age % 20 != 0) return
    let tempterature = $Temperature.get(player,$Trait.BODY)
    if (!player.persistentData.contains('tempterature')){
        player.persistentData.putFloat('tempterature',tempterature)

    }

    if (player.persistentData.getInt('tempterature') != tempterature){

        if (Math.abs(tempterature) >= 100) {
            coldsweat.setTemperature(player, 'core', Math.sign(tempterature) * (100 - $Temperature.get(player,$Trait.BASE)))
            tempterature = $Temperature.get(player,$Trait.BODY)
        }
        player.persistentData.putFloat('tempterature',tempterature)

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

    }
})

/**
 * 玩家温度变化策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayerTempteratureStrategies = {
    'kubejs:ice_rib': function (event, organ){
        let player = event.player
        let tempterature = coldsweat.getTemperature(player,'body')
        if (tempterature >= 0) return
        player.absorptionAmount = Math.floor(-tempterature/16)
    }
}


/**
 * 玩家温度变化唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const organPlayerTempteratureOnlyStrategies = {
    'kubejs:flame_heart': function (event, organ){
        let player = event.player
        if (coldsweat.getTemperature(player,'body')>50){
            let typeMap = getPlayerChestCavityTypeMap(player)
            let amplifier = 0
            if (typeMap.has('kubejs:flame')) {
                amplifier = amplifier + typeMap.get('kubejs:flame').length
            }
            let value = Math.max( Math.floor(amplifier * 0.5) , 0 )
            player.potionEffects.add('kubejs:overload', 30 , value , false, false)
        }
    },
    'kubejs:ice_heart': function (event, organ){
        let player = event.player
        if (coldsweat.getTemperature(player,'body')<-50){
            let typeMap = getPlayerChestCavityTypeMap(player)
            let amplifier = 0
            if (typeMap.has('kubejs:ice')) {
                amplifier = amplifier + typeMap.get('kubejs:ice').length
            }
            let value = Math.max( Math.floor(amplifier * 0.5) , 0 )
            player.potionEffects.add('kubejs:ice', 30 , value , false, false)
        }
    },
    'kubejs:ice_lung': function(event, organ){
        let player = event.player
        let tempterature = -coldsweat.getTemperature(player,'body')
        player.removeAttribute("irons_spellbooks:ice_spell_power",'kubejsIceLung')
        if (tempterature > 0){
            player.modifyAttribute("irons_spellbooks:ice_spell_power",'kubejsIceLung',0.1 * tempterature/50, 'multiply_base')
        }
    }
}