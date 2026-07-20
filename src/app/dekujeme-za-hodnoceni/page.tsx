import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ReviewThankYouBlock from '@/components/ReviewThankYouBlock'
import Universities from '@/components/Universities'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Děkujeme za hodnocení – Korektura diplomové práce',
  description:
    'Vaše hodnocení bylo odesláno. Děkujeme za zpětnou vazbu – pomáháte nám být lepšími.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReviewThankYouPage() {
  return (
    <>
      <Navbar />
      <ReviewThankYouBlock />
      <Universities />
      <Contact />
      <Footer />
    </>
  )
}
