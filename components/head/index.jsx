import Head from "next/head";

const MyHead = ({ title, description, image }) => {
    const keywords = [replaceSpecialsChars(title), replaceSpecialsChars(description)].join(', ');
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image ?? "/images/logo.png"} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:type" content="website" />
            <link rel="canonical" href="https://abc-elearning.org" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/images/logo.png" />
            <meta charSet="UTF-8" />
            <meta name='robots' content='noindex,follow' />
        </Head>
    );
}

const replaceSpecialsChars = (text) => {
    return text.replace(/[^\w\s]/gi, '');
}

export default MyHead;