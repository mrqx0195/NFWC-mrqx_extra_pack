// priority: 450

/**
 * 器官激活策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, organ, Map):void>}
 */
const mrqxOrganActiveStrategies = {
    // 噩梦醇
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:marenol': function (player, organ, attributeMap) {
        return
    },

    // 活化巨瘤
    'mrqx_extra_pack:activated_giant_tumor': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player)
        let playerChestInstance = player.getChestCavityInstance()
        let pos = organ.Slot
        eightDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            let currentId = posMap.get(currentPos)
            currentId = currentId ?? null
            if (currentPos < 0 || currentPos >= 27 || currentId == null || !Item.of(currentId.get('id')).hasTag('kubejs:infected')) {
                attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_TOTAL, 0.5)
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
    },

    // 反物质心脏
    'mrqx_extra_pack:heart_antimatter': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
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
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.1)
        }
        else {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.05)
        }
    },

    // “生存的重压”肋骨
    'mrqx_extra_pack:rib_the_pressure_to_survive': function (player, organ, attributeMap) {
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
            attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, 0.1)
        }
        else {
            attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, 0.05)
        }
    },

    // ‌月岩
    'mrqx_extra_pack:moon_rock': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_celestial_body')) {
            let count = typeMap.get('kubejs:mrqx_celestial_body').length
            attributeMapValueAddition(attributeMap, global.mrqx_GRAVITY_MULTI_TOTAL, (0.8 ** count) - 1)
        }
    },

    // 扭曲变电箱
    'mrqx_extra_pack:warp_electrical_box': function (player, organ, attributeMap) {
        let maxCount = ((player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax) + (player.persistentData.getInt(warpCountMax) ?? defaultWarpMax)) / 2 + 25
        player.persistentData.putInt(resourceCountMax, maxCount)
        updateResourceMaxCount(player, maxCount)
        player.persistentData.putInt(warpCountMax, maxCount)
        updateWarpMaxCount(player, maxCount)
    },

    // 扭曲电容
    'mrqx_extra_pack:warp_capacitance': function (player, organ, attributeMap) {
        let warpMaxCount = player.persistentData.getInt(warpCountMax) ?? defaultWarpMax
        player.persistentData.putInt(warpCountMax, warpMaxCount + 50)
        let resMaxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, resMaxCount + 50)
    },

    // 无用的圆环
    'mrqx_extra_pack:useless_ring': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 0.1)
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 0.1)
    },

    // 骑士链锤
    'mrqx_extra_pack:knight_chain_hammer': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 0.5)
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 0.5)
    },
}

var assign_organ_active = Object.assign(organActiveStrategies, mrqxOrganActiveStrategies)

/**
 * 器官激活唯一策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, organ, Map):void>}
 */
