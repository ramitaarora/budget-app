import '../styles/globals.css';
import { Raleway } from 'next/font/google'
const raleway = Raleway({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${raleway.style.fontFamily}, 'sans-serif';
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;