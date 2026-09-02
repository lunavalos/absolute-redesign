import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { getTeamMembers, getMediaUrl } from '../../../data/api';
import { Mail, Linkedin, ArrowRight, Users } from 'lucide-react';
import ShapeGrid from '../../../components/ShapeGrid';
import BorderBeamButton from '../../../components/BorderBeamButton';

import PageHeader from '../../../components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const t = await getTranslations('Team');
  const locale = await getLocale();

  const data = await getTeamMembers(locale);
  const team = data.docs;

  return (
    <div className="space-y-16 pb-24">
      
      {/* Hero Banner with Background Video */}
      <PageHeader
        badge="LEADERSHIP & OPERATIONS"
        badgeIcon={<Users className="w-4 h-4" />}
        title={t('title')}
      />

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:bg-white hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-5 bg-slate-100">
                {member.photo && (
                  <Image
                    src={getMediaUrl(member.photo.url)}
                    alt={member.photo.alt || member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#0E4194] mb-2">
                  {typeof member.position === 'string' && member.position
                    ? member.position 
                    : (member.position as any)?.[locale] || (member.position as any)?.[locale === 'es' ? 'en' : 'es'] || (typeof member.position === 'string' ? member.position : '')}
                </p>
              </div>

              {/* Socials (Push to bottom if height varies) */}
              <div className="mt-auto flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0E4194] text-white hover:bg-[#1453B9] transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0E4194] text-white hover:bg-[#1453B9] transition-colors"
                    title={member.email}
                  >
                    <Mail className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Join the Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-[#091C3D] rounded-3xl p-10 sm:p-16 text-center text-white flex flex-col items-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {locale === 'es' ? '¿Quieres formar parte de nuestro equipo?' : 'Want to join the team?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">
            {locale === 'es' 
              ? 'Estamos siempre en busca de talento excepcional para llevar nuestras operaciones al siguiente nivel. Aplica a nuestras vacantes abiertas y sé parte de la familia de Absolute Group.'
              : 'We are always looking for exceptional talent to take our operations to the next level. Apply to our open positions and become part of the Absolute Group family.'}
          </p>
          <BorderBeamButton href="/apply">
            {locale === 'es' ? 'Aplicar Ahora' : 'Apply Now'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </BorderBeamButton>
        </div>
      </section>

    </div>
  );
}
