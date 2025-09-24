'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../sub/course-card';

const cardData = [
  {
    title: 'Find a course',
    content: 'Search by subject, course or region to find the right course for you.',
    icon: 'course-search.png',
  },
  {
    title: 'Find a university',
    content: 'Search for universities to find out about courses and more.',
    icon: 'university-search.png',
  },
  {
    title: 'Find an open day',
    content: 'Search and book open days to help you make the right choice.',
    icon: 'university-open.png',
  },
];

const Course = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className='container mx-auto'
    >
      <div className='relative w-full h-[850px] md:h-[400px]'>
        <Image
          src='/img/course-bg.jpg'
          alt='takoya-university-hero-bannar'
          fill
          priority
          sizes='(max-width:768px) 100vw,1200px'
          className='object-cover'
        />
        <div className='absolute inset-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 justify-center mt-20'>
            {cardData.map((card, index) => (
              <div key={index}>
                <CourseCard cardData={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Course;
