import Contact from '@/components/Contact';
import PageHead from '@/components/PageHead';
import { makeI18nStaticProps } from '@/lib/i18n';


const ContactPage: React.FC = () => (
    <>
      <PageHead pageKey="contact" />
      <Contact />
    </>
  );

// Per-locale static generation: prerender this page for every locale with
// the right messages available during SSR.
export const getStaticProps = makeI18nStaticProps();

export default ContactPage;
