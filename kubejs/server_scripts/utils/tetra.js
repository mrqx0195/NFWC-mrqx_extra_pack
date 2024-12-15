// priority: 1
/**
 * @param {Internal.ServerPlayer} player 
 * @returns {ItemEffectResult[]}
 */
function getItemEffectsInBothHands(player) {
    let mainHandItemEffects = TetraEffect.getAllItemEffectResults(player.getMainHandItem())
    let offHandItemEffects = TetraEffect.getAllItemEffectResults(player.getOffHandItem())
    let effects = []
    if (mainHandItemEffects) {
        effects = effects.concat(mainHandItemEffects)
    }
    if (offHandItemEffects) {
        effects = effects.concat(offHandItemEffects)
    }
    return effects
}