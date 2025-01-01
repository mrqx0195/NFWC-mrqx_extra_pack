// priority: 799

/**
 * @param {string} key
 * @param {number} primary
 * @param {number} secondary
 * @param {number} tertiary
 * @param {number} durability
 * @param {number} integrityCost
 * @param {number} integrityGain
 * @param {number} magicCapacity
 * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} toolLevel
 * @param {number} toolEfficiency
 */
function mrqxTetraMaterial(key, primary, secondary, tertiary, durability, integrityCost, integrityGain, magicCapacity, toolLevel, toolEfficiency) {
    this.key = key
    this.primary = primary
    this.secondary = secondary
    this.tertiary = tertiary
    this.durability = durability
    this.integrityCost = integrityCost
    this.integrityGain = integrityGain
    this.magicCapacity = magicCapacity
    this.toolLevel = toolLevel
    this.toolEfficiency = toolEfficiency
    this.tints = {}
    this.textures = []
    this.material = {}
    this.requiredTools = {}
    this.attributes = {}
    this.effects = {}
    this.aspects = {}
}

mrqxTetraMaterial.prototype = {
    /**
     * @param {"glyph" | "texture"} key
     * @param {string} color
     * @returns {mrqxTetraMaterial}
     */
    addTint: function (key, color) {
        this.tints[key] = color
        return this
    },
    /**
     * @param {string} type
     * @returns {mrqxTetraMaterial}
     */
    addTexture: function (type) {
        this.textures.push(type)
        return this
    },
    /**
     * @param {Special.Item} item
     * @returns {mrqxTetraMaterial}
     */
    addItemMaterial: function (item) {
        if (!this.material.items) {
            this.material.items = [item]
        }
        else {
            this.material.items.push(item)
        }
        return this
    },
    /**
     * @param {Special.ItemTag} tag
     * @returns {mrqxTetraMaterial}
     */
    setTagMaterial: function (tag) {
        this.material.tag = tag
        return this
    },
    /**
     * @param {string} nbt
     * @returns {mrqxTetraMaterial}
     */
    setMaterialNbt: function (nbt) {
        this.material.nbt = nbt
        return this
    },
    /**
     * @param {number} count
     * @returns {mrqxTetraMaterial}
     */
    setMaterialCount: function (count) {
        this.material.count = count
        return this
    },
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @returns {mrqxTetraMaterial}
     */
    addRequiredTool: function (tool, level) {
        this.requiredTools[tool] = level
        return this
    },
    /**
     * @param {Special.Attribute} attribute
     * @param {"ADDITION" | "MULTIPLY_BASE" | "MULTIPLY_TOTAL"} operation
     * @param {number} value
     * @returns {mrqxTetraMaterial}
     */
    addAttribute: function (attribute, operation, value) {
        if (operation == 'MULTIPLY_BASE') attribute = '*' + attribute
        else if (operation == 'MULTIPLY_TOTAL') attribute = '**' + attribute
        this.attributes[attribute] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number | number[]} value
     * @returns {mrqxTetraMaterial}
     */
    addEffect: function (key, value) {
        this.effects[key] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number} value
     * @returns {mrqxTetraMaterial}
     */
    addAspect: function (key, value) {
        this.aspects[key] = value
        return this
    },
    /**
     * @param {string} category
     * @returns {mrqxTetraMaterial}
     */
    setCategory: function (category) {
        this.category = category
        return this
    },
    /**
     * @param {boolean} isHidden
     * @returns {mrqxTetraMaterial}
     */
    setHidden: function (isHidden) {
        this.hidden = isHidden
        return this
    },
    /**
     * @param {boolean} isHiddenOutcomes
     * @returns {mrqxTetraMaterial}
     */
    setHiddenOutcomes: function (isHiddenOutcomes) {
        this.hiddenOutcomes = isHiddenOutcomes
        return this
    },
    /**
     * @param {boolean} isReplaced
     * @returns {mrqxTetraMaterial}
     */
    setReplace: function (isReplaced) {
        this.replace = isReplaced
        return this
    },
    /**
     * @param {number} experienceCost
     * @returns {mrqxTetraMaterial}
     */
    setExperienceCost: function (experienceCost) {
        this.experienceCost = experienceCost
        return this
    },
}

