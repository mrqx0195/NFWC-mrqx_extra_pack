// priority: 450
ItemEvents.tooltip((tooltip) => {
    tooltip.addAdvanced('mrqx_extra_pack:tumor_mutagen', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.tumor_mutagen.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.tumor_mutagen.2" })]], 2)
    })

    tooltip.addAdvanced('mrqx_extra_pack:portable_medical_checkup_device', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.portable_medical_checkup_device.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:advanced_eyeglass', (item, advanced, text) => {
        text.add([Text.gray({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.0" })])
        if (item.nbt) {
            if (item.nbt?.mrqxAAEGSweetDream) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.1" })])
            }
            if (item.nbt?.mrqxAAEGDragonPower) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.2" })])
            }
            if (item.nbt?.mrqxAAEGInfinityBeats) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.3" })])
            }
            if (item.nbt?.mrqxAAEGBurningAndFlaringHeart) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.4" })])
            }
            if (item.nbt?.mrqxAAEGPrisonSoul) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.5" })])
            }
            if (item.nbt?.mrqxAAEGMoonSoul) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.6" })])
            }
            if (item.nbt?.mrqxAAEGMarenol) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.7" })])
            }
            if (item.nbt?.mrqxAAEGNuclear) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.8" })])
            }
            if (item.nbt?.mrqxAAEGSteam) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.9" })])
            }
            if (item.nbt?.mrqxAAEGElement) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.a" })])
            }
            if (item.nbt?.mrqxAAEGDamageNumber) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.b" })])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:golden_chalice', (item, advanced, text) => {
        if (item.nbt) {
            if (item.nbt?.mrqxGoldenChaliceMoney) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.golden_chalice.4" }), Text.gold(item.nbt?.mrqxGoldenChaliceMoney)])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:crispy_belly', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.crispy_belly.1" })]], 1)
        if (tooltip.shift) {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.crispy_belly.2" })]], 2)
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:worn_out_steam_engine', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.worn_out_steam_engine.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:basic_uncoded_cpu', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.basic_uncoded_cpu.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:advanced_uncoded_cpu', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.advanced_uncoded_cpu.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:artificial_mineral_cluster', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.artificial_mineral_cluster.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:magic_artificial_mineral_cluster', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_artificial_mineral_cluster.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:anomaly_artificial_mineral_cluster', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.anomaly_artificial_mineral_cluster.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_flesh_and_blood', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_flesh_and_blood.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_soul', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_soul.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_machine', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_machine.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_magic', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_magic.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_craftsmanship', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_craftsmanship.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_scholar', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_scholar.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_nature', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_nature.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_stars', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_stars.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_resources', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_resources.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_food', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_food.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_sinners', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_sinners.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_disasters', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_disasters.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_lords', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_lords.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_followers', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_followers.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_memories', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_memories.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:mystery_future', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mystery_future.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:infinity_force_container', (/** @type {Internal.ItemStack} */item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.infinity_force_container.1" })]], 1)
        if (item.nbt) {
            if (item.nbt?.mrqxInfinityForceContainerCountList) {
                let countList = item.nbt.getCompound('mrqxInfinityForceContainerCountList')
                let i = 0
                let count = 0
                if ((countList.getInt('max') ?? 0) == 0 && (countList.getByte(0) ?? 0) == 0) return
                while (i <= (countList.getInt('max') ?? 0)) {
                    if ((countList.getByte(i) ?? 0) >= 1) {
                        count++
                    }
                    count /= 2
                    i++
                }
                text.add([Text.translate("mrqx_extra_pack.tooltips.infinity_force_container.2", (((countList.getInt('max') ?? 0) == 0 ? 1 : (countList.getInt('max') ?? 0)) - 1).toFixed(0), ((count - 0.25) * ((countList.getInt('max') ?? 0) == 0 ? 2 : 4) * 100).toFixed(2)).string])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:fallen_paradise_container', (/** @type {Internal.ItemStack} */item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.fallen_paradise_container.1" })]], 1)
        if (item.nbt) {
            if (item.nbt?.mrqxInfinityForceContainerCountList) {
                let countList = item.nbt.getCompound('mrqxInfinityForceContainerCountList')
                let i = 0
                let count = 0
                if ((countList.getInt('max') ?? 0) == 0 && (countList.getByte(0) ?? 0) == 0) return
                while (i <= (countList.getInt('max') ?? 0)) {
                    if ((countList.getByte(i) ?? 0) >= 1) {
                        count++
                    }
                    count /= 2
                    i++
                }
                text.add([Text.translate("mrqx_extra_pack.tooltips.fallen_paradise_container.2", (((countList.getInt('max') ?? 0) == 0 ? 1 : (countList.getInt('max') ?? 0)) - 1).toFixed(0), ((count - 0.25) * ((countList.getInt('max') ?? 0) == 0 ? 2 : 4) * 100).toFixed(2)).string])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:mint_milk_tea', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:pineapple_shrimp_fried_rice', (item, advanced, text) => {
        if (tooltip.shift) {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.pineapple_shrimp_fried_rice.1" })]], 1)
            if (tooltip.ctrl) {
                addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.pineapple_shrimp_fried_rice.2" })]], 2)
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:sentient_greatscythe', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sentient_greatscythe.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sentient_greatscythe.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sentient_greatscythe.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:residual_breath_of_dead_soul', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.residual_breath_of_dead_soul.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.residual_breath_of_dead_soul.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.residual_breath_of_dead_soul.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:shield_generator', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.shield_generator.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.shield_generator.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.shield_generator.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:sages_book', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sages_book.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sages_book.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sages_book.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:craftsmanship_core', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.craftsmanship_core.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.craftsmanship_core.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.craftsmanship_core.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:book_of_over_enchantment', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.book_of_over_enchantment.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.book_of_over_enchantment.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.book_of_over_enchantment.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:timeless_ivy', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeless_ivy.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeless_ivy.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeless_ivy.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:radiant_star', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.radiant_star.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.radiant_star.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.radiant_star.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:atomic_disassembler', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.atomic_disassembler.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.atomic_disassembler.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.atomic_disassembler.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:ultimate_stew', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ultimate_stew.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ultimate_stew.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ultimate_stew.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:ring_from_god', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ring_from_god.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ring_from_god.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.ring_from_god.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:save_point', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.save_point.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.save_point.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.save_point.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:my_crown', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.my_crown.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.my_crown.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.my_crown.3" })]], 3)
    })

    tooltip.addAdvanced('mrqx_extra_pack:timeworn_poetry_strips', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeworn_poetry_strips.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeworn_poetry_strips.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.timeworn_poetry_strips.3" })]], 3)
    })

    tooltip.addAdvanced('gateways:gate_pearl', (/** @type {Internal.ItemStack} */item, advanced, text) => {
        if (item.nbt.isEmpty() || !item.nbt.getString('gateway')) {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.gate_pearl_craft.1" })]], 1)
        }
        else if (item.nbt.getString('gateway') == "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor") {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.shadow_of_caerula_arbor.1" })]], 1)
        }
        else if (item.nbt.getString('gateway') == "mrqx_extra_pack:mrqx_mechanical_frenzy") {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mechanical_frenzy.1" })]], 1)
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:xiao_amburm', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.xiao_amburm.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.xiao_amburm.2" })]], 2)
    })

    tooltip.addAdvanced('minecraft:dragon_egg', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.dragon_egg.1" })]], 1)
    })

    tooltip.addAdvanced('mrqx_extra_pack:sakuya_ice_cream', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sakuya_ice_cream.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sakuya_ice_cream.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.sakuya_ice_cream.3" })]], 3)
    })
})