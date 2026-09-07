import Head from 'next/head';
import { SchemaType } from '@/types/schema';
import { generateSchema } from '@/utils/buildSchema';

interface SchemaMarkupProps {
  schemas: SchemaType[];
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schemas }) => (
  <Head>
    {schemas.map((schema, index) => (
      <script
        key={`schema-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape `<` so a literal "</script>" in any schema string can never
          // break out of the JSON-LD block (defense-in-depth; content is
          // author-controlled today, but this is the generic XSS sink).
          __html: JSON.stringify(generateSchema(schema)).replace(/</g, '\\u003c'),
        }}
      />
    ))}
  </Head>
);

export default SchemaMarkup;
