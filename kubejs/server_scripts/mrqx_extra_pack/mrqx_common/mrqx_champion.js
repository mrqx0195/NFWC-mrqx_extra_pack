// priority: 450

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
    {
        type: 'mrqx_reflection',
        name: Text.red('反射'),
        desc: Text.gray('使攻击者受到等同于自身攻击力的伤害')
    },
    {
        type: 'mrqx_somite',
        name: Text.green('截节'),
        desc: Text.gray('如果自身为分节生物，受到的伤害除以身体节数')
    },
    {
        type: 'mrqx_slave_owner',
        name: Text.gold('奴主'),
        desc: Text.gray('受到伤害时将伤害分散至周围的仆从身上，同时根据伤害值召唤仆从。部分生物具有特殊仆从')
    },
    {
        type: 'mrqx_spore_aggregation',
        name: Text.red('聚孢'),
        desc: Text.gray('周围大范围内每有一个生物死亡，自身攻击力、最大生命值、盔甲值、移动速度提升10%，并回复10%的最大生命值')
    },
    {
        type: 'mrqx_buring_blood',
        name: Text.red('炽血'),
        desc: Text.gray('造成/受到伤害时对目标/攻击者造成等同于自身最大生命值10%的§c灼燃损伤§r，损伤每爆发一次回复5%的最大生命值，同时清空自身的§c灼燃损伤§r')
    },
    {
        type: 'mrqx_co_frequency',
        name: Text.darkGreen('同频'),
        desc: Text.gray('造成的伤害乘以周围的同类数量，受到伤害时以真实伤害的形式将伤害分散至周围的同类身上（真实伤害除外）且无敌时间乘以周围的同类数量（不少于周围的同类数量）')
    },
    {
        type: 'mrqx_infinity_tear',
        name: Text.darkGreen('无尽泪'),
        desc: Text.gray('造成/受到伤害时，强制将天气转变为雷暴。自身在雨中时，如果目标/攻击者的高度低于自身或其在雨中，则使其获得侵蚀效果（已有则等级+1）同时对其造成一次等同于自身已损失生命值的溺水伤害，自身回复5%的最大生命值')
    },
    {
        type: 'mrqx_snowstorm',
        name: Text.darkGreen('雪暴'),
        desc: Text.gray('造成/受到伤害时，对大范围内的生物造成等同于自身攻击力的§b冻结损伤§r，并向小范围内的生物投掷冰霜炸弹，同时清空自身的§b冻结损伤§r')
    },
    {
        type: 'mrqx_aurora',
        name: Text.darkGreen('极光'),
        desc: Text.gray('造成/受到伤害时，对大范围内的生物造成等同于自身攻击力三倍的§b冻结损伤§r，损伤每爆发一次，自身攻击力、盔甲值、移动速度提升1%（至多提升至原来的1000%），并回复1%的最大生命值（至多回复50%），召唤一个冰晶（至多4个），同时清空自身的§b冻结损伤§r')
    },
    {
        type: 'mrqx_grudge',
        name: Text.darkGreen('咒怨'),
        desc: Text.gray('攻击时有5%概率为装备加上随机诅咒附魔')
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

    // 反射
    'mrqx_reflection': function (event, data) {
        let entity = event.entity
        let attacker = event.source.actual
        attacker.attack(DamageSource.mobAttack(entity), entity.getAttributeTotalValue('minecraft:generic.attack_damage'))
    },

    // 截节
    'mrqx_somite': function (event, data) {
        let entity = event.entity
        let part = entity.getParts()
        let count = 0
        if (part) {
            part.forEach(p => {
                let dimensions = p.dimensions
                if (!(dimensions.width <= 0 && dimensions.height <= 0)) {
                    count++
                }
            })
        }
        if (count > 0) event.amount /= count
    },

    // 奴主
    'mrqx_slave_owner': function (event, data) {
        let entity = event.entity
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 32, entity.y - 32, entity.z - 32, entity.x + 32, entity.y + 32, entity.z + 32))
        /** @type {Internal.Entity[]} */
        let minionList = []
        if (entity.getType() == 'twilightforest:lich') {
            entityList.forEach(e => {
                if (e.getType() == 'twilightforest:lich_minion' && e.getStringUuid() != entity.getStringUuid()) {
                    minionList.push(e)
                }
            })
        }
        else {
            entityList.forEach(e => {
                if (e.getType() == 'minecraft:zombie' && e.getStringUuid() != entity.getStringUuid()) {
                    minionList.push(e)
                }
            })
        }
        if (minionList.length > 0) {
            minionList.forEach(e => {
                e.attack(DamageSource.mobAttack(event.source.actual), event.amount / minionList.length)
            })
            event.amount /= minionList.length
        }
        entity.server.scheduleInTicks(1, () => {
            for (let i = 0; i < Math.max(1, Math.min(16, Math.sqrt(event.amount * minionList.length))); i++) {
                if (entity.getType() == 'twilightforest:lich') {
                    /** @type {Internal.LichMinion} */
                    let minion = entity.level.createEntity('twilightforest:lich_minion')
                    minion.setPosition(entity.x + 16 * Math.random() - 8, entity.y, entity.z + 16 * Math.random() - 8)
                    minion.master = entity
                    minion.spawn()
                }
                else {
                    let zombie = entity.level.createEntity('minecraft:zombie')
                    zombie.setPosition(entity.x + 16 * Math.random() - 8, entity.y, entity.z + 16 * Math.random() - 8)
                    zombie.spawn()
                }
            }
        })
    },

    // 炽血
    'mrqx_buring_blood': function (event, data) {
        let entity = event.entity
        /** @type {Internal.LivingEntity} */
        let attacker = event.source.actual
        if (!attacker || !attacker.isLiving()) return
        entity.heal(mrqxCauseElementDamage(attacker, entity.getMaxHealth() * 0.1, 'fire') * entity.getMaxHealth() * 0.05)
        entity.persistentData.putInt("mrqx_fire_damage", 0)
    },

    // 同频
    'mrqx_co_frequency': function (event, data) {
        let entity = event.entity
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 32, entity.y - 32, entity.z - 32, entity.x + 32, entity.y + 32, entity.z + 32))
        /** @type {Internal.Entity[]} */
        let memberList = []
        entityList.forEach(e => {
            if (e.getType() == entity.getType() && e.getStringUuid() != entity.getStringUuid()) {
                memberList.push(e)
            }
        })
        if (memberList.length > 0) {
            if (!event.source.isBypassInvul()) {
                memberList.forEach(e => {
                    e.attack(DamageSource.mobAttack(event.source.actual).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), event.amount / memberList.length)
                })
                event.amount /= memberList.length
            }
            entity.server.scheduleInTicks(1, () => {
                entity.invulnerableTime = Math.max(entity.invulnerableTime * memberList.length, memberList.length)
            })
        }
    },

    // 无尽泪
    'mrqx_infinity_tear': function (event, data) {
        let entity = event.entity
        /** @type {Internal.LivingEntity} */
        let attacker = event.source.actual
        entity.level.setRainLevel(1)
        entity.level.setThunderLevel(1)
        if (attacker && attacker.isLiving() && entity.level.isRainingAt(entity.blockPosition()) && (attacker.y < entity.y || attacker.level.isRainingAt(attacker.blockPosition()))) {
            if (attacker.hasEffect('goety:sapped')) {
                let effect = attacker.getEffect('goety:sapped')
                attacker.removeEffect('goety:sapped')
                attacker.potionEffects.add('goety:sapped', effect.getDuration() + 20 * 60, effect.getAmplifier() + 1, false, false)
            }
            else {
                attacker.potionEffects.add('goety:sapped', 20 * 60, 0, false, false)
            }
            attacker.attack(DamageSource.DROWN, entity.getMaxHealth() - entity.getHealth())
            entity.server.scheduleInTicks(1, event => {
                entity.heal(entity.getMaxHealth() * 0.05)
            })
        }
    },

    // 雪暴
    'mrqx_snowstorm': function (event, data) {
        let entity = event.entity
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 64, entity.y - 64, entity.z - 64, entity.x + 64, entity.y + 64, entity.z + 64))
        entityList.forEach(e => {
            if (!e.isLiving() || entity.stringUuid == e.stringUuid) return
            mrqxCauseElementDamage(e, entity.getAttributeTotalValue('minecraft:generic.attack_damage'), 'ice')
            if (e.distanceToEntity(entity) <= 32) {
                /** @type {Internal.Projectile} */
                let bomb = entity.level.createEntity("twilightforest:thrown_ice")
                bomb.setPosition(entity.x, entity.y, entity.z)
                bomb.setOwner(entity)
                let x = e.x - entity.x
                let y = (e.getBoundingBox().minY + (e.getBbHeight() / 3.0)) - bomb.y
                let z = e.z - entity.z
                let speed = Math.sqrt((x * x) + (z * z))
                bomb.shoot(x, y + (speed * 0.2), z, 1.6, 14 - (bomb.getLevel().getDifficulty().getId() * 4))
                bomb.spawn()
            }
        })
        entity.persistentData.putInt("mrqx_ice_damage", 0)
    },

    // 极光
    'mrqx_aurora': function (event, data) {
        let entity = event.entity
        let count = 0
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 64, entity.y - 64, entity.z - 64, entity.x + 64, entity.y + 64, entity.z + 64))
        entityList.forEach(e => {
            if (!e.isLiving() || entity.stringUuid == e.stringUuid) return
            count += mrqxCauseElementDamage(e, entity.getAttributeTotalValue('minecraft:generic.attack_damage') * 3, 'ice')
        })
        if (count > 0) {
            entity.server.scheduleInTicks(1, event => {
                for (let i = 0; i < Math.min(count, 4); i++) {
                    let crystal = entity.level.createEntity('twilightforest:ice_crystal')
                    crystal.setPos(entity.x, entity.y, entity.z)
                    crystal.spawn()
                }
            })
            let level = Math.min((entity.getPersistentData().getInt('mrqxChampionAuroraLevel') ?? 0) + count, 900)
            let attributeMap = [
                'minecraft:generic.armor',
                'minecraft:generic.movement_speed',
                'minecraft:generic.attack_damage'
            ]
            attributeMap.forEach(attribute => [
                entity.modifyAttribute(attribute, 'mrqxChampionAurora', level * 0.01, 'multiply_total')
            ])
            entity.getPersistentData().putInt('mrqxChampionAuroraLevel', level)
            entity.server.scheduleInTicks(1, event => {
                entity.heal(entity.getMaxHealth() * Math.min(count * 0.01, 0.5))
            })
        }
        entity.persistentData.putInt("mrqx_ice_damage", 0)
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

    // 炽血
    'mrqx_buring_blood': function (event, data) {
        let player = event.entity
        /** @type {Internal.LivingEntity} */
        let entity = event.source.actual
        if (!entity || !entity.isLiving()) return
        entity.heal(mrqxCauseElementDamage(player, entity.getMaxHealth() * 0.1, 'fire') * entity.getMaxHealth() * 0.05)
        entity.persistentData.putInt("mrqx_fire_damage", 0)
    },

    // 同频
    'mrqx_co_frequency': function (event, data) {
        let entity = event.source.actual
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 32, entity.y - 32, entity.z - 32, entity.x + 32, entity.y + 32, entity.z + 32))
        /** @type {Internal.Entity[]} */
        let memberList = []
        entityList.forEach(e => {
            if (e.getType() == entity.getType() && e.getStringUuid() != entity.getStringUuid()) {
                memberList.push(e)
            }
        })
        if (memberList.length > 0) {
            event.amount *= memberList.length
        }
    },

    // 无尽泪
    'mrqx_infinity_tear': function (event, data) {
        let player = event.entity
        /** @type {Internal.LivingEntity} */
        let entity = event.source.actual
        entity.level.setRainLevel(1)
        entity.level.setThunderLevel(1)
        if (player && player.isLiving() && entity.level.isRainingAt(entity.blockPosition()) && (player.y < entity.y || player.level.isRainingAt(player.blockPosition()))) {
            if (player.hasEffect('goety:sapped')) {
                let effect = player.getEffect('goety:sapped')
                player.removeEffect('goety:sapped')
                player.potionEffects.add('goety:sapped', effect.getDuration() + 20 * 10, effect.getAmplifier() + 1, false, false)
            }
            else {
                player.potionEffects.add('goety:sapped', 20 * 10, 0, false, false)
            }
            player.attack(DamageSource.DROWN, entity.getMaxHealth() - entity.getHealth())
            entity.server.scheduleInTicks(1, event => {
                entity.heal(entity.getMaxHealth() * 0.05)
            })
        }
    },

    // 雪暴
    'mrqx_snowstorm': function (event, data) {
        /** @type {Internal.LivingEntity} */
        let entity = event.source.actual
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 64, entity.y - 64, entity.z - 64, entity.x + 64, entity.y + 64, entity.z + 64))
        entityList.forEach(e => {
            if (!e.isLiving() || entity.stringUuid == e.stringUuid) return
            mrqxCauseElementDamage(e, entity.getAttributeTotalValue('minecraft:generic.attack_damage'), 'ice')
            if (e.distanceToEntity(entity) <= 32) {
                /** @type {Internal.Projectile} */
                let bomb = entity.level.createEntity("twilightforest:thrown_ice")
                bomb.setPosition(entity.x, entity.y - 0.1, entity.z)
                bomb.setOwner(entity)
                let x = e.x - entity.x
                let y = (e.getBoundingBox().minY + (e.getBbHeight() / 3.0)) - bomb.y
                let z = e.z - entity.z
                let speed = Math.sqrt((x * x) + (z * z))
                bomb.shoot(x, y + (speed * 0.2), z, 1.6, 14 - (bomb.getLevel().getDifficulty().getId() * 4))
                bomb.spawn()
            }
        })
        entity.persistentData.putInt("mrqx_ice_damage", 0)
    },

    // 极光
    'mrqx_aurora': function (event, data) {
        /** @type {Internal.LivingEntity} */
        let entity = event.source.actual
        let count = 0
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 64, entity.y - 64, entity.z - 64, entity.x + 64, entity.y + 64, entity.z + 64))
        entityList.forEach(e => {
            if (!e.isLiving() || entity.stringUuid == e.stringUuid) return
            count += mrqxCauseElementDamage(e, entity.getAttributeTotalValue('minecraft:generic.attack_damage') * 3, 'ice')
        })
        if (count > 0) {
            entity.server.scheduleInTicks(1, event => {
                for (let i = 0; i < Math.min(count, 4); i++) {
                    let crystal = entity.level.createEntity('twilightforest:ice_crystal')
                    crystal.setPos(entity.x, entity.y, entity.z)
                    crystal.spawn()
                }
            })
            let level = Math.min((entity.getPersistentData().getInt('mrqxChampionAuroraLevel') ?? 0) + count, 900)
            let attributeMap = [
                'minecraft:generic.armor',
                'minecraft:generic.movement_speed',
                'minecraft:generic.attack_damage'
            ]
            attributeMap.forEach(attribute => [
                entity.modifyAttribute(attribute, 'mrqxChampionAurora', level * 0.01, 'multiply_total')
            ])
            entity.getPersistentData().putInt('mrqxChampionAuroraLevel', level)
            entity.server.scheduleInTicks(1, event => {
                entity.heal(entity.getMaxHealth() * Math.min(count * 0.01, 0.5))
            })
        }
        entity.persistentData.putInt("mrqx_ice_damage", 0)
    },

    // 咒怨
    'mrqx_grudge': function (event, data) {
        let player = event.entity
        if (Math.random() < 1) {
            let random = Math.ceil((Math.random() * curseEnchantList.length))
            let armor = Item.of('minecraft:air')
            switch (Math.ceil((Math.random() * 4))) {
                case 1:
                    armor = player.getHeadArmorItem()
                    if (armor.id == 'minecraft:air') return
                    player.setHeadArmorItem(armor.enchant(curseEnchantList[random - 1], 1))
                    break
                case 2:
                    armor = player.getChestArmorItem()
                    if (armor.id == 'minecraft:air') return
                    player.setChestArmorItem(armor.enchant(curseEnchantList[random - 1], 1))
                    break
                case 3:
                    armor = player.getLegsArmorItem()
                    if (armor.id == 'minecraft:air') return
                    player.setLegsArmorItem(armor.enchant(curseEnchantList[random - 1], 1))
                    break
                case 4:
                    armor = player.getFeetArmorItem()
                    if (armor.id == 'minecraft:air') return
                    player.setFeetArmorItem(armor.enchant(curseEnchantList[random - 1], 1))
                    break
                default:
                    break
            }
        }
    },
}

