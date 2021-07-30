const mongoose = require('mongoose')
const {Query} = require("mongoose");

const spellSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: mongoose.Schema.Types.String,
    Duration: mongoose.Schema.Types.String,
    CastTime: mongoose.Schema.Types.String,
    MagicalSchool: mongoose.Schema.Types.String,
    Verbal: mongoose.Schema.Types.Boolean,
    Somatic: mongoose.Schema.Types.Boolean,
    Material: mongoose.Schema.Types.Boolean,
    MaterialText: mongoose.Schema.Types.String,
    Concentration: mongoose.Schema.Types.Boolean,
    Description: mongoose.Schema.Types.String,
    Distance: mongoose.Schema.Types.String,
    Level: mongoose.Schema.Types.Number,
    IsRitual: mongoose.Schema.Types.Boolean,
    BigLvlBonus: mongoose.Schema.Types.String,
    Classes: [mongoose.Schema.Types.String],
    Sources: [mongoose.Schema.Types.String],
})

const SpellModel = mongoose.model('spells', spellSchema)

const add = async (obj = {
    Name, Duration, CastTime, MagicalSchool, Verbal, Somatic,
    Material, MaterialText, Concentration, Description, Distance,
    Level, IsRitual, BigLvlBonus, Classes, Sources
}) => {
    obj._id = new mongoose.Types.ObjectId()
    const res = await SpellModel.create(obj)
    return res
}

// works
const filterQueryByName = (query, filterRules) => {
    if(filterRules.innerName)
        return query.where('Name').in(new RegExp(`^${filterRules.innerName}`))
    else return query
}

const filterQueryByLevel = (query, filterRules) => {
    return query
}

// works
const filterQueryByConcentration = (query, filterRules) => {
    if(filterRules.concentration !== undefined)
        return query.where('Concentration').equals(filterRules.concentration)
    else return query

}

// works
const filterQueryByRitual = (query, filterRules) => {
    if(filterRules.isRitual !== undefined)
        return query.where('IsRitual').equals(filterRules.isRitual)
    else return query


}

const filterQueryByClasses = (query, filterRules) => {
    return query

}

const filterQueryBySources = (query, filterRules) => {
    return query

}

const filterQueryByMagicalSchool = (query, filterRules) => {
    return query

}

const queryFilters = [
    filterQueryBySources,
    filterQueryByClasses,
    filterQueryByName,
    filterQueryByLevel,
    filterQueryByMagicalSchool,
    filterQueryByRitual,
    filterQueryByConcentration,
]

const applyFilters = (query, filterRules) => {
    queryFilters.forEach((filter, index, arr) => {
        query = filter(query, filterRules)
    })
    return query
}

// works
const sortedQuery = (query) => {
    return query.sort("Name")
}

const getFilteredSpells = async (filterRules) => {
    let query = SpellModel.find()
    query = applyFilters(query, filterRules)
    query = sortedQuery(query)
    return query.exec()
}

const DbSpellAPI = {
    add,
    getFilteredSpells
}

module.exports = DbSpellAPI