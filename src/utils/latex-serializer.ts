// src/utils/latex-serializer.ts

import { Text, Element } from 'slate';
import type { Descendant } from 'slate';
import type { CustomElement } from '../math-data';

// ========================================================
// التعديل 1: تعريف ستايل موحد وشفاف بالكامل
// ========================================================
const TRANSPARENT_BOX_STYLE = "min-width:28px;min-height:28px;padding:0 4px;margin:0 2px;display:inline-flex;align-items:center;justify-content:center;border:none;background-color:transparent;font-size:0.875rem;direction:rtl;box-shadow:none;";


export const serializeToLatex = (nodes: Descendant[]): string => {
  return nodes.map((node) => {
    
    if (Text.isText(node)) {
      return node.text;
    }

    if (Element.isElement(node)) {
      const element = node as CustomElement;
      
      const childrenHtml = element.children.map(child => serializeToLatex([child])).join('');

      switch (element.type) {
        case 'paragraph': 
          return `<div style="margin-bottom:8px;direction:rtl;text-align:right;">${childrenHtml}</div>`;
          
        case 'fraction': {
          const numNode = element.children.find((c: any) => c.type === 'numerator');
          const denNode = element.children.find((c: any) => c.type === 'denominator');
          
          const numHtml = numNode ? serializeToLatex([numNode]) : '';
          const denHtml = denNode ? serializeToLatex([denNode]) : '';

          return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 4px;direction:rtl;"><span style="width:100%;text-align:center;border-bottom:2px solid #0f172a;padding:1px 0;">${numHtml}</span><span style="width:100%;text-align:center;padding:1px 0;">${denHtml}</span></span>`;
        }

        case 'n_root': {
           const rootNode = element.children.find((c: any) => c.type === 'root_index');
           const expNode = element.children.find((c: any) => c.type === 'expression');
           
           const rootHtml = rootNode ? serializeToLatex([rootNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

      return `<span style="display:inline-flex;align-items:center;vertical-align:middle;direction:rtl;margin:0 4px;"><span style="position:relative;display:inline-flex;flex-direction:column;width:24px;align-items:center;align-self:stretch;justify-content:center;"><span style="position:absolute;top:0;left:0;z-index:10;font-size:0.75rem;transform:translateY(-30%) translateX(-10%) scale(0.85);transform-origin:bottom right;white-space:nowrap;">${rootHtml}</span><svg style="width:100%;height:100%;fill:none;stroke:#0f172a;stroke-width:2;" viewBox="0 0 20 60" preserveAspectRatio="none"><path d="M0 10 L10 50 L20 30" vectorEffect="non-scaling-stroke" /></svg></span><span style="border-top:2px solid #0f172a;padding:4px 4px 1px;display:inline-flex;align-items:center;justify-content:center;min-height:30px;min-width:28px;">${expHtml}</span></span>`; }
        
        case 'integral': {
           const lowerNode = element.children.find((c: any) => c.type === 'lower');
           const upperNode = element.children.find((c: any) => c.type === 'upper');
           const expNode = element.children.find((c: any) => c.type === 'expression');
           
           const lowerHtml = lowerNode ? serializeToLatex([lowerNode]) : '';
           const upperHtml = upperNode ? serializeToLatex([upperNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;direction:rtl;margin:0 4px;"><span style="position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-family:serif;padding:0 8px;"><span style="position:absolute;top:0;font-size:0.75rem;z-index:10;transform:translateY(-100%);">${upperHtml}</span><span style="font-size:2.5rem;line-height:normal;display:inline-block;transform:scaleX(-1) scaleY(1.25);">∫</span><span style="position:absolute;bottom:0;font-size:0.75rem;z-index:10;transform:translateY(100%);">${lowerHtml}</span></span><span style="padding-right:4px;">${expHtml}</span></span>`;
        }

        case 'superscript': {
           const baseNode = element.children.find((c: any) => c.type === 'base');
           const powerNode = element.children.find((c: any) => c.type === 'power');
           
           const baseHtml = baseNode ? serializeToLatex([baseNode]) : '';
           const powerHtml = powerNode ? serializeToLatex([powerNode]) : '';

return `<span style="display:inline-block;position:relative;font-size:1rem;font-family:serif;vertical-align:baseline;direction:rtl;margin:0 0.5em;"><span style="display:inline-block;padding-right:0px;padding-bottom:1px;">${baseHtml}</span><span style="position:absolute;top:0;left:0;z-index:10;font-size:0.75rem;font-weight:bold;color:#0f172a;transform:translateY(-20%) translateX(-30%) scale(0.85);transform-origin:bottom right;direction:rtl;white-space:nowrap;">${powerHtml}</span></span>`;
}
        
        case 'subscript_block': {
           const baseNode = element.children.find((c: any) => c.type === 'base');
           const subNode = element.children.find((c: any) => c.type === 'sub');
           
           const baseHtml = baseNode ? serializeToLatex([baseNode]) : '';
           const subHtml = subNode ? serializeToLatex([subNode]) : '';

       return `<span style="display:inline-block;position:relative;font-size:1rem;font-family:serif;vertical-align:baseline;direction:rtl;margin:0 0.5em;"><span style="display:inline-block;padding-right:0px;padding-bottom:1px;">${baseHtml}</span><span style="position:absolute;bottom:0;left:0;z-index:10;font-size:0.75rem;font-weight:bold;color:#0f172a;transform:translateY(25%) translateX(-35%) scale(0.85);transform-origin:top right;direction:rtl;white-space:nowrap;">${subHtml}</span></span>`;
      
      }

        case 'limit': {
            const subNode = element.children.find((c: any) => c.type === 'subscript');
            const expNode = element.children.find((c: any) => c.type === 'expression');
            
            const subHtml = subNode ? serializeToLatex([subNode]) : '';
            const expHtml = expNode ? serializeToLatex([expNode]) : '';
return `<span style="display:inline-flex;align-items:center;vertical-align:middle;direction:rtl;margin:0 4px;"><span style="position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-family:serif;padding:0 8px;"><span style="font-size:1.25rem;font-weight:bold;line-height:normal;select-none;color:#0f172a;">نها</span><span style="position:absolute;bottom:0;left:0;z-index:10;font-size:0.875rem;transform:translateY(50%) translateX(-30%);transform-origin:top right;white-space:nowrap;">${subHtml}</span></span><span style="padding-right:4px; padding-bottom: 5px;">${expHtml}</span></span>`; }

        case 'summation': {
           const lowerNode = element.children.find((c: any) => c.type === 'lower');
           const upperNode = element.children.find((c: any) => c.type === 'upper');
           const expNode = element.children.find((c: any) => c.type === 'expression');
           
           const lowerHtml = lowerNode ? serializeToLatex([lowerNode]) : '';
           const upperHtml = upperNode ? serializeToLatex([upperNode]) : '';
           const expHtml = expNode ? serializeToLatex([expNode]) : '';

           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;direction:rtl;margin:0 4px;"><span style="position:relative;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;font-family:serif;padding:0 8px;"><span style="position:absolute;top:0;font-size:0.75rem;z-index:10;transform:translateY(-100%);">${upperHtml}</span><span style="font-size:2.5rem;line-height:normal;display:inline-block;transform:scaleX(-1);">∑</span><span style="position:absolute;bottom:0;font-size:0.75rem;z-index:10;transform:translateY(100%);">${lowerHtml}</span></span><span style="padding-right:4px;">${expHtml}</span></span>`;
        }
        
        case 'matrix': {
           return `<span style="display:inline-flex;align-items:center;vertical-align:middle;direction:rtl;margin:0 4px;"><span style="font-size:2.5rem;font-family:serif;color:#0f172a;padding-right:4px;align-self:stretch;display:flex;align-items:center;">[</span><table style="border-collapse:collapse;"><tbody>${childrenHtml}</tbody></table><span style="font-size:2.5rem;font-family:serif;color:#0f172a;padding-left:4px;align-self:stretch;display:flex;align-items:center;">]</span></span>`;
        }

        case 'matrix_row': {
            return `<tr>${childrenHtml}</tr>`;
        }

        case 'matrix_cell': {
            return `<td style="padding:4px;text-align:center;vertical-align:middle;white-space:nowrap;min-width:30px;">${childrenHtml}</td>`;
        }

        case 'lower':
        case 'upper': 
        case 'expression':
        case 'subscript':
        case 'base':
        case 'power':
        case 'sub':
        case 'root_index':
        case 'numerator': 
        case 'denominator': 
            return `<span style="${TRANSPARENT_BOX_STYLE}">${childrenHtml}</span>`;

        default:
          return childrenHtml;
      }
    }
    return ''; 
  }).join('');
};