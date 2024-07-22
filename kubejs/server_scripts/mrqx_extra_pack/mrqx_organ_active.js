// priority: 9

/**
 * 器官激活策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, organ, Map):void>}
 */
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
                let currentId = posMap.get(currentPos)
                if (currentPos < 0 || currentPos >= 27 || !Item.of(currentId).hasTag('kubejs:infected')) {
                    count -= 0.12
                }
            }
            else {
                count -= 0.12
            }
        })
        posMap.forEach(pos => {
            let currentId = pos.id
            if ((currentId == 'kubejs:random_tumor' || currentId == 'mrqx_extra_pack:malignant_tumor')) {
                let organData = pos.tag.organData
                for (let key in organData) {
                    playerChestInstance.organScores.put(new ResourceLocation(key), new $Float(organData[key] + playerChestInstance.getOrganScores().get(new ResourceLocation(key))))
                }
            }
        })
        playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'health'), new $Float(Math.max(playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'health')), 1)))
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

    // 反物质心脏
    'mrqx_extra_pack:heart_antimatter': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player);
        playerChestInstance.organScores.forEach((key, value) => {
            if (value < 0) {
                let antimatterValue = typeMap.get('kubejs:mrqx_antimatter').length * 1
                playerChestInstance.organScores.put(key, new $Float(-value + antimatterValue))
            }
            else {
                playerChestInstance.organScores.put(key, new $Float(-value))
            }
        })
    },

    // “肉斩骨断”肌肉
    'mrqx_extra_pack:muscle_bone_fracture': function (player, organ, attributeMap) {
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.1)
        }
        else {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.05)
        }
    },

    // “生存的重压”肋骨
    'mrqx_extra_pack:rib_the_pressure_to_survive': function (player, organ, attributeMap) {
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, 0.1)
        }
        else {
            attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, 0.05)
        }
    },
}

var assign1 = Object.assign(organActiveStrategies, mrqxOrganActiveStrategies);

/**
 * 器官激活唯一策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, organ, Map):void>}
 */
const mrqxOrganActiveOnlyStrategies = {
    // 裂变反应堆
    'mrqx_extra_pack:fission_reactor': function (player, organ, attributeMap) {
        if (player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            let amplifier = effect.getAmplifier() + 1
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, amplifier * 0.4)
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
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.1)
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
        attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) / (player.getArmorValue() + 1))
    },

    // “涌潮悲歌”心脏
    'mrqx_extra_pack:heart_tidal_elegy': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            amplifier *= 2
        }
        attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, amplifier * 0.1)
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, amplifier * 0.1)
        attributeMapValueAddition(attributeMap, global.ARMOR_MULTI_BASE, amplifier * 0.1)
    },

    // “潮汐守望”肝
    'mrqx_extra_pack:liver_tide_observation': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            amplifier *= 2
        }
        attributeMapValueAddition(attributeMap, global.mrqx_MANA_REGEN_MULTI_BASE, amplifier * 0.2)
    },

    // “集群狩猎”胰
    'mrqx_extra_pack:pancreas_group_hunting': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            amplifier *= 2
        }
        attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, amplifier * 0.1)
    },

    // “深海直觉”脊柱
    'mrqx_extra_pack:spine_abyssal_intuition': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            amplifier *= 2
        }
        playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'nerves'), new $Float(playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'nerves')) + amplifier))
    },

    // “同化，变异”阑尾
    'mrqx_extra_pack:appendix_assimilation_mutation': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        let chestInventory = player.getChestCavityInstance().inventory.tags
        typeMap.delete('kubejs:mrqx_seaborn')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i];
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            let b = true
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag == 'kubejs:legends' || tag == 'kubejs:relics' || tag == 'kubejs:warp') {
                    b = false
                    break
                }
            }
            if (b) {
                if (typeMap.has('kubejs:mrqx_seaborn')) {
                    let itemList = typeMap.get('kubejs:mrqx_seaborn')
                    itemList.push(organ)
                    typeMap.set('kubejs:mrqx_seaborn', itemList)
                } else {
                    typeMap.set('kubejs:mrqx_seaborn', [organ])
                }
            }
        }
        let uuid = String(player.getUuid())
        playerChestCavityTypeMap.set(uuid, typeMap)
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
            amplifier *= 2
        }
        attributeMapValueAddition(attributeMap, global.MAX_MANA, amplifier * 50)
    },
}

var assign2 = Object.assign(organActiveOnlyStrategies, mrqxOrganActiveOnlyStrategies);