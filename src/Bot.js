//Imports for Utils functions
const { listCharacters, listMoveTypes, printHelpText, listAliases } = require("./Utils.js");
const { characters, characterAliases } = require("./Utils.js");

//Imports for Discord.js
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//Imports for character files to srape data from
const { scrapeNagoriyukiData, getNagoriyukiInputs } = require('../characters/Nagoriyuki.js');

//Import for config.json file
const config = require('../config.json');
const prefix = config.prefix;

//Commands to get character list
const charCommands = ['Characters', 'Chars', 'characters', 'chars'];


//When the client is ready, indicate in console that the bot is logged in
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

//Check the input from the user to determine bot response
client.once("messageCreate", msg => {
    let messageBuffer = "" // Used to store entire string for comparing request and command to determine how the bot shoud response
    let messageCommand = "";  // To check the value after the '$' to determine how to proceed
    let messageRequest = ""; // To check if there is a specific value after the inital message string to determine if work needs to be done
    let currentInputs = []; // To store inputs for requested character from web scrape
    

    if(!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    else if (msg.content.startsWith(prefix)) {
        messageBuffer = msg.content;

        if (messageBuffer.includes(' ')) {
            messageCommand = messageBuffer.substring(messageBuffer.indexOf('$') + 1, messageBuffer.indexOf(' '));
            messageRequest = messageBuffer.substring(messageBuffer.indexOf(' ') + 1);
        } else {
            messageCommand = messageBuffer.substring(messageBuffer.indexOf('$') + 1, messageBuffer.length);
            messageRequest = "";
        }
        
        //Check to make sure that some value was entered after the dollar sign
        if(messageCommand === "") {
            msg.channel.send("Did you mean to enter a command? Try $help for options");
            return;
        }
        
        if(messageCommand !== "") {
            for(let i = 0; i < charCommands.length; i++) {
                if(messageCommand === charCommands[i]) {
                    msg.channel.send(listCharacters());
                    return;
                }
            }

            //Placeholder code for scraping data for each character
            for(let i = 0; i < characters.length; i++) {
                for (let j = 0; j < characterAliases.length; j++) {
                    if(messageCommand === characters[i] && messageRequest !== "") {
                        if(characters[i] === "Nagoriyuki" || characterAliases[j] === 'Nago') {
                            getNagoriykiData();
                        }
                    } else if (messageCommand === characterAliases[j]) {
                        msg.channel.send(characterAliases[j]);
                        return;
                    }
                }
            }
            
            if(messageCommand === "help" || messageCommand === "Help") {
                msg.channel.send(printHelpText());
                return;
            }

            if(messageCommand === "movetypes" && messageRequest === ""){
                msg.channel.send(listMoveTypes());
                return;
            }
            else if (messageCommand === "movetypes" && messageRequest !== "") {
                msg.channel.send("Functionality coming soon");
                return;
            }

            if(messageRequest === "" && (messageCommand === "aliases" || messageCommand === "Aliases")) {
                msg.channel.send(listAliases());
                return;
            } else {
                msg.channel.send("Not a valid command.") /* User error / Bug Detector */
                return;
            }
        }
    }
});

const getNagoriykiData = () => {
    scrapeNagoriyukiData();
}

//Login to the bot using the bot token
client.login(config.token);