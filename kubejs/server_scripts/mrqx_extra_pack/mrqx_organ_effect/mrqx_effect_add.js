// priority: 450
/**
 * @param {Internal.MobEffectEvent$Added} event 
 * @returns 
 */
global.mrqxEffectAddedEvent = event => {
    let player = event.entity
    if (!player && !player.isPlayer()) return
    let typeMap = getPlayerChestCavityTypeMap(player)
    let onlySet = new Set()
    if (typeMap.has('kubejs:mrqx_obtain_effect_only')) {
        typeMap.get('kubejs:mrqx_obtain_effect_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                mrqxOrganObtainEffectOnlyStrategies[organ.id](event, organ)
            }
        })
    }
    if (typeMap.has('kubejs:mrqx_obtain_effect')) {
        typeMap.get('kubejs:mrqx_obtain_effect').forEach(organ => {
            mrqxOrganObtainEffectStrategies[organ.id](event, organ)
        })
    }
}

/**
 * 器官获得效果策略
 * @constant
 * @type {Object<string,function(Internal.MobEffectEvent$Added, organ):void>}
 */
const mrqxOrganObtainEffectStrategies = {

}


/**
 * 器官获得效果唯一策略
 * @constant
 * @type {Object<string,function(Internal.MobEffectEvent$Added, organ):void>}
 */
const mrqxOrganObtainEffectOnlyStrategies = {
    // 远古巫妖之心
    'mrqx_extra_pack:ancient_lich_heart': function (event, organ) {
        let player = event.entity
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1 && event.getEffectInstance().getEffect().getCategory().name() == 'HARMFUL' && !(event.getEffectInstance().getEffect().getDescriptionId() in mrqxHarmfulEffectWhiteList)) {
            event.getEffectInstance().setDuration(0)
        }
    },
}
