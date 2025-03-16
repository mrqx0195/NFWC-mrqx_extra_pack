// priority: 950

/**
 * BOSS刻处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingEvent$LivingTickEvent):void>}
 */
global.mrqxBossTick = {
    'minecraft:wither': function (event) {
        /** @type {Internal.WitherBoss} */
        let entity = event.entity
        let diff = entity.persistentData.getInt('mrqxBossDiff')
        let playerCount = entity.persistentData.getInt('mrqxBossPlayerCount')
        if (entity.age % (20 * 20) == 0) {
            for (let i = 0; i < diff * playerCount; i++) {
                if (Math.random() < 0.5) continue
                /** @type {Internal.WitherSkeleton} */
                let e = entity.level.createEntity('minecraft:wither_skeleton')
                e.setPos(entity.x, entity.y, entity.z)
                /** @type {Special.Attribute[]} */
                let attributeAdditionMap = [
                    'minecraft:generic.armor'
                ]
                /** @type {Special.Attribute[]} */
                let attributeMultiplyBaseMap = [
                    'minecraft:generic.movement_speed',
                    'minecraft:generic.attack_damage',
                    'minecraft:generic.max_health'
                ]
                attributeAdditionMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffAddition', diff * 2, 'addition')
                ])
                attributeMultiplyBaseMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffMultiplyBase', diff * 0.1, 'multiply_base')
                ])
                if (Math.random() < diff * 0.1) {
                    if (Math.random() < 0.5) {
                        if (diff >= 4) {
                            e.setMainHandItem(Item.of('minecraft:netherite_sword'))
                        }
                        else {
                            e.setMainHandItem(Item.of('minecraft:stone_sword'))
                        }
                    }
                    else {
                        if (diff >= 4) {
                            e.setMainHandItem(Item.of('minecraft:crossbow'))
                        }
                        else {
                            e.setMainHandItem(Item.of('minecraft:bow'))
                        }
                    }
                }
                e.persistentData.putBoolean('mrqxLivingNoItemDrops', true)
                e.setTarget(e.level.getNearestPlayer(entity, 64))
                e.spawn()
            }
        }
        if (entity.age % Math.floor(20 * 10 / diff) == 0) {
            let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 64, entity.y - 64, entity.z - 64, entity.x + 64, entity.y + 64, entity.z + 64))
            entityList.forEach(e => {
                if (!e.isPlayer()) return
                mrqxCauseElementDamage(e, entity.getAttributeTotalValue('minecraft:generic.attack_damage') * diff * 0.1, 'wither')
                if (Math.random() < diff * 0.1 && e.distanceToEntity(entity) <= 32) {
                    for (let i = 0; i < Math.min(diff * 0.1, 8); i++) {
                        /** @type {Internal.WitherSkull} */
                        let witherSkull = entity.level.createEntity('minecraft:wither_skull')
                        let x = entity.getX()
                        let y = entity.getY() + 3.0
                        let z = entity.getZ()
                        let sX = e.getX() - x + (Math.random() - 0.5) * 8
                        let sY = e.getY() - y + (Math.random() - 0.5) * 8
                        let sZ = e.getZ() - z + (Math.random() - 0.5) * 8
                        let d0 = Math.sqrt(sX * sX + sY * sY + sZ * sZ)
                        witherSkull.setOwner(entity)
                        witherSkull.setPosRaw(x, y, z)
                        witherSkull.setRotation(entity.yRot, entity.xRot)
                        if (d0 != 0) {
                            witherSkull.xPower = sX / d0 * 0.1
                            witherSkull.yPower = sY / d0 * 0.1
                            witherSkull.zPower = sZ / d0 * 0.1
                        }
                        if (Math.random() < diff * 0.1) {
                            witherSkull.setDangerous(true)
                            witherSkull.xPower = witherSkull.xPower * 2
                            witherSkull.yPower = witherSkull.yPower * 2
                            witherSkull.zPower = witherSkull.zPower * 2
                        }
                        witherSkull.spawn()
                    }
                }
            })
        }
    },

    'minecraft:ender_dragon': function (event) {
        /** @type {Internal.EnderDragon} */
        let entity = event.entity
        let diff = entity.persistentData.getInt('mrqxBossDiff')
        let playerCount = entity.persistentData.getInt('mrqxBossPlayerCount')
        if (entity.age % (20 * 20) == 0) {
            for (let i = 0; i < diff * playerCount; i++) {
                if (Math.random() < 0.5) continue
                let id = 'minecraft:enderman'
                if (Math.random() < 0.5) {
                    id = 'minecraft:endermite'
                }
                if (Math.random() < 0.1) {
                    id = 'minecraft:shulker'
                }
                /** @type {Internal.LivingEntity} */
                let e = entity.level.createEntity(id)
                e.setPos(entity.x + (Math.random() - 0.5) * 64, entity.y, entity.z + (Math.random() - 0.5) * 64)
                for (let i = e.y; i >= entity.level.getMinBuildHeight(); i--) {
                    e.setPos(e.x, i, e.z)
                    let pos = e.getBlock().getPos()
                    let chunk = e.level.getChunk(pos)
                    let blockState = chunk.getBlockState(pos)
                    if (blockState.isRedstoneConductor(chunk, blockState)) {
                        e.setPos(e.x, i + 1, e.z)
                        break
                    }
                }
                if (e.y <= entity.level.getMinBuildHeight() + 1) {
                    continue
                }
                /** @type {Special.Attribute[]} */
                let attributeAdditionMap = [
                    'minecraft:generic.armor',
                    'minecraft:generic.attack_damage',
                    'minecraft:generic.max_health'
                ]
                /** @type {Special.Attribute[]} */
                let attributeMultiplyBaseMap = [
                    'minecraft:generic.attack_damage',
                    'minecraft:generic.max_health'
                ]
                attributeAdditionMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffAddition', diff * 4, 'addition')
                ])
                attributeMultiplyBaseMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffMultiplyBase', diff * 0.1, 'multiply_base')
                ])
                e.persistentData.putBoolean('mrqxLivingNoItemDrops', true)
                e.setTarget(e.level.getNearestPlayer(entity, 256))
                e.spawn()
            }
            for (let i = 0; i < diff * playerCount; i++) {
                if (Math.random() > 0.1 * diff) continue
                /** @type {Internal.EndCrystal} */
                let e = entity.level.createEntity('minecraft:end_crystal')
                e.setPos(entity.x + (Math.random() - 0.5) * 64, entity.y, entity.z + (Math.random() - 0.5) * 64)
                for (let i = e.y; i >= entity.level.getMinBuildHeight(); i--) {
                    e.setPos(e.x, i, e.z)
                    let pos = e.getBlock().getPos()
                    let chunk = e.level.getChunk(pos)
                    let blockState = chunk.getBlockState(pos)
                    if (blockState.isRedstoneConductor(chunk, blockState)) {
                        e.setPos(e.x, i + 1, e.z)
                        break
                    }
                }
                if (e.y <= entity.level.getMinBuildHeight() + 1) {
                    continue
                }
                e.spawn()
            }
        }
        if (entity.age % (20 * 5) == 0) {
            let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 256, entity.y - 256, entity.z - 256, entity.x + 256, entity.y + 256, entity.z + 256))
            entityList.forEach(e => {
                if (!e.isPlayer()) return
                mrqxCauseElementDamage(e, diff * 100, 'ender')
                if (Math.random() < diff * 0.1 && e.distanceToEntity(entity) <= 128) {
                    for (let i = 0; i < diff * 0.1; i++) {
                        /** @type {Internal.DragonFireball} */
                        let fireBall = entity.level.createEntity('minecraft:dragon_fireball')
                        let vec = entity.getViewVector(1.0)
                        let x = entity.head.getX() - vec.x() * 1.0
                        let y = entity.head.getY(0.5) + 0.5
                        let z = entity.head.getZ() - vec.z() * 1.0
                        let sX = e.getX() - x + (Math.random() - 0.5) * 8
                        let sY = e.getY(0.5) - y
                        let sZ = e.getZ() - z + (Math.random() - 0.5) * 8
                        fireBall.setOwner(entity)
                        fireBall.setPos(x, y, z)
                        fireBall.shoot(sX, sY, sZ, Math.sqrt(diff) * 0.5, Math.sqrt(diff) * 0.5)
                        fireBall.spawn()
                    }
                }
            })
        }
    },

    'witherstormmod:wither_storm': function (event) {

        let entity = event.entity
        let diff = entity.persistentData.getInt('mrqxBossDiff')
        let playerCount = entity.persistentData.getInt('mrqxBossPlayerCount')
        let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 2048, entity.y - 2048, entity.z - 2048, entity.x + 2048, entity.y + 2048, entity.z + 2048))
        entityList.forEach(e => {
            if (!e.isPlayer()) return
            let itemMap = getPlayerChestCavityItemMap(e)
            if (itemMap.has('mrqx_extra_pack:framework_of_world')) return
            mrqxCauseElementDamage(e, diff * 0.1, 'wither')
        })
        if (entity.age % (20 * 20) == 0) {
            for (let i = 0; i < diff * playerCount; i++) {
                let e = entity.level.createEntity('witherstormmod:withered_symbiont')
                e.setPos(entity.x, entity.y, entity.z)
                /** @type {Special.Attribute[]} */
                let attributeAdditionMap = [
                    'minecraft:generic.armor'
                ]
                /** @type {Special.Attribute[]} */
                let attributeMultiplyBaseMap = [
                    'minecraft:generic.movement_speed',
                    'minecraft:generic.attack_damage',
                    'minecraft:generic.max_health'
                ]
                attributeAdditionMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffAddition', diff * 2, 'addition')
                ])
                attributeMultiplyBaseMap.forEach(attribute => [
                    e.modifyAttribute(attribute, 'mrqxBossDiffMultiplyBase', diff * 0.1, 'multiply_base')
                ])
                if (Math.random() < diff * 0.1) {
                    if (Math.random() < 0.5) {
                        if (diff >= 4) {
                            e.setMainHandItem(Item.of('minecraft:netherite_sword'))
                        }
                        else {
                            e.setMainHandItem(Item.of('minecraft:stone_sword'))
                        }
                    }
                    else {
                        if (diff >= 4) {
                            e.setMainHandItem(Item.of('minecraft:crossbow'))
                        }
                        else {
                            e.setMainHandItem(Item.of('minecraft:bow'))
                        }
                    }
                }
                e.persistentData.putBoolean('mrqxLivingNoItemDrops', true)
                e.setTarget(e.level.getNearestPlayer(entity, 64))
                e.spawn()
            }
        }
    },
}