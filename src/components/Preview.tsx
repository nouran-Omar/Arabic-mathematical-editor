
import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  content: string;
}

declare global {
  interface Window { MathJax: any; }
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current && window.MathJax) {
      let processedContent = content;


      processedContent = processedContent.replace(
        /\\sum/g, 
        '\\style{display:inline-block; transform: scale(-1)}{\\sum}'
      );


      processedContent = processedContent.replace(
        /\\int/g, 
        '\\style{display:inline-block; transform: scaleX(-1) scaleY(1.25) }{\\int}'
      );


      const htmlContent = processedContent
        .split('\n')
        .map(line => line.trim() ? `<div class="mb-2 min-h-[1.5em] text-slate-900 leading-loose" style="direction: rtl;">${line}</div>` : '') 
        .join('');

      previewRef.current.innerHTML = htmlContent;

      window.MathJax.typesetPromise([previewRef.current]).catch(console.error);
    }
  }, [content]);

  return (
    <div 
      ref={previewRef} 
      className="w-full text-xl break-words p-20 bg-white rounded-lg min-h-[200px] shadow-inner border border-slate-100 font-serif" 
      dir="rtl"
      style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
    >

    </div>
  );
};