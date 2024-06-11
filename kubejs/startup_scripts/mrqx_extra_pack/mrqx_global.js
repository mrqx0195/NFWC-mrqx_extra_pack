global.mrqxTYPE_MAP = {
    'kubejs:paper': Text.of({ "translate": "mrqx_extra_pack.tooltips.paper" }).color('#ffffff'),
    'kubejs:nuclear': Text.of({ "translate": "mrqx_extra_pack.tooltips.nuclear" }).color('#a92c24'),
    'kubejs:antimatter': Text.of({ "translate": "mrqx_extra_pack.tooltips.antimatter" }).color('#43a3a3'),
}

var assign1 = Object.assign(global.TYPE_MAP, global.mrqxTYPE_MAP);

global.mrqx_HEALTH_UP_MULTI_BASE = { key: 'minecraft:generic.max_health', name: 'mrqxMaxHealthMultiBase', operation: 'multiply_base' }
global.mrqx_ATTACK_UP_MULTI_BASE = { key: 'minecraft:generic.attack_damage', name: 'mrqxAttackDamageMultiBase', operation: 'multiply_base' }
global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE = { key: 'irons_spellbooks:cooldown_reduction', name: 'mrqxCooldownReductionMultiBase', operation: 'multiply_base' }
global.mrqx_MANA_REGEN_MULTI_BASE = { key: 'irons_spellbooks:mana_regen', name: 'mrqxManaRegenMultiBase', operation: 'multiply_base' }
global.mrqx_MAX_MANA_MULTI_BASE = { key: 'irons_spellbooks:max_mana', name: 'mrqxMaxManaMultiBase', operation: 'multiply_base' }
global.mrqx_SPELL_POWER_MULTI_BASE = { key: 'irons_spellbooks:spell_power', name: 'mrqxSpellPowerMultiBase', operation: 'multiply_base' }

global.mrqx_ATTRIBUTE_MAP = {
    'mrqxMaxHealthMultiBase': global.mrqx_HEALTH_UP_MULTI_BASE,
    'mrqxAttackDamageMultiBase': global.mrqx_ATTACK_UP_MULTI_BASE,
    'mrqxCooldownReductionMultiBase': global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE,
    'mrqxManaRegenMultiBase': global.mrqx_MANA_REGEN_MULTI_BASE,
    'mrqxMaxManaMultiBase': global.mrqx_MAX_MANA_MULTI_BASE,
    'mrqxSpellPowerMultiBase': global.mrqx_SPELL_POWER_MULTI_BASE,
}

var assign2 = Object.assign(global.ATTRIBUTE_MAP, global.mrqx_ATTRIBUTE_MAP);