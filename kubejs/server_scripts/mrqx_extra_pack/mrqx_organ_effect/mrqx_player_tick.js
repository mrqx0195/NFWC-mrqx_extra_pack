// priority: 450

/**
 * 玩家Tick秒级策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const mrqxOrganPlayerTickStrategies = {
    // 迷你末地水晶
    'mrqx_extra_pack:mini_end_crystal': function (event, organ) {
        let player = event.player
        let playerChestInstance = player.getChestCavityInstance()
        player.heal(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'crystalsynthesis')) ?? 0)
    },

    // 恶性肿瘤
    'mrqx_extra_pack:malignant_tumor': function (event, organ) {
        let player = event.player
        if (player.age % 1200 != 0) return
        let posMap = getPlayerChestCavityPosMap(player)
        let instance = player.getChestCavityInstance()
        let pos = organ.Slot
        let posList = []
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (!typeMap.has('kubejs:infected') || (Math.random() > typeMap.get('kubejs:infected').length * 0.01)) {
            return
        }
        fourDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) &&
                Item.of(posMap.get(currentPos).id).hasTag('kubejs:organ') && !(
                    Item.of(posMap.get(currentPos).id).hasTag('kubejs:infected') ||
                    Item.of(posMap.get(currentPos).id).hasTag('kubejs:legends') ||
                    Item.of(posMap.get(currentPos).id).hasTag('kubejs:relics') ||
                    Item.of(posMap.get(currentPos).id).hasTag('kubejs:warp'))) {
                posList.push(currentPos)
            }
        })
        let tumor = Item.of('mrqx_extra_pack:malignant_tumor', { organData: {} })
        if (Math.random() < 0.5) {
            tumor = Item.of('kubejs:random_tumor', { organData: {} })
        }
        if (posList.length > 0) {
            let index = randomGet(posList)
            if (organ.tag) {
                let organData = organ.tag.organData
                let tumorData = tumor.nbt.organData
                let b = true
                organData.allKeys.forEach(key => {
                    if (key == 'chestcavity:health') {
                        tumorData[key] = Math.min(organData[key] - 2, organData[key] * (0.5 + Math.random() * 0.25))
                        b = false
                    }
                    else {
                        tumorData[key] = organData[key] * (0.5 + Math.random() * 0.25)
                    }
                })
                if (b) {
                    tumorData['chestcavity:health'] = -2
                }
                tumor.nbt.put('organData', tumorData)
                instance.inventory.setItem(index, tumor)
                global.initChestCavityIntoMap(player, false)
                if (player.persistentData.contains(organActive) &&
                    player.persistentData.getInt(organActive) == 1) {
                    global.updatePlayerActiveStatus(player)
                }
            }
        }
    },

    // “肉斩骨断”肌肉
    'mrqx_extra_pack:muscle_bone_fracture': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
            amplifier *= 2
        }
        player.heal(player.getMaxHealth() * amplifier * 0.001)
    },

    // 纸器官
    'mrqx_extra_pack:lung_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:muscle_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:heart_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:intestine_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:rib_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:spine_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:spleen_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:stomach_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:kidney_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:liver_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },
    'mrqx_extra_pack:appendix_paper_written': function (event, organ) {
        mrqxPaperOrganInWaterRainBubbleFireOrLava(event.player, organ)
    },

    // ‌蒸汽液压杆
    'mrqx_extra_pack:steam_hydraulic_rod': function (event, organ) {
        let player = event.player
        let criticalPunchCount = player.persistentData.getInt(criticalPunch) ?? 0
        player.persistentData.putInt(criticalPunch, criticalPunchCount + mrqxGetSteamCount(player))
    },

    // 真空冷冻机
    'mrqx_extra_pack:vacuum_freezer': function (event, organ) {
        let player = event.player
        let resCount = player.persistentData.getInt(resourceCount)
        let comCount = mrqxGetComputingPower(player)
        ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') - Math.min(resCount, comCount))
        updateResourceCount(player, resCount - Math.min(resCount, comCount))
    },

    // 扭曲熵变机
    'mrqx_extra_pack:warp_entropy_change_machine': function (event, organ) {
        let player = event.player
        let warCount = player.persistentData.getInt(warpCount)
        let warCountMax = player.persistentData.getInt(warpCountMax)
        let comCount = mrqxGetComputingPower(player)
        if (player.persistentData.getBoolean('mrqxWarpEntropyChangeMachineMode')) {
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') - Math.min(warCountMax - warCount, comCount))
            updateWarpCount(player, warCount + Math.min(warCountMax - warCount, comCount))
        } else {
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') + Math.min(warCount, comCount))
            updateWarpCount(player, warCount - Math.min(warCount, comCount))
        }
    },

    // 扭曲电容
    'mrqx_extra_pack:warp_capacitance': function (event, organ) {
        let player = event.player
        let resCount = player.persistentData.getInt(resourceCount)
        let warCount = player.persistentData.getInt(warpCount)
        let resCountMax = player.persistentData.getInt(resourceCountMax)
        let warCountMax = player.persistentData.getInt(warpCountMax)
        let comCount = mrqxGetComputingPower(player)
        if ((resCount / resCountMax) > (warCount / warCountMax)) {
            let count = Math.min(resCount, comCount)
            updateResourceCount(player, resCount - count)
            updateWarpCount(player, warCount + count)
        }
        else {
            let count = Math.min(warCount, comCount)
            updateResourceCount(player, resCount + count)
            updateWarpCount(player, warCount - count)
        }
    },

    // 反应散热器
    'mrqx_extra_pack:heat_vent': function (event, organ) {
        let player = event.player
        let flag = false
        let pos = organ.Slot
        let posMap = getPlayerChestCavityPosMap(event.player)
        fourDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && posMap.get(currentPos).id == 'mrqx_extra_pack:reactor_chamber') {
                flag = true
            }
        })
        if (flag && player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') - 20)
        }
    },

    // 反应热隔层
    'mrqx_extra_pack:thermal_barrier': function (event, organ) {
        let player = event.player
        let flag = false
        let pos = organ.Slot
        let posMap = getPlayerChestCavityPosMap(event.player)
        fourDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && posMap.get(currentPos).id == 'mrqx_extra_pack:reactor_chamber') {
                flag = true
            }
        })
        if (flag && player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            let amplifier = effect.getAmplifier()
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') + amplifier * 3)
        }
    },

    // 反应舱室
    'mrqx_extra_pack:reactor_chamber': function (event, organ) {
        let player = event.player
        let flag = false
        let pos = organ.Slot
        let posMap = getPlayerChestCavityPosMap(event.player)
        fourDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && posMap.get(currentPos).id == 'mrqx_extra_pack:fission_reactor') {
                flag = true
            }
        })
        if (flag && player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            let amplifier = effect.getAmplifier()
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') + amplifier * 5)
        }
    },

    // ‌太阳光镜
    'mrqx_extra_pack:solar_mirror': function (event, organ) {
        let player = event.player
        ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') + player.getBlock().getSkyLight() * 0.5)
    },
}

var assign_organ_player_tick = Object.assign(organPlayerTickStrategies, mrqxOrganPlayerTickStrategies)

/**
 * 玩家Tick秒级唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const mrqxOrganPlayerTickOnlyStrategies = {
    // 山月之魂
    'mrqx_extra_pack:moon_soul': function (event, organ) {
        let player = event.player
        let combo = player.persistentData.getInt('mrqx_moon_soul_combo') ?? 0
        player.persistentData.putInt('mrqx_moon_soul_combo', Math.max(combo - 2, 0))
    },

    // 耀阳种子
    'mrqx_extra_pack:sun_seed': function (event, organ) {
        let player = event.player
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) {
            player.attack(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis')) ?? 0 + typeMap.get('kubejs:mrqx_celestial_body').length + 5)
        }
        else {
            player.heal(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis')) ?? 0 + typeMap.get('kubejs:mrqx_celestial_body').length)
        }
    },

    // 蒸汽汽轮机
    'mrqx_extra_pack:steam_turbine': function (event, organ) {
        let player = event.player
        if (player.hasEffect('mrqx_extra_pack:steam_power')) {
            let effect = player.getEffect('mrqx_extra_pack:steam_power')
            let amplifier = effect.getAmplifier()
            let duration = effect.getDuration()
            let count = amplifier
            if (player.persistentData.contains(resourceCount)) {
                count = player.persistentData.getInt(resourceCount) + count
            }
            updateResourceCount(player, count)
            duration -= 20
            player.removeEffect('mrqx_extra_pack:steam_power')
            player.potionEffects.add('mrqx_extra_pack:steam_power', duration, amplifier, false, false)
        }
    },

    // “道士十五狗”
    'mrqx_extra_pack:taoist_fifteen_dogs': function (event, organ) {
        let player = event.player
        if (player.age % 1200 != 0) return
        for (let i = 0; i < 15; i++) {
            /** @type {Internal.Wolf} */
            let entity = event.getLevel().createEntity('minecraft:wolf')
            entity.getPersistentData().putString('mrqxTaoistFifteenDogs', player.getStringUuid())
            entity.setPosition(player.x, player.y, player.z)
            entity.tame(player)
            entity.setOrderedToSit(false)
            entity.spawn()
        }
    },

    // 幽匿引痕体
    'mrqx_extra_pack:sculk_brandguider': function (event, organ) {
        let player = event.player
        let directions = [
            [0, -1, 0],
            [0, 1, 0],
            [-1, 0, 0],
            [1, 0, 0],
            [0, 0, -1],
            [0, 0, 1],
            [0, 0, 0]
        ]
        for (let dir of directions) {
            let block = player.getLevel().getBlock(player.getBlockX() + dir[0], player.getBlockY() - 1 + dir[1], player.getBlockZ() + dir[2])
            if (block.getTags().find(tag => (tag == 'minecraft:sculk_replaceable'))) {
                block.set('minecraft:sculk')
            }
        }
    },

    // 幽匿之心
    'mrqx_extra_pack:sculk_heart': function (event, organ) {
        return
    },

    // 幽匿集养体
    'mrqx_extra_pack:sculk_collectors': function (event, organ) {
        let player = event.player
        player.setFoodLevel(Math.min(player.getFoodLevel() + mrqxGetSculkCount(player) * 0.01, 20))
        player.setSaturation(Math.min(player.getSaturation() + mrqxGetSculkCount(player) * 0.005, player.getFoodLevel()))
        player.setAirSupply(Math.min(player.getAirSupply() + mrqxGetSculkCount(player) * 0.01, 300))
        let magicData = getPlayerMagicData(player)
        magicData.setMana(Math.min(magicData.getMana() + mrqxGetSculkCount(player) * 0.1, player.getAttributeTotalValue('irons_spellbooks:max_mana')))
    },

    // 国王的新枪
    'mrqx_extra_pack:kings_new_lance': function (event, organ) {
        let player = event.player
        let attriMap = getPlayerAttributeMap(player)
        if (Math.floor(player.getHealth()) <= 1) {
            let value = 1
            attriMap.set(global.mrqx_KINGS_NEW_LANCE.name, value)
            player.modifyAttribute(global.mrqx_KINGS_NEW_LANCE.key, global.mrqx_KINGS_NEW_LANCE.name, value, global.mrqx_KINGS_NEW_LANCE.operation)
            setPlayerAttributeMap(player, attriMap)
        } else {
            player.removeAttribute(global.mrqx_KINGS_NEW_LANCE.key, global.mrqx_KINGS_NEW_LANCE.name)
            attriMap.set(global.mrqx_KINGS_NEW_LANCE.name, 0)
            setPlayerAttributeMap(player, attriMap)
        }
    },

    // 国王的圆饼
    'mrqx_extra_pack:kings_buckler': function (event, organ) {
        let player = event.player
        let attriMap = getPlayerAttributeMap(player)
        if (Math.floor(player.getHealth()) <= 1) {
            let value = 1
            attriMap.set(global.mrqx_KINGS_BUCKLER_A.name, value)
            player.modifyAttribute(global.mrqx_KINGS_BUCKLER_A.key, global.mrqx_KINGS_BUCKLER_A.name, value, global.mrqx_KINGS_BUCKLER_A.operation)
            attriMap.set(global.mrqx_KINGS_BUCKLER_B.name, value)
            player.modifyAttribute(global.mrqx_KINGS_BUCKLER_B.key, global.mrqx_KINGS_BUCKLER_B.name, value, global.mrqx_KINGS_BUCKLER_B.operation)
            setPlayerAttributeMap(player, attriMap)
        } else {
            player.removeAttribute(global.mrqx_KINGS_BUCKLER_A.key, global.mrqx_KINGS_BUCKLER_A.name)
            attriMap.set(global.mrqx_KINGS_BUCKLER_A.name, 0)
            player.removeAttribute(global.mrqx_KINGS_BUCKLER_B.key, global.mrqx_KINGS_BUCKLER_B.name)
            attriMap.set(global.mrqx_KINGS_BUCKLER_B.name, 0)
            setPlayerAttributeMap(player, attriMap)
        }
    },

    // 国王的枝条
    'mrqx_extra_pack:kings_staff': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        if (Math.floor(player.getHealth()) <= 1) {
            magicData.setMana(Math.min(magicData.getMana() + 100, player.getAttributeTotalValue('irons_spellbooks:max_mana')))
        }
    },

    // 国王的延伸
    'mrqx_extra_pack:kings_extension': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        if (Math.floor(player.getHealth()) <= 1) {
            magicData.setMana(Math.min(magicData.getMana() + 200, player.getAttributeTotalValue('irons_spellbooks:max_mana')))
            if (player.getAbsorptionAmount() >= player.getMaxHealth()) {
                return
            }
            let amount = Math.min(player.getAbsorptionAmount() + 3, player.getMaxHealth())
            player.setAbsorptionAmount(amount)
        }
    },

    // 远古巫妖之心
    'mrqx_extra_pack:ancient_lich_heart': function (event, organ) {
        let player = event.player
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom != 1) {
            player.potionEffects.add('goety:cursed', 60, 4, false, false)
            player.potionEffects.add('goety:soul_hunger', 60, 4, false, false)
            player.potionEffects.add('kubejs:magic_forbiden', 60, 4, false, false)
        }
    },

    // 残阳
    'mrqx_extra_pack:broken_sun': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let strength = typeMap.get('kubejs:mrqx_celestial_body').length
        getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16 + strength * 4).forEach(entity => {
            if (entity.getType() == 'minecraft:player') {
                entity.potionEffects.add('minecraft:regeneration', 60, 4, false, false)
                entity.potionEffects.add('minecraft:strength', 60, 3, false, false)
                entity.potionEffects.add('minecraft:resistance', 60, 2, false, false)
                entity.potionEffects.add('minecraft:speed', 60, 1, false, false)
                entity.potionEffects.add('minecraft:night_vision', 60, 0, false, false)
            }
        })
    },

    // 世界框架
    // 'mrqx_extra_pack:framework_of_world': function (event, organ) {
    //     let player = event.player
    //     let instance = player.getChestCavityInstance()
    //     if ((Math.abs(player.x) + Math.abs(player.z)) >= 29999000 * 2 && player.y <= -129 && player.persistentData.getInt(organActive) == 1) {
    //         let newItem = Item.of(organ.id)
    //         let oldItem = instance.inventory.getItem(organ.Slot)
    //         if (oldItem.getDamageValue() >= (60 * 60 * 24)) {
    //             newItem = Item.of('kubejs:genesis')
    //             mrqxEditChestItem(player, newItem, organ.Slot, false, true, false)
    //         }
    //         else {
    //             newItem.setDamageValue(oldItem.getDamageValue() + 1)
    //             mrqxEditChestItem(player, newItem, organ.Slot, false, false, false)
    //         }
    //     }
    //     else {
    //         let newItem = Item.of(organ.id)
    //         newItem.setDamageValue(0)
    //         mrqxEditChestItem(player, newItem, organ.Slot, false, false, false)
    //     }
    // },

    // ‌机械“午夜狂飙”处理器
    'mrqx_extra_pack:machine_midnight_race_cpu': function (event, organ) {
        let player = event.player
        if (player.getLevel().getDayTime() >= 16000 && player.getLevel().getDayTime() <= 19000) {
            player.potionEffects.add('minecraft:speed', 60, mrqxGetComputingPower(player), false, false)
        }
    },

    // ‌月岩
    'mrqx_extra_pack:moon_rock': function (event, organ) {
        let player = event.player
        if (player.isShiftKeyDown()) {
            player.potionEffects.add('minecraft:slow_falling', 60, 0, false, false)
        }
    },

    // ‌‌原罪·懒惰「贝尔芬格」
    'mrqx_extra_pack:sin_acedia_belphegor': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        player.heal(player.getMaxHealth() * 0.03)
        if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
            player.heal(player.getMaxHealth() * 0.03)
        }
    },

    // ‌原罪·贪婪「玛门」
    'mrqx_extra_pack:sin_avaritia_mammon': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        let entityList = mrqxGetLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16)
        entityList.forEach(entity => {
            if (entity.getType() == 'minecraft:item' && player.age % (20 * 60) == 0 && !(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
                entity.kill()
                player.getServer().scheduleInTicks(1, () => {
                    player.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getMaxHealth() * 0.05)
                })
                if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                    player.getServer().scheduleInTicks(1, () => {
                        player.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getMaxHealth() * 0.05)
                    })
                }
            }
        })
    },

    // ‌原罪·色欲「阿斯莫德」
    'mrqx_extra_pack:sin_luxuria_asmodeus': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 8)
        entityList.forEach(entity => {
            if ((entity instanceof $mrqxTamableAnimal) && !mrqxIsEmpty(entity.nbt.Age)) {
                if (entity.nbt.Age >= 0) {
                    entity.setAge(0)
                    entity.setInLove(player)
                    if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
                        entity.setHealth(entity.getHealth() - entity.getMaxHealth() * 0.1)
                        if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                            entity.setHealth(entity.getHealth() - entity.getMaxHealth() * 0.1)
                        }
                    }
                }
                else {
                    if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                        entity.ageUp(100)
                    }
                }
            }
        })
    },

    // ‌原罪·罪源
    'mrqx_extra_pack:origin_sin': function (event, organ) {
        organPlayerTickOnlyStrategies['mrqx_extra_pack:sin_acedia_belphegor'](event, organ)
        organPlayerTickOnlyStrategies['mrqx_extra_pack:sin_avaritia_mammon'](event, organ)
        organPlayerTickOnlyStrategies['mrqx_extra_pack:sin_luxuria_asmodeus'](event, organ)
    },

    // ‌“罪与罚”
    'mrqx_extra_pack:sin_and_judgement': function (event, organ) {
        organPlayerTickOnlyStrategies['mrqx_extra_pack:origin_sin'](event, organ)
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let count = typeMap.get('kubejs:mrqx_seven_sins').length
        let effectList = ['kubejs:pardon_of_god_magic', 'kubejs:pardon_of_god_melee', 'kubejs:pardon_of_god_projectile']
        player.potionEffects.add(randomGet(effectList), count * 30, Math.floor(count / 3), false, false)
    },

    // ‌星空棱镜
    'mrqx_extra_pack:starry_sky_prism': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (player.getLevel().dimensionType() == 'twilightforest:twilight_forest_type') {
            player.potionEffects.add('cataclysm:monstrous', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('alexsmobs:soulsteal', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('goety:insight', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('goety:soul_armor', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('minecraft:regeneration', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('minecraft:haste', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('minecraft:strength', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
            player.potionEffects.add('goety:corpse_eater', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)

        }
        else {
            if (player.getLevel().getDayTime() >= 13000) {
                switch (player.getLevel().getMoonPhase()) {
                    case 0:
                        player.potionEffects.add('cataclysm:monstrous', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 1:
                        player.potionEffects.add('alexsmobs:soulsteal', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 2:
                        player.potionEffects.add('goety:insight', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 3:
                        player.potionEffects.add('goety:soul_armor', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 4:
                        player.potionEffects.add('minecraft:regeneration', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 5:
                        player.potionEffects.add('minecraft:haste', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 6:
                        player.potionEffects.add('minecraft:strength', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    case 7:
                        player.potionEffects.add('goety:corpse_eater', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                        break
                    default:
                        break
                }
            }
        }
    },

    // 日晷
    'mrqx_extra_pack:sundial': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        switch (Math.floor(player.getLevel().getDayTime() / 1000)) {
            case 0:
                player.potionEffects.add('minecraft:jump_boost', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 1:
                player.potionEffects.add('minecraft:speed', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 2:
                player.potionEffects.add('alexsmobs:sunbird_blessing', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 3:
                player.potionEffects.add('cataclysm:blessing_of_amethyst', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 4:
                player.potionEffects.add('alexsmobs:orcas_might', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 5:
                player.potionEffects.add('minecraft:health_boost', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 6:
                player.potionEffects.add('minecraft:fire_resistance', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 7:
                player.potionEffects.add('alexsmobs:knockback_resistance', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 8:
                player.potionEffects.add('goety:photosynthesis', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 9:
                player.potionEffects.add('goety:fortunate', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 10:
                player.potionEffects.add('goety:flame_hands', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 11:
                player.potionEffects.add('goety:rampage', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 12:
                player.potionEffects.add('goety:fiery_aura', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 13:
                player.potionEffects.add('minecraft:saturation', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            default:
                break
        }
    },

    // 天师仪
    'mrqx_extra_pack:tianshi_yi': function (event, organ) {
        let player = event.player
        let cropSet = new Set()
        let count = mrqxGetComputingPower(player)
        mrqxGetConnectedBlocksCount(
            player.getBlockX(),
            player.getBlockY(),
            player.getBlockZ(),
            count,
            player.getLevel(),
            cropSet,
            /**
             * @param {Number} count
             * @param {Number} x
             * @param {Number} y
             * @param {Number} z
             * @param {Number} max
             * @param {Internal.Level} level
             * @param {Set<String>} set
             * @returns {Boolean}
             */
            (x, y, z, max, level, set) => {
                if (level.getBlock(x, y, z).hasTag('minecraft:crops') && Math.random() < 0.01 * max) {
                    let blockState = level.getBlockState(new BlockPos(x, y, z))
                    /** @type {Internal.CropBlock} */
                    let block = level.getBlockState(new BlockPos(x, y, z)).getBlock()
                    block.performBonemeal(level, level.random, new BlockPos(x, y, z), blockState)
                    return true
                }
                return false
            })
        mrqxGetConnectedBlocksCount(
            player.getBlockX(),
            player.getBlockY() + 1,
            player.getBlockZ(),
            count,
            player.getLevel(),
            cropSet,
            /**
             * @param {Number} count
             * @param {Number} x
             * @param {Number} y
             * @param {Number} z
             * @param {Number} max
             * @param {Internal.Level} level
             * @param {Set<String>} set
             * @returns {Boolean}
             */
            (x, y, z, max, level, set) => {
                if (level.getBlock(x, y, z).hasTag('minecraft:crops') && Math.random() < 0.01 * max) {
                    let blockState = level.getBlockState(new BlockPos(x, y, z))
                    /** @type {Internal.CropBlock} */
                    let block = level.getBlockState(new BlockPos(x, y, z)).getBlock()
                    block.performBonemeal(level, level.random, new BlockPos(x, y, z), blockState)
                    return true
                }
                return false
            })
    },

    // 裂变反应堆
    'mrqx_extra_pack:fission_reactor': function (event, organ) {
        let player = event.player
        if (player.hasEffect('mrqx_extra_pack:nuclear_power')) {
            let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
            let amplifier = effect.getAmplifier()
            ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') + amplifier * 10)
        }
    },

    // 幻魔心脏
    'mrqx_extra_pack:phantom_heart': function (event, organ) {
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        let warCount = player.persistentData.getInt(warpCount)
        if (warCount > 120) {
            let magicData = getPlayerMagicData(player)
            magicData.setMana(magicData.getMana() - 200)
            player.potionEffects.add('minecraft:health_boost', 60, 9, false, false)
        }
    },
}

var assign_organ_player_tick_only = Object.assign(organPlayerTickOnlyStrategies, mrqxOrganPlayerTickOnlyStrategies)