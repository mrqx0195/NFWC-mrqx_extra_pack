// priority: 799

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

ServerEvents.highPriorityData(event => {
    function registerTetraReplacement(dataModel, key) {
        event.addJson(`tetra:replacements/${key}.json`, dataModel)
        console.log(dataModel)
    }

    // 匠艺核心
    // registerTetraReplacement([
    //     new mrqxTetraReplacement({
    //         "items": ["mrqx_extra_pack:craftsmanship_core"]
    //     }, 'tetra:holo')
    //         // .addModule('holo/repo', 'holo/repo', 'repo/default')
    //         // .addModule('holo/frame', 'holo/frame', 'frame/ancient')
    //         // .addModule('holo/scanner', 'holo/scanner', 'scanner/default')
    //         .addModule('holo/core', 'holo/mrqx_craftsmanship_core', 'mrqx_craftsmanship_core')
    // ]
    //     , 'mrqx_craftsmanship_core'
    // )
})