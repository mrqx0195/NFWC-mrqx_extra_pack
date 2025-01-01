// priority: 799

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

ServerEvents.highPriorityData(event => {
    function registerTetraTweak(dataModel, key, category) {
        event.addJson(`tetra:tweaks/${category}/${key}.json`, dataModel)
    }

    // 反应散热器
    registerTetraTweak(new mrqxTetraTweak('crossbow_tweak/mrqx_heat_vent', 'mrqx_heat_vent', 10)
        .addAttribute('tetra:draw_speed', 'ADDITION', 0.2)
        .addAttribute('tetra:draw_strength', 'ADDITION', 0.5)
        .addEffect('fierySelf', 0.05)
        .addEffect('velocity', 10)
        .setDurabilityMultiplier(0.95)
    )

    // 反应热隔层
    registerTetraTweak(new mrqxTetraTweak('crossbow_tweak/mrqx_thermal_barrier', 'mrqx_thermal_barrier', 10)
        .addAttribute('tetra:draw_speed', 'ADDITION', -0.1)
        .addAttribute('tetra:draw_strength', 'ADDITION', -0.85)
        .addEffect('fierySelf', -0.05)
        .addEffect('velocity', -10)
        .setDurabilityMultiplier(1.05)
    )
})