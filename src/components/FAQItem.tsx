import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        className="w-full py-5 flex justify-between items-center gap-6 text-left text-lg font-medium text-stone-900 hover:text-[#1b8af1] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 shrink-0 text-stone-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-stone-600 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