const mrqxOrganActiveOnlyStrategies = {
    // 裂变反应堆
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:fission_reactor': function (player, organ, attributeMap) {
        return
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
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:proud_soul': function (player, organ, attributeMap) {
        return
    },

    // 死狱之魂
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:prison_soul': function (player, organ, attributeMap) {
        return
    },

    // 灵狐之魂
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:fox_soul': function (player, organ, attributeMap) {
        return
    },

    // 山月之魂
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:moon_soul': function (player, organ, attributeMap) {
        return
    },

    // 耀阳种子
    'mrqx_extra_pack:sun_seed': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) return
        attributeMapValueAddition(attributeMap, global.HOLY_SPELL_DAMAGE, playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0 + typeMap.get('kubejs:mrqx_celestial_body').length) * 0.05)
    },

    // “涌潮悲歌”心脏
    'mrqx_extra_pack:heart_tidal_elegy': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
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
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
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
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
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
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
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
            let organ = chestInventory[i]
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
                    let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_seaborn')
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
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
            amplifier *= 2
        }
        attributeMapValueAddition(attributeMap, global.MAX_MANA, amplifier * 50)
    },

    // 灵魂之翼
    'mrqx_extra_pack:wing_of_soul': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_FLYING_SPEED, 2)
        attributeMapValueAddition(attributeMap, global.mrqx_FALL_FLYING, 1)
    },

    // 永恒灵魂之翼
    'mrqx_extra_pack:eternal_wing_of_soul': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_FLYING_SPEED, 3)
        player.getPersistentData().putBoolean('mrqxEternalWingOfSoul', true)
        player.abilities.mayfly = true
        player.onUpdateAbilities()
    },

    // 指令施法核心
    'mrqx_extra_pack:command_spell_core': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_SPELL_POWER_MULTI_BASE, 1)
    },

    // 金酒之杯
    'mrqx_extra_pack:golden_chalice': function (player, organ, attributeMap) {
        let count = Math.floor(organ.tag.getInt('mrqxGoldenChaliceMoney') / 5)
        attributeMapValueAddition(attributeMap, global.ATTACK_SPEED, count * 0.1)
    },

    // 复激活药丸
    'mrqx_extra_pack:re_active_pill': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let list = []
        let map = new Map()
        if (typeMap.has('kubejs:active_only')) {
            typeMap.get('kubejs:active_only').forEach(organs => {
                if (!list.find((organId) => (organId == organs.id && organId != 'mrqx_extra_pack:re_active_pill'))) {
                    list.push(organs.id)
                    map.set(organs.id, organs)
                }
            })
        }
        let randomOrgan = randomGet(list)
        organActiveOnlyStrategies[randomOrgan](player, map[randomOrgan], attributeMap)
    },

    // “法师控制强”
    'mrqx_extra_pack:mage_control_strong': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ICE_SPELL_POWER, 1)
    },

    // 诸王的冠冕
    'mrqx_extra_pack:kings_crown': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_king')) {
            if (typeMap.get('kubejs:mrqx_king').length >= 5) {
                attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 2.5)
            }
            else if (typeMap.get('kubejs:mrqx_king').length >= 3) {
                attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 1.5)
            }
            return
        }
        attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, 0.5)
    },

    // 国王的护戒
    'mrqx_extra_pack:kings_fellowship': function (player, organ, attributeMap) {
        if ((player.getHealth() / player.getMaxHealth()) > 0.5) {
            if (player.getAbsorptionAmount() < player.getMaxHealth()) {
                let amount = Math.min(player.getAbsorptionAmount() + (player.getHealth() - player.getMaxHealth() / 2), player.getMaxHealth())
                player.setAbsorptionAmount(amount)
            }
            player.setHealth(player.getMaxHealth() / 2)
        }
    },

    // 国王的铠甲
    'mrqx_extra_pack:kings_armor': function (player, organ, attributeMap) {
        if (player.getHealth() > 1) {
            if (player.getAbsorptionAmount() < player.getMaxHealth()) {
                let amount = Math.min(player.getAbsorptionAmount() + player.getHealth() - 1, player.getMaxHealth())
                player.setAbsorptionAmount(amount)
            }
            player.setHealth(1)
        }
    },

    // 远古巫妖之心
    'mrqx_extra_pack:ancient_lich_heart': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_CAST_TIME, 2)
    },

    // 天体“占星”处理器
    'mrqx_extra_pack:celestial_body_astrology_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_celestial_body')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_celestial_body') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_celestial_body') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_celestial_body', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_celestial_body', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 世界框架
    'mrqx_extra_pack:framework_of_world': function (player, organ, attributeMap) {
        if (!mrqxIsMysteryQuestUnlocked(player)) {
            /** @type {Internal.LightningBolt} */
            let lightning = player.level.createEntity("minecraft:lightning_bolt")
            lightning.moveTo(player.block.pos)
            lightning.setVisualOnly(false)
            lightning.spawn()
            player.getPersistentData().putBoolean("mrqx_mq", true)
        }
    },

    // 长伸缩攻击臂
    'mrqx_extra_pack:long_telescopic_attack_arm': function (player, organ, attributeMap) {
        let count = mrqxGetComputingPower(player)
        attributeMapValueAddition(attributeMap, global.ATTACK_RANGE, count * 0.5)
        for (let i = 0; i < count; i++) {
            attributeMapValueAddition(attributeMap, global.mrqx_ATTACK_SPEED_MULTI_TOTAL, 0.5)
        }
    },

    // 长伸缩活塞臂
    'mrqx_extra_pack:long_telescopic_piston_arm': function (player, organ, attributeMap) {
        let count = mrqxGetComputingPower(player)
        attributeMapValueAddition(attributeMap, global.REACH_DISTANCE, count * 0.5)
        for (let i = 0; i < count; i++) {
            attributeMapValueAddition(attributeMap, global.mrqx_ATTACK_SPEED_MULTI_TOTAL, 0.5)
        }
    },

    // ‌机械“熔核之心”处理器
    'mrqx_extra_pack:machine_burn_flare_heart_cpu': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player)
        let chestInventory = player.getChestCavityInstance().inventory.tags
        itemMap.delete('kubejs:revolution_gear')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            if (Item.of(itemId).getId() == 'kubejs:revolution_gear') {
                if (itemMap.has(itemId)) {
                    let itemList = itemMap.get(itemId)
                    itemList.push(organ)
                    itemMap.set(itemId, itemList)
                } else {
                    itemMap.set(itemId, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityItemMap(player).get('kubejs:revolution_gear') ?? []
        let uuid = String(player.getUuid())
        itemMap.set('kubejs:revolution_gear', itemList)
        playerChestCavityItemMap.set(uuid, itemMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        itemMap.set('kubejs:revolution_gear', itemList)
        playerChestCavityItemMap.set(uuid, itemMap)

        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:machine')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:machine') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        itemList = getPlayerChestCavityTypeMap(player).get('kubejs:machine') ?? []
        typeMap.set('kubejs:machine', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:machine', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // ‌机械“会心一击”处理器
    'mrqx_extra_pack:machine_critical_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, mrqxGetComputingPower(player) * 0.015)
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, mrqxGetComputingPower(player) * 0.015)
    },

    // ‌机械闪避处理器
    'mrqx_extra_pack:machine_dodge_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.DODGE, Math.max(mrqxGetComputingPower(player) * 0.005, 0.5))
    },

    // ‌机械“午夜狂飙”处理器
    'mrqx_extra_pack:machine_midnight_race_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_MOVEMENT_SPEED_MULTI_BASE, mrqxGetComputingPower(player) * 0.05)
    },

    // ‌机械“挖矿”处理器
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:machine_mine_cpu': function (player, organ, attributeMap) {
        return
    },

    // ‌机械格挡处理器
    'mrqx_extra_pack:machine_parry_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.PARRY, Math.max(mrqxGetComputingPower(player) * 0.005, 0.5))
    },

    // ‌机械储能处理器
    'mrqx_extra_pack:machine_storage_cpu': function (player, organ, attributeMap) {
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + mrqxGetComputingPower(player) * 10)
    },

    // 魔能速充处理器
    'mrqx_extra_pack:magic_fast_charging_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_MAX_MANA_MULTI_BASE, mrqxGetComputingPower(player) * -0.02)
        attributeMapValueAddition(attributeMap, global.mrqx_MANA_REGEN_MULTI_BASE, mrqxGetComputingPower(player) * 0.1)
    },

    // 魔能“玻璃大炮”处理器
    'mrqx_extra_pack:magic_glass_cannon_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, mrqxGetComputingPower(player) * -0.05)
        attributeMapValueAddition(attributeMap, global.mrqx_SPELL_POWER_MULTI_BASE, mrqxGetComputingPower(player) * 0.2)
    },

    // 魔能过载处理器
    'mrqx_extra_pack:magic_overload_cpu': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_MANA_REGEN_MULTI_BASE, mrqxGetComputingPower(player) * -0.02)
        attributeMapValueAddition(attributeMap, global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE, mrqxGetComputingPower(player) * 0.5)
        attributeMapValueAddition(attributeMap, global.mrqx_CAST_TIME_MULTI_BASE, mrqxGetComputingPower(player) * 0.5)
    },

    // 墨染
    'mrqx_extra_pack:mrqx0195': function (player, organ, attributeMap) {
        if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_future_1")) return
        player.stages.add("mrqx_future_1")
    },

    // ‌复激活药丸·温和化
    'mrqx_extra_pack:re_active_pill_moderation': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let list = []
        let map = new Map()
        if (typeMap.has('kubejs:active')) {
            typeMap.get('kubejs:active').forEach(organs => {
                if (!list.find((organId) => (organId == organs.id))) {
                    list.push(organs.id)
                    map.set(organs.id, organs)
                }
            })
        }
        for (let i = 0; i < 5; i++) {
            let randomOrgan = randomGet(list)
            organActiveStrategies[randomOrgan](player, map[randomOrgan], attributeMap)
        }
    },

    // 玫瑰“花语”处理器
    'mrqx_extra_pack:rose_language_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:rose')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:rose') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:rose') ?? []
        typeMap.set('kubejs:rose', itemList)
        let uuid = String(player.getUuid())
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:rose', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 玫瑰“再度绽放”处理器
    'mrqx_extra_pack:rose_second_bloom_cpu': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let list = []
        let map = new Map()
        if (typeMap.has('kubejs:rose')) {
            typeMap.get('kubejs:rose').forEach(organs => {
                if (!list.find((organId) => (organId == organs.id))) {
                    if (Item.of(organs.id).hasTag('kubejs:active')) {
                        list.push(organs.id)
                        map.set(organs.id, organs)
                    }
                }
            })
        }
        let count = Math.floor(mrqxGetComputingPower(player) / 3)
        for (let i = 0; i < count; i++) {
            let randomOrgan = randomGet(list)
            organActiveStrategies[randomOrgan](player, map[randomOrgan], attributeMap)
        }
    },

    // ‌深海“灯塔”处理器
    'mrqx_extra_pack:seaborn_beacon_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_seaborn')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_seaborn') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_seaborn') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_seaborn', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_seaborn', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 蒸汽“动力”处理器
    'mrqx_extra_pack:steam_power_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_steam')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_steam') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_steam') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_steam', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_steam', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 幽匿“感染”处理器
    'mrqx_extra_pack:sculk_infection_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_sculk')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_sculk') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_sculk') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_sculk', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_sculk', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 反物质“逆向”处理器
    'mrqx_extra_pack:antimatter_reverse_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_antimatter')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_antimatter') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_antimatter') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_antimatter', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_antimatter', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 龙化“神龙”处理器
    'mrqx_extra_pack:dragon_long_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:dragon')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:dragon') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:dragon') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:dragon', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:dragon', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 糖果“甜腻”处理器
    'mrqx_extra_pack:candy_sugary_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:candy')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:candy') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:candy') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:candy', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:candy', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // 机械“核能之心”处理器
    'mrqx_extra_pack:machine_nuclear_heart_cpu': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:mrqx_nuclear')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:mrqx_nuclear') {
                    continue
                }
                tag = String(tag)
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let itemList = getPlayerChestCavityTypeMap(player).get('kubejs:mrqx_nuclear') ?? []
        let uuid = String(player.getUuid())
        typeMap.set('kubejs:mrqx_nuclear', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
        itemList = itemList.concat(mrqxMultiplyArrayLength([organ], Math.floor(mrqxGetComputingPower(player))))
        typeMap.set('kubejs:mrqx_nuclear', itemList)
        playerChestCavityTypeMap.set(uuid, typeMap)
    },

    // ‌‌原罪·懒惰「贝尔芬格」
    'mrqx_extra_pack:sin_acedia_belphegor': function (player, organ, attributeMap) {
        if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
            attributeMapValueAddition(attributeMap, global.mrqx_MOVEMENT_SPEED_MULTI_BASE, -0.5)
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                attributeMapValueAddition(attributeMap, global.mrqx_MOVEMENT_SPEED_MULTI_BASE, -0.5)
            }
        }
    },

    // ‌原罪·贪婪「玛门」
    'mrqx_extra_pack:sin_avaritia_mammon': function (player, organ, attributeMap) {
        if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
            attributeMapValueAddition(attributeMap, global.LUCK_MULTI_BASE, -1)
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                attributeMapValueAddition(attributeMap, global.LUCK_MULTI_BASE, -1)
            }
        }
    },

    // 原罪·贪食「别西卜」
    'mrqx_extra_pack:sin_gula_beelzebub': function (player, organ, attributeMap) {
        if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
            let playerChestInstance = player.getChestCavityInstance()
            playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'digestion'), new $Float(playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'digestion')) * 0.1))
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'digestion'), new $Float(playerChestInstance.getOrganScores().get(new ResourceLocation('chestcavity', 'digestion')) * 0.1))
            }
        }
    },

    // ‌‌原罪·嫉妒「利维坦」
    'mrqx_extra_pack:sin_invidia_leviathan': function (player, organ, attributeMap) {
        if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, -0.5)
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, -0.5)
            }
        }
    },

    // ‌原罪·暴怒「萨迈尔」
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:sin_ira_samael': function (player, organ, attributeMap) {
        return
    },

    // ‌原罪·色欲「阿斯莫德」
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:sin_luxuria_asmodeus': function (player, organ, attributeMap) {
        return
    },

    // ‌原罪·傲慢「路西法」
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:sin_superbia_lucifer': function (player, organ, attributeMap) {
        return
    },

    // ‌原罪·罪源
    'mrqx_extra_pack:origin_sin': function (player, organ, attributeMap) {
        organActiveOnlyStrategies['mrqx_extra_pack:sin_acedia_belphegor'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_avaritia_mammon'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_gula_beelzebub'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_invidia_leviathan'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_ira_samael'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_luxuria_asmodeus'](player, organ, attributeMap)
        organActiveOnlyStrategies['mrqx_extra_pack:sin_superbia_lucifer'](player, organ, attributeMap)
    },

    // ‌“罪与罚”
    'mrqx_extra_pack:sin_and_judgement': function (player, organ, attributeMap) {
        organActiveOnlyStrategies['mrqx_extra_pack:origin_sin'](player, organ, attributeMap)
    },

    // 自动蜡护仪
    // 实际运行逻辑不在这，这只是为了防止报错
    'mrqx_extra_pack:automatic_wax_protector': function (player, organ, attributeMap) {
        return
    },

    // 能量核心
    'mrqx_extra_pack:energy_core': function (player, organ, attributeMap) {
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + 2100000000)
    },

    // 富集矿簇析出膜
    'mrqx_extra_pack:enriched_ore_cluster_precipitation_membrane': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player)
        if (itemMap.has('kubejs:ore_lung')) {
            let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
            player.persistentData.putInt(resourceCountMax, maxCount + itemMap.get('kubejs:ore_lung').length * 100)
            let typeMap = getPlayerChestCavityTypeMap(player)
            let list = []
            typeMap.get('kubejs:break_only').forEach(organ => {
                if (organ.id != 'kubejs:ore_lung') {
                    list.push(organ)
                }
            })
            typeMap.set('kubejs:break_only', list)
            playerChestCavityTypeMap.set(player.getUuid(), typeMap)
        }
    },

    // 幻魔心脏
    'mrqx_extra_pack:phantom_heart': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, -0.5)
    },

    // 幻影骑士甲
    'mrqx_extra_pack:phantom_knight_armor': function (player, organ, attributeMap) {
        let playerChestInstance = player.getChestCavityInstance()
        playerChestInstance.organScores.put(new ResourceLocation('chestcavity', 'buoyant'), new $Float(2.9))
    },

    // 湮灭链锤
    'mrqx_extra_pack:knight_chain_hammer_of_annihilation': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 1)
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 1)
    },

    // 骑士核心
    'mrqx_extra_pack:core_of_knights': function (player, organ, attributeMap) {
        let count = mrqxGetCoreOfKnightCount(player)
        attributeMapValueAddition(attributeMap, global.mrqx_HEALTH_UP_MULTI_BASE, count * 0.1)
        attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, count * 0.1)
        attributeMapValueAddition(attributeMap, global.ARMOR_MULTI_BASE, count * 0.1)
    },

    // 龙皇核心
    'mrqx_extra_pack:core_of_dragon_emperor': function (player, organ, attributeMap) {
        let chestInventory = player.getChestCavityInstance().inventory.tags
        let typeMap = getPlayerChestCavityTypeMap(player)
        typeMap.delete('kubejs:rose')
        for (let i = 0; i < chestInventory.length; i++) {
            let organ = chestInventory[i]
            let itemId = String(organ.getString('id'))
            let tagList = Item.of(itemId).getTags().toArray()
            for (let i = 0; i < tagList.length; i++) {
                let tag = tagList[i].location()
                if (tag != 'kubejs:rose' && tag != 'kubejs:dragon') {
                    continue
                }
                tag = 'kubejs:rose'
                if (typeMap.has(tag)) {
                    let itemList = typeMap.get(tag)
                    itemList.push(organ)
                    typeMap.set(tag, itemList)
                } else {
                    typeMap.set(tag, [organ])
                }
            }
        }
        let uuid = String(player.getUuid())
        playerChestCavityTypeMap.set(uuid, typeMap)
        if (typeMap.has('kubejs:rose')) {
            attributeMapValueAddition(attributeMap, global.ATTACK_UP_MULTI_BASE, typeMap.get('kubejs:rose').length * 0.05)
        }
    },
}

var assign_organ_active_only = Object.assign(organActiveOnlyStrategies, mrqxOrganActiveOnlyStrategies)