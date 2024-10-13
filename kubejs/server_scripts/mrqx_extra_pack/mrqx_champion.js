// priority: -1

const mrqxChampionTypeMap = [
    {
        type: 'mrqx_element_attack',
        name: Text.red('‌元素损伤-攻击'),
        desc: Text.gray('攻击附带等同于自身攻击力的元素损伤')
    },
    {
        type: 'mrqx_element_reflection',
        name: Text.red('‌元素损伤-反射'),
        desc: Text.gray('受到伤害时，使攻击者受到等同于自身攻击力的元素损伤')
    },
    {
        type: 'mrqx_undying',
        name: Text.gold('不灭'),
        desc: Text.gray('第一次受到致命伤害时保留10%生命值，并获得10s止心术')
    },
    {
        type: 'mrqx_defend',
        name: Text.red('固守'),
        desc: Text.gray('最大生命值-50%，免疫低于最大生命值的伤害')
    },
    {
        type: 'mrqx_curse',
        name: Text.red('‌诅咒'),
        desc: Text.gray('受到致命伤时为攻击者附加100s末日X')
    },
    {
        type: 'mrqx_origin',
        name: Text.green('原初'),
        desc: Text.gray('只能受到原版类型的伤害')
    },
    {
        type: 'mrqx_remote_defence',
        name: Text.blue('远御'),
        desc: Text.gray('伤害源距离越远，受到的伤害越低')
    },
    {
        type: 'mrqx_fracture_defend',
        name: Text.red('破碎之盾'),
        desc: Text.gray('生命值低于5%时，受到的伤害变为1')
    },
    {
        type: 'mrqx_proliferation',
        name: Text.darkGreen('增殖'),
        desc: Text.gray('受到伤害时，如果血量低于50%，则分裂出一个同类')
    },
    {
        type: 'mrqx_marksman',
        name: Text.blue('神射手'),
        desc: Text.gray('目标距离越远，造成的伤害越高')
    },
]

mrqxChampionTypeMap.forEach(type => {
    championTypeMap.push(type)
})

/**
 * 精英怪承受伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, EntityHurtCustomModel):void>}
 */
const mrqxChampionPlayerDamageStrategies = {
    // ‌元素损伤-反射
    'mrqx_element_reflection': function (event, data) {
        let entity = event.entity
        let attacker = event.source.actual
        let type = randomGet(mrqxElementDamageTypes)
        if (!entity.persistentData.getString('champion_mrqx_element_reflection_type')) {
            entity.persistentData.putString('champion_mrqx_element_reflection_type', type)
        }
        type = entity.persistentData.getString('champion_mrqx_element_reflection_type')
        mrqxCauseElementDamage(attacker, entity.getAttributeTotalValue('minecraft:generic.attack_damage'), type)
    },

    // 不灭
    'mrqx_undying': function (event, data) {
        let entity = event.entity
        if ((entity.getHealth() - event.amount <= 0) && (!entity.persistentData.getBoolean('mrqx_undying_check'))) {
            event.amount = 0
            entity.setHealth(entity.getMaxHealth() * 0.1)
            entity.potionEffects.add('irons_spellbooks:heartstop', 20 * 10, 0, false, false)
            entity.persistentData.putBoolean('mrqx_undying_check', true)
        }
    },

    // 固守
    'mrqx_defend': function (event, data) {
        let entity = event.entity
        if (entity.getMaxHealth() > event.amount) {
            event.amount = 0
        }
    },

    // ‌诅咒
    'mrqx_curse': function (event, data) {
        let entity = event.entity
        let attacker = event.source.actual
        if (entity.getHealth() - event.amount <= 0) {
            attacker.potionEffects.add('goety:doom', 20 * 100, 9, false, false)
        }
    },

    // 原初
    'mrqx_origin': function (event, data) {
        let type = event.source.type
        if (!type in mrqxVanillaDamageSource) {
            event.amount = 0
        }
    },

    // 远御
    'mrqx_remote_defence': function (event, data) {
        let entity = event.entity
        let attacker = event.source.actual
        event.amount /= Math.min(Math.floor(new Vec3(entity.x, entity.y, entity.z).distanceTo(new Vec3(attacker.x, attacker.y, attacker.z)) / 4), 1)
    },

    // 破碎之盾
    'mrqx_fracture_defend': function (event, data) {
        let entity = event.entity
        if (entity.getHealth() <= entity.getMaxHealth() * 0.05) {
            event.amount = 1
        }
    },

    // 增殖
    'mrqx_proliferation': function (event, data) {
        /*** @type {Internal.LivingEntity}*/
        let entity = event.entity
        if (entity.getHealth() <= entity.getMaxHealth() * 0.5 && !entity.persistentData.getBoolean('mrqxProliferation')) {
            entity.persistentData.putBoolean('mrqxProliferation', true)
            let newEntity = entity.level.createEntity(entity.type)
            let newNbt = entity.getNbt()
            newNbt.remove('UUID')
            newEntity.setPos(entity.x, entity.y, entity.z)
            newEntity.mergeNbt(newNbt)
            newEntity.spawn()
        }
    },
}

var champion_player_damage = Object.assign(championPlayerDamageStrategies, mrqxChampionPlayerDamageStrategies)

/**
 * 精英怪造成伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, EntityHurtCustomModel):void>}
 */
const mrqxChampionPlayerBearStrategies = {
    // ‌元素损伤-攻击
    'mrqx_element_attack': function (event, data) {
        let player = event.entity
        let entity = event.source.actual
        let type = randomGet(mrqxElementDamageTypes)
        if (!entity.persistentData.getString('champion_mrqx_element_attack_type')) {
            entity.persistentData.putString('champion_mrqx_element_attack_type', type)
        }
        type = entity.persistentData.getString('champion_mrqx_element_attack_type')
        mrqxCauseElementDamage(player, entity.getAttributeTotalValue('minecraft:generic.attack_damage'), type)
    },

    // 神射手
    'mrqx_marksman': function (event, data) {
        let player = event.entity
        let entity = event.source.actual
        event.amount *= Math.min(Math.floor(new Vec3(entity.x, entity.y, entity.z).distanceTo(new Vec3(player.x, player.y, player.z)) / 4), 1)
    },
}

var champion_player_bear = Object.assign(championPlayerBearStrategies, mrqxChampionPlayerBearStrategies)

EntityEvents.spawned(event => {
    /*** @type {Internal.LivingEntity}*/
    let entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    if (!entity.persistentData.contains('champion')) return
    let typeList = entity.persistentData.get('champion')
    let typeNameList = []
    typeList.forEach(type => {
        let typeName = type.getAsString()
        if (typeName in mrqxChampionSpawnStrategies) {
            mrqxChampionSpawnStrategies[typeName](event)
        }
        championTypeMap.forEach(cha => {
            if (cha.type == typeName) {
                typeNameList.push(cha.name)
                typeNameList.push(Text.gray('·'))
            }
        })
    })
    typeNameList.push(Text.gray('精英'))
    entity.setCustomName(typeNameList)
    entity.setCustomNameVisible(true)
})

/**
 * 精英怪生成处理策略
 * @constant
 * @type {Object<string,function(Internal.EntitySpawnedEventJS):void>}
 */
const mrqxChampionSpawnStrategies = {
    // 固守
    'mrqx_defend': function (event) {
        /*** @type {Internal.LivingEntity}*/
        let entity = event.entity
        entity.setHealth(entity.getMaxHealth() * 0.5)
        entity.setMaxHealth(entity.getMaxHealth() * 0.5)
    },
}