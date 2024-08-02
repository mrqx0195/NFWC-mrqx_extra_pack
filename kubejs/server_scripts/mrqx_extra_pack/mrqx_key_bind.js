// priority: 9

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
    },

    // 幽匿咆哮体
    'mrqx_extra_pack:sculk_growler': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        let manaCost = magicData.getMana()
        let count = mrqxGetSculkCount(player)
        let amplifier = Math.max(Math.sqrt(manaCost), 1) + count * 0.1
        overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'sonic_boom'), amplifier, player, false)
        magicData.setMana(0)
        player.addItemCooldown('mrqx_extra_pack:sculk_growler', 20 * 25 / Math.max(count * 0.1, 1))
    },
}

var assign_organ_player_key_pressed_only = Object.assign(organPlayerKeyPressedOnlyStrategies, mrqxOrganPlayerKeyPressedOnlyStrategies);