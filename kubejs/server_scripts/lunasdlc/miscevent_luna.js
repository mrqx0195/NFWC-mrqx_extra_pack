//吃僵尸之脑
ItemEvents.foodEaten('luna_flesh_reforged:zombie_brain', event => {
    let player = event.player
    let warp = player.persistentData.getInt(warpCount) ?? 0
    let maxWarp = player.persistentData.getInt(warpCountMax) ?? defaultWarpMax
    if(player.hasEffect('luna_flesh_reforged:unnatural_hunger')){
        let unhunger = player.getEffect('luna_flesh_reforged:unnatural_hunger')
        let time = unhunger.getDuration()
        let lvl = unhunger.getAmplifier()
        player.removeEffect('luna_flesh_reforged:unnatural_hunger')
        if(time > 30*20 && lvl > 0){
            time = time - 600
			lvl = lvl - 1
            player.potionEffects.add('luna_flesh_reforged:unnatural_hunger', time , lvl , false, false)
        }
    }
    if(Math.random()>0.8) return;
    if(warp<50){updateWarpCount(player, warp + 1)}
    else{
        if(Math.random()>0.6) return;
        if(warp>75){
            if(Math.random()>0.5) return;
        }
        updateWarpCount(player, warp + 1)
    }
})
//神智检测仪
ItemEvents.rightClicked('luna_flesh_reforged:sanity_checker',event => {
    let player = event.player
    let warp = player.persistentData.getInt(warpCount) ?? 0
    let maxWarp = player.persistentData.getInt(warpCountMax) ?? defaultWarpMax
    let perwarp = (warp / maxWarp)*100
    player.tell([Text.gray({ "translate": "luna_flesh_reforged.tooltips.sanity_checker.0" }), Text.red(warp), Text.yellow('/'), Text.red(maxWarp), Text.gray('('), Text.gray(perwarp), Text.gray('%)')])
    player.addItemCooldown('luna_flesh_reforged:sanity_checker', 20 * 30)
})
//生物死亡
EntityEvents.death(event => {
    let player = event.source.player
    if (!event.source.player) { return }
    //器官
    let itemMap = getPlayerChestCavityItemMap(player)
    //感染畸变胃
    if(itemMap.has('luna_flesh_reforged:infested_heart_distortion') && itemMap.has('luna_flesh_reforged:infested_stomach_distortion')){
        let typeMap = getPlayerChestCavityTypeMap(event.source.player);
            if (typeMap.has('kubejs:infected')) {
                let infestation = typeMap.get('kubejs:infected').length
                let healthat = event.entity.getMaxHealth()
                let lvl = Math.max((healthat/5)/(28-infestation),3)
                player.potionEffects.add('minecraft:saturation', 1 , lvl)
            }
    }
    //光辉收割者
    if(itemMap.has('luna_flesh_reforged:infested_heart_distortion')){
        if(event.entity.hasEffect('luna_flesh_reforged:harvest_markers')){
            let lvl = event.entity.potionEffects.getActive('luna_flesh_reforged:harvest_markers').getAmplifier()
            if(Math.random()<0.4){player.heal(Math.min(lvl,3))}
        }
    }
})

//饰品全局效果注册

/**
 * @param {Internal.ItemStack} itemFrom 
 * @param {Internal.SlotContext} ctx 
 * @param {Internal.ItemStack} itemTo 
 */
global.silverHeartCharmOnEquip = (itemFrom, ctx, itemTo) => {
    let entity = ctx.entity()
    entity.potionEffects.add('luna_flesh_reforged:warpward', 20 * 10, 0, false, false)
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.silverHeartCharmTick = (item, ctx) => {
    let entity = ctx.entity()
    if (entity.level.isClientSide()) return
    if (entity.age % 80 != 0) return
    entity.potionEffects.add('luna_flesh_reforged:warpward', 20 * 10, 0, false, false)
}

const $EldritchBlast = Java.loadClass("io.redspace.ironsspellbooks.entity.spells.eldritch_blast.EldritchBlastVisualEntity")
//虚空震击
/**
 * @param {Internal.CustomSpell$CastContext} ctx 
 * @returns 
 */
global.EldritchVoidShock = (ctx) => {
    /** @type {Internal.ServerPlayer} */
    let player = ctx.entity
    let spellLevel = ctx.getSpellLevel()
    let warp = player.persistentData.getInt(warpCount) ?? 0
    let powerModifier = player.getAttributeValue('irons_spellbooks:spell_power')
    let eldritchpowerModifier = player.getAttributeValue('irons_spellbooks:eldritch_spell_power')
    let magicData = getPlayerMagicData(player)
    let manaCost = magicData.getMana()
    let amplifier = Math.max(Math.cbrt(manaCost), 3)
    let damage = warp/4 + amplifier
    if(spellLevel<=5){damage = damage + spellLevel*0.5 + 2.5
    }else{damage = damage + 5 + (spellLevel-5) * Math.max(1,warp/32) }
    damage = damage * (1 + powerModifier)* (1 + eldritchpowerModifier)
    let itemMap = getPlayerChestCavityItemMap(player)

    // 限制数量上限，避免性能问题
    let count = Math.min(13, 3 + spellLevel * 2)
    let degreesPer = 360 / count
    let damageSource = new DamageSource.sonicBoom(player)

    // 根据法术等级，产生新的释放环，限制上下限
    let castTimes = Math.min(Math.max(Math.ceil(spellLevel / 5), 1), 5)
    for (let j = 1; j < castTimes + 1; j++) {
        for (let i = 0; i < count; i++) {
            let rotation = degreesPer * i - (degreesPer / 2)
            let startpos = new Vec3(0, j, 0).zRot(rotation * JavaMath.PI / 180).xRot(-player.xRot * JavaMath.PI / 180).yRot(-player.yRot * JavaMath.PI / 180)
            let endpos = player.getLookAngle().normalize().scale(32).add(player.getEyePosition())
            let eldritchblast = new $EldritchBlast(player.level,startpos,endpos,player)
            for (let i = 0; i < 33; i++) {
                let vec3 = player.getLookAngle().normalize().scale(i).add(player.getEyePosition())
                let entityInRadius = getLivingWithinRadius(player.level, vec3, 3)
                if (i % 3 == 0) {
                    entityInRadius.forEach(e => {
                        if (e != player) {
                            e.attack(damageSource , damage )
                            e.invulnerableTime = 0
                            if(itemMap.has('luna_flesh_reforged:archotech_abyssal_core')){
                                e.invulnerableTime = 0
                                e.causeFallDamage(4,damage/2, DamageSource.indirectMagic(e,player))
                            }
                        }
                    })
                }
            }
            if (i % 2 != 0){
                let spawn = player.getEyePosition().add(new Vec3(0, j, 0).zRot(rotation * JavaMath.PI / 180).xRot(-player.xRot * JavaMath.PI / 180).yRot(-player.yRot * JavaMath.PI / 180))
                eldritchblast.moveTo(spawn)
                player.level.addFreshEntity(eldritchblast)
	    }
        }
    }
}
