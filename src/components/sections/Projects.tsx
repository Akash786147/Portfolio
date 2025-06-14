import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "Savera App - Club Management System",
      description: "An app for a university charity club that teaches village children. Features include daily attendance, study progress tracking, learning material uploads, and end-to-end management of club activities.",
      image: "/savera.png",
      tags: ["Flutter", "Firebase", "Dart", "Mobile"],
      link: "#"
    },
    {
      id: 2,
      title: "Data Insight Software",
      description: "A Flutter + Flask based tool that allows non-coders to perform deep data analysis. Helps extract actionable insights from datasets through intuitive UI and intelligent backend logic.",
      image: "/analytics.png",
      tags: ["Flutter", "Flask", "Python", "Data Analytics"],
      link: "#"
    },
    {
      id: 3,
      title: "CharitEase - Social Cause App",
      description: "Winner of 1st Position at Innoquest Hackathon at Microsoft, Gurgaon. A social cause-based application that connects donors with charitable organizations and tracks impact.",
      image: "/charitease.png",
      tags: ["React Native", "Node.js", "MongoDB", "Social Impact"],
      link: "#"
    },
  ];

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="projects" className="section bg-dark relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/5 filter blur-3xl" />
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
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Here are some of my key projects that demonstrate my skills in mobile development, 
            data analytics, and social impact applications.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="glass-card overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  View Project
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="/projects" className="btn btn-primary">
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
