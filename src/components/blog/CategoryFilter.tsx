import React from 'react';
import { motion } from 'framer-motion';

const CHIP_BASE = 'px-2 py-1 text-xs font-medium rounded-lg transition-all duration-300';
const CHIP_ACTIVE = 'bg-yellowcustom text-primary shadow-md scale-105';
const CHIP_IDLE = 'bg-gray-200 text-gray-700 hover:bg-gray-300';

const chipClass = (isActive: boolean) => `${CHIP_BASE} ${isActive ? CHIP_ACTIVE : CHIP_IDLE}`;

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  filterLabel: string;
  allLabel: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories, selected, onSelect, filterLabel, allLabel,
}) => (
  <div className="flex flex-col items-center mb-8 p-4">
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white font-semibold text-sm uppercase tracking-wide mb-2"
    >
      {filterLabel}
    </motion.p>
    <motion.div
      className="flex flex-wrap justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        onClick={() => onSelect(null)}
        className={chipClass(selected === null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-pressed={selected === null}
      >
        {allLabel}
      </motion.button>
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => onSelect(category)}
          className={chipClass(selected === category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          aria-pressed={selected === category}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  </div>
);

export default CategoryFilter;
