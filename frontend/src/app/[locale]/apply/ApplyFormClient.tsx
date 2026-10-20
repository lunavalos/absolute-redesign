'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { uploadMedia, submitJobApplication } from '../../../data/api';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  RotateCcw,
  Home,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Clock
} from 'lucide-react';

const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
  'Otro / Fuera de México'
];

const getLocalized = (field: any, currentLocale: string): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[currentLocale] || field.es || field.en || Object.values(field)[0] || '';
  }
  return String(field);
};

interface StepData {
  id: string;
  isCandidateInfo: boolean;
  title: string;
  description?: string;
  questions?: any[];
}

export default function ApplyFormClient({ form, locale }: { form: any, locale: string }) {
  const formTopRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    positionApplied: '',
    availability: '',
  });

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState('');
  const [success, setSuccess] = useState(false);

  // Construir la lista de pasos dinámicamente
  const steps: StepData[] = useMemo(() => {
    const list: StepData[] = [
      {
        id: 'candidate-info',
        isCandidateInfo: true,
        title: locale === 'es' ? 'Datos del Candidato' : 'Candidate Details',
        description: locale === 'es' 
          ? 'Por favor proporciona tus datos de contacto básicos antes de continuar.' 
          : 'Please provide your basic contact details before continuing.',
      },
    ];

    if (form?.sections && Array.isArray(form.sections) && form.sections.length > 0) {
      form.sections.forEach((sec: any, idx: number) => {
        list.push({
          id: sec.id || `section_${idx}`,
          isCandidateInfo: false,
          title: getLocalized(sec.title, locale) || (locale === 'es' ? `Sección ${idx + 1}` : `Section ${idx + 1}`),
          description: getLocalized(sec.description, locale),
          questions: sec.questions || [],
        });
      });
    } else if (form?.questions && Array.isArray(form.questions) && form.questions.length > 0) {
      list.push({
        id: 'general-questions',
        isCandidateInfo: false,
        title: locale === 'es' ? 'Cuestionario' : 'Questionnaire',
        description: locale === 'es'
          ? 'Por favor responde las siguientes preguntas con honestidad.'
          : 'Please answer the following questions truthfully.',
        questions: form.questions,
      });
    }

    return list;
  }, [form, locale]);

  const totalSteps = steps.length;
  const currentStepData = steps[currentStep] || steps[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (stepError) setStepError('');
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (stepError) setStepError('');
  };

  const handleExplanationChange = (key: string, value: string) => {
    setExplanations(prev => ({ ...prev, [key]: value }));
    if (stepError) setStepError('');
  };

  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    const currentValues = answers[questionId] || [];
    if (checked) {
      setAnswers(prev => ({ ...prev, [questionId]: [...currentValues, value] }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: currentValues.filter((v: string) => v !== value) }));
    }
    if (stepError) setStepError('');
  };

  const handleFileChange = (questionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [questionId]: e.target.files![0] }));
      if (stepError) setStepError('');
    }
  };

  // Validar el paso actual antes de avanzar
  const validateCurrentStep = (): boolean => {
    setStepError('');

    // Paso 0: Datos del Candidato
    if (currentStepData.isCandidateInfo) {
      if (!formData.applicantName.trim()) {
        setStepError(locale === 'es' ? 'El nombre completo es obligatorio.' : 'Full name is required.');
        return false;
      }
      if (!formData.phone.trim()) {
        setStepError(locale === 'es' ? 'El teléfono / WhatsApp es obligatorio.' : 'Phone / WhatsApp is required.');
        return false;
      }
      if (!formData.email.trim()) {
        setStepError(locale === 'es' ? 'El correo electrónico es obligatorio.' : 'Email address is required.');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setStepError(locale === 'es' ? 'Ingresa un correo electrónico válido.' : 'Please enter a valid email address.');
        return false;
      }
      if (!formData.state) {
        setStepError(locale === 'es' ? 'Por favor selecciona tu Estado.' : 'Please select your State.');
        return false;
      }
      if (!formData.city.trim()) {
        setStepError(locale === 'es' ? 'La ciudad es obligatoria.' : 'City is required.');
        return false;
      }
      if (!formData.positionApplied) {
        setStepError(locale === 'es' ? 'Por favor selecciona el puesto al que aplicas.' : 'Please select the position you are applying for.');
        return false;
      }
      if (!formData.availability) {
        setStepError(locale === 'es' ? 'Por favor selecciona tu disponibilidad para iniciar.' : 'Please select your availability to start.');
        return false;
      }
      return true;
    }

    // Pasos de Preguntas
    const questions = currentStepData.questions || [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qText = getLocalized(q.questionLabel, locale) || (locale === 'es' ? `Pregunta ${i + 1}` : `Question ${i + 1}`);
      const val = answers[q.id];
      const fileVal = files[q.id];

      const hasAnswer = Array.isArray(val) ? val.length > 0 : (val !== undefined && val !== null && String(val).trim() !== '');

      if (q.required && !hasAnswer && !fileVal) {
        setStepError(
          locale === 'es' 
            ? `Por favor responde la pregunta obligatoria: "${qText}".` 
            : `Please answer the required question: "${qText}".`
        );
        return false;
      }

      // Validar explicaciones requeridas para selecciones
      if (['radio', 'select'].includes(q.type) && val) {
        const selectedOpt = (q.options || []).find((opt: any) => opt.id === val);
        if (selectedOpt && selectedOpt.requiresExplanation) {
          const expKey = `${q.id}_${selectedOpt.id}`;
          const expVal = (explanations[expKey] || '').trim();
          if (!expVal) {
            const optLabel = getLocalized(selectedOpt.label, locale);
            setStepError(
              locale === 'es'
                ? `Por favor escribe el detalle requerido para la opción "${optLabel}".`
                : `Please provide the required explanation for "${optLabel}".`
            );
            return false;
          }
        }
      } else if (q.type === 'checkbox' && Array.isArray(val)) {
        for (const optId of val) {
          const opt = (q.options || []).find((o: any) => o.id === optId);
          if (opt && opt.requiresExplanation) {
            const expKey = `${q.id}_${opt.id}`;
            const expVal = (explanations[expKey] || '').trim();
            if (!expVal) {
              const optLabel = getLocalized(opt.label, locale);
              setStepError(
                locale === 'es'
                  ? `Por favor escribe el detalle requerido para la opción "${optLabel}".`
                  : `Please provide the required explanation for "${optLabel}".`
              );
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  const scrollToTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      scrollToTop();
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    setCurrentStep(prev => Math.max(prev - 1, 0));
    scrollToTop();
  };

  // Envío final del formulario completo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setStepError('');

    try {
      let totalEarnedScore = 0;
      let totalMaxScore = 0;
      const formattedAnswers: any[] = [];

      // Recopilar preguntas de todos los pasos/secciones
      for (const step of steps) {
        if (step.isCandidateInfo || !step.questions) continue;
        const sectionTitle = step.title;

        for (const question of step.questions) {
          const questionText = getLocalized(question.questionLabel, locale);
          const answerVal = answers[question.id];
          const fileVal = files[question.id];

          let uploadedMediaId = undefined;

          // Si es archivo y se adjuntó uno, subirlo primero
          if (question.type === 'file' && fileVal) {
            try {
              const mediaDoc = await uploadMedia(fileVal);
              uploadedMediaId = mediaDoc.doc?.id || mediaDoc.id;
            } catch (err: any) {
              throw new Error(
                locale === 'es' 
                  ? `Error al subir el archivo para "${questionText}": ${err.message}` 
                  : `Failed to upload file for "${questionText}": ${err.message}`
              );
            }
          }

          if (question.type === 'text') {
            formattedAnswers.push({
              section: sectionTitle,
              question: questionText,
              answerText: answerVal || '',
            });
          } else if (question.type === 'number') {
            formattedAnswers.push({
              section: sectionTitle,
              question: questionText,
              answerText: answerVal !== undefined && answerVal !== null ? String(answerVal) : '',
            });
          } else if (['radio', 'checkbox', 'select'].includes(question.type)) {
            totalMaxScore += 100;
            let score = 0;
            let answerText = '';
            const collectedExplanations: string[] = [];

            if (Array.isArray(answerVal)) {
              // Múltiples opciones seleccionadas (Checkbox)
              const selectedOptions = (question.options || []).filter((opt: any) => answerVal.includes(opt.id));
              score = selectedOptions.reduce((acc: number, opt: any) => acc + (opt.score || 0), 0);

              const displayParts: string[] = [];
              for (const opt of selectedOptions) {
                const optLabel = getLocalized(opt.label, locale);
                if (opt.requiresExplanation) {
                  const expKey = `${question.id}_${opt.id}`;
                  const expText = (explanations[expKey] || '').trim();
                  displayParts.push(`${optLabel} (Detalle: ${expText})`);
                  collectedExplanations.push(`[${optLabel}]: ${expText}`);
                } else {
                  displayParts.push(optLabel);
                }
              }
              answerText = displayParts.join(', ');
            } else {
              // Una sola opción (Radio o Select)
              const selectedOption = (question.options || []).find((opt: any) => opt.id === answerVal);
              score = selectedOption ? (selectedOption.score || 0) : 0;
              const optLabel = selectedOption ? getLocalized(selectedOption.label, locale) : '';

              if (selectedOption?.requiresExplanation) {
                const expKey = `${question.id}_${selectedOption.id}`;
                const expText = (explanations[expKey] || '').trim();
                answerText = `${optLabel} (Detalle: ${expText})`;
                collectedExplanations.push(expText);
              } else {
                answerText = optLabel;
              }
            }

            totalEarnedScore += score;

            formattedAnswers.push({
              section: sectionTitle,
              question: questionText,
              answerText,
              explanation: collectedExplanations.length > 0 ? collectedExplanations.join('\n\n') : undefined,
              score,
            });
          } else if (question.type === 'file') {
            formattedAnswers.push({
              section: sectionTitle,
              question: questionText,
              answerText: fileVal ? fileVal.name : '',
              attachment: uploadedMediaId,
            });
          }
        }
      }

      // Cálculo de porcentaje final
      const finalScorePercentage = totalMaxScore > 0 ? Math.round((totalEarnedScore / totalMaxScore) * 100) : 0;

      await submitJobApplication({
        form: form.id,
        applicantName: formData.applicantName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        state: formData.state,
        city: formData.city.trim(),
        positionApplied: formData.positionApplied,
        availability: formData.availability,
        totalScore: finalScorePercentage,
        answers: formattedAnswers,
      });

      setSuccess(true);
      scrollToTop();
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setStepError(err.message || (locale === 'es' ? 'Hubo un error al enviar tu solicitud. Intenta de nuevo.' : 'An error occurred while submitting your application.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      applicantName: '',
      phone: '',
      email: '',
      state: '',
      city: '',
      positionApplied: '',
      availability: '',
    });
    setAnswers({});
    setExplanations({});
    setFiles({});
    setCurrentStep(0);
    setStepError('');
    setSuccess(false);
    scrollToTop();
  };

  // --- VISTA DE ÉXITO (COMPLETION SCREEN) ---
  if (success) {
    return (
      <div ref={formTopRef} className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-14 text-center shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Fondo sutil con resplandor */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icono de Check estilo referencia */}
          <div className="relative mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-tr from-[#0E4194] to-[#2563EB] flex items-center justify-center shadow-xl shadow-blue-500/25 ring-8 ring-blue-500/10 animate-bounce-short">
            <Check className="w-12 h-12 text-white stroke-[3]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            {locale === 'es' ? '¡Has completado el proceso con éxito!' : 'You have successfully completed the process.'}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            {locale === 'es'
              ? 'Hemos recibido tus respuestas y datos de contacto. Nuestro equipo de Recursos Humanos revisará tu postulación y se pondrá en contacto contigo pronto.'
              : 'We have received your responses and contact information. Our team will review your application and get in touch with you shortly.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0E4194] hover:bg-[#1453B9] text-white font-bold transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <Home className="w-4 h-4" />
              {locale === 'es' ? 'Volver al Inicio' : 'Back to Home'}
            </Link>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {locale === 'es' ? 'Enviar otra postulación' : 'Submit another response'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL: FORMULARIO MULTI-PASO ---
  return (
    <form ref={formTopRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* ===== STEPPER BAR (INDICADOR DE PROGRESO DE PASOS) ===== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        
        {/* Línea horizontal de círculos (Pasos) */}
        <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
          {/* Línea conectora base */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-800 -z-0" />
          
          {/* Línea conectora activa (progreso) */}
          <div 
            className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-[#0E4194] to-blue-500 transition-all duration-500 -z-0"
            style={{ 
              width: totalSteps > 1 ? `${(currentStep / (totalSteps - 1)) * 100}%` : '100%',
              maxWidth: 'calc(100% - 4rem)'
            }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={idx > currentStep}
                  onClick={() => {
                    if (idx < currentStep) {
                      setCurrentStep(idx);
                      scrollToTop();
                    }
                  }}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#0E4194] text-white shadow-md shadow-blue-500/20 cursor-pointer hover:scale-105'
                      : isActive
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40 ring-4 ring-blue-500/20 scale-110'
                      : 'bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                  aria-label={`Paso ${idx + 1}: ${step.title}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Encabezado del Paso Actual (Estilo Imagen Referencia) */}
        <div className="mt-8 text-center space-y-1 border-t border-slate-800/80 pt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            {locale === 'es' ? `Paso ${currentStep + 1} de ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            {currentStepData.title}
          </h2>
          {currentStepData.description && (
            <p className="text-sm text-slate-400 max-w-xl mx-auto pt-1">
              {currentStepData.description}
            </p>
          )}
        </div>
      </div>

      {/* ===== CONTENIDO DEL PASO ACTIVO ===== */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* Mensaje de Error si falta algún campo */}
        {stepError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-sm flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{stepError}</span>
          </div>
        )}

        {/* PASO 0: DATOS DE CONTACTO (SIGNUP INFO) */}
        {currentStepData.isCandidateInfo && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Nombre Completo */}
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? 'Nombre Completo' : 'Full Name'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="applicantName"
                  required 
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder={locale === 'es' ? 'Ej. Juan Pérez García' : 'e.g. John Doe'}
                />
              </div>

              {/* 2. Teléfono / WhatsApp */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="+52 867 123 4567"
                />
              </div>

              {/* 3. Correo Electrónico */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? 'Correo Electrónico' : 'Email Address'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              {/* 4. Estado (Selector 32 estados) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? 'Estado' : 'State'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    {locale === 'es' ? 'Selecciona tu Estado' : 'Select your State'}
                  </option>
                  {MEXICAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-slate-900 text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Ciudad (Input de texto) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? 'Ciudad' : 'City'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="city"
                  required 
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder={locale === 'es' ? 'Ej. Nuevo Laredo, Monterrey, etc.' : 'e.g. Laredo, Dallas, etc.'}
                />
              </div>

              {/* 6. ¿Puesto al que aplicas? (Selector) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? '¿Puesto al que aplicas?' : 'Position applying for?'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <select
                  name="positionApplied"
                  required
                  value={formData.positionApplied}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    {locale === 'es' ? 'Selecciona el puesto' : 'Select position'}
                  </option>
                  <option value="Operador Sencillo (B1)" className="bg-slate-900 text-white">
                    Operador Sencillo (B1)
                  </option>
                  <option value="Operador Doble (B1)" className="bg-slate-900 text-white">
                    Operador Doble (B1)
                  </option>
                </select>
              </div>

              {/* 7. ¿Disponibilidad para iniciar? (Selector) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{locale === 'es' ? '¿Disponibilidad para iniciar?' : 'Availability to start?'}</span>
                  <span className="text-blue-400">*</span>
                </label>
                <select
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    {locale === 'es' ? 'Selecciona disponibilidad' : 'Select availability'}
                  </option>
                  <option value="Inmediato" className="bg-slate-900 text-white">
                    {locale === 'es' ? 'Inmediato' : 'Immediate'}
                  </option>
                  <option value="1 semana" className="bg-slate-900 text-white">
                    {locale === 'es' ? '1 semana' : '1 week'}
                  </option>
                  <option value="2 semanas" className="bg-slate-900 text-white">
                    {locale === 'es' ? '2 semanas' : '2 weeks'}
                  </option>
                  <option value="1 mes" className="bg-slate-900 text-white">
                    {locale === 'es' ? '1 mes' : '1 month'}
                  </option>
                </select>
              </div>

            </div>
          </div>
        )}

        {/* PASOS DE PREGUNTAS (SECCIÓN DEL CUESTIONARIO) */}
        {!currentStepData.isCandidateInfo && (
          <div className="space-y-8">
            {(!currentStepData.questions || currentStepData.questions.length === 0) ? (
              <p className="text-slate-400 text-center py-8">
                {locale === 'es' ? 'No hay preguntas en esta sección.' : 'No questions in this section.'}
              </p>
            ) : (
              currentStepData.questions.map((q: any, index: number) => {
                const questionTitle = getLocalized(q.questionLabel, locale);

                // Texto Abierto
                if (q.type === 'text') {
                  return (
                    <div key={q.id || index} className="space-y-2">
                      <label className="block text-base font-medium text-slate-200">
                        {index + 1}. {questionTitle} {q.required && <span className="text-blue-400">*</span>}
                      </label>
                      <input
                        type="text"
                        required={q.required}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder={locale === 'es' ? 'Escribe tu respuesta...' : 'Type your answer...'}
                      />
                    </div>
                  );
                }

                // Número
                if (q.type === 'number') {
                  return (
                    <div key={q.id || index} className="space-y-2">
                      <label className="block text-base font-medium text-slate-200">
                        {index + 1}. {questionTitle} {q.required && <span className="text-blue-400">*</span>}
                      </label>
                      <input
                        type="number"
                        required={q.required}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="0"
                      />
                    </div>
                  );
                }

                // Opciones (Radio, Checkbox, Select)
                if (['radio', 'checkbox', 'select'].includes(q.type)) {
                  return (
                    <div key={q.id || index} className="space-y-3">
                      <label className="block text-base font-medium text-slate-200">
                        {index + 1}. {questionTitle} {q.required && <span className="text-blue-400">*</span>}
                      </label>

                      {q.type === 'select' ? (
                        <div className="space-y-3">
                          <select
                            required={q.required}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          >
                            <option value="" disabled>
                              {locale === 'es' ? 'Selecciona una opción' : 'Select an option'}
                            </option>
                            {q.options?.map((opt: any) => (
                              <option key={opt.id} value={opt.id}>
                                {getLocalized(opt.label, locale)}
                              </option>
                            ))}
                          </select>

                          {/* Explicación condicional para Select */}
                          {(() => {
                            const selectedOpt = q.options?.find((opt: any) => opt.id === answers[q.id]);
                            if (selectedOpt && selectedOpt.requiresExplanation) {
                              const expKey = `${q.id}_${selectedOpt.id}`;
                              const placeholder = getLocalized(selectedOpt.explanationPlaceholder, locale) || (locale === 'es' ? 'Por favor detalla o explica tu respuesta...' : 'Please explain or provide details...');
                              return (
                                <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-blue-500/50 pt-1 pb-2 space-y-1.5 transition-all">
                                  <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400">
                                    {locale === 'es' ? 'Explicación obligatoria' : 'Required explanation'} <span className="text-red-400">*</span>
                                  </label>
                                  <textarea
                                    required
                                    rows={3}
                                    value={explanations[expKey] || ''}
                                    onChange={(e) => handleExplanationChange(expKey, e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full bg-slate-950 border border-blue-500/30 focus:border-blue-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                                  />
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {q.options?.map((opt: any) => {
                            const isCheckbox = q.type === 'checkbox';
                            const isChecked = isCheckbox 
                              ? (answers[q.id] || []).includes(opt.id)
                              : answers[q.id] === opt.id;
                            const expKey = `${q.id}_${opt.id}`;
                            const placeholder = getLocalized(opt.explanationPlaceholder, locale) || (locale === 'es' ? 'Por favor detalla o explica tu respuesta...' : 'Please explain or provide details...');

                            return (
                              <div key={opt.id} className="space-y-2">
                                <label className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                                  isChecked 
                                    ? 'border-blue-500/60 bg-blue-950/20 shadow-sm shadow-blue-500/10' 
                                    : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/60'
                                }`}>
                                  <input
                                    type={isCheckbox ? "checkbox" : "radio"}
                                    name={`question_${q.id}${isCheckbox ? `_${opt.id}` : ''}`}
                                    required={q.required && !isCheckbox}
                                    value={opt.id}
                                    checked={isChecked}
                                    onChange={(e) => isCheckbox 
                                      ? handleCheckboxChange(q.id, opt.id, e.target.checked)
                                      : handleAnswerChange(q.id, opt.id)
                                    }
                                    className={`w-4 h-4 text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-900 ${isCheckbox ? 'rounded' : ''}`}
                                  />
                                  <span className={`text-sm sm:text-base transition-colors ${isChecked ? 'text-white font-medium' : 'text-slate-300'}`}>
                                    {getLocalized(opt.label, locale)}
                                  </span>
                                </label>

                                {opt.requiresExplanation && isChecked && (
                                  <div className="ml-2 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-blue-500/50 pt-1 pb-2 space-y-1.5 transition-all">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400">
                                      {locale === 'es' ? 'Explicación obligatoria' : 'Required explanation'} <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                      required
                                      rows={3}
                                      value={explanations[expKey] || ''}
                                      onChange={(e) => handleExplanationChange(expKey, e.target.value)}
                                      placeholder={placeholder}
                                      className="w-full bg-slate-950 border border-blue-500/30 focus:border-blue-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Subir Archivo
                if (q.type === 'file') {
                  const file = files[q.id];
                  return (
                    <div key={q.id || index} className="space-y-2">
                      <label className="block text-base font-medium text-slate-200">
                        {index + 1}. {questionTitle} {q.required && <span className="text-blue-400">*</span>}
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id={`file_${q.id}`}
                          required={q.required && !file}
                          onChange={(e) => handleFileChange(q.id, e)}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <label 
                          htmlFor={`file_${q.id}`}
                          className="flex flex-col items-center justify-center w-full h-32 px-4 transition-colors border-2 border-slate-800 border-dashed rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 bg-slate-950"
                        >
                          <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-400">
                            {file ? <span className="text-blue-400 font-medium">{file.name}</span> : (locale === 'es' ? 'Haz clic para subir un archivo o arrástralo aquí' : 'Click to upload a file or drag and drop')}
                          </span>
                          <span className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX, JPG, PNG (Max 5MB)</span>
                        </label>
                      </div>
                    </div>
                  );
                }

                return null;
              })
            )}
          </div>
        )}

        {/* ===== CONTROLES DE NAVEGACIÓN (ATRÁS / SIGUIENTE / ENVIAR) ===== */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
          
          {/* Botón ATRÁS */}
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm tracking-wide border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              {locale === 'es' ? 'Atrás' : 'Back'}
            </button>
          ) : (
            <div /> /* Spacer */
          )}

          {/* Botón SIGUIENTE o ENVIAR */}
          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0E4194] hover:bg-[#1453B9] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {locale === 'es' ? 'Siguiente' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-xl bg-gradient-to-r from-[#0E4194] to-blue-600 hover:from-[#1453B9] hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {locale === 'es' ? 'Enviando...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {locale === 'es' ? 'Enviar Solicitud' : 'Submit Application'}
                </>
              )}
            </button>
          )}

        </div>

      </div>

    </form>
  );
}
