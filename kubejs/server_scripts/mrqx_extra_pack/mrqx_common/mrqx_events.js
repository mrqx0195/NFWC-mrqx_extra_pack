// priority: 499

// 肿瘤诱变剂
ItemEvents.foodEaten('mrqx_extra_pack:tumor_mutagen', event => {
    let entity = event.entity
    if (event.level.isClientSide()) return
    if (!entity.isPlayer()) return
    let instance = entity.getChestCavityInstance()
    let tumorList = getPlayerChestCavityItemMap(entity).get('kubejs:random_tumor')
    if (tumorList && tumorList.length <= 0) {
        return
    }
    let organTumor = randomGet(tumorList)
    let index = organTumor.getInt('Slot')
    let item = instance.inventory.getItem(index)
    let tumor = Item.of('mrqx_extra_pack:malignant_tumor', { organData: {} })
    if (index > 0 && item.hasNBT()) {
        let itemData = item.nbt.organData
        let organData = tumor.nbt.organData
        itemData.allKeys.forEach(key => {
            organData[key] = itemData[key] * 1.5
        })
        tumor.nbt.put('organData', organData)
        instance.inventory.setItem(index, tumor)
        global.initChestCavityIntoMap(entity, false)
        if (entity.persistentData.contains(organActive) &&
            entity.persistentData.getInt(organActive) == 1) {
            global.updatePlayerActiveStatus(entity)
        }
    }
    return
})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['#tetra:forged_ruins'], false)
        .addLoot(LootEntry.of('mrqx_extra_pack:basic_uncoded_cpu').when((c) => c.randomChance(0.2)))
        .addLoot(LootEntry.of('mrqx_extra_pack:advanced_uncoded_cpu').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('mrqx_extra_pack:worn_out_steam_engine').when((c) => c.randomChance(0.3)))
})

// 核能检测
PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 5 != 0) return
    if (event.level.isClientSide()) return
    if (event.getServer().getTickCount() <= (mrqxGetLoggedInTime(player) + 6)) {
        return
    }
    let playerChest = getPlayerChestCavityItemMap(player)
    if (player.hasEffect('mrqx_extra_pack:nuclear_power') && !playerChest.has("mrqx_extra_pack:fission_reactor")) {
        player.getServer().runCommandSilent('playsound minecraft:entity.generic.explode player @a ' + player.x + ' ' + player.y + ' ' + player.z)
        event.level.spawnParticles('minecraft:explosion', true, player.x, player.y + 1, player.z, 1, 1, 1, 10, 0.5)
        let explosion = event.player.block.createExplosion()
        let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
        let amplifier = effect.getAmplifier()
        let duration = effect.getDuration()
        explosion.strength(amplifier * (duration / 1200 + 1))
        player.attack(amplifier * (duration / 1200 + 1))
        explosion.causesFire(true)
        explosion.explode()
        player.removeEffect('mrqx_extra_pack:nuclear_power')
        /*let effectCloud = event.level.createEntity('minecraft:area_effect_cloud')
        effectCloud.setNbt('{Radius:5,Duration:2147483640,RadiusOnUse:-0.000001f,RadiusPerTick:-0.000001f,potion_contents:{custom_effects:[{amplifier:4b,duration:6000,id:"minecraft:wither"},{amplifier:1b,duration:1,id:"minecraft:instant_damage"}]},ReapplicationDelay:20,WaitTime:1}')
        effectCloud.setPosition(player.x, player.y, player.z)
        effectCloud.spawn()*/
    }
})

