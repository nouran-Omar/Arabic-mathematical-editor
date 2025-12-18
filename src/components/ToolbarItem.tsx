import React from 'react';
import type { ToolbarItemData } from '../math-data';

interface ToolbarItemProps {
  item: ToolbarItemData;
  onInsert: (template: string, nodeType?: string) => void;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ item, onInsert }) => {

  const baseClasses = 'flex items-center justify-center rounded-lg border text-sm font-medium h-10 min-w-[45px] px-2 transition-all active:scale-95';
  
  const structuralClasses = 'bg-indigo-100 border-indigo-200 text-indigo-700 font-bold'; 
  const simpleClasses = 'bg-white border-gray-200 text-gray-600 shadow-sm hover:border-gray-300';

  return (
    <button
      type="button"
      onClick={() => onInsert(item.template, item.nodeType)} 
      className={`${baseClasses} ${item.isStructural ? structuralClasses : simpleClasses}`}
      style={{ fontFamily: "system-ui, sans-serif" }} 
    >
      {item.label}
    </button>
  );
};

export default ToolbarItem;