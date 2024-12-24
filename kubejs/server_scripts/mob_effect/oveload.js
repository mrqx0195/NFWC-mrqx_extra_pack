// priority: 800
/**
 * 超载增伤效果
 * @param {Internal.LivingHurtEvent} event 
 * @param {EntityHurtCustomModel} data 
 * @returns 
 */
function overloadEntityHurtByPlayer(event, data) {
    let player = event.source.player;
    if (player.hasEffect('kubejs:overload')) {
        let temperature = ColdSweat.getTemperature(player, 'body')
        let amplifier = player.getEffect('kubejs:overload').getAmplifier() + 1
        if (temperature > 0){
            event.amount = event.amount * (temperature / 50 + 1 + amplifier / 8) / 2
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
        let temperature = ColdSweat.getTemperature(player, 'body')
        if (temperature > 0){
            event.amount = event.amount * temperature / 50
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
        let temperature = ColdSweat.getTemperature(player, 'body')
        if (temperature < 0){
            event.amount = event.amount * 50 / (-temperature)
        }
        return;
    }
}