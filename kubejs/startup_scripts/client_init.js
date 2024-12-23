// priority: 500
const TetraEffectFunctionalization = TetraEffect.createItemEffect(new ResourceLocation('kubejs:functionalization'))
const TetraEffectFunctionalizationEffectGetter = TetraStatGetter.createStatGetterEffectLevel(TetraEffectFunctionalization, 1)

ClientEvents.init(event => {
    TetraGui.addGuiStatBar(
        TetraGui.createGuiStatBar(0, 0, 59,
            'kubejs.tetra.effect.functionalization.name', 0, 30,
            false, false, false,
            TetraEffectFunctionalizationEffectGetter,
            TetraLabelGetter.decimalLabel,
            TetraTooltipGetter.createTooltipGetterInteger('kubejs.tetra.effect.functionalization.tooltip', TetraEffectFunctionalizationEffectGetter, false)))
})