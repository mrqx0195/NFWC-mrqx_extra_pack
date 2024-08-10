// priority: 9

/**
 * @param {Internal.ItemStack} itemFrom 
 * @param {Internal.SlotContext} ctx 
 * @param {Internal.ItemStack} itemTo 
 */
global.mrqxAdvancedArchivistEyeGlassOnEquip = (itemFrom, ctx, itemTo) => {
    if (!ctx.entity().isPlayer()) return
    mrqxAdvancedArchivistEyeGlassPaint(itemTo, ctx.entity())
}

/**
 * @param {Internal.ItemStack} itemFrom 
 * @param {Internal.SlotContext} ctx 
 * @param {Internal.ItemStack} itemTo 
 */
global.mrqxAdvancedArchivistEyeGlassOnUnequip = (itemFrom, ctx, itemTo) => {
    if (!ctx.entity().isPlayer()) return
    ctx.entity().paint({
        barBackGround: { visible: false },
        resourceBarOverlay: { visible: false },
        warpBarOverlay: { visible: false },
        resourceText: { visible: false },
        warpText: { visible: false },
        sweetDreamText: { visible: false },
        dragonPowerText: { visible: false },
        infinityBeatsText: { visible: false },
        burningHeartText: { visible: false },
        flaringHeartText: { visible: false },
        prisonSoulText: { visible: false },
        moonSoulText: { visible: false },
        marenolText: { visible: false },
        nuclearPowerText: { visible: false },
        nuclearPowerGenerText: { visible: false },
        elementSelfText: { visible: false },
        elementTargetText: { visible: false },
    })
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxAdvancedArchivistEyeGlassTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || player.level.isClientSide()) return
    // if (player.age % 20 != 0) return
    if (!player.isPlayer()) return
    mrqxAdvancedArchivistEyeGlassPaint(item, player)
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.ServerPlayer} player
 */
