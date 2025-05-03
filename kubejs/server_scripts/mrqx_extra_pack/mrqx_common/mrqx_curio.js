// priority: 750

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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.4", "with": [${player.hasEffect('kubejs:dragon_power') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('kubejs:dragon_power').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('kubejs:dragon_power').getDuration() / 20).toFixed(2)}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.04", "with": [${((player.getEffect('kubejs:dragon_power').getAmplifier() + 1) * 20)}, "%"]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.7", "with": [${(getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:prison_soul') && mrqxCheckOrganSuit(player, 'four_soul', 'isAll')) ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${(Math.sqrt(player.persistentData.getInt('mrqx_kill_count') ?? 0) * 0.1).toFixed(2)}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
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
            visible: visibleList[5]
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
            text: `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.9", "with": [${getPlayerChestCavityItemMap(player).has('mrqx_extra_pack:marenol') ? `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["×", ${(1 + mrqxGetMarenolCount(player) * 0.1) * getPlayerChestCavityItemMap(player).get('mrqx_extra_pack:marenol').length}]}, "%"` : `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
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
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.a", "with": [${player.hasEffect('mrqx_extra_pack:nuclear_power') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01" , "with": [${player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('mrqx_extra_pack:nuclear_power').getDuration() / 20).toFixed(2)}]}, { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.03", "with": ["+", ${(player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() + 1) * 0.4 * 100}, "%" ]}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
            visible: visibleList[7]
        },
        steamPowerText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[9]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.GRAY_DYE.getHexJS(),
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.d0", "with": [${player.hasEffect('mrqx_extra_pack:steam_power') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01" , "with": [${player.getEffect('mrqx_extra_pack:steam_power').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('mrqx_extra_pack:steam_power').getDuration() / 20).toFixed(2)}]}, { "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.d1", "with": [${mrqxGetSteamCount(player)}]}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00"}`}]}`,
            visible: visibleList[9]
        },
        steamSuperChargeText: {
            type: 'text',
            shadow: true,
            x: 11,
            y: `-$screenH/2+${allCount + 30 + (count += visibleList[9]) * 10}`,
            scale: 1,
            alignX: 'left',
            alignY: 'bottom',
            color: Color.GRAY.getHexJS(),
            text: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.e", "with": [${player.hasEffect('mrqx_extra_pack:steam_supercharge') ? `{"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.01", "with": [${player.getEffect('mrqx_extra_pack:steam_supercharge').getAmplifier() + 1}]}, {"translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.02", "with": [${(player.getEffect('mrqx_extra_pack:steam_supercharge').getDuration() / 20).toFixed(2)}]}` : `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.00" }`}]}`,
            visible: visibleList[9]
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
                ${(!(
                    mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ender_damage")) ||
                    mrqxIsEmpty(player.getPersistentData().getInt("mrqx_fire_damage")) ||
                    mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ice_damage")) ||
                    mrqxIsEmpty(player.getPersistentData().getInt("mrqx_lighting_damage")) ||
                    mrqxIsEmpty(player.getPersistentData().getInt("mrqx_wither_damage"))
                ) && (
                        player.getPersistentData().getInt("mrqx_ender_damage") != 0 ||
                        player.getPersistentData().getInt("mrqx_fire_damage") != 0 ||
                        player.getPersistentData().getInt("mrqx_ice_damage") != 0 ||
                        player.getPersistentData().getInt("mrqx_lighting_damage") != 0 ||
                        player.getPersistentData().getInt("mrqx_wither_damage") != 0
                    )) ? `
                ${(!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ender_damage")) && player.getPersistentData().getInt("mrqx_ender_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b0" , "with": [${Text.white(player.getPersistentData().getInt("mrqx_ender_damage") ?? 0).getString()}]}` : `""`}, 
                ${(!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_fire_damage")) && player.getPersistentData().getInt("mrqx_fire_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b1" , "with": [${Text.white(player.getPersistentData().getInt("mrqx_fire_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_ice_damage")) && player.getPersistentData().getInt("mrqx_ice_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b2" , "with": [${Text.white(player.getPersistentData().getInt("mrqx_ice_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_lighting_damage")) && player.getPersistentData().getInt("mrqx_lighting_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b3" , "with": [${Text.white(player.getPersistentData().getInt("mrqx_lighting_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(player.getPersistentData().getInt("mrqx_wither_damage")) && player.getPersistentData().getInt("mrqx_wither_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b4" , "with": [${Text.white(player.getPersistentData().getInt("mrqx_wither_damage") ?? 0).getString()}]}` : `""`}
                `: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.c0"}`}
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
                ${(!(
                    mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ender_damage")) ||
                    mrqxIsEmpty(target.getPersistentData().getInt("mrqx_fire_damage")) ||
                    mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ice_damage")) ||
                    mrqxIsEmpty(target.getPersistentData().getInt("mrqx_lighting_damage")) ||
                    mrqxIsEmpty(target.getPersistentData().getInt("mrqx_wither_damage"))
                ) && (
                        target.getPersistentData().getInt("mrqx_ender_damage") != 0 ||
                        target.getPersistentData().getInt("mrqx_fire_damage") != 0 ||
                        target.getPersistentData().getInt("mrqx_ice_damage") != 0 ||
                        target.getPersistentData().getInt("mrqx_lighting_damage") != 0 ||
                        target.getPersistentData().getInt("mrqx_wither_damage") != 0
                    )) ? `
                ${(!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ender_damage")) && target.getPersistentData().getInt("mrqx_ender_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b0" , "with": [${Text.white(target.getPersistentData().getInt("mrqx_ender_damage") ?? 0).getString()}]}` : `""`}, 
                ${(!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_fire_damage")) && target.getPersistentData().getInt("mrqx_fire_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b1" , "with": [${Text.white(target.getPersistentData().getInt("mrqx_fire_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_ice_damage")) && target.getPersistentData().getInt("mrqx_ice_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b2" , "with": [${Text.white(target.getPersistentData().getInt("mrqx_ice_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_lighting_damage")) && target.getPersistentData().getInt("mrqx_lighting_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b3" , "with": [${Text.white(target.getPersistentData().getInt("mrqx_lighting_damage") ?? 0).getString()}]}` : `""`},
                ${(!mrqxIsEmpty(target.getPersistentData().getInt("mrqx_wither_damage")) && target.getPersistentData().getInt("mrqx_wither_damage")) ?
                    `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.b4" , "with": [${Text.white(target.getPersistentData().getInt("mrqx_wither_damage") ?? 0).getString()}]}` : `""`}
                `: `{ "translate": "mrqx_extra_pack.text.advancedArchivistEyeGlass.c0"}`}
                ]}` : ''}`,
            visible: visibleList[8]
        }
    })
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxResidualBreathOfDeadSoulTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || player.level.isClientSide()) return
    if (item.getDamageValue() > 0) {
        item.setDamageValue(item.getDamageValue() - 1)
        return
    }
    if (!player.isPlayer()) return
    let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16)
    if (entityList.length == 0) return
    /**@type {Internal.LivingEntity} */
    let entity = randomGet(entityList)
    if (!entity.isLiving() || entity.isPlayer() || !entity.isMonster()) return
    item.setDamageValue(Math.floor(Math.random() * 5 * 20))
    mrqxLinePos(player.x, player.y + 1, player.z, entity.x, entity.y + 1, entity.z, 0.4).forEach((pos) => {
        /**@type {Special.ParticleType} */
        let particles = 'goety:redstone_explode'
        player.level.spawnParticles(particles, true, pos.x(), pos.y(), pos.z(), entity.x - player.x, entity.y - player.y, entity.z - player.z, 0, 10)
    })
    entity.invulnerableTime = 0
    entity.attack(DamageSource.indirectMagic(player, player), 7)
    entity.invulnerableTime = 0
    let amplifier = 0
    if (entity.hasEffect('mrqx_extra_pack:ghost_of_dead_soul')) amplifier += entity.getEffect('mrqx_extra_pack:ghost_of_dead_soul').getAmplifier() + 1
    entity.removeEffect('mrqx_extra_pack:ghost_of_dead_soul')
    entity.potionEffects.add('mrqx_extra_pack:ghost_of_dead_soul', 20 * 60 * 60, amplifier, false, false)
    entity.potionEffects.add('minecraft:slowness', 10, 5, false, false)
}

/**
 * @param {Internal.LivingHurtEvent} event
 */
function mrqxResidualBreathOfDeadSoulDamage(event) {
    if (Math.random() > 0.3) return
    let entity = event.entity
    let player = event.source.player
    if (!entity.hasEffect('mrqx_extra_pack:ghost_of_dead_soul')) return
    let effect = entity.getEffect('mrqx_extra_pack:ghost_of_dead_soul')
    let amplifier = effect.getAmplifier()
    entity.removeEffect('mrqx_extra_pack:ghost_of_dead_soul')
    if (mrqxGetCurioInfo(player, 'mrqx_extra_pack:residual_breath_of_dead_soul').count >= 3) {
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(entity.x, entity.y, entity.z), 8)
        entity.level.spawnParticles('minecraft:explosion', true, entity.x, entity.y + 1, entity.z, 1.3, 1.3, 1.3, 20, 1)
        entityList.forEach(e => {
            if (mrqxCheckTarget(e, player)) {
                e.invulnerableTime = 0
                e.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 5)
                e.invulnerableTime = 0
                e.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 5)
                e.invulnerableTime = 0
            }
        })
    }
    else {
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(entity.x, entity.y, entity.z), 3)
        entity.level.spawnParticles('minecraft:explosion', true, entity.x, entity.y + 1, entity.z, 0.5, 0.5, 0.5, 10, 1)
        entityList.forEach(e => {
            if (mrqxCheckTarget(e, player)) {
                e.invulnerableTime = 0
                e.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier)
                e.invulnerableTime = 0
            }
        })
    }
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxShieldGeneratorTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || player.level.isClientSide()) return
    if (item.getNbt().getInt('mrqxShieldGeneratorCoolDown') > 0) {
        item.getNbt().putInt('mrqxShieldGeneratorCoolDown', item.getNbt().getInt('mrqxShieldGeneratorCoolDown') - 1)
        return
    }
    if (item.getDamageValue() > 0) {
        let playerResourceCount = player.persistentData.getInt(resourceCount) ?? 0
        if (playerResourceCount > 0) {
            let count = Math.min(playerResourceCount, item.getDamageValue())
            item.setDamageValue(item.getDamageValue() - count)
            updateResourceCount(player, playerResourceCount - count)
        }
    }
}

/**
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} item
 */
function mrqxShieldGeneratorBear(event, item) {
    let player = event.entity
    if (!player || player.level.isClientSide()) return
    if (event.amount == 0) return
    let damage = Math.min(event.amount, item.getMaxDamage() - item.getDamageValue())
    event.amount -= damage
    if ((item.getMaxDamage() - damage) <= 0) {
        item.setDamageValue(item.getMaxDamage())
        event.amount = 0
        item.getNbt().putInt('mrqxShieldGeneratorCoolDown', 200)
        player.potionEffects.map.forEach((effect, instance) => {
            if (effect.getCategory().name() == 'BENEFICIAL') {
                let amplifier = instance.getAmplifier()
                let duration = instance.getDuration()
                let effect = instance.getEffect()
                if (player.hasEffect(effect)) {
                    amplifier += player.getEffect(effect).getAmplifier() + 1
                    duration += player.getEffect(effect).getDuration()
                }
                player.removeEffect(effect)
                player.potionEffects.add(effect, duration, amplifier, false, false)
            }
        })
    }
    else {
        item.setDamageValue(item.getDamageValue() + damage)
    }
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxInfinityForceContainerTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || !player.isPlayer() || player.level.isClientSide()) return
    let inventory = player.inventory
    let forces = inventory.getAllItems().filter(item => (item.id == 'kubejs:infinity_force'))
    if (!item.getNbt()) item.setNbt({})
    let countList = item.nbt.getCompound('mrqxInfinityForceContainerCountList') ?? mrqxGetEmptyCompound()
    if (forces.length != 0) {
        if (item.nbt.getLong('mrqxInfinityForceContainerCount') && item.nbt.getLong('mrqxInfinityForceContainerCount') > 0) {
            let count = item.nbt.getLong('mrqxInfinityForceContainerCount')
            while (count > 0) {
                let power = 0
                while (Math.pow(2, power + 1) <= count) {
                    power++
                }
                count -= 2 ** power
                countList.putByte(power.toFixed(1), countList.getByte(power.toFixed(1)) ?? 0 + 1)
                countList.putInt('max', Math.max(countList.getInt('max') ?? 0, power))
            }
            item.nbt.putLong('mrqxInfinityForceContainerCount', 0)
        }
        forces.forEach(force => {
            if (force.getNbt() && force.nbt?.forgeTimes) {
                countList.putByte(force.nbt?.forgeTimes.toFixed(1), Math.min((countList.getByte(force.nbt?.forgeTimes.toFixed(1)) ?? 0) + 1))
                countList.putInt('max', Math.max(countList.getInt('max') ?? 0, force.nbt?.forgeTimes.toFixed(1)))
            }
            else {
                countList.putByte((0).toFixed(1), Math.min((countList.getByte((0).toFixed(1)) ?? 0) + 1, 127))
                countList.putInt('max', Math.max(countList.getInt('max') ?? 0, 0))
            }
            force.shrink(1)
        })
    }
    let i = 0
    while (i <= (countList.getInt('max') ?? 0) + 1) {
        if ((countList.getByte(i.toFixed(1)) ?? 0) >= 2) {
            countList.putByte((i + 1).toFixed(1), (countList.getByte((i + 1).toFixed(1)) ?? 0) + 1)
            countList.putByte(i.toFixed(1), countList.getByte(i.toFixed(1)) - 2)
            countList.putInt('max', Math.max(countList.getInt('max') ?? 0, i + 2))
        }
        else {
            countList.putByte(i.toFixed(1), countList.getByte(i.toFixed(1)) ?? 0)
            i++
        }
    }
    item.nbt.put('mrqxInfinityForceContainerCountList', countList)
}

/**
 * @param {Internal.LivingDamageEvent} event
 */
function mrqxAdvancedArchivistEyeGlassDamage(event) {
    let entity = event.entity
    if (entity.type == 'dummmmmmy:target_dummy') return
    entity.level.spawnParticles('dummmmmmy:number', true,
        entity.x, entity.eyeY + 1, entity.z,
        event.amount, $mrqxDamageType.get(event.source, false).ordinal(), Math.floor(Math.random() * 5), 0, 1)
}

/**
 * @param {Internal.LivingDamageEvent} event
 */
function mrqxAdvancedArchivistEyeGlassBear(event) {
    let player = event.entity
    let rayX = Math.cos(-player.xRot / 180 * JavaMath.PI) * Math.sin(-player.yRot / 180 * JavaMath.PI)
    let rayY = Math.sin(-player.xRot / 180 * JavaMath.PI)
    let rayZ = Math.cos(-player.xRot / 180 * JavaMath.PI) * Math.cos(-player.yRot / 180 * JavaMath.PI)
    player.level.spawnParticles('dummmmmmy:number', true,
        player.x + rayX, player.y + rayY, player.z + rayZ,
        event.amount, $mrqxDamageType.get(event.source, false).ordinal(), Math.floor(Math.random() * 5), 0, 1)
}

/**
 * @param {Internal.LivingDamageEvent} event
 */
function mrqxTimelessIvyDamage(event) {
    let player = event.source.player
    let magicData = getPlayerMagicData(player)
    let mana = magicData.getMana()
    let entity = event.entity
    entity.server.scheduleInTicks(2, event => {
        entity.attack(DamageSource.indirectMagic(player, player), mana * 0.005 * player.getAttributeTotalValue('minecraft:generic.attack_damage'))
    })
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxTimelessIvyTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || !player.isPlayer() || player.level.isClientSide()) return
    let magicData = getPlayerMagicData(player)
    let mana = magicData.getMana()
    let slots = ["mainhand", "offhand", "head", "chest", "legs", "feet"]
    for (let i = 0; i < slots.length; i++) {
        let item = player.getEquipment(slots[i])
        if (item && item.isDamageableItem() && item.damageValue > 0 && mana > 50) {
            let count = Math.min(Math.floor(mana / 50), item.damageValue)
            item.setDamageValue(item.damageValue - count)
            magicData.setMana(mana - count * 50)
        }
    }
}

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxRadiantStarTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || !player.isPlayer() || player.level.isClientSide() || player.age % (20 * 10) != 0) return
    player.potionEffects.getMap().forEach((effect, effectInstance) => {
        if (effect.getCategory().name() == 'BENEFICIAL') {
            player.server.scheduleInTicks(1, event => {
                player.potionEffects.add(effect, effectInstance.getDuration() + 20 * 5, effectInstance.getAmplifier(), effectInstance.ambient, false)
            })
        }
    })
}

/**
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} item
 */
function mrqxRingFromGodBear(event, item) {
    let player = event.entity
    if (!player || player.level.isClientSide()) return
    let typeMap = getPlayerChestCavityTypeMap(player)
    if (!typeMap.get('kubejs:mrqx_seven_sins')) return
    let count = typeMap.get('kubejs:mrqx_seven_sins').length
    event.amount = Math.min(event.amount, 180 / count)
    player.server.scheduleInTicks(1, event => {
        player.invulnerableTime = 20 + count * 10
    })
}

/**
 * @param {Internal.LivingHurtEvent} event
 * @param {Internal.ServerPlayer} owner
 */
function mrqxTimewornPoetryStripsDamage(event, owner) {
    event.entity.invulnerableTime = 0
    event.entity.attack(DamageSource.indirectMagic(owner, owner), owner.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.1)
    event.entity.invulnerableTime = 0
}

EntityEvents.death(event => {
    /** @type {Internal.TamableAnimal} */
    let entity = event.getEntity()
    if (!entity || !entity.isLiving()) return
    if (!(entity instanceof $mrqxTamableAnimal)) return

    if (!entity.getOwner() || !entity.getOwner().isPlayer()) return
    let curioInfo = mrqxGetCurioInfo(entity.getOwner(), 'mrqx_extra_pack:timeworn_poetry_strips')
    if (!curioInfo.hasItem) return

    let uuid = UUID.toString(entity.getOwnerUUID())

    /** @type {Internal.TamableAnimal[]} */
    let entityList = []

    entity.level.entities.forEach(e => {
        if (!e || !e.isLiving()) return
        if (!(e instanceof $mrqxTamableAnimal)) return
        if (!e.getOwner() || !e.getOwner().isPlayer()) return
        let euuid = UUID.toString(e.getOwnerUUID())
        if (uuid == euuid) entityList.push(e)
    })

    entityList.forEach(e => {
        e.heal(entity.maxHealth * curioInfo.count)
    })

    /** @type {Internal.LivingEntity} */
    let killer = event.getSource().getActual()
    if (!killer || !killer.isLiving()) return
    killer.invulnerableTime = 0
    killer.attack(DamageSource.indirectMagic(entity, entity), entity.getAttributeTotalValue('minecraft:generic.attack_damage') * 4.5 * curioInfo.count)
    killer.invulnerableTime = 0
})

EntityEvents.death(event => {
    /** @type {Internal.ServerPlayer} */
    let player = event.player
    if (!player || player.level.isClientSide()) return
    let curioInfo = mrqxGetCurioInfo(player, 'mrqx_extra_pack:save_point')
    if (!curioInfo.hasItem) return
    player.setHealth(player.maxHealth)
    player.setFoodLevel(20)
    player.setSaturation(5)
    player.potionEffects.clear()
    player.teleportTo(player.getRespawnDimension(), player.getRespawnPosition().x, player.getRespawnPosition().y, player.getRespawnPosition().z, player.yRot, player.xRot)
    event.cancel()
})

/**
 * @param {Internal.ItemStack} item
 * @param {Internal.SlotContext} ctx 
 */
global.mrqxMyCrownTick = (item, ctx) => {
    /**@type {Internal.ServerPlayer} */
    let player = ctx.entity()
    if (!player || !player.isPlayer() || player.level.isClientSide() || player.age % 20 != 0) return

    let attriMap = getPlayerAttributeMap(player)

    if (mrqxIsInTeamsClaimedChunk(player, player.level, player.block.pos)) {
        attriMap.set(global.mrqx_MY_CROWN_A.name, 0.5)
        player.modifyAttribute(global.mrqx_MY_CROWN_A.key, global.mrqx_MY_CROWN_A.name, 0.5, global.mrqx_MY_CROWN_A.operation)
        attriMap.set(global.mrqx_MY_CROWN_B.name, 0.5)
        player.modifyAttribute(global.mrqx_MY_CROWN_B.key, global.mrqx_MY_CROWN_B.name, 0.5, global.mrqx_MY_CROWN_B.operation)
        setPlayerAttributeMap(player, attriMap)
        player.heal(player.maxHealth * 0.05)
    } else {
        player.removeAttribute(global.mrqx_MY_CROWN_A.key, global.mrqx_MY_CROWN_A.name)
        attriMap.set(global.mrqx_MY_CROWN_A.name, 0)
        player.removeAttribute(global.mrqx_MY_CROWN_B.key, global.mrqx_MY_CROWN_B.name)
        attriMap.set(global.mrqx_MY_CROWN_B.name, 0)
        setPlayerAttributeMap(player, attriMap)
    }

    let uuid = UUID.toString(player.getUuid())

    let count = 0
    let entityTypeSet = new Set()

    player.level.entities.forEach(e => {
        if (!e || !e.isLiving()) return
        if (!(e instanceof $mrqxTamableAnimal)) return
        if (!e.getOwner() || !e.getOwner().isPlayer()) return
        let euuid = UUID.toString(e.getOwnerUUID())
        if (uuid == euuid) {
            count++
            entityTypeSet.add(e.getType())
        }
    })

    count += entityTypeSet.size * 10 * 0.05
    if (count != 0) {
        attriMap.set(global.mrqx_MY_CROWN_C.name, count)
        player.modifyAttribute(global.mrqx_MY_CROWN_C.key, global.mrqx_MY_CROWN_C.name, count, global.mrqx_MY_CROWN_C.operation)
        setPlayerAttributeMap(player, attriMap)
    }
    else {
        player.removeAttribute(global.mrqx_MY_CROWN_C.key, global.mrqx_MY_CROWN_C.name)
        attriMap.set(global.mrqx_MY_CROWN_C.name, 0)
        setPlayerAttributeMap(player, attriMap)
    }
}