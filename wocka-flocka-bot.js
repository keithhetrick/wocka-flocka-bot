/*                                                                                                                                      
██╗    ██╗ ██████╗  ██████╗██╗  ██╗ █████╗       ███████╗██╗      ██████╗  ██████╗██╗  ██╗ █████╗     ██████╗  ██████╗ ████████╗
██║    ██║██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗      ██╔════╝██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
██║ █╗ ██║██║   ██║██║     █████╔╝ ███████║█████╗█████╗  ██║     ██║   ██║██║     █████╔╝ ███████║    ██████╔╝██║   ██║   ██║   
██║███╗██║██║   ██║██║     ██╔═██╗ ██╔══██║╚════╝██╔══╝  ██║     ██║   ██║██║     ██╔═██╗ ██╔══██║    ██╔══██╗██║   ██║   ██║   
╚███╔███╔╝╚██████╔╝╚██████╗██║  ██╗██║  ██║      ██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚══╝╚══╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
*/

require("dotenv").config();

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const cron = require("node-cron");
const cheerio = require("cheerio");

// JSON files
const jokes = require("./jsonFiles/jokes.json");
const fortunes = require("./jsonFiles/fortune.json");
const eightBall = require("./jsonFiles/8ball.json");
const quotes = require("./jsonFiles/quotes.json");
const facts = require("./jsonFiles/facts.json");
const resources = require("./jsonFiles/resources.json");
const devFacts = require("./jsonFiles/devFacts.json");
const insults = require("./jsonFiles/insults.json");
const compliments = require("./jsonFiles/compliments.json");
const words = require("./jsonFiles/words.json");
const dictionary = require("./jsonFiles/dictionary.json");
const coffee = require("./jsonFiles/coffeeGif.json");
const memes = require("./jsonFiles/memes.json");
const calendarYear = require("./jsonFiles/calendarYear.json");

// .env & API keys
const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const IP_API_KEY = process.env.IP_GEOLOCATION_API_KEY;
const IPIFY_API_KEY = process.env.IPIFY_API_KEY;
const DISCORD_SERVER_GENERAL_CHANNEL_ID =
  process.env.DISCORD_SERVER_GENERAL_CHANNEL_ID;
const DISCORD_SERVER_MAIN_ID = process.env.DISCORD_SERVER_MAIN_ID;
const DISCORD_SERVER_TEST_CHANNEL = process.env.DISCORD_SERVER_TEST_CHANNEL;
const TOKEN = process.env.TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ======================================================== //
// ======================================================== //
// LOGIN CHECK

client.on("ready", () => {
  console.log(`\nLogged in as ${client.user.tag} 🚀🤖!`);
  console.log("\nWocka-Flocka is ready to rock-a rock-a!!!!\n");
});

client.on("messageDelete", (message) => {
  message.channel.send("Stop deleting messages!");
});

// ======================================================== //
// ======================================================== //
/*
███████╗███╗   ███╗██████╗ ███████╗██████╗     ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██╔════╝██╔══██╗    ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝█████╗  ██║  ██║    ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  ███████╗
██╔══╝  ██║╚██╔╝██║██╔══██╗██╔══╝  ██║  ██║    ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  ╚════██║
███████╗██║ ╚═╝ ██║██████╔╝███████╗██████╔╝    ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗███████║
╚══════╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═════╝     ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
*/
// ======================================================== //
// ======================================================== //

// ======================================================== //
// Embeded Help message
// ======================================================== //

const helpMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Help Commands",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  author: {
    name: "Wocka-Flocka",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  description: "List of help commands for Wocka-Flocka",
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  fields: [
    {
      name: "!help",
      value: "List of avaliable commands",
      inline: false,
    },
    {
      name: "!resources",
      value: "List of avaliable tech-related resources",
      inline: false,
    },
    {
      name: "!games",
      value: "List of avaliable games",
      inline: false,
    },
    {
      name: "!holidays",
      value: "List of holidays commands",
      inline: false,
    },
    {
      name: "\u200b",
      value:
        "---------------------------------------------- \n ***OTHER INTERACTIVE OPTIONS*** \n ----------------------------------------------",
      inline: false,
    },
    {
      name: "\u200b",
      value:
        "**CHATGPT INTEGRATION** - fully operational OpenAI chatbot\n\n_Type '@chat' to talk with ChatGPT_",
      inline: false,
    },
    {
      name: "\u200b",
      value:
        "**CLEVERBOT** - fully responsive & interactive AI chatbot\n\n_Type '@Wocka-Flocka-Bot' to talk with Cleverbot_",
      inline: false,
    },
    {
      name: "\u200b",
      value: "**HOLIDAY TRACKER** - list of holidays",
      inline: false,
    },
    {
      name: "\u200b",
      value:
        "**WEATHER, TIME ZONE & LOCATION TRACKER** \n - get time by zone, and current weather by location",
      inline: false,
    },
    {
      name: "\u200b",
      value:
        "**DICTIONARY** - type '***define*** __*word*__ ' to search in the dictionary",
      inline: false,
    },
  ],
  image: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
};

// ======================================================== //
// Embeded Game message
// ======================================================== //

const gameMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Game Commands",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  author: {
    name: "Wocka-Flocka",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  description: "List of game commands for Wocka-Flocka",
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  fields: [
    {
      name: "\u200b",
      value: "***GAMES & FUN***",
      inline: false,
    },
    {
      name: "tell me a joke",
      value: "Dad joke or rad joke? They're good BECAUSE they're bad",
      inline: true,
    },
    {
      name: "roll the dice",
      value: "Oh CRAPS, let's roll some dice",
      inline: true,
    },
    {
      name: "8ball",
      value: "Replies with an 8ball answer",
      inline: true,
    },
    {
      name: "tell me my fortune",
      value: "Wocka-Flocka sees your future & will tell you your fortune",
      inline: true,
    },
    {
      name: "flip a coin",
      value: "Call it in the air, heads or tails?",
      inline: true,
    },
    {
      name: "rock, paper, scissors",
      value: "Ro-sham-bo! Let's you play rock, paper, or scissors",
      inline: true,
    },
    {
      name: "inspirational quote",
      value: "Wocka-Flocka will give you an inspirational quote",
      inline: true,
    },
    {
      name: "random fact",
      value: "How about a Snapple-cap level random fact?",
      inline: true,
    },
    {
      name: "pick a number",
      value: "Wocka-Flocka can't pick your nose, but it CAN pick a number",
      inline: true,
    },
    {
      name: "random word",
      value: "So you want a random word? Okay I guess",
      inline: true,
    },
    {
      name: "random insult",
      value: "Hurt me more daddy, insult me",
      inline: true,
    },
    {
      name: "random compliment",
      value: "Wocka-Flocka will butter you up",
      inline: true,
    },
    {
      name: "random dev fact",
      value: "How about a random dev fact?",
      inline: true,
    },
    {
      name: "guess a number",
      value: "Guess the number between 1 and 10",
      inline: true,
    },
    {
      name: "pick a card",
      value: "Pick a card, not your nose",
      inline: true,
    },
    {
      name: "tell me a story",
      value: "Storytime with Wocka-Flocka!",
      inline: true,
    },
    {
      name: "tell me a poem",
      value: "He's a poet & didn't know it",
      inline: true,
    },
    {
      name: "tell me a riddle",
      value: "Riddle me this, Batman!",
      inline: true,
    },
    {
      name: "coffee",
      value: "shows random coffee GIF's",
      inline: true,
    },
    {
      name: "memes",
      value: "shows random memes",
      inline: true,
    },
  ],
  image: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
};

// ======================================================== //
// Embeded Holiday message
// ======================================================== //

const holidayMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Holiday Countdown Commands",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  author: {
    name: "Wocka-Flocka",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  description: "List of holiday commands for Wocka-Flocka",
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  fields: [
    {
      name: "Christmas",
      value: "Countdown to Christmas",
      inline: true,
    },
    {
      name: "Thanksgiving",
      value: "Countdown to Thanksgiving",
      inline: true,
    },
    {
      name: "Good Friday",
      value: "Countdown to Good Friday",
      inline: true,
    },
    {
      name: "Halloween",
      value: "Countdown to Halloween",
      inline: true,
    },
    {
      name: "New Years Eve",
      value: "Countdown to New Years",
      inline: true,
    },
    {
      name: "Valentines Day",
      value: "Countdown to Valentines Day",
      inline: true,
    },
    {
      name: "Easter",
      value: "Countdown to Easter",
      inline: true,
    },
    {
      name: "4th of July",
      value: "Countdown to 4th of July",
      inline: true,
    },
    {
      name: "Memorial Day",
      value: "Countdown to Memorial Day",
      inline: true,
    },
    {
      name: "Labor Day",
      value: "Countdown to Labor Day",
      inline: true,
    },
    {
      name: "Cinco de Mayo",
      value: "Countdown to Cinco de Mayo",
      inline: true,
    },
    {
      name: "Independence Day",
      value: "Countdown to Independence Day",
      inline: true,
    },
    {
      name: "Mother's Day",
      value: "Countdown to Mother's Day",
      inline: true,
    },
    {
      name: "Father's Day",
      value: "Countdown to Father's Day",
      inline: true,
    },
    {
      name: "St. Patrick's Day",
      value: "Countdown to St. Patrick's Day",
      inline: true,
    },
    {
      name: "Columbus Day",
      value: "Countdown to Columbus Day",
      inline: true,
    },
    {
      name: "Veterans Day",
      value: "Countdown to Veterans Day",
      inline: true,
    },
    {
      name: "Martin Luther King Jr. Day",
      value: "Countdown to MLK Day",
      inline: true,
    },
    {
      name: "Presidents Day",
      value: "Countdown to Presidents Day",
      inline: true,
    },
    {
      name: "Mardi Gras",
      value: "Countdown to Mardi Gras",
      inline: true,
    },
    {
      name: "Juneteenth",
      value: "Countdown to Juneteenth",
      inline: true,
    },
    {
      name: "Hanukkah",
      value: "Countdown to Hanukkah",
      inline: true,
    },
    {
      name: "Yom Kippur",
      value: "Countdown to Yom Kippur",
      inline: true,
    },
    {
      name: "Rosh Hashanah",
      value: "Countdown to Rosh Hashanah",
      inline: true,
    },
    {
      name: "Passover",
      value: "Countdown to Passover",
      inline: true,
    },
    {
      name: "Earth Day",
      value: "Countdown to Earth Day",
      inline: true,
    },
    {
      name: "Tax Day",
      value: "Countdown to Tax Day",
      inline: true,
    },
  ],
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
};

// ======================================================== //
// Embeded Resource message
// ======================================================== //

const resourceMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Resouce Commands",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  author: {
    name: "Wocka-Flocka",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  description: "List of commands for Algorithm, Data Structures and more!",
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  fields: [
    {
      name: "Algorithm resources",
      value: "Wocka-Flocka will recommend Algorithm resources",
    },
    {
      name: "Data Structures resources",
      value: "Wocka-Flocka will recommend Data Structures resources",
    },
    {
      name: "Front End Development resources",
      value: "Wocka-Flocka will recommend Front End Development resources",
    },
    {
      name: "Back End Development resources",
      value: "Wocka-Flocka will recommend Back End Development resources",
    },
    {
      name: "Full Stack Development resources",
      value: "Wocka-Flocka will recommend Full Stack Development resources",
    },
    {
      name: "React resources",
      value: "Wocka-Flocka will recommend React resources",
    },
    {
      name: "Node resources",
      value: "Wocka-Flocka will recommend Node resources",
    },
    {
      name: "AI resources",
      value: "Wocka-Flocka will recommend AI resources",
    },
  ],
  image: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
};

// ======================================================== //
// Embeded Request User message
// ======================================================== //

const requestUserInfoMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Request User Info Commands",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  author: {
    name: "Wocka-Flocka",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  description: "List of commands for Requesting User Information",
  thumbnail: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  fields: [
    {
      name: "get my avatar",
      value: "Wocka-Flocka will send your avatar",
    },
    {
      name: "get my username",
      value: "Wocka-Flocka will send your username",
    },
    {
      name: "get my tag",
      value: "Wocka-Flocka will send your tag",
    },
    {
      name: "get my id",
      value: "Wocka-Flocka will send your id",
    },
    {
      name: "get my nickname",
      value: "Wocka-Flocka will send your nickname",
    },
    {
      name: "get my discriminator",
      value: "Wocka-Flocka will send your discriminator",
    },
  ],
  image: {
    url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url:
      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
  },
};

// call the !resources command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (
    msg === "!request" ||
    msg === "!request-user" ||
    msg === "!request user" ||
    msg === "!request-info" ||
    msg === "!request info" ||
    msg === "!userinfo" ||
    msg === "!user-info" ||
    msg === "!user info" ||
    msg === "!user" ||
    msg === "!info"
  ) {
    await message.reply({ embeds: [requestUserInfoMessageEmbeded] });
  }

  // call the !resources command to get a list of commands
  if (msg === "!resources" || msg === "!resource") {
    await message.reply({ embeds: [resourceMessageEmbeded] });
  }

  // call the !holiday command to get a list of commands
  if (msg === "!holiday" || msg === "!holidays") {
    await message.reply({ embeds: [holidayMessageEmbeded] });
  }

  // call the !help command to get a list of commands
  if (msg === "!games") {
    await message.reply({ embeds: [gameMessageEmbeded] });
  }

  // call the !help command to get a list of commands
  if (msg === "!help") {
    await message.reply({ embeds: [helpMessageEmbeded] });
  }
});

// ======================================================== //
// ======================================================== //
/*
 █████╗    ██╗        ██████╗██╗  ██╗ █████╗ ████████╗██████╗  ██████╗ ████████╗
██╔══██╗   ██║       ██╔════╝██║  ██║██╔══██╗╚══██╔══╝██╔══██╗██╔═══██╗╚══██╔══╝
███████║   ██║       ██║     ███████║███████║   ██║   ██████╔╝██║   ██║   ██║   
██╔══██║   ██║       ██║     ██╔══██║██╔══██║   ██║   ██╔══██╗██║   ██║   ██║   
██║  ██║██╗██║██╗    ╚██████╗██║  ██║██║  ██║   ██║   ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝╚═╝╚═╝╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═════╝  ╚═════╝    ╚═╝   
*/
// ======================================================== //
// ======================================================== //

let conversation = [];

// CLEVERBOT AI
client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase().replace(/[^a-z0-9\s]/gi, "");

  if (message.author.bot) return false;
  if (message.mentions.has(client.user.id)) {
    let text = msg;
    text = text.substring(text.indexOf(">") + 2, text.length);
    console.log(text);

    cleverbot(text, conversation).then((res) => {
      conversation.push(text);
      conversation.push(res);
      message.channel.send(res);
    });
  }
});

// OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("messageCreate", async (message) => {
  // make message lowercase
  const msg = message.content;
  try {
    // check so that the bot doesn't reply to itself
    if (message.author.bot) return;

    // check that the message is in the channel that the bot is allowed to respond in
    // if (message.channel.id !== channelID) return;

    // check that the message starts with the prefix @ChatGPT, push all possible prefixes into an array for checking
    const prefixes = [
      "@chatgpt",
      "@chat",
      "@gpt",
      "@gpt-3",
      "@gpt3",
      "@chatgpt3",
      "@ai",
      "@openai",
      "@openai-gpt",
      "@openai-gpt-3",
      "@openai-gpt3",
    ];
    if (!prefixes.some((prefix) => msg.startsWith(prefix))) return;

    // remove the prefix  from the message
    const messageContent = msg.replace(prefixes, "");

    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `ChatGPT is a friendly chatbot. \n\`ChatGPT: Hello, how are you?\n\ ${message.author.username}: ${messageContent}\n\`ChatGPT:`,
      temperature: 0.9,
      max_tokens: 100,
      stop: ["ChatGTP:", "Keith Hetrick:"],
    });

    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (error) {
    console.log(error);
  }
});

