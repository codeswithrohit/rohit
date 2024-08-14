import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tech Babua - Coding Education & Software Development in Bihar, Uttar Pradesh & Nearby Areas</title>
        <meta
          name="description"
          content="Tech Babua offers coding education, software development, and digital marketing services in Bihar, Uttar Pradesh, and nearby areas including Patna, Varanasi, Lucknow, Ranchi, and New Delhi. Prepare for campus placements, build custom software solutions, and enhance your online presence with our expert services."
        />
        <meta
          name="keywords"
          content="Tech Babua, coding education Patna, software development Varanasi, digital marketing Lucknow, SEO Ranchi, Google Ads New Delhi, coding institute Patna, software company Varanasi, coding training Sasaram, software development Banaras, digital marketing Ayodhya, SEO Haridwar, coding education Dehradun, software solutions Tehri Garhwal, Tech Babua Kanpur, digital marketing Allahabad, SEO Prayagraj"
        />
        <meta name="author" content="Tech Babua" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tech Babua - Coding Education & Software Development in Bihar, Uttar Pradesh & Nearby Areas" />
        <meta property="og:description" content="Top coding education, software development, and digital marketing services in Patna, Varanasi, Lucknow, Ranchi, and New Delhi by Tech Babua." />
        <meta property="og:image" content="logo.png" />
        <meta property="og:url" content="https://techbabua.com" />
        <meta name="twitter:card" content="logo.png" />
        <meta name="twitter:title" content="Tech Babua - Coding Education & Software Development in Bihar, Uttar Pradesh & Nearby Areas" />
        <meta name="twitter:description" content="Join Tech Babua for expert coding education, software development, and digital marketing services in Patna, Varanasi, Lucknow, Ranchi, and New Delhi." />
        <meta name="twitter:image" content="logo.png" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
