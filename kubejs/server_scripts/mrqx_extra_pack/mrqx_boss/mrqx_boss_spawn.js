// priority: 901

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

const mrqxBossTypeList = bossTypeList
mrqxBossTypeList.push('twilightforest:yeti_alpha')

EntityEvents.spawned(event => {
    /*** @type {Internal.LivingEntity}*/
    let entity = event.entity
    if (!mrqxBossTypeList.find((value) => (value == entity.getType()))) return
    if (entity.getType() in mrqxBossChampionMap) {
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
        if (player.isPlayer()) {
            playerCount++
            /** @type {Internal.CompoundTag} */
            let diffMap = player.persistentData.get('mrqxBossDiffMap') ?? mrqxGetEmptyCompound()
            if (!diffMap.contains(entity.getType())) diffMap.putInt(entity.getType(), 0)
            diff += diffMap.getInt(entity.getType())
            player.persistentData.put('mrqxBossDiffMap', diffMap)
        }
    })
    if (diff > 0) {
        /** @type {Special.Attribute[]} */
        let attributeMap = [
            'minecraft:generic.armor',
            'minecraft:generic.attack_damage',
            'minecraft:generic.max_health'
        ]
        attributeMap.forEach(attribute => [
            entity.modifyAttribute(attribute, 'mrqxBossDiffBaseAttribute', diff * 0.1, 'multiply_base')
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
            /** @type {Special.Attribute[]} */
            let attributeMap = [
                'minecraft:generic.armor',
                'minecraft:generic.attack_damage',
                'minecraft:generic.max_health', 'minecraft:generic.armor_toughness'
            ]
            entity.modifyAttribute('minecraft:generic.armor', 'mrqxBossDiffWitherAttributeB', diff * 0.2, 'multiply_base')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffWitherAttributeA', diff * 2, 'addition')
            entity.modifyAttribute('minecraft:generic.armor_toughness', 'mrqxBossDiffWitherAttributeB', diff * 0.2, 'multiply_base')
            entity.heal(entity.getMaxHealth())
        }
    }
}