import {About} from '@/components/blocks/About';
import {CaseStudies} from '@/components/blocks/CaseStudies';
import {ContactCTA} from '@/components/blocks/ContactCTA';
import {Hero} from '@/components/blocks/Hero';
import {HowWeWork} from '@/components/blocks/HowWeWork';
import {PricingPhilosophy} from '@/components/blocks/PricingPhilosophy';
import {Problem} from '@/components/blocks/Problem';
import {Services} from '@/components/blocks/Services';
import {Technology} from '@/components/blocks/Technology';

export default async function MarketingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <>
      <Hero locale={locale} />
      <Problem locale={locale} />
      <Services locale={locale} />
      <HowWeWork locale={locale} />
      <Technology locale={locale} />
      <CaseStudies locale={locale} />
      <PricingPhilosophy locale={locale} />
      <About locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