// 灵狐之魂获取
PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 5 != 0) return
    if (event.level.isClientSide()) return
    let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
    if (entityList.length < 1) return
    entityList.forEach(entity => {
        if (entity.getEncodeId() == 'minecraft:fox' && !entity.persistentData.getBoolean('mrqx_fox_soul')) {
            entity.persistentData.putBoolean('mrqx_fox_soul', true)
            if (entity?.nbt?.Trusted && entity?.nbt?.Trusted[0]) {
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

// 永恒灵魂之翼检测
PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 5 != 0) return
    if (event.level.isClientSide()) return
    if (!player.getPersistentData().getBoolean('mrqxEternalWingOfSoul')) {
        return
    }
    if (event.getServer().getTickCount() <= (mrqxGetLoggedInTime(player) + 6)) {
        return
    }
    player.onUpdateAbilities()
    let playerChest = getPlayerChestCavityItemMap(player)
    if (!playerChest.has('mrqx_extra_pack:eternal_wing_of_soul')) {
        player.abilities.mayfly = false
        player.abilities.flying = false
        player.onUpdateAbilities()
        player.getPersistentData().putBoolean('mrqxEternalWingOfSoul', false)
    }
    else {
        player.abilities.mayfly = true
        player.onUpdateAbilities()
    }
})

// 觉知巨镰右键
ItemEvents.rightClicked('mrqx_extra_pack:sentient_greatscythe', event => {
    let player = event.player
    if (!player) return
    if (event.level.isClientSide()) return
    if (player.getCooldowns().isOnCooldown(Item.of('mrqx_extra_pack:sentient_greatscythe'))) {
        return
    }
    player.addItemCooldown('mrqx_extra_pack:sentient_greatscythe', 20)
    let amplifier = player.getAttributeTotalValue('minecraft:generic.attack_damage')
    overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'blood_slash'), amplifier, player, false)
})

// 贤者宝典每刻
PlayerEvents.tick(event => {
    let player = event.player
    if (!player) return
    if (player.age % 5 != 0) return
    if (event.level.isClientSide()) return
    if (event.getServer().getTickCount() <= (mrqxGetLoggedInTime(player) + 6)) {
        return
    }
    if (player.getCooldowns().isOnCooldown(Item.of('mrqx_extra_pack:sages_book'))) {
        return
    }
    let curiosSagesBookItems = mrqxGetCurioInfo(player, 'mrqx_extra_pack:sages_book')
    if (curiosSagesBookItems.hasItem) {
        let magicData = getPlayerMagicData(player)
        if (magicData.getMana() < player.getAttributeTotalValue('irons_spellbooks:max_mana') * 0.1) {
            magicData.setMana(player.getAttributeTotalValue('irons_spellbooks:max_mana') - magicData.getMana())
            player.addItemCooldown('mrqx_extra_pack:sages_book', 20 * 10)
        }
    }
})

// 贤者宝典施法
PlayerEvents.spellOnCast(event => {
    let player = event.player
    if (!player) return
    if (event.level.isClientSide()) return
    let curiosSagesBookItems = mrqxGetCurioInfo(player, 'mrqx_extra_pack:sages_book')
    if (curiosSagesBookItems.hasItem) {
        let magicData = getPlayerMagicData(player)
        event.setSpellLevel(event.getSpellLevel() + Math.sqrt(Math.abs((player.getAttributeTotalValue('irons_spellbooks:max_mana') - magicData.getMana()) - magicData.getMana())))
    }
})

// ‌无尽之力容器右键
ItemEvents.rightClicked('mrqx_extra_pack:infinity_force_container', event => {
    let itemstack = event.getItem()
    /** @type {Internal.ServerPlayer} */
    let player = event.entity
    if (!player.isPlayer()) return
    if (itemstack.getNbt() && itemstack.nbt.getCompound('mrqxInfinityForceContainerCountList')) {
        let countList = itemstack.nbt.getCompound('mrqxInfinityForceContainerCountList') ?? mrqxGetEmptyCompound()
        let forgeTimes = ((countList.getInt('max') ?? 0) == 0 ? 1 : (countList.getInt('max') ?? 0)) - 1
        if (forgeTimes == 0 && (countList.getByte((0).toFixed(1)) ?? 0) == 0) return
        countList.putByte(forgeTimes.toFixed(1), (countList.getByte(forgeTimes.toFixed(1)) ?? 1) - 1)
        let i = countList.getInt('max') ?? 0
        countList.putInt('max', 0)
        while (i >= 0) {
            if ((countList.getByte(i.toFixed(1)) ?? 0) > 0) {
                countList.putInt('max', i + 1)
                break
            }
            i--
        }
        itemstack.nbt.put('mrqxInfinityForceContainerCountList', countList)
        let itemstack1 = Item.of('kubejs:infinity_force')
        itemstack1.setNbt({})
        itemstack1.nbt.putInt('forgeTimes', forgeTimes)
        player.getServer().scheduleInTicks(1, () => {
            player.give(itemstack1)
        })
    }
})