client.login(TOKEN);

// ======================================================== //
// ======================================================== //
/*
███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗      █████╗ ██╗   ██╗████████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ███████║██║   ██║   ██║   ██║   ██║██╔████╔██║███████║   ██║   ██║██║   ██║██╔██╗ ██║
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██╔══██║██║   ██║   ██║   ██║   ██║██║╚██╔╝██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║ ╚═╝ ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
*/
// ======================================================== //
// ======================================================== //

// AUTOMATED "QUOTE OF THE DAY" MESSAGE every 24 hours at 9 am using node-cron
async function quoteOfTheDay() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  if (
    randomQuote.quoteAuthor === undefined ||
    randomQuote.quoteAuthor === "" ||
    randomQuote.quoteAuthor === null ||
    randomQuote.quoteAuthor === " "
  ) {
    randomQuote.quoteAuthor = "Unknown";
  }

  console.log(
    `Quote of the day:\r\n\n "${randomQuote.quoteText}"\r\n - ${randomQuote.quoteAuthor}.\r\n\n Have a great day!\r\n\n\r\n\n- Sent by Wocka-Flocka using node-cron`
  );

  // make reply a embeded message
  const quoteMessageEmbeded = {
    title: "Quote of the day:",
    description: `"${randomQuote.quoteText}"\r\n - ${randomQuote.quoteAuthor}.\r\n\n *Have a great day!*`,
    timestamp: new Date().toISOString(),
    footer: {
      text: "Wocka-Flocka",
      icon_url:
        "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
    },
  };

  client.channels.cache.get(DISCORD_SERVER_GENERAL_CHANNEL_ID).send({
    embeds: [quoteMessageEmbeded],
  });
}

// CRON JOB
cron.schedule(
  "0 9 * * *",
  async () => {
    await quoteOfTheDay();
  },
  {
    scheduled: true,
    timezone: "America/Chicago",
  }
);

// Welcome message to new members to the server
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  if (!channel) return;

  channel.send({
    embeds: [
      {
        title: `Welcome to the server, ${member.user.username}!`,
        description: "We're so glad you're here. 🚀",
        fields: [
          {
            name: "Please read the rules",
            value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            name: "Please introduce yourself",
            value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "Wocka-Flocka",
          icon_url:
            "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
        },
      },
    ],
  });
});

// show username in welcome message
client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!welcome") {
    message.reply({
      embeds: [
        {
          title: `Welcome to the server, ${message.author.username}!`,
          description: "We're so glad you're here. 🚀",
          fields: [
            {
              name: "Please read the rules",
              value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
            {
              name: "Please introduce yourself",
              value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          ],
          timestamp: new Date(),
          footer: {
            text: "Wocka-Flocka",
            icon_url:
              "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
          },
        },
      ],
    });
  }

  // ======================================================== //
  // ======================================================== //
  /*
███╗   ███╗███████╗███████╗███████╗███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗ ██████╗      █████╗ ██╗      ██████╗  ██████╗ 
████╗ ████║██╔════╝██╔════╝██╔════╝██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝     ██╔══██╗██║     ██╔════╝ ██╔═══██╗
██╔████╔██║█████╗  ███████╗███████╗█████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║██║  ███╗    ███████║██║     ██║  ███╗██║   ██║
██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██║   ██║    ██╔══██║██║     ██║   ██║██║   ██║
██║ ╚═╝ ██║███████╗███████║███████║███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║╚██████╔╝    ██║  ██║███████╗╚██████╔╝╚██████╔╝
╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
*/
  // ======================================================== //
  // ======================================================== //

  if (
    msg.startsWith("send message to") ||
    msg.startsWith("send a message to")
  ) {
    const channelName =
      msg.split("send message to ")[1] || msg.split("send a message to ")[1];
    const channel = client.channels.cache.find((ch) => ch.name === channelName);

    if (!channel) {
      // sort avaliable channels in server by name
      const channels = client.channels.cache
        .map((ch) => ch.name)
        .sort((a, b) => a.localeCompare(b));

      message.reply({
        embeds: [
          {
            title: `Send a message to *${channelName}* channel`,
            description:
              "I can't find that channel. Please make sure you typed the channel name correctly. Here are the channels I can find: \r\n\n" +
              channels.join(", "),
            timestamp: new Date().toISOString(),
            footer: {
              text: "Wocka-Flocka",
              icon_url:
                "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
            },
          },
        ],
      });
    } else {
      // send embeded message as reply
      message.reply({
        embeds: [
          {
            title: `Send a message to *${channelName}* channel`,
            description:
              "What message do you want to send to the channel? (type 'cancel' to cancel)",
            timestamp: new Date().toISOString(),
            footer: {
              text: "Wocka-Flocka",
              icon_url:
                "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
            },
          },
        ],
      });

      // wait for user to reply with message
      const filter = (m) => m.author.id === message.author.id;

      message.channel
        .awaitMessages({ filter, max: 1, time: 30000, errors: ["time"] })
        .then((collected) => {
          if (collected.first().content.toLowerCase() === "cancel") {
            return message.reply("Canceled");
          } else {
            channel.send({
              embeds: [
                {
                  title: `Message: ${collected.first().content}`,
                  description: `Message from *${message.author.username}*`,
                  timestamp: new Date().toISOString(),
                  footer: {
                    text: "Wocka-Flocka",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
                  },
                },
              ],
            });
            message.author.send({
              embeds: [
                {
                  title: `Message sent to *${channelName}* channel`,
                  description: `Message sent: ${collected.first().content}`,
                  timestamp: new Date().toISOString(),
                  footer: {
                    text: "Wocka-Flocka",
                    icon_url:
                      "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
                  },
                },
              ],
            });
          }
        })
        .catch(() => {
          message.reply("No message after 30 seconds, operation canceled.");
        });
    }
  }

  // Send a message to a DM channel
  if (msg === "send message to dm") {
    message.author.send("Hello! 🚀");
  }

  // Get list of members in the server
  if (
    msg === "get current members" ||
    msg === "get members" ||
    msg === "total members"
  ) {
    // fetch all current members in the server
    const list = client.guilds.cache.get(DISCORD_SERVER_MAIN_ID);

    // loop through the list of members and send a message to each member
    list.members.cache.forEach((member) => {
      console.log(member.user.username);
    });

    // send embeded message to author along wth server name
    const members = list.members.cache;
    message.author.send({
      embeds: [
        {
          title: `Total members of *${list.name}:* \n${members.size}`,
          timestamp: new Date(),
          footer: {
            text: "Wocka-Flocka",
            icon_url:
              "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
          },
        },
      ],
    });
    console.log(`Total members: ${members.size}`);
  }
});

