// priority: 450

const mrqxTetraEffectFlameAndSteel = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:flame_and_steel'))
const mrqxTetraEffectFlameAndSteelEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectFlameAndSteel, 1)

const mrqxTetraEffectThresher = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:thresher'))
const mrqxTetraEffectThresherEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectThresher, 1)

const mrqxTetraEffectFinalTactics = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:final_tactics'))
const mrqxTetraEffectFinalTacticsEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectFinalTactics, 1)

const mrqxTetraEffectTruesilverSlash = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:truesilver_slash'))
const mrqxTetraEffectTruesilverSlashEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectTruesilverSlash, 1)

const mrqxTetraEffectTrialofThorns = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:trial_of_thorns'))
const mrqxTetraEffectTrialofThornsEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectTrialofThorns, 1)

const mrqxTetraEffectPathsMustBeOpened = TetraEffect.createItemEffect(new ResourceLocation('mrqx_extra_pack:paths_must_be_opened'))
const mrqxTetraEffectPathsMustBeOpenedEffectGetter = TetraStatGetter.createStatGetterEffectLevel(mrqxTetraEffectPathsMustBeOpened, 1)

global.mrqxTetraEffect = {
    'mrqx_extra_pack:flame_and_steel': mrqxTetraEffectFlameAndSteel,
    'mrqx_extra_pack:thresher': mrqxTetraEffectThresher,
    'mrqx_extra_pack:final_tactics': mrqxTetraEffectFinalTactics,
    'mrqx_extra_pack:truesilver_slash': mrqxTetraEffectTruesilverSlash,
    'mrqx_extra_pack:trial_of_thorns': mrqxTetraEffectTrialofThorns,
    'mrqx_extra_pack:paths_must_be_opened': mrqxTetraEffectPathsMustBeOpened,
}
if (Platform.isClientEnvironment()) {
    var assign = Object.assign(global.TetraEffect, global.mrqxTetraEffect)

    ClientEvents.init(event => {
        function fastAddGuiStatBar(id, effectGetter) {
            TetraGui.addGuiStatBar(
                TetraGui.createGuiStatBar(0, 0, 59,
                    `mrqx_extra_pack.tetra.effect.${id}.name`, 0, 1,
                    false, false, false,
                    effectGetter,
                    TetraLabelGetter.decimalLabel,
                    TetraTooltipGetter.createTooltipGetterInteger(`mrqx_extra_pack.tetra.effect.${id}.tooltip`, effectGetter, false)))
        }

        // 火与钢
        fastAddGuiStatBar('flame_and_steel', mrqxTetraEffectFlameAndSteelEffectGetter)

        // 剥壳
        fastAddGuiStatBar('thresher', mrqxTetraEffectThresherEffectGetter)

        // 战术的终结
        fastAddGuiStatBar('final_tactics', mrqxTetraEffectFinalTacticsEffectGetter)

        // 真银斩
        fastAddGuiStatBar('truesilver_slash', mrqxTetraEffectTruesilverSlashEffectGetter)

        // 披荆斩棘
        fastAddGuiStatBar('trial_of_thorns', mrqxTetraEffectTrialofThornsEffectGetter)

        // 必须开辟的通路
        fastAddGuiStatBar('paths_must_be_opened', mrqxTetraEffectPathsMustBeOpenedEffectGetter)

    })
}