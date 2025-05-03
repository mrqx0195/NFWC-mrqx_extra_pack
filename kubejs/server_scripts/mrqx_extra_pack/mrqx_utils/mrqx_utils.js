// priority: 950

const mrqxPlayerNonPersistentDataMap = new Map()

/**
 * 造成元素损伤
 * @param {Internal.LivingEntity} entity 
 * @param {Number} damage
 * @param {"ice" | "fire" | "lighting" | "ender" | "wither"} type 
 * @returns {number}
 */
function mrqxCauseElementDamage(entity, damage, type) {
    if (!damage || damage <= 0) return 0
    let count = Math.min((entity.persistentData.getInt("mrqx_" + type + "_damage") ?? 0) + damage, 2147483647)
    let elementDamageSource = mrqxElementDamageSource[type]
    let elementDamageEffect = mrqxElementDamageEffect[type]
    if (count >= 100) {
        let damageCount = Math.floor(count / 100)
        count -= damageCount * 100
        entity.attack(elementDamageSource, Math.min(damageCount * 100, entity.getHealth() - 1))
        elementDamageEffect.forEach(effect => {
            let amplifier = damageCount - 1
            let duration = 200
            if (entity.hasEffect(effect)) {
                amplifier += entity.getEffect(effect).getAmplifier() + 1
            }
            entity.potionEffects.add(effect, duration, Math.min(amplifier, 2147483647), false, false)
        })
        entity.persistentData.putInt("mrqx_" + type + "_damage", count)
        return damageCount
    }
    entity.persistentData.putInt("mrqx_" + type + "_damage", count)
    return 0
}

/**
 * 纸器官检测
 * @param {Internal.ServerPlayer} player 
 * @param {organ} organ 
 */
function mrqxPaperOrganInWaterRainBubbleFireOrLava(player, organ) {
    if (!(player.isOnFire() || player.isInWaterRainOrBubble() || player.isInLava())) {
        return
    }
    let count = 0
    let instance = player.getChestCavityInstance()
    let item = instance.inventory.getItem(organ.Slot)
    if (item.isEmpty()) return
    let itemMap = getPlayerChestCavityItemMap(player)
    if (itemMap.has('mrqx_extra_pack:automatic_wax_protector') && player.persistentData.getInt(organActive) == 1) {
        count += instance.inventory.countItem('minecraft:honeycomb')
    }
    let paper = Item.of(organ.id, { organData: {} })
    let organData = organ.tag.organData
    let temperature = ColdSweat.getTemperature(player, 'core')
    organData.allKeys.forEach(key => {
        let random = Math.random()
        if (!player.isInLava() && !player.isOnFire()) {
            if (random / Math.max(temperature * 0.05, 1) > (count / 64) || random > temperature * 0.005) {
                organData[key] = organData[key] * 0.9
            }
        }
        else if (!player.isInLava()) {
            if (random / Math.max(temperature * -0.04, 1) > (count / 256) || random > temperature * -0.004) {
                organData[key] = organData[key] * 0.7
            }
        }
        else if (random / Math.max(temperature * -0.03, 1) > (count / 1024) || random > temperature * -0.003) {
            organData[key] = organData[key] * 0.5
        }
    })
    paper.nbt.put('organData', organData)
    mrqxEditChestItem(player, paper, organ.Slot, false, false, false)
}

/**
 * 先进单片镜检测
 * @param {Internal.ItemStack} item 
 * @returns {Boolean[]}
 */
function mrqxCheckAdvancedArchivistEyeGlass(item) {
    let list = []
    if (!item.getNbt()) {
        item.setNbt({})
    }
    list.push(item.getNbt().getBoolean('mrqxAAEGSweetDream') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGDragonPower') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGInfinityBeats') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGBurningAndFlaringHeart') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGPrisonSoul') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGMoonSoul') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGMarenol') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGNuclear') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGElement') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGSteam') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGDamageNumber') ?? false)
    return list
}

