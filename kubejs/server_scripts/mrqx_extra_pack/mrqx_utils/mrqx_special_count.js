// priority: 940

/**
 * 获取算力
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetComputingPower(player) {
    if (!player) return 0
    let typeMap = getPlayerChestCavityTypeMap(player)
    let playerChestInstance = player.getChestCavityInstance()
    let count = 0
    let onlySet = new Set()
    count += playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'nerves'))
    if (typeMap.has('kubejs:mrqx_cpu')) {
        count += typeMap.get('kubejs:mrqx_cpu').length
        typeMap.get('kubejs:mrqx_cpu').forEach(organ => {
            if (!onlySet.has(organ.id) && organ.id in mrqxComputingPowerOnlyStrategies) {
                onlySet.add(organ.id)
                count += mrqxComputingPowerOnlyStrategies[organ.id](player, organ)
            }
            else if (organ.id in mrqxComputingPowerStrategies) {
                onlySet.add(organ.id)
                count += mrqxComputingPowerStrategies[organ.id](player, organ)
            }
        })
    }
    return count
}

/**
 * 获取算力处理策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer,organ):number>}
 */
const mrqxComputingPowerStrategies = {
    // 处理器
    'mrqx_extra_pack:cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_cpu')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_cpu').length
        }
    },

}
/**
 * 获取唯一算力处理策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer,organ):number>}
 */
const mrqxComputingPowerOnlyStrategies = {

    // 天体“占星”处理器
    'mrqx_extra_pack:celestial_body_astrology_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_celestial_body')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_celestial_body').length
        }
    },

    // ‌机械“熔核之心”处理器
    'mrqx_extra_pack:machine_burn_flare_heart_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:machine')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:machine').length
        }
    },

    // ‌机械“会心一击”处理器
    'mrqx_extra_pack:machine_critical_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let count = 0
        if (typeMap.has('kubejs:damage')) {
            count += getPlayerChestCavityTypeMap(player).get('kubejs:damage').length
        }
        if (typeMap.has('kubejs:damage_only')) {
            count += getPlayerChestCavityTypeMap(player).get('kubejs:damage_only').length * 2
        }
        return count
    },

    // ‌机械“午夜狂飙”处理器
    'mrqx_extra_pack:machine_midnight_race_cpu': function (player, organ) {
        let playerChestInstance = player.getChestCavityInstance()
        return playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'speed'))
    },

    // ‌机械“挖矿”处理器
    'mrqx_extra_pack:machine_burn_flare_heart_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:resource')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:resource').length
        }
    },

    // ‌机械“核能之心”处理器
    'mrqx_extra_pack:machine_nuclear_heart_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_nuclear')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_nuclear').length
        }
    },

    // 魔能“玻璃大炮”处理器
    'mrqx_extra_pack:magic_glass_cannon_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:magic')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:magic').length
        }
    },

    // 玫瑰“花语”处理器
    'mrqx_extra_pack:rose_language_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:rose')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:rose').length
        }
    },

    // 玫瑰“再度绽放”处理器
    'mrqx_extra_pack:rose_second_bloom_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:rose')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:rose').length
        }
    },

    // ‌深海“灯塔”处理器
    'mrqx_extra_pack:seaborn_beacon_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_seaborn').length
        }
    },

    // 蒸汽“动力”处理器
    'mrqx_extra_pack:steam_power_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_steam')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_steam').length
        }
    },

    // 幽匿“感染”处理器
    'mrqx_extra_pack:sculk_infection_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_sculk')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_sculk').length
        }
    },

    // 反物质“逆向”处理器
    'mrqx_extra_pack:antimatter_reverse_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_antimatter')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_antimatter').length
        }
    },

    // 龙化“神龙”处理器
    'mrqx_extra_pack:dragon_long_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:dragon')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:dragon').length
        }
    },

    // 糖果“甜腻”处理器
    'mrqx_extra_pack:candy_sugary_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:candy')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:candy').length
        }
    },

    // “降神”处理器
    'mrqx_extra_pack:seance_cpu': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:legends')) {
            return getPlayerChestCavityTypeMap(player).get('kubejs:legends').length
        }
    },
}

/**
 * 获取蒸汽计数
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetSteamCount(player) {
    let count = 0
    let itemMap = getPlayerChestCavityItemMap(player)
    if (itemMap.has('mrqx_extra_pack:steam_engine') && player.hasEffect('mrqx_extra_pack:steam_power')) {
        count = itemMap.get('mrqx_extra_pack:steam_engine').length * (player.getEffect('mrqx_extra_pack:steam_power').getAmplifier() + 1)
    }
    return count
}