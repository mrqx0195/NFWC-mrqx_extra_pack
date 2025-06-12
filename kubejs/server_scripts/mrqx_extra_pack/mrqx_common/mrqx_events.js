// priority: 450

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

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(["#minecraft:village"], false)
        .apply(ctx => {
            if (Math.random() < 0.01) {
                let item = Item.of('mrqx_extra_pack:meijiduo', { organData: {} })
                mrqxAllOrganScore.forEach(os => {
                    if (os == 'chestcavity:freezing_point') {
                        item.nbt.organData.put(os, Math.floor(-Math.random() * 10))
                    }
                    else {
                        item.nbt.organData.put(os, Math.floor(Math.random() * 10))
                    }
                })
                ctx.addLoot(item)
            }
        })
})

// 核能检测
PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 5 != 0) return
    if (event.level.isClientSide()) return
    if (event.getServer().getTickCount() <= (mrqxGetPlayerNonPersistentData(player, 'loginTime') + 6)) {
        return
    }
    let playerChest = getPlayerChestCavityItemMap(player)
    if (player.hasEffect('mrqx_extra_pack:nuclear_power') && !playerChest.has("mrqx_extra_pack:fission_reactor")) {
        player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.generic.explode', player.getSoundSource(), 1, 1)
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
    if (event.getServer().getTickCount() <= (mrqxGetPlayerNonPersistentData(player, 'loginTime') + 6)) {
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
    if (event.getServer().getTickCount() <= (mrqxGetPlayerNonPersistentData(player, 'loginTime') + 6)) {
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

// 处理玩家登录时间
PlayerEvents.loggedIn(event => {
    let player = event.player
    mrqxSetPlayerNonPersistentData(player, 'loginTime', event.getServer().getTickCount())
})

ServerEvents.tags('minecraft:entity_type', event => {
    event.add('mrqx_extra_pack:crone', ['goety:crone'])
    event.add('mrqx_extra_pack:modern_remnant', ["cataclysm:modern_remnant"])
})

// 销汀·桉柏
ItemEvents.foodEaten('mrqx_extra_pack:xiao_amburm', event => {
    let entity = event.entity
    if (event.level.isClientSide()) return
    if (!entity.isPlayer()) return
    updateWarpCount(entity, entity.persistentData.getInt(warpCount) + entity.persistentData.getInt(warpCountMax) * 0.44)
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

// 销汀·桉柏
PlayerEvents.tick(event => {
    let player = event.player
    if (!player) return
    if (player.age % (20 * 1) != 0) return
    if (event.level.isClientSide()) return
    if (player.age < (mrqxGetPlayerNonPersistentData(player, 'xiaoAmburmTalkNextTick') ?? 0)) return
    /** @type {Internal.Inventory} */
    let inventory = player.inventory
    if (inventory.hasAnyMatching(item => item.id == 'mrqx_extra_pack:xiao_amburm')) {
        player.tell($mrqxSerializer.fromJsonLenient({ "translate": "mrqx_extra_pack.msg.xiao_amburm.0", "with": [{ "translate": `mrqx_extra_pack.msg.xiao_amburm.${Math.floor(Math.random() * 22 + 1)}` }] }))
        mrqxSetPlayerNonPersistentData(player, 'xiaoAmburmTalkNextTick', player.age + 20 * (30 + Math.random() * 150))
    }
})

// 学者奥秘·超魔之书
MoreJSEvents.enchantmentTableChanged(event => {
    let player = event.player
    if (!player) return
    /** @type {Internal.Inventory} */
    let inventory = player.inventory
    if (!inventory.hasAnyMatching(item => item.id == 'mrqx_extra_pack:book_of_over_enchantment')) return
    let typeMap = getPlayerChestCavityTypeMap(player)
    if (typeMap.has('kubejs:enchant_only')) {
        typeMap.get('kubejs:enchant_only').forEach(organ => {
            organPlayerEnchantOnlyStrategies[organ.id](event, organ)
        })
    }
    if (typeMap.has('kubejs:enchant')) {
        typeMap.get('kubejs:enchant').forEach(organ => {
            organPlayerEnchantStrategies[organ.id](event, organ)
        })
    }
    if (!player.getMainHandItem().getId() == 'mrqx_extra_pack:book_of_over_enchantment') return
    slotList.forEach(slot => {
        let enchantSlot = event.get(slot)
        let level = Math.min(enchantSlot.getRequiredLevel(), player.getXpLevel())
        let addLevel = 0
        if (level <= 0) return
        let needEnchantList = []
        enchantSlot.removeEnchantments((/** @type {Internal.Enchantment} */enchantment, lvl) => {
            if (enchantment.getId() in curseEnchantList) {
                addLevel += lvl
                return false
            }
            needEnchantList.push({ enchant: enchantment, level: lvl })
            return true
        })
        if (needEnchantList.length <= 0) return
        let arr = mrqxGenerateRandomArray(level, needEnchantList.length)
        let i = 0
        needEnchantList.forEach(needEnchant => {
            enchantSlot.addEnchantment(needEnchant.enchant, needEnchant.level + arr[i])
            addLevel += needEnchant.level + arr[i]
            i++
        })
        enchantSlot.setRequiredLevel(enchantSlot.getRequiredLevel() + addLevel)
        enchantSlot.updateClue()
    })
})

// Tetra掉落策略
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
        .apply(event => {
            if (!(event.killerEntity && event.killerEntity.isPlayer())) {
                return
            }
            let player = event.killerEntity
            getItemEffectsInBothHands(player).forEach(itemEffectRes => {
                if (mrqxTetraEffectPlayerEntityLootStrategies[itemEffectRes.itemEffect.getKey()]) {
                    mrqxTetraEffectPlayerEntityLootStrategies[itemEffectRes.itemEffect.getKey()](event, itemEffectRes)
                }
            })
        })

    // event.addLootTypeModifier(LootType.CHEST)
    //     .apply(event => {
    //         let player = event.player
    //         if (!player) { return }
    //         getItemEffectsInBothHands(player).forEach(itemEffectRes => {
    //             if (mrqxTetraEffectPlayerChestLootStrategies[itemEffectRes.itemEffect.getKey()]) {
    //                 mrqxTetraEffectPlayerChestLootStrategies[itemEffectRes.itemEffect.getKey()](event, itemEffectRes)
    //             }
    //         })
    //     })
})

// 灿芒之星
PlayerEvents.tick(event => {
    if (event.level.isClientSide()) return
    let player = event.player
    if (player.getUseItem().id == 'mrqx_extra_pack:radiant_star') {
        /** @type {Internal.ServerLevelData} */
        let levelData = event.level.levelData
        levelData.setGameTime(levelData.getGameTime() + 60 - 1)
        levelData.setDayTime(levelData.getDayTime() + 60 - 1)
    }
})

// 无尽煲-食物食用
ItemEvents.foodEaten(event => {
    let curiosUltimateStewItems = mrqxGetCurioInfo(event.entity, 'mrqx_extra_pack:ultimate_stew')
    if (curiosUltimateStewItems.hasItem) {
        for (let i = 0; i < curiosUltimateStewItems.count; i++) {
            let item = curiosUltimateStewItems.stacks[i]
            let nbt = item.getOrCreateTag()
            if (!nbt.contains("mrqxFoodLevel")) nbt.putInt("mrqxFoodLevel", event.getItem().getItem().getFoodProperties().getNutrition())
            else nbt.putInt("mrqxFoodLevel", nbt.getInt("mrqxFoodLevel") + event.getItem().getItem().getFoodProperties().getNutrition())
            if (!nbt.contains("mrqxSaturation")) nbt.putInt("mrqxSaturation", event.getItem().getItem().getFoodProperties().getNutrition() * event.getItem().getItem().getFoodProperties().getSaturationModifier() * 2)
            else nbt.putInt("mrqxSaturation", nbt.getInt("mrqxSaturation") + event.getItem().getItem().getFoodProperties().getNutrition() * event.getItem().getItem().getFoodProperties().getSaturationModifier() * 2)
            if (!nbt.contains("mrqxFoodEffect")) nbt.put("mrqxFoodEffect", [])
            /** @type {Internal.ListTag} */
            let list = nbt.get("mrqxFoodEffect")
            if (!list.contains(event.getItem().getId())) {
                let newList = [event.getItem().getId()]
                list.forEach(str => newList.push(str.getAsString()))
                nbt.put("mrqxFoodEffect", newList)
            }
        }
    }
})

// 无尽煲-使用
PlayerEvents.tick(event => {
    if (event.level.isClientSide()) return
    let player = event.player
    if (player.getUseItem().id == 'mrqx_extra_pack:ultimate_stew') {
        let nbt = player.getUseItem().getOrCreateTag()
        if (nbt.getInt("mrqxFoodLevel") && nbt.getInt("mrqxFoodLevel") > 0 && player.getFoodLevel() < 20) {
            nbt.putInt("mrqxFoodLevel", nbt.getInt("mrqxFoodLevel") - 1)
            player.setFoodLevel(Math.min(player.getFoodLevel() + 1, 20))
        }
        if (nbt.getInt("mrqxSaturation") && nbt.getInt("mrqxSaturation") > 0 && player.getSaturation() < player.getFoodLevel()) {
            nbt.putInt("mrqxSaturation", nbt.getInt("mrqxSaturation") - 1)
            player.setSaturation(Math.min(player.getSaturation() + 1, player.getFoodLevel()))
        }
    }
})

// 原子分解机
BlockEvents.broken(event => {
    /** @type {Internal.ServerPlayer} */
    let player = event.player
    if (!player || event.level.isClientSide()) return
    if (player.getMainHandItem().id == 'mrqx_extra_pack:atomic_disassembler') {
        if (event.block.item.hasTag('forge:stone')) {
            if (!player.getCooldowns().isOnCooldown(Item.of('mrqx_extra_pack:atomic_disassembler'))) {
                player.addItemCooldown('mrqx_extra_pack:atomic_disassembler', 2)
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        for (let k = -1; k <= 1; k++) {
                            let block = event.block.level.getBlock(event.block.x + i, event.block.y + j, event.block.z + k)
                            if (block.item.hasTag('forge:stone')) {
                                event.server.scheduleInTicks(1, event => {
                                    player.gameMode.destroyBlock(block.pos)
                                })
                            }
                        }
                    }
                }
            }
        }
        event.server.scheduleInTicks(1, event => {
            let item = player.getMainHandItem()
            let playerResourceCount = player.persistentData.getInt(resourceCount) ?? 0
            if (playerResourceCount > 0) {
                let count = Math.min(playerResourceCount, item.getDamageValue())
                item.setDamageValue(item.getDamageValue() - count)
                updateResourceCount(player, playerResourceCount - count)
            }
        })
    }
})

// 原子分解机
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.BLOCK)
        .apply((ctx) => {
            let player = ctx.getPlayer()
            if (!player || ctx.level.isClientSide()) return
            if (player.getMainHandItem().id == 'mrqx_extra_pack:atomic_disassembler') {
                let block = ctx.destroyedBlock
                if (block && block.item.hasTag('forge:ores')) {
                    ctx.forEachLoot(itemStack => {
                        itemStack.setCount(itemStack.getCount() * 5)
                    })
                }
            }
        })
})

