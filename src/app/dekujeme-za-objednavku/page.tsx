import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ThankYouHero from '@/components/ThankYouHero'
import ReviewForm from '@/components/ReviewForm'
import Universities from '@/components/Universities'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Děkujeme za objednávku – Korektura diplomové práce',
  description:
    'Vaše objednávka korektury diplomové práce byla přijata. Ohodnoťte naše služby a sdílejte svoji zkušenost.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <ThankYouHero />
      <ReviewForm />
      <Universities />
      <Contact />
      <Footer />
    </>
  )
}
