/* ==========================================
   HeroSection Component

   Displays the initial surprise with animated
   banner, cake GIF, floating ambience, a
   personalized shimmer greeting, and an
   interactive "make a wish" cake tap moment.
   ========================================== */

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import styles from "./HeroSection.module.css";
import { config } from "../config";
import bannerImg from "../assets/banner.gif";
import cakeImg from "../assets/cake.gif";

interface HeroSectionProps {
  onNextSection: () => void;
}

const PARTICLES = ["💗", "✨", "🎈", "💫", "🌸"];

export default function HeroSection({ onNextSection }: HeroSectionProps) {
  const [showButton, setShowButton] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const cakeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greetingTimer = setTimeout(() => setShowGreeting(true), 200);
    const buttonTimer = setTimeout(() => setShowButton(true), 5000);
    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

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

  // Little celebratory moment triggered by her, not just played at her.
  // A gentle heart-burst confetti fired from wherever the cake actually
  // sits on screen, plus a bounce + glow shift on the cake itself.
  const handleMakeWish = () => {
    if (wishMade) return;
    setWishMade(true);

    const rect = cakeWrapRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.55 };

    confetti({
      particleCount: 40,
      spread: 70,
      startVelocity: 28,
      scalar: 0.9,
      shapes: ["circle"],
      colors: ["#f472b6", "#ec4899", "#fbcfe8", "#ffffff"],
      origin,
    });
  };

  return (
    <section className={styles.hero}>
      {/* Soft cinematic spotlight breathing behind everything */}
      <motion.div
        className={styles.spotlight}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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

      {/* Personalized shimmer greeting */}
      {showGreeting && (
        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Happy Birthday, <span className={styles.shimmerName}>{config.recipientName}</span> 🎂
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

      {/* Birthday Cake — tappable to make a wish */}
      <div
        className={styles.cakeWrap}
        ref={cakeWrapRef}
        onClick={handleMakeWish}
        role="button"
        tabIndex={0}
        aria-label="Tap the cake to make a wish"
        onKeyDown={(e) => e.key === "Enter" && handleMakeWish()}
      >
        <motion.div
          className={styles.cakeGlow}
          animate={
            wishMade
              ? { opacity: [0.4, 0.9, 0.5], scale: [0.9, 1.25, 1.05] }
              : { opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }
          }
          transition={{
            duration: wishMade ? 1 : 3,
            repeat: wishMade ? 0 : Infinity,
            ease: "easeInOut",
            delay: wishMade ? 0 : 1.2,
          }}
        />
        <motion.img
          src={cakeImg}
          alt="Birthday Cake"
          className={styles.cakeGif}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            wishMade
              ? { opacity: 1, scale: [1, 1.12, 1], rotate: [0, -3, 3, 0] }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: wishMade ? 0.6 : 0.6, delay: wishMade ? 0 : 0.8, ease: "easeOut" }}
          whileHover={!wishMade ? { scale: 1.04 } : {}}
        />

        {!wishMade && (
          <motion.span
            className={styles.wishHint}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            tap to make a wish ✨
          </motion.span>
        )}

        {wishMade && (
          <motion.span
            className={styles.wishMadeText}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            wish made 🌟 may it come true
          </motion.span>
        )}
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
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
        <span className={styles.buttonShine} />
        {config.buttons.hero} <span className={styles.arrow}>→</span>
      </motion.button>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
    </section>
  );
}