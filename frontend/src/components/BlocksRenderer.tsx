import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PayloadMedia } from '../data/types';
import { getMediaUrl } from '../data/api';
import { LexicalRenderer } from './LexicalRenderer';
import BorderBeamButton from './BorderBeamButton';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface RichTextBlock {
  blockType: 'richText';
  content: any;
}

interface ImageAndTextBlock {
  blockType: 'imageAndText';
  imagePosition: 'left' | 'right';
  image: PayloadMedia;
  content: any;
}

interface CallToActionBlock {
  blockType: 'cta';
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

interface FeaturesBlock {
  blockType: 'features';
  title: string;
  subtitle?: string;
  items: {
    title: string;
    description: string;
  }[];
}

interface FAQBlock {
  blockType: 'faq';
  title: string;
  subtitle?: string;
  questions: {
    question: string;
    answer: any;
  }[];
}

type PayloadBlock = RichTextBlock | ImageAndTextBlock | CallToActionBlock | FeaturesBlock | FAQBlock;

export const BlocksRenderer: React.FC<{ blocks: PayloadBlock[], theme?: 'light' | 'dark' }> = ({ blocks, theme = 'dark' }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  const isLight = theme === 'light';

  return (
    <div className="flex flex-col gap-12 my-12">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'richText':
            return (
              <div key={index} className={`max-w-4xl mx-auto w-full prose ${!isLight ? 'prose-invert' : 'prose-slate'}`}>
                <LexicalRenderer data={block.content} />
              </div>
            );

          case 'imageAndText': {
            const isLeft = block.imagePosition === 'left';
            return (
              <div key={index} className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={`relative h-[400px] w-full rounded-2xl overflow-hidden ${!isLeft ? 'md:order-2' : ''}`}>
                  {block.image && (
                    <Image 
                      src={getMediaUrl(block.image.url)}
                      alt={block.image.alt || 'Image section'}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className={`prose ${!isLight ? 'prose-invert' : 'prose-slate'}`}>
                  <LexicalRenderer data={block.content} />
                </div>
              </div>
            );
          }

          case 'cta':
            return (
              <div key={index} className="w-full bg-[#091C3D] rounded-3xl p-10 sm:p-16 text-center text-white flex flex-col items-center shadow-xl my-12">
                <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">{block.title}</h3>
                {block.description && (
                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">{block.description}</p>
                )}
                <BorderBeamButton href={block.buttonLink}>
                  {block.buttonText}
                  <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                </BorderBeamButton>
              </div>
            );

          case 'features':
            return (
              <div key={index} className="max-w-6xl mx-auto w-full py-12">
                <div className="text-center mb-16">
                  <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>{block.title}</h2>
                  {block.subtitle && <p className={`text-xl max-w-3xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{block.subtitle}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {block.items?.map((item, i) => (
                    <div key={i} className={`${isLight ? 'bg-white border-slate-200 shadow-lg hover:border-blue-200' : 'bg-slate-900 border-slate-800 hover:border-slate-700'} border p-8 rounded-3xl transition-colors`}>
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                      <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'faq':
            return (
              <div key={index} className="max-w-4xl mx-auto w-full py-12">
                <div className="text-center mb-12">
                  <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>{block.title}</h2>
                  {block.subtitle && <p className={`text-xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{block.subtitle}</p>}
                </div>
                <div className="space-y-4">
                  {block.questions?.map((item, i) => (
                    <details key={i} className={`group border rounded-2xl [&_summary::-webkit-details-marker]:hidden ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
                      <summary className={`flex items-center justify-between p-6 cursor-pointer font-bold text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {item.question}
                        <ChevronDown className={`w-5 h-5 transition-transform group-open:rotate-180 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
                      </summary>
                      <div className={`px-6 pb-6 prose max-w-none ${!isLight ? 'prose-invert text-slate-400' : 'prose-slate text-slate-600'}`}>
                        <LexicalRenderer data={item.answer} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            );

          default:
            console.warn('Unknown block type:', (block as any).blockType);
            return null;
        }
      })}
    </div>
  );
};
