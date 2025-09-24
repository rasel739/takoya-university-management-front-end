'use client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/lib/icons';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ReadFaqs = () => {
  return (
    <div className='container mx-auto flex justify-center'>
      <div className='max-w-5xl w-full flex flex-col md:flex-row items-start gap-10'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='flex-1 order-2 md:order-1'
        >
          <Image src='/img/help.jpg' alt='ranking' width={600} height={400} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='flex-1  flex flex-col justify-center order-1 md:order-2'
        >
          <h2 className='text-2xl font-bold'>{"We're here to help"}</h2>
          <p className='my-5'>
            Read through our FAQs and, if you {"can't find what you're"} looking for, our experts
            will be happy to answer your questions.
          </p>
          <div className='flex items-center gap-5'>
            <Button variant='outline' className='bg-amber-500 text-white hover:bg-amber-400'>
              READ FAQS
            </Button>
            <Button variant='outline' className='text-amber-400'>
              <Icons.Mail className='text-black' /> ASK A QUESTION
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReadFaqs;
