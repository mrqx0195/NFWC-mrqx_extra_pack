// priority: 450

/**
 * 玩家承受伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingDamageEvent, organ, EntityHurtCustomModel):void>}
 */
const mrqxOrganPlayerBearStrategies = {
    // 梦魇之触
    'mrqx_extra_pack:nightmare_tentacles': function (event, organ, data) {
        let player = event.entity
        if (player.potionEffects.map.size > 0) {
            let count = 0
            player.potionEffects.map.forEach((effect, instance) => {
                if (!effect.isBeneficial()) {
                    let amplifier = instance.getAmplifier()
                    let duration = instance.getDuration()
                    let effect = instance.getEffect()
                    player.potionEffects.add(effect, duration + event.amount * 10, amplifier, false, false)
                    count += amplifier + 1
                }
            })
            event.amount /= count * player.persistentData.getInt(warpCount) * 0.1 + 1
            updateWarpCount(player, (event.player.persistentData.getInt(warpCount) ?? 0) + count / 5)
        }
    },

    // 幽匿沉积体
    'mrqx_extra_pack:sculk_depositer': function (event, organ, data) {
        event.amount *= 1 - Math.min(mrqxGetSculkCount(event.entity), 0.1)
    },

    // 蒸汽甲胄
    'mrqx_extra_pack:steam_armor': function (event, organ, data) {
        let player = event.entity
        let count = Math.min(mrqxGetSteamCount(player) * 0.02, 0.2)
        event.amount *= 1 - count
    },

    // 骑士装甲板
    'mrqx_extra_pack:knight_armor_piece': function (event, organ, data) {
        let player = event.entity
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
        event.amount *= 1 - Math.min(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'defense')) ?? 0, typeMap.get('kubejs:mrqx_knight').length) * 0.01
    },

    // 损坏骑士盾
    'mrqx_extra_pack:broken_knight_shield': function (event, organ, data) {
        event.amount *= 0.95
    },

    // 骑士盾
    'mrqx_extra_pack:knight_shield': function (event, organ, data) {
        event.amount *= 0.9
    },
}

var assign_organ_player_bear = Object.assign(organPlayerBearStrategies, mrqxOrganPlayerBearStrategies)

/**
 * 玩家承受伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingDamageEvent, organ, EntityHurtCustomModel):void>}
 */
