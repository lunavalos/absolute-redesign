'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadMedia, submitJobApplication } from '../../../data/api';
import BorderBeamButton from '../../../components/BorderBeamButton';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const getLocalized = (field: any, currentLocale: string): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[currentLocale] || field.es || field.en || Object.values(field)[0] || '';
  }
  return String(field);
};

export default function ApplyFormClient({ form, locale }: { form: any, locale: string }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
  });

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleExplanationChange = (key: string, value: string) => {
    setExplanations(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (questionId: string, value: string, checked: boolean) => {
    const currentValues = answers[questionId] || [];
    if (checked) {
      setAnswers({ ...answers, [questionId]: [...currentValues, value] });
    } else {
      setAnswers({ ...answers, [questionId]: currentValues.filter((v: string) => v !== value) });
    }
  };

  const handleFileChange = (questionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [questionId]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let totalEarnedScore = 0;
      let totalMaxScore = 0;
      const formattedAnswers: any[] = [];

      for (const question of form.questions || []) {
        const questionText = getLocalized(question.questionLabel, locale);
        const answerVal = answers[question.id];
        const fileVal = files[question.id];

        // For arrays (checkboxes), check length.
        const hasAnswer = Array.isArray(answerVal) ? answerVal.length > 0 : !!answerVal;

        if (question.required && !hasAnswer && !fileVal) {
          throw new Error(
            locale === 'es' 
              ? `La pregunta "${questionText}" es obligatoria.` 
              : `Question "${questionText}" is required.`
          );
        }

        if (question.type === 'text') {
          formattedAnswers.push({
            question: questionText,
            answerText: answerVal || '',
          });
        } 
        else if (question.type === 'number') {
          formattedAnswers.push({
            question: questionText,
            answerText: answerVal !== undefined && answerVal !== null ? String(answerVal) : '',
          });
        }
        else if (['radio', 'checkbox', 'select'].includes(question.type)) {
          totalMaxScore += 100; // Each choice question can give up to 100 points
          let score = 0;
          let answerText = '';
          const collectedExplanations: string[] = [];

          if (Array.isArray(answerVal)) {
            // Checkbox with multiple selected options
            const selectedOptions = (question.options || []).filter((opt: any) => answerVal.includes(opt.id));
            score = selectedOptions.reduce((acc: number, opt: any) => acc + (opt.score || 0), 0);

            const displayParts: string[] = [];
            for (const opt of selectedOptions) {
              const optLabel = getLocalized(opt.label, locale);
              if (opt.requiresExplanation) {
                const expKey = `${question.id}_${opt.id}`;
                const expText = (explanations[expKey] || '').trim();
                if (!expText) {
                  throw new Error(
                    locale === 'es'
                      ? `Por favor proporciona la explicación requerida para la opción "${optLabel}".`
                      : `Please provide the required explanation for "${optLabel}".`
                  );
                }
                displayParts.push(`${optLabel} (Detalle: ${expText})`);
                collectedExplanations.push(`[${optLabel}]: ${expText}`);
              } else {
                displayParts.push(optLabel);
              }
            }
            answerText = displayParts.join(', ');
          } else {
            // Radio or Select
            const selectedOption = (question.options || []).find((opt: any) => opt.id === answerVal);
            score = selectedOption ? (selectedOption.score || 0) : 0;
            const optLabel = selectedOption ? getLocalized(selectedOption.label, locale) : '';

            if (selectedOption?.requiresExplanation) {
              const expKey = `${question.id}_${selectedOption.id}`;
              const expText = (explanations[expKey] || '').trim();
              if (!expText) {
                throw new Error(
                  locale === 'es'
                    ? `Por favor proporciona la explicación requerida para "${optLabel || questionText}".`
                    : `Please provide the required explanation for "${optLabel || questionText}".`
                );
              }
              answerText = `${optLabel} (Detalle: ${expText})`;
              collectedExplanations.push(expText);
            } else {
              answerText = optLabel;
            }
          }

          totalEarnedScore += score;

          formattedAnswers.push({
            question: questionText,
            answerText,
            explanation: collectedExplanations.length > 0 ? collectedExplanations.join('\n\n') : undefined,
            score,
          });
        } 
        else if (question.type === 'file') {
          let attachmentId = null;
          if (fileVal) {
            // Upload to Payload Media Collection
            const uploadRes = await uploadMedia(fileVal);
            attachmentId = uploadRes.doc.id;
          }
          formattedAnswers.push({
            question: questionText,
            answerText: fileVal ? fileVal.name : '',
            attachment: attachmentId,
          });
        }
      }

      // Calculate final score from 0 to 100
      const finalTotalScore = totalMaxScore > 0 ? Math.round((totalEarnedScore / totalMaxScore) * 100) : 0;

      // Submit application
      await submitJobApplication({
        form: form.id,
        applicantName: formData.applicantName,
        email: formData.email,
        phone: formData.phone,
        totalScore: finalTotalScore,
        answers: formattedAnswers,
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || (locale === 'es' ? 'Ocurrió un error al enviar la solicitud. Intenta de nuevo.' : 'An error occurred while submitting your application. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 sm:p-16 text-center text-white flex flex-col items-center shadow-2xl max-w-2xl mx-auto">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold mb-4">
          {locale === 'es' ? '¡Solicitud Enviada!' : 'Application Submitted!'}
        </h2>
        <p className="text-slate-400 mb-8">
          {locale === 'es'
            ? 'Hemos recibido tu solicitud de empleo correctamente. Nuestro equipo de recursos humanos revisará tu perfil y se pondrá en contacto contigo pronto.'
            : 'We have received your job application. Our HR team will review your profile and get in touch with you shortly.'}
        </p>
        <BorderBeamButton onClick={() => router.push(`/${locale}`)}>
          {locale === 'es' ? 'Volver al Inicio' : 'Return to Home'}
        </BorderBeamButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Datos Personales */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
          {locale === 'es' ? 'Datos Personales' : 'Personal Information'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              {locale === 'es' ? 'Nombre Completo' : 'Full Name'} <span className="text-blue-400">*</span>
            </label>
            <input 
              type="text" 
              name="applicantName"
              required 
              value={formData.applicantName}
              onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder={locale === 'es' ? 'Ej. Juan Pérez' : 'e.g. John Doe'}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {locale === 'es' ? 'Correo Electrónico' : 'Email Address'} <span className="text-blue-400">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {locale === 'es' ? 'Teléfono' : 'Phone Number'} <span className="text-blue-400">*</span>
              </label>
              <input 
                type="tel" 
                name="phone"
                required 
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="+52 123 456 7890"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cuestionario Dinámico */}
      {form.questions && form.questions.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            {locale === 'es' ? 'Cuestionario' : 'Questionnaire'}
          </h3>
          
          {form.questions.map((q: any, index: number) => {
            const questionTitle = getLocalized(q.questionLabel, locale);
            
            // Text Question
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
                  />
                </div>
              );
            }
            
            // Number Question
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
                  />
                </div>
              );
            }

            // Choice Question (Select, Radio, Checkbox)
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

                      {/* Conditional explanation textarea if selected option requires explanation */}
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

                            {/* Conditional explanation textarea if requiresExplanation && isChecked */}
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

            // File Upload
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
          })}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-slate-800 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="relative inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-[11px] bg-[#0E4194] hover:bg-[#1453B9] text-white text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {locale === 'es' ? 'Enviando...' : 'Submitting...'}
            </>
          ) : (
            locale === 'es' ? 'Enviar Solicitud' : 'Submit Application'
          )}
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

    </form>
  );
}

