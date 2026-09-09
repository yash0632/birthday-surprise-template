// /* ==========================================
//    HeroSection Component

//    Displays the initial surprise with animated
//    banner and cake GIF.
//    ========================================== */

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import styles from "./HeroSection.module.css";
// import { config } from "../config";
// import bannerImg from "../assets/banner.gif";
// import cakeImg from "../assets/cake.gif";

// interface HeroSectionProps {
//   /** Callback when user clicks "Next Surprise" button */
//   onNextSection: () => void;
// }

// export default function HeroSection({ onNextSection }: HeroSectionProps) {
//   // State to show the button after animations complete
//   const [showButton, setShowButton] = useState(false);

//   // Show button after a delay for the animations to play
//   useEffect(() => {
//     const timer = setTimeout(() => setShowButton(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className={styles.hero}>
//       {/* Banner Image */}
//       <motion.img
//         src={bannerImg}
//         alt="Banner"
//         className={styles.banner}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
//       />

//       {/* Birthday Cake GIF */}
//       <motion.img
//         src={cakeImg}
//         alt="Birthday Cake"
//         className={styles.cakeGif}
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
//       />

//       {/* Next Surprise Button */}
//       <motion.button
//         className={`btn-primary ${styles.nextButton}`}
//         onClick={onNextSection}
//         initial={{ opacity: 0, y: 12 }}
//         animate={{
//           opacity: showButton ? 1 : 0,
//           y: showButton ? 0 : 12,
//         }}
//         transition={{
//           duration: 1.5,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//         whileHover={
//           showButton
//             ? { scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }
//             : {}
//         }
//         whileTap={showButton ? { scale: 0.98 } : {}}
//         style={{
//           pointerEvents: showButton ? "auto" : "none",
//           marginTop: "4rem",
//         }}
//       >
//         {config.buttons.hero}
//       </motion.button>

//       {/* Decorative Elements */}
//       <div className={styles.decorativeCircle1} />
//       <div className={styles.decorativeCircle2} />
//     </section>
//   );
// }
/* ==========================================
   HeroSection Component

   Displays the initial surprise with animated
   banner, cake GIF, floating ambience and a
   personalized greeting.
   ========================================== */

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import { config } from "../config";
import bannerImg from "../assets/banner.gif";
import cakeImg from "../assets/cake.gif";

interface HeroSectionProps {
  /** Callback when user clicks "Next Surprise" button */
  onNextSection: () => void;
}

// Small floating ambient particles (hearts + sparkles)
const PARTICLES = ["💗", "✨", "🎈", "💫", "🌸"];

export default function HeroSection({ onNextSection }: HeroSectionProps) {
  const [showButton, setShowButton] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const greetingTimer = setTimeout(() => setShowGreeting(true), 200);
    const buttonTimer = setTimeout(() => setShowButton(true), 5000);
    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Generate randomized floating particles once per mount
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        emoji: PARTICLES[i % PARTICLES.length],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 6,
        size: 0.9 + Math.random() * 0.9,
      })),
    []
  );

  return (
    <section className={styles.hero}>
      {/* Floating ambient particles */}
      <div className={styles.particleField} aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={styles.particle}
            style={{ left: `${p.left}%`, fontSize: `${p.size}rem` }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>

      {/* Personalized greeting */}
      {showGreeting && (
        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Happy Birthday, {config.recipientName} 🎂
        </motion.p>
      )}

      {/* Banner Image */}
      <motion.img
        src={bannerImg}
        alt="Banner"
        className={styles.banner}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      />

      {/* Birthday Cake GIF with glow pulse behind it */}
      <div className={styles.cakeWrap}>
        <motion.div
          className={styles.cakeGlow}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          }}
        />
        <motion.img
          src={cakeImg}
          alt="Birthday Cake"
          className={styles.cakeGif}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Soft encouraging subtitle */}
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        a little something made just for you...
      </motion.p>

      {/* Next Surprise Button */}
      <motion.button
        className={`btn-primary ${styles.nextButton}`}
        onClick={onNextSection}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: showButton ? 1 : 0,
          y: showButton ? 0 : 12,
        }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={
          showButton
            ? { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } }
            : {}
        }
        whileTap={showButton ? { scale: 0.95 } : {}}
        style={{
          pointerEvents: showButton ? "auto" : "none",
          marginTop: "3rem",
        }}
      >
        {config.buttons.hero} <span className={styles.arrow}>→</span>
      </motion.button>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
    </section>
  );
}