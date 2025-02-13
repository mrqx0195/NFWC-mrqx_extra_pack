// priority: 799

/**
 * @param {string} key
 */
function mrqxTetraStandardImprovement(key) {
    this.key = key
    this.tools = {}
    this.attributes = {}
    this.effects = {}
    this.aspects = {}
    this.tags = []
    this.models = []
}

mrqxTetraStandardImprovement.prototype = {
    /**
     * @param {number} level
     * @returns {mrqxTetraStandardImprovement}
     */
    setLevel: function (level) {
        this.level = level
        return this
    },
    /**
     * @param {string} group
     * @returns {mrqxTetraStandardImprovement}
     */
    setGroup: function (group) {
        this.group = group
        return this
    },
    /**
     * @param {number} durability
     * @returns {mrqxTetraStandardImprovement}
     */
    setDurability: function (durability) {
        this.durability = durability
        return this
    },
    /**
     * @param {number} durabilityMultiplier
     * @returns {mrqxTetraStandardImprovement}
     */
    setDurabilityMultiplier: function (durabilityMultiplier) {
        this.durabilityMultiplier = durabilityMultiplier
        return this
    },
    /**
     * @param {number} integrity
     * @returns {mrqxTetraStandardImprovement}
     */
    setIntegrity: function (integrity) {
        this.integrity = integrity
        return this
    },
    /**
     * @param {number} magicCapacity
     * @returns {mrqxTetraStandardImprovement}
     */
    setMagicCapacity: function (magicCapacity) {
        this.magicCapacity = magicCapacity
        return this
    },
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @param {number} value
     * @returns {mrqxTetraStandardImprovement}
     */
    addTool: function (tool, level, value) {
        if (mrqxIsEmpty(value)) {
            this.tools[tool] = level
        } else {
            this.tools[tool] = [level, value]
        }
        return this
    },
    /**
     * @param {Special.Attribute} attribute
     * @param {"ADDITION" | "MULTIPLY_BASE" | "MULTIPLY_TOTAL"} operation
     * @param {number} value
     * @returns {mrqxTetraStandardImprovement}
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
     * @returns {mrqxTetraStandardImprovement}
     */
    addEffect: function (key, value) {
        this.effects[key] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number} value
     * @returns {mrqxTetraStandardImprovement}
     */
    addAspect: function (key, value) {
        this.aspects[key] = value
        return this
    },
    /**
     * @param {Special.ItemTag} tag
     * @returns {mrqxTetraStandardImprovement}
     */
    addTag: function (tag) {
        this.tags.push(tag)
        return this
    },
    /**
     * @param {Internal.Rarity_} rarity
     * @returns {mrqxTetraStandardImprovement}
     */
    setRarity: function (rarity) {
        this.rarity = rarity
        return this
    },
    /**
     * @param {Internal.Priority_} prefixPriority
     * @returns {mrqxTetraStandardImprovement}
     */
    setPrefixPriority: function (prefixPriority) {
        this.prefixPriority = prefixPriority
        return this
    },
    /**
     * @param {object} model
     * @returns {mrqxTetraStandardImprovement}
     */
    addModel: function (model) {
        this.models.push(model)
        return this
    },
}

ServerEvents.highPriorityData(event => {
    function registerTetraImprovements(dataModel, key, category) {
        event.addJson(`tetra:improvements/${category}/${key}.json`, dataModel)
    }

    // 
})