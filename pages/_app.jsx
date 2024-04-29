import '../styles/globals.css';

export default function MyApp({ ActivePage, pageProps }) {
  
  return <ActivePage {...pageProps} />;
}