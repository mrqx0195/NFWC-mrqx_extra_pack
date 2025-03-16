// priority: 950


/**
 * @param {string} key
 * @param {number} durability
 * @param {number} durabilityMultiplier
 * @param {number} integrity
 * @param {number} magicCapacity
 */
function mrqxTetraModuleVariant(key, durability, durabilityMultiplier, integrity, magicCapacity) {
    this.key = key
    this.durability = durability
    this.durabilityMultiplier = durabilityMultiplier
    this.integrity = integrity
    this.magicCapacity = magicCapacity
    this.tools = {}
    this.aspects = {}
    this.attributes = {}
    this.effects = {}
    this.models = []
    this.glyph = {}
    this.material = {}
}

mrqxTetraModuleVariant.prototype = {
    /**
     * @param {number} textureX
     * @param {number} textureY
     * @param {string} tintColor
     * @param {string} textureLocation
     * @returns {mrqxTetraModuleVariant}
     */
    setGlyph: function (textureX, textureY, tintColor, textureLocation) {
        if (!mrqxIsEmpty(textureX)) this.glyph['textureX'] = textureX
        if (!mrqxIsEmpty(textureY)) this.glyph['textureY'] = textureY
        if (!mrqxIsEmpty(tintColor)) this.glyph['tint'] = tintColor
        if (!mrqxIsEmpty(textureLocation)) this.glyph['textureLocation'] = textureLocation
        return this
    },
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @param {number} value
     * @returns {mrqxTetraModuleVariant}
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
     * @returns {mrqxTetraModuleVariant}
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
     * @returns {mrqxTetraModuleVariant}
     */
    addEffect: function (key, value) {
        this.effects[key] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number} value
     * @returns {mrqxTetraModuleVariant}
     */
    addAspect: function (key, value) {
        this.aspects[key] = value
        return this
    },
    /**
     * @param {Special.Item} item
     * @returns {mrqxTetraModuleVariant}
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
     * @returns {mrqxTetraModuleVariant}
     */
    setTagMaterial: function (tag) {
        this.material.tag = tag
        return this
    },
    /**
     * @param {string} nbt
     * @returns {mrqxTetraModuleVariant}
     */
    setMaterialNbt: function (nbt) {
        this.material.nbt = nbt
        return this
    },
    /**
     * @param {number} count
     * @returns {mrqxTetraModuleVariant}
     */
    setMaterialCount: function (count) {
        this.material.count = count
        return this
    },
    /**
     * @param {object} model
     * @returns {mrqxTetraModuleVariant}
     */
    addModel: function (model) {
        this.models.push(model)
        return this
    },
}

/**
 * @param {string} type
 * @param {boolean} replace
 */
function mrqxTetraModule(type, replace) {
    this.type = type
    this.replace = replace
    this.improvements = []
    this.slots = []
    /** @type {mrqxTetraModuleVariant[]} */
    this.variants = []
}

mrqxTetraModule.prototype = {
    /**
     * @param {string} slot
     * @returns {mrqxTetraModule}
     */
    addSlot: function (slot) {
        this.slots.push(slot)
        return this
    },
    /**
     * @param {string} improvement
     * @returns {mrqxTetraModule}
     */
    addImprovement: function (improvement) {
        this.improvements.push(improvement)
        return this
    },
    /**
     * @param {mrqxTetraModuleVariant} variant
     * @returns {mrqxTetraModule}
     */
    addVariant: function (variant) {
        this.variants.push(variant)
        return this
    },
    /**
     * @param {Internal.Priority_} renderLayer
     * @returns {mrqxTetraModule}
     */
    setRenderLayer: function (renderLayer) {
        this.renderLayer = renderLayer
        return this
    },
}

/**
 * @param {"other" | "improvement" | "minor" | "major"} displayType
 * @param {boolean} replace
 * @param {boolean} hone
 * @param {number} materialRevealSlot
 * @param {number} materialSlotCount
 * @param {"temporary" | "hone" | "basic"} rarity
 */
