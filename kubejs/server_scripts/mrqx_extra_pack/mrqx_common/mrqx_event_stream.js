// priority: 940

/**
 * 受伤前事件
 * @param {Internal.LivingHurtEvent} event
 */
global.mrqxLivingHurtByPlayer = event => {
    let data = new EntityHurtCustomModel()

    let curiosResidualBreathOfDeadSoulItems = mrqxGetCurioInfo(event.source.player, 'mrqx_extra_pack:residual_breath_of_dead_soul')
    if (curiosResidualBreathOfDeadSoulItems.hasItem) {
        for (let i = 0; i < curiosResidualBreathOfDeadSoulItems.count; i++) {
            if (curiosResidualBreathOfDeadSoulItems.stacks[i].getDamageValue() == 0) {
                mrqxResidualBreathOfDeadSoulDamage(event)
            }
        }
    }

    let curiosTimelessIvyItems = mrqxGetCurioInfo(event.source.player, 'mrqx_extra_pack:timeless_ivy')
    if (curiosTimelessIvyItems.hasItem) {
        for (let i = 0; i < curiosTimelessIvyItems.count; i++) {
            if (curiosTimelessIvyItems.stacks[i].getDamageValue() == 0) {
                mrqxTimelessIvyDamage(event)
            }
        }
    }

    if (event.source.player && event.source.player.getMainHandItem().id == 'mrqx_extra_pack:atomic_disassembler') {
        mrqxAtomicDisassemblerDamage(event)
    }

    if (event.getSource().getImmediate() && event.getSource().getImmediate().getType() == 'tetra:thrown_modular_item') {
        TetraEffect.getAllItemEffectResults(event.getSource().getImmediate().getThrownStack()).forEach(itemEffectRes => {
            if (mrqxTetraEffectPlayerThrownDamageStrategies[itemEffectRes.itemEffect.getKey()]) {
                mrqxTetraEffectPlayerThrownDamageStrategies[itemEffectRes.itemEffect.getKey()](event, itemEffectRes, data)
            }
        })
    }

    if (data.returnDamage != 0 && event.source.actual) {
        event.source.actual.attack(data.damageSource, data.returnDamage)
    }
}

/**
 * 掉血结算事件
 * @param {Internal.LivingDamageEvent} event
 */
global.mrqxLivingDamageByPlayer = event => {
    let curiosAdvancedArchivistEyeGlassItems = mrqxGetCurioInfo(event.source.player, 'mrqx_extra_pack:advanced_eyeglass')
    if (curiosAdvancedArchivistEyeGlassItems.hasItem && mrqxCheckAdvancedArchivistEyeGlass(curiosAdvancedArchivistEyeGlassItems.stacks[0])[10]) {
        mrqxAdvancedArchivistEyeGlassDamage(event)
    }

    if (event.source.player && mrqxIsMysteryQuestUnlocked(event.source.player) && !event.source.player.stages.has("mrqx_future_3") && event.amount > event.source.player.getAttributeTotalValue("minecraft:generic.attack_damage") * 1000) event.source.player.stages.add("mrqx_future_3")
}

/**
 * 玩家受到伤害
 * @param {Internal.LivingDamageEvent} event
 */
global.mrqxLivingDamageByOthers = event => {
    let data = new EntityHurtCustomModel()
    if (!highPriorityPlayerHurtByOthers(event, data)) {
        return
    }

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

    let curiosAdvancedArchivistEyeGlassItems = mrqxGetCurioInfo(event.entity, 'mrqx_extra_pack:advanced_eyeglass')
    if (curiosAdvancedArchivistEyeGlassItems.hasItem && mrqxCheckAdvancedArchivistEyeGlass(curiosAdvancedArchivistEyeGlassItems.stacks[0])[10]) {
        mrqxAdvancedArchivistEyeGlassBear(event)
    }

    let curiosRingFromGodItems = mrqxGetCurioInfo(event.entity, 'mrqx_extra_pack:ring_from_god')
    if (curiosRingFromGodItems.hasItem) {
        for (let i = 0; i < curiosRingFromGodItems.count; i++) {
            mrqxRingFromGodBear(event)
        }
    }

    getItemEffectsInBothHands(event.entity).forEach(itemEffectRes => {
        if (mrqxTetraEffectPlayerBearStrategies[itemEffectRes.itemEffect.getKey()]) {
            mrqxTetraEffectPlayerBearStrategies[itemEffectRes.itemEffect.getKey()](event, itemEffectRes, data)
        }
    })

    if (data.returnDamage != 0 && event.source.actual) {
        event.source.actual.attack(data.damageSource, data.returnDamage)
    }
}

/**
 * 生物死亡掉落
 * @param {Internal.LivingDropsEvent} event 
 */
global.mrqxLivingDrops = event => {
    if (event.entity.persistentData.getBoolean('mrqxLivingNoItemDrops')) {
        event.drops.clear()
        event.setCanceled(true)
    }
}

/**
 * 受伤前事件
 * @param {Internal.LivingHurtEvent} event
 */
global.mrqxLivingHurtByEntity = event => {
    /** @type {Internal.TamableAnimal} */
    let entity = event.getSource().getActual()
    if (!entity || !entity.isLiving()) return
    if (!(entity instanceof $mrqxTamableAnimal)) return
    /** @type {Internal.ServerPlayer} */
    let owner = entity.getOwner()
    if (!owner || !owner.isPlayer()) return


    let curiosTimewornPoetryStripsItems = mrqxGetCurioInfo(owner, 'mrqx_extra_pack:timeworn_poetry_strips')
    if (curiosTimewornPoetryStripsItems.hasItem) {
        for (let i = 0; i < curiosTimewornPoetryStripsItems.count; i++) {
            if (curiosTimewornPoetryStripsItems.stacks[i].getDamageValue() == 0) {
                mrqxTimewornPoetryStripsDamage(event, owner)
            }
        }
    }
}