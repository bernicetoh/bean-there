import CreateReview from "../components/create-review/CreateReview";
import { motion } from "framer-motion";
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <CreateReview />
    </motion.div>
  );
}

export default HomePage;
