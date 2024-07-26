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
        fourDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && !(Item.of(posMap.get(currentPos).id).hasTag('kubejs:infected') || Item.of(posMap.get(currentPos).id).hasTag('kubejs:legends') || Item.of(posMap.get(currentPos).id).hasTag('kubejs:relics') || Item.of(posMap.get(currentPos).id).hasTag('kubejs:warp'))) {
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
                organData.allKeys.forEach(key => {
                    tumorData[key] = organData[key] * 0.75
                })
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
        if (mrqxCheckOrganSuit(player, 'seaborn')) {
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
}

var assign_organ_player_tick = Object.assign(organPlayerTickStrategies, mrqxOrganPlayerTickStrategies);

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
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) {
            player.attack(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis')) ?? 0 + 5)
        }
        else {
            if (event.player.persistentData.organActive != 1) {
                return
            }
            player.heal(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis')) ?? 0)
        }
    },

    // 汽轮机
    'mrqx_extra_pack:steam_turbine': function (event, organ) {
        let player = event.player
        if (player.hasEffect('mrqx_extra_pack:nuclear_power_generation')) {
            let count = player.getEffect('mrqx_extra_pack:nuclear_power_generation').getAmplifier();
            if (player.persistentData.contains(resourceCount)) {
                count = player.persistentData.getInt(resourceCount) + count;
            }
            updateResourceCount(player, count)
        }
    },
}

var assign_organ_player_tick_only = Object.assign(organPlayerTickOnlyStrategies, mrqxOrganPlayerTickOnlyStrategies);


// 核能检测
PlayerEvents.tick(event => {
    let player = event.player
    let playerChest = getPlayerChestCavityItemMap(player)
    if ((player.hasEffect('mrqx_extra_pack:nuclear_power') || player.hasEffect('mrqx_extra_pack:nuclear_power_generation')) && !playerChest.has("mrqx_extra_pack:fission_reactor")) {
        Utils.server.runCommandSilent('playsound minecraft:entity.generic.explode player @a ' + player.x + ' ' + player.y + ' ' + player.z)
        event.level.spawnParticles('minecraft:explosion', true, player.x, player.y + 1, player.z, 1, 1, 1, 10, 0.5)
        let explosion = event.player.block.createExplosion()
        let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
        if (!effect) {
            effect = player.getEffect('mrqx_extra_pack:nuclear_power_generation')
        }
        let amplifier = effect.getAmplifier()
        let duration = effect.getDuration()
        explosion.strength(amplifier * (duration / 1200 + 1))
        player.attack(amplifier * (duration / 1200 + 1))
        explosion.causesFire(true)
        explosion.explode()
        player.removeEffect('mrqx_extra_pack:nuclear_power')
        player.removeEffect('mrqx_extra_pack:nuclear_power_generation')
        /*let effectCloud = event.level.createEntity('minecraft:area_effect_cloud')
        effectCloud.setNbt('{Radius:5,Duration:2147483640,RadiusOnUse:-0.000001f,RadiusPerTick:-0.000001f,potion_contents:{custom_effects:[{amplifier:4b,duration:6000,id:"minecraft:wither"},{amplifier:1b,duration:1,id:"minecraft:instant_damage"}]},ReapplicationDelay:20,WaitTime:1}')
        effectCloud.setPosition(player.x, player.y, player.z)
        effectCloud.spawn()*/
    }
})

// 灵狐之魂获取
PlayerEvents.tick(event => {
    let player = event.player
    let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
    entityList.forEach(entity => {
        if (entity.getEncodeId() == 'minecraft:fox' && !entity.persistentData.getBoolean('mrqx_fox_soul')) {
            entity.persistentData.putBoolean('mrqx_fox_soul', true)
            if (entity?.nbt?.Trusted[0]) {
                let trustPlayer = entity?.nbt?.Trusted[0]
                let playerUuidString = player.stringUuid.split('-').join('')
                let trustPlayerUuidString = ((trustPlayer[0] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[1] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[2] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[3] >>> 0).toString(16)).padStart(8, '0')
                if (trustPlayerUuidString == playerUuidString) {
                    if (Math.random() < 0.3) {
                        entity.setItemSlot('mainhand', Item.of('mrqx_extra_pack:fox_soul'))
                    }
                }
            }
        }
    })
})