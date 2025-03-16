// priority: 750

function mrqxChestType() {
    this.defaultChestCavity = []
    this.baseOrganScores = []
    this.exceptionalOrgans = []
}

mrqxChestType.prototype = {
    /**
     * @param {Special.Item} item
     * @param {number} position
     * @returns {mrqxChestType}
     */
    addDefaultChestCavity: function (item, position) {
        this.defaultChestCavity.push({
            "item": item,
            "position": position,
        })
        return this
    },
    /**
     * @param {string} id
     * @param {string} value
     * @returns {mrqxChestType}
     */
    addBaseOrganScore: function (id, value) {
        this.baseOrganScores.push({
            "item": id,
            "position": value,
        })
        return this
    },
}

/**
 * @param {string} chestcavity
 */
function mrqxEntityAssignment(chestcavity) {
    this.chestcavity = chestcavity
    this.entities = []
}

mrqxEntityAssignment.prototype = {
    /**
     * @param {Special.EntityType} entity
     * @returns {mrqxEntityAssignment}
     */
    addEntity: function (entity) {
        this.entities.push(entity,)
        return this
    },
}

ServerEvents.highPriorityData(event => {
    function registerEntityAssignment(dataModel, id) {
        event.addJson(`mrqx_extra_pack:entity_assignment/mrqx_${id}.json`, dataModel)
    }
    function registerChestType(dataModel, id) {
        let path = `mrqx_extra_pack:types/mrqx_${id}.json`
        event.addJson(path, dataModel)
        return path
    }

    // 凋灵风暴
    registerEntityAssignment(new mrqxEntityAssignment(
        registerChestType(new mrqxChestType()
            .addDefaultChestCavity('kubejs:storm_metal_plate', 4)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 12)
            .addDefaultChestCavity('witherstormmod:command_block_book', 13)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 14)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 22)
            .addBaseOrganScore('chestcavity:health', '1'),
            'wither_storm'
        )
    )
        .addEntity('witherstormmod:withered_symbiont')
        .addEntity('witherstormmod:wither_storm')
        .addEntity('witherstormmod:wither_storm_segment'),
        'wither_storm'
    )

    // 命令方块
    registerEntityAssignment(new mrqxEntityAssignment(
        registerChestType(new mrqxChestType()
            .addDefaultChestCavity('kubejs:storm_metal_plate', 4)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 12)
            .addDefaultChestCavity('witherstormmod:command_block_book', 13)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 14)
            .addDefaultChestCavity('kubejs:storm_metal_plate', 22)
            .addBaseOrganScore('chestcavity:health', '1'),
            'command_block'
        ))
        .addEntity('witherstormmod:command_block'),
        'command_block'
    )
})