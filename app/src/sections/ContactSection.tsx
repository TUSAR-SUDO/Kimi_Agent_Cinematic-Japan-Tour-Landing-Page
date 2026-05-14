import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', comment: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img
          src="/images/contact-bg.jpg"
          alt="Cherry blossoms framing Mount Fuji"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-mist-black/60 via-mist-black/30 to-transparent" />

      {/* Form Panel */}
      <div className="relative z-[3] flex items-center min-h-screen py-20 px-6 md:px-10">
        <motion.div
          ref={formRef}
          className="glass-form rounded-[20px] p-8 md:p-12 w-full max-w-[420px] shadow-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={isFormInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-editorial text-kimono-white text-2xl md:text-[28px] leading-relaxed">
            Want to join us, but still have questions?
          </h2>
          <p className="small-caps text-mouse-gray mt-2 tracking-[0.15em]">
            Leave a request
          </p>

          {submitted ? (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-lime-accent text-lg">Thank you! We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="mt-10 space-y-0"
              variants={containerVariants}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fieldVariants}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-kimono-white/20 text-kimono-white py-4 text-base placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent transition-colors duration-200"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-kimono-white/20 text-kimono-white py-4 text-base placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent transition-colors duration-200"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <input
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-kimono-white/20 text-kimono-white py-4 text-base placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent transition-colors duration-200"
                />
              </motion.div>

              <motion.div variants={fieldVariants} className="pt-8">
                <motion.button
                  type="submit"
                  className="w-full bg-kimono-white text-mist-black font-body font-medium text-sm uppercase tracking-[0.1em] py-4 rounded-full cursor-hover"
                  whileHover={{
                    backgroundColor: '#D4F87A',
                    y: -2,
                    boxShadow: '0 4px 16px rgba(212, 248, 122, 0.3)',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  Send
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
