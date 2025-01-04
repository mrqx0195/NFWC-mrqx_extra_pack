// priority: 1000
const potooBeakSoundMap = {
    'metal': { soundEvent: 'kubejs:beak_metal', pitch: 1, minimumVolume: 0.5 },
    'mangrove_roots': { soundEvent: 'kubejs:beak_mangrove_roots', pitch: 1, minimumVolume: 0.5 },
}

function registerPotooBeakSounds(type, obj) {
    potooBeakSoundMap[type] = obj
}