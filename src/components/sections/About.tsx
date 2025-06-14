import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skills = [
    "Flutter", "React Native", "Node.js", "Python", 
    "Java", "JavaScript", "TypeScript", "PostgreSQL"
  ];

  return (
    <section id="about" className="section bg-gradient-to-b from-dark to-dark/90 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-primary/10 filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/10 filter blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          ref={ref}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Profile image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                  <img 
                    src="/logo192.png"
                    alt="Akash Choudhary"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-primary"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-secondary"></div>
            </div>
          </motion.div>
          
          {/* About content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                About Me
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm a B.Tech Computer Science student at Bml Munjal University with a CGPA of 8.55. 
              My expertise lies in full-stack mobile development, with hands-on experience in Flutter, React Native, 
              and backend technologies including Node.js and PostgreSQL.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Currently working as a Backend Engineer at UniSphere and have contributed to multiple startups 
              including USTART and AroundYou. I'm passionate about building scalable software solutions and 
              constantly learning new technologies to contribute to impactful software products.
            </motion.p>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Key Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.a 
              href="#contact"
              className="btn btn-primary inline-flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Let's Work Together
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
