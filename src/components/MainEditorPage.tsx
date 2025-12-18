// src/components/MainEditorPage.tsx
import React, { useCallback, useRef, useMemo } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { RichTextEditor, insertCustomNode } from './RichTextEditor';
import { Preview } from './Preview';
import type { Descendant } from 'slate';
import { Editor } from 'slate';
import { serializeToLatex } from '../utils/latex-serializer';

interface MainEditorPageProps {
  content: Descendant[];
  onContentChange: (newContent: Descendant[]) => void;
}

export const MainEditorPage: React.FC<MainEditorPageProps> = ({ content, onContentChange }) => {
  const editorRef = useRef<Editor>(null);

  const insertTemplate = useCallback((template: string, nodeType?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    if (nodeType) {
      insertCustomNode(editor, nodeType);
    } else {
      Editor.insertText(editor, template);
    }
  }, []);

  const latexContent = useMemo(() => serializeToLatex(content), [content]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-right" dir="rtl">

      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <EditorToolbar onInsertTemplate={insertTemplate} />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* قسم محرر المعادلات (RichTextEditor) */}
        <section className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md h-[500px] lg:h-[calc(100vh-140px)]">
          <div className="bg-slate-100/50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span>✍️</span> محرر المعادلات
            </span>
            <span className="text-xs text-slate-400">يدعم الكتابة المباشرة</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <RichTextEditor 
              ref={editorRef} 
              value={content} 
              onChange={onContentChange} 
            />
          </div>
        </section>

        {/* قسم المعاينة النهائية (Preview) */}
        <section className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md h-[500px] lg:h-[calc(100vh-140px)]">
          <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-50 flex justify-between items-center">
            <span className="text-sm font-bold text-indigo-700 flex items-center gap-2">
              <span>👁️</span> المعاينة النهائية
            </span>
            <span className="bg-indigo-100 text-indigo-600 text-[10px] px-2 py-1 rounded-full">MathJax Live</span>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4">
             <Preview content={latexContent} />
          </div>
        </section>

      </main>
    </div>
  );
};