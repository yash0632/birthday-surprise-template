/* ==========================================
   GlimpseReveal Component

   Brief flash of the OnlyPlans memory image
   shown between NameGate and HeroSection
   ========================================== */

import { motion } from "framer-motion";
import onlyplansImg from "../assets/onlyplans.jpg"; // 👈 add your OnlyPlans image here

export default function GlimpseReveal() {
  return (
    <motion.div
      className="glimpse-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Expanding glow ring behind the icon */}
      <motion.div
        className="glimpse-ring"
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* The icon itself */}
      <motion.div
        className="glimpse-icon-wrap"
        initial={{ scale: 0, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
      >
        <img src={onlyplansImg} alt="OnlyPlans" className="glimpse-icon" />
      </motion.div>

      <motion.p
        className="glimpse-caption"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        remember us? 💕
      </motion.p>
    </motion.div>
  );
}