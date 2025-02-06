// priority: 500

EntityEvents.death(event => {
    let entity = event.entity
    if (!mrqxBossTypeList.find((value) => (value == entity.getType()))) return
    let entityList = entity.level.getEntitiesWithin(new AABB.of(entity.x - 256, entity.y - 256, entity.z - 256, entity.x + 256, entity.y + 256, entity.z + 256))
    entityList.forEach(player => {
        if (player.isPlayer() && mrqxIsBossEnhanceEnabled(player)) {
            /** @type {Internal.CompoundTag} */
            let diffMap = player.persistentData.get('mrqxBossDiffMap') ?? mrqxGetEmptyCompound()
            if (!diffMap.contains(entity.getType())) diffMap.putInt(entity.getType(), 0)
            diffMap.putInt(entity.getType(), diffMap.getInt(entity.getType()) + 1)
            player.persistentData.put('mrqxBossDiffMap', diffMap)
            player.tell('§c强大存在的灵魂缠绕于你……§r')
        }
    })
    if (event.source.player instanceof $mrqxDeployerFakePlayer) {
        let player = event.source.player.level.getEntity(event.source.player.getProfile().getId())
        /** @type {Internal.CompoundTag} */
        let diffMap = player.persistentData.get('mrqxBossDiffMap') ?? mrqxGetEmptyCompound()
        if (!diffMap.contains(entity.getType())) diffMap.putInt(entity.getType(), 0)
        diffMap.putInt(entity.getType(), diffMap.getInt(entity.getType()) + 10)
        player.persistentData.put('mrqxBossDiffMap', diffMap)
        player.tell('§c因卑鄙的手段，强大存在的灵魂迁怒于你……§r')
    }
    if ((entity.getType() in global.mrqxBossDeath)) {
        global.mrqxBossDeath[entity.getType()](event, entity.persistentData.getInt('mrqxBossDiff'))
    }
})

/**
 * BOSS死亡处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingEntityDeathEventJS,number):void>}
 */
global.mrqxBossDeath = {
    'minecraft:wither': function (event, diff) {
        let entity = event.entity
        for (let i = 0; i < diff; i++) {
            if (Math.random() < 0.5) {
                entity.block.popItem('kubejs:nether_star_shard')
            }
            if (Math.random() < 0.1) {
                entity.block.popItem('minecraft:nether_star')
            }
        }
    },
    'minecraft:ender_dragon': function (event, diff) {
        let entity = event.entity
        for (let i = 0; i < diff; i++) {
            entity.block.popItem('kubejs:dragon_breath')
            if (Math.random() < 0.5) {
                entity.block.popItem('tetra:dragon_sinew')
            }
            if (Math.random() < 0.3) {
                entity.block.popItem('irons_spellbooks:dragonskin')
            }
            if (Math.random() < 0.05) {
                entity.block.popItem('art_of_forging:dragon_soul')
            }
        }
        if (Math.random() < 0.5) {
            entity.block.popItem('minecraft:dragon_head')
        }
        if (Math.random() < 0.01 * (diff ** 2)) {
            entity.block.popItem('minecraft:dragon_egg')
        }
    },
}