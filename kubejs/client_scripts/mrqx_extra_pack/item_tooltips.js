ItemEvents.tooltip((tooltip) => {
    tooltip.addAdvanced('mrqx_extra_pack:tumor_mutagen', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.tumor_mutagen.1" })]], 1)
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.tumor_mutagen.2" })]], 1)
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
            if (item.nbt?.mrqxAAEGElement) {
                text.add([Text.gold({ "translate": "mrqx_extra_pack.tooltips.advanced_eyeglass.9" })])
            }
        }
    })
})