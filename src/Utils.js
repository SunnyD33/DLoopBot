/* File created to house functions and variables that can be used throughout the code
without cluttering files. These functions should be imported and pass data that is added here */


//Help string presented to the user when $help or $Help is entered
const helpString = ["- All commands must be prefixed with a $ to get a response.",
"- Currently, I only provide data for GGST but that may to change in the future.",
"- Enter a character name or alias from the game for a general overview of the character.",
"- Enter $characters, $chars, $Characters or $Chars to get a list of current characters.",
"- Enter $aliases or $Aliases to list accepted aliases for characters in the game", 
"- Enter a character name with a move to get details about the move.",
"- Enter the characters name or alias and moves (Ex: $Nagoriyuki moves) and their moveset will be listed",
"- Enter the character name or alias and the type of of (Ex: $Axl Supers) to get that characters overdrives.",
"- Enter command $movetypes to get the types of moves that are available for each character."];

//Character name arrays - Holds the names of each character currently in the game
const characters = ['Anji Mito', 'Axl Low', 'Baiken', 'Chipp Zanuff', 'Faust', 'Giovanna', 'Goldlewis', 'Happy Chaos',
'I-No', 'Jack-O', 'Ky Kiske', 'Leo WhiteFang', 'May', 
'Millia Rage', 'Nagoriyuki', 'Potemkin', 'Ramlethal', 'Testament', 'Zato-1'];
const characterAliases = ['Anji', 'Axl', 'Baiken', 'Chipp', 'Gio', 'Golddick', 'GoldDick', 'Chaos', 'Ky', 'Leo', 'Millia', 'Nago',
'Pot', 'Ram', 'Zato'];
const moveTypes = ['Normal Moves', 'Special Moves', 'Supers', 'Other'];


const listCharacters = () => {
    return characters.join('\n');
}

const listMoveTypes = () => {
    return moveTypes.join('\n');
}

const printHelpText = () => {
    return helpString.join('\n');
}

const listAliases = () => {
    return characterAliases.join('\n');
}

module.exports = { listCharacters, listMoveTypes, printHelpText, listAliases, characters, characterAliases };