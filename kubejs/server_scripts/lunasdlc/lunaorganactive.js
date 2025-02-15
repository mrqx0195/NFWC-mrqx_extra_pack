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
    'luna_flesh_reforged:archotech_magic_digestive_system': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REGENERATION, 0.25)
    },
    'luna_flesh_reforged:archotech_warden_core': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.MAX_MANA, 100)
    },
    'luna_flesh_reforged:bioferrite_fluid_muscle': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.MANA_REGEN, 0.1)
        let pos = organ.Slot
        let rowOffset = Math.abs(Math.floor(pos / 9) - 1)
        let lineOffset = Math.abs(pos % 9 - 4)
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2 * (lineOffset + rowOffset))
    },
    'luna_flesh_reforged:dragon_heartstring': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.01)
        attributeMapValueAddition(attributeMap, global.SPELL_POWER, 0.01)
        attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.01)
    },
    'luna_flesh_reforged:abyssalwarlock_eye': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.025)
        attributeMapValueAddition(attributeMap, global.SPELL_POWER, 0.025)
        attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.025)
    },
    'luna_flesh_reforged:chromatic_rose_heart': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:rose')) {
            let value = typeMap.get('kubejs:rose').length * 1
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
    },
    'luna_flesh_reforged:chromatic_rose_muscle': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:rose')) {
            let value = typeMap.get('kubejs:rose').length * 0.25
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
        if (typeMap.has('kubejs:chromatic')) {
            let value = typeMap.get('kubejs:chromatic').length * 0.5
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
    'luna_flesh_reforged:chromatic_piston': function (player, organ, attributeMap) {
        organActiveStrategies['luna_flesh_reforged:chromatic_rose_muscle'](player, organ, attributeMap)
    },
    'luna_flesh_reforged:flesh_tentacle': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { 
                let infected = typeMap.get('kubejs:infected').length
                attributeMapValueAddition(attributeMap, global.HEALTH_UP, infected)
            }}
    },
    'luna_flesh_reforged:flesh_whip': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { 
                let infected = typeMap.get('kubejs:infected').length
                attributeMapValueAddition(attributeMap, global.HEALTH_UP, infected*0.25)
                attributeMapValueAddition(attributeMap, global.ATTACK_UP, infected*0.25)
            }}
    },
};

var result1=Object.assign(organActiveStrategies,lunaorganActiveStrategies);


/**
 * 器官激活唯一策略
 * @constant
 * @type {Object<string,function(Internal.Player, organ, Map):void>}
 */
