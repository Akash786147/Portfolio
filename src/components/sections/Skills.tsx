import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  icon: string; // Unicode or placeholder
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const skills: Skill[] = [
    // Frontend
    { name: 'React', icon: '⚛️', level: 9, category: 'frontend' },
    { name: 'TypeScript', icon: '📘', level: 8, category: 'frontend' },
    { name: 'JavaScript', icon: '📜', level: 9, category: 'frontend' },
    { name: 'HTML/CSS', icon: '🎨', level: 8, category: 'frontend' },
    { name: 'Tailwind CSS', icon: '💨', level: 9, category: 'frontend' },
    { name: 'Three.js', icon: '🧊', level: 7, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: '🟢', level: 7, category: 'backend' },
    { name: 'Express', icon: '🚄', level: 7, category: 'backend' },
    { name: 'MongoDB', icon: '🍃', level: 7, category: 'backend' },
    { name: 'PostgreSQL', icon: '🐘', level: 6, category: 'backend' },
    
    // Design
    { name: 'Figma', icon: '🖌️', level: 8, category: 'design' },
    { name: 'UI/UX', icon: '👁️', level: 8, category: 'design' },
    { name: 'Animation', icon: '✨', level: 8, category: 'design' },
    
    // Tools
    { name: 'Git', icon: '📑', level: 8, category: 'tools' },
    { name: 'Docker', icon: '🐳', level: 6, category: 'tools' },
    { name: 'VS Code', icon: '💻', level: 9, category: 'tools' },
  ];
  
  const categories = [
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'design', name: 'Design' },
    { id: 'tools', name: 'Tools & Workflow' },
  ];
  
  return (
    <section id="skills" className="section bg-dark/95 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-secondary/5 filter blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              My Skillset
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and expertise across different domains.
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">
                {category.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter(skill => skill.category === category.id)
                  .map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 + categoryIndex * 0.2 }}
                      className="glass-card p-6 flex items-center"
                    >
                      <div className="text-3xl mr-4">{skill.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <span className="text-xs text-gray-400">{skill.level}/10</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level * 10}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 + categoryIndex * 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
