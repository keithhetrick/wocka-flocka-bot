/*                                                                                                                                      
██╗    ██╗ ██████╗  ██████╗██╗  ██╗ █████╗       ███████╗██╗      ██████╗  ██████╗██╗  ██╗ █████╗     ██████╗  ██████╗ ████████╗
██║    ██║██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗      ██╔════╝██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
██║ █╗ ██║██║   ██║██║     █████╔╝ ███████║█████╗█████╗  ██║     ██║   ██║██║     █████╔╝ ███████║    ██████╔╝██║   ██║   ██║   
██║███╗██║██║   ██║██║     ██╔═██╗ ██╔══██║╚════╝██╔══╝  ██║     ██║   ██║██║     ██╔═██╗ ██╔══██║    ██╔══██╗██║   ██║   ██║   
╚███╔███╔╝╚██████╔╝╚██████╗██║  ██╗██║  ██║      ██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║    ██████╔╝╚██████╔╝   ██║   
 ╚══╝╚══╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
*/

const cleverbot = require("cleverbot-free");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
require("dotenv").config();
const axios = require("axios");

// JSON files
const jokes = require("./jsonFiles/jokes.json");
const fortunes = require("./jsonFiles/fortune.json");
const eightBall = require("./jsonFiles/8ball.json");
const quotes = require("./jsonFiles/quotes.json");
const facts = require("./jsonFiles/facts.json");
const resources = require("./jsonFiles/resources.json");

// API keys
const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
// const IP_API_KEY = process.env.IP_GEOLOCATION_API_KEY;
const IPIFY_API_KEY = process.env.IPIFY_API_KEY;

// .env info
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

// Embeded Help message
const helpMessageEmbed = {
  color: 0x0099ff,
  title: "Wocka-Flocka Commands",
  url: "https://discord.js.org",
  author: {
    name: "Wocka-Flocka",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  },
  description: "List of commands for Wocka-Flocka",
  thumbnail: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  fields: [
    {
      name: "!help",
      value: "List of avaliable commands",
    },
    {
      name: "!resources",
      value: "List of avaliable resources",
    },
    {
      name: "\u200b",
      // change line color
      value: "**GAMES & FUN**",
      inline: false,
    },
    {
      name: "tell me a joke",
      value: "Dad joke or rad joke? Their goos because their terrible",
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
      value: "Wocka Flocka flips a coin",
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
      value: "Wocka-Flocka can't pick your nose, but it can pick a number",
    },
    {
      name: "\u200b",
      // make value bold
      value: "**HOLIDAY TRACKER**",
      inline: false,
    },
    {
      name: "days until christmas",
      value: "Tells you how many days until Christmas",
      inline: true,
    },
    {
      name: "days until easter",
      value: "Tells you how many days until Easter",
      inline: true,
    },
    {
      name: "days until halloween",
      value: "Tells you how many days until Halloween",
      inline: true,
    },
    {
      name: "days until thanksgiving",
      value: "Tells you how many days until Thanksgiving",
      inline: true,
    },
    {
      name: "days until valentines day",
      value: "Tells you how many days until Valentines Day",
      inline: true,
    },
    {
      name: "days until new years",
      value: "Tells you how many days until New Years Eve",
      inline: true,
    },
    {
      name: "days until 4th of july",
      value: "Tells you how many days until the 4th of July",
      inline: true,
    },
    {
      name: "days until memorial day",
      value: "Tells you how many days until Memorial Day",
      inline: true,
    },
    {
      name: "\u200b",
      value: "**WEATHER, TIME ZONE & LOCATION TRACKER**",
      inline: false,
    },
    {
      name: "what is the weather like",
      value: "Wocka-Flocka will tell you the weather in your area",
    },
    {
      name: "what time is it in EST/CST/MST/PST (pick one)",
      value: "Wocka-Flocka will tell you the time in the selected time zone",
    },
  ],
  image: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
  },
};
const channel = client.channels.cache.get(DISCORD_SERVER_ID);
// channel.send({ embeds: [helpMessageEmbed] });

// call the !help command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!help") {
    await message.reply({ embeds: [helpMessageEmbed] });
  }
});

// Embeded Help message
const resourceMessageEmbeded = {
  color: 0x0099ff,
  title: "Wocka-Flocka Resouce List",
  url: "https://discord.js.org",
  author: {
    name: "Wocka-Flocka",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
    url: "https://discord.js.org",
  },
  description: "List of commands for Algorithm, Data Structures and more!",
  thumbnail: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  fields: [
    {
      name: "Recommend Algorithm resources",
      value: "Wocka-Flocka will recommend Algorithm resources",
    },
    {
      name: "Recommend Data Structures resources",
      value: "Wocka-Flocka will recommend Data Structures resources",
    },
    {
      name: "Recommend Front End Development resources",
      value: "Wocka-Flocka will recommend Front End Development resources",
    },
    {
      name: "Recommend Back End Development resources",
      value: "Wocka-Flocka will recommend Back End Development resources",
    },
    {
      name: "Recommend Full Stack Development resources",
      value: "Wocka-Flocka will recommend Full Stack Development resources",
    },
    {
      name: "Recommend React resources",
      value: "Wocka-Flocka will recommend React resources",
    },
    {
      name: "Recommend Node resources",
      value: "Wocka-Flocka will recommend Node resources",
    },
    {
      name: "Recommend AI resources",
      value: "Wocka-Flocka will recommend AI resources",
    },
  ],
  image: {
    url: "https://i.imgur.com/AfFp7pu.png",
  },
  timestamp: new Date().toISOString(),
  footer: {
    text: "Bot creator: Keith Hetrick",
    icon_url: "https://i.imgur.com/AfFp7pu.png",
  },
};

// call the !resources command to get a list of commands
client.on("messageCreate", async (message) => {
  const msg = message.content.toLowerCase();

  if (msg === "!resources") {
    await message.reply({ embeds: [resourceMessageEmbeded] });
  }
});

// ======================================================== //
// ======================================================== //
// CLEVERBOT AI RESPONSE CONVERSATION
// ======================================================== //
// ======================================================== //

let conversation = [];

client.on("messageCreate", (message) => {
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
// CHANNEL & SERVER MESSAGE AUTOMATION
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
//     icon_url: "https://i.imgur.com/AfFp7pu.png",
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
//           icon_url: "https://i.imgur.com/AfFp7pu.png",
//         },
//       },
//     ],
//   });
// });

// show username in welcome message
client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase();

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
            icon_url: "https://i.imgur.com/AfFp7pu.png",
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

// ======================================================== //
// ======================================================== //
// GAMES & FUN
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase();

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
  if (msg === "tell me a joke") {
    // jokes come from json file
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(randomJoke);
  }

  // "Tell me my fortune" command
  if (msg === "tell me my fortune") {
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

  // share inspirational quote
  if (msg === "inspirational quote") {
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

  // random fact generator
  if (msg === "random fact") {
    // facts come from json file
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    message.reply(randomFact);
  }

  // ======================================================== //
  // ======================================================== //
  // HOLIDAY COUNTDOWNS
  // ======================================================== //
  // ======================================================== //

  // "aays until christmas" command
  if (msg === "days until christmas") {
    const today = new Date();
    const nextChristmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth() === 11 && today.getDate() > 25) {
      nextChristmas.setFullYear(nextChristmas.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilChristmas = Math.ceil(
      (nextChristmas.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilChristmas} days until Christmas!`);
  }

  // "days until new years" command
  if (msg === "days until new years") {
    const today = new Date();
    const nextNewYears = new Date(today.getFullYear(), 11, 31);
    if (today.getMonth() === 11 && today.getDate() > 31) {
      nextNewYears.setFullYear(nextNewYears.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilNewYears = Math.ceil(
      (nextNewYears.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilNewYears} days until New Years Eve!`);
  }

  // "days until valentines" command
  if (msg === "days until valentines") {
    const today = new Date();
    const nextValentinesDay = new Date(today.getFullYear(), 1, 14);
    if (today.getMonth() === 1 && today.getDate() > 14) {
      nextValentinesDay.setFullYear(nextValentinesDay.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilValentinesDay = Math.ceil(
      365 + (nextValentinesDay.getTime() - today.getTime()) / oneDay
    );
    message.reply(
      `There are ${daysUntilValentinesDay} days until Valentines Day!`
    );
  }

  // "days until halloween" command
  if (msg === "days until halloween") {
    const today = new Date();
    const nextHalloween = new Date(today.getFullYear(), 9, 31);
    if (today.getMonth() === 9 && today.getDate() > 31) {
      nextHalloween.setFullYear(nextHalloween.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilHalloween = Math.ceil(
      365 + (nextHalloween.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilHalloween} days until Halloween!`);
  }

  // "days until thanksgiving" command
  if (msg === "days until thanksgiving") {
    const today = new Date();
    const nextThanksgiving = new Date(today.getFullYear(), 10, 26);
    if (today.getMonth() === 10 && today.getDate() > 26) {
      nextThanksgiving.setFullYear(nextThanksgiving.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilThanksgiving = Math.ceil(
      365 + (nextThanksgiving.getTime() - today.getTime()) / oneDay
    );
    message.reply(
      `There are ${daysUntilThanksgiving} days until Thanksgiving!`
    );
  }

  // "days until easter" command
  if (msg === "days until easter") {
    const today = new Date();
    const nextEaster = new Date(today.getFullYear(), 3, 4);
    if (today.getMonth() === 3 && today.getDate() > 4) {
      nextEaster.setFullYear(nextEaster.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilEaster = Math.ceil(
      365 + (nextEaster.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilEaster} days until Easter!`);
  }

  // "days until 4th of july" command
  if (msg === "days until 4th of july") {
    const today = new Date();
    const next4thOfJuly = new Date(today.getFullYear(), 6, 4);
    if (today.getMonth() === 6 && today.getDate() > 4) {
      next4thOfJuly.setFullYear(next4thOfJuly.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntil4thOfJuly = Math.ceil(
      365 + (next4thOfJuly.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntil4thOfJuly} days until 4th of July!`);
  }

  // "days until memorial day" command
  if (msg === "days until memorial day") {
    const today = new Date();
    const nextMemorialDay = new Date(today.getFullYear(), 4, 31);
    if (today.getMonth() === 4 && today.getDate() > 31) {
      nextMemorialDay.setFullYear(nextMemorialDay.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilMemorialDay = Math.ceil(
      365 + (nextMemorialDay.getTime() - today.getTime()) / oneDay
    );
    message.reply(`There are ${daysUntilMemorialDay} days until Memorial Day!`);
  }

  // ======================================================== //
  // ======================================================== //
  // TIME ZONES
  // ======================================================== //
  // ======================================================== //

  // get current date
  if (msg === "what is the date") {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    message.reply(`Today is ${month}/${date}/${year}`);
  }

  // get current time based on AM & PM in 00:00 format
  if (msg === "what time is it") {
    const today = new Date();
    const time = today.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    message.reply(`It is currently ${time}`);
  }

  // ======================================================== //
  // ======================================================== //
  // WEATHER & LOCATION
  // ======================================================== //
  // ======================================================== //

  if (msg === "where is my ip address located") {
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
  if (msg === "what is the weather like") {
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

  // // Automate Quote of the day that happens every 24 hours
  // const schedule = require("node-schedule");
  // const rule = new schedule.RecurrenceRule();
  // rule.hour = 0;
  // rule.minute = 0;
  // rule.second = 0;
  // const job = schedule.scheduleJob(rule, function () {
  //   const quoteOfTheDay = quotes[Math.floor(Math.random() * quotes.length)];
  //   client.channels.cache
  //     .get("CHANNEL ID")
  //     .send(`"${quoteOfTheDay.quoteText}" - ${quoteOfTheDay.quoteAuthor}`);
  // });

  // // Alt automated quote of the day
  // const quoteOfTheDay = () => {
  //   const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //   return randomQuote;
  // };

  // // set up schedule for quote of the day
  // const schedule = require("node-schedule");
  // const rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  // rule.hour = 0;
  // rule.minute = 0;

  // schedule.scheduleJob(rule, function () {
  //   console.log("The answer to life, the universe, and everything!");
  //   client.channels.cache.get("CHANNEL_ID").send(quoteOfTheDay());
  // });
});

// ======================================================== //
// ======================================================== //
// REQUEST USER INFORMATION
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  const msg = message.content.toLowerCase();
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
// ALGORITHMS, DATA STRUCTURES & CODING RESOURCES
// ======================================================== //
// ======================================================== //

client.on("messageCreate", (message) => {
  // Recommend Algorithm resources
  if (
    message.content === "algorithm resources" ||
    message.content === "algo resources"
  ) {
    // pull in resources from json file & randmoize
    let algoResources = [];
    let nestedAlgoResources = resources[0].algorithms;

    for (let i = 0; i < nestedAlgoResources.length; i++) {
      algoResources.push(nestedAlgoResources[i]);
      console.log(algoResources);
    }
    // map through each link into the message.reply
    algoResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn algorithms: ${resource}`
      );
    });
  }

  // Recommend Data Structures resources
  if (
    message.content === "data structures resources" ||
    message.content === "dsa resources"
  ) {
    let dsaResources = [];
    let nestedDsaResources = resources[1].dataStructures;

    for (let i = 0; i < nestedDsaResources.length; i++) {
      dsaResources.push(nestedDsaResources[i]);
      console.log(dsaResources);
    }
    // map through each link into the message.reply
    dsaResources.map((resource) => {
      message.reply(
        `Here are some resources to help you learn data structures: ${resource}`
      );
    });
  }

  // Recommend React resources
  if (
    message.content === "react resources" ||
    message.content === "reactjs resources" ||
    message.content === "react.js resources"
  ) {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
    );
  }

  // Recommend React Native resources
  if (message.content === "react native resources") {
    message.reply(
      "https://www.youtube.com/watch?v=Ke90Tje7VS0 \n https://www.youtube.com/watch?v=DLX62G4lc44 \n https://www.youtube.com/watch?v=DLX62G4lc44"
    );
  }

  // Recommend Node.js resources
  if (
    message.content === "node.js resources" ||
    message.content === "nodejs resources" ||
    message.content === "node.js resources" ||
    message.content === "node resources"
  ) {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
    );
  }

  // Recommend HTML/CSS resources
  if (
    message.content === "HTML/CSS resources" ||
    message.content === "html/css" ||
    message.content === "html/css resources" ||
    message.content === "html resources" ||
    message.content === "css resources"
  ) {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend JavaScript resources
  if (
    message.content === "javascript resources" ||
    message.content === "js resources"
  ) {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend Python resources
  if (message.content === "python resources") {
    message.reply(
      "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
    );
  }

  // Recommend AI resources
  if (message.content === "ai resources") {
    message.reply(
      "Check out these resources: https://www.coursera.org/learn/machine-learning https://www.coursera.org/learn/convolutional-neural-networks https://www.coursera.org/learn/natural-language-processing-tensorflow https://www.coursera.org/learn/ai-for-everyone"
    );
  }
});
