import OAuthDoc from '@/components/legal/OAuthDoc';
import { OAUTH_TERMS } from '@/content/oauthTerms';
import { makeI18nStaticProps } from '@/lib/i18n';

export const getStaticProps = makeI18nStaticProps();

/** Terms of use for the rclone OAuth client (optional field on the consent screen). */
export default function OAuthTermsPage() {
  return <OAuthDoc content={OAUTH_TERMS} canonicalPath="/termos" pageKey="oauth-terms" />;
}
