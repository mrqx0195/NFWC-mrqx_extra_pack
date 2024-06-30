
global.lunaTYPE_MAP = {
	'kubejs:archotech': Text.of({ "translate": "luna_flesh_reforged.tooltips.archotech" }).color('#9fa07e'),
	'kubejs:chromatic': Text.of({ "translate": "luna_flesh_reforged.tooltips.chromatic" }).color('#873d75'),
}

var result1=Object.assign(global.TYPE_MAP,global.lunaTYPE_MAP);


global.lunaCAST_TIME_REDUCTION = { key: 'irons_spellbooks:cast_time_reduction', name: 'LunaKJSCastTimeReduction', operation: 'addition' }
global.lunaSPELL_RESIST = { key: 'irons_spellbooks:spell_resist', name: 'LunaKJSDpellResist', operation: 'addition' }
global.lunaMAX_MANA = { key: 'irons_spellbooks:max_mana', name: 'LunaKJSMaxMana', operation: 'multiply_base' }
global.lunaSPELL_POWER_INDEMULT = { key: 'irons_spellbooks:spell_power', name: 'lunaKJSSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaATTACK_UP_MULTI_TOTAL = { key: 'minecraft:generic.attack_damage', name: 'lunaKJSAttackUpMultiTotal', operation: 'multiply_total' }
global.lunaATTACK_UP_MULTI_TOTAL_TWICE = { key: 'minecraft:generic.attack_damage', name: 'lunaKJSAttackUpMultiTotalTwice', operation: 'multiply_total' }
global.lunaICE_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:ice_spell_power', name: 'lunaKJSIceSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaFIRE_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:fire_spell_power', name: 'lunaKJSFireSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaLIGHTNING_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:lightning_spell_power', name: 'lunaKJSLightningSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaHOLY_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:holy_spell_power', name: 'lunaKJSHolySpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaENDER_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:ender_spell_power', name: 'lunaKJSEnderSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaBLOOD_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:blood_spell_power', name: 'lunaKJSBloodSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaEVOCATION_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:evocation_spell_power', name: 'lunaKJSEvocationSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaNATURE_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:nature_spell_power', name: 'lunaKJSNatureSpellPowerMultiTotal', operation: 'multiply_total' }
global.lunaELDRITCH_SPELL_POWER_INDEMULT = { key: 'irons_spellbooks:eldritch_spell_power', name: 'lunaKJSeldritchSpellPowerMultiTotal', operation: 'multiply_total' }
global.LunaARMOR_TOUGHNESS_MULTI_BASE = { key: 'minecraft:generic.armor_toughness', name: 'lunakubejsArmorToughnessMultiplyBase', operation: 'multiply_base' }

global.lunaATTRIBUTE_MAP = {
    'LunaKJSCastTimeReduction': global.lunaCAST_TIME_REDUCTION,
    'LunaKJSDpellResist': global.lunaSPELL_RESIST,
    'LunaKJSMaxMana': global.lunaMAX_MANA,
    'lunaKJSSpellPowerMultiTotal': global.lunaSPELL_POWER_INDEMULT,
    'lunaKJSAttackUpMultiTotal': global.lunaATTACK_UP_MULTI_TOTAL,
    'lunaKJSAttackUpMultiTotalTwice': global.lunaATTACK_UP_MULTI_TOTAL_TWICE,
    'lunaKJSIceSpellPowerMultiTotal': global.lunaICE_SPELL_POWER_INDEMULT,
    'lunaKJSFireSpellPowerMultiTotal': global.lunaFIRE_SPELL_POWER_INDEMULT,
    'lunaKJSLightningSpellPowerMultiTotal': global.lunaLIGHTNING_SPELL_POWER_INDEMULT,
    'lunaKJSHolySpellPowerMultiTotal': global.lunaHOLY_SPELL_POWER_INDEMULT,
    'lunaKJSEnderSpellPowerMultiTotal': global.lunaENDER_SPELL_POWER_INDEMULT,
    'lunaKJSBloodSpellPowerMultiTotal': global.lunaBLOOD_SPELL_POWER_INDEMULT,
    'lunaKJSEvocationSpellPowerMultiTotal': global.lunaEVOCATION_SPELL_POWER_INDEMULT,
    'lunaKJSNatureSpellPowerMultiTotal': global.lunaNATURE_SPELL_POWER_INDEMULT,
    'lunaKJSeldritchSpellPowerMultiTotal': global.lunaELDRITCH_SPELL_POWER_INDEMULT,
    'lunakubejsArmorToughnessMultiplyBase': global.LunaARMOR_TOUGHNESS_MULTI_BASE,
}

var result2=Object.assign(global.ATTRIBUTE_MAP,global.lunaATTRIBUTE_MAP);