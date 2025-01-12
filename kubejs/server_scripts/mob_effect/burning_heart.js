// priority: 800
/**
 * 熔火增伤效果
 * @param {Internal.LivingHurtEvent} event 
 * @param {EntityHurtCustomModel} data 
 * @returns 
 */
function burningHeartEntityHurtByPlayer(event, data) {
    let player = event.source.player
    if (player.hasEffect('kubejs:burning_heart')) {
        let burningHeartEffect = player.getEffect('kubejs:burning_heart')
        let burningHeartAmplifier = burningHeartEffect.getAmplifier()
        event.amount = event.amount + burningHeartAmplifier * 4 + 4
        return
    }
    if (player.hasEffect('kubejs:flaring_heart')) {
        let flaringHeartEffect = player.getEffect('kubejs:flaring_heart')
        let flaringHeartAmplifier = flaringHeartEffect.getAmplifier()
        let flaringHeartDuration = flaringHeartEffect.getDuration()
        if (flaringHeartDuration <= 20 * 5) {
            player.setStatusMessage($Serializer.fromJsonLenient({ translate: 'kubejs.status_msg.flaring_heart.1', with: [{ text: flaringHeartDuration, color: 'gray' }, { text: flaringHeartAmplifier * 1.0 + 1.5, color: 'yellow' }] }))
            event.amount = event.amount * (flaringHeartAmplifier * 1.0 + 1.5)
            return
        }
    }
}