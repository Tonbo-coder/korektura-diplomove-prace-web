import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Pricing from '@/components/Pricing'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Team from '@/components/Team'
import Faq from '@/components/Faq'
import OrderForm from '@/components/OrderForm'
import Universities from '@/components/Universities'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <Pricing />
      <Services />
      <Process />
      <Testimonials />
      <Gallery />
      <Team />
      <OrderForm />
      <Faq />
      <Universities />
      <Contact />
      <Footer />
    </>
  )
}
