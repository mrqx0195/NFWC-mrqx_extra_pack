// priority: 940

/**
 * 检测器官套装
 * @param {Internal.ServerPlayer} player
 * @param {String} type
 * @param {String} extra
 * @returns {number}
 */
function mrqxCheckOrganSuit(player, type, extra) {
    if (type in mrqxOrganSuitStrategies) {
        return Math.max(mrqxOrganSuitStrategies[type](player, extra), 0)
    }
    return 0
}

/**
 * 检测器官套装策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, String):void>}
 */
const mrqxOrganSuitStrategies = {
    'four_soul': function (player, extra) {
        let playerChest = getPlayerChestCavityItemMap(player)
        let organList = [
            'mrqx_extra_pack:proud_soul',
            'mrqx_extra_pack:prison_soul',
            'mrqx_extra_pack:fox_soul',
            'mrqx_extra_pack:moon_soul',
        ]
        let count = 0
        organList.forEach(organ => {
            if (!playerChest.has(organ) && extra == 'isAll') {
                count = -10000
            }
            count++
        })
        return count
    },
    'seaborn': function (player, extra) {
        let playerChest = getPlayerChestCavityItemMap(player)
        let organList = [
            "mrqx_extra_pack:heart_tidal_elegy",
            "mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes",
            "mrqx_extra_pack:kidney_moon_in_the_water",
            "mrqx_extra_pack:liver_tide_observation",
            "mrqx_extra_pack:pancreas_group_hunting",
            "mrqx_extra_pack:muscle_bone_fracture",
            "mrqx_extra_pack:rib_the_pressure_to_survive",
            "mrqx_extra_pack:spleen_adhering_to_nature",
            "mrqx_extra_pack:stomach_stomach_abyssal_predator",
            "mrqx_extra_pack:spine_abyssal_intuition",
            "mrqx_extra_pack:intestine_survival_of_the_fittest",
            "mrqx_extra_pack:appendix_mutation",
        ]
        let count = 0
        organList.forEach(organ => {
            if (!playerChest.has(organ) && extra == 'isAll') {
                count = -10000
            }
            count++
        })
        return count
    },
    'seven_sins': function (player, extra) {
        let playerChest = getPlayerChestCavityItemMap(player)
        let organList = [
            'mrqx_extra_pack:sin_acedia_belphegor',
            'mrqx_extra_pack:sin_avaritia_mammon',
            'mrqx_extra_pack:sin_gula_beelzebub',
            'mrqx_extra_pack:sin_invidia_leviathan',
            'mrqx_extra_pack:sin_ira_samael',
            'mrqx_extra_pack:sin_lucifer_superbia',
            'mrqx_extra_pack:sin_luxuria_asmodeus',
        ]
        let count = 0
        organList.forEach(organ => {
            if (!playerChest.has(organ) && extra == 'isAll' && !playerChest.has('mrqx_extra_pack:sin_and_judgement')) {
                count = -10000
            }
            count++
        })
        if (playerChest.has('mrqx_extra_pack:sin_and_judgement')) {
            count += 7
        }
        return count
    },
}