// priority: -1
// 最终还是选择了自己造轮子（趴
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingChangeTargetEvent', event => {
    if (event.originalTarget && !event.originalTarget.level.isClientSide() && event.originalTarget.isPlayer()) {
        global.mrqxLivingChangeTargetEvent(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added', event => {
    if (event.getEntity() && event.getEntity().getLevel() && !event.getEntity().getLevel().isClientSide() && event.getEntity().isPlayer()) {
        global.mrqxEffectAddedEvent(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
    if (event.source && event.source.player && !event.source.player.level.isClientSide()) {
        global.mrqxLivingHurtByPlayer(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', event => {
    if (event.entity && event.entity.isPlayer() && !event.entity.level.isClientSide()) {
        global.mrqxLivingDamageByOthers(event)
    }
})