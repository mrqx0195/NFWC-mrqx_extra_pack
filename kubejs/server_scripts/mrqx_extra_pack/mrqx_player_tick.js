const mrqxOrganPlayerTickStrategies = {
    // 迷你末地水晶
    'mrqx_extra_pack:mini_end_crystal': function (event, organ) {
        let player = event.player
        let playerChestInstance = player.getChestCavityInstance()
        player.heal(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'crystalsynthesis') ?? 0))
    },
}

var assign1 = Object.assign(organPlayerTickStrategies, mrqxOrganPlayerTickStrategies);

const mrqxOrganPlayerTickOnlyStrategies = {
    // 山月之魂
    'mrqx_extra_pack:moon_soul': function (event, organ) {
        let player = event.player
        let combo = player.persistentData.getInt('combo') ?? 0
        player.persistentData.putInt('combo', combo - 2)
    },

    // 耀阳种子
    'mrqx_extra_pack:sun_seed': function (event, organ) {
        let player = event.player
        let playerChestInstance = player.getChestCavityInstance()
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) {
            player.attack(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) + 5)
        }
        else {
            if (event.player.persistentData.organActive != 1) {
                return
            }
            player.heal(playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0))
        }
    },
}

var assign2 = Object.assign(organPlayerTickOnlyStrategies, mrqxOrganPlayerTickOnlyStrategies);


// 核能动力检测
PlayerEvents.tick(event => {
    let player = event.player
    let playerChest = getPlayerChestCavityItemMap(player)
    if ((player.hasEffect('mrqx_extra_pack:nuclear_power') || player.hasEffect('mrqx_extra_pack:nuclear_power_generation')) && !playerChest.has("mrqx_extra_pack:fission_reactor")) {
        Utils.server.runCommandSilent('playsound minecraft:entity.generic.explode player @a ' + player.x + ' ' + player.y + ' ' + player.z)
        event.level.spawnParticles('minecraft:explosion', true, player.x, player.y + 1, player.z, 1, 1, 1, 10, 0.5)
        let explosion = event.player.block.createExplosion()
        let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
        if (!effect) {
            effect = player.getEffect('mrqx_extra_pack:nuclear_power_generation')
        }
        let amplifier = effect.getAmplifier()
        let duration = effect.getDuration()
        explosion.strength(amplifier * (duration / 1200 + 1))
        player.attack(amplifier * (duration / 1200 + 1))
        explosion.causesFire(true)
        explosion.explode()
        player.removeEffect('mrqx_extra_pack:nuclear_power')
        player.removeEffect('mrqx_extra_pack:nuclear_power_generation')
        /*let effectCloud = event.level.createEntity('minecraft:area_effect_cloud')
        effectCloud.setNbt('{Radius:5,Duration:2147483640,RadiusOnUse:-0.000001f,RadiusPerTick:-0.000001f,potion_contents:{custom_effects:[{amplifier:4b,duration:6000,id:"minecraft:wither"},{amplifier:1b,duration:1,id:"minecraft:instant_damage"}]},ReapplicationDelay:20,WaitTime:1}')
        effectCloud.setPosition(player.x, player.y, player.z)
        effectCloud.spawn()*/
    }
})

// 灵狐之魂获取
PlayerEvents.tick(event => {
    let player = event.player
    let entityList = getLivingWithinRadius(player.getLevel(), player.position(), 5)
    entityList.forEach(entity => {
        if (entity.getEncodeId() == 'minecraft:fox' && !entity.persistentData.getBoolean('fox_soul')) {
            entity.persistentData.putBoolean('fox_soul', true)
            if (entity?.nbt?.Trusted[0]) {
                let trustPlayer = entity?.nbt?.Trusted[0]
                let playerUuidString = player.stringUuid.split('-').join('')
                let trustPlayerUuidString = ((trustPlayer[0] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[1] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[2] >>> 0).toString(16).padStart(8, '0') + (trustPlayer[3] >>> 0).toString(16)).padStart(8, '0')
                if (trustPlayerUuidString == playerUuidString) {
                    if (Math.random() < 0.3) {
                        entity.setItemSlot('mainhand', Item.of('mrqx_extra_pack:fox_soul'))
                    }
                }
            }
        }
    })
})