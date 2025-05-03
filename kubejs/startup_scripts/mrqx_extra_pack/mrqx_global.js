// priority: -50

global.mrqxTYPE_MAP = {
    'kubejs:mrqx_paper': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_paper" }).color('#ffffff'),
    'kubejs:mrqx_nuclear': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_nuclear" }).color('#a92c24'),
    'kubejs:mrqx_antimatter': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_antimatter" }).color('#43a3a3'),
    'kubejs:mrqx_seaborn': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_seaborn" }).color('#2d38e2'),
    'kubejs:mrqx_cpu': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_cpu" }).color('#1f5b54'),
    'kubejs:mrqx_element_damage': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_element_damage" }).color('#d4b6ee'),
    'kubejs:mrqx_sculk': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_sculk" }).color('#064d4c'),
    'kubejs:mrqx_king': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_king" }).color('#ddd605'),
    'kubejs:mrqx_seven_sins': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_seven_sins" }).color('#800000'),
    'kubejs:mrqx_steam': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_steam" }).color('#bbbbbb'),
    'kubejs:mrqx_celestial_body': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_celestial_body" }).color('#0000a9'),
    'kubejs:mrqx_knight': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_knight" }).color('#c4d6ae'),
    'kubejs:mrqx_obtain_effect': Text.gold({ "translate": "mrqx_extra_pack.tooltips.mrqx_obtain_effect" }),
    'kubejs:mrqx_obtain_effect_only': Text.gold({ "translate": "mrqx_extra_pack.tooltips.mrqx_obtain_effect_only" }),
    'kubejs:mrqx_change_target': Text.gold({ "translate": "mrqx_extra_pack.tooltips.mrqx_change_target" }),
    'kubejs:mrqx_change_target_only': Text.gold({ "translate": "mrqx_extra_pack.tooltips.mrqx_change_target_only" }),
}

var assign1 = Object.assign(global.TYPE_MAP, global.mrqxTYPE_MAP)

global.mrqx_HEALTH_UP_MULTI_BASE = { key: 'minecraft:generic.max_health', name: 'mrqxMaxHealthMultiBase', operation: 'multiply_base' }
global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE = { key: 'irons_spellbooks:cooldown_reduction', name: 'mrqxCooldownReductionMultiBase', operation: 'multiply_base' }
global.mrqx_MANA_REGEN_MULTI_BASE = { key: 'irons_spellbooks:mana_regen', name: 'mrqxManaRegenMultiBase', operation: 'multiply_base' }
global.mrqx_MAX_MANA_MULTI_BASE = { key: 'irons_spellbooks:max_mana', name: 'mrqxMaxManaMultiBase', operation: 'multiply_base' }
global.mrqx_SPELL_POWER_MULTI_BASE = { key: 'irons_spellbooks:spell_power', name: 'mrqxSpellPowerMultiBase', operation: 'multiply_base' }
global.mrqx_FLYING_SPEED = { key: 'minecraft:generic.flying_speed', name: 'mrqxFlyingSpeed', operation: 'addition' }
global.mrqx_FALL_FLYING = { key: 'caelus:fall_flying', name: 'mrqxFallFlying', operation: 'addition' }
global.mrqx_CAST_TIME = { key: 'irons_spellbooks:cast_time_reduction', name: 'mrqxCastTime', operation: 'addition' }
global.mrqx_CAST_TIME_MULTI_BASE = { key: 'irons_spellbooks:cast_time_reduction', name: 'mrqxCastTimeMultiBase', operation: 'multiply_base' }
global.mrqx_MOVEMENT_SPEED_MULTI_BASE = { key: 'minecraft:generic.movement_speed', name: 'mrqxMovementSpeedMultiBase', operation: 'multiply_base' }
global.mrqx_GRAVITY_MULTI_BASE = { key: 'forge:entity_gravity', name: 'mrqxGravityMultiBase', operation: 'multiply_base' }
global.mrqx_GRAVITY_MULTI_TOTAL = { key: 'forge:entity_gravity', name: 'mrqxGravityMultiTotal', operation: 'multiply_total' }
global.mrqx_ATTACK_SPEED_MULTI_TOTAL = { key: 'minecraft:generic.attack_speed', name: 'mrqxAttackSpeedMultiTotal', operation: 'multiply_total' }
global.mrqx_HEALTH_UP_MULTI_TOTAL = { key: 'minecraft:generic.max_health', name: 'mrqxMaxHealthMultiTotal', operation: 'multiply_total' }

global.mrqx_KINGS_NEW_LANCE = { key: 'minecraft:generic.attack_speed', name: 'mrqxKingsNewLance', operation: 'multiply_base' }
global.mrqx_KINGS_BUCKLER_A = { key: 'minecraft:generic.armor', name: 'mrqxKingsBucklerA', operation: 'multiply_base' }
global.mrqx_KINGS_BUCKLER_B = { key: 'minecraft:generic.armor_toughness', name: 'mrqxKingsBucklerB', operation: 'multiply_base' }
global.mrqx_MY_CROWN_A = { key: 'minecraft:generic.attack_damage', name: 'mrqxMyCrownA', operation: 'multiply_base' }
global.mrqx_MY_CROWN_B = { key: 'minecraft:generic.attack_speed', name: 'mrqxMyCrownB', operation: 'multiply_base' }
global.mrqx_MY_CROWN_C = { key: 'minecraft:generic.attack_damage', name: 'mrqxMyCrownC', operation: 'multiply_base' }

global.mrqx_ATTRIBUTE_MAP = {
    'mrqxMaxHealthMultiBase': global.mrqx_HEALTH_UP_MULTI_BASE,
    'mrqxCooldownReductionMultiBase': global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE,
    'mrqxManaRegenMultiBase': global.mrqx_MANA_REGEN_MULTI_BASE,
    'mrqxMaxManaMultiBase': global.mrqx_MAX_MANA_MULTI_BASE,
    'mrqxSpellPowerMultiBase': global.mrqx_SPELL_POWER_MULTI_BASE,
    'mrqxFlyingSpeed': global.mrqx_FLYING_SPEED,
    'mrqxFallFlying': global.mrqx_FALL_FLYING,
    'mrqxCastTime': global.mrqx_CAST_TIME,
    'mrqxCastTimeMultiBase': global.mrqx_CAST_TIME_MULTI_BASE,
    'mrqxMovementSpeedMultiBase': global.mrqx_MOVEMENT_SPEED_MULTI_BASE,
    'mrqxGravityMultiBase': global.mrqx_GRAVITY_MULTI_BASE,
    'mrqxGravityMultiTotal': global.mrqx_GRAVITY_MULTI_TOTAL,
    'mrqxAttackSpeedMultiTotal': global.mrqx_ATTACK_SPEED_MULTI_TOTAL,
    'mrqxMaxHealthMultiTotal': global.mrqx_HEALTH_UP_MULTI_TOTAL,

    'mrqxKingsNewLance': global.mrqx_KINGS_NEW_LANCE,
    'mrqxKingsBucklerA': global.mrqx_KINGS_BUCKLER_A,
    'mrqxKingsBucklerB': global.mrqx_KINGS_BUCKLER_B,
    'mrqxMyCrownA': global.mrqx_MY_CROWN_A,
    'mrqxMyCrownB': global.mrqx_MY_CROWN_B,
    'mrqxMyCrownC': global.mrqx_MY_CROWN_C,
}

var assign2 = Object.assign(global.ATTRIBUTE_MAP, global.mrqx_ATTRIBUTE_MAP)