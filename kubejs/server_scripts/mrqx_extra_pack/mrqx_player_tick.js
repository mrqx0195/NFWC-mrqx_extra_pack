// priority: 9

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
            let entity = event.getLevel().createEntity('minecraft:wolf')
            entity.getPersistentData().putString('mrqxTaoistFifteenDogs', player.getStringUuid())
            entity.setPosition(player.x, player.y, player.z)
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
    'mrqx_extra_pack:framework_of_world': function (event, organ) {
        let player = event.player
        let instance = player.getChestCavityInstance()
        if ((Math.abs(player.x) + Math.abs(player.z)) >= 29999000 * 2 && player.y <= -129 && player.persistentData.getInt(organActive) == 1) {
            let newItem = Item.of(organ.id)
            let oldItem = instance.inventory.getItem(organ.Slot)
            if (oldItem.getDamageValue() >= (60 * 60 * 24)) {
                newItem = Item.of('kubejs:genesis')
                mrqxEditChestItem(player, newItem, organ.Slot, false, true, false)
            }
            else {
                newItem.setDamageValue(oldItem.getDamageValue() + 1)
                mrqxEditChestItem(player, newItem, organ.Slot, false, false, false)
            }
        }
        else {
            let newItem = Item.of(organ.id)
            newItem.setDamageValue(0)
            mrqxEditChestItem(player, newItem, organ.Slot, false, false, false)
        }
    },

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
            if (entity.getType() == 'minecraft:item' && player.age % (20 * 60) == 0 && !(organ.id == 'mrqx_extra_pack:sin_and_judgement')) {
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
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16)
        entityList.forEach(entity => {
            if (entity instanceof $mrqxTamableAnimal && !mrqxIsEmpty(entity.nbt.Age)) {
                if (entity.nbt.Age >= 0) {
                    entity.setAge(0)
                    entity.setInLove(player)
                    if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement')) {
                        entity.setHealth(entity.getHealth() - entity.getMaxHealth() * 0.05)
                        if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                            entity.setHealth(entity.getHealth() - entity.getMaxHealth() * 0.05)
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
        if (player.getLevel().getDayTime() <= 21) {
            player.removeEffect('kubejs:glimpse_of_god')
            player.removeEffect('kubejs:gaze_of_god')
            player.removeEffect('kubejs:glare_of_god')
            player.removeEffect('kubejs:pardon_of_god_magic')
            player.removeEffect('kubejs:pardon_of_god_melee')
            player.removeEffect('kubejs:pardon_of_god_projectile')
            player.potionEffects.add('kubejs:glimpse_of_god', 3600 * 20, 0, false, false)
        }
    },

    // ‌星空棱镜
    'mrqx_extra_pack:starry_sky_prism': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (player.getLevel().getDayTime() >= 13000) {
            switch (player.getLevel().getMoonPhase()) {
                case 0:
                    player.removeEffect('cataclysm:monstrous')
                    player.potionEffects.add('cataclysm:monstrous', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 1:
                    player.removeEffect('alexsmobs:soulsteal')
                    player.potionEffects.add('alexsmobs:soulsteal', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 2:
                    player.removeEffect('goety:insight')
                    player.potionEffects.add('goety:insight', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 3:
                    player.removeEffect('goety:soul_armor')
                    player.potionEffects.add('goety:soul_armor', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 4:
                    player.removeEffect('minecraft:regeneration')
                    player.potionEffects.add('minecraft:regeneration', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 5:
                    player.removeEffect('minecraft:haste')
                    player.potionEffects.add('minecraft:haste', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 6:
                    player.removeEffect('minecraft:strength')
                    player.potionEffects.add('minecraft:strength', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                case 7:
                    player.removeEffect('goety:corpse_eater')
                    player.potionEffects.add('goety:corpse_eater', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                    break
                default:
                    break
            }
        }
    },

    // 日晷
    'mrqx_extra_pack:sundial': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        switch (Math.floor(player.getLevel().getDayTime() / 1000)) {
            case 0:
                player.removeEffect('minecraft:jump_boost')
                player.potionEffects.add('minecraft:jump_boost', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 1:
                player.removeEffect('minecraft:speed')
                player.potionEffects.add('minecraft:speed', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 2:
                player.removeEffect('alexsmobs:sunbird_blessing')
                player.potionEffects.add('alexsmobs:sunbird_blessing', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 3:
                player.removeEffect('cataclysm:blessing_of_amethyst')
                player.potionEffects.add('cataclysm:blessing_of_amethyst', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 4:
                player.removeEffect('alexsmobs:orcas_might')
                player.potionEffects.add('alexsmobs:orcas_might', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 5:
                player.removeEffect('minecraft:health_boost')
                player.potionEffects.add('minecraft:health_boost', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 6:
                player.removeEffect('minecraft:fire_resistance')
                player.potionEffects.add('minecraft:fire_resistance', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 7:
                player.removeEffect('alexmobs:knockback_resistance')
                player.potionEffects.add('alexmobs:knockback_resistance', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 8:
                player.removeEffect('goety:photosynthesis')
                player.potionEffects.add('goety:photosynthesis', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 9:
                player.removeEffect('goety:fortunate')
                player.potionEffects.add('goety:fortunate', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 10:
                player.removeEffect('goety:flame_hands')
                player.potionEffects.add('goety:flame_hands', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 11:
                player.removeEffect('goety:rampage')
                player.potionEffects.add('goety:rampage', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 12:
                player.removeEffect('goety:fiery_aura')
                player.potionEffects.add('goety:fiery_aura', 60, typeMap.get('kubejs:mrqx_celestial_body').length, false, false)
                break
            case 13:
                player.removeEffect('minecraft:saturation')
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
}

var assign_organ_player_tick_only = Object.assign(organPlayerTickOnlyStrategies, mrqxOrganPlayerTickOnlyStrategies)