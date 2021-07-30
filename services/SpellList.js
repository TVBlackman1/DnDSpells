const DbSpellAPI = require('../models/spell')

const addSpell = async (obj = {}) => {
    const localObj = {
        Name: obj.Name || "Empty field",
        Duration: obj.Duration || "Empty field",
        CastTime: obj.CastTime || "Empty field",
        MagicalSchool: obj.MagicalSchool || "Empty field",
        Verbal: obj.Verbal || false,
        Somatic: obj.Somatic || false,
        Material: obj.Material || false,
        MaterialText: obj.MaterialText || "",
        Concentration: obj.Concentration || false,
        Description: obj.Description || "Haven`t description",
        Distance: obj.Distance || "Empty field",
        Level: obj.Level || -1,
        IsRitual: obj.IsRitual || false,
        BigLvlBonus: obj.BigLvlBonus || "Haven`t bonus on big lvl",
        Classes: obj.Classes || ["All classes"],
        Sources: obj.Sources || ["PHB"],
    }
    return await DbSpellAPI.add(localObj)
}

const filtersExample = {
    innerName: "startswith",
    levels: [1, 2, 3],
    concentration: -1, // -1, 0, 1 - not required, no, yes
    isRitual: -1, // -1, 0, 1 - not required, no, yes
    classes: ['class1', 'class2'],
    magicalSchool: "magical school",
    sources: ['source1', 'source2']
}

const getFilteredList = async (filters={}) => {
    try {
        let arr = await DbSpellAPI.getFilteredSpells(filters)
        return {
            spells: arr,
            count: arr.length,
        }
    } catch (e) {
        return e.message
    }
}

const SpellListAPI = {
    addSpell,
    getFilteredList
}

module.exports = SpellListAPI