function mrqxTetraSchematic(displayType, replace, hone, materialRevealSlot, materialSlotCount, rarity) {
    this.displayType = displayType
    this.replace = replace
    this.hone = hone
    this.materialRevealSlot = materialRevealSlot
    this.materialSlotCount = materialSlotCount
    this.rarity = rarity
    this.slots = []
    /** @type {mrqxTetraOutcome[]} */
    this.outcomes = []
    this.glyph = {}
    this.improvements = {}
}

mrqxTetraSchematic.prototype = {
    /**
     * @param {string} slot
     * @returns {mrqxTetraSchematic}
     */
    addSlot: function (slot) {
        this.slots.push(slot)
        return this
    },
    /**
     * @param {number} textureX
     * @param {number} textureY
     * @param {string} tintColor
     * @param {string} textureLocation
     * @returns {mrqxTetraSchematic}
     */
    setGlyph: function (textureX, textureY, tintColor, textureLocation) {
        if (!mrqxIsEmpty(textureX)) this.glyph['textureX'] = textureX
        if (!mrqxIsEmpty(textureY)) this.glyph['textureY'] = textureY
        if (!mrqxIsEmpty(tintColor)) this.glyph['tint'] = tintColor
        if (!mrqxIsEmpty(textureLocation)) this.glyph['textureLocation'] = textureLocation
        return this
    },
    /**
     * @param {mrqxTetraOutcome} outcome
     * @returns {mrqxTetraSchematic}
     */
    addOutcome: function (outcome) {
        this.outcomes.push(outcome)
        return this
    },
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @returns {mrqxTetraSchematic}
     */
    addAllRequiredTools: function (tool, level) {
        this.outcomes.forEach(outcome => {
            outcome.addRequiredTool(tool, level)
        })
        return this
    },
    /**
     * @param {string} key
     * @param {number} level
     * @returns {mrqxTetraSchematic}
     */
    addImprovement: function (key, level) {
        this.improvements[key] = level
        return this
    },
    /**
     * @param {mrqxTetraCraftingRequirementBase} requirement
     * @returns {mrqxTetraSchematic}
     */
    setRequirement: function (requirement) {
        this.requirement = requirement
        return this
    },
}

function mrqxTetraOutcome() {
    this.requiredTools = {}
    this.material = {}
    this.improvements = {}
    this.experienceCost = 0
}

mrqxTetraOutcome.prototype = {
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @returns {mrqxTetraOutcome}
     */
    addRequiredTool: function (tool, level) {
        this.requiredTools[tool] = level
        return this
    },
    /**
     * @param {Special.Item} item
     * @returns {mrqxTetraOutcome}
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
     * @returns {mrqxTetraOutcome}
     */
    setTagMaterial: function (tag) {
        this.material.tag = tag
        return this
    },
    /**
     * @param {string} nbt
     * @returns {mrqxTetraOutcome}
     */
    setMaterialNbt: function (nbt) {
        this.material.nbt = nbt
        return this
    },
    /**
     * @param {number} count
     * @returns {mrqxTetraOutcome}
     */
    setMaterialCount: function (count) {
        this.material.count = count
        return this
    },
    /**
     * @param {string} moduleKey
     * @param {string} moduleVariant
     * @returns {mrqxTetraOutcome}
     */
    setModule: function (moduleKey, moduleVariant) {
        this.moduleKey = moduleKey
        this.moduleVariant = moduleVariant
        return this
    },
    /**
     * @param {string} key
     * @param {number} level
     * @returns {mrqxTetraOutcome}
     */
    addImprovement: function (key, level) {
        this.improvements[key] = level
        return this
    },
    /**
     * @param {number} experienceCost
     * @returns {mrqxTetraOutcome}
     */
    setExperienceCost: function (experienceCost) {
        this.experienceCost = experienceCost
        return this
    },
}

/**
 * @param {object} predicate
 * @param {'tetra:holo' | 'tetra:modular_bow' | 'tetra:modular_crossbow' | 'tetra:modular_double' | 'tetra:modular_shield' | 'tetra:modular_single' | 'tetra:modular_sword' | 'tetra:modular_toolbelt' | 'art_of_forging:curious_artifact'} item
 */
