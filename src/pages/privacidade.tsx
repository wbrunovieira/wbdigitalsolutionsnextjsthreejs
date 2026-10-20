import OAuthDoc from '@/components/legal/OAuthDoc';
import { OAUTH_PRIVACY } from '@/content/oauthPrivacy';
import { makeI18nStaticProps } from '@/lib/i18n';

export const getStaticProps = makeI18nStaticProps();

/**
 * Privacy policy for the rclone OAuth client, on the same domain as the
 * homepage because Google's consent-screen review requires it there.
 */
export default function OAuthPrivacyPage() {
  return <OAuthDoc content={OAUTH_PRIVACY} canonicalPath="/privacidade" pageKey="oauth-privacy" />;
}
