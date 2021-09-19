import Head from 'next/head';
import Link from 'next/link';

// children is all unique markup
// home is a boolean that tells us whether we're on the home page
export default function Layout( {children, home} ){
  return(
    <div>
      <Head>
        <title>Martin&apos;s 4-4 Server Party Goes Full-Stack</title>
      </Head>
      <main>{children}</main>
      {!home && (
        <Link href="/">
          <a className="btn btn-primary mt-3">Home</a>
        </Link>
        )
      }
    </div>
  );
}