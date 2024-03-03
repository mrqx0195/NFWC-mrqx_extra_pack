// priority: 9


/**
 * 器官激活策略
 * @constant
 * @type {Object<string,function(Internal.Player, organ, Map):void>}
 */
const lunaorganActiveStrategies = {
    'luna_flesh_reforged:archotech_heart': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 5)
    },
	'luna_flesh_reforged:archotech_spine': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ARMOR, 1)
		attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 1)
    },
    'luna_flesh_reforged:archotech_muscle': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, 1)
    },
    'luna_flesh_reforged:archotech_rib': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ARMOR, 1)
    },
    'luna_flesh_reforged:archotech_spleen': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.MAX_MANA, 100)
    },
    'luna_flesh_reforged:archotech_stomach': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REGENERATION, 0.2)
    },
    'luna_flesh_reforged:archotech_intestine': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REGENERATION, 0.05)
    },
    'luna_flesh_reforged:archotech_kidney': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.06)
    },
    'luna_flesh_reforged:archotech_liver': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 0.05)
    },
    'luna_flesh_reforged:archotech_lung': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2)
    },
    'luna_flesh_reforged:stoneskin_gland': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ARMOR, 3)
    },
    'luna_flesh_reforged:archotech_mana_reactor': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REGENERATION, 0.04)
    },
    'luna_flesh_reforged:archotech_warden_core': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.MAX_MANA, 50)
    },
    'luna_flesh_reforged:chromatic_rose_heart': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:machine')) {
            let value = typeMap.get('kubejs:machine').length * 2
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
        if (typeMap.has('kubejs:rose') || typeMap.has('kubejs:chromatic')) {
            let value1 = typeMap.get('kubejs:rose').length * 1
            let value2 = typeMap.get('kubejs:chromatic').length * 1
            let value = value1 + value2
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
};

var result1=Object.assign(organActiveStrategies,lunaorganActiveStrategies);


/**
 * 器官激活唯一策略
 * @constant
 * @type {Object<string,function(Internal.Player, organ, Map):void>}
 */
const lunaorganActiveOnlyStrategies = {
	
    'luna_flesh_reforged:archotech_toughskin_gland': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value = typeMap.get('kubejs:archotech').length * 2
            attributeMapValueAddition(attributeMap, global.ARMOR, value)
        }
		attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 3)
    },
	'luna_flesh_reforged:psylink_neuro': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value1 = typeMap.get('kubejs:archotech').length * 35
            attributeMapValueAddition(attributeMap, global.MAX_MANA, value1)
            let value2 = typeMap.get('kubejs:archotech').length * 0.03
            let value3 = value2 + 0.1
			attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, value2)
            attributeMapValueAddition(attributeMap, global.SPELL_POWER, value3)
        }
        attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.25)
        attributeMapValueAddition(attributeMap, global.MANA_REGEN, 0.1)
    },
    'luna_flesh_reforged:enchanted_psylink_neuro': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value1 = typeMap.get('kubejs:archotech').length * 45
            attributeMapValueAddition(attributeMap, global.MAX_MANA, value1)
            let value2 = typeMap.get('kubejs:archotech').length * 0.035
            let value3 = value2 + 0.2
            attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, value2)
            attributeMapValueAddition(attributeMap, global.SPELL_POWER, value3)
        }
        attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.25)
        attributeMapValueAddition(attributeMap, global.MANA_REGEN, 0.25)
    },
    'luna_flesh_reforged:infested_heart_distortion': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:infected')) {
            let value0 = typeMap.get('kubejs:infected').length
            let value1 = Math.sqrt(value0)
            let value2 = Math.cbrt(value0)
            let value3 = value1 * value2 * 3
            let value = Math.max(value3, value0 * 2)
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
    },

}

var result2=Object.assign(organActiveOnlyStrategies,lunaorganActiveOnlyStrategies);