import {About} from '@/components/blocks/About';
import {CaseStudies} from '@/components/blocks/CaseStudies';
import {ContactCTA} from '@/components/blocks/ContactCTA';
import {Hero} from '@/components/blocks/Hero';
import {Problem} from '@/components/blocks/Problem';
import {Services} from '@/components/blocks/Services';

export default async function MarketingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <>
      <Hero locale={locale} />
      <Problem locale={locale} />
      <Services locale={locale} />
      <CaseStudies locale={locale} />
      <About locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
