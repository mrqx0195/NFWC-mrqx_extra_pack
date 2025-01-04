// priority: 1000
const tumorAttriButeByD8 = [
    { name: 'chestcavity:filtration', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:breath_recovery', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:nutrition', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:nerves', multi: 1, max: 5 },
    { name: 'chestcavity:strength', multi: 1, max: 5 },
    { name: 'chestcavity:breath_capacity', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:detoxification', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:speed', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:endurance', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:defense', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:digestion', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:metabolism', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:fire_resistant', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:knockback_resistant', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:water_breath', multi: 0.5, max: 2.5 },
    { name: 'chestcavity:burning_point', multi: 1, max: 8 },
    { name: 'chestcavity:freezing_point', multi: 1, max: 8 },
]

const tumorAttriButeByNeuron = [
    { name: 'chestcavity:filtration', multi: 0.5, max: 3 },
    { name: 'chestcavity:breath_recovery', multi: 0.5, max: 3 },
    { name: 'chestcavity:nutrition', multi: 0.5, max: 3 },
    { name: 'chestcavity:nerves', multi: 1, max: 6 },
    { name: 'chestcavity:strength', multi: 1, max: 6 },
    { name: 'chestcavity:breath_capacity', multi: 0.5, max: 3 },
    { name: 'chestcavity:detoxification', multi: 0.5, max: 3 },
    { name: 'chestcavity:speed', multi: 0.5, max: 3 },
    { name: 'chestcavity:endurance', multi: 0.5, max: 3 },
    { name: 'chestcavity:defense', multi: 0.5, max: 3 },
    { name: 'chestcavity:digestion', multi: 0.5, max: 3 },
    { name: 'chestcavity:metabolism', multi: 0.5, max: 3 },
    { name: 'chestcavity:fire_resistant', multi: 0.5, max: 3 },
    { name: 'chestcavity:knockback_resistant', multi: 0.5, max: 3 },
    { name: 'chestcavity:water_breath', multi: 0.5, max: 3 },
    { name: 'chestcavity:health', multi: 0.5, max: 3 },
    { name: 'chestcavity:burning_point', multi: 1, max: 10 },
    { name: 'chestcavity:freezing_point', multi: 1, max: 10 },
]

function addNeuronrTumorAttributes(obj) {
    tumorAttriButeByNeuron.push(obj)
}
function addD8TumorAttributes(obj) {
    tumorAttriButeByD8.push(obj)
}