// priority: -1

StartupEvents.registry('mob_effect', event => {
        event.create('mrqx_extra_pack:nuclear_power')
                .beneficial()
                .color(Color.GOLD)
                .modifyAttribute('minecraft:generic.attack_damage', 'mrqxNuclearPower', 0.4, "multiply_total")

        event.create('mrqx_extra_pack:nuclear_power_generation')
                .beneficial()
                .color(Color.GOLD)
                .effectTick((entity, lvl) => {
                        if (!entity || !entity.isPlayer() || entity.level.isClientSide()) return
                        let count = lvl;
                        if (entity.persistentData.contains('resourceCount')) {
                                count = entity.persistentData.getInt('resourceCount') + count;
                        }
                        updateResourceCount(entity, count)
                })

        event.create('mrqx_extra_pack:charged_blade_effect')
                .beneficial()
                .color(Color.LIGHT_BLUE_DYE)
})