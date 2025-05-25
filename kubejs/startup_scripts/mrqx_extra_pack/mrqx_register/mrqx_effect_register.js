// priority: -50

StartupEvents.registry('mob_effect', event => {
        event.create('mrqx_extra_pack:nuclear_power')
                .beneficial()
                .color(Color.GOLD)
                .modifyAttribute('minecraft:generic.attack_damage', 'mrqxNuclearPowerAttackDamage', 0.5, "multiply_total")

        event.create('mrqx_extra_pack:charged_blade_effect')
                .beneficial()
                .color(Color.LIGHT_BLUE_DYE)

        event.create('mrqx_extra_pack:steam_power')
                .beneficial()
                .color(Color.GRAY_DYE)

        event.create('mrqx_extra_pack:steam_supercharge')
                .beneficial()
                .color(Color.WHITE_DYE)
                .modifyAttribute('minecraft:generic.attack_damage', 'mrqxSteamSuperchargeAttackDamage', 0.1, "multiply_total")
                .modifyAttribute('minecraft:generic.armor_toughness', 'mrqxSteamSuperchargeArmorToughness', 4, "addition")
                .modifyAttribute('minecraft:generic.movement_speed', 'mrqxSteamSuperchargeMovementSpeed', 0.1, "multiply_total")
                .effectTick((entity, lvl) => {
                        if (!entity || entity.level.isClientSide()) return
                        if (entity.getEffect('mrqx_extra_pack:steam_supercharge').getDuration() <= 2) {
                                entity.removeEffect('mrqx_extra_pack:steam_supercharge')
                                entity.potionEffects.add('cataclysm:stun', 20 * 5, 0, false, false)
                        }
                })

        event.create('mrqx_extra_pack:ghost_of_dead_soul')
                .harmful()
                .color(Color.DARK_RED)

        event.create('mrqx_extra_pack:demonization_kill')
                .harmful()
                .color(Color.DARK_RED)
                .modifyAttribute('irons_spellbooks:max_mana', 'mrqxDemonizationKillMaxMana', 0.2, 'multiply_base')
                .modifyAttribute('irons_spellbooks:cooldown_reduction', 'mrqxDemonizationKillCooldown', 0.2, 'multiply_base')
                .modifyAttribute('minecraft:generic.attack_damage', 'mrqxDemonizationKillDamage', 0.2, 'multiply_base')
                .modifyAttribute('irons_spellbooks:spell_power', 'mrqxDemonizationKillSpellPower', 0.2, 'multiply_base')

        event.create('mrqx_extra_pack:thresher_effect')
                .harmful()
                .color(Color.YELLOW_DYE)

        event.create('mrqx_extra_pack:dragon_emperor_passion')
                .harmful()
                .color(Color.YELLOW_DYE)

        event.create('mrqx_extra_pack:dragon_emperor_brilliant')
                .harmful()
                .color(Color.YELLOW_DYE)

})