const lunaorganActiveOnlyStrategies = {
	
    'luna_flesh_reforged:warped_battery': function (player, organ, attributeMap) {
        let warp = player.persistentData.getInt(warpCount) ?? 0
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        if(warp>80){player.persistentData.putInt(resourceCountMax, maxCount + 250)}
        else if(warp>60){player.persistentData.putInt(resourceCountMax, maxCount + 200)}
        else if(warp>40){player.persistentData.putInt(resourceCountMax, maxCount + 150)}
        else if(warp>24){player.persistentData.putInt(resourceCountMax, maxCount + 100)}
        else if(warp>12){player.persistentData.putInt(resourceCountMax, maxCount + 50)}
        else {player.persistentData.putInt(resourceCountMax, maxCount + 25)}
    },
    'luna_flesh_reforged:chromatic_rose_heart': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:chromatic')) {
            let value = typeMap.get('kubejs:chromatic').length * 1
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
    'luna_flesh_reforged:archotech_abyssal_core': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.05)
        attributeMapValueAddition(attributeMap, global.SPELL_POWER, 0.05)
        attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.05)
        attributeMapValueAddition(attributeMap, global.lunaMAX_MANA, 0.1)
    },
    'luna_flesh_reforged:archotech_toughskin_gland': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value = typeMap.get('kubejs:archotech').length * 2
            attributeMapValueAddition(attributeMap, global.ARMOR, value)
        }
		attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 3)
    },
    'luna_flesh_reforged:archotech_toughspine': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value = typeMap.get('kubejs:archotech').length * 2
            attributeMapValueAddition(attributeMap, global.ARMOR, value)
        }
        attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 3)
    },
    'luna_flesh_reforged:archotech_doublerib_right': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_doublerib_left') {
            attributeMapValueAddition(attributeMap, global.ARMOR, 4)
            attributeMapValueAddition(attributeMap, global.lunaSPELL_RESIST, 0.1)
        }
        attributeMapValueAddition(attributeMap, global.ARMOR, 2)
    },
    'luna_flesh_reforged:archotech_doublerib_left': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_doublerib_right') {
            attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 4)
            attributeMapValueAddition(attributeMap, global.lunaSPELL_RESIST, 0.1)
        }
        attributeMapValueAddition(attributeMap, global.ARMOR, 2)
    },
    'luna_flesh_reforged:archotech_kidney_left': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_kidney_right') {
            let typeMap = getPlayerChestCavityTypeMap(player)
            if(typeMap.has('kubejs:archomuscle')){
                let value = typeMap.get('kubejs:archomuscle').length * 2
                attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
            }
        }
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.06)
    },
    'luna_flesh_reforged:archotech_kidney_right': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_kidney_left') {
            let typeMap = getPlayerChestCavityTypeMap(player)
            if(typeMap.has('kubejs:archomuscle')){
                let playerChestInstance = player.getChestCavityInstance()
                let value1 = playerChestInstance.getOrganScore('chestcavity:nerves') / 40
                let value2 = Math.min(typeMap.get('kubejs:archomuscle').length*0.04,0.32)
                let value = value1 + value2
                attributeMapValueAddition(attributeMap, global.lunaATTACK_UP_MULTI_TOTAL, value)
            }
        }
        attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.06)
    },
    'luna_flesh_reforged:archotech_lung_left': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2)
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_lung_right') {
            let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
            player.persistentData.putInt(resourceCountMax, maxCount + 150)
        }
    },
    'luna_flesh_reforged:archotech_lung_right': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2)
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_lung_left') {
            let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
            player.persistentData.putInt(resourceCountMax, maxCount + 150)
        }
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
    'luna_flesh_reforged:archotech_void_heart_engine': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player);
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:warp')) {
            let warporgan = typeMap.get('kubejs:warp').length
            let maxWarp = player.persistentData.getInt(warpCountMax) ?? defaultWarpMax
            player.persistentData.putInt(warpCountMax, maxWarp + warporgan*5)}
        if (typeMap.has('kubejs:archotech')) {
            let archotech = typeMap.get('kubejs:archotech').length
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, archotech)
            let playerChestInstance = player.getChestCavityInstance()
            if(archotech >= 27){
                playerChestInstance.organScores.forEach((key, value) => {
                    playerChestInstance.organScores.put(key, new $Float(value*2))
                })}
            if(itemMap.has('luna_flesh_reforged:enchanted_psylink_neuro') || itemMap.has('luna_flesh_reforged:psylink_neuro')){
                attributeMapValueAddition(attributeMap, global.MAX_MANA, archotech*archotech)
                attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.05)
                if(itemMap.has('luna_flesh_reforged:enchanted_psylink_neuro')){
                    attributeMapValueAddition(attributeMap, global.COOLDOWN_REDUCTION, 0.1)}}
            if(itemMap.has('luna_flesh_reforged:archotech_void_spleen')){
                attributeMapValueAddition(attributeMap, global.MANA_REGEN, 0.1)}
                if(itemMap.has('luna_flesh_reforged:archotech_void_liver')){
                    attributeMapValueAddition(attributeMap, global.lunaATTACK_UP_MULTI_TOTAL_TWICE, archotech/50)}
            if(itemMap.has('luna_flesh_reforged:archotech_warden_core') || itemMap.has('luna_flesh_reforged:void_shock_core')){
                attributeMapValueAddition(attributeMap, global.lunaELDRITCH_SPELL_POWER_INDEMULT, archotech/100)
                if(itemMap.has('luna_flesh_reforged:void_shock_core')){
                    attributeMapValueAddition(attributeMap, global.lunaSPELL_POWER_INDEMULT, archotech/100)}}
            if(typeMap.has('kubejs:archomuscle')){
                let archomuscle = typeMap.get('kubejs:archomuscle').length
                attributeMapValueAddition(attributeMap, global.ATTACK_UP, archomuscle)
                if(itemMap.has('luna_flesh_reforged:bioferrite_fluid_muscle') && itemMap.has('luna_flesh_reforged:archotech_void_tentacle') && itemMap.has('luna_flesh_reforged:archotech_void_whip')){
                    let strength = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength'))
                    let speed = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'speed'))
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'strength'),new $Float(strength*(1+Math.min(0.8,archomuscle/10))))
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'speed'),new $Float(speed*(1+Math.min(0.8,archomuscle/10))))
                }}
            if(itemMap.has('luna_flesh_reforged:jump_second_spiritual_heart')){
                attributeMapValueAddition(attributeMap, global.lunaELDRITCH_SPELL_POWER_INDEMULT, 0.1)
                attributeMapValueAddition(attributeMap, global.lunaCAST_TIME_REDUCTION, 0.1)}
            if(itemMap.has('luna_flesh_reforged:archotech_kidney_left') && itemMap.has('luna_flesh_reforged:archotech_kidney_right')){
                attributeMapValueAddition(attributeMap, global.ATTACK_UP, archotech)
                if (typeMap.has('kubejs:warp')) {
                    let warporgan = typeMap.get('kubejs:warp').length
                    attributeMapValueAddition(attributeMap, global.lunaATTACK_UP_MULTI_TOTAL, warporgan/66)
                }}
            if(itemMap.has('luna_flesh_reforged:archotech_doublerib_left') && itemMap.has('luna_flesh_reforged:archotech_doublerib_right')){
                attributeMapValueAddition(attributeMap, global.ARMOR_MULTI_BASE, archotech/66)}
            if(itemMap.has('luna_flesh_reforged:archotech_toughspine')){
                attributeMapValueAddition(attributeMap, global.LunaARMOR_TOUGHNESS_MULTI_BASE, archotech/33)}
        }
    },
    'luna_flesh_reforged:archotech_void_spleen': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value = typeMap.get('kubejs:archotech').length * 100
            attributeMapValueAddition(attributeMap, global.MAX_MANA, value)
        }
        if (typeMap.has('kubejs:warp')) {
            let value0 = typeMap.get('kubejs:warp').length * 0.1
            let value1 = Math.min(0.5,value0)
            attributeMapValueAddition(attributeMap, global.lunaMAX_MANA, value1)
        }
    },
    'luna_flesh_reforged:archotech_void_liver': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:archotech')) {
            let value = typeMap.get('kubejs:archotech').length * 0.1
            attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, value)
        }
        if (typeMap.has('kubejs:warp')) {
            let value0 = typeMap.get('kubejs:warp').length * 0.02
            let value1 = Math.min(0.12,value0)
            attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, value1)
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, value1)
        }
    },
    'luna_flesh_reforged:archotech_void_tentacle': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        let itemMap = getPlayerChestCavityItemMap(player);
        if(itemMap.has('luna_flesh_reforged:archotech_void_tentacle')){
            let tentacle = itemMap.get('luna_flesh_reforged:archotech_void_tentacle').length
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, tentacle*2)
            if (posMap.has(opPos) && posMap.get(opPos).id != 'luna_flesh_reforged:archotech_void_tentacle' && tentacle > 1) {
                let typeMap = getPlayerChestCavityTypeMap(player);
                if (typeMap.has('kubejs:archotech')) { 
                    let archotech = typeMap.get('kubejs:archotech').length
                    attributeMapValueAddition(attributeMap, global.ATTACK_RANGE, Math.cbrt(archotech))
                    attributeMapValueAddition(attributeMap, global.REACH_DISTANCE, Math.cbrt(archotech))
                    attributeMapValueAddition(attributeMap, global.HEALTH_UP, Math.cbrt(archotech))
                }
            }
        }
    },
    'luna_flesh_reforged:archotech_void_whip': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        let itemMap = getPlayerChestCavityItemMap(player);
        if(itemMap.has('luna_flesh_reforged:archotech_void_whip')){
            let whip = itemMap.get('luna_flesh_reforged:archotech_void_whip').length
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, whip*2)
            if (posMap.has(opPos) && posMap.get(opPos).id != 'luna_flesh_reforged:archotech_void_whip' && whip > 1) {
                let typeMap = getPlayerChestCavityTypeMap(player);
                if (typeMap.has('kubejs:archotech')) { 
                    let archotech = typeMap.get('kubejs:archotech').length
                    attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, Math.sqrt(archotech)/10)
                }
                let playerChestInstance = player.getChestCavityInstance()
                let strength = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength'))
                let speed = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'speed'))
                if(speed>10){
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'strength'),new $Float(strength + speed/2))
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'speed'),new $Float(speed/2))
                }
            }
        }
    },
    'luna_flesh_reforged:bioferrite_fluid_muscle': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player);
        let typeMap = getPlayerChestCavityTypeMap(player);
        let multiplier = 1
        if (itemMap.has('luna_flesh_reforged:bioferrite_fluid_muscle')) {
            multiplier = Math.min(4,itemMap.get('luna_flesh_reforged:bioferrite_fluid_muscle').length)
        }
        let value = 0
        if (typeMap.has('kubejs:warp')) {
            value = value + typeMap.get('kubejs:warp').length * multiplier
        }
        if (typeMap.has('kubejs:archotech')) {
            value = value + typeMap.get('kubejs:archotech').length
        }
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
    },
    'luna_flesh_reforged:void_shock_core': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:warp')) {
            let value = typeMap.get('kubejs:warp').length * 100
            attributeMapValueAddition(attributeMap, global.MAX_MANA, value)
        }
        organActiveOnlyStrategies['kubejs:pride_shard'](player, organ, attributeMap)
    },
    'luna_flesh_reforged:fallen_paradise': function (player, organ, attributeMap) {
        if (organ.tag?.forgeTimes) {
            let value = organ.tag.forgeTimes * 1
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
    'luna_flesh_reforged:jump_second_spiritual_heart': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:heart')) {
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, 4)
        }
        attributeMapValueAddition(attributeMap, global.lunaICE_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaFIRE_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaLIGHTNING_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaHOLY_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaENDER_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaBLOOD_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaEVOCATION_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaNATURE_SPELL_POWER_INDEMULT, -0.25)
        attributeMapValueAddition(attributeMap, global.lunaSPELL_POWER_INDEMULT, 0.5)
    },
    'luna_flesh_reforged:infested_heart_distortion': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        let playerChestInstance = player.getChestCavityInstance()
        let fire_resistant = new $Float(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'fire_resistant')))
        if(itemMap.has('kubejs:prismarine_crown') || itemMap.has('stray_expansion:kether')){
            playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'digestion'),new $Float(0))
        } else {
            if (fire_resistant > 0){
                playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'digestion'),new $Float(0))
            }
        }
        if (typeMap.has('kubejs:infected')) {
            let value0 = typeMap.get('kubejs:infected').length
            let value1 = Math.sqrt(value0)
            let value2 = Math.cbrt(value0)
            let value3 = value1 * value2 * 3
            let value = Math.max(value3, value0 * 2)
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
    },
    'luna_flesh_reforged:infested_spine_distortion': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { let infected = typeMap.get('kubejs:infected').length
                if(infected > 4){attributeMapValueAddition(attributeMap, global.HEALTH_UP, 4)}}}
    },
    'luna_flesh_reforged:infested_stomach_distortion': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { let infected = typeMap.get('kubejs:infected').length
                if(infected > 4){attributeMapValueAddition(attributeMap, global.HEALTH_UP, 4)}}}
    },
    'luna_flesh_reforged:infested_tumour_distortion': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { 
                let infected = typeMap.get('kubejs:infected').length
                attributeMapValueAddition(attributeMap, global.HEALTH_UP, infected)
                let playerChestInstance = player.getChestCavityInstance()
                let metabolism = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'metabolism')) + infected
                let health = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'health'))
                playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'metabolism'),new $Float(metabolism))
                if (metabolism > health){
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'health'),new $Float(metabolism))
                }
            }}
    },
    'luna_flesh_reforged:flesh_tentacle': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        let itemMap = getPlayerChestCavityItemMap(player)
        if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
            if (typeMap.has('kubejs:infected')) { 
                let infected = typeMap.get('kubejs:infected').length
                attributeMapValueAddition(attributeMap, global.ATTACK_RANGE, Math.cbrt(infected))
                attributeMapValueAddition(attributeMap, global.REACH_DISTANCE, Math.cbrt(infected))
                if (itemMap.has('luna_flesh_reforged:infested_heart_distortion') && itemMap.has('luna_flesh_reforged:infested_spine_distortion') && itemMap.has('luna_flesh_reforged:infested_tumour_distortion') && itemMap.has('luna_flesh_reforged:flesh_tentacle')) {
                    let playerChestInstance = player.getChestCavityInstance()
                    let tentacle = itemMap.get('luna_flesh_reforged:flesh_tentacle').length
                    playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'strength'),new $Float(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength'))+2*tentacle))
                }
            }}
    },
    'luna_flesh_reforged:flesh_whip': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player)
        if (itemMap.has('luna_flesh_reforged:infested_heart_distortion') && itemMap.has('luna_flesh_reforged:infested_heart_distortion') && itemMap.has('luna_flesh_reforged:infested_spine_distortion') && itemMap.has('luna_flesh_reforged:infested_tumour_distortion') && itemMap.has('luna_flesh_reforged:flesh_whip')) {
            let playerChestInstance = player.getChestCavityInstance()
            let whip = itemMap.get('luna_flesh_reforged:flesh_whip').length
            playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'strength'),new $Float(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength'))+2*whip))
        }
    },

    
    'luna_flesh_reforged:llama_in_chestcavity': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let lung = 0 
        if (typeMap.has('kubejs:lung')) { 
            lung = lung + typeMap.get('kubejs:lung').length
        }
		let playerChestInstance = player.getChestCavityInstance()
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'forceful_spit'),new $Float(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'forceful_spit'))+lung))
    },
    'luna_flesh_reforged:tnt_in_chestcavity': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let explosiveI = 0
        playerChestInstance.organScores.forEach((key, value) => {
            if(value>0){
                explosiveI= explosiveI + playerChestInstance.organScores.get(key)
            }
        })
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'explosive'), new $Float(explosiveI) )  
    },
    'luna_flesh_reforged:dirt_in_chestcavity': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player);
        let dirt = 0
        if (itemMap.has('minecraft:dirt')) {
            dirt = dirt + itemMap.get('minecraft:dirt').length
        }
        if (itemMap.has('luna_flesh_reforged:dirt_in_chestcavity')) {
            dirt = dirt + itemMap.get('luna_flesh_reforged:dirt_in_chestcavity').length
        }
        let playerChestInstance = player.getChestCavityInstance()
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'luck'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'luck')),dirt/27)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'health'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'health')),dirt/27)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'nutrition'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'nutrition')),dirt/27*4)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'filtration'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'filtration')),dirt/27*2)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'detoxification'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'detoxification')),dirt/27)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'breath_recovery'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'breath_recovery')),dirt/27*2)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'breath_capacity'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'breath_capacity')),dirt/27*2)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'endurance'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'endurance')),dirt/27*2)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'strength'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength')),dirt/27*8)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'speed'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'speed')),dirt/27*8)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'defense'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'defense')),dirt/27*4.5)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'nerves'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'nerves')),dirt/27)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'metabolism'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'metabolism')),dirt/27)))
		playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'digestion'),new $Float(Math.max(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'digestion')),dirt/27)))
    },

}

var result2=Object.assign(organActiveOnlyStrategies,lunaorganActiveOnlyStrategies);