import Head from 'next/head';

function Header({
  title,
  description,
}) {
  return (
    <Head>
      <title>
        {title}
      </title>

      <link rel="icon" href="/favicon.ico" />

      {/* META SEO */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* META OG */}
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
    </Head>
  );
}

export default Header;