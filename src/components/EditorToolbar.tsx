import React, { useState } from 'react';
import ToolbarItem from './ToolbarItem'; 
import { MATH_TOOLBAR_ITEMS } from '../math-data';

interface EditorToolbarProps {
  onInsertTemplate: (template: string, nodeType?: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsertTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const structuralItems = MATH_TOOLBAR_ITEMS.filter(item => item.isStructural);
  const symbolItems = MATH_TOOLBAR_ITEMS.filter(item => !item.isStructural);

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center" dir="rtl">
        <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <span>∑</span> <span className="hidden md:inline">المحرر الرياضي العربي</span>
        </h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md"
        >
          {isOpen ? 'إخفاء' : 'أدوات'}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full border-t border-gray-100 md:border-0 bg-gray-50/50 md:bg-transparent`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
     
          <div className="flex flex-col md:flex-row justify-between gap-4" dir="rtl">
            
 
            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start border-b md:border-b-0 md:border-l md:pl-4 border-gray-200 pb-2 md:pb-0">
               <span className="text-xs text-gray-400 block w-full md:w-auto ml-2">بنى مركبة:</span>
               {structuralItems.map((item, index) => (
                  <ToolbarItem key={`struct-${index}`} item={item} onInsert={onInsertTemplate} />
               ))}
            </div>

         <div className="flex flex-wrap gap-2 items-center justify-end max-w-2xl"> 
   {symbolItems.map((item, index) => (
      <ToolbarItem key={`sym-${index}`} item={item} onInsert={(t, n) => {
        onInsertTemplate(t, n);
        if (window.innerWidth < 768) setIsOpen(false);
      }} />
   ))}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};