/**
 * 主动策略
 * @constant
 * @type {Object<string,function(Internal.NetworkEventJS, organ):void>}
 */
const mrqxOrganPlayerKeyPressedOnlyStrategies = {
    // 暗日种子
    'mrqx_extra_pack:dark_sun_seed': function (event, organ) {
        let player = event.player
        let playerChestInstance = player.getChestCavityInstance()
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
        entityList.forEach(entity => {
            if (entity.stringUuid != player.stringUuid) {
                if (player.persistentData.organActive == 1) {
                    entity.attack(player, playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) / (player.getArmorValue() + 1) * 3)
                    entity.invulnerableTime = 0
                }
                else {
                    entity.attack(player, 1)
                    entity.invulnerableTime = 0
                }
            }
        })
    }
}

var assign1 = Object.assign(organPlayerKeyPressedOnlyStrategies, mrqxOrganPlayerKeyPressedOnlyStrategies);