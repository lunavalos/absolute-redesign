import Image from 'next/image';
import { generatePageMetadata } from '../../../lib/seo';
import ShapeGrid from '../../../components/ShapeGrid';
import ClientsCarousel from '../../../components/ClientsCarousel';
import Certifications from '../../../components/Certifications';
import { Target, Eye, ShieldCheck, Building2 } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'About Us | Premier Cross-Border Logistics Specialist',
    description:
      'Learn how Absolute Group grew from a single truck in 2011 to a 200+ power unit fleet providing secure door-to-door freight between Mexico and the United States.',
    locale,
    path: '/about-us'
  });
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Banner */}
      <section className="relative bg-[#091C3D] text-white pt-32 pb-16 min-h-[35vh] flex flex-col justify-center overflow-hidden">
        
        {/* ShapeGrid Background */}
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.25} 
            squareSize={56}
            direction='diagonal'
            borderColor='rgba(255,255,255,0.04)'
            hoverFillColor='rgba(255,255,255,0.08)'
            shape='square'
            hoverTrailAmount={8}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 pt-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Building2 className="w-4 h-4" />
            {isEs ? 'Nuestra Historia y Trayectoria' : 'Our Story & Legacy'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-balance text-left leading-tight">
            {isEs
              ? 'Líderes en Logística Transfronteriza'
              : 'Pioneering Cross-Border Logistics'}
          </h1>
        </div>
      </section>

      {/* History & Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-widest text-[#0E4194]">
                {isEs ? 'Nuestra Historia' : 'Our Story'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091C3D] leading-tight">
                {isEs ? 'Especialistas en Logística Transfronteriza' : 'Cross Border Logistics Specialists'}
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                {isEs
                  ? 'A lo largo de los años, Absolute Group ha crecido manteniéndose alineado con un principio fundamental: ofrecer soluciones logísticas seguras, confiables y transparentes para cada cliente. Nuestro éxito se basa en el desarrollo de un sólido equipo operativo, sistemas avanzados y una experiencia que nos permite navegar por los desafíos únicos del corredor México-Estados Unidos.'
                  : 'Over the years, Absolute Group has grown by staying aligned with one core principle: delivering safe, reliable, and transparent logistics solutions for every customer. Our success is rooted in the development of a strong operational team, advanced systems, and a cross-border expertise that allows us to navigate the unique challenges of the U.S.–Mexico corridor.'}
              </p>
              <p>
                {isEs 
                  ? 'Como especialistas, brindamos servicios puerta a puerta que integran transporte, coordinación aduanal, rastreo en tiempo real y resolución proactiva. Nuestro equipo en Laredo, TX asegura que cada envío cruce la frontera cumpliendo todos los requisitos regulatorios.'
                  : 'As specialists, we provide door-to-door services that integrate transportation, customs coordination, real-time tracking, and proactive resolution. Our team in Laredo, TX ensures every shipment crosses the border meeting all regulatory requirements.'}
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="/images/new-truck-01.jpg"
              alt="Absolute Fleet Truck"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Clients Carousel Section */}
      <section>
        <div className="text-center pt-16">
          <h2 className="text-3xl font-extrabold text-[#091C3D]">
            {isEs ? 'Nuestros Clientes y Socios' : 'Our Clients & Partners'}
          </h2>
        </div>
        <ClientsCarousel />
      </section>

      {/* Mission, Vision & Values */}
      <section className="bg-slate-50 py-24 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              {isEs ? 'Misión, Visión y Valores' : 'Our Mission, Vision & Values'}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {isEs 
                ? 'Los principios fundamentales que impulsan a nuestra empresa.'
                : 'The fundamental principles that drive our company forward.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{isEs ? 'Nuestra Misión' : 'Our Mission'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isEs 
                  ? 'Proveer a nuestros clientes una excelente experiencia de servicio, cumpliendo con los estándares nacionales de seguridad para la carga de nuestros clientes y siendo efectivos en nuestros servicios de transporte.'
                  : 'Provide our customers an outstanding customer service experience, achieving safety nationwide standards for our clients cargo, being effective in our transportation services.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{isEs ? 'Nuestra Visión' : 'Our Vision'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isEs 
                  ? 'Nos esforzamos por ser reconocidos como el estandarte de seguridad y calidad por nuestros clientes y competidores. Todos los servicios que brindamos están diseñados para cumplir o superar las expectativas de nuestros clientes.'
                  : 'We strive to be recognized as the standard bearer of safety and quality by our customers and competitors. All services we provide are designed to meet or exceed our customer’s needs and expectations.'}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{isEs ? 'Nuestros Valores' : 'Our Values'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isEs 
                  ? 'Priorizamos la seguridad, la integridad y el compromiso en todo lo que hacemos. Entregamos servicios de la más alta calidad y construimos relaciones basadas en la honestidad y la accesibilidad con cada cliente.'
                  : 'We prioritize safety, integrity, and commitment in everything we do. We deliver services of the highest quality and build relationships based on honesty and accessibility with every client.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Component */}
      <Certifications />

    </div>
  );
}
