// priority: 500
const TetraEffectFunctionalization = TetraEffect.createItemEffect(new ResourceLocation('kubejs:functionalization'))
const TetraEffectFunctionalizationEffectGetter = TetraStatGetter.createStatGetterEffectLevel(TetraEffectFunctionalization, 1)

const TetraEffectSilicosis = TetraEffect.createItemEffect(new ResourceLocation('kubejs:silicosis'))
const TetraEffectSilicosisEffectGetter = TetraStatGetter.createStatGetterEffectLevel(TetraEffectSilicosis, 1)

global.TetraEffect = {
    'kubejs:functionalization': TetraEffectFunctionalization,
    'kubejs:silicosis': TetraEffectSilicosis
}  

ClientEvents.init(event => {
    TetraGui.addGuiStatBar(
        TetraGui.createGuiStatBar(0, 0, 59,
            'kubejs.tetra.effect.functionalization.name', 0, 30,
            false, false, false,
            TetraEffectFunctionalizationEffectGetter,
            TetraLabelGetter.decimalLabel,
            TetraTooltipGetter.createTooltipGetterInteger('kubejs.tetra.effect.functionalization.tooltip', TetraEffectFunctionalizationEffectGetter, false)))

    TetraGui.addGuiStatBar(
        TetraGui.createGuiStatBar(0, 0, 59,
            'kubejs.tetra.effect.silicosis.name', 0, 30,
            false, false, false,
            TetraEffectSilicosisEffectGetter,
            TetraLabelGetter.decimalLabel,
            TetraTooltipGetter.createTooltipGetterInteger('kubejs.tetra.effect.silicosis.tooltip', TetraEffectSilicosisEffectGetter, false)))
})