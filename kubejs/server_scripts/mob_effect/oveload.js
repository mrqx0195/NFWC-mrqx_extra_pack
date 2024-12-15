// priority: 3
/**
 * 超载增伤效果
 * @param {Internal.LivingHurtEvent} event 
 * @param {EntityHurtCustomModel} data 
 * @returns 
 */
function overloadEntityHurtByPlayer(event, data) {
    let player = event.source.player;
    if (player.hasEffect('kubejs:overload')) {
        let tempterature = coldsweat.getTemperature(player, 'body')
        if (tempterature > 0){
            event.amount = event.amount * tempterature/50
        }
        return;
    }
}

// priority: 3
/**
 * 超载受伤效果
 * @param {Internal.LivingHurtEvent} event 
 * @param {EntityHurtCustomModel} data 
 * @returns 
 */
function overloadEntityHurtByOthers(event, data) {
    let player = event.entity
    if (player.hasEffect('kubejs:overload')) {
        let tempterature = coldsweat.getTemperature(player, 'body')
        if (tempterature > 0){
            event.amount = event.amount * tempterature/50
        }
        return;
    }
}

// priority: 3
/**
 * 结霜受伤效果
 * @param {Internal.LivingHurtEvent} event 
 * @param {EntityHurtCustomModel} data 
 * @returns 
 */
function iceEntityHurtByOthers(event, data) {
    let player = event.entity
    if (player.hasEffect('kubejs:ice')) {
        let tempterature = coldsweat.getTemperature(player, 'body')
        if (tempterature < 0){
            event.amount = event.amount * 50 / (-tempterature)
        }
        return;
    }
}