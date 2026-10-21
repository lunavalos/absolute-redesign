'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { 
  CheckCircle2, 
  Send, 
  Loader2, 
  AlertCircle, 
  Star, 
  Sparkles, 
  Smile, 
  Meh, 
  Frown, 
  ThumbsUp, 
  Building2, 
  User, 
  UserCheck, 
  MessageSquareHeart 
} from 'lucide-react';

export default function SatisfactionSurveyClient() {
  const t = useTranslations('SatisfactionSurvey');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Read possible rep or agent query parameter from URL (e.g. ?rep=Joanna or ?agent=Joanna)
  const queryRep = searchParams.get('rep') || searchParams.get('agent') || searchParams.get('advisor') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    assistedBy: queryRep,
    serviceSatisfaction: '',
    expectationsMet: '',
    supportQuality: '',
    futureUse: '',
    recommendation: '',
    feedback: '',
  });

  useEffect(() => {
    if (queryRep && !formData.assistedBy) {
      setFormData((prev) => ({ ...prev, assistedBy: queryRep }));
    }
  }, [queryRep]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const satisfactionOptions = [
    { value: 'Very satisfied', label: t('q1Opt1'), icon: Smile, color: 'hover:border-emerald-500 hover:text-emerald-400', active: 'border-emerald-500 bg-emerald-950/30 text-emerald-300' },
    { value: 'Satisfied', label: t('q1Opt2'), icon: ThumbsUp, color: 'hover:border-teal-500 hover:text-teal-400', active: 'border-teal-500 bg-teal-950/30 text-teal-300' },
    { value: 'Neutral', label: t('q1Opt3'), icon: Meh, color: 'hover:border-amber-500 hover:text-amber-400', active: 'border-amber-500 bg-amber-950/30 text-amber-300' },
    { value: 'Dissatisfied', label: t('q1Opt4'), icon: Frown, color: 'hover:border-rose-500 hover:text-rose-400', active: 'border-rose-500 bg-rose-950/30 text-rose-300' },
    { value: 'Very dissatisfied', label: t('q1Opt5'), icon: Frown, color: 'hover:border-red-600 hover:text-red-400', active: 'border-red-600 bg-red-950/30 text-red-300' },
  ];

  const expectationsOptions = [
    { value: 'Far exceeded', label: t('q2Opt1') },
    { value: 'Exceeded', label: t('q2Opt2') },
    { value: 'Met expectations', label: t('q2Opt3') },
    { value: 'Below expectations', label: t('q2Opt4') },
    { value: 'Far below expectations', label: t('q2Opt5') },
  ];

  const supportOptions = [
    { value: 'Yes, the support was excellent', label: t('q3Opt1') },
    { value: 'Yes, I received adequate support', label: t('q3Opt2') },
    { value: 'I received limited support', label: t('q3Opt3') },
    { value: 'No, I did not receive support', label: t('q3Opt4') },
  ];

  const futureUseOptions = [
    { value: 'Yes, definitely', label: t('q4Opt1') },
    { value: 'Maybe', label: t('q4Opt2') },
    { value: 'No', label: t('q4Opt3') },
  ];

  const recommendationOptions = [
    { value: 'Yes', label: t('q5Opt1') },
    { value: 'Maybe', label: t('q5Opt2') },
    { value: 'No', label: t('q5Opt3') },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Client validation
    if (
      !formData.fullName ||
      !formData.serviceSatisfaction ||
      !formData.expectationsMet ||
      !formData.supportQuality ||
      !formData.futureUse ||
      !formData.recommendation
    ) {
      setErrorMessage(
        locale === 'es'
          ? 'Por favor responde a todas las preguntas con asterisco (*).'
          : 'Please complete all required questions marked with (*).'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      let recaptchaToken = '';
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha('satisfaction_survey_submit');
        } catch (rErr) {
          console.warn('ReCAPTCHA warning:', rErr);
        }
      }

      const res = await fetch('/api/satisfaction-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (locale === 'es' ? 'Error al enviar la encuesta.' : 'Failed to submit survey.'));
      }

      setSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: any) {
      console.error('[Survey Client Error]:', err);
      setErrorMessage(err.message || (locale === 'es' ? 'Ocurrió un error. Intenta nuevamente.' : 'An error occurred. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      company: '',
      assistedBy: '',
      serviceSatisfaction: '',
      expectationsMet: '',
      supportQuality: '',
      futureUse: '',
      recommendation: '',
      feedback: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-[#0D1A33] border border-[#1C2C4A] rounded-[28px] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden my-8">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(30,64,175,0.15) 0%, transparent 70%)' }} 
        />
        
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
          {t('successTitle')}
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
          {t('successMessage')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 bg-[#21356F] border border-[#30478D] hover:bg-[#2B4286] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            {t('sendAnother')}
          </button>
          <a
            href={`/${locale}`}
            className="w-full sm:w-auto px-6 py-3 bg-[#142647] border border-[#1E3A6E] hover:bg-[#1A335D] text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            {locale === 'es' ? 'Volver al Inicio' : 'Return to Home'}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#0D1A33] border border-[#1C2C4A] rounded-[28px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Soft Background Glow */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(14,65,148,0.15) 0%, transparent 60%)' }} 
        />

        {/* Survey Introduction Banner */}
        <div className="border-b border-[#1C2C4A] pb-6 mb-8 relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#142647] border border-[#1E3A6E] text-blue-400 flex items-center justify-center shrink-0">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-[0.2em] block mb-1">
              Absolute Group Quality & Experience
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

          {/* SECTION 1: Customer & Agent Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              {locale === 'es' ? '1. Datos de Contacto' : '1. Contact Details'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                  {t('fullName')} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t('fullNamePlaceholder')}
                    className="w-full px-4 py-3 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">
                  {t('company')} <span className="text-slate-500 font-normal">({t('optional')})</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('companyPlaceholder')}
                    className="w-full px-4 py-3 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                  />
                </div>
              </div>

            </div>

            {/* Assisted By / Advisor */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300 flex items-center justify-between">
                <span>{t('assistedBy')}</span>
                <span className="text-slate-500 font-normal text-[10px]">({t('optional')})</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.assistedBy}
                  onChange={(e) => setFormData({ ...formData, assistedBy: e.target.value })}
                  placeholder={t('assistedByPlaceholder')}
                  className="w-full px-4 py-3 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all shadow-inner"
                />
              </div>
            </div>

          </div>

          <hr className="border-[#1C2C4A]" />

          {/* SECTION 2: Questions */}
          <div className="space-y-7">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {locale === 'es' ? '2. Evaluación de Servicio' : '2. Service Evaluation'}
            </h3>

            {/* Question 1: Overall Satisfaction */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-white block leading-snug">
                {t('q1Title')} <span className="text-blue-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {satisfactionOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = formData.serviceSatisfaction === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, serviceSatisfaction: opt.value })}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? opt.active
                          : 'border-[#1C2C4A] bg-[#050D1C] text-slate-300 ' + opt.color
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'scale-110' : ''} transition-transform`} />
                      <span className="text-[11px] font-bold leading-tight">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Expectations */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-white block leading-snug">
                {t('q2Title')} <span className="text-blue-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {expectationsOptions.map((opt) => {
                  const isSelected = formData.expectationsMet === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, expectationsMet: opt.value })}
                      className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/40 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                          : 'border-[#1C2C4A] bg-[#050D1C] text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: Support */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-white block leading-snug">
                {t('q3Title')} <span className="text-blue-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {supportOptions.map((opt) => {
                  const isSelected = formData.supportQuality === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, supportQuality: opt.value })}
                      className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-950/40 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                          : 'border-[#1C2C4A] bg-[#050D1C] text-slate-300 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 4: Future Use & Question 5: Recommend (Side by side on tablets/desktops) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Question 4 */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white block leading-snug">
                  {t('q4Title')} <span className="text-blue-400">*</span>
                </label>
                <div className="flex gap-2">
                  {futureUseOptions.map((opt) => {
                    const isSelected = formData.futureUse === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, futureUse: opt.value })}
                        className={`flex-1 py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/50 text-blue-200 shadow-sm'
                            : 'border-[#1C2C4A] bg-[#050D1C] text-slate-300 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 5 */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white block leading-snug">
                  {t('q5Title')} <span className="text-blue-400">*</span>
                </label>
                <div className="flex gap-2">
                  {recommendationOptions.map((opt) => {
                    const isSelected = formData.recommendation === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, recommendation: opt.value })}
                        className={`flex-1 py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/50 text-blue-200 shadow-sm'
                            : 'border-[#1C2C4A] bg-[#050D1C] text-slate-300 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Question 6: Freeform Suggestions */}
            <div className="space-y-2.5 pt-2">
              <label className="text-sm font-bold text-white block leading-snug">
                {t('feedbackTitle')} <span className="text-slate-500 font-normal text-xs">({t('optional')})</span>
              </label>
              <textarea
                rows={4}
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                placeholder={t('feedbackPlaceholder')}
                className="w-full px-4 py-3 bg-[#050D1C] border border-[#1C2C4A] rounded-xl text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-[#3A5095] focus:ring-1 focus:ring-[#3A5095] transition-all resize-none shadow-inner"
              />
            </div>

          </div>

          {/* Submit Action */}
          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#21356F] border border-[#30478D] hover:bg-[#2B4286] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl shadow-[0_0_20px_rgba(33,53,111,0.6)] hover:shadow-[0_0_30px_rgba(43,66,134,0.8)] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                <>
                  {t('submitBtn')}
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              {locale === 'es' ? (
                <>
                  Absolute Group Inc. agradece tu tiempo y retroalimentación para seguir brindando la máxima excelencia en transporte de carga transfronterizo.
                </>
              ) : (
                <>
                  Absolute Group Inc. values your feedback to maintain excellence in cross-border freight transportation.
                </>
              )}
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
