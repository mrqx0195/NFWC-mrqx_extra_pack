global.mrqxTYPE_MAP = {
    'kubejs:mrqx_paper': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_paper" }).color('#ffffff'),
    'kubejs:mrqx_nuclear': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_nuclear" }).color('#a92c24'),
    'kubejs:mrqx_antimatter': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_antimatter" }).color('#43a3a3'),
    'kubejs:mrqx_seaborn': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_seaborn" }).color('#2d38e2'),
    'kubejs:mrqx_cpu': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_cpu" }).color('#1f5b54'),
    'kubejs:mrqx_element_damage': Text.of({ "translate": "mrqx_extra_pack.tooltips.mrqx_element_damage" }).color('#d4b6ee'),
}

var assign1 = Object.assign(global.TYPE_MAP, global.mrqxTYPE_MAP);

global.mrqx_HEALTH_UP_MULTI_BASE = { key: 'minecraft:generic.max_health', name: 'mrqxMaxHealthMultiBase', operation: 'multiply_base' }
global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE = { key: 'irons_spellbooks:cooldown_reduction', name: 'mrqxCooldownReductionMultiBase', operation: 'multiply_base' }
global.mrqx_MANA_REGEN_MULTI_BASE = { key: 'irons_spellbooks:mana_regen', name: 'mrqxManaRegenMultiBase', operation: 'multiply_base' }
global.mrqx_MAX_MANA_MULTI_BASE = { key: 'irons_spellbooks:max_mana', name: 'mrqxMaxManaMultiBase', operation: 'multiply_base' }
global.mrqx_SPELL_POWER_MULTI_BASE = { key: 'irons_spellbooks:spell_power', name: 'mrqxSpellPowerMultiBase', operation: 'multiply_base' }

global.mrqx_ATTRIBUTE_MAP = {
    'mrqxMaxHealthMultiBase': global.mrqx_HEALTH_UP_MULTI_BASE,
    'mrqxCooldownReductionMultiBase': global.mrqx_COOLDOWN_REDUCTION_MULTI_BASE,
    'mrqxManaRegenMultiBase': global.mrqx_MANA_REGEN_MULTI_BASE,
    'mrqxMaxManaMultiBase': global.mrqx_MAX_MANA_MULTI_BASE,
    'mrqxSpellPowerMultiBase': global.mrqx_SPELL_POWER_MULTI_BASE,
}

var assign2 = Object.assign(global.ATTRIBUTE_MAP, global.mrqx_ATTRIBUTE_MAP);