//ban掉嬗变台
BlockEvents.rightClicked('alexsmobs:transmutation_table', event => {
    event.block.set('minecraft:air')
})
//扭曲开关
ItemEvents.rightClicked('luna_flesh_reforged:warp_switch',event => {
    let player = event.player
    let tof = player.persistentData.getBoolean('lunadisablewarphappen')
    if(tof){
        player.persistentData.putBoolean('lunadisablewarphappen',false)
        player.tell('已开启扭曲发生系统')
    }else{
        player.persistentData.putBoolean('lunadisablewarphappen',true)
        player.tell('已关闭扭曲发生系统')
    }
})
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
    if(Math.random()<0.2) return;
    if(warp<50){updateWarpCount(player, warp + 1)}
    else{
        if(Math.random()<0.5) return;
        if(warp>75){
            if(Math.random()<0.7) return;
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
})
//饰品栏玩家tick事件
const lunacuriosEquippedStrategies = {
    'luna_flesh_reforged:silverheart_charm': function (event, curios, slot, item) {
        if (!event.player || event.player.age % 80 != 0) {
            return
        }
        event.player.potionEffects.add('luna_flesh_reforged:warpward', 20 * 10, 0, false, false)
    },
}
var curiostick = Object.assign(curiosEquippedStrategies, lunacuriosEquippedStrategies);