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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.1", "with": [${playerResourceCount},${playerResourceCountMax}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.2", "with": [${playerWarpCount},${playerWarpCountMax}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.3", "with": [${player.hasEffect('kubejs:sweet_dream') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('kubejs:sweet_dream').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('kubejs:sweet_dream').getDuration() / 20).toFixed(2)}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.4", "with": [${player.hasEffect('kubejs:dragon_power') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('kubejs:dragon_power').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('kubejs:dragon_power').getDuration() / 20).toFixed(2)}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.5", "with": [${getPlayerChestCavityItemMap(player).has('kubejs:infinity_beats') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${getPlayerAttributeMap(player).get(global.TEMP_ATTACK_UP.name) ?? 0}]}` : `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.60", "with": [${player.hasEffect('kubejs:burning_heart') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('kubejs:burning_heart').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('kubejs:burning_heart').getDuration() / 20).toFixed(2)}]} ,{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${player.getEffect('kubejs:burning_heart').getAmplifier() * 4 + 4}]}` : `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.61", "with": [${player.hasEffect('kubejs:flaring_heart') ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01" , "with": [${player.getEffect('kubejs:flaring_heart').getAmplifier() + 1}]}, { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('kubejs:flaring_heart').getDuration() / 20).toFixed(2)}]}, { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03" , "with": ["×", ${(player.getEffect('kubejs:flaring_heart').getDuration() < 100) ? (player.getEffect('kubejs:flaring_heart').getAmplifier() * 1.0 + 1.5) : 1}]}` : `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.7", "with": [${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:prison_soul') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${(Math.sqrt(player.persistentData.getInt('mrqx_kill_count') ?? 0) * 0.1).toFixed(2)}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.8", "with": [${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:moon_soul') ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["×", ${Math.min(Math.max((player.persistentData.getInt('mrqx_moon_soul_combo') ?? 0) / 10, 1), 10) * 100}]}, "%"` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.9", "with": [${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:marenol') ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["×", ${(1 + mrqxGetMarenolCount(player) * 0.1) * 100}]}, "%"` : `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.a0", "with": [${player.hasEffect('mrqx_extra_pack:nuclear_power') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01" , "with": [${player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('mrqx_extra_pack:nuclear_power').getDuration() / 20).toFixed(2)}]}, " | ", { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${(player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1) * 0.4 * 100}, "%" ]}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.a1" , "with": [${player.hasEffect('mrqx_extra_pack:nuclear_power_generation') ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('mrqx_extra_pack:nuclear_power_generation').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('mrqx_extra_pack:nuclear_power_generation').getDuration() / 20).toFixed(2)}]}, " | ", { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.05", "with": [${player.getEffect('mrqx_extra_pack:nuclear_power_generation').getAmplifier() * player.getEffect('mrqx_extra_pack:nuclear_power_generation').getDuration() / 20}]} ` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.c1" , "with": [
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ender_damage")) || !mrqxIsEmpty(player.getPersistentData().getInt("mrqx_fire_damage")) || !mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ice_damage")) || !mrqxIsEmpty(player.getPersistentData().getInt("mrqx_lighting_damage")) || !mrqxIsEmpty(player.getPersistentData().getInt("mrqx_wither_damage")) ? `
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ender_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b0" , "with": [${Text.lightPurple(player.getPersistentData().getInt("mrqx_ender_damage") ?? 0).getString()}]}` : `""`}, 
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_fire_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b1" , "with": [${Text.lightPurple(player.getPersistentData().getInt("mrqx_fire_damage") ?? 0).getString()}]}` : `""`},
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ice_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b2" , "with": [${Text.lightPurple(player.getPersistentData().getInt("mrqx_ice_damage") ?? 0).getString()}]}` : `""`},
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_lighting_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b3" , "with": [${Text.lightPurple(player.getPersistentData().getInt("mrqx_lighting_damage") ?? 0).getString()}]}` : `""`},
            ${!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_wither_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b4" , "with": [${Text.lightPurple(player.getPersistentData().getInt("mrqx_wither_damage") ?? 0).getString()}]}` : `""`}
            `: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.d"}`}
            ]}`,
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
            text: `${target ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.c1" , "with": [
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ender_damage")) || !mrqxIsEmpty(target.getPersistentData().getInt("mrqx_fire_damage")) || !mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ice_damage")) || !mrqxIsEmpty(target.getPersistentData().getInt("mrqx_lighting_damage")) || !mrqxIsEmpty(target.getPersistentData().getInt("mrqx_wither_damage")) ? `
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ender_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b0" , "with": [${Text.lightPurple(target.getPersistentData().getInt("mrqx_ender_damage") ?? 0).getString()}]}` : `""`}, 
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_fire_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b1" , "with": [${Text.lightPurple(target.getPersistentData().getInt("mrqx_fire_damage") ?? 0).getString()}]}` : `""`},
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ice_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b2" , "with": [${Text.lightPurple(target.getPersistentData().getInt("mrqx_ice_damage") ?? 0).getString()}]}` : `""`},
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_lighting_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b3" , "with": [${Text.lightPurple(target.getPersistentData().getInt("mrqx_lighting_damage") ?? 0).getString()}]}` : `""`},
                ${!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_wither_damage")) ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b4" , "with": [${Text.lightPurple(target.getPersistentData().getInt("mrqx_wither_damage") ?? 0).getString()}]}` : `""`}
                `: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.d"}`}
                ]}` : ''}`,
            visible: visibleList[8]
        }
    })
}