/**
 * 获取噩梦指数
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetMarenolCount(player) {
    let count = 0
    player.potionEffects.map.forEach((effect, instance) => {
        if (!effect.isBeneficial()) {
            count += instance.getAmplifier()
        }
    })
    count *= player.persistentData.getInt(warpCount) * 0.1
    return count
}

/**
 * 获取幽匿指数
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetSculkCount(player) {
    let count = 0
    let itemMap = getPlayerChestCavityItemMap(player)
    let typeMap = getPlayerChestCavityTypeMap(player)
    if ((player.getPersistentData().getLong('mrqxSculkCountLastUpdateTime') ?? 0) >= (player.age + 20)) {
        return player.getPersistentData().getLong('mrqxSculkCount')
    }
    if (itemMap.has('mrqx_extra_pack:sculk_heart') && typeMap.has('kubejs:mrqx_sculk')) {
        count = typeMap.get('kubejs:mrqx_sculk').length
    }
    let blockSet = new Set()
    count *= mrqxGetConnectedBlocksCount(
        player.getBlockX(),
        player.getBlockY() - 1,
        player.getBlockZ(),
        100,
        player.getLevel(),
        blockSet,
        /**
         * @param {Number} count
         * @param {Number} x
         * @param {Number} y
         * @param {Number} z
         * @param {Number} max
         * @param {Internal.Level} level
         * @param {Set<String>} set
         * @returns {Boolean}
         */
        (x, y, z, max, level, set) => (level.getBlock(x, y, z).getId() == 'minecraft:sculk'))
    player.getPersistentData().putLong('mrqxSculkCountLastUpdateTime', player.age)
    player.getPersistentData().putLong('mrqxSculkCount', count)
    return count
}


/**
 * 数组随机化
 * @param {Array} array
 */
function mrqxShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

/**
 * 相连方块获取（BFS）
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} max
 * @param {Internal.Level} level
 * @param {Set<String>} set
 * @param {Function} fun - 判断条件函数
 * @returns {Number}
 */
function mrqxGetConnectedBlocksCount(x, y, z, max, level, set, fun) {
    let count = 1
    let queue = [[x, y, z]]
    set.add(`${x},${y},${z}`)
    while (queue.length > 0) {
        let [cx, cy, cz] = queue.shift()
        if (count > max) {
            break
        }
        let directions = [
            [1, 0, 0], [-1, 0, 0],
            [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1],
            [1, 1, 0], [-1, 1, 0],
            [1, -1, 0], [-1, -1, 0],
            [0, 1, 1], [0, -1, 1],
            [0, 1, -1], [0, -1, -1],
            [1, 0, 1], [1, 0, -1],
            [-1, 0, 1], [-1, 0, -1],
        ]
        for (let [dx, dy, dz] of directions) {
            let nx = cx + dx
            let ny = cy + dy
            let nz = cz + dz
            if (ny >= -64 && ny <= 320 && nx > -30000000 && nx < 30000000 && nz > -30000000 && nz < 30000000) {
                let key = `${nx},${ny},${nz}`
                if (!set.has(key)) {
                    if (fun(nx, ny, nz, max, level, set)) {
                        queue.push([nx, ny, nz])
                        set.add(key)
                        count++
                    }
                }
            }
        }
    }
    return count
}

/**
 * 检测方块是否暴露在空气中
 * @param {Internal.Level} level
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @returns {Boolean}
 */
function mrqxIsBlockExposedToAir(level, x, y, z) {
    let directions = [
        [0, -1, 0],
        [0, 1, 0],
        [-1, 0, 0],
        [1, 0, 0],
        [0, 0, -1],
        [0, 0, 1]
    ]
    for (let dir of directions) {
        let blockX = x + dir[0]
        let blockY = y + dir[1]
        let blockZ = z + dir[2]
        let blockState = level.getBlock(blockX, blockY, blockZ)
        if (blockState.getId() == 'minecraft:air') {
            return true
        }
    }
    return false
}

/**
 * 获取非持久化玩家数据
 * @param {Internal.ServerPlayer} player
 * @param {string} key
 * @returns {any}
 */
function mrqxGetPlayerNonPersistentData(player, key) {
    return mrqxGetPlayerNonPersistentDataMap(player).get(key)
}