// ======================================================== //
// ======================================================== //
/*
 ██████╗  █████╗ ███╗   ███╗███████╗███████╗       ██╗       ███████╗██╗   ██╗███╗   ██╗
██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝       ██║       ██╔════╝██║   ██║████╗  ██║
██║  ███╗███████║██╔████╔██║█████╗  ███████╗    ████████╗    █████╗  ██║   ██║██╔██╗ ██║
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║    ██╔═██╔═╝    ██╔══╝  ██║   ██║██║╚██╗██║
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║    ██████║      ██║     ╚██████╔╝██║ ╚████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝    ╚═════╝      ╚═╝      ╚═════╝ ╚═╝  ╚═══╝
*/
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase().replace(/[^a-z0-9\s]/gi, "");

  // "Pick a number" command
  if (msg === "pick a number") {
    const randomNum = Math.floor(Math.random() * 100 + 1);
    message.reply(`I pick the number ${randomNum}!`);
  }

  // "Roll the dice" command
  if (msg === "roll the dice") {
    const diceRoll1 = Math.floor(Math.random() * 6) + 1;
    const diceRoll2 = Math.floor(Math.random() * 6) + 1;
    const randomNumber = diceRoll1 + diceRoll2;

    // message that shows both dice rolls
    if (randomNumber === 2) {
      message.reply(
        `Tutu 🩰! You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}!`
      );
    } else if (randomNumber === 3) {
      message.reply(
        `Craps 🎲! You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}`
      );
    } else if (randomNumber === 11) {
      message.reply(
        `Yo! You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber} 🎲`
      );
    } else if (randomNumber === 12) {
      message.reply(
        `Box cars 🎲! You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}!`
      );
    } else if (randomNumber === 7) {
      message.reply(
        `Lucky number 7 🍀! You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}!`
      );
    } else if (randomNumber === 9) {
      message.reply(
        `Bang bang, Jesse James 🔫 You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}`
      );
    } else
      message.reply(
        `You rolled a ${diceRoll1} and a ${diceRoll2}, which makes ${randomNumber}`
      );
  }

  // "8ball" command
  if (msg === "8ball") {
    // 8ball responses come from json file
    const randomEightBall =
      eightBall[Math.floor(Math.random() * eightBall.length)];
    message.reply(`The 8 ball says: ${randomEightBall}`);
  }

  // "Tell me a joke" command
  if (
    msg === "tell me a joke" ||
    msg === "tell me a dad joke" ||
    msg === "joke time"
  ) {
    // jokes come from json file
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(randomJoke);
  }

  // "Tell me my fortune" command
  if (
    msg === "tell me my fortune" ||
    msg === "tell me my future" ||
    msg === "fortune" ||
    msg === "future"
  ) {
    // fortunes come from json file
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    message.reply(`Fortune teller says: ${randomFortune}`);
  }

  // "Flip a coin" command
  if (msg === "flip a coin") {
    const coinFlip = Math.floor(Math.random() * 2) + 1;
    if (coinFlip === 1) {
      message.reply("Heads 🪙");
    } else if (coinFlip === 2) {
      message.reply("Tails 🪙");
    }
  }

  // "Rock, paper, scissors" command
  if (msg === "rock paper scissors") {
    const rockPaperScissors = Math.floor(Math.random() * 3) + 1;
    if (rockPaperScissors === 1) {
      message.reply("Rock 🪨");
    } else if (rockPaperScissors === 2) {
      message.reply("Paper 📰");
    } else if (rockPaperScissors === 3) {
      message.reply("Scissors ✂️");
    }
  }

  // "pick a card" generator
  const suits = {
    1: "Spades",
    2: "Diamonds",
    3: "Clubs",
    4: "Hearts",
  };

  if (msg === "pick a card") {
    const randomSuit = Math.floor(Math.random() * 4) + 1;
    const randomCard = Math.floor(Math.random() * 13) + 1;

    if (randomCard === 1) {
      message.reply(`Huzzah! Your card is the Ace of ${suits[randomSuit]}`);
    } else if (randomCard === 11) {
      message.reply(
        `Hit the roaod Jack! You picked the Jack of ${suits[randomSuit]}`
      );
    } else if (randomCard === 12) {
      message.reply(
        `Hey Majesty! Your card is the Queen of ${suits[randomSuit]}`
      );
    } else if (randomCard === 13) {
      message.reply(
        `Your highness picked the King of ${suits[randomSuit]}. Long live the King!`
      );
    } else {
      message.reply(`Your card is the ${randomCard} of ${suits[randomSuit]}`);
    }
  }

  // ======================================================== //
  // ======================================================== //
  /*
  ███╗   ██╗██╗   ██╗███╗   ███╗██████╗ ███████╗██████╗      █████╗ ██╗      ██████╗  ██████╗ 
  ████╗  ██║██║   ██║████╗ ████║██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
  ██╔██╗ ██║██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝    ███████║██║     ██║  ███╗██║   ██║
  ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗    ██╔══██║██║     ██║   ██║██║   ██║
  ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║    ██║  ██║███████╗╚██████╔╝╚██████╔╝
  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
  */
  // ======================================================== //
  // ======================================================== //

  // "guess a number" game
  // let gameRunning = false;

  if (
    msg === "guess a number" ||
    msg === "guess the number" ||
    msg === "guess" ||
    msg === "guessing game" ||
    msg === "number game" ||
    msg === "number guessing game" ||
    msg === "guessing number game"
  ) {
    // generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    // ask the user to guess the number
    message.reply(
      "Guess a number between 1 and 10. You have 5 guesses to get it right!\nType 'cancel' to cancel the game."
    );
    // gameRunning = true;

    // if game is already running, throw error
    // if (gameRunning) {
    //   message.reply("A game is already running!");
    //   return;
    // }

    // filter messages to see if they are from the person who guessed the number
    const filter = (m) => m.author.id === message.author.id;
    // collect their messages
    const collector = message.channel.createMessageCollector(filter, {
      time: 10000,
    });

    // keep track of how many guesses they have left
    let guesses = 5;
    // if they guess the number correctly, end the game
    collector.on("collect", (m) => {
      if (m.content == randomNumber) {
        message.reply(`You got it! The number was ${randomNumber}! 🎉`);
        collector.stop();
        // gameRunning = false;
      }
      // if they guess the number incorrectly, let them know if they're too high or too low
      // if they have 0 guesses left, end the game
      else if (m.content != randomNumber) {
        if (m.content > randomNumber) {
          guesses--;
          message.reply(`Too high! You have ${guesses} guesses left.`);
          if (guesses === 0) {
            message.reply(
              "Game over! You're out of guesses. The number was " +
                randomNumber +
                ". Better luck next time! 😅"
            );
            collector.stop();
            // gameRunning = false;
          }
        } else if (m.content < randomNumber) {
          guesses--;
          message.reply(`Too low! You have ${guesses} guesses left.`);
          if (guesses === 0) {
            message.reply(
              "Game over! You're out of guesses. The number was " +
                randomNumber +
                ". Better luck next time! 😅"
            );
            collector.stop();
            // gameRunning = false;
          }
        }
      }
      // if the user types "cancel", end the collector and inform the user
      if (m.content === "cancel") {
        collector.stop();
        // gameRunning = false;
        message.reply("Game cancelled.");
      }
    });
  }

  // ======================================================== //

  // "inspirational quote" command
  if (msg === "inspirational quote" || msg === "quote") {
    // quotes come from json file & declared above the automated quote of the day function
    // if no author is listed, use "Unknown"
    if (
      randomQuote.quoteAuthor === undefined ||
      randomQuote.quoteAuthor === "" ||
      randomQuote.quoteAuthor === null ||
      randomQuote.quoteAuthor === " "
    ) {
      randomQuote.quoteAuthor = "Unknown";
    }
    message.reply(`"${randomQuote.quoteText}" - ${randomQuote.quoteAuthor}`);
  }

  // "random fact" generator
  if (msg === "random fact" || msg === "fact") {
    // facts come from json file
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    message.reply(randomFact);
  }

  // "random dev fact" generator
  if (msg === "random dev fact") {
    // devFacts come from json file
    const randomDevFact = devFacts[Math.floor(Math.random() * devFacts.length)];
    message.reply(`Did you know? ${randomDevFact}`);
  }

  // "random word" generator
  if (msg === "random word") {
    // words come from json file
    const randomWord = words[Math.floor(Math.random() * words.length)];
    message.reply(`I pick the word...${randomWord}!`);
  }

  // "random insult" generator
  if (
    msg === "random insult" ||
    msg === "insult" ||
    msg === "insult me" ||
    msg === "hurt me" ||
    msg === "hurt my feelings"
  ) {
    // insults come from json file
    const randomInsult = insults[Math.floor(Math.random() * insults.length)];
    message.reply(randomInsult);
  }

  // "random compliment" generator
  if (
    msg === "random compliment" ||
    msg === "compliment" ||
    msg === "compliment me"
  ) {
    // compliments come from json file
    const randomCompliment =
      compliments[Math.floor(Math.random() * compliments.length)];
    message.reply(randomCompliment);
  }

  // "coffee" command
  if (msg === "coffee") {
    const randomCoffee = coffee[Math.floor(Math.random() * coffee.length)];
    message.reply(randomCoffee);
  }

  // "memes"command
  if (msg === "memes") {
    // memes come from memes.json file
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    console.log(randomMeme.image);
    message.reply(randomMeme.image);
  }

  // "tell me a story" command
  if (
    msg === "short story" ||
    msg === "tell me a story" ||
    msg === "story time"
  ) {
    axios
      .get("https://shortstories-api.onrender.com/", {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      })
      .then((res) => {
        console.log(res.data);
        let story = res.data.story;
        let title = res.data.title;
        let author = res.data.author;
        let moral = res.data.moral;
        message.reply(
          `${title} by ${author} \n\n ${story} \n\nMoral: ${moral}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // "tell me a poem" command
  if (msg === "poem" || msg === "tell me a poem") {
    axios
      .get("https://www.beanpoems.com/api/poems")
      .then((res) => {
        console.log(res.data);
        let nums = [0, 1, 2, 3, 4];

        let randomPoem = nums[Math.floor(Math.random() * nums.length)];
        let poem = res.data[randomPoem].body;
        let title = res.data[randomPoem].title;
        let description = `_${res.data[randomPoem].description}_`;
        message.reply(`${title} - ${description} \n\n ${poem}`);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }

  // "tell me a riddle" command
  if (msg === "riddle" || msg === "tell me a riddle") {
    axios
      .get("https://riddles-api.vercel.app/random")
      .then((res) => {
        console.log(res.data);
        let riddle = res.data.riddle;
        let answer = res.data.answer;

        message.reply(`\n _Riddle_: ${riddle}...`);
        setTimeout(function () {
          message.reply(`_The answer is_...${answer}`);
        }, 10000);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }

  // WEBSCRAPER FOR RANDOM SENTENCE GENERATOR
  // random sentence generator
  if (
    msg === "random sentence" ||
    msg === "sentence" ||
    msg === "sentence me" ||
    msg === "randosentence"
  ) {
    axios
      .get("https://fungenerators.com/random/sentence")
      .then((res) => {
        const $ = cheerio.load(res.data);
        let sentence = $(
          "body > section.moduler.wrapper_404 > div.container > div > div > div > h2"
        ).text();
        message.reply(
          `I've scraped the web and found the sentence:\n\n _${sentence}_\n\nHope you like it!`
        );
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }

  // ======================================================== //
  /*
  ██████╗ ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██████╗ ██╗   ██╗     █████╗ ██╗      ██████╗  ██████╗ 
  ██╔══██╗██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
  ██║  ██║██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝     ███████║██║     ██║  ███╗██║   ██║
  ██║  ██║██║██║        ██║   ██║██║   ██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝      ██╔══██║██║     ██║   ██║██║   ██║
  ██████╔╝██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║██║  ██║██║  ██║   ██║       ██║  ██║███████╗╚██████╔╝╚██████╔╝
  ╚═════╝ ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
  */
  // ======================================================== //

  // Dictionary functionality
  if (msg.startsWith("define")) {
    const word = msg.slice(7).trim();
    const definition = dictionary[word];
    const prefixMessage = `The definition of ***${word}*** is: \n\n`;

    // Error handling
    if (
      word === undefined ||
      word === "" ||
      word === null ||
      word.length === 0
    ) {
      message.reply("No word was entered. Please enter a word to search!");
    } else if (dictionary[word] === undefined) {
      message.reply(`Sorry, I can't find the definition of *${word}*!`);
    } else if (
      definition === undefined ||
      definition === "" ||
      definition === null ||
      definition.length === undefined
    ) {
      message.reply(`Sorry, I don't know the definition of ${word}!`);
    } else if (definition?.length <= 2000) {
      message.reply(prefixMessage + definition);
    } else {
      // check message length & split message if necessary
      const messageLength = parseInt(prefixMessage?.length);
      const firstMessage = definition?.substring(0, 2000 - messageLength);
      const secondMessage = definition?.substring(2000);
      const standardMessage = prefixMessage + firstMessage;

      // main message
      message.reply(standardMessage);

      // secondary error handling
      if (definition?.length > 2000 || secondMessage?.length <= 2000) {
        message.reply(
          `The definition of ${word} is too long! Here's a link to the definition: https://www.merriam-webster.com/dictionary/${word}`
        );
      } else {
        // secondary message
        message.reply(secondMessage);
      }
    }
  }

  // ======================================================== //
  // ======================================================== //
  // DATES
  // ======================================================== //
  // ======================================================== //

  // getFullYear() helper function
  const getFullYear = () => {
    const today = new Date();
    return today.getFullYear();
  };

  // "today" variable
  const today = new Date();

  // "month" variable
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // "day" variable
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // "what year is it?" command
  if (
    msg === "what year is it?" ||
    msg === "what year is it" ||
    msg === "whats the year" ||
    msg === "whats the current year" ||
    msg === "current year"
  ) {
    message.reply(`It's ${getFullYear()}!`);
  }

  // "what month is it?" command
  if (
    msg === "what month is it?" ||
    msg === "what month is it" ||
    msg === "whats the month" ||
    msg === "current month"
  ) {
    message.reply(`It's ${months[today.getMonth()]}!`);
  }

  // "what day is it?" command
  if (
    msg === "what day is it?" ||
    msg === "what day is it" ||
    msg === "current day" ||
    msg === "whats the current day"
  ) {
    message.reply(`It's ${days[today.getDay()]}!`);
  }

  // "what is the date?" command
  if (
    msg === "what is the date?" ||
    msg === "what is the date" ||
    msg === "date" ||
    msg === "current date" ||
    msg === "whats the date" ||
    msg === "whats the current date"
  ) {
    const currentDate = new Date();
    message.channel.send(
      `Today is ${currentDate.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    );
  }

  // ======================================================== //
  // ======================================================== //
  /*
  ██╗  ██╗ ██████╗ ██╗     ██╗██████╗  █████╗ ██╗   ██╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
  ██║  ██║██╔═══██╗██║     ██║██╔══██╗██╔══██╗╚██╗ ██╔╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
  ███████║██║   ██║██║     ██║██║  ██║███████║ ╚████╔╝        ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
  ██╔══██║██║   ██║██║     ██║██║  ██║██╔══██║  ╚██╔╝         ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
  ██║  ██║╚██████╔╝███████╗██║██████╔╝██║  ██║   ██║          ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝          ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
  */
  // ======================================================== //
  // ======================================================== //

  // "days until" command
  if (
    msg.startsWith("days until") ||
    msg.startsWith("when is") ||
    msg.startsWith("whens")
  ) {
    // regex to remove user input from the message
    let event = msg.replace(/days until|when is|whens/gi, "").trim();
    console.log("EVENT: ", event);

    const eventDate = new Date(getFullYear(), 0, 1);

    // Leap year function to prevent the bot from crashing on Feb 29th
    const isLeapYear =
      (getFullYear() % 4 === 0 && getFullYear() % 100 !== 0) ||
      getFullYear() % 400 === 0;
    if (isLeapYear) {
      if (eventDate.getMonth() === 1 && eventDate.getDate() === 29) {
        eventDate.setDate(28);
      }
    }

    // check if next year is Leap year
    if (eventDate.getMonth() === 1 && eventDate.getDate() === 29) {
      if (getFullYear() % 4 !== 0) {
        eventDate.setFullYear(eventDate.getFullYear() + 1);
      }
    }

    // set all events to an hash map to check if event is valid
    const eventCheckMap = {};

    // MAIN EVENT CHECKER/SETTER
    if (
      event === "christmas" ||
      event === "xmas" ||
      event === "x-mas" ||
      event === "christmas day"
    ) {
      eventDate.setMonth(11);
      eventDate.setDate(25);
      // add event names & eventDate to eventCheckMap
      eventCheckMap["christmas"] = eventDate;
      eventCheckMap["xmas"] = eventDate;
      eventCheckMap["x-mas"] = eventDate;
      eventCheckMap["christmas day"] = eventDate;
    }
    if (event === "new years eve" || event === "nye" || event === "new years") {
      eventDate.setMonth(11);
      eventDate.setDate(31);
      eventCheckMap["new years eve"] = eventDate;
      eventCheckMap["new years"] = eventDate;
      eventCheckMap["nye"] = eventDate;
    }
    if (event === "my birthday" || event === "my bday" || event === "bday") {
      eventDate.setMonth(2);
      eventDate.setDate(8);
      eventCheckMap["my birthday"] = eventDate;
      eventCheckMap["my bday"] = eventDate;
      eventCheckMap["bday"] = eventDate;
    }
    if (
      event === "halloween" ||
      event === "halloween day" ||
      event === "spooky"
    ) {
      eventDate.setMonth(9);
      eventDate.setDate(31);
      eventCheckMap["halloween"] = eventDate;
      eventCheckMap["halloween day"] = eventDate;
      eventCheckMap["spooky"] = eventDate;
    }
    if (
      event === "valentines day" ||
      event === "valentines" ||
      event === "valentine" ||
      event === "love day" ||
      event === "singles awareness day (aka valentines Day)" ||
      event === "singles awareness day" ||
      event === "singles awareness"
    ) {
      eventDate.setMonth(1);
      eventDate.setDate(14);
      eventCheckMap["valentines day"] = eventDate;
      eventCheckMap["valentines"] = eventDate;
      eventCheckMap["valentine"] = eventDate;
      eventCheckMap["love day"] = eventDate;
      eventCheckMap["singles awareness day (aka valentines Day)"] = eventDate;
      eventCheckMap["singles awareness day"] = eventDate;
      eventCheckMap["singles awareness"] = eventDate;
    }
    if (
      event === "thanksgiving" ||
      event === "turkey day" ||
      event === "turkey" ||
      event === "thanksgiving day" ||
      event === "gobble gobble" ||
      event === "gobble"
    ) {
      eventDate.setMonth(10);
      eventDate.setDate(23);
      eventCheckMap["thanksgiving"] = eventDate;
      eventCheckMap["turkey day"] = eventDate;
      eventCheckMap["turkey"] = eventDate;
      eventCheckMap["thanksgiving day"] = eventDate;
      eventCheckMap["gobble gobble"] = eventDate;
      eventCheckMap["gobble"] = eventDate;
    }
    if (
      event === "easter" ||
      event === "easter day" ||
      event === "easter egg" ||
      event === "easter sunday"
    ) {
      eventDate.setMonth(3);
      eventDate.setDate(9);
      eventCheckMap["easter"] = eventDate;
      eventCheckMap["easter day"] = eventDate;
      eventCheckMap["easter egg"] = eventDate;
      eventCheckMap["easter sunday"] = eventDate;
    }
    if (
      event === "4th of july" ||
      event === "july 4th" ||
      event === "july 4" ||
      event === "4 of july" ||
      event === "independence day" ||
      event === "independence"
    ) {
      eventDate.setMonth(6);
      eventDate.setDate(4);
      eventCheckMap["4th of july"] = eventDate;
      eventCheckMap["july 4th"] = eventDate;
      eventCheckMap["july 4"] = eventDate;
      eventCheckMap["4 of july"] = eventDate;
      eventCheckMap["independence day"] = eventDate;
      eventCheckMap["independence"] = eventDate;
    }
    if (event === "memorial day" || event === "memorial") {
      eventDate.setMonth(4);
      eventDate.setDate(29);
      eventCheckMap["memorial day"] = eventDate;
      eventCheckMap["memorial"] = eventDate;
    }
    if (event === "labor day" || event === "labor") {
      eventDate.setMonth(8);
      eventDate.setDate(4);
      eventCheckMap["labor day"] = eventDate;
      eventCheckMap["labor"] = eventDate;
    }
    if (event === "mothers day" || event === "mothers") {
      eventDate.setMonth(4);
      eventDate.setDate(14);
      eventCheckMap["mothers day"] = eventDate;
      eventCheckMap["mothers"] = eventDate;
    }
    if (event === "fathers day" || event === "fathers") {
      eventDate.setMonth(5);
      eventDate.setDate(18);
      eventCheckMap["fathers day"] = eventDate;
      eventCheckMap["fathers"] = eventDate;
    }
    if (event === "columbus day" || event === "columbus") {
      eventDate.setMonth(9);
      eventDate.setDate(12);
      eventCheckMap["columbus day"] = eventDate;
      eventCheckMap["columbus"] = eventDate;
    }
    if (event === "groundhog day" || event === "groundhog") {
      eventDate.setMonth(1);
      eventDate.setDate(2);
      eventCheckMap["groundhog day"] = eventDate;
      eventCheckMap["groundhog"] = eventDate;
    }
    if (event === "st patricks day" || event === "st patricks") {
      eventDate.setMonth(2);
      eventDate.setDate(17);
      eventCheckMap["st patricks day"] = eventDate;
      eventCheckMap["st patricks"] = eventDate;
    }
    if (
      event === "cinco de mayo" ||
      event === "cinco" ||
      event === "may 5th" ||
      event === "may 5" ||
      event === "cinco de mayo day" ||
      event === "mayo de cinco"
    ) {
      eventDate.setMonth(4);
      eventDate.setDate(5);
      eventCheckMap["cinco de mayo"] = eventDate;
      eventCheckMap["cinco"] = eventDate;
      eventCheckMap["may 5th"] = eventDate;
      eventCheckMap["may 5"] = eventDate;
      eventCheckMap["cinco de mayo day"] = eventDate;
      eventCheckMap["mayo de cinco"] = eventDate;
    }
    if (
      event === "mexican independence day" ||
      event === "mexican independence"
    ) {
      eventDate.setMonth(8);
      eventDate.setDate(16);
      eventCheckMap["mexican independence day"] = eventDate;
      eventCheckMap["mexican independence"] = eventDate;
    }
    if (
      event === "dia de los muertos" ||
      event === "dia de los muertos day" ||
      event === "day of the dead" ||
      event === "day of the dead day"
    ) {
      eventDate.setMonth(10);
      eventDate.setDate(1);
      eventCheckMap["dia de los muertos"] = eventDate;
      eventCheckMap["dia de los muertos day"] = eventDate;
      eventCheckMap["day of the dead"] = eventDate;
      eventCheckMap["day of the dead day"] = eventDate;
    }
    if (event === "good friday" || event === "good") {
      eventDate.setMonth(3);
      eventDate.setDate(7);
      eventCheckMap["good friday"] = eventDate;
      eventCheckMap["good"] = eventDate;
    }
    if (event === "black friday") {
      eventDate.setMonth(10);
      eventDate.setDate(24);
      eventCheckMap["black friday"] = eventDate;
    }
    if (event === "cyber monday") {
      eventDate.setMonth(10);
      eventDate.setDate(27);
      eventCheckMap["cyber monday"] = eventDate;
    }
    if (
      event === "martin luther king jr day" ||
      event === "martin luther king jr" ||
      event === "martin luther king day" ||
      event === "martin luther king" ||
      event === "mlk day" ||
      event === "mlk"
    ) {
      eventDate.setMonth(0);
      eventDate.setDate(16);
      eventCheckMap["martin luther king jr day"] = eventDate;
      eventCheckMap["martin luther king jr"] = eventDate;
      eventCheckMap["martin luther king day"] = eventDate;
      eventCheckMap["martin luther king"] = eventDate;
      eventCheckMap["mlk day"] = eventDate;
      eventCheckMap["mlk"] = eventDate;
    }
    if (event === "presidents day" || event === "presidents") {
      eventDate.setMonth(1);
      eventDate.setDate(20);
      eventCheckMap["presidents day"] = eventDate;
      eventCheckMap["presidents"] = eventDate;
    }
    if (event === "juneteenth") {
      eventDate.setMonth(5);
      eventDate.setDate(19);
      eventCheckMap["juneteenth"] = eventDate;
    }
    if (event === "hannukah" || event === "hanukkah") {
      eventDate.setMonth(11);
      eventDate.setDate(10);
      eventCheckMap["hannukah"] = eventDate;
    }
    if (event === "yom kippur") {
      eventDate.setMonth(9);
      eventDate.setDate(18);
      eventCheckMap["yom kippur"] = eventDate;
    }
    if (event === "rosh hashanah") {
      eventDate.setMonth(8);
      eventDate.setDate(7);
      eventCheckMap["rosh hashanah"] = eventDate;
    }
    if (event === "passover") {
      eventDate.setMonth(3);
      eventDate.setDate(8);
      eventCheckMap["passover"] = eventDate;
    }
    if (event === "earth day" || event === "earth") {
      eventDate.setMonth(3);
      eventDate.setDate(22);
      eventCheckMap["earth day"] = eventDate;
      eventCheckMap["earth"] = eventDate;
    }
    if (event === "mardi gras" || event === "mardi" || event === "carnival") {
      eventDate.setMonth(1);
      eventDate.setDate(21);
      eventCheckMap["mardi gras"] = eventDate;
      eventCheckMap["mardi"] = eventDate;
      eventCheckMap["carnival"] = eventDate;
    }
    if (event === "tax day" || event === "tax") {
      eventDate.setMonth(3);
      eventDate.setDate(18);
      eventCheckMap["tax day"] = eventDate;
      eventCheckMap["tax"] = eventDate;
    }

    console.log("eventCheckMap: ", eventCheckMap);

    // ======================================================== //
    // Days Until Event Countdown
    // ======================================================== //

    // daysUntilEvent variable
    let daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    // if event is today, set daysUntilEvent to 0
    if (daysUntilEvent < 0) {
      daysUntilEvent = 0;
    }

    // if event is tomorrow, set daysUntilEvent to 1
    if (daysUntilEvent === 1) {
      daysUntilEvent = 1;
    }

    // if event is today, set daysUntilEvent to "today"
    if (daysUntilEvent === 0) {
      daysUntilEvent = "today";
    }

    // if event is tomorrow, set daysUntilEvent to "tomorrow"
    if (daysUntilEvent === 1) {
      daysUntilEvent = "tomorrow";
    }

    // ======================================================== //
    /*
      ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗     █████╗ ██╗      ██████╗  ██████╗ 
    ██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║    ██║████╗  ██║    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
    ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║    ███████║██║     ██║  ███╗██║   ██║
    ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   ██║  ██║██║   ██║██║███╗██║██║╚██╗██║    ██╔══██║██║     ██║   ██║██║   ██║
    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║    ██║  ██║███████╗╚██████╔╝╚██████╔╝
      ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝    ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
    */
    // ======================================================== //

    // style function that changes errorMessage to red
    const style = (errorMessage) => {
      return `\`\`\`diff\n- ${errorMessage}\n\`\`\``;
    };

    // ERROR HANDLING - if event is not in eventCheckMap, throw error
    if (!Object.keys(eventCheckMap).includes(event.toLowerCase())) {
      message.channel.send(
        style(
          `Please enter a valid holiday or event!\n\n Use the command "!holidays" to view a list of trackable holidays.`
        )
      );
    } else {
      // return the longest Object key in eventCheckMap
      event = Object.keys(eventCheckMap).sort((a, b) => b.length - a.length)[0];

      // first letter of each word in event response in chat is capitalized
      event = event
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");

      // RESPONSE
      console.log(
        "RESPONSE: ",
        `The next ${event} is on ${eventDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}, which is ${daysUntilEvent} days away!`
      );
      message.channel.send(
        `The next **${event}** is on _${eventDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}_, which is **${daysUntilEvent}** days away!`
      );
    }
  }

  // ======================================================== //
  // ======================================================== //
  /*
  ████████╗██╗███╗   ███╗███████╗    ███████╗ ██████╗ ███╗   ██╗███████╗███████╗
  ╚══██╔══╝██║████╗ ████║██╔════╝    ╚══███╔╝██╔═══██╗████╗  ██║██╔════╝██╔════╝
     ██║   ██║██╔████╔██║█████╗        ███╔╝ ██║   ██║██╔██╗ ██║█████╗  ███████╗
     ██║   ██║██║╚██╔╝██║██╔══╝       ███╔╝  ██║   ██║██║╚██╗██║██╔══╝  ╚════██║
     ██║   ██║██║ ╚═╝ ██║███████╗    ███████╗╚██████╔╝██║ ╚████║███████╗███████║
     ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝
*/
  // ======================================================== //
  // ======================================================== //

  // current time in AM & PM/00:00 format
  // today is declared at the top of current object
  const time = today.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  if (
    msg === "what time is it" ||
    msg === "whats the time" ||
    msg === "time" ||
    msg === "current time"
  ) {
    message.channel.send(`It is currently ${time} (CST)`);
  }

  // current time in PST
  if (
    msg === "what time is it in pst" ||
    msg === "time in pst" ||
    msg === "pst" ||
    msg === "pacific time" ||
    msg === "pacific"
  ) {
    const pst = today.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    message.channel.send(`It is currently ${pst} in PST`);
  }
  // current time in MT
  if (
    msg === "what time is it in mt" ||
    msg === "time in mt" ||
    msg === "mt" ||
    msg === "mountain time" ||
    msg === "mountain"
  ) {
    const mt = today.toLocaleString("en-US", {
      timeZone: "America/Denver",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    message.channel.send(`It is currently ${mt} in MT`);
  }
  // current time in EST
  if (
    msg === "what time is it in est" ||
    msg === "time in est" ||
    msg === "est" ||
    msg === "eastern time" ||
    msg === "eastern"
  ) {
    const est = today.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    message.channel.send(`It is currently ${est} in EST`);
  }
  // current time in CST
  if (
    msg === "what time is it in cst" ||
    msg === "time in cst" ||
    msg === "cst" ||
    msg === "central time" ||
    msg === "central"
  ) {
    const cst = today.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    message.channel.send(`It is currently ${cst} in CST`);
  }

  // ======================================================== //
  // ======================================================== //
  /*
  ██╗    ██╗███████╗ █████╗ ████████╗██╗  ██╗███████╗██████╗        ██╗       ██╗      ██████╗  ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
  ██║    ██║██╔════╝██╔══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗       ██║       ██║     ██╔═══██╗██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
  ██║ █╗ ██║█████╗  ███████║   ██║   ███████║█████╗  ██████╔╝    ████████╗    ██║     ██║   ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║
  ██║███╗██║██╔══╝  ██╔══██║   ██║   ██╔══██║██╔══╝  ██╔══██╗    ██╔═██╔═╝    ██║     ██║   ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
  ╚███╔███╔╝███████╗██║  ██║   ██║   ██║  ██║███████╗██║  ██║    ██████║      ███████╗╚██████╔╝╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═════╝      ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
  */
  // ======================================================== //
  // ======================================================== //

  if (
    msg === "where is my ip location" ||
    msg === "where am i" ||
    msg === "where is my location" ||
    msg === "whats my location" ||
    msg === "wheres my location"
  ) {
    const user = message.author;

    // axios GET request to ipify API from authors local ip address(not host) as location
    // use "user" instead of "message" to get local ip address
    // send a axios request to users computer to get their ip address
    // axios.get("https://geolocation-db.com/json/").then((res) => {
    //   console.log(res.data);
    //   const setIP = res.data.IPv4;
    //   const setCity = res.data.city;
    //   const setState = res.data.state;
    //   const setCountry = res.data.country_name;
    //   const setLatitude = res.data.latitude;
    //   const setLongitude = res.data.longitude;
    //   message.reply(
    //     `Hello ${user}, Your IP address is located in ${setCity}, ${setState}, ${setCountry} at ${setLatitude}, ${setLongitude}`
    //   );
    // });

    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}`,
        {
          params: { user },
        }
      )
      .then((response) => {
        // stringify response object
        console.log("IP RESPONSE DATA: " + JSON.stringify(response.data));
        console.log("USER: " + user);
        console.log("IP: " + response.data.ip);
        // console.log("IP RESPONSE DATA: " + response.data);
        const ip = response.data.ip;
        const city = response.data.location.city;
        const country = response.data.location.country;
        message.reply(
          `Hello ${user}, our IP address is ${ip}, and is located in ${city}, ${country}`
        );
      })
      .catch((error) => {
        console.log(error);
      });

    // // for ip address ONLY
    // axios
    //   .get(`https://api.ipify.org?format=json`)
    //   .then((response) => {
    //     console.log("IP RESPONSE DATA: " + response.data.ip);
    //     const ip = response.data.ip;
    //     message.reply(`Your IP address is ${ip} and it is located in ${ip}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  // Current weather by user's location
  if (
    msg === "what is the weather like" ||
    msg === "what is the weather" ||
    msg === "whats the weather like" ||
    msg === "whats the weather" ||
    msg === "hows the weather" ||
    msg === "how is the weather"
  ) {
    const user = message.author;

    // axios
    //   .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_API_KEY}`)
    //   .then((response) => {
    //     console.log("LOCATION RESPONSE DATA: " + response.data.city);
    //     const city = response.data.city;
    //     const region = response.data.region;
    //     const country = response.data.country;
    //     const latitude = response.data.latitude;
    //     const longitude = response.data.longitude;
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_API_KEY}`,
        {
          params: { user },
        }
      )
      .then((response) => {
        console.log("IP RESPONSE DATA: " + JSON.stringify(response.data));
        const ip = response.data.ip;
        const city = response.data.location.city;
        const region = response.data.location.region;
        const country = response.data.location.country;
        const latitude = response.data.location.lat;
        const longitude = response.data.location.lng;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`
          )
          .then((response) => {
            console.log(
              "WEATHER RESPONSE DATA: " + response.data.weather[0].main
            );
            const currentWeatherMain = response.data.weather[0].main;
            const currentWeatherDescription =
              response.data.weather[0].description;
            const currentTemp = response.data.main.temp;
            const currentFeelsLike = response.data.main.feels_like;
            const currentWindSpeed = response.data.wind.speed;
            const currentHumidity = response.data.main.humidity;
            const currentClouds = response.data.clouds.all;
            message.reply(
              `The current weather in ${city}, ${region}, ${country} is: ${currentWeatherMain}/${currentWeatherDescription}, with a temperature of ${currentTemp} °F and a real-feel of ${currentFeelsLike} °F. The wind speed is ${currentWindSpeed} MPH with a humidity of ${currentHumidity}% and a cloudiness of ${currentClouds}%. `
            );
          })
          .catch((error) => {
            console.log("WEATHER ERROR: " + error);
          });
      })
      .catch((error) => {
        console.log("LOCATION ERROR: " + error);
      });
  }
});

