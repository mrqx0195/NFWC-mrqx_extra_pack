ItemEvents.tooltip((tooltip) => {
	
	tooltip.addAdvanced('luna_flesh_reforged:archotech_framework', (item, advanced, text) => {
        text.add(Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_framework.1" }));
    })
	tooltip.addAdvanced('luna_flesh_reforged:archotech_cube', (item, advanced, text) => {
        text.add(Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_cube.1" }));
    })
	tooltip.addAdvanced('luna_flesh_reforged:archotech_capsule', (item, advanced, text) => {
        text.add(Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_capsule.1" }));
    })
})