/**
 * 设置非持久化玩家数据
 * @param {Internal.ServerPlayer} player
 * @param {string} key
 * @param {any} value
 * @returns {Map<string,any>}
 */
function mrqxSetPlayerNonPersistentData(player, key, value) {
    return mrqxGetPlayerNonPersistentDataMap(player).set(key, value)
}

/**
 * 获取非持久化玩家数据表
 * @param {Internal.ServerPlayer} player
 * @returns {Map<string,any>}
 */
function mrqxGetPlayerNonPersistentDataMap(player) {
    let uuid = String(player.getUuid())
    if (!mrqxPlayerNonPersistentDataMap.has(uuid)) mrqxPlayerNonPersistentDataMap.set(uuid, new Map())
    return mrqxPlayerNonPersistentDataMap.get(uuid)
}
/**
 * 空值检测
 * @returns {Boolean}
 */
function mrqxIsEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0))
}

/**
* 获取某个半径内的所有实体
* @param {Internal.Level} level
* @param {Vec3} pos
* @param {Number} radius
* @returns {Array<Internal.Entity>}
*/
function mrqxGetLivingWithinRadius(level, pos, radius) {
    let area = new AABB.of(pos.x() - radius, pos.y() - radius, pos.z() - radius, pos.x() + radius, pos.y() + radius, pos.z() + radius)
    let entityAABBList = level.getEntitiesWithin(area)
    let entityList = []
    entityAABBList.forEach(entity => {
        if (entity.position() && entity.position().distanceTo(pos) <= radius) {
            entityList.push(entity)
        }
    })
    return entityList
}

/**
 * 将数组的长度增加到原来的指定倍数
 * @param {Array} arr
 * @param {number} multiplier
 * @return {Array}
 */
function mrqxMultiplyArrayLength(arr, multiplier) {
    let newArray = []
    for (let i = 0; i < multiplier; i++) {
        newArray = newArray.concat(arr)
    }
    return newArray
}

/**
 * 线性插值函数
 * @param {number} start
 * @param {number} end
 * @param {number} t
 * @returns {number}
 */
function mrqxLerp(start, end, t) {
    return start + (end - start) * t
}

/**
 * 获取两点间的连线上的点
 * @param {number} startX
 * @param {number} startY
 * @param {number} startZ
 * @param {number} endX
 * @param {number} endY
 * @param {number} endZ
 * @param {number} distance
 * @returns {Array<Vec3>}
 */
function mrqxLinePos(startX, startY, startZ, endX, endY, endZ, distance) {
    let totalDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2) + Math.pow(endZ - startZ, 2))
    let steps = totalDistance / distance
    /**@type {Array<Vec3>} */
    let list = []
    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        let x = mrqxLerp(startX, endX, t)
        let y = mrqxLerp(startY, endY, t)
        let z = mrqxLerp(startZ, endZ, t)
        list.push(new Vec3(x, y, z))
    }
    return list
}

/**
 * 从大到小切分数字为2的n次幂
 * @param {Number} n
 * @returns {Array<Number>}
 */
function mrqxSplitIntoPowersOfTwo(n) {
    let list = []
    let power = 0
    while (n > 0) {
        while (Math.pow(2, power + 1) <= n) {
            power++
        }
        list.push(power)
        n -= Math.pow(2, power)
        power = 0
    }
    return list
}

/**
 * @param {Internal.LivingDamageEvent} event
 */
function mrqxSentientGreatscytheDamageByOthers(event) {
    let player = event.entity
    let damageType = event.source.type
    if (damageType == 'outOfWorld') return
    let tag = player.persistentData.getCompound('mrqxSentientGreatscythe')
    let count = tag.getInt(damageType) ?? 0
    tag.putInt(damageType, count + 1)
    event.amount *= 0.99 ** count
    player.persistentData.put('mrqxSentientGreatscythe', tag)
}

/**
 * 获取玩家穿戴的所有饰品
 * @param {Internal.ServerPlayer} player
 * @returns {Internal.ItemStack[]}
 */
