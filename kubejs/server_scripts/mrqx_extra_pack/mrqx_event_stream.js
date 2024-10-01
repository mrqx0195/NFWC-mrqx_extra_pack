// priority: 9

/**
 * @param {Internal.LivingHurtEvent} event
 */
global.mrqxLivingHurtByPlayer = event => {
    let curiosResidualBreathOfDeadSoulItems = mrqxGetCurioInfo(event.source.player, 'mrqx_extra_pack:residual_breath_of_dead_soul')
    if (curiosResidualBreathOfDeadSoulItems.hasItem) {
        for (let i = 0; i < curiosResidualBreathOfDeadSoulItems.count; i++) {
            if (curiosResidualBreathOfDeadSoulItems.stacks[i].getDamageValue() == 0) {
                mrqxResidualBreathOfDeadSoulDamage(event)
            }
        }
    }
}

/**
 * @param {Internal.LivingDamageEvent} event
 */
global.mrqxLivingDamageByOthers = event => {
    if (event.entity.getMainHandItem() == 'mrqx_extra_pack:sentient_greatscythe') {
        mrqxSentientGreatscytheDamageByOthers(event)
    }
    let curiosShieldGeneratorItems = mrqxGetCurioInfo(event.entity, 'mrqx_extra_pack:shield_generator')
    if (curiosShieldGeneratorItems.hasItem) {
        for (let i = 0; i < curiosShieldGeneratorItems.count; i++) {
            if (curiosShieldGeneratorItems.stacks[i].getDamageValue() == 0 && (!curiosShieldGeneratorItems.stacks[i].getNbt().getInt('mrqxShieldGeneratorCoolDown') || curiosShieldGeneratorItems.stacks[i].getNbt().getInt('mrqxShieldGeneratorCoolDown') == 0)) {
                mrqxShieldGeneratorBear(event, curiosShieldGeneratorItems.stacks[i])
            }
        }
    }
}