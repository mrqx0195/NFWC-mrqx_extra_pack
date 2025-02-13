// priority: 799

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

ServerEvents.highPriorityData(event => {
    function registerTetraCraftingEffects(dataModel, key) {
        event.addJson(`tetra:crafting_effects/${key}.json`, dataModel)
    }

    // 销汀·桉柏
    registerTetraCraftingEffects(new mrqxTetraCraftingEffect(true,
        new mrqxTetraCraftingRequirementAnd()
            .addRequirement(new mrqxTetraCraftingRequirementCraft('module'))
            .addRequirement(new mrqxTetraCraftingRequirementSchematic('sword/mrqx_xiao_amburm'))
    )
        .addOutcome(new mrqxTetraCraftingOutcomeApplyEnchantment()
            .addEnchantment('goety:soul_eater', 10)
            .addEnchantment('biomancy:despoil', 10)
            .setIsForce(true)
            .setStacking('add')
        ),
        'mrqx_xiao_amburm'
    )
})