/* ==========================================
   PhotoGallery Component - Living Polaroid Gallery
   ========================================== */

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
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
}: {
  item: MediaItem;
  index: number;
  wobble: { base: number; keyframes: number[]; duration: number; delay: number };
}) {
  const { ref, isInView } = useInView("250px");
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause the clip when it scrolls out of view (saves battery/data),
  // resume automatically once it scrolls back in
  const cardObserver = useInView("0px");

  return (
    <motion.div
      ref={(node) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (cardObserver.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
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
        scale: 1.16,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <div className={styles.polaroid}>
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

        {item.caption && isLoaded && (
          <span className={styles.caption}>{item.caption}</span>
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

      <div className={styles.photoGrid}>
        {photos.map((item, index) => (
          <MemoryCard key={index} item={item} index={index} wobble={wobbles[index]} />
        ))}
      </div>

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
    </section>
  );
}