// ======================================================== //
// ======================================================== //
/*
██████╗ ███████╗ ██████╗ ██╗   ██╗███████╗███████╗████████╗    ██╗   ██╗███████╗███████╗██████╗     ██████╗  █████╗ ████████╗ █████╗ 
██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝    ██║   ██║██╔════╝██╔════╝██╔══██╗    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
██████╔╝█████╗  ██║   ██║██║   ██║█████╗  ███████╗   ██║       ██║   ██║███████╗█████╗  ██████╔╝    ██║  ██║███████║   ██║   ███████║
██╔══██╗██╔══╝  ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║       ██║   ██║╚════██║██╔══╝  ██╔══██╗    ██║  ██║██╔══██║   ██║   ██╔══██║
██║  ██║███████╗╚██████╔╝╚██████╔╝███████╗███████║   ██║       ╚██████╔╝███████║███████╗██║  ██║    ██████╔╝██║  ██║   ██║   ██║  ██║
╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝        ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
*/
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase().replace(/[^a-z0-9\s]/gi, "");
  const user = message.author;

  // Get user's avatar
  if (msg === "get my avatar") {
    message.reply(user.displayAvatarURL());
  }

  // Get user's username
  if (msg === "get my username") {
    message.reply(`Your username is: ${user.username}`);
  }

  // Get user's tag
  if (msg === "get my tag") {
    message.reply(`Your user tag is: ${user.tag}`);
  }

  // Get user's ID
  if (msg === "get my ID") {
    message.reply(`Your user ID is: ${user.id}`);
  }

  // Get user's nickname
  if (msg === "get my nickname") {
    if (!user.nickname) {
      message.reply("You don't have a nickname, silly.");
    } else message.reply(user.nickname);
  }

  // Get user's discriminator
  if (msg === "get my discriminator") {
    message.reply(`Your user disciminator is: ${user.discriminator}`);
  }
});

