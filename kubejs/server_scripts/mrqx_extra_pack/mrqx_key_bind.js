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
        let typeMap = getPlayerChestCavityTypeMap(player)
        let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
        entityList.forEach(entity => {
            if (entity.stringUuid != player.stringUuid) {
                let count = player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.02 * typeMap.get('kubejs:mrqx_celestial_body').length
                if (player.persistentData.organActive == 1) {
                    count *= playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'photosynthesis') ?? 0) / (player.getArmorValue() + 1) * player.persistentData.getInt(warpCount) * 0.1
                }
                entity.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), count)
                entity.invulnerableTime = 0
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

    // 黑洞
    'mrqx_extra_pack:black_hole': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let strength = typeMap.get('kubejs:mrqx_celestial_body').length
        getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16 + strength * 4).forEach(entity => {
            if (entity.getStringUuid() != player.getStringUuid()) {
                entity.move('self', (new Vec3(entity.x - player.x, entity.y - player.y, entity.z - player.z)).scale(strength * -0.05))
            }
        })
    },

    // 白洞
    'mrqx_extra_pack:white_hole': function (event, organ) {
        let player = event.player
        let typeMap = getPlayerChestCavityTypeMap(player)
        let strength = typeMap.get('kubejs:mrqx_celestial_body').length
        getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 16 + strength * 4).forEach(entity => {
            if (entity.getStringUuid() != player.getStringUuid()) {
                entity.move('self', (new Vec3(entity.x - player.x, entity.y - player.y, entity.z - player.z)).scale(strength * 0.05))
            }
        })
    },

    // ‌巧克力铸币机
    'mrqx_extra_pack:chocolate_coinage_machine': function (event, organ) {
        let player = event.player
        let item = player.getMainHandItem()
        if (item.getId() in mrqxCoinToChocolateCoin) {
            let coin = Item.of(mrqxCoinToChocolateCoin[item.getId()])
            coin.setCount(item.getCount())
            player.give(coin)
            item.setCount(0)
        }
    },

    // ‌流星雨引导仪
    'mrqx_extra_pack:meteor_shower_director': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        let manaCost = magicData.getMana()
        let typeMap = getPlayerChestCavityTypeMap(player)
        let count = typeMap.get('kubejs:mrqx_celestial_body').length + mrqxGetComputingPower(player)
        let amplifier = Math.max(Math.sqrt(manaCost), 1) + count * 0.1
        overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'starfall'), amplifier, player, false)
        magicData.setMana(0)
        player.addItemCooldown('mrqx_extra_pack:meteor_shower_director', 20 * 15)
    },

    // “降神”处理器
    'mrqx_extra_pack:seance_cpu': function (event, organ) {
        let player = event.player
        let duration = mrqxGetComputingPower(player) * 5
        let amplifier = Math.floor(mrqxGetComputingPower(player) / 25)
        let effectList = ['kubejs:pardon_of_god_magic', 'kubejs:pardon_of_god_melee', 'kubejs:pardon_of_god_projectile']
        player.getPotionEffects().add(randomGet(effectList), duration, amplifier)
        player.addItemCooldown('mrqx_extra_pack:seance_cpu', 20 * 60 * 10)
    },

    // ‌蒸汽增压引擎
    'mrqx_extra_pack:steam_supercharge_engine': function (event, organ) {
        let player = event.player
        let amplifier = mrqxGetSteamCount(player)
        player.getPotionEffects().add('mrqx_extra_pack:steam_supercharge', 20 * 30, amplifier)
        player.addItemCooldown('mrqx_extra_pack:steam_supercharge_engine', 20 * 60)
    },
}

var assign_organ_player_key_pressed_only = Object.assign(organPlayerKeyPressedOnlyStrategies, mrqxOrganPlayerKeyPressedOnlyStrategies)