function mrqxGetCuriosItemList(player) {
    let curios = new $CuriosApi.getCuriosHelper().getEquippedCurios(player).resolve()
    if (curios.isPresent()) {
        return curios.get().getAllItems()
    } else {
        return []
    }
}

/**
 * 获取玩家身上某种饰品的信息
 * @param {Internal.ServerPlayer} player
 * @param {string} id
 * @returns {{hasItem: boolean, count: number, stacks: Internal.ItemStack[], slots: number[]}}
 */
function mrqxGetCurioInfo(player, id) {
    let curiosItems = mrqxGetCuriosItemList(player)
    let result = {
        hasItem: false,
        count: 0,
        stacks: [],
        slots: [],
    }
    curiosItems.forEach((stack, index) => {
        if (!stack.isEmpty() && stack.getId() == id) {
            result.hasItem = true
            result.count += stack.getCount()
            result.stacks.push(stack)
            result.slots.push(index)
        }
    })
    return result
}

/**
 * 修改玩家胸腔物品
 * @param {Internal.ServerPlayer} player
 * @param {Internal.ItemStack} item
 * @param {number} slot
 * @param {boolean} ignoreEmpty
 * @param {boolean} ignoreDifferent
 * @param {boolean} updateActive
 */
function mrqxEditChestItem(player, item, slot, ignoreEmpty, ignoreDifferent, updateActive) {
    let instance = player.getChestCavityInstance()
    let oldItem = instance.inventory.getItem(slot)
    if (oldItem.isEmpty() && !ignoreEmpty) return
    if (oldItem.getId() != item.getId() && !ignoreDifferent) return
    instance.inventory.setItem(slot, item)
    if (!updateActive) return
    global.initChestCavityIntoMap(player, false)
    if (player.persistentData.contains(organActive) &&
        player.persistentData.getInt(organActive) == 1) {
        global.updatePlayerActiveStatus(player)
    }
}

/**
 * 获取空组件
 * @returns {Internal.CompoundTag}
 */
function mrqxGetEmptyCompound() {
    return Item.of('minecraft:air').getOrCreateTag().copy()
}

/**
 * 获取骑士核心计数
 * @param {Internal.ServerPlayer} player
 * @returns {number}
 */
function mrqxGetCoreOfKnightCount(player) {
    let itemMap = getPlayerChestCavityItemMap(player)
    let typeMap = getPlayerChestCavityTypeMap(player)
    if (itemMap.has('mrqx_extra_pack:core_of_knights') && typeMap.has('kubejs:mrqx_king')) {
        return typeMap.get('kubejs:mrqx_king').length
    }
    return 0
}

/**
 * 获取盔甲减伤后伤害值
 * @param {Internal.ServerPlayer} player
 * @param {DamageSource} damageSource
 * @param {number} initialDamage
 * @param {boolean} ignoreBypassArmor
 * @param {boolean} isDamageArmor
 * @returns {number}
 */
function mrqxGetDamageAfterArmorAbsorb(player, damageSource, initialDamage, ignoreBypassArmor, isDamageArmor) {
    if (!damageSource.isBypassArmor() || ignoreBypassArmor) {
        if (isDamageArmor) player.getInventory().hurtArmor(damageSource, initialDamage, $mrqxInventory.ALL_ARMOR_SLOTS)
        initialDamage = $mrqxCombatRules.getDamageAfterAbsorb(initialDamage, Math.floor(player.getAttributeTotalValue('minecraft:generic.armor')), player.getAttributeTotalValue('minecraft:generic.armor_toughness'))
    }
    return initialDamage
}

/**
 * 获取魔法减伤后伤害值
 * @param {Internal.ServerPlayer} player
 * @param {DamageSource} damageSource
 * @param {number} initialDamage
 * @param {boolean} ignoreBypassMagic
 * @param {boolean} ignoreBypassEnchantments
 * @returns {number}
 */
