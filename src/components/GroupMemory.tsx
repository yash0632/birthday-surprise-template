import { motion } from "framer-motion";
import onlyPlansImg from "../assets/onlyplans.jpg";

interface GroupMemoryProps {
  onContinue: () => void;
}

export default function GroupMemory({
  onContinue,
}: GroupMemoryProps) {
  return (
    <motion.div
      className="group-memory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="group-memory-content"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.p
          className="group-memory-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
        >
          Wait... this looks familiar 👀
        </motion.p>

        <motion.div
          className="group-memory-image-wrapper"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <img
            src={onlyPlansImg}
            alt="OnlyPlans"
            className="group-memory-image"
          />
        </motion.div>

        <motion.p
          className="group-memory-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.1,
            duration: 0.6,
          }}
        >
          Ahh... OnlyPlans 😌
        </motion.p>

        <motion.button
          className="group-memory-button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 0.6,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          I remember ❤️
        </motion.button>
      </motion.div>
    </motion.div>
  );
}