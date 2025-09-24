import Course from './course';
import Hero from './hero';
import Navbar from './navbar';
import Popular from './popular';
import Ranking from './ranking';
import ReadFaqs from './read-faqs';
import { Subscribe } from './subscribe';

const Main = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Course />
      <Ranking />
      <Popular />
      <ReadFaqs />
      <Subscribe />
    </>
  );
};

export default Main;
