import { useMemo } from 'react';
import { useI18n } from './i18n.jsx';
import heroVideo from '../hero-video.mp4';
import amandaHeadshot from '../Headshots2/Amanda.jpeg';
import annaHeadshot from '../Headshots2/Anna.jpeg';
import davidHeadshot from '../Headshots2/David2.jpeg';
import philipHeadshot from '../Headshots2/Philip.jpeg';
import erikaHeadshot from '../Headshots2/Erika.jpeg';
import henrikHeadshot from '../Headshots2/Henrik Tiba2.jpeg';
import johannaHeadshot from '../Headshots2/Johanna.jpeg';
import jonasHeadshot from '../Headshots2/Jonas Headshot.jpeg';
import oscarHeadshot from '../Headshots2/Oscar.jpeg';
import vanessaHeadshot from '../Headshots2/Vanessa.jpeg';

export const useContent = () => {
  const { t } = useI18n();

  return useMemo(() => {
    const heroRotatingWords = t('hero.rotating') || ['Webdesign', 'Artificial Intelligence', 'SEO'];

    const navItems = [
      { label: t('nav.product'), href: '#product' },
      { label: t('nav.ai'), href: '#ai' },
      { label: t('nav.pricing'), href: '#pricing' },
      { label: t('nav.company'), href: '#company' },
      { label: t('nav.blog'), href: 'https://reflect.app/blog', external: true },
    ];

    const heroContent = {
      kicker: t('hero.kicker'),
      title: t('hero.titleStatic'),
      rotatingWords: heroRotatingWords,
      subtitle: t('hero.subtitle'),
      ctas: [
        { label: t('hero.ctas.primary'), href: '#pricing', primary: true },
        { label: t('hero.ctas.secondary'), href: '#product' },
      ],
      stats: t('hero.stats'),
      heroImage: 'https://reflect.app/home/build/q-11289093.jpeg',
      heroVideo: heroVideo,
    };

    const processGalleryContent = {
      kicker: t('processGallery.kicker'),
      title: t('processGallery.title'),
      description: t('processGallery.description'),
      cta: t('processGallery.cta'),
      closeLabel: t('processGallery.closeLabel'),
    };

    const featureBlocks =
      (t('features.blocks') || []).map((block) => ({
        title: block.title,
        description: block.description,
        points: block.points,
      })) ?? [];

    const showcaseContent = {
      id: 'product',
      label: t('showcase.label'),
      title: t('showcase.title'),
      description: t('showcase.description'),
      image: 'https://reflect.app/home/build/q-d228e6d6.png',
      video: null,
      bullets: t('showcase.bullets'),
    };

    const aiContent = {
      id: 'ai',
      label: t('ai.label'),
      title: t('ai.title'),
      description: t('ai.description'),
      image: 'https://reflect.app/home/build/q-87e25bb5.png',
      bullets: t('ai.bullets'),
    };

    const pricingContent = {
      id: 'pricing',
      title: t('pricing.title'),
      blurb: t('pricing.blurb'),
      price: t('pricing.price'),
      period: t('pricing.period'),
      features: t('pricing.features'),
      cta: { label: t('pricing.cta'), href: '#', primary: true },
      secondaryCta: { label: t('pricing.secondaryCta'), href: '#company' },
    };

    const testimonials = [
      {
        name: 'Fabrizio Rinaldi',
        handle: '@linuz90',
        quote:
          'I keep Reflect open all the time. It is the first notes app that works for quick journaling and long-form writing with equal ease.',
        avatar: 'https://reflect.app/home/build/q-63640e93.png',
      },
      {
        name: 'Jonathan Simcoe',
        handle: '@jdsimcoe',
        quote:
          'The graph view makes associations effortless. The attention to speed and detail makes it a daily driver for me.',
        avatar: 'https://reflect.app/home/build/q-d860527e.png',
      },
      {
        name: 'Chris',
        handle: '@Mr_Chris_L',
        quote:
          'The visualization of the neural network is superb and seeing it evolve keeps me taking daily notes.',
        avatar: 'https://reflect.app/home/build/q-6c1ea1e6.png',
      },
    ];

    const footerLinks = [
      {
        heading: t('footer.product'),
        links: [
          { label: t('footer.links.features'), href: '#product' },
          { label: t('footer.links.ai'), href: '#ai' },
          { label: t('footer.links.pricing'), href: '#pricing' },
          { label: t('footer.links.downloads'), href: 'https://reflect.app/downloads', external: true },
        ],
      },
      {
        heading: t('footer.company'),
        links: [
          { label: t('footer.links.blog'), href: 'https://reflect.app/blog', external: true },
          { label: t('footer.links.changelog'), href: 'https://reflect.app/changelog', external: true },
          { label: t('footer.links.careers'), href: '#company' },
          { label: t('footer.links.contact'), href: 'https://reflect.academy/contact-us', external: true },
        ],
      },
      {
        heading: t('footer.resources'),
        links: [
          { label: t('footer.links.docs'), href: 'https://reflect.academy', external: true },
          { label: t('footer.links.roadmap'), href: 'https://reflect.academy/roadmap', external: true },
          { label: t('footer.links.values'), href: 'https://reflect.academy/our-values', external: true },
        ],
      },
    ];

    const teamMembers = [
      {
        name: 'Vanessa',
        role: 'Strategy Partner',
        bio: 'Steers partnerships and ensures every engagement moves forward with clarity and momentum.',
        image: vanessaHeadshot,
      },
      {
        name: 'Henrik',
        role: 'Data & Insights',
        bio: 'Turns research and telemetry into clear direction for product and marketing.',
        image: henrikHeadshot,
      },
      {
        name: 'Johanna',
        role: 'Customer Success',
        bio: 'Keeps close to our customers and translates their wins into knowledge for the team.',
        image: johannaHeadshot,
      },
      {
        name: 'Philip',
        role: 'Engineering Lead',
        bio: 'Guides the engineering team with a steady hand and a passion for resilient systems.',
        image: philipHeadshot,
      },
      {
        name: 'Erika',
        role: 'Brand Strategist',
        bio: 'Makes sure every touchpoint reflects the calm, confident voice of the brand.',
        image: erikaHeadshot,
      },
      {
        name: 'Jonas',
        role: 'Creative Director',
        bio: 'Leads visual direction, ensuring every screen has a sense of warmth and motion.',
        image: jonasHeadshot,
      },
      {
        name: 'Anna',
        role: 'Marketing',
        bio: 'Builds the systems that keep the studio organized, on schedule, and thriving.',
        image: annaHeadshot,
      },
      {
        name: 'Oscar',
        role: 'Full-stack Engineer',
        bio: 'Bridges design and backend so new concepts hit production fast and polished.',
        image: oscarHeadshot,
      },
    ];

    return {
      navItems,
      heroContent,
      processGalleryContent,
      featureBlocks,
      showcaseContent,
      aiContent,
      pricingContent,
      testimonials,
      footerLinks,
      teamMembers,
    };
  }, [t]);
};
