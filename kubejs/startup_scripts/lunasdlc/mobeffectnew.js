
StartupEvents.registry('mob_effect', event => {
    event.create('luna_flesh_reforged:lunatouch_attack')
        .beneficial()
        .modifyAttribute('forge:attack_range', 'kubejsAttackRange', 2, "addition")
        .color(Color.DARK_RED)

    event.create('luna_flesh_reforged:warpward')
        .beneficial()
        .color(Color.GOLD)

    event.create('luna_flesh_reforged:unnatural_hunger')
        .harmful()
        .color(Color.BLACK)
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()||!entity.isPlayer()) return
            let player = entity
            let foodData = player.getFoodData()
            foodData.addExhaustion((lvl+1)/5)
        })

    event.create('luna_flesh_reforged:deathgaze')
        .harmful()
        .color(Color.BLACK)
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()||!entity.isPlayer()) return
            let player = entity
            let ray = player.rayTrace(11, true)
            let damageSource = new DamageSource.sonicBoom(player)
            if (ray.entity && ray.entity.isLiving()) {
                ray.entity.attack(damageSource, 0)
                if(!ray.entity.hasEffect('minecraft:wither')){
                    ray.entity.potionEffects.add('minecraft:wither', 25, lvl, false, false)
                }else{
                    if(ray.entity.age % 20 != 0){
                        let duration = ray.entity.potionEffects.getDuration('minecraft:wither')
                        ray.entity.potionEffects.add('minecraft:wither', Math.min(duration+20,1200), lvl, false, false)
                    }
                }
            }
        })

})
//扭曲效果治愈物品
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added',event =>{
    const { entity , effectInstance } = event
    if(!entity.isPlayer()) return;
    if (effectInstance.effect.descriptionId != 'effect.luna_flesh_reforged.unnatural_hunger' 
    && effectInstance.effect.descriptionId != 'effect.luna_flesh_reforged.deathgaze') return;
    effectInstance.setCurativeItems([])
})