// priority: 450

/**
 * 器官方块破坏策略
 * @constant
 * @type {Object<string,function(Internal.BlockBrokenEventJS, organ):void>}
 */
const mrqxOrganBlockBrokenStrategies = {

}

var assign_organ_block_broken = Object.assign(organBlockBrokenStrategies, mrqxOrganBlockBrokenStrategies)

/**
 * 器官方块破坏唯一策略
 * @constant
 * @type {Object<string,function(Internal.BlockBrokenEventJS, organ):void>}
 */
const mrqxOrganBlockBrokenOnlyStrategies = {
    // ‌机械“挖矿”处理器
    'mrqx_extra_pack:machine_mine_cpu': function (event, organ) {
        if (!event.block.item.hasTag('forge:stone')) {
            return
        }
        let player = event.player
        if (player.persistentData.organActive != 1) {
            return
        }
        let count = mrqxGetComputingPower(player)
        if (Math.random() <= count * 0.01) {
            event.block.set('minecraft:air')
            if (player.persistentData.contains(resourceCount)) {
                count = player.persistentData.getInt(resourceCount) + count
            }
            updateResourceCount(player, count)
            event.cancel()
        }
    },

    // 富集矿簇析出膜
    'mrqx_extra_pack:enriched_ore_cluster_precipitation_membrane': function (event, organ) {
        if (!event.block.item.hasTag('forge:stone')) {
            return
        }
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let itemMap = getPlayerChestCavityItemMap(player)
        let cancel = false
        if (typeMap.has('kubejs:resource') && ((Math.random() <= 0.5) || (itemMap.has('mrqx_extra_pack:machine_mine_cpu')))) {
            event.block.set('minecraft:air')
            let count = 0
            if (player.persistentData.contains(resourceCount)) {
                count = player.persistentData.getInt(resourceCount)
            }
            count += typeMap.get('kubejs:resource').length
            updateResourceCount(player, count)
            cancel = true
        }
        if (Math.random() <= 0.05 && !player.isShiftKeyDown()) {
            let resource = 0
            let warp = 0
            let magicData = getPlayerMagicData(player)
            let mana = magicData.getMana()
            if (player.persistentData.contains(resourceCount)) {
                resource = player.persistentData.getInt(resourceCount)
            }
            if (player.persistentData.contains(warpCount)) {
                warp = player.persistentData.getInt(warpCount)
            }
            if (resource > 100) {
                while (true) {
                    let n = Math.random() * resource
                    if (resource <= 100) break
                    else if (n > 500 && mana > 10 && warp > 10) {
                        resource -= 50
                        mana -= 10
                        warp -= 10
                        player.give('mrqx_extra_pack:anomaly_artificial_mineral_cluster')
                    }
                    else if (n > 400 && mana > 10) {
                        resource -= 40
                        mana -= 10
                        player.give('mrqx_extra_pack:magic_artificial_mineral_cluster')
                    }
                    else if (n > 300) {
                        resource -= 30
                        player.give('mrqx_extra_pack:artificial_mineral_cluster')
                    }
                    else if (n > 200) {
                        resource -= 20
                        player.give('kubejs:rare_mineral_cluster')
                    }
                    else if (n > 100) {
                        resource -= 10
                        player.give('kubejs:common_mineral_cluster')
                    }
                }
                player.persistentData.putInt(resourceCount, resource)
                player.persistentData.putInt(warpCount, warp)
                magicData.setMana(mana)
            }
        }
        if (cancel) event.cancel()
    },

    // 绿宝石镐之魂
    'mrqx_extra_pack:soul_of_emerald_pickaxe': function (event, organ) {
        if (event.player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
            return
        }
        /** @type {Special.BlockTag[]} */
        let tagList = ['twilightforest:mazestone', 'twilightforest:castle_blocks']
        let b = true
        tagList.forEach(tag => {
            if (event.block.hasTag(tag)) {
                b = false
            }
        })
        if (b) {
            return
        }
        event.player.addItemCooldown('mrqx_extra_pack:soul_of_emerald_pickaxe', 20 *
            mrqxGetConnectedBlocksCount(
                event.getBlock().getX(),
                event.getBlock().getY(),
                event.getBlock().getZ(),
                1561 ** 2,
                event.getLevel(),
                new Set(),
                /**
                 * @param {Number} count
                 * @param {Number} x
                 * @param {Number} y
                 * @param {Number} z
                 * @param {Number} max
                 * @param {Internal.Level} level
                 * @param {Set<String>} set
                 * @returns {Boolean}
                 */
                (x, y, z, max, level, set) => {
                    /** @type {Special.BlockTag[]} */
                    let tagList = ['twilightforest:mazestone', 'twilightforest:castle_blocks']
                    let b = false
                    tagList.forEach(tag => {
                        let block = level.getBlock(x, y, z)
                        if (block.hasTag(tag)) {
                            b = true
                            event.player.give(block.getItem())
                            block.set('minecraft:air')
                        }
                    })
                    return b
                }
            )
        )
    },
}

var assign_organ_block_broken_only = Object.assign(organBlockBrokenOnlyStrategies, mrqxOrganBlockBrokenOnlyStrategies)