// ======================================================== //
// ======================================================== //
/*
██████╗ ███████╗███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗███████╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔════╝
██████╔╝█████╗  ███████╗██║   ██║██║   ██║██████╔╝██║     █████╗  ███████╗
██╔══██╗██╔══╝  ╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝  ╚════██║
██║  ██║███████╗███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗███████║
╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝
  */
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase().replace(/[^a-z0-9\s]/gi, "");

  // ALL RESOURCES ARE FROM RESOURCES.JSON FILE

  // Recommend Algorithm resources
  if (msg === "algorithm resources" || msg === "algo resources") {
    let algoResources = resources[0].algorithms;
    algoResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn algorithms: ${resource}`
      );
    });
  }

  // Recommend Data Structures resources
  if (msg === "data structures resources" || msg === "dsa resources") {
    let dsaResources = resources[1].dataStructures;
    dsaResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn data structures: ${resource}`
      );
    });
  }

  // Recommend React resources
  if (
    msg === "react resources" ||
    msg === "reactjs resources" ||
    msg === "react.js resources"
  ) {
    let reactResources = resources[2].react;
    reactResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn React: ${resource}`
      );
    });
  }

  // Recommend React Native resources
  if (msg === "react native resources") {
    let reactNativeResources = resources[3].reactNative;
    reactNativeResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn React Native: ${resource}`
      );
    });
  }

  // Recommend Node.js resources
  if (
    msg === "node.js resources" ||
    msg === "nodejs resources" ||
    msg === "node.js resources" ||
    msg === "node resources"
  ) {
    let nodeResources = resources[4].node;
    nodeResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn Node.js: ${resource}`
      );
    });
  }

  // Recommend HTML/CSS resources
  if (
    msg === "HTML/CSS resources" ||
    msg === "html/css" ||
    msg === "html/css resources" ||
    msg === "html resources" ||
    msg === "css resources"
  ) {
    let htmlCssResources = resources[5].htmlCss;
    htmlCssResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn HTML/CSS: ${resource}`
      );
    });
  }

  // Recommend JavaScript resources
  if (msg === "javascript resources" || msg === "js resources") {
    let jsResources = resources[6].javascript;
    jsResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn JavaScript: ${resource}`
      );
    });
  }

  // Recommend Python resources
  if (msg === "python resources") {
    let pythonResources = resources[7].python;
    pythonResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn Python: ${resource}`
      );
    });
  }

  // Recommend AI resources
  if (msg === "ai resources") {
    let aiResources = resources[8].ai;
    aiResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn AI: ${resource}`
      );
    });
  }
});
