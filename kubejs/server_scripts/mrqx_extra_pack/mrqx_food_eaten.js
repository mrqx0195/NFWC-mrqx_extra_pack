// priority: 9

/**
 * 器官食物食用策略
 * @constant
 * @type {Object<string,function(Internal.FoodEatenEventJS, organ):void>}
 */
const mrqxOrganFoodEatenStrategies = {
    // 压缩饼干
    'kubejs:compressed_biscuit': function (event, organ) {
        let typeMap = getPlayerChestCavityTypeMap(event.player)
        if (typeMap.has('kubejs:food')) {
            event.player.setFoodLevel(event.player.getFoodLevel() + typeMap.get('kubejs:food').length * 0.5)
            event.player.setSaturation(event.player.getSaturation() + typeMap.get('kubejs:food').length * 0.5)
        }
    },

    // 黄金压缩饼干
    'kubejs:golden_compressed_biscuit': function (event, organ) {
        let typeMap = getPlayerChestCavityTypeMap(event.player)
        if (typeMap.has('kubejs:food')) {
            event.player.setFoodLevel(event.player.getFoodLevel() + typeMap.get('kubejs:food').length)
            event.player.setSaturation(event.player.getSaturation() + typeMap.get('kubejs:food').length)
        }
        if (typeMap.has('kubejs:magic')) {
            event.player.setFoodLevel(event.player.getFoodLevel() + typeMap.get('kubejs:magic').length)
            event.player.setSaturation(event.player.getSaturation() + typeMap.get('kubejs:magic').length)
        }
    },
}

var assign_organ_food_eaten = Object.assign(organFoodEatenStrategies, mrqxOrganFoodEatenStrategies);

/**
 * 器官食物食用唯一策略
 * @constant
 * @type {Object<string,function(Internal.FoodEatenEventJS, organ):void>}
 */
const mrqxOrganFoodEatenOnlyStrategies = {
    // 黄金压缩饼干
    'kubejs:golden_compressed_biscuit': function (event, organ) {
        let typeMap = getPlayerChestCavityTypeMap(event.player)
        if (typeMap.has('kubejs:food')) {
            player.potionEffects.map.forEach((effect, instance) => {
                if (effect.isBeneficial()) {
                    let amplifier = instance.getAmplifier()
                    let duration = instance.getDuration()
                    let effect = instance.getEffect()
                    player.potionEffects.add(effect, duration + typeMap.get('kubejs:food').length * 20, amplifier)
                }
            })
        }
        if (typeMap.has('kubejs:magic')) {
            player.potionEffects.map.forEach((effect, instance) => {
                if (effect.isBeneficial()) {
                    let amplifier = instance.getAmplifier()
                    let duration = instance.getDuration()
                    let effect = instance.getEffect()
                    player.potionEffects.add(effect, duration + typeMap.get('kubejs:magic').length * 20, amplifier)
                }
            })
        }
    },
}

var assign_organ_food_eaten_only = Object.assign(organFoodEatenOnlyStrategies, mrqxOrganFoodEatenOnlyStrategies);