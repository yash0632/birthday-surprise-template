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
  messageTitle: "To My Favorite Person", // letter section title
  footerText: "Made with 💗 just for you", // footer text

  /* Button Labels */
  buttons: {
    hero: "Ready for a little surprise?", // hero/landing button
    soloGallery: "Want to see more?", // solo gallery button
  },

  /* Together Gallery (Optional) */
  togetherGallery: {
    enabled: true, // toggle together gallery
    title: "💕 Our Memories 💕", // together gallery title
    buttonText: "One last thing...", // together gallery button
  },

  /* Birthday Message: Each string is a paragraph */
  message: [
    "Happy Birthday, my love!",
    "",
    "I hope today is filled with joy, laughter, and all the little moments that make you smile. As you step into this new year, may it bring exciting opportunities, meaningful memories, and the confidence to chase everything you dream of.",
    "",
    "You have so much ahead of you, and I hope you never stop believing in yourself and all that you’re capable of. May this year be kind to you, rewarding, and full of reasons to celebrate.",
    "",
    "Wishing you a beautiful birthday and an even more amazing year to come.",
    "",
    "- With love,",
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
    second: "This website is only for someone special.",
  },
};

export type Config = typeof config;
