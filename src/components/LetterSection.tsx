/* ==========================================
   LetterSection Component

   Displays a heartfelt message inside a letter-style
   card with natural-paced typewriter animation.
   One specific paragraph (the emotional core) types
   slower and is visually set apart so it lands deeper.
   ========================================== */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./LetterSection.module.css";
import { config } from "../config";

// Base delay per character (ms) for normal paragraphs
const BASE_SPEED = 35;

// Extra pause (ms) added after certain characters — natural reading rhythm
const PAUSE_AFTER: Record<string, number> = {
  ",": 150,
  "—": 150,
  ":": 200,
  ";": 200,
  ".": 450,
  "!": 450,
  "?": 450,
};

const START_DELAY = 500;

// The index (in config.message) of the paragraph that's the emotional
// crux of the letter — it gets slower typing, longer pauses around it,
// and a distinct visual treatment so she really sits with it.
const EMPHASIS_INDEX = 5;
const EMPHASIS_SPEED_MULTIPLIER = 1.9; // ~2x slower per character
const PRE_EMPHASIS_PAUSE = 1100; // beat of silence before it starts
const POST_EMPHASIS_PAUSE = 1600; // hold after it finishes, before continuing

export default function LetterSection() {
  // Paragraphs fully typed and finalized
  const [completedParagraphs, setCompletedParagraphs] = useState<string[]>([]);
  // The paragraph currently being typed
  const [currentParagraphIndex] = useState(0);
  const [currentTypedText, setCurrentTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isUserScrolledAwayRef = useRef(false);

  // Guards against the typing effect ever running more than once,
  // no matter how many times isInView fires or the effect re-triggers
  // (e.g. on scroll). Without this, scrolling could restart the whole
  // typing sequence and duplicate paragraphs at the bottom.
  const hasStartedTypingRef = useRef(false);

  const paragraphs = config.message;

  useEffect(() => {
    if (!isInView || hasStartedTypingRef.current) return;
    hasStartedTypingRef.current = true; // lock — this effect body can only ever run once

    let paraIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeParagraph = () => {
      if (paraIndex >= paragraphs.length) {
        setIsTypingComplete(true);
        return;
      }

      const text = paragraphs[paraIndex];
      const isEmphasis = paraIndex === EMPHASIS_INDEX;
      const speedMultiplier = isEmphasis ? EMPHASIS_SPEED_MULTIPLIER : 1;

      const typeNextChar = () => {
        if (charIndex >= text.length) {
          // Paragraph finished — commit it, move to the next
          setCompletedParagraphs((prev) => [...prev, text]);
          setCurrentTypedText("");
          paraIndex++;
          charIndex = 0;

          const holdBeforeNext = isEmphasis ? POST_EMPHASIS_PAUSE : 250;
          timeoutId = setTimeout(typeParagraph, holdBeforeNext);
          return;
        }

        const char = text[charIndex];
        charIndex++;
        setCurrentTypedText(text.slice(0, charIndex));

        const extraPause = (PAUSE_AFTER[char] ?? 0) * speedMultiplier;
        timeoutId = setTimeout(
          typeNextChar,
          BASE_SPEED * speedMultiplier + extraPause
        );
      };

      // Extra beat of silence right before the emphasis paragraph begins
      const startPause = isEmphasis ? PRE_EMPHASIS_PAUSE : 0;
      timeoutId = setTimeout(typeNextChar, startPause);
    };

    const startTimeout = setTimeout(typeParagraph, START_DELAY);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [isInView, paragraphs]);

  // Detect manual scroll — if she scrolls up, stop auto-following;
  // if she scrolls back down near the bottom herself, resume auto-follow
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      // Small threshold so it still counts as "at bottom" even with
      // sub-pixel rounding differences
      isUserScrolledAwayRef.current = distanceFromBottom > 40;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep the letter auto-scrolled to the latest typed line —
  // but only if she hasn't manually scrolled up to reread something
  useEffect(() => {
    if (contentRef.current && !isUserScrolledAwayRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [completedParagraphs, currentTypedText]);

  // Tap to skip straight to the full letter
  const skipToEnd = () => {
    if (!isTypingComplete) {
      setCompletedParagraphs(paragraphs);
      setCurrentTypedText("");
      setIsTypingComplete(true);
      isUserScrolledAwayRef.current = false; // let it settle at the bottom after skip
    }
  };

  return (
    <section ref={sectionRef} className={styles.letter}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {config.messageTitle}
      </motion.h2>

      <motion.div
        className={styles.letterCard}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={skipToEnd}
      >
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        <div className={styles.cornerBottomRight} />

        <div className={styles.letterContent} ref={contentRef}>
          {completedParagraphs.map((text, i) => (
            <p
              key={i}
              className={
                i === EMPHASIS_INDEX
                  ? `${styles.messageParagraph} ${styles.emphasisParagraph}`
                  : styles.messageParagraph
              }
            >
              {text}
            </p>
          ))}

          {!isTypingComplete && currentTypedText && (
            <p
              className={
                currentParagraphIndex === EMPHASIS_INDEX ||
                completedParagraphs.length === EMPHASIS_INDEX
                  ? `${styles.messageParagraph} ${styles.emphasisParagraph}`
                  : styles.messageParagraph
              }
            >
              {currentTypedText}
              <span className={styles.cursor}>|</span>
            </p>
          )}
        </div>

        {!isTypingComplete && (
          <span className={styles.skipHint}>tap to read the whole letter</span>
        )}
      </motion.div>

      <div className={styles.bgDecor1} />
      <div className={styles.bgDecor2} />
      <div className={styles.bgDecor3} />
    </section>
  );
}