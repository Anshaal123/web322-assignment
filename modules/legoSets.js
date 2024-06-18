const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

async function initialize() {
  try {
    sets = []; 
    setData.forEach((set) => {
      const theme = themeData.find((theme) => theme.id === set.theme_id);
      set.theme = theme ? theme.name : "Unknown";
      sets.push(set);
    });
  } catch (error) {
    throw new Error("Error initializing sets: " + error.message);
  }
}

async function getAllSets() {
  try {
    return sets;
  } catch (error) {
    throw new Error("Error getting all sets: " + error.message);
  }
}

async function getSetByNum(setNum) {
  try {
    const foundSet = sets.find((set) => set.set_num === setNum);

    if (foundSet) {
      return foundSet;
    } else {
      throw new Error("Unable to find the requested set: " + setNum);
    }
  } catch (error) {
    throw new Error("Error getting set by number: " + error.message);
  }
}

async function getSetsByTheme(theme) {
  try {
    const matchingSets = sets.filter(
      (set) => set.theme.toLowerCase().includes(theme.toLowerCase())
    );

    if (matchingSets.length > 0) {
      return matchingSets;
    } else {
      throw new Error("Unable to find sets for the requested theme: " + theme);
    }
  } catch (error) {
    throw new Error("Error getting sets by theme: " + error.message);
  }
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