function mrqxGetDamageAfterMagicAbsorb(player, damageSource, initialDamage, ignoreBypassMagic, ignoreBypassEnchantments) {
    if (damageSource.isBypassMagic() && !ignoreBypassMagic) {
        return initialDamage
    }
    if (player.hasEffect('minecraft:resistance') && damageSource.getType() != 'outOfWorld') {
        initialDamage = Math.max(initialDamage * (25 - (player.getEffect('minecraft:resistance').getAmplifier() + 1) * 5) / 25, 0)
    }
    if (initialDamage <= 0) {
        return 0
    }
    if (damageSource.isBypassEnchantments() && !ignoreBypassEnchantments) {
        return initialDamage
    }
    let enchantmentProtection = $mrqxEnchantmentHelper.getDamageProtection(player.getArmorSlots(), damageSource)
    if (enchantmentProtection > 0) {
        initialDamage = $mrqxCombatRules.getDamageAfterMagicAbsorb(initialDamage, enchantmentProtection)
    }
    return initialDamage
}

/**
 * Boss增强是否启用
 * @param {Internal.ServerPlayer} player
 * @returns {boolean}
 */
function mrqxIsBossEnhanceEnabled(player) {
    /** @type {string} */
    let isDisabled = player.stages.getAll().toArray().find(ele => ele.startsWith('mrqx_boss_enhance_is_disabled_'))
    if (!isDisabled) {
        return true
    }
    return !(isDisabled.includes('true'))
}

/**
 * Boss词条是否启用
 * @param {Internal.ServerPlayer} player
 * @returns {boolean}
 */
function mrqxIsBossChampionEnabled(player) {
    /** @type {string} */
    let isDisabled = player.stages.getAll().toArray().find(ele => ele.startsWith('mrqx_boss_champion_is_disabled_'))
    if (!isDisabled) {
        return true
    }
    return !(isDisabled.includes('true'))
}


/**
 * 分割整数
 * @param {number} sum
 * @param {number} length
 * @returns {number[]}
 */
function mrqxGenerateRandomArray(sum, length) {
    let arr = []
    let remainingSum = sum
    for (let i = 0; i < length; i++) {
        let num
        if (i === length - 1) {
            num = remainingSum
        } else {
            num = Math.floor(Math.random() * (remainingSum + 1))
        }
        arr.push(num)
        remainingSum -= num
    }
    mrqxShuffleArray(arr)
    return arr
}

/**
 * 玩家是否位于自己队伍的已认领区块中
 * @param {Internal.ServerPlayer} player
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @returns {boolean}
 */
function mrqxIsInTeamsClaimedChunk(player, level, pos) {
    if (!$mrqxFTBChunksAPI.isManagerLoaded()) return false
    let chunk = $mrqxFTBChunksAPI.getManager().getChunk(new $mrqxChunkDimPos(level, pos))
    if (!chunk) return false
    let flag = false
    if (chunk.getTeamData().getTeam().getMembers().toArray().find((id) => UUID.toString(id) == UUID.toString(player.uuid))) flag = true
    return flag
}

/**
 * 目标检查
 * @param {Internal.LivingEntity} target
 * @param {Internal.LivingEntity} attacker
 * @returns {boolean}
 */
function mrqxCheckTarget(target, attacker) {
    if (!target.isLiving() || !attacker.isLiving()) return false
    if (target['getOwner'] && target.getOwner() && (UUID.toString(target.getOwnerUUID()) == UUID.toString(attacker.uuid))) return false
    return true
}

/**
 * 奥秘资格检查
 * @param {Internal.LivingEntity} player
 * @returns {boolean}
 */
function mrqxIsMysteryQuestUnlocked(player) {
    if (player.getPersistentData().getBoolean(`mrqx_mq`)) return true
    else return false
}

/**
 * 奥秘任务检查
 * @param {Internal.ServerPlayer} player
 * @param {boolean} is_past
 * @returns {boolean[]}
 */
function mrqxGetMysteryQuests(player, is_past) {
    let list = []
    for (let i = 0; i < 4; i++) {
        // if (player.getPersistentData().getBoolean(`mrqx_${is_past ? 'past' : 'future'}_${i}`)) list.push(true)
        if (player.stages.has(`mrqx_${is_past ? 'past' : 'future'}_${i}`)) list.push(true)
        else list.push(false)
    }
    return list
}