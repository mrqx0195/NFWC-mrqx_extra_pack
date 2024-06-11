ItemEvents.tooltip((tooltip) => {
    tooltip.addAdvanced('mrqx_extra_pack:tumor_mutagen', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.tumor_mutagen.1" })]], 1)
    })
    tooltip.addAdvanced('mrqx_extra_pack:portable_medical_checkup_device', (item, advanced, text) => {
        addForTextLines(text, [[Text.gray({ "translate": "mrqx_extra_pack.tooltips.portable_medical_checkup_device.1" })]], 1)
    })
})