/**
 * 原子分解机造成伤害
 * @param {Internal.LivingDamageEvent} event
 */
function mrqxAtomicDisassemblerDamage(event) {
    let player = event.source.player
    if (!player || player.level.isClientSide()) return
    let damage = event.amount
    if (damage >= 1024) {
        player.give(Item.of('kubejs:rare_mineral_cluster').withCount(Math.max(Math.floor(65 - 1024 / damage), 1)))
    }
    player.give(Item.of('kubejs:common_mineral_cluster').withCount(Math.max(Math.floor(65 - 64 / damage), 1)))
}

// 存档点
ItemEvents.rightClicked("mrqx_extra_pack:save_point", event => {
    /** @type {Internal.ServerPlayer} */
    let player = event.player
    if (!player || player.level.isClientSide()) return
    player.setRespawnPosition(player.level.dimensionTypeId(), player.block.pos, player.yRot, true, true)
    player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'mrqx_extra_pack:save', player.getSoundSource(), 0.5, 1)
})

// 过去之章 & 未来之章
PlayerEvents.tick(event => {
    if (event.level.isClientSide()) return
    let player = event.player
    let visible = (player.getUseItem().id == 'mrqx_extra_pack:page_of_past' || player.getUseItem().id == 'mrqx_extra_pack:page_of_future')
    if (visible) {
        if (player.getUseItem().getOrCreateTag().hasUUID('owner')) {
            if (UUID.toString(player.getUseItem().getOrCreateTag().getUUID('owner')) != UUID.toString(player.getUuid())) return
        }
        else player.getUseItem().getOrCreateTag().putUUID('owner', player.getUuid())
    }
    let unlock = mrqxIsMysteryQuestUnlocked(player)
    let time = player.ticksUsingItem
    let is_past = (player.getUseItem().id == 'mrqx_extra_pack:page_of_past')
    let quests = mrqxGetMysteryQuests(player, is_past)
    let stage = 0
    quests.forEach((value, index, array) => {
        if (value) {
            stage++
        }
    })
    player.getUseItem().getOrCreateTag().putInt('mrqx_quest', stage)

    player.sendData('mrqx_mq_sync', {
        unlock: mrqxIsMysteryQuestUnlocked(player),
    })

    let paintElement = {
        mrqx99: {
            type: 'rectangle',
            x: 0,
            y: 0,
            w: `$screenW`,
            h: `$screenH`,
            alignX: 'center',
            alignY: 'center',
            texture: 'mrqx_extra_pack:textures/gui/background.png',
            color: `#${Math.min(Math.max(time, 2) * 9, 191).toString(16).toUpperCase()}FFFFFF`,
            visible: visible && unlock
        },
        mrqx100: {
            type: 'rectangle',
            x: 0,
            y: 0,
            w: `$screenW`,
            h: `$screenW/0.9235`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/background${stage}.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: (stage > 0) && visible && unlock
        },

        // 重复段别用foreach，也别用for，总之别用循环，否则会炸
        mrqx0: {
            type: 'rectangle',
            x: `-$screenH/6`,
            y: `-$screenH/6`,
            w: `$screenH/6`,
            h: `$screenH/6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/line0.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible && !quests[0] && unlock
        },
        mrqx1: {
            type: 'rectangle',
            x: `$screenH/6`,
            y: `-$screenH/6`,
            w: `$screenH/6`,
            h: `$screenH/6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/line1.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible && !quests[1] && unlock
        },
        mrqx2: {
            type: 'rectangle',
            x: `-$screenH/6`,
            y: `$screenH/6`,
            w: `$screenH/6`,
            h: `$screenH/6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/line2.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible && !quests[2] && unlock
        },
        mrqx3: {
            type: 'rectangle',
            x: `$screenH/6`,
            y: `$screenH/6`,
            w: `$screenH/6`,
            h: `$screenH/6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/line3.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible && !quests[3] && unlock
        },
        mrqx4: {
            type: 'rectangle',
            x: `-$screenH/4`,
            y: `-$screenH/4`,
            w: `$screenH/16`,
            h: `$screenH/16`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/${quests[0] ? 'numeric_complete' : 'numeric'}.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx5: {
            type: 'rectangle',
            x: `$screenH/4`,
            y: `-$screenH/4`,
            w: `$screenH/16`,
            h: `$screenH/16`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/${quests[1] ? 'numeric_complete' : 'numeric'}.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx6: {
            type: 'rectangle',
            x: `-$screenH/4`,
            y: `$screenH/4`,
            w: `$screenH/16`,
            h: `$screenH/16`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/${quests[2] ? 'numeric_complete' : 'numeric'}.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx7: {
            type: 'rectangle',
            x: `$screenH/4`,
            y: `$screenH/4`,
            w: `$screenH/16`,
            h: `$screenH/16`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/${quests[3] ? 'numeric_complete' : 'numeric'}.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx8: {
            type: 'rectangle',
            x: `-$screenH*5/12`,
            y: `-$screenH*5/16`,
            w: `$screenH/16*5.76`,
            h: `$screenH/16*0.6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/label.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx9: {
            type: 'rectangle',
            x: `$screenH*5/12`,
            y: `-$screenH*5/16`,
            w: `$screenH/16*5.76`,
            h: `$screenH/16*0.6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/label.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx10: {
            type: 'rectangle',
            x: `-$screenH*5/12`,
            y: `$screenH*5/16`,
            w: `$screenH/16*5.76`,
            h: `$screenH/16*0.6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/label.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx11: {
            type: 'rectangle',
            x: `$screenH*5/12`,
            y: `$screenH*5/16`,
            w: `$screenH/16*5.76`,
            h: `$screenH/16*0.6`,
            alignX: 'center',
            alignY: 'center',
            texture: `mrqx_extra_pack:textures/gui/label.png`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}FFFFFF`,
            visible: visible
        },
        mrqx12: {
            type: 'text',
            x: `-$screenH*5/12`,
            y: `-$screenH*0.311`,
            alignX: 'center',
            alignY: 'center',
            text: `{"translate": "mrqx_extra_pack.text.quest_${is_past ? 'past' : 'future'}.0", "strikethrough": ${quests[0] ? 'true' : 'false'}, "obfuscated": ${!unlock ? 'true' : 'false'}}`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}${quests[0] ? '777777' : 'FFFFFF'}`,
            centered: false,
            visible: visible
        },
        mrqx13: {
            type: 'text',
            x: `$screenH*5/12`,
            y: `-$screenH*0.311`,
            alignX: 'center',
            alignY: 'center',
            text: `{"translate": "mrqx_extra_pack.text.quest_${is_past ? 'past' : 'future'}.1", "strikethrough": ${quests[1] ? 'true' : 'false'}, "obfuscated": ${!unlock ? 'true' : 'false'}}`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}${quests[1] ? '777777' : 'FFFFFF'}`,
            centered: false,
            visible: visible
        },
        mrqx14: {
            type: 'text',
            x: `-$screenH*5/12`,
            y: `$screenH*0.314`,
            alignX: 'center',
            alignY: 'center',
            text: `{"translate": "mrqx_extra_pack.text.quest_${is_past ? 'past' : 'future'}.2", "strikethrough": ${quests[2] ? 'true' : 'false'}, "obfuscated": ${!unlock ? 'true' : 'false'}}`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}${quests[2] ? '777777' : 'FFFFFF'}`,
            centered: false,
            visible: visible
        },
        mrqx15: {
            type: 'text',
            x: `$screenH*5/12`,
            y: `$screenH*0.314`,
            alignX: 'center',
            alignY: 'center',
            text: `{"translate": "mrqx_extra_pack.text.quest_${is_past ? 'past' : 'future'}.3", "strikethrough": ${quests[3] ? 'true' : 'false'}, "obfuscated": ${!unlock ? 'true' : 'false'}}`,
            color: `#${Math.min(Math.max(time, 2) * 9, 255).toString(16).toUpperCase()}${quests[3] ? '777777' : 'FFFFFF'}`,
            centered: false,
            visible: visible
        },
    }
    player.paint(paintElement)
})

PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 20 != 0) return
    if (event.level.isClientSide()) return
    if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_past_3")) return
    let b = true
    let set = new Set()
    for (let i = 0; i < 9; i++) {
        let item = player.getInventory().getStackInSlot(i)
        if (item.isEmpty() || set.has(item.id.hashCode()) || (item.getCount() % 2 != 1) || (!item.hasTag("forge:glass") && !item.hasTag("forge:glass_panes") && !item.hasTag("forge:stained_glass") && !item.hasTag("forge:stained_glass_panes"))) {
            b = false
            break
        }
        set.add(item.id.hashCode())
    }
    if (b && set.size == 9) player.stages.add("mrqx_past_3")
})

PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 20 != 0) return
    if (event.level.isClientSide()) return
    if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_future_0")) return
    if (player.block.pos.distToCenterSqr(player.level.getSharedSpawnPos().x, player.level.getSharedSpawnPos().y, player.level.getSharedSpawnPos().z) < 100) player.stages.add("mrqx_future_0")
})

PlayerEvents.tick(event => {
    let player = event.player
    if (player.age % 20 != 0) return
    if (event.level.isClientSide()) return
    if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_future_2")) return
    let ray = player.rayTrace(100)
    if (ray.block && ray.block.getId() == "minecraft:end_portal") {
        let tick = player.getPersistentData().getLong('mrqx_ftr2_tick') ?? 0
        if (tick >= 1200) {
            player.stages.add("mrqx_future_2")
            player.getPersistentData().remove('mrqx_ftr2_tick')
        }
        else {
            player.getPersistentData().putLong('mrqx_ftr2_tick', tick + 1)
        }
    }
    else {
        player.getPersistentData().remove('mrqx_ftr2_tick')
    }
})

EntityEvents.death('minecraft:player', event => {
    /** @type {Internal.ServerPlayer} */
    let player = event.player
    let entity = event.source.actual
    if (!player) return
    if (event.level.isClientSide()) return
    if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_past_2")) return
    if (entity.getHealth() > entity.getMaxHealth() * 0.02) return
    if (!mrqxBossTypeList.find((value) => (value == entity.getType()))) return
    player.stages.add("mrqx_past_2")
    if (event.level.levelData.isHardcore()) {
        player.setHealth(player.maxHealth)
        player.setFoodLevel(20)
        player.setSaturation(5)
        player.potionEffects.clear()
        player.teleportTo(player.getRespawnDimension(), player.getRespawnPosition().x, player.getRespawnPosition().y, player.getRespawnPosition().z, player.yRot, player.xRot)
        event.cancel()
    }
})

BlockEvents.rightClicked("minecraft:jukebox", event => {
    let player = event.player
    if (!player) return
    if (event.level.isClientSide()) return
    if (event.level.levelData.getDayTime() % 24000 > 60) return
    if (!mrqxIsMysteryQuestUnlocked(player) || player.stages.has("mrqx_past_1")) return
    /** @type {Internal.JukeboxBlockEntity} */
    let blockEntity = event.level.getBlockEntity(event.getBlock().pos)
    if (blockEntity && blockEntity['getRecord'] && blockEntity.getRecord().isEmpty()) {
        event.server.scheduleInTicks(2, () => {
            if (!blockEntity.getRecord().isEmpty()) {
                player.stages.add("mrqx_past_1")
            }
        })
    }
})

// Sakuya的冰淇淋
ItemEvents.foodEaten('mrqx_extra_pack:sakuya_ice_cream', event => {
    let entity = event.entity
    if (event.level.isClientSide()) return
    if (!entity.isPlayer()) return
    organActiveOnlyStrategies['mrqx_extra_pack:heart_antimatter'](entity, null, null)
})