// priority: 450
/**
 * @param {Internal.LivingChangeTargetEvent} event
 * @returns
 */
global.mrqxLivingChangeTargetEvent = event => {
    let player = event.originalTarget
    if (!(player && player.isPlayer())) return
    let typeMap = getPlayerChestCavityTypeMap(player)
    let onlySet = new Set()
    if (typeMap.has('kubejs:mrqx_change_target_only')) {
        typeMap.get('kubejs:mrqx_change_target_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                mrqxOrganChangeTargetOnlyStrategies[organ.id](event, organ)
            }
        })
    }
    if (typeMap.has('kubejs:mrqx_change_target')) {
        typeMap.get('kubejs:mrqx_change_target').forEach(organ => {
            mrqxOrganChangeTargetStrategies[organ.id](event, organ)
        })
    }
}

/**
 * 器官改变目标策略
 * @constant
 * @type {Object<string,function(Internal.LivingChangeTargetEvent, organ):void>}
 */
const mrqxOrganChangeTargetStrategies = {

}


/**
 * 器官改变目标唯一策略
 * @constant
 * @type {Object<string,function(Internal.LivingChangeTargetEvent, organ):void>}
 */
const mrqxOrganChangeTargetOnlyStrategies = {
    // 远古巫妖之心
    'mrqx_extra_pack:ancient_lich_heart': function (event, organ) {
        if (event.originalTarget.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1 && !event.getEntity().persistentData.getBoolean('mrqxAncientLichHeartTarget')) {
            event.setNewTarget(null)
        }
    },

    // 墨染
    'mrqx_extra_pack:mrqx0195': function (event, organ) {
        event.setNewTarget(null)
    },
}
