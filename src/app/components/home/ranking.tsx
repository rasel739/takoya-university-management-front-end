'use client';
import { motion } from 'framer-motion';
import Title from '../common/Title';
import RankingCard from '../sub/ranking-card';
import { cardVariants, itemVariants } from '@/constants/global';

const Ranking = () => {
  const rankingData = [
    {
      id: '1',
      title: 'Stanford University',
      image: 'ranking-1.png',
      btnTitle: 'SEE UNIVERSITY',
    },
    {
      id: '2',
      title: 'Harvard University',
      image: 'ranking-2.png',
      btnTitle: 'SEE UNIVERSITY',
    },
    {
      id: '3',
      title: 'MIT',
      image: 'ranking-3.jpg',
      btnTitle: 'SEE UNIVERSITY',
    },
  ];

  return (
    <motion.div className='container mx-auto '>
      <Title title='Top ranking universities' />
      <motion.div
        variants={cardVariants}
        initial='scroll'
        whileInView='expand'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-4'
      >
        {rankingData.map((ranking) => (
          <motion.div key={ranking.id} variants={itemVariants} layout>
            <RankingCard rankingData={ranking} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Ranking;
