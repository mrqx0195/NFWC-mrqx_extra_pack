// priority: 450

/**
 * 造成伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, ItemEffectResult, EntityHurtCustomModel):void>}
 */
const mrqxTetraEffectPlayerDamageStrategies = {
    // 火与钢
    "mrqx_extra_pack:flame_and_steel": function (event, itemEffectRes, data) {
        if (event.source.player.getHealth() <= event.source.player.getMaxHealth() * 0.5) {
            event.amount *= 2.8
        }
    },

    // 剥壳
    "mrqx_extra_pack:thresher": function (event, itemEffectRes, data) {
        if (event.getSource().getType() != 'arrow') return
        let player = event.source.player
        let entity = event.entity
        let value = 0.5
        if (entity.hasEffect('mrqx_extra_pack:thresher_effect')) {
            value += (entity.getEffect('mrqx_extra_pack:thresher_effect').getAmplifier() + 1) * 0.05
            entity.potionEffects.add('mrqx_extra_pack:thresher_effect', 20 * 60, entity.getEffect('mrqx_extra_pack:thresher_effect').getAmplifier() + 1, false, false)
        }
        else {
            entity.potionEffects.add('mrqx_extra_pack:thresher_effect', 20 * 60, 0, false, false)
        }
        event.entity.getServer().scheduleInTicks(1, () => {
            if (entity.isLiving()) {
                entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * value)
            }
        })
    },

    // 战术的终结
    "mrqx_extra_pack:final_tactics": function (event, itemEffectRes, data) {
        if (event.getSource().getType() != 'arrow') return
        let entity = event.entity
        event.amount *= 1.7
        entity.potionEffects.add('goety:busted', 20 * 5, 0, false, false)
    },

    // 真银斩
    "mrqx_extra_pack:truesilver_slash": function (event, itemEffectRes, data) {
        mrqxCauseElementDamage(event.entity, event.source.player.getAttributeTotalValue('minecraft:generic.attack_damage'), 'ice')
    },
}

var assign_tetra_player_damage = Object.assign(tetraEffectPlayerDamageStrategies, mrqxTetraEffectPlayerDamageStrategies)

/**
 * 受到伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingDamageEvent, ItemEffectResult, EntityHurtCustomModel):void>}
 */
const mrqxTetraEffectPlayerBearStrategies = {
    // 火与钢
    "mrqx_extra_pack:flame_and_steel": function (event, itemEffectRes, data) {
        if (event.entity.getHealth() <= event.entity.getMaxHealth() * 0.5) {
            event.amount *= 0.4
        }
    },

    // 披荆斩棘
    "mrqx_extra_pack:trial_of_thorns": function (event, itemEffectRes, data) {
        let entity = event.source.actual
        let player = event.entity
        event.entity.getServer().scheduleInTicks(1, () => {
            if (entity.isLiving()) {
                entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.61)
            }
        })
    },
}

/**
 * 实体掉落策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, itemEffectRes):void>}
 */
const mrqxTetraEffectPlayerEntityLootStrategies = {
    // 披荆斩棘
    "mrqx_extra_pack:trial_of_thorns": function (event, itemEffectRes) {
        let player = event.getPlayer()
        if (player.getAbsorptionAmount() >= player.getMaxHealth() * 3) return
        player.setAbsorptionAmount(Math.min(player.getAbsorptionAmount() + player.getMaxHealth() * 0.12, player.getMaxHealth() * 3))
    },
}


/**
 * 投掷物造成伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, ItemEffectResult, EntityHurtCustomModel):void>}
 */
const mrqxTetraEffectPlayerThrownDamageStrategies = {
    // 必须开辟的通路
    "mrqx_extra_pack:paths_must_be_opened": function (event, itemEffectRes, data) {
        let player = event.source.player
        /** @type {Internal.ThrownModularItemEntity} */
        let thrownItem = event.getSource().getImmediate()
        getLivingWithinRadius(thrownItem.level, new Vec3(thrownItem.x, thrownItem.y, thrownItem.z), 3.6).forEach(entity => {
            if (entity.stringUuid == player.stringUuid) return
            entity.server.scheduleInTicks(2, event => {
                entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 1.6)
                entity.potionEffects.add('tetra:stun', 120, 0, false, false)
            })
        })
        thrownItem.setNoPhysics(true)
        player.moveTo(new Vec3(thrownItem.x, thrownItem.y, thrownItem.z))
    },
}