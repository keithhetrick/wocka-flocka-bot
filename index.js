/*                                                                                                                                      
██╗    ██╗ ██████╗  ██████╗██╗  ██╗ █████╗       ███████╗██╗      ██████╗  ██████╗██╗  ██╗ █████╗     ██████╗  ██████╗ ████████╗
██║    ██║██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗      ██╔════╝██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
██║ █╗ ██║██║   ██║██║     █████╔╝ ███████║█████╗█████╗  ██║     ██║   ██║██║     █████╔╝ ███████║    ██████╔╝██║   ██║   ██║   
██║███╗██║██║   ██║██║     ██╔═██╗ ██╔══██║╚════╝██╔══╝  ██║     ██║   ██║██║     ██╔═██╗ ██╔══██║    ██╔══██╗██║   ██║   ██║   
╚███╔███╔╝╚██████╔╝╚██████╗██║  ██╗██║  ██║      ██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚══╝╚══╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
*/

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const axios = require("axios");
const schedule = require("node-schedule");

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
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Wocka-Flocka is ready to rock-a rock-a!!!!");
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
const channel = client.channels.cache.get(DISCORD_SERVER_ID);
// channel.send({ embeds: [helpMessageEmbed] });

// call the !help command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!help") {
    await message.reply({ embeds: [helpMessageEmbeded] });
  }
});

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

// call the !help command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!games") {
    await message.reply({ embeds: [gameMessageEmbeded] });
  }
});

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

// call the !holiday command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!holiday" || msg === "!holidays") {
    await message.reply({ embeds: [holidayMessageEmbeded] });
  }
});

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

