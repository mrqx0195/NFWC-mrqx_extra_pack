// priority: 9

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
                    player.potionEffects.add(effect, duration + event.amount * 10, amplifier)
                    count += amplifier + 1
                }
            })
            event.amount /= count * player.persistentData.getInt(warpCount) * 0.1 + 1
            updateWarpCount(player, (event.player.persistentData.getInt(warpCount) ?? 0) + count / 5)
        }
    },

    // 幽匿沉积体
    'mrqx_extra_pack:sculk_depositer': function (event, organ, data) {
        event.amount *= 1 - Math.max(mrqxGetSculkCount(event.entity), 0.1)
    },
}

var assign_organ_player_bear = Object.assign(organPlayerBearStrategies, mrqxOrganPlayerBearStrategies);

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
            if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
                player.addItemCooldown(organ.id, 400)
            }
            else {
                player.addItemCooldown(organ.id, 800)
            }
            player.potionEffects.add('irons_spellbooks:heartstop', 300, 0)
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
        if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
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
}

var assign_organ_player_bear_only = Object.assign(organPlayerBearOnlyStrategies, mrqxOrganPlayerBearOnlyStrategies);
