// priority: 4
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

    tooltip.addAdvanced('mrqx_extra_pack:infinity_force_container', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.infinity_force_container.1" })]], 1)
        if (item.nbt) {
            if (item.nbt?.mrqxInfinityForceContainerCount) {
                let count = item.nbt?.mrqxInfinityForceContainerCount
                let power = 0
                while (Math.pow(2, power + 1) <= count) {
                    power++
                }
                text.add([Text.translate("mrqx_extra_pack.tooltips.infinity_force_container.2", power.toFixed(0), (((count - (2 ** power)) / (2 ** power)) * 100).toFixed(0)).string])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:fallen_paradise_container', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.fallen_paradise_container.1" })]], 1)
        if (item.nbt) {
            if (item.nbt?.mrqxInfinityForceContainerCount) {
                let count = item.nbt?.mrqxInfinityForceContainerCount
                let power = 0
                while (Math.pow(2, power + 1) <= count) {
                    power++
                }
                text.add([Text.translate("mrqx_extra_pack.tooltips.fallen_paradise_container.2", power.toFixed(0), (((count - (2 ** power)) / (2 ** power)) * 100).toFixed(0)).string])
            }
        }
    })

    tooltip.addAdvanced('mrqx_extra_pack:mint_milk_tea', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.2" })]], 2)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.mint_milk_tea.3" })]], 3)
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

    tooltip.addAdvanced('gateways:gate_pearl', (/** @type {Internal.ItemStack} */item, advanced, text) => {
        if (item.nbt.isEmpty()) {
            addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.gate_pearl_craft.1" })]], 1)
        }
    })
})