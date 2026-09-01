'use client';

import Image from 'next/image';
import { Target, Eye, ShieldCheck, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ShapeGrid from '../../../components/ShapeGrid';
import CursorGrid from '../../../components/CursorGrid';
import ClientsCarousel from '../../../components/ClientsCarousel';
import Certifications from '../../../components/Certifications';

import PageHeader from '../../../components/PageHeader';

interface AboutUsClientProps {
  isEs: boolean;
}

export default function AboutUsClient({ isEs }: AboutUsClientProps) {
  return (
    <div className="bg-[#030b14] min-h-screen">
      
      {/* 1. Hero Banner with Background Video + Animated Grid */}
      <PageHeader
        badge={isEs ? 'Nuestra Historia y Trayectoria' : 'Our Story & Legacy'}
        badgeIcon={<Building2 className="w-4 h-4" />}
        title={isEs ? 'Líderes en Logística Transfronteriza' : 'Pioneering Cross-Border Logistics'}
      />

      {/* 2. History & Expertise (Solid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#030b14]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                {isEs ? 'Nuestra Historia' : 'Our Story'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {isEs ? 'Especialistas en Logística Transfronteriza' : 'Cross Border Logistics Specialists'}
              </h2>
            </div>
            
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
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
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <Image
              src="/images/new-truck-01.jpg"
              alt="Absolute Fleet Truck"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Mission, Vision & Values (Grid) */}
      <section className="py-24 text-white relative overflow-hidden bg-[#071525]">
        <CursorGrid
          cellSize={56}
          color="#ffffff"
          radius={200}
          maxOpacity={0.15}
          gridOpacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {isEs ? 'Nuestra Filosofía' : 'Our Philosophy'}
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">
              {isEs ? 'Misión, Visión y Valores' : 'Our Mission, Vision & Values'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              {isEs 
                ? 'Los principios fundamentales que impulsan a nuestra empresa.'
                : 'The fundamental principles that drive our company forward.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white/[0.02] border border-white/[0.07] p-8 rounded-3xl shadow-sm hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{isEs ? 'Nuestra Misión' : 'Our Mission'}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {isEs 
                  ? 'Proveer a nuestros clientes una excelente experiencia de servicio, cumpliendo con los estándares nacionales de seguridad para la carga de nuestros clientes y siendo efectivos en nuestros servicios de transporte.'
                  : 'Provide our customers an outstanding customer service experience, achieving safety nationwide standards for our clients cargo, being effective in our transportation services.'}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-white/[0.02] border border-white/[0.07] p-8 rounded-3xl shadow-sm hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{isEs ? 'Nuestra Visión' : 'Our Vision'}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {isEs 
                  ? 'Nos esforzamos por ser reconocidos como el estandarte de seguridad y calidad por nuestros clientes y competidores. Todos los servicios que brindamos están diseñados para cumplir o superar las expectativas de nuestros clientes.'
                  : 'We strive to be recognized as the standard bearer of safety and quality by our customers and competitors. All services we provide are designed to meet or exceed our customer’s needs and expectations.'}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-white/[0.02] border border-white/[0.07] p-8 rounded-3xl shadow-sm hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{isEs ? 'Nuestros Valores' : 'Our Values'}</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {isEs 
                  ? 'Priorizamos la seguridad, la integridad y el compromiso en todo lo que hacemos. Entregamos servicios de la más alta calidad y construimos relaciones basadas en la honestidad y la accesibilidad con cada cliente.'
                  : 'We prioritize safety, integrity, and commitment in everything we do. We deliver services of the highest quality and build relationships based on honesty and accessibility with every client.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Clients Carousel Section (Solid) */}
      <section className="bg-[#030b14]">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-24"
        >
          <h2 className="text-3xl font-extrabold text-white">
            {isEs ? 'Nuestros Clientes y Socios' : 'Our Clients & Partners'}
          </h2>
        </motion.div>
        <div className="pb-12">
          <ClientsCarousel />
        </div>
      </section>

      {/* 5. Certifications Component (Grid inside component, see Certifications.tsx update) */}
      <Certifications />

    </div>
  );
}
