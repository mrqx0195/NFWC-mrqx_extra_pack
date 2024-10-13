// priority: 9

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
            event.cancel()
            if (player.persistentData.contains(resourceCount)) {
                count = player.persistentData.getInt(resourceCount) + count
            }
            updateResourceCount(player, count)
        }
    },
}

var assign_organ_block_broken_only = Object.assign(organBlockBrokenOnlyStrategies, mrqxOrganBlockBrokenOnlyStrategies)