var champion_player_bear = Object.assign(championPlayerBearStrategies, mrqxChampionPlayerBearStrategies)

EntityEvents.spawned(event => {
    /*** @type {Internal.LivingEntity}*/
    let entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return
    if (!entity.persistentData.contains('champion')) return
    /** @type {Internal.ListTag} */
    let typeList = entity.persistentData.get('champion')
    typeList.forEach(type => {
        let typeName = type.getAsString()
        if (mrqxBossChampionTypeList.find((value, index, obj) => (typeName == value)) && !(entity.getType() in mrqxBossChampionMap) && Math.random() > 0.2) {
            entity.persistentData.put('champion', [])
            entity.setCustomName(null)
            entity.setCustomNameVisible(false)
        }
        if (typeName in mrqxChampionSpawnStrategies) {
            mrqxChampionSpawnStrategies[typeName](event)
        }
    })
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

EntityEvents.death(event => {
    /*** @type {Internal.LivingEntity}*/
    let entity = event.entity
    /** @type {Internal.LivingEntity[]} */
    let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 256, entity.y - 256, entity.z - 256, entity.x + 256, entity.y + 256, entity.z + 256))
    entityList.forEach(e => {
        if (e.isLiving()) {
            /** @type {Internal.ListTag} */
            let typeList = e.persistentData.get('champion') ?? []
            typeList.forEach(type => {
                let typeName = type.getAsString()
                if (typeName == 'mrqx_spore_aggregation') {
                    let count = (e.getPersistentData().getInt('mrqxChampionSporeAggregationCount') ?? 0) + 1
                    let attributeMap = [
                        'minecraft:generic.armor',
                        'minecraft:generic.movement_speed',
                        'minecraft:generic.attack_damage',
                        'minecraft:generic.max_health'
                    ]
                    attributeMap.forEach(attribute => [
                        e.modifyAttribute(attribute, 'mrqxChampionSporeAggregation', count * 0.1, 'multiply_total')
                    ])
                    e.getPersistentData().putInt('mrqxChampionSporeAggregationCount', count)
                    e.heal(e.getMaxHealth() * 0.1)
                    e.hurtMarked = true
                    return
                }
            })
        }
    })
})