// ‌（Luna's联动）堕乐园容器右键
if (Utils.getRegistries().items().contains('luna_flesh_reforged:fallen_paradise')) {
    ItemEvents.rightClicked('mrqx_extra_pack:fallen_paradise_container', event => {
        let itemstack = event.getItem()
        /** @type {Internal.ServerPlayer} */
        let player = event.entity
        if (!player.isPlayer()) return
        if (itemstack.getNbt() && itemstack.nbt.getCompound('mrqxInfinityForceContainerCountList')) {
            let countList = itemstack.nbt.getCompound('mrqxInfinityForceContainerCountList') ?? mrqxGetEmptyCompound()
            let forgeTimes = ((countList.getInt('max') ?? 0) == 0 ? 1 : (countList.getInt('max') ?? 0)) - 1
            if (forgeTimes == 0 && (countList.getByte((0).toFixed(1)) ?? 0) == 0) return
            countList.putByte(forgeTimes, (countList.getByte(forgeTimes.toFixed(1)) ?? 1) - 1)
            let i = countList.getInt('max') ?? 0
            countList.putInt('max', 0)
            while (i >= 0) {
                if ((countList.getByte(i.toFixed(1)) ?? 0) > 0) {
                    countList.putInt('max', i + 1)
                    break
                }
                i--
            }
            let itemstack1 = Item.of('mrqx_extra_pack:infinity_force_container')
            itemstack1.setNbt({})
            itemstack1.nbt.put('mrqxInfinityForceContainerCountList', countList)
            itemstack.shrink(1)
            player.getServer().scheduleInTicks(1, () => {
                player.give(itemstack1)
            })
            let itemstack2 = Item.of('luna_flesh_reforged:fallen_paradise')
            itemstack2.setNbt({})
            itemstack2.nbt.putInt('forgeTimes', forgeTimes)
            player.getServer().scheduleInTicks(1, () => {
                player.give(itemstack2)
            })
        }
    })
}

// 薄荷奶茶
ItemEvents.foodEaten('mrqx_extra_pack:mint_milk_tea', event => {
    let entity = event.entity
    if (event.level.isClientSide()) return
    if (!entity.isPlayer()) return
    mrqxElementDamageTypes.forEach(type => {
        if ((entity.persistentData.getInt("mrqx_" + type + "_damage") ?? 0) > 0) {
            entity.persistentData.putInt("mrqx_" + type + "_damage", 0)
        }
        else {
            entity.persistentData.putInt("mrqx_" + type + "_damage", Math.max((entity.persistentData.getInt("mrqx_" + type + "_damage") ?? 0) - 100, -1000))
        }
    })
    return
})

/**
 * 处理玩家登录时间
 */
PlayerEvents.loggedIn(event => {
    let player = event.player
    let uuid = String(player.getUuid())
    mrqxPlayerLoginTime.set(uuid, event.getServer().getTickCount())
})

ServerEvents.tags('minecraft:entity_type', event => {
    event.add('mrqx_extra_pack:crone', ['goety:crone'])
})

// 销汀·桉柏
ItemEvents.foodEaten('mrqx_extra_pack:xiao_amburm', event => {
    let entity = event.entity
    if (event.level.isClientSide()) return
    if (!entity.isPlayer()) return
    updateWarpCount(entity, entity.persistentData.getInt(warpCount) + 44)
})

// 绿宝石镐之魂
BlockEvents.broken(event => {
    /** @type {Special.BlockTag[]} */
    let tagList = ['twilightforest:mazestone', 'twilightforest:castle_blocks']
    let b = true
    tagList.forEach(tag => {
        if (event.block.hasTag(tag)) {
            b = false
        }
    })
    if (b || Math.random() < 0.99) {
        return
    }
    event.block.popItem('mrqx_extra_pack:soul_of_emerald_pickaxe')
})
