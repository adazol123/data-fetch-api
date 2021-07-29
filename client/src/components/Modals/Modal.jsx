import { useMotionValue, motion, AnimatePresence } from "framer-motion";

export function Modal({ toggle, setToggle, children }) {

  if (!toggle) return null

  return (
    <AnimatePresence>
        <Wrapper toggle={toggle} setToggle={setToggle}>
          {children}
        </Wrapper>
    </AnimatePresence>
  );
}

const Wrapper = ({ toggle, setToggle, children, ...rest }) => {
  const y = useMotionValue(0);
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "linear" },
    },
    exit: {
      opacity: 0,
      y: 500,
      transition: { ease: "linear", duration: 0.2 },
    },
  };

  return (
    <motion.div className="modal-wrapper">
      <motion.div
        className="modal-backdrop"
        onClick={() => setToggle((prev) => false)}
      />
      <motion.div
        className="modal-container"
        initial="exit"
        animate="visible"
        exit="exit"
        variants={variants}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        transition={{
          type: "spring",
          velocity: 50,
          duration: 0.2,
          mass: 0.5,
        }}
        style={{ y }}
        onDrag={() => {
            if (y.get() > 140) {
                setToggle((prev) => false);
            }
          }}
          onDragEnd={() => {
            if (y.get() > 120) {
                setToggle((prev) => false);
            }
          }}
      >
        <div className="modal-content">{children}</div>
      </motion.div>
    </motion.div>
  );
};
