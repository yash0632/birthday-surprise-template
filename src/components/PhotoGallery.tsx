/* ==========================================
   PhotoGallery Component - Living Polaroid Gallery

   Tap a card to view it full-size in a lightbox.
   Tap the heart to mark a memory as a favorite —
   it gets a soft permanent glow and a little
   heart-burst moment.
   ========================================== */

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import styles from "./PhotoGallery.module.css";
import { useInView } from "../hooks/useInView";
import type { MediaItem } from "../config";

interface PhotoGalleryProps {
  title: string;
  photos: MediaItem[];
  buttonText: string;
  onNextSection: () => void;
}

const ROTATIONS = [-3, 2, -2, 3, -1, 2, -3, 2, -2];

function MemoryCard({
  item,
  index,
  wobble,
  isFavorited,
  onToggleFavorite,
  onExpand,
}: {
  item: MediaItem;
  index: number;
  wobble: { base: number; keyframes: number[]; duration: number; delay: number };
  isFavorited: boolean;
  onToggleFavorite: (index: number, cardEl: HTMLDivElement | null) => void;
  onExpand: (index: number) => void;
}) {
  const { ref, isInView } = useInView("250px");
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardObserver = useInView("0px");
  const cardElRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (cardObserver.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        cardElRef.current = node;
      }}
      className={styles.photoFrame}
      initial={{ opacity: 0, scale: 0.9, rotate: wobble.base }}
      animate={{ opacity: 1, scale: 1, rotate: wobble.keyframes }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08, ease: "easeOut" },
        scale: { duration: 0.5, delay: index * 0.08, ease: "easeOut" },
        rotate: {
          duration: wobble.duration,
          delay: index * 0.08 + wobble.delay,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 1.03 }}
    >
      <div
        className={`${styles.polaroid} ${isFavorited ? styles.polaroidFavorited : ""}`}
        onClick={() => onExpand(index)}
      >
        {!isLoaded && <div className={styles.shimmer} />}

        {isInView && item.type === "video" && (
          <video
            ref={videoRef}
            className={styles.photo}
            src={item.src}
            poster={item.poster}
            autoPlay={cardObserver.isInView}
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            onLoadedData={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        )}

        {isInView && item.type === "photo" && (
          <img
            src={item.src}
            alt={`Memory ${index + 1}`}
            className={styles.photo}
            draggable={false}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        )}

        {item.type === "video" && isLoaded && (
          <span className={styles.videoBadge}>♥</span>
        )}

        {isLoaded && (
          <button
            className={`${styles.favoriteButton} ${isFavorited ? styles.favoriteButtonActive : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // don't also trigger the lightbox
              onToggleFavorite(index, cardElRef.current);
            }}
            aria-label={isFavorited ? "Remove from favorites" : "Mark as favorite"}
          >
            {isFavorited ? "❤" : "🤍"}
          </button>
        )}

        {isLoaded && (
          <span className={styles.caption}>{item.caption ?? " "}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function PhotoGallery({
  title,
  photos,
  buttonText,
  onNextSection,
}: PhotoGalleryProps) {
  const [favorited, setFavorited] = useState<Set<number>>(new Set());
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const wobbles = useMemo(
    () =>
      photos.map((_, i) => {
        const base = ROTATIONS[i % ROTATIONS.length];
        return {
          base,
          keyframes: [base - 1.8, base + 1.8, base - 1.8],
          duration: 3.2 + (i % 4) * 0.4,
          delay: (i % 5) * 0.3,
        };
      }),
    [photos]
  );

  const handleToggleFavorite = (index: number, cardEl: HTMLDivElement | null) => {
    setFavorited((prev) => {
      const next = new Set(prev);
      const wasAlreadyFavorited = next.has(index);

      if (wasAlreadyFavorited) {
        next.delete(index);
      } else {
        next.add(index);

        // Little heart burst right from where the card actually sits
        const rect = cardEl?.getBoundingClientRect();
        const origin = rect
          ? {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight,
            }
          : { x: 0.5, y: 0.5 };

        confetti({
          particleCount: 18,
          spread: 50,
          startVelocity: 18,
          scalar: 0.7,
          gravity: 0.6,
          colors: ["#f472b6", "#ec4899", "#fbcfe8"],
          origin,
        });
      }

      return next;
    });
  };

  const favoritedCount = favorited.size;

  return (
    <section className={styles.gallery}>
      <div className={styles.sideBorderLeft}>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>❤</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
      </div>
      <div className={styles.sideBorderRight}>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>❤</span>
        <span className={styles.borderDot} />
        <span className={styles.borderHeart}>♡</span>
        <span className={styles.borderDot} />
      </div>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className={styles.gallerySubtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        tap any memory to look closer, tap the heart to keep it close ✨
      </motion.p>

      <div className={styles.photoGrid}>
        {photos.map((item, index) => (
          <MemoryCard
            key={index}
            item={item}
            index={index}
            wobble={wobbles[index]}
            isFavorited={favorited.has(index)}
            onToggleFavorite={handleToggleFavorite}
            onExpand={setExpandedIndex}
          />
        ))}
      </div>

      {favoritedCount > 0 && (
        <motion.p
          className={styles.favoriteCount}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {favoritedCount} {favoritedCount === 1 ? "memory" : "memories"} close to your heart 💕
        </motion.p>
      )}

      <motion.button
        className={`btn-primary ${styles.continueButton}`}
        onClick={onNextSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonText}
      </motion.button>

      {/* Lightbox — full-size view of the tapped memory */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.lightboxClose}
                onClick={() => setExpandedIndex(null)}
                aria-label="Close"
              >
                ✕
              </button>

              {photos[expandedIndex].type === "video" ? (
                <video
                  className={styles.lightboxMedia}
                  src={photos[expandedIndex].src}
                  poster={photos[expandedIndex].poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              ) : (
                <img
                  className={styles.lightboxMedia}
                  src={photos[expandedIndex].src}
                  alt={`Memory ${expandedIndex + 1}`}
                />
              )}

              {photos[expandedIndex].caption && (
                <p className={styles.lightboxCaption}>
                  {photos[expandedIndex].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}