ServerEvents.highPriorityData(event => {
    function registerTetraMaterial(dataModel, category) {
        event.addJson(`tetra:materials/${category}/${dataModel.key}.json`, dataModel)
    }

    // 风暴金属锭
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_storm_metal_ingot',
        10, 5.6, 5.2, 4096,
        5, 10, 256, 7, 15)
        .addTint('glyph', 'AB36BF')
        .addTint('texture', '2F1E41')
        .addTexture('heavy')
        .addTexture('metal')
        .addItemMaterial('mrqx_extra_pack:storm_metal_ingot')
        .addRequiredTool('hammer_dig', 'minecraft:netherite')
        .setCategory('metal'), 'metal'
    )

    // 铀锭
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_uranium',
        6.4, 4.3, 3.5, 279,
        3, 7, 200, 'minecraft:iron', 5)
        .addTint('glyph', '2CBA3F')
        .addTint('texture', '86E492')
        .addTexture('heavy')
        .addTexture('metal')
        .addItemMaterial('mrqx_extra_pack:uranium')
        .addRequiredTool('hammer_dig', 'minecraft:iron')
        .setCategory('metal'), 'metal'
    )

    // 压缩饼干
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_golden_compressed_biscuit',
        5, 5, 5, 124,
        3, 4, 50, 'minecraft:diamond', 6)
        .addTint('glyph', 'C39E38')
        .addTint('texture', '9F7607')
        .addTexture('crude')
        .addTexture('wooden')
        .addItemMaterial('mrqx_extra_pack:compressed_biscuit')
        .addRequiredTool('hammer_dig', 'minecraft:stone')
        .setCategory('misc'), 'misc'
    )

    // 黄金压缩饼干
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_golden_compressed_biscuit',
        7, 7, 7, 500,
        4, 8, 200, 'minecraft:diamond', 6)
        .addTint('glyph', 'F4D004')
        .addTint('texture', 'EBC204')
        .addTexture('shiny')
        .addTexture('crude')
        .addTexture('metal')
        .addEffect('stabilizing', 15)
        .addItemMaterial('mrqx_extra_pack:golden_compressed_biscuit')
        .addRequiredTool('hammer_dig', 'minecraft:iron')
        .setCategory('misc'), 'misc'
    )

    // 激活·末影龙宝玉
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_active_ender_dragon_bead',
        0, 0, 0, 0,
        1, 0, 480, 0, 0)
        .addTint('glyph', '6E1668')
        .addTint('texture', 'BF33B6')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:ender_magic_resist', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:ender_spell_power', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 480)
        .addAttribute('irons_spellbooks:spell_power', 'ADDITION', 0.3)
        .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.3)
        .setExperienceCost(4)
        .addItemMaterial('mrqx_extra_pack:active_ender_dragon_bead')
        .setCategory('socket'), 'socket'
    )

    // 激活·火龙宝玉
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_active_fire_dragon_bead',
        0, 0, 0, 0,
        1, 0, 480, 0, 0)
        .addTint('glyph', 'B32E2E')
        .addTint('texture', 'ED8383')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:fire_magic_resist', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:fire_spell_power', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 480)
        .addAttribute('irons_spellbooks:spell_power', 'ADDITION', 0.3)
        .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.3)
        .setExperienceCost(4)
        .addItemMaterial('mrqx_extra_pack:active_fire_dragon_bead')
        .setCategory('socket'), 'socket'
    )

    // 激活·冰龙宝玉
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_active_ice_dragon_bead',
        0, 0, 0, 0,
        1, 0, 480, 0, 0)
        .addTint('glyph', '307BB4')
        .addTint('texture', '16486E')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:ice_magic_resist', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:ice_spell_power', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 480)
        .addAttribute('irons_spellbooks:spell_power', 'ADDITION', 0.3)
        .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.3)
        .setExperienceCost(4)
        .addItemMaterial('mrqx_extra_pack:active_ice_dragon_bead')
        .setCategory('socket'), 'socket'
    )

    // 激活·电龙宝玉
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_active_lightning_dragon_bead',
        0, 0, 0, 0,
        1, 0, 480, 0, 0)
        .addTint('glyph', '7B30B4')
        .addTint('texture', '48166E')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:lightning_magic_resist', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:lightning_spell_power', 'ADDITION', 2.3)
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 480)
        .addAttribute('irons_spellbooks:spell_power', 'ADDITION', 0.3)
        .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.3)
        .setExperienceCost(4)
        .addItemMaterial('mrqx_extra_pack:active_lightning_dragon_bead')
        .setCategory('socket'), 'socket'
    )

    // 暗日种子
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_dark_sun_seed',
        0, 0, 0, 0,
        1, 0, 500, 0, 0)
        .addTint('glyph', '1E1557')
        .addTint('texture', 'B8B4C8')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 500)
        .addAttribute('irons_spellbooks:spell_power', 'MULTIPLY_BASE', 2)
        .addAttribute('irons_spellbooks:spell_resist', 'MULTIPLY_BASE', 2)
        .setExperienceCost(5)
        .addItemMaterial('mrqx_extra_pack:dark_sun_seed')
        .setCategory('socket'), 'socket'
    )

    // 幽匿咆哮体
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_sculk_growler',
        0, 0, 0, 0,
        2, 0, 50, 0, 0)
        .addTint('glyph', '052027')
        .addTint('texture', '1CACB2')
        .addTexture('default')
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 500)
        .addAttribute('irons_spellbooks:eldritch_spell_power', 'ADDITION', 2)
        .addAttribute('irons_spellbooks:eldritch_spell_resist', 'ADDITION', 2)
        .addItemMaterial('mrqx_extra_pack:sculk_growler')
        .setCategory('socket'), 'socket'
    )

    // 幽匿之心
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_sculk_heart',
        0, 0, 0, 0,
        5, 0, -100, 0, 0)
        .addTint('glyph', '059596')
        .addTint('texture', '2ADCE9')
        .addTexture('default')
        .addEffect('intuit', 2)
        .addEffect('sculkTaint', [5, 1])
        .addEffect('strikingAxe', 1)
        .addEffect('strikingCut', 1)
        .addEffect('strikingHoe', 1)
        .addEffect('strikingPickaxe', 1)
        .addEffect('strikingShovel', 1)
        .addEffect('sweeping', 1)
        .addEffect('sweepingStrike', 1)
        .addEffect('truesweep', 1)
        .setExperienceCost(5)
        .addItemMaterial('mrqx_extra_pack:sculk_heart')
        .setCategory('socket'), 'socket'
    )

    // 耀阳种子
    registerTetraMaterial(new mrqxTetraMaterial('mrqx_sun_seed',
        0, 0, 0, 0,
        1, 0, 320, 0, 0)
        .addTint('glyph', 'E9E45D')
        .addTint('texture', '73711E')
        .addTexture('shiny')
        .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 320)
        .addAttribute('irons_spellbooks:holy_magic_resist', 'ADDITION', 2)
        .addAttribute('irons_spellbooks:holy_spell_power', 'ADDITION', 2)
        .addAttribute('irons_spellbooks:spell_power', 'ADDITION', 0.5)
        .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.5)
        .setExperienceCost(3)
        .addItemMaterial('mrqx_extra_pack:sun_seed')
        .setCategory('socket'), 'socket'
    )

})