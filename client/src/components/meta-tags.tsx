import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
}

export default function MetaTags({ title, description }: MetaTagsProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>" />
    </Helmet>
  );
}