// call the !resources command to get a list of commands
client.on("messageCreate", async (message) => {
  // regex any non-alphanumeric character like spaces, commas, etc.
  const msg = message.content.toLowerCase();

  if (msg === "!resources" || msg === "!resource") {
    await message.reply({ embeds: [resourceMessageEmbeded] });
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

// Welcome message to new members to the server
// create manually welcome command for below message
// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache
//     .get(DISCORD_SERVER_ID)
//     .send(`Welcome to the server, ${member}`);
// });

// add users name to the welcome message

// const welcomeEmbed = {
//   color: 3447003,
//   title: "Welcome to the server!",
//   description: "We're so glad you're here. 🚀",
//   fields: [
//     {
//       name: "Please read the rules",
//       value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     },
//     {
//       name: "Please introduce yourself",
//       value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     },
//   ],
//   timestamp: new Date(),
//   footer: {
//     text: "Wocka-Flocka",
//     icon_url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
//   },
// };

// manualy call the above welcome message witha command
// client.on("messageCreate", (message) => {
//   if (msg === "!welcome") {
//     message.reply({ embeds: [welcomeEmbed] });
//   }
// });

// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache.get(DISCORD_SERVER_ID).send({
//     embeds: [
//       {
//         title: `Welcome to the server, ${member}`,
//         description: "We're so glad you're here. 🚀",
//         fields: [
//           {
//             name: "Please read the rules",
//             value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           },
//           {
//             name: "Please introduce yourself",
//             value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//           },
//         ],
//         timestamp: new Date(),
//         footer: {
//           text: "Wocka-Flocka",
//           icon_url: "https://cdn.discordapp.com/avatars/1028153221040050216/71f4bd7e3c430b2ba5e5efed026fba3e.webp?size=240",
//         },
//       },
//     ],
//   });
// });

// show username in welcome message
client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase().replace(/[^a-z0-9\s]/gi, "");

  if (msg === "!welcome") {
    message.reply({
      embeds: [
        {
          title: `Welcome to the server, ${message.author.username}`,
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

  // Send a message to a specific channel
  if (msg === "Send a message to channel") {
    client.channels.cache.get("1054444166664429639").send("Hello! 🚀");
  }
  // Send a message to a DM channel
  if (msg === "Send message to DM") {
    message.author.send("Hello! 🚀");
  }

  // Get list of members in the server
  if (msg === "Get list of current members") {
    // fetch all current members in the server
    const list = client.guilds.cache.get(DISCORD_SERVER_ID);

    list.members.cache.forEach((member) => {
      console.log(member.user.username);
    });

    // total number of members in the server
    const members = list.members.cache;
    message.author.send(`Total members: ${members.size}`);
    console.log(`Total members: ${members.size}`);
  }
});

// AUTOMATED "QUOTE OF THE DAY" MESSAGE once, every 24 hours at 9 am using node-schedule
const quote = require("./jsonFiles/quotes.json");
const randomQuote = quote[Math.floor(Math.random() * quote.length)];

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = 9;
rule.minute = 0;

// if no author is listed, use "Unknown"
if (
  randomQuote.quoteAuthor === undefined ||
  randomQuote.quoteAuthor === "" ||
  randomQuote.quoteAuthor === null ||
  randomQuote.quoteAuthor === " "
) {
  randomQuote.quoteAuthor = "Unknown";
}
schedule.scheduleJob(rule, function () {
  message.channel.send(
    `"${randomQuote.quoteText}" - ${randomQuote.quoteAuthor}`
  );
});

// client.on("messageCreate", async (message) => {
//   const msg = message.content.toLowerCase();

//   if (msg === "!quote-test") {
//     await message.channel.send(
//       "Be yourself; everyone else is already taken. - Oscar Wilde"
//     );
//   }
// });

// const quote = require("./jsonFiles/quotes.json");
// const randomQuote = quote[Math.floor(Math.random() * quote.length)];

// // use only one quote per day
// const quoteOfTheDay = schedule.scheduleJob("0 9 * * *", async function () {
//   // const channel = client.channels.cache.get(DISCORD_SERVER_ID);
//   message.channel
//     .send({
//       embeds: [
//         {
//           title: "Quote of the day:",
//           description: `"${randomQuote.quote}"`,
//           fields: [
//             {
//               name: "Author:",
//               value: `${randomQuote.author}`,
//             },
//           ],
//           timestamp: new Date(),
//           footer: {
//             text: "Wocka-Flocka",
//             icon_url: "hutps://i.imgur.com/AfFp7pu.png",
//           },
//         },
//       ],
//     })
//     .then((msg) => {
//       console.log(`Quote of the day sent to ${msg.channel.name}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
    // generate a random number between 1 and 52
    const randomCard = Math.floor(Math.random() * 52) + 1;
    // generate a random suit
    const randomSuit = Math.floor(Math.random() * 4) + 1;
    // generate a random card value
    const randomCardValue = Math.floor(Math.random() * 13) + 1;

    // use randomCard & randomSuit & randomCardValue to generate a random card

    // if the random card value is 1, it's an Ace
    if (randomCardValue === 1) {
      message.reply(`Your random card is the Ace of ${suits[randomSuit]}`);
    }
    // if the random card value is 11, it's a Jack
    else if (randomCardValue === 11) {
      message.reply(`Your random card is the Jack of ${suits[randomSuit]}`);
    }
    // if the random card value is 12, it's a Queen
    else if (randomCardValue === 12) {
      message.reply(`Your random card is the Queen of ${suits[randomSuit]}`);
    }
    // if the random card value is 13, it's a King
    else if (randomCardValue === 13) {
      message.reply(`Your random card is the King of ${suits[randomSuit]}`);
    }
    // if the random card value is anything else, it's a numbered card
    else {
      message.reply(
        `Your random card is the ${randomCardValue} of ${suits[randomSuit]}`
      );
    }
  }

  // "guess a number" game
  if (msg === "guess a number" || msg === "guess the number") {
    // // generate a random number between 1 and 100
    // const randomNumber = Math.floor(Math.random() * 100) + 1;
    // // ask user to guess the number
    // message.reply(
    //   `Guess a number between 1 and 100. You have 5 guesses. Type "guess" followed by your guess. Example: guess 50`
    // );
    // // create a collector for the user's guess
    // const filter = (m) => m.author.id === message.author.id;
    // const collector = message.channel.createMessageCollector(filter, {
    //   time: 10000,
    // });
    // // if the user guesses the number, tell them they got it
    // collector.on("collect", (m) => {
    //   if (m.content === `guess ${randomNumber}`) {
    //     message.reply("You got it!");
    //     collector.stop();
    //   }
    // });
    // // if the user doesn't guess the number in 5 tries, tell them they lost
    // collector.on("end", (collected) => {
    //   if (collected.size === 0) {
    //     message.reply("You lost!");
    //   }
    // });

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    message.reply(
      `Guess a number between 1 and 10. You have 5 guesses. Type "guess" followed by your guess. Example: guess 5`
    );
    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      time: 10000,
    });
    collector.on("collect", (m) => {
      if (m.content === `guess ${randomNumber}`) {
        message.reply("Hey you got it! the number was " + randomNumber);
        collector.stop();
      }
    });
    //  send message.reply("You lost!") if the user doesn't guess the number in 5 tries or after 10 seconds
    collector.on("end", (collected) => {
      if (collected.size === 0) {
        message.reply("You lost!");
      }
    });
  }

  // "inspirational quote" command
  if (msg === "inspirational quote" || msg === "quote") {
    // quotes come from json file
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
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

    if (event === "christmas" || event === "xmas") {
      eventDate.setMonth(11);
      eventDate.setDate(25);
    }
    if (event === "new years eve" || event === "nye") {
      eventDate.setMonth(11);
      eventDate.setDate(31);
    }
    if (event === "my birthday" || event === "my bday" || event === "bday") {
      eventDate.setMonth(2);
      eventDate.setDate(8);
    }
    if (
      event === "halloween" ||
      event === "halloween day" ||
      event === "spooky"
    ) {
      eventDate.setMonth(9);
      eventDate.setDate(31);
    }
    if (
      event === "valentines day" ||
      event === "valentines" ||
      event === "valentine" ||
      event === "love day" ||
      event === "singles awareness day"
    ) {
      eventDate.setMonth(1);
      eventDate.setDate(14);
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
    }
    if (
      event === "easter" ||
      event === "easter day" ||
      event === "easter egg" ||
      event === "easter sunday"
    ) {
      eventDate.setMonth(3);
      eventDate.setDate(9);
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
    }
    if (event === "memorial day" || event === "memorial") {
      eventDate.setMonth(4);
      eventDate.setDate(29);
    }
    if (event === "labor day" || event === "labor") {
      eventDate.setMonth(8);
      eventDate.setDate(4);
    }
    if (event === "mothers day" || event === "mothers") {
      eventDate.setMonth(4);
      eventDate.setDate(14);
    }
    if (event === "fathers day" || event === "fathers") {
      eventDate.setMonth(5);
      eventDate.setDate(18);
    }
    if (event === "columbus day" || event === "columbus") {
      eventDate.setMonth(9);
      eventDate.setDate(12);
    }
    if (event === "groundhog day" || event === "groundhog") {
      eventDate.setMonth(1);
      eventDate.setDate(2);
    }
    if (event === "st patricks day" || event === "st patricks") {
      eventDate.setMonth(2);
      eventDate.setDate(17);
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
    }
    if (
      event === "mexican independence day" ||
      event === "mexican independence"
    ) {
      eventDate.setMonth(8);
      eventDate.setDate(16);
    }
    if (
      event === "dia de los muertos" ||
      event === "dia de los muertos day" ||
      event === "day of the dead" ||
      event === "day of the dead day"
    ) {
      eventDate.setMonth(10);
      eventDate.setDate(1);
    }
    if (event === "good friday" || event === "good") {
      eventDate.setMonth(3);
      eventDate.setDate(7);
    }
    if (event === "black friday") {
      eventDate.setMonth(10);
      eventDate.setDate(24);
    }
    if (event === "cyber monday") {
      eventDate.setMonth(10);
      eventDate.setDate(27);
    }
    if (
      event === "martin luther king day" ||
      event === "martin luther king" ||
      event === "mlk day" ||
      event === "mlk"
    ) {
      eventDate.setMonth(0);
      eventDate.setDate(16);
    }
    if (event === "presidents day" || event === "presidents") {
      eventDate.setMonth(1);
      eventDate.setDate(20);
    }
    if (event === "juneteenth") {
      eventDate.setMonth(5);
      eventDate.setDate(19);
    }
    if (event === "hannukah" || event === "hanukkah") {
      eventDate.setMonth(11);
      eventDate.setDate(10);
    }
    if (event === "yom kippur") {
      eventDate.setMonth(9);
      eventDate.setDate(18);
    }
    if (event === "rosh hashanah") {
      eventDate.setMonth(8);
      eventDate.setDate(7);
    }
    if (event === "passover") {
      eventDate.setMonth(3);
      eventDate.setDate(8);
    }
    if (event === "earth day" || event === "earth") {
      eventDate.setMonth(3);
      eventDate.setDate(22);
    }
    if (event === "mardi gras" || event === "mardi" || event === "carnival") {
      eventDate.setMonth(1);
      eventDate.setDate(21);
    }
    if (event === "tax day" || event === "tax") {
      eventDate.setMonth(3);
      eventDate.setDate(18);
    }

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

    // first letter of event response in chat is capitalized
    event = event.charAt(0).toUpperCase() + event.slice(1);

    // throw error if no input event
    if (!event || event === " " || event === undefined) {
      // style function that changes errorMessage to red
      const style = (errorMessage) => `\`\`\`diff\n- ${errorMessage}\`\`\``;
      message.channel.send(
        style(
          `Please enter a valid holiday or event!\n Use the command "!holidays" to view a list of trackable holidays.`
        )
      );
    }

    // if event is mispelled, throw error
    else if (
      (eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()) ||
      event === null
    ) {
      const style = (errorMessage) => `\`\`\`diff\n- ${errorMessage}\`\`\``;
      message.channel.send(
        style(
          `Please enter a valid holiday or event!\n Use the command "!holidays" to view a list of trackable holidays.`
        )
      );
    } else {
      // send message with event date and days count
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
