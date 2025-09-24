'use client';
import { motion } from 'framer-motion';
import Title from '../common/Title';
import RankingCard from '../sub/ranking-card';
import { cardVariants, itemVariants } from '@/constants/global';

const Popular = () => {
  const popularData = [
    {
      id: '1',
      title: 'User experience design',
      image: 'popular-1.png',
      btnTitle: 'SEE COURSE GUIDE',
    },
    {
      id: '2',
      title: 'Computer science',
      image: 'popular-2.png',
      btnTitle: 'SEE COURSE GUIDE',
    },
    {
      id: '3',
      title: 'Business management',
      image: 'popular-3.png',
      btnTitle: 'SEE COURSE GUIDE',
    },
  ];

  return (
    <div className='container mx-auto'>
      <div className='container mx-auto '>
        <Title title='Top ranking universities' />
        <motion.div
          initial='scroll'
          whileInView='expand'
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-4'
        >
          {popularData.map((ranking) => (
            <motion.div key={ranking.id} variants={itemVariants} layout>
              <RankingCard rankingData={ranking} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Popular;