function mrqxTetraReplacement(predicate, item) {
    this.predicate = predicate
    this.item = item
    this.modules = {}
    this.improvements = {}
}

mrqxTetraReplacement.prototype = {
    /**
     * @param {string} solt
     * @param {string} module
     * @param {string} variant
     * @returns {mrqxTetraReplacement}
     */
    addModule: function (solt, module, variant) {
        this.modules[solt] = [module, variant]
        return this
    },
    /**
     * @param {string} solt
     * @param {string} improvement
     * @param {number} level
     * @returns {mrqxTetraReplacement}
     */
    addImprovement: function (solt, improvement, level) {
        this.improvements[`${solt}:${improvement}`] = level
        return this
    },
}

/**
 * @param {string} name
 */
function mrqxTetraSynergy(name) {
    this.name = name
    this.tools = {}
    this.aspects = {}
    this.attributes = {}
    this.effects = {}
    this.moduleVariants = []
    this.modules = []
    this.improvements = []
}

mrqxTetraSynergy.prototype = {
    /**
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
     * @param {"minecraft:wood" | "minecraft:stone" | "minecraft:iron" | "minecraft:gold" | "minecraft:diamond" | "minecraft:netherite" | number} level
     * @param {number} value
     * @returns {mrqxTetraSynergy}
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
     * @returns {mrqxTetraSynergy}
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
     * @returns {mrqxTetraSynergy}
     */
    addEffect: function (key, value) {
        this.effects[key] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number} value
     * @returns {mrqxTetraSynergy}
     */
    addAspect: function (key, value) {
        this.aspects[key] = value
        return this
    },
    /**
     * @param {string} moduleVariant
     * @returns {mrqxTetraSynergy}
     */
    addModuleVariant: function (moduleVariant) {
        this.moduleVariants.push(moduleVariant)
        return this
    },
    /**
     * @param {string} module
     * @returns {mrqxTetraSynergy}
     */
    addModule: function (module) {
        this.modules.push(module)
        return this
    },
    /**
     * @param {string} improvement
     * @returns {mrqxTetraSynergy}
     */
    addImprovement: function (improvement) {
        this.improvements.push(improvement)
        return this
    },
    /**
     * @param {number} durability
     * @returns {mrqxTetraSynergy}
     */
    setDurability: function (durability) {
        this.durability = durability
        return this
    },
    /**
     * @param {number} durabilityMultiplier
     * @returns {mrqxTetraSynergy}
     */
    setDurabilityMultiplier: function (durabilityMultiplier) {
        this.durabilityMultiplier = durabilityMultiplier
        return this
    },
    /**
     * @param {number} integrity
     * @returns {mrqxTetraSynergy}
     */
    setIntegrity: function (integrity) {
        this.integrity = integrity
        return this
    },
    /**
     * @param {number} magicCapacity
     * @returns {mrqxTetraSynergy}
     */
    setMagicCapacity: function (magicCapacity) {
        this.magicCapacity = magicCapacity
        return this
    },
}

/**
 * @param {string} key
 * @param {string} variant
 * @param {number} steps
 */
function mrqxTetraTweak(key, variant, steps) {
    this.key = key
    this.variant = variant
    this.steps = steps
    this.properties = {}
}

mrqxTetraTweak.prototype = {
    /**
     * @param {Special.Attribute} attribute
     * @param {"ADDITION" | "MULTIPLY_BASE" | "MULTIPLY_TOTAL"} operation
     * @param {number} value
     * @returns {mrqxTetraTweak}
     */
    addAttribute: function (attribute, operation, value) {
        if (operation == 'MULTIPLY_BASE') attribute = '*' + attribute
        else if (operation == 'MULTIPLY_TOTAL') attribute = '**' + attribute
        if (!this.properties.attributes) this.properties.attributes = {}
        this.properties.attributes[attribute] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number | number[]} value
     * @returns {mrqxTetraTweak}
     */
    addEffect: function (key, value) {
        if (!this.properties.effects) this.properties.effects = {}
        this.properties.effects[key] = value
        return this
    },
    /**
     * @param {string} key
     * @param {number} value
     * @returns {mrqxTetraTweak}
     */
    addAspect: function (key, value) {
        if (!this.properties.aspects) this.properties.aspects = {}
        this.properties.aspects[key] = value
        return this
    },
    /**
     * @param {number} value
     * @returns {mrqxTetraTweak}
     */
    setDurabilityMultiplier: function (value) {
        this.properties.durabilityMultiplier = value
        return this
    },
}

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
     * @param {"hammer_dig" | "pickaxe_dig" | "axe_dig" | "cut" | "pry" | "shovel_dig" | "hoe_dig"} tool
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

