const mrqxOrganActiveStrategies = {
    // 噩梦醇
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:marenol': function (player, organ, attributeMap) {
        return
    },

    // 活化巨瘤
    'mrqx_extra_pack:activated_giant_tumor': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player)
        let playerChestInstance = player.getChestCavityInstance()
        let pos = organ.Slot
        let count = 0
        eightDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos)) {
                let currentId = posMap.get(currentPos).id
                if (currentId < 0 || currentId >= 27 || (currentId != 'kubejs:random_tumor' && currentId != 'kubejs:stomach_tumor')) {
                    count -= 0.12
                }
            }
        })
        posMap.forEach(pos => {
            let currentId = pos.id
            if ((currentId == 'kubejs:random_tumor')) {
                let organData = pos.tag.organData
                for (let key in organData) {
                    playerChestInstance.organScores.put(new ResourceLocation(key), new $Float(organData[key] + playerChestInstance.getOrganScores().get(new ResourceLocation(key))))
                }
            }
        })
        playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'health'), Math.max(playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'health')), 1))
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, count)
    },

    // 魔能速充处理器
    'mrqx_extra_pack:magic_fast_charging_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_MAX_MANA_MULTI_BASE, -0.9)
        attributeMapValueAddition(attributeMap, global.mrqx_MANA_REGEN_MULTI_BASE, 9)
    },

    // 魔能过载处理器
    'mrqx_extra_pack:magic_overload_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_MANA_REGEN_MULTI_BASE, -0.9)
        attributeMapValueAddition(attributeMap, global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE, 9)
    },

    // 魔能“玻璃大炮”处理器
    'mrqx_extra_pack:magic_glass_cannon_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, -0.9)
        attributeMapValueAddition(attributeMap, global.mrqx_SPELL_POWER_MULTI_BASE, 9)
    },

    // 重锤
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:mace': function (player, organ, attributeMap) {
        return
    },

    // 反物质心脏
    'mrqx_extra_pack:heart_antimatter': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player);
        playerChestInstance.organScores.forEach((key, value) => {
            if (value < 0) {
                let antimatterValue = typeMap.get('kubejs:antimatter').length * 1
                playerChestInstance.organScores.put(key, new $Float(-value + antimatterValue))
            }
            else {
                playerChestInstance.organScores.put(key, new $Float(-value))
            }
        })
    },
}

function getAllMethods(obj) {
    let result = [];
    for (let id in obj) {
        try {
            result.push(id + ": " + obj[id].toString());
        } catch (err) {
            result.push(id + ": Not accessible");
        }
    }
    return result;
}

var assign1 = Object.assign(organActiveStrategies, mrqxOrganActiveStrategies);

const mrqxOrganActiveOnlyStrategies = {
    // 裂变反应堆
    'mrqx_extra_pack:fission_reactor': function (player, organ, attributeMap) {
        if (player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            let amplifier = effect.getAmplifier()
            attributeMapValueAddition(attributeMap, global.mrqx_ATTACK_UP_MULTI_BASE, amplifier * 0.4)
        }
    },

    // 黄金天秤
    'mrqx_extra_pack:golden_libra': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let minScore = 2147483647.0
        playerChestInstance.organScores.forEach((key, value) => {
            if (value > 0) {
                minScore = Math.min(value, minScore)
            }
        })
        let count = 0.0
        playerChestInstance.organScores.forEach((key, value) => {
            if (value > 0) {
                count += value - minScore
            }
        })
        playerChestInstance.organScores.forEach((key, value) => {
            if (value > 0) {
                playerChestInstance.organScores.put(key, new $Float(minScore))
            }
        })
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, count)
    },

    // 冒险者证章
    'mrqx_extra_pack:adventurers_badge': function (player, organ, attributeMap) {
        let diffStage = player.stages.getAll().toArray().find(ele => ele.startsWith('difficult_level_'))
        let diffLevelNum = 1
        if (diffStage) {
            diffLevelNum = diffStage.match('difficult_level_(\\d+)')[1]
        }
        while (diffLevelNum--) {
            attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, 0.1)
            attributeMapValueAddition(attributeMap, global.mrqx_ATTACK_UP_MULTI_BASE, 0.1)
        }
    },

    // 荣耀之魂
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:proud_soul': function (player, organ, attributeMap) {
        return
    },

    // 死狱之魂
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:prison_soul': function (player, organ, attributeMap) {
        return
    },

    // 灵狐之魂
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:fox_soul': function (player, organ, attributeMap) {
        return
    },

    // 山月之魂
    //实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:moon_soul': function (player, organ, attributeMap) {
        return
    },

    // 耀阳种子
    'mrqx_extra_pack:sun_seed': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) return
        attributeMapValueAddition(attributeMap, global.HOLY_SPELL_DAMAGE, playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) * 0.05)
    },

    // 暗日种子
    'mrqx_extra_pack:dark_sun_seed': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        attributeMapValueAddition(attributeMap, global.mrqx_ATTACK_UP_MULTI_BASE, playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) / (player.getArmorValue() + 1))
    },
}

var assign2 = Object.assign(organActiveOnlyStrategies, mrqxOrganActiveOnlyStrategies);