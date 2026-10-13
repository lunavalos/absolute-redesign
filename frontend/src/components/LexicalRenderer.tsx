import React from 'react';

// Tipos básicos para Lexical AST
interface LexicalNode {
  type: string;
  version?: number;
  [key: string]: any;
}

interface TextNode extends LexicalNode {
  type: 'text';
  text: string;
  format: number;
  style: string;
}

interface ElementNode extends LexicalNode {
  children: LexicalNode[];
  direction?: 'ltr' | 'rtl';
  format?: string | number;
  indent?: number;
}

interface LinkNode extends ElementNode {
  type: 'link';
  fields: {
    url: string;
    newTab?: boolean;
  };
}

export const LexicalRenderer: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.root || !data.root.children) {
    return null;
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    switch (node.type) {
      case 'text': {
        const textNode = node as TextNode;
        let element: React.ReactNode = textNode.text;
        
        // Lexical format flags (Bitwise)
        // 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline, 16 = code
        if (textNode.format & 1) element = <strong key={index}>{element}</strong>;
        if (textNode.format & 2) element = <em key={index}>{element}</em>;
        if (textNode.format & 4) element = <s key={index}>{element}</s>;
        if (textNode.format & 8) element = <u key={index}>{element}</u>;
        if (textNode.format & 16) element = <code key={index}>{element}</code>;

        return <React.Fragment key={index}>{element}</React.Fragment>;
      }
      
      case 'paragraph': {
        const pNode = node as ElementNode;
        const firstChildText = (pNode.children?.[0] as TextNode)?.text;
        if (pNode.children?.length === 1 && firstChildText && typeof firstChildText === 'string') {
          const ytMatch = firstChildText.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
          if (ytMatch) {
            const videoId = ytMatch[1];
            return (
              <div key={index} className="my-10 aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title="YouTube video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }
        }
        return (
          <p key={index} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            {pNode.children.map((child, i) => renderNode(child, i))}
          </p>
        );
      }

      case 'heading': {
        const hNode = node as ElementNode;
        const tag = hNode.tag || 'h2';
        const className = tag === 'h1' ? 'text-3xl sm:text-4xl font-extrabold text-white mt-14 mb-6 tracking-tight' : 
                          tag === 'h2' ? 'text-2xl sm:text-3xl font-extrabold text-white mt-12 mb-5 border-b border-white/10 pb-3 tracking-tight' : 
                          tag === 'h3' ? 'text-xl sm:text-2xl font-bold text-blue-300 mt-8 mb-4' : 
                          'text-lg sm:text-xl font-bold text-white mb-3 mt-6';
        const HeadingTag = tag as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={className}>
            {hNode.children.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        );
      }

      case 'list': {
        const listNode = node as ElementNode;
        const isNum = listNode.listType === 'number';
        return isNum ? (
          <ol key={index} className="list-decimal pl-6 mb-8 space-y-3 text-slate-300 text-base sm:text-lg">
            {listNode.children.map((child, i) => renderNode(child, i))}
          </ol>
        ) : (
          <ul key={index} className="space-y-3.5 mb-8 pl-1">
            {listNode.children.map((child, i) => renderNode(child, i))}
          </ul>
        );
      }

      case 'listitem': {
        const listItemNode = node as ElementNode;
        return (
          <li key={index} className="text-slate-300 text-base sm:text-lg leading-relaxed flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <div className="flex-1">
              {listItemNode.children.map((child, i) => renderNode(child, i))}
            </div>
          </li>
        );
      }

      case 'quote': {
        const quoteNode = node as ElementNode;
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-3 italic my-8 text-slate-200 bg-blue-950/20 rounded-r-2xl border-solid text-lg">
            {quoteNode.children.map((child, i) => renderNode(child, i))}
          </blockquote>
        );
      }

      case 'link': {
        const linkNode = node as LinkNode;
        const url = linkNode.fields?.url || '';
        const newTab = linkNode.fields?.newTab;
        return (
          <a 
            key={index} 
            href={url} 
            target={newTab ? '_blank' : '_self'}
            rel={newTab ? 'noopener noreferrer' : ''}
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
          >
            {linkNode.children.map((child, i) => renderNode(child, i))}
          </a>
        );
      }

      case 'linebreak': {
        return <br key={index} />;
      }

      default:
        // Render children of unknown nodes just in case
        if ((node as ElementNode).children) {
          return (node as ElementNode).children.map((child, i) => renderNode(child, i));
        }
        return null;
    }
  };

  return (
    <div className="lexical-content">
      {data.root.children.map((node: LexicalNode, i: number) => renderNode(node, i))}
    </div>
  );
};