/**
 * @param {boolean} replace
 * @param {mrqxTetraCraftingRequirementBase} requirement
 */
function mrqxTetraCraftingEffect(replace, requirement) {
    this.replace = replace
    this.requirement = requirement
    this.outcomes = []
}

mrqxTetraCraftingEffect.prototype = {
    /**
     * @param {mrqxTetraCraftingOutcomeBase} outcome
     * @returns {mrqxTetraCraftingEffect}
     */
    addOutcome: function (outcome) {
        this.outcomes.push(outcome)
        return this
    },
}

/**
 * @param {string} type
 */
function mrqxTetraCraftingRequirementBase(type) {
    this.type = type
}

/**
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementAnd() {
    this.type = 'tetra:and'
    this.requirements = []
}

mrqxTetraCraftingRequirementAnd.prototype = {
    /**
     * @param {mrqxTetraCraftingRequirementBase} requirement
     * @returns {mrqxTetraCraftingRequirementAnd}
     */
    addRequirement: function (requirement) {
        this.requirements.push(requirement)
        return this
    },
}

/**
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementOr() {
    this.type = 'tetra:or'
    this.requirements = []
}

mrqxTetraCraftingRequirementOr.prototype = {
    /**
     * @param {mrqxTetraCraftingRequirementBase} requirement
     * @returns {mrqxTetraCraftingRequirementOr}
     */
    addRequirement: function (requirement) {
        this.requirements.push(requirement)
        return this
    },
}

/**
 * @param {mrqxTetraCraftingRequirementBase} requirement
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementNot(requirement) {
    this.type = 'tetra:not'
    this.requirement = requirement
}

/**
 * @param {'module' | 'improvement' | 'enchantment' | 'repair'} craft
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementCraft(craft) {
    this.type = 'tetra:craft_type'
    this.craft = craft
}

/**
 * @param {string} improvement
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementImprovement(improvement) {
    this.type = 'tetra:improvement'
    this.improvement = improvement
    this.anySlot = false
}

mrqxTetraCraftingRequirementImprovement.prototype = {
    /**
     * @param {number} level
     * @returns {mrqxTetraCraftingRequirementImprovement}
     */
    setLevel: function (level) {
        this.level = level
        return this
    },
    /**
     * @param {number} min
     * @param {number} max
     * @returns {mrqxTetraCraftingRequirementImprovement}
     */
    setLevelInRange: function (min, max) {
        let range = {}
        if (mrqxIsEmpty(min)) range.min = min
        if (mrqxIsEmpty(max)) range.max = max
        this.level = range
        return this
    },
    /**
     * @param {boolean} anySlot
     * @returns {mrqxTetraCraftingRequirementImprovement}
     */
    setIsAnySolt: function (anySlot) {
        this.anySlot = anySlot
        return this
    },
}

/**
 * @param {string} aspect
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementAspect(aspect) {
    this.type = 'tetra:aspect'
    this.aspect = aspect
}

mrqxTetraCraftingRequirementAspect.prototype = {
    /**
     * @param {number} level
     * @returns {mrqxTetraCraftingRequirementAspect}
     */
    setLevel: function (level) {
        this.level = level
        return this
    },
    /**
     * @param {number} min
     * @param {number} max
     * @returns {mrqxTetraCraftingRequirementAspect}
     */
    setLevelInRange: function (min, max) {
        let range = {}
        if (mrqxIsEmpty(min)) range.min = min
        if (mrqxIsEmpty(max)) range.max = max
        this.level = range
        return this
    },
    /**
     * @param {boolean} anySlot
     * @returns {mrqxTetraCraftingRequirementAspect}
     */
    setIsAnySolt: function (anySlot) {
        this.anySlot = anySlot
        return this
    },
}

