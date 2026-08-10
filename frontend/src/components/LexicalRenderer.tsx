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
        return (
          <p key={index} className="mb-4">
            {pNode.children.map((child, i) => renderNode(child, i))}
          </p>
        );
      }

      case 'heading': {
        const hNode = node as ElementNode;
        const tag = hNode.tag || 'h2';
        const className = tag === 'h1' ? 'text-4xl font-bold mb-6' : 
                          tag === 'h2' ? 'text-3xl font-bold mb-5 mt-8' : 
                          tag === 'h3' ? 'text-2xl font-bold mb-4 mt-6' : 'text-xl font-bold mb-3 mt-4';
        const HeadingTag = tag as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={className}>
            {hNode.children.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        );
      }

      case 'list': {
        const listNode = node as ElementNode;
        const tag = listNode.listType === 'number' ? 'ol' : 'ul';
        const ListTag = tag as keyof JSX.IntrinsicElements;
        const className = tag === 'ol' ? 'list-decimal ml-6 mb-4' : 'list-disc ml-6 mb-4';
        return (
          <ListTag key={index} className={className}>
            {listNode.children.map((child, i) => renderNode(child, i))}
          </ListTag>
        );
      }

      case 'listitem': {
        const listItemNode = node as ElementNode;
        return (
          <li key={index} className="mb-2">
            {listItemNode.children.map((child, i) => renderNode(child, i))}
          </li>
        );
      }

      case 'quote': {
        const quoteNode = node as ElementNode;
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-1 italic mb-6 bg-gray-50 dark:bg-gray-800/50">
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
            className="text-primary hover:underline"
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