const mrqxOrganPlayerBearOnlyStrategies = {
    // “肉斩骨断”肌肉
    'mrqx_extra_pack:muscle_bone_fracture': function (event, organ, data) {
        let player = event.entity
        if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
            return
        }
        if (event.amount >= player.getHealth()) {
            if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
                player.addItemCooldown(organ.id, 400)
            }
            else {
                player.addItemCooldown(organ.id, 800)
            }
            player.potionEffects.add('irons_spellbooks:heartstop', 300, 0, false, false)
            event.amount = 0
        }
    },

    // “本性的坚守”脾
    'mrqx_extra_pack:spleen_adhering_to_nature': function (event, organ, data) {
        let player = event.entity
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:mrqx_seaborn')) {
            amplifier += typeMap.get('kubejs:mrqx_seaborn').length
        }
        if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
            amplifier *= 2
        }
        if (player.getHealth() / player.getMaxHealth() < 0.5) {
            amplifier *= 2
        }
        player.heal(amplifier)
    },

    // 充能刀刃
    'mrqx_extra_pack:charged_blade': function (event, organ, data) {
        let player = event.entity
        if (player.hasEffect('mrqx_extra_pack:charged_blade_effect')) {
            data.returnDamage = data.returnDamage + event.amount * 2
            player.heal(event.amount * 0.5)
            event.amount = 0
        }
    },

    // 墨染
    'mrqx_extra_pack:mrqx0195': function (event, organ, data) {
        let player = event.entity
        if (player.persistentData.organActive != 1) {
            return
        }
        if (event.source != 'outOfWorld') {
            event.amount = 0
        }
    },

    // ‌原罪·暴怒「萨迈尔」
    'mrqx_extra_pack:sin_ira_samael': function (event, organ, data) {
        let player = event.entity
        if (player.persistentData.organActive != 1) {
            return
        }
        if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
            event.amount *= 5
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                event.amount *= 5
            }
        }
    },

    // ‌原罪·傲慢「路西法」
    'mrqx_extra_pack:sin_superbia_lucifer': function (event, organ, data) {
        let player = event.entity
        if (player.persistentData.organActive != 1) {
            return
        }
        if (event.source.getActual()) {
            event.amount *= 0.85
            if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                event.amount *= 0.85
                if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
                    event.source.bypassArmor().bypassEnchantments().bypassInvul().bypassMagic()
                }
            }
            else if (!(organ.id == 'mrqx_extra_pack:sin_and_judgement' || mrqxGetCurioInfo(player, 'mrqx_extra_pack:ring_from_god').hasItem)) {
                event.source.setMagic()
            }
        }
        else {
            if (event.source.type != 'outOfWorld') {
                if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
                    player.heal(event.amount)
                }
                event.amount = 0
            }
        }
    },

    // ‌原罪·罪源
    'mrqx_extra_pack:origin_sin': function (event, organ) {
        organPlayerBearOnlyStrategies['mrqx_extra_pack:sin_ira_samael'](event, organ)
        organPlayerBearOnlyStrategies['mrqx_extra_pack:sin_superbia_lucifer'](event, organ)
    },

    // ‌“罪与罚”
    'mrqx_extra_pack:sin_and_judgement': function (event, organ) {
        organPlayerBearOnlyStrategies['mrqx_extra_pack:origin_sin'](event, organ)
    },

    // 世界框架
    // 'mrqx_extra_pack:framework_of_world': function (event, organ, data) {
    //     let player = event.entity
    //     if (event.source.type == 'outOfWorld') {
    //         player.invulnerableTime = 0
    //         event.source.bypassEnchantments()
    //         event.source.bypassMagic()
    //         event.amount = Math.max(Math.max(player.getMaxHealth() / 20, event.amount), 4)
    //     }
    // },

    // 幻影骑士甲
    'mrqx_extra_pack:phantom_knight_armor': function (event, organ, data) {
        let player = event.entity
        let playerChestInstance = player.getChestCavityInstance()
        let typeMap = getPlayerChestCavityTypeMap(player)
        let count = 2
        if (mrqxGetCoreOfKnightCount(player) > 0) {
            for (let i = mrqxGetCoreOfKnightCount(player); i > 0; i--) {
                count++
            }
            event.amount *= 1 - Math.min(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'defense')) ?? 0, typeMap.get('kubejs:mrqx_knight').length) * 0.01 * count
            if (event.source.isBypassArmor() && !data?.mrqxBypassArmor) {
                event.amount = mrqxGetDamageAfterArmorAbsorb(player, event.source, event.amount, true, true)
                data.mrqxBypassArmor = true
            }
        }
    },

    // 坚毅骑士盾
    'mrqx_extra_pack:resolute_knight_shield': function (event, organ, data) {
        event.amount *= 0.8

        if (event.source.isBypassInvul()) return
        let player = event.entity
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                if (event.source.isBypassArmor() && !data?.mrqxBypassArmor) {
                    event.amount = mrqxGetDamageAfterArmorAbsorb(player, event.source, event.amount, true, true)
                    data.mrqxBypassArmor = true
                }
                break
            case 1:
                if (event.source.isBypassEnchantments() && !data?.mrqxBypassEnchantments) {
                    event.amount = mrqxGetDamageAfterMagicAbsorb(player, event.source, event.amount, false, true)
                    data.mrqxBypassEnchantments = true
                }
                break
            case 2:
                if (event.source.isBypassMagic() && !data?.mrqxBypassMagic) {
                    event.amount = mrqxGetDamageAfterMagicAbsorb(player, event.source, event.amount, true, false)
                    data.mrqxBypassMagic = true
                }
                break
            default:
                break
        }
        if (event.source.isExplosion() || event.source.isProjectile()) {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    if (event.source.isBypassArmor() && !data?.mrqxBypassArmor) {
                        event.amount = mrqxGetDamageAfterArmorAbsorb(player, event.source, event.amount, true, true)
                        data.mrqxBypassArmor = true
                    }
                    break
                case 1:
                    if (event.source.isBypassEnchantments() && !data?.mrqxBypassEnchantments) {
                        event.amount = mrqxGetDamageAfterMagicAbsorb(player, event.source, event.amount, false, true)
                        data.mrqxBypassEnchantments = true
                    }
                    break
                case 2:
                    if (event.source.isBypassMagic() && !data?.mrqxBypassMagic) {
                        event.amount = mrqxGetDamageAfterMagicAbsorb(player, event.source, event.amount, true, false)
                        data.mrqxBypassMagic = true
                    }
                    break
                default:
                    break
            }
        }
        if (mrqxGetCoreOfKnightCount(player) > 0 && player.isShiftKeyDown()) {
            for (let i = mrqxGetCoreOfKnightCount(player); i > 0; i--) {
                event.amount *= 0.8
            }
        }
    },

    // 龙皇核心
    'mrqx_extra_pack:spleen_adhering_to_nature': function (event, organ, data) {
        let player = event.entity
        let typeMap = getPlayerChestCavityTypeMap(player)
        let count = 0
        if (typeMap.has('kubejs:dragon')) {
            count += typeMap.get('kubejs:dragon').length
        }
        if (player.hasEffect('mrqx_extra_pack:dragon_emperor_passion')) {
            event.amount *= (1 - count * 0.02)
        }
        else if (player.hasEffect('mrqx_extra_pack:dragon_emperor_brilliant')) {
            event.amount *= (1 - count * 0.05)
        }
    },

    // 梅吉多
    'mrqx_extra_pack:meijiduo': function (event, organ, data) {
        let player = event.entity
        if (event.amount >= player.getHealth()) {
            let instance = player.getChestCavityInstance()
            let oldItem = instance.inventory.getItem(organ.Slot)
            let name = randomGet(mrqxAllOrganScore)
            let count = oldItem.getOrCreateTag().getCompound('organData').get(name)
            if (count) {
                let newItem = oldItem.copy()
                newItem.getOrCreateTag().getCompound('organData').put(name, count + (name == 'chestcavity:freezing_point' ? -0.5 : 0.5))
                mrqxEditChestItem(player, newItem, organ.Slot, false, true, true)
            }
        }
    },
}

var assign_organ_player_bear_only = Object.assign(organPlayerBearOnlyStrategies, mrqxOrganPlayerBearOnlyStrategies)