/**
 * @param {string} key
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementLocked(key) {
    this.type = 'tetra:locked'
    this.key = key
}

/**
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementModule() {
    this.type = 'tetra:module'
}

mrqxTetraCraftingRequirementModule.prototype = {
    /**
     * @param {string} module
     * @returns {mrqxTetraCraftingRequirementModule}
     */
    setModule: function (module) {
        this.module = module
        return this
    },
    /**
     * @param {string} variant
     * @returns {mrqxTetraCraftingRequirementModule}
     */
    setVariant: function (variant) {
        this.variant = variant
        return this
    },
    /**
     * @param {boolean} anySlot
     * @returns {mrqxTetraCraftingRequirementAspect}
     */
    setIsAnySolt: function (anySlot) {
        this.anySlot = anySlot
        return this
    },
}

/**
 * @param {object} material
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementMaterial(material) {
    this.type = 'tetra:material'
    this.material = material
}

/**
 * @param {string} schematic
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementSchematic(schematic) {
    this.type = 'tetra:schematic'
    this.schematic = schematic
}

/**
 * @param {string} slot
 * @extends {mrqxTetraCraftingRequirementBase}
 */
function mrqxTetraCraftingRequirementSlot(slot) {
    this.type = 'tetra:slot'
    this.slot = slot
}

/**
 * @param {string} type
 */
function mrqxTetraCraftingOutcomeBase(type) {
    this.type = type
}

/**
 * @extends {mrqxTetraCraftingOutcomeBase}
 */
function mrqxTetraCraftingOutcomeApplyImprovements() {
    this.type = 'tetra:apply_improvements'
    this.improvements = {}
}

mrqxTetraCraftingOutcomeApplyImprovements.prototype = {
    /**
     * @param {string} key
     * @param {number} level
     * @returns {mrqxTetraCraftingOutcomeApplyImprovements}
     */
    addImprovement: function (key, level) {
        this.improvements[key] = level
        return this
    },
}

/**
 * @extends {mrqxTetraCraftingOutcomeBase}
 */
function mrqxTetraCraftingOutcomeApplyEnchantment() {
    this.type = 'tetra:apply_enchantments'
    this.enchantments = {}
}

mrqxTetraCraftingOutcomeApplyEnchantment.prototype = {
    /**
     * @param {Special.Enchantment} key
     * @param {number} level
     * @returns {mrqxTetraCraftingOutcomeApplyEnchantment}
     */
    addEnchantment: function (key, level) {
        this.enchantments[key] = level
        return this
    },
    /**
     * @param {boolean} force
     * @returns {mrqxTetraCraftingOutcomeApplyEnchantment}
     */
    setIsForce: function (force) {
        this.force = force
        return this
    },
    /**
     * @param {'add' | 'stack' | 'max' | 'replace'} stacking
     * @returns {mrqxTetraCraftingOutcomeApplyEnchantment}
     */
    setStacking: function (stacking) {
        this.stacking = stacking
        return this
    },
}

/**
 * @extends {mrqxTetraCraftingOutcomeBase}
 */
function mrqxTetraCraftingOutcomeRemoveImprovements() {
    this.type = 'tetra:remove_improvements'
    this.improvements = []
}

mrqxTetraCraftingOutcomeRemoveImprovements.prototype = {
    /**
     * @param {string} key
     * @returns {mrqxTetraCraftingOutcomeRemoveImprovements}
     */
    addImprovement: function (key) {
        this.improvements.push(key)
        return this
    },
}

/**
 * @param {number} probability
 * @extends {mrqxTetraCraftingOutcomeBase}
 */
function mrqxTetraCraftingOutcomeMaterialReduction(probability) {
    this.type = 'tetra:material_reduction'
    this.probability = probability
}

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