function mrqxAdvancedArchivistEyeGlassPaint(item, player) {
    if (!player.persistentData.contains(resourceCount)) {
        player.persistentData.putInt(resourceCount, 0)
    }
    if (!player.persistentData.contains(resourceCountMax)) {
        player.persistentData.putInt(resourceCountMax, defaultResourceMax)
    }
    if (!player.persistentData.contains(warpCount)) {
        player.persistentData.putInt(warpCount, 0)
    }
    if (!player.persistentData.contains(warpCountMax)) {
        player.persistentData.putInt(warpCountMax, defaultWarpMax)
    }
    let playerResourceCount = player.persistentData.getInt(resourceCount)
    let playerResourceCountMax = player.persistentData.getInt(resourceCountMax)
    let playerWarpCount = player.persistentData.getInt(warpCount)
    let playerWarpCountMax = player.persistentData.getInt(warpCountMax)
    if (playerResourceCount > playerResourceCountMax) {
        playerResourceCount = playerResourceCountMax
        player.persistentData.putInt(resourceCount, playerResourceCount)
    }
    if (playerWarpCount > playerWarpCountMax) {
        playerWarpCount = playerWarpCountMax
        player.persistentData.putInt(resourceCount, playerWarpCount)
    }
    let resourcePercent = playerResourceCount / playerResourceCountMax
    let warpPercent = playerWarpCount / playerWarpCountMax
    let visible = false
    if (checkCurios(player, 'mrqx_extra_pack:advanced_eyeglass')) {
        visible = true
    }
    let visibleList = mrqxCheckAdvancedArchivistEyeGlass(item)
    let count = 0
    let allCount = 0
    for (let i = 0; i < visibleList.length; i++) {
        allCount += visibleList[i] ? 1 : 0
    }
    allCount = -allCount * 4.5 + 35
    let ray = player.rayTrace(10, false)
    let target = null
    if (ray.entity && ray.entity.isAlive() && !ray.entity.isPlayer()) {
        target = ray.entity
    }
    player.paint({
        barBackGround: {
            type: 'rectangle',
            x: 11,
            y: `-$screenH/2+${allCount}`,
            w: 22,
            h: 101,
            alignX: 'left',
            alignY: 'bottom',
            texture: 'kubejs:textures/gui/resource_bar.png',
            visible: visible
        },
        resourceBarOverlay: {
            type: 'rectangle',
            x: 11,
            y: `-$screenH/2+${allCount}`,
            v0: 1 - resourcePercent,
            v1: 1,
            w: 11,
            h: 101 * resourcePercent,
            alignX: 'left',
            alignY: 'bottom',
            texture: 'kubejs:textures/gui/resource_bar_overlay.png',
            visible: visible
        },
        warpBarOverlay: {
            type: 'rectangle',
            x: 22,
            y: `-$screenH/2+${allCount}`,
            v0: 1 - warpPercent,
            v1: 1,
            w: 11,
            h: 101 * warpPercent,
            alignX: 'left',
            alignY: 'bottom',
            texture: 'kubejs:textures/gui/warp_bar_overlay.png',
            visible: visible
        },
        resourceText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 20}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.GOLD.getHexJS(),
            text: `${'资源值：'}${playerResourceCount} / ${playerResourceCountMax}`,
            visible: visible
        },
        warpText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.DARK_PURPLE.getHexJS(),
            text: `${'扭曲值：'}${playerWarpCount} / ${playerWarpCountMax}`,
            visible: visible
        },
        sweetDreamText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[0]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.PINK_DYE.getHexJS(),
            text: `${'甜蜜之梦：'}${player.hasEffect('kubejs:sweet_dream') ? `${'等级：'}${player.getEffect('kubejs:sweet_dream').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('kubejs:sweet_dream').getDuration() / 20).toFixed(2)}s` : '未持有'}`,
            visible: visibleList[0]
        },
        dragonPowerText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[1]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.RED.getHexJS(),
            text: `${'龙化：'}${player.hasEffect('kubejs:dragon_power') ? `${'等级：'}${player.getEffect('kubejs:dragon_power').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('kubejs:dragon_power').getDuration() / 20).toFixed(2)}s${'减伤：'}${Math.min((player.getEffect('kubejs:dragon_power').getAmplifier() + 1) * 0.2, 1) * 100}%` : '未持有'}`,
            visible: visibleList[1]
        },
        infinityBeatsText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[2]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.DARK_AQUA.getHexJS(),
            text: `${'无尽节律：'}${'伤害加成：'}+${getPlayerAttributeMap(player).get(global.TEMP_ATTACK_UP.name) ?? 0}`,
            visible: visibleList[2]
        },
        burningHeartText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[3]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.ORANGE_DYE.getHexJS(),
            text: `${'熔火：'}${player.hasEffect('kubejs:burning_heart') ? `${'等级：'}${player.getEffect('kubejs:burning_heart').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('kubejs:burning_heart').getDuration() / 20).toFixed(2)}s | ${'伤害加成：'}+${player.getEffect('kubejs:burning_heart').getAmplifier() * 4 + 4}` : '未持有'}`,
            visible: visibleList[3]
        },
        flaringHeartText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[3]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.RED_DYE.getHexJS(),
            text: `${'心火：'}${player.hasEffect('kubejs:flaring_heart') ? `${'等级：'}${player.getEffect('kubejs:flaring_heart').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('kubejs:flaring_heart').getDuration() / 20).toFixed(2)}s | ${'伤害加成：'}×${(player.getEffect('kubejs:flaring_heart').getDuration() < 100) ? (player.getEffect('kubejs:flaring_heart').getAmplifier() * 1.0 + 1.5) : 1}` : '未持有'
                }`,
            visible: visibleList[3]
        },
        prisonSoulText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[4]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.DARK_RED.getHexJS(),
            text: `${'死狱之魂：'}${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:prison_soul') ? `${'伤害加成：'}+${(Math.sqrt(player.persistentData.getInt('mrqx_kill_count') ?? 0) * 0.1).toFixed(2)}` : '未持有'}`,
            visible: visibleList[4]
        },
        moonSoulText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[5]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.GREEN_DYE.getHexJS(),
            text: `${'山月之魂：'}${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:moon_soul') ? `${'伤害加成：'}×${Math.min(Math.max((player.persistentData.getInt('mrqx_moon_soul_combo') ?? 0) / 10, 1), 10) * 100}%` : '未持有'}`,
            visible: visibleList[4]
        },
        marenolText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[6]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.BLACK_DYE.getHexJS(),
            text: `${'噩梦醇：'}${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:marenol') ? `${'伤害加成：'}×${(1 + mrqxGetMarenolCount(player) * 0.1) * 100}%` : '未持有'}`,
            visible: visibleList[6]
        },
        nuclearPowerText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[7]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.YELLOW_DYE.getHexJS(),
            text: `${'核能动力：'}${player.hasEffect('mrqx_extra_pack:nuclear_power') ? `${'等级：'}${player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('mrqx_extra_pack:nuclear_power').getDuration() / 20).toFixed(2)} s | ${'伤害加成：'} +${(player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1) * 0.4 * 100}% ` : '未持有'}`,
            visible: visibleList[7]
        },
        nuclearPowerGenerText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[7]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.YELLOW_DYE.getHexJS(),
            text: `${'核能发电：'}${player.hasEffect('mrqx_extra_pack:nuclear_power_generation') ? `${'等级：'}${player.getEffect('mrqx_extra_pack:nuclear_power_generation').getAmplifier() + 1} | ${'剩余时长：'}${(player.getEffect('mrqx_extra_pack:nuclear_power_generation').getDuration() / 20).toFixed(2)} s | ${'剩余可提供资源点数：'}${player.getEffect('mrqx_extra_pack:nuclear_power_generation').getAmplifier() * player.getEffect('mrqx_extra_pack:nuclear_power_generation').getDuration() / 20} ` : '未持有'}`,
            visible: visibleList[7]
        },
        elementSelfText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[8]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            text: `${'末影损伤：'}${player.getPersistentData().getInt("mrqx_ender_damage") ?? 0} / 100 | ${'灼燃损伤：'}${player.getPersistentData().getInt("mrqx_fire_damage") ?? 0} / 100 | ${'冻结损伤：'}${player.getPersistentData().getInt("mrqx_ice_damage") ?? 0} / 100 | ${'雷霆损伤：'}${player.getPersistentData().getInt("mrqx_lighting_damage") ?? 0} / 100 | ${'凋亡损伤：'}${player.getPersistentData().getInt("mrqx_wither_damage") ?? 0} / 100`,
            visible: visibleList[8]
        },
        elementTargetText: {
            type: 'text',
            shadow: true,
            x: 0,
            y: `-$screenH/2+30`,
            scale: 1,
            alignX: 'center',
            alignY: 'bottom',
            text: `${target ? `${'末影损伤：'}${target.getPersistentData().getInt("mrqx_ender_damage") ?? 0} / 100 | ${'灼燃损伤：'}${target.getPersistentData().getInt("mrqx_fire_damage") ?? 0} / 100 | ${'冻结损伤：'}${target.getPersistentData().getInt("mrqx_ice_damage") ?? 0} / 100 | ${'雷霆损伤：'}${target.getPersistentData().getInt("mrqx_lighting_damage") ?? 0} / 100 | ${'凋亡损伤：'}${target.getPersistentData().getInt("mrqx_wither_damage") ?? 0} / 100` : ''}`,
            visible: visibleList[8]
        }
    })
}