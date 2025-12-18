// src/utils/latex-serializer.ts

import { Text, Element } from 'slate';
import type { Descendant } from 'slate';
import type { CustomElement } from '../math-data';

export const serializeToLatex = (nodes: Descendant[]): string => {
  return nodes.map((node) => {
    // 1. النصوص
    if (Text.isText(node)) {
      // إذا كان النص بـ bold، نستخدم <b>
      const textContent = node.bold ? `<b>${node.text}</b>` : node.text;
      return textContent;
    }

    // 2. العناصر
    if (Element.isElement(node)) {
      const element = node as CustomElement;
      
      // تحويل الأطفال (محتوى العنصر)
      const childrenHtml = element.children.map(child => serializeToLatex([child])).join('');

      switch (element.type) {
        case 'paragraph': 
          return `<div style="margin-bottom:8px;direction:rtl;text-align:right;">${childrenHtml}</div>`;
          
        // ========================================================
        // 1. الكسر (Fraction)
        // ========================================================
        case 'fraction': {
          const numNode = element.children.find((c: any) => c.type === 'numerator');
          const denNode = element.children.find((c: any) => c.type === 'denominator');
          const numHtml = numNode ? serializeToLatex([numNode]) : '';
          const denHtml = denNode ? serializeToLatex([denNode]) : '';

          return `<span style="display:inline-flex;flex-direction:column;vertical-align:middle;align-items:center;margin:0 4px;"><span style="width:100%;text-align:center;border-bottom:2px solid #0f172a;padding-bottom:2px;display:flex;justify-content:center;">${numHtml}</span><span style="width:100%;text-align:center;padding-top:2px;display:flex;justify-content:center;">${denHtml}</span></span>`;
        }
        
        // ========================================================
        // 2. الأس (Superscript)
        // ========================================================
        case 'superscript': {
           // نبحث عن الأساس والأس
           const baseNode = element.children.find((c: any) => c.type === 'base') || element.children[0];
           const powerNode = element.children.find((c: any) => c.type === 'power') || element.children[1];
           
           const baseHtml = baseNode ? serializeToLatex([baseNode]) : '';
           const powerHtml = powerNode ? serializeToLatex([powerNode]) : '';

           return `<span style="display:inline-flex;align-items:baseline;direction:rtl;"><span style="display:flex;align-items:center;">${baseHtml}</span><span style="position:relative;top:-0.8em;font-size:0.75em;line-height:1;margin-right:1px;direction:rtl;">${powerHtml}</span></span>`;
        }

        // ========================================================
        // 3. الأس السفلي (Subscript)
        // ========================================================
        case 'subscript': { // تم تغييرها من subscript_block
           const baseNode = element.children.find((c: any) => c.type === 'base') || element.children[0];
           const subNode = element.children.find((c: any) => c.type === 'sub') || element.children[1];
           
           const baseHtml = baseNode ? serializeToLatex([baseNode]) : '';
           const subHtml = subNode ? serializeToLatex([subNode]) : '';

           return `<span style="display:inline-flex;align-items:baseline;margin:0 2px;direction:rtl;"><span style="display:flex;align-items:center;">${baseHtml}</span><span style="position:relative;top:0.4em;font-size:0.75rem;margin-right:1px;">${subHtml}</span></span>`;
        }
        
        // --- التكامل والسيجما والنهايات (3 خانات) ---
        case 'summation': {
           const lowerNode = element.children.find((c: any) => c.type === 'lower') || element.children[0];
           const upperNode = element.children.find((c: any) => c.type === 'upper') || element.children[1];
           const expNode = element.children.find((c: any) => c.type === 'expression') || element.children[2];

           const lowerHtml = lowerNode ? serializeToLatex([lowerNode]) : '';
           const upperHtml = upperNode ? serializeToLatex([upperNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 4px;direction:rtl;"><span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;margin:0 4px;"><span style="font-size:0.75rem;margin-bottom:2px;width:100%;text-align:center;">${upperHtml}</span><span style="font-size:1.5rem;font-family:serif;line-height:1;display:inline-block;transform:scale(-1);">∑</span><span style="font-size:0.75rem;margin-top:2px;width:100%;text-align:center;">${lowerHtml}</span></span><span style="display:flex;align-items:center;">${expHtml}</span></span>`;
        }

        case 'integral': {
           const lowerNode = element.children.find((c: any) => c.type === 'lower') || element.children[0];
           const upperNode = element.children.find((c: any) => c.type === 'upper') || element.children[1];
           const expNode = element.children.find((c: any) => c.type === 'expression') || element.children[2];

           const lowerHtml = lowerNode ? serializeToLatex([lowerNode]) : '';
           const upperHtml = upperNode ? serializeToLatex([upperNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 4px;direction:rtl;"><span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;margin:0 4px;"><span style="font-size:0.75rem;margin-bottom:2px;width:100%;text-align:center;">${upperHtml}</span><span style="font-size:1.875rem;font-family:serif;line-height:1;font-style:italic;display:inline-block;transform:scaleX(-1) scaleY(1.25);">∫</span><span style="font-size:0.75rem;margin-top:2px;width:100%;text-align:center;">${lowerHtml}</span></span><span style="display:flex;align-items:center;">${expHtml}</span></span>`;
        }

        case 'limit': {
           const subNode = element.children.find((c: any) => c.type === 'limit_sub') || element.children[0];
           const expNode = element.children.find((c: any) => c.type === 'expression') || element.children[1];
           
           const subHtml = subNode ? serializeToLatex([subNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

           return `<span style="display:inline-flex;align-items:baseline;margin:0 4px;direction:rtl;vertical-align:middle;"><span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:start;margin-left:2px;"><span style="font-family:serif;font-size:1.25rem;font-weight:bold;line-height:1;user-select:none;">نها</span><span style="font-size:0.625rem;margin-top:2px;width:100%;text-align:center;">${subHtml}</span></span><span style="display:flex;align-items:center;margin-right:-8px;">${expHtml}</span></span>`;
        }

        // --- باقي العناصر ---
        case 'root_index': 
        case 'expression': 
        case 'lower': 
        case 'upper': 
        case 'base': 
        case 'power': 
        case 'sub':
        case 'limit_sub':
        case 'numerator': 
        case 'denominator': 
            // تصميم موحد للمربعات في المعاينة
            return `<span style="min-width:28px;min-height:28px;padding:0 4px;margin:0 2px;display:inline-flex;align-items:center;justify-content:center;border-radius:4px;border:1px solid #c7d2fe;background-color:#eef2ff;font-size:0.875rem;direction:rtl;">${childrenHtml}</span>`;

        case 'sqrt': {
          return `<span style="display:inline-flex;align-items:stretch;margin:0 4px;vertical-align:middle;direction:rtl;"><span style="font-size:1.125rem;font-family:serif;transform:scaleX(-1);user-select:none;line-height:1;">√</span><span style="border-top:2px solid #0f172a;padding:0 4px;text-align:center;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:0.875rem;">${childrenHtml}</span></span>`;
        }
        
        case 'n_root': {
           const indexNode = element.children.find((c: any) => c.type === 'root_index') || element.children[0];
           const exprNode = element.children.find((c: any) => c.type === 'expression') || element.children[1];
           
           const indexHtml = indexNode ? serializeToLatex([indexNode]) : '';
           const exprHtml = exprNode ? serializeToLatex([exprNode]) : '';

           return `<span style="display:inline-flex;align-items:stretch;margin:0 8px;vertical-align:bottom;direction:rtl;"><span style="position:relative;display:flex;flex-direction:column;width:24px;"><span style="position:absolute;bottom:100%;right:-12px;margin-bottom:-8px;z-index:50;display:flex;align-items:center;justify-content:center;min-width:28px;height:28px;background-color:#fef9c3;border:2px solid #eab308;border-radius:6px;font-size:0.9em;font-weight:bold;">${indexHtml}</span><svg style="width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:2px;" viewBox="0 0 20 40" preserveAspectRatio="none"><path d="M0 0 L10 40 L20 20" vectorEffect="non-scaling-stroke" /></svg></span><span style="border-top:2px solid #0f172a;padding:0 8px;display:flex;align-items:center;justify-content:center;min-width:30px;">${exprHtml}</span></span>`;
        }

        case 'matrix': {
           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 4px;direction:rtl;"><span style="width:6px;align-self:stretch;border-right:2px solid #1e293b;border-top:2px solid #1e293b;border-bottom:2px solid #1e293b;border-top-right-radius:4px;border-bottom-right-radius:4px;margin:4px 0;"></span><span style="display:flex;flex-direction:column;gap:4px;margin:0 4px;justify-content:center;">${childrenHtml}</span><span style="width:6px;align-self:stretch;border-left:2px solid #1e293b;border-top:2px solid #1e293b;border-bottom:2px solid #1e293b;border-top-left-radius:4px;border-bottom-left-radius:4px;margin:4px 0;"></span></span>`;
        }
        case 'matrix_row': return `<span style="display:flex;flex-direction:row;gap:4px;justify-content:center;align-items:center;">${childrenHtml}</span>`;
        case 'matrix_cell': return `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:45px;min-height:40px;padding:6px;margin:0 2px;background-color:white;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-size:0.875rem;vertical-align:middle;">${childrenHtml}</span>`;
        
        default: return childrenHtml;
      }
    }
    return '';
  }).join('');
};