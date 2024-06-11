const mrqxOrganPlayerBearStrategies = {
    //梦魇之触
    'mrqx_extra_pack:nightmare_tentacles': function (event, organ, data) {
        let player = event.entity
        if (player.potionEffects.map.size > 0) {
            let count = 0
            player.potionEffects.map.forEach((effect, instance) => {
                if (!effect.isBeneficial()) {
                    let amplifier = instance.getAmplifier()
                    let duration = instance.getDuration()
                    let effect = instance.getEffect()
                    player.potionEffects.add(effect, duration + event.amount * 10, amplifier)
                    count += amplifier + 1
                }
            })
            event.amount /= count * player.persistentData.getInt(warpCount) * 0.1 + 1
            updateWarpCount(player, (event.player.persistentData.getInt(warpCount) ?? 0) + count / 5)
        }
    },

}

var assign1 = Object.assign(organPlayerBearStrategies, mrqxOrganPlayerBearStrategies);

const mrqxOrganPlayerBearOnlyStrategies = {

}

var assign2 = Object.assign(organPlayerBearOnlyStrategies, mrqxOrganPlayerBearOnlyStrategies);
