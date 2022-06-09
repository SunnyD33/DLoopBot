const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const config = require('../config.json');
const prefix = config.prefix;


//Character name arrays - Holds the names of each character currently in the game
const characters = ['Anji Mito', 'Axl Low', 'Baiken', 'Chipp Zanuff', 'Faust', 'Giovanna', 'Goldlewis', 'Happy Chaos',
'I-No', 'Jack-O', 'Ky Kiske', 'Leo WhiteFang', 'May', 
'Millia Rage', 'Nagoriyuki', 'Potemkin', 'Ramlethal', 'Testament', 'Zato-1'];
const characterAliases = ['Anji', 'Axl', 'Baiken', 'Chipp', 'Gio', 'Golddick', 'GoldDick', 'Chaos', 'Ky', 'Leo', 'Millia', 'Nago',
'Pot', 'Ram', 'Zato'];
const moveTypes = ['Normal Moves', 'Special Moves', 'Supers', 'Other'];

//Commands to get character list
const charCommands = ['Characters', 'Chars', 'characters', 'chars'];

//Help string presented to the user when $help or $Help is entered
const helpString = ["- All commands must be prefixed with a $ to get a response.",
"- Currently, I only provide data for GGST but that may to change in the future.",
"- Enter a character name or alias from the game for a general overview of the character.",
"- Enter $aliases or $Aliases to list accepted aliases for characters in the game", 
"- Enter a character name with a move to get details about the move.",
"- Enter the characters name or alias and moves (Ex: $Nagoriyuki moves) and their moveset will be listed",
"- Enter the character name or alias and the type of of (Ex: $Axl Supers) to get that characters overdrives.",
"- Enter command $movetypes to get the types of moves that are available for each character."]

//Printing functions
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

//When the client is ready, indicate in console that the bot is logged in
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

//Check the input from the user to determine bot response
client.on("messageCreate", msg => {
    let messageBuffer = "" // Used to store entire string for comparing request and command to determine how the bot shoud response
    let messageCommand = "";  // To check the value after the '$' to determine how to proceed
    let messageRequest = ""; // To check if there is a specific value after the inital message string to check if work needs to be done

    if(!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    else if (msg.content.startsWith(prefix)) {
        messageBuffer = msg.content;
        messageCommand = messageBuffer.substring(messageBuffer.indexOf('$') + 1, messageBuffer.indexOf(' '));
        messageRequest = messageBuffer.substring(messageBuffer.indexOf(' ') + 1);
        
        //Check to make sure that some value was entered after the dollar sign
        if(messageCommand === "") {
            msg.channel.send("Did you mean to enter a command? Try '$help");
            return;
        }
        
        if(messageCommand !== "") {
            for(i = 0; i < charCommands.length; i++) {
                if(messageCommand === charCommands[i]) {
                    msg.channel.send(listCharacters());
                    return;
                }
            }
            
            if(messageCommand === "help" || messageCommand === "Help") {
                msg.channel.send(printHelpText());
                return;
            }

            if(messageCommand === "movetypes"){
                msg.channel.send(listMoveTypes());
                return;
            }

            if(messageCommand === "aliases" || messageCommand === "Aliases") {
                msg.channel.send(listAliases());
                return;
            }
        }
    }
});

//Login to the bot using the bot token
client.login(config.token);