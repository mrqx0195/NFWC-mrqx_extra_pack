// priority: 450

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
                entity.invulnerableTime = 0
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
        if (player.getLevel().dimensionType() == 'twilightforest:twilight_forest_type') amplifier *= 1.5
        overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'starfall'), amplifier, player, false)
        magicData.setMana(0)
        player.addItemCooldown('mrqx_extra_pack:meteor_shower_director', 20 * 15)
    },

    // “降神”处理器
    'mrqx_extra_pack:seance_cpu': function (event, organ) {
        let player = event.player
        let duration = mrqxGetComputingPower(player) * 5 * 20
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

    // 扭曲熵变机
    'mrqx_extra_pack:warp_entropy_change_machine': function (event, organ) {
        let player = event.player
        player.persistentData.putBoolean('mrqxWarpEntropyChangeMachineMode', player.persistentData.getBoolean('mrqxWarpEntropyChangeMachineMode') ? false : true)
        player.addItemCooldown('mrqx_extra_pack:warp_entropy_change_machine', 20)
    },

    // 幻魔心脏
    'mrqx_extra_pack:phantom_heart': function (event, organ) {
        let player = event.player
        let resCount = player.persistentData.getInt(resourceCount)
        let warCount = player.persistentData.getInt(warpCount)
        let cooldown = 20 * 10
        if (warCount > 60) {
            let playerChestInstance = player.getChestCavityInstance()
            let typeMap = getPlayerChestCavityTypeMap(player)
            let duration = (playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'strength') ?? 0) + playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'nerves') ?? 0)) * 20
            cooldown += duration * 2
            let amplifier = (typeMap.has('kubejs:flame') ? typeMap.get('kubejs:flame').length : 0) + (typeMap.has('kubejs:warp') ? typeMap.get('kubejs:warp').length : 0) + (typeMap.has('kubejs:mrqx_seaborn') ? typeMap.get('kubejs:mrqx_seaborn').length : 0) + (typeMap.has('kubejs:mrqx_seven_sins') ? typeMap.get('kubejs:mrqx_seven_sins').length : 0)
            player.potionEffects.add('mrqx_extra_pack:demonization_kill', duration * (amplifier + 1), amplifier, false, false)
            updateWarpCount(player, warCount - 60)
        }
        else {
            let count = Math.min(resCount, 40)
            updateResourceCount(player, resCount - count)
            updateWarpCount(player, warCount + count)
        }
        player.addItemCooldown('mrqx_extra_pack:phantom_heart', cooldown)
    },

    // 骑士链锤
    'mrqx_extra_pack:knight_chain_hammer': function (event, organ) {
        let player = event.player
        let item = Item.of('twilightforest:block_and_chain')
        let typeMap = getPlayerChestCavityTypeMap(player)
        if (typeMap.has('kubejs:mrqx_knight')) {
            let count = typeMap.get('kubejs:mrqx_knight').length
            item = item.enchant('twilightforest:destruction', Math.floor(count / 3))
            item = item.enchant('minecraft:sharpness', Math.floor(count / 1.5))
        }
        let entity = new $mrqxChainBlock($mrqxTFEntities.CHAIN_BLOCK.get(), player.level, player, 'main_hand', item)
        entity.spawn()
        item.getOrCreateTag().putUUID('chainEntity', entity.getUuid())
        player.addItemCooldown('mrqx_extra_pack:knight_chain_hammer', 20)
    },

    // 龙皇核心
    'mrqx_extra_pack:core_of_dragon_emperor': function (event, organ) {
        let player = event.player
        let resCount = player.persistentData.getInt(resourceCount)
        let typeMap = getPlayerChestCavityTypeMap(player)
        let duration = 0
        if (typeMap.has('kubejs:dragon')) {
            duration += typeMap.get('kubejs:dragon').length * 30 * 20
        }
        if (typeMap.has('kubejs:rose')) {
            duration += typeMap.get('kubejs:rose').length * 30 * 20
        }
        if (duration > 0) {
            player.potionEffects.add((resCount >= 50) ? 'mrqx_extra_pack:dragon_emperor_passion' : 'mrqx_extra_pack:dragon_emperor_brilliant', duration, 0, false, false)
            player.addItemCooldown('mrqx_extra_pack:core_of_dragon_emperor', 360 * 20)
        }
    },

    // 梅吉多
    'mrqx_extra_pack:meijiduo': function (event, organ) {
        let player = event.player
        let instance = player.getChestCavityInstance()
        let oldItem = instance.inventory.getItem(organ.Slot)
        if (!oldItem.getOrCreateTag().getCompound('organData')) return
        let b = true
        mrqxAllOrganScore.forEach(os => {
            let count = oldItem.getOrCreateTag().getCompound('organData').get(os)
            if (count && (os == 'chestcavity:freezing_point' ? (count > -10) : (count < 10))) b = false
        })
        if (b) {
            mrqxAllOrganScore.forEach(os => {
                let count = oldItem.getOrCreateTag().getCompound('organData').get(os)
                if (count) {
                    newItem.getOrCreateTag().getCompound('organData').put(os, count - (os == 'chestcavity:freezing_point' ? -10 : 10))
                }
            })
            player.inventory.allItems.forEach(item => {
                if (item.id == "minecraft:enchanted_book") {
                    item.getEnchantments().forEach((id, lvl) => {
                        lvl += 1
                    })
                }
            })
        }
    },
}

var assign_organ_player_key_pressed_only = Object.assign(organPlayerKeyPressedOnlyStrategies, mrqxOrganPlayerKeyPressedOnlyStrategies)