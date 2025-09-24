import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    social: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/yourprofile',
        icon: 'linkedin.png',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/yourprofile',
        icon: 'instagram.png',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/yourprofile',
        icon: 'facebook.png',
      },
      {
        name: 'Twitter',
        url: 'https://www.twitter.com/yourprofile',
        icon: 'twitter.png',
      },
    ],
    nav: [
      {
        name: 'About Us',
        url: '/about',
      },
      {
        name: 'Contact Us',
        url: '/contact',
      },
      {
        name: 'FAQs',
        url: '/faqs',
      },
      {
        name: 'Terms and Conditions',
        url: '/terms',
      },
      {
        name: 'Privacy',
        url: '/privacy',
      },
    ],
  };

  return (
    <footer className='bg-[#36384E] pt-12'>
      <div className='container mx-auto text-center text-white'>
        <div>
          <ul>
            {footerLinks.social.map((link) => (
              <li key={link.name} className='inline-block mx-4'>
                <Link
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-gray-400'
                >
                  <span className='sr-only'>{link.name}</span>
                  <Image
                    src={`/img/social/${link.icon}`}
                    alt={link.name}
                    className='h-6 w-6'
                    width={12}
                    height={12}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <ul className='my-4'>
            {footerLinks.nav.map((link) => (
              <li key={link.name} className='inline-block mx-2 md:mx-4'>
                <Link href={link.url} className='text-white hover:text-gray-400'>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p>&copy; {new Date().getFullYear()} Takoya University. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
