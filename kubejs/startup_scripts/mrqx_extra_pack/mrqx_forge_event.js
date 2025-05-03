// priority: -50
// 最终还是选择了自己造轮子（趴
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingChangeTargetEvent', event => {
    if (event.getOriginalTarget() && !event.getOriginalTarget().getLevel().isClientSide() && event.getOriginalTarget().isPlayer()) {
        global.mrqxLivingChangeTargetEvent(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added', event => {
    if (event.getEntity() && event.getEntity().getLevel() && !event.getEntity().getLevel().isClientSide() && event.getEntity().isPlayer()) {
        global.mrqxEffectAddedEvent(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
    if (!event.getEntity().getLevel().isClientSide()) {
        global.mrqxLivingHurtByEntity(event)
        if (event.getSource() && event.getSource().getPlayer() && !event.getSource().getPlayer().getLevel().isClientSide()) {
            global.mrqxLivingHurtByPlayer(event)
        }
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDamageEvent', event => {
    if (event.getEntity() && event.getEntity().isPlayer() && !event.getEntity().getLevel().isClientSide()) {
        global.mrqxLivingDamageByOthers(event)
    }
    if (event.getSource() && event.getSource().getPlayer() && !event.getSource().getPlayer().getLevel().isClientSide()) {
        global.mrqxLivingDamageByPlayer(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEvent$LivingTickEvent', event => {
    if (event.getEntity() && !event.getEntity().getLevel().isClientSide()) {
        if ((event.getEntity().getType() in global.mrqxBossTick)) {
            global.mrqxBossTick[event.getEntity().getType()](event)
        }
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDropsEvent', event => {
    if (event.getEntity() && !event.getEntity().getLevel().isClientSide()) {
        global.mrqxLivingDrops(event)
    }
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.player.ItemTooltipEvent', event => {
    global.mrqxTooltip(event)
})

/**
 * @param {Internal.ItemTooltipEvent} event 
 */
global.mrqxTooltip = (event) => {
    let player = event.entity
    let item = event.itemStack
    if (player && (item.getId() == 'mrqx_extra_pack:page_of_past' || item.getId() == 'mrqx_extra_pack:page_of_future')) {
        if (player.getPersistentData().getBoolean(`mrqx_mq`)) {
            if (item.getOrCreateTag().hasUUID('owner')) {
                if (UUID.toString(item.getOrCreateTag().getUUID('owner')) == UUID.toString(player.getUuid())) {
                    switch (item.getId()) {
                        case 'mrqx_extra_pack:page_of_past':
                            if (item.nbt && item.nbt.getInt('mrqx_quest') < 4) {
                                event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_past.1", "with": [`${item.nbt.getInt('mrqx_quest').toFixed(0)}`] }))
                            }
                            else if (item.nbt && item.nbt.getInt('mrqx_quest') == 4) {
                                event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_past.2" }))
                            }
                            break
                        case 'mrqx_extra_pack:page_of_future':
                            if (item.nbt && item.nbt.getInt('mrqx_quest') < 4) {
                                event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_future.1", "with": [`${item.nbt.getInt('mrqx_quest').toFixed(0)}`] }))
                            }
                            else if (item.nbt && item.nbt.getInt('mrqx_quest') == 4) {
                                event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_future.2" }))
                            }
                            break
                    }
                }
                else {
                    event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.pages.1" }))
                }
            } else {
                switch (item.getId()) {
                    case 'mrqx_extra_pack:page_of_past':
                        if (item.nbt && item.nbt.getInt('mrqx_quest') < 4 && item.nbt.getInt('mrqx_quest') != 0) {
                            event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_past.1", "with": [`${item.nbt.getInt('mrqx_quest').toFixed(0)}`] }))
                        }
                        else if (item.nbt && item.nbt.getInt('mrqx_quest') == 4) {
                            event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_past.2" }))
                        }
                        break
                    case 'mrqx_extra_pack:page_of_future':
                        if (item.nbt && item.nbt.getInt('mrqx_quest') < 4 && item.nbt.getInt('mrqx_quest') != 0) {
                            event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_future.1", "with": [`${item.nbt.getInt('mrqx_quest').toFixed(0)}`] }))
                        }
                        else if (item.nbt && item.nbt.getInt('mrqx_quest') == 4) {
                            event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.page_of_future.2" }))
                        }
                        break
                }
            }
        }
        else {
            event.toolTip.add(1, Text.of({ "translate": "mrqx_extra_pack.tooltips.pages.0" }))
        }
    }
}