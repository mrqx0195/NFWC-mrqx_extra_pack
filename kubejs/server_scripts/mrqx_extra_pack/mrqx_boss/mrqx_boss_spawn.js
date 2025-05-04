// priority: 950

const mrqxBossChampionMap = {
    'twilightforest:naga': 'mrqx_somite',
    'twilightforest:lich': 'mrqx_slave_owner',
    'twilightforest:minoshroom': 'mrqx_spore_aggregation',
    'twilightforest:hydra': 'mrqx_buring_blood',
    'twilightforest:knight_phantom': 'mrqx_co_frequency',
    'twilightforest:ur_ghast': 'mrqx_infinity_tear',
    'twilightforest:alpha_yeti': 'mrqx_snowstorm',
    'twilightforest:snow_queen': 'mrqx_aurora',
}

const mrqxBossChampionTypeList = ['mrqx_somite', 'mrqx_slave_owner', 'mrqx_spore_aggregation', 'mrqx_buring_blood', 'mrqx_co_frequency', 'mrqx_infinity_tear', 'mrqx_snowstorm', 'mrqx_aurora']

const mrqxBossTypeList = bossTypeList.concat()
mrqxBossTypeList.push('twilightforest:alpha_yeti')
mrqxBossTypeList.push('witherstormmod:wither_storm')

EntityEvents.spawned(event => {
    /*** @type {Internal.LivingEntity}*/
    let entity = event.entity
    if (!mrqxBossTypeList.find((value) => (value == entity.getType()))) return
    let player = entity.getLevel().getNearestPlayer(entity, 64)
    if (!player || !player.isPlayer()) return

    if (entity.getType() in mrqxBossChampionMap && mrqxIsBossChampionEnabled(player)) {
        /** @type {String[]} */
        let typeList = entity.persistentData.get('champion') ?? []
        if (typeList.find((value, index, obj) => (value == mrqxBossChampionMap[entity.getType()]))) return
        typeList.push(mrqxBossChampionMap[entity.getType()])
        entity.persistentData.put('champion', typeList)
    }

    let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 256, entity.y - 256, entity.z - 256, entity.x + 256, entity.y + 256, entity.z + 256))
    let diff = 0
    let playerCount = 0
    entityList.forEach(player => {
        if (player.isPlayer() && mrqxIsBossEnhanceEnabled(player)) {
            playerCount++
            /** @type {Internal.CompoundTag} */
            let diffMap = player.persistentData.get('mrqxBossDiffMap') ?? mrqxGetEmptyCompound()
            if (!diffMap.contains(entity.getType())) diffMap.putInt(entity.getType(), 0)
            diff += diffMap.getInt(entity.getType())
            player.persistentData.put('mrqxBossDiffMap', diffMap)
            if (event.getEntity().getType() == 'minecraft:ender_dragon' && mrqxIsMysteryQuestUnlocked(player) && !player.stages.has("mrqx_past_0")) {
                player.stages.add("mrqx_past_0")
            }
        }
    })
    diff /= playerCount

    if (diff > 5) {
        /** @type {Special.Attribute[]} */
        let attributeMap = [
            'minecraft:generic.armor',
            'minecraft:generic.attack_damage',
            'minecraft:generic.max_health'
        ]
        attributeMap.forEach(attribute => [
            entity.modifyAttribute(attribute, 'mrqxBossDiffBaseAttribute', (diff - 5) * 0.1, 'multiply_base')
        ])
        entity.getPersistentData().putInt('mrqxBossDiff', diff)
        entity.getPersistentData().putInt('mrqxBossPlayerCount', playerCount)
        entity.heal(entity.getMaxHealth())
    }

    if ((event.getEntity().getType() in mrqxBossSpawn)) {
        mrqxBossSpawn[event.getEntity().getType()](event)
    }
})

/**
 * BOSS生成处理策略
 * @constant
 * @type {Object<string,function(Internal.EntitySpawnedEventJS, number, number):void>}
 */
const mrqxBossSpawn = {
    'minecraft:wither': function (event, diff, playerCount) {
        if (diff > 0) {
            /*** @type {Internal.LivingEntity}*/
            let entity = event.entity
            entity.modifyAttribute('minecraft:generic.armor', 'mrqxBossDiffWitherAttributeB', diff * 0.2, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffWitherAttributeA', diff * 2, 'addition')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffWitherAttributeB', diff * 0.2, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.flying_speed', 'mrqxBossDiffWitherAttributeA', diff * 0.05, 'addition')
            entity.heal(entity.getMaxHealth())
        }
    },

    'minecraft:ender_dragon': function (event, diff, playerCount) {
        if (diff > 0) {
            /*** @type {Internal.LivingEntity}*/
            let entity = event.entity
            entity.modifyAttribute('minecraft:generic.armor', 'mrqxBossDiffEnderDragonAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffEnderDragonAttributeA', diff * 1, 'addition')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffEnderDragonAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.max_health', 'mrqxBossDiffEnderDragonAttributeA', diff * 20, 'addition')
            entity.heal(entity.getMaxHealth())
        }
    },

    'witherstormmod:wither_storm': function (event, diff, playerCount) {
        if (diff > 0) {
            /*** @type {Internal.LivingEntity}*/
            let entity = event.entity
            entity.modifyAttribute('witherstormmod:evolution_speed', 'mrqxBossDiffWitherStormAttributeA', diff * 1, 'addition')
            entity.modifyAttribute('witherstormmod:evolution_speed', 'mrqxBossDiffWitherStormAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('witherstormmod:target_stationary_flying_speed', 'mrqxBossDiffWitherStormAttributeA', diff * 0.02, 'addition')
            entity.modifyAttribute('witherstormmod:target_stationary_flying_speed', 'mrqxBossDiffWitherStormAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('witherstormmod:slow_flying_speed', 'mrqxBossDiffWitherStormAttributeA', diff * 0.02, 'addition')
            entity.modifyAttribute('witherstormmod:slow_flying_speed', 'mrqxBossDiffWitherStormAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('witherstormmod:hunchback_follow_range', 'mrqxBossDiffWitherStormAttributeA', diff * 1, 'addition')
            entity.modifyAttribute('witherstormmod:hunchback_follow_range', 'mrqxBossDiffWitherStormAttributeB', diff * 0.1, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.max_health', 'mrqxBossDiffWitherStormAttributeA', diff * 20, 'addition')
            entity.modifyAttribute('minecraft:generic.flying_speed', 'mrqxBossDiffWitherStormAttributeA', diff * 0.05, 'addition')
            entity.heal(entity.getMaxHealth())
        }
    },
    'twilightforest:knight_phantom': function (event, diff, playerCount) {
        if (diff > 0) {
            /*** @type {Internal.LivingEntity}*/
            let entity = event.entity
            /** @type {Special.Attribute[]} */
            let attributeMap = [
                'minecraft:generic.armor',
                'minecraft:generic.attack_damage',
                'minecraft:generic.max_health'
            ]
            attributeMap.forEach(attribute => [
                entity.modifyAttribute(attribute, 'mrqxBossDiffBaseAttribute', (diff / 6 - 5) * 0.1, 'multiply_base')
            ])
            entity.heal(entity.getMaxHealth())
        }
    },
}