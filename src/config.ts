/* ==========================================
   Birthday Surprise Website Configuration

   Edit this file to customize the website
   for your loved one!
   ========================================== */

export const config = {
  /* Name Verification Gate */
  recipientName: "Bhavna", // required name to enter
  nameHint: '6 letters, starts with "B"', // hint on wrong name

  groupName: "OnlyPlans", // required group name to enter
  groupNameHint: "Did you forget OnlyPlans?🥲", // hint on wrong group name

  /* Section Headings */
  soloGalleryTitle: "✨ Birthday Girl ✨", // solo gallery title
  messageTitle: "To Our Rewari Friend", // letter section title
  footerText: "Made with 💗 just for you", // footer text

  /* Button Labels */
  buttons: {
    hero: "Ready for a little surprise?", // hero/landing button
    soloGallery: "One last thing...", // solo gallery button
  },

  /* Together Gallery (Optional) */
  togetherGallery: {
    enabled: true, // toggle together gallery
    title: "💕 Our Memories 💕", // together gallery title
    buttonText: "One last thing...", // together gallery button
  },

  /* Birthday Message: Each string is a paragraph */

message: [

  "First of all Happy Birthday Bhavna🥳🎂",
  //"",
  "I honestly really dont know what to say and i was not even sure whether i should do this or not.You really would not have expect from us to do such a thing,dont really know if you would even like it or not but we really wanted to do something for you on your birthday and we both really hope you like it.",
  //"",
  "I did quite a few mistakes this year and you have forgiven me for more than once, so i will not ask for forgiveness this time.",
  //"",
  "I just wanted to do something nice for you to make you feel special, to not let things end on bad terms so made this little website.",
  //"",
  "I know making this website does not make up for my mistakes and you might even think this is just another attempt to make you come back and join us again and honestly, i will be lying if i said its not.",
  //"",
  "I tried to make this website only to make you feel special on your birthday which you really are, no doubt about that and make you smile a little, but somewhere in all this one thousand four hundred thirty seven lines of code, there’s a tiny bit hope that may be one day you will forgive us and we can have trips together again as onlyplans (that - whats our group name question and the loading of onlyplans logo was anurag’s idea 😒🥲) - especially a mountain trip, we still remember you saying mountains were the place you’d most like to visit. So maybe someday. Who knows. 🏔️",
  //"",
  "But Really this time, we dont want to force anything and try not to do it ever again.",
  //"",
  "If you want to come back, we’ll be happy. If you don’t, we’ll respect that too.",
  //"",
  "We really wanted to celebrate your birthday with you at least once and once we both were making plans about it (Anurag said you will let us order anything on your birthday party😋)",
  //"",
  "So we are sorry for everything 🥲 - especially for the times we made things bad when they could have been better.",
  //"",
  "Anyway enough of all that,",
  //"",
  "Happy Birthday Once Again Bhavna🧿",
  //"",
  "We both hope this becomes one of your best birthdays, and we both hope every birthday after this one is even better.",
  //"",
  "We hope all your wishes come true and Hope you and your family will always be healthy, happy and always smiling.",
  //"",
  "Aur haan… Anurag specifically Beat me ki ye bhi likh 😵‍💫😵:",
  //"",
  "If someday you feel like having trips with us again and want to give us one more chance to be your friends, you know you can text us anytime anyday. ❤️",
 // "",
  "No Pressure,No Expectations",
  //"",
  "Happy Birthday!",
  "Take Care!",
  "- Jalkukda(yash) and gaubar(anurag)"

],

  /* Theme Colors - Change these to customize the entire website theme! */
  colors: {
    primary: "#ec4899", // main color (buttons, accents)
    light: "#fdf2f8", // lightest shade (backgrounds)
    medium: "#f9a8d4", // medium shade (decorations)
    dark: "#db2777", // darkest shade (hover states)
  },

  /* Typing Animation Text (shown on the start screen) */
  typingText: {
    first: "Hey, wait a second!",
    second: "This website is only for someone special to us.",
  },
};

// config.ts
export interface MediaItem {
  type: "photo" | "video";
  src: string;
  poster?: string; // small thumbnail shown instantly for videos
  caption?: string;
}

export type Config = typeof config;
