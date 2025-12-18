// src/math-data.ts

import type { Descendant } from 'slate';

export interface ToolbarItemData {
  name: string;
  template: string;
  label: string;
  isStructural: boolean;
  nodeType?: string;
}

export const MATH_TOOLBAR_ITEMS: ToolbarItemData[] = [
  // =================================================
  // 1. البنى الهيكلية (Structural Elements)
  // =================================================
  { name: "كسر", template: "", label: "بسط/مقام", isStructural: true, nodeType: 'fraction' },
  { name: "جذر نوني", template: "", label: "ⁿ√", isStructural: true, nodeType: 'n_root' },

  
  // الأسس
  { name: "أس (Power)", template: "", label: "سⁿ", isStructural: true, nodeType: 'superscript' },
  { name: "أس سفلي", template: "", label: "سₙ", isStructural: true, nodeType: 'subscript_block' },

  // التفاضل والتكامل والنهايات
  { name: "مجموع (سيجما)", template: "", label: "∑", isStructural: true, nodeType: 'summation' },
  { name: "تكامل", template: "", label: "∫", isStructural: true, nodeType: 'integral' },
  { name: "نهاية", template: "", label: "نها", isStructural: true, nodeType: 'limit' },

  // =================================================
  // 2. الرموز والعمليات (Symbols & Operations)
  // =================================================
  // --- الدوال المثلثية ---
  { name: "جا (sin)", template: "جا", label: "جا", isStructural: false },
  { name: "جتا (cos)", template: "جتا", label: "جتا", isStructural: false },
  { name: "ظا (tan)", template: "ظا", label: "ظا", isStructural: false },
  { name: "ظتا (cot)", template: "ظتا", label: "ظتا", isStructural: false },
  { name: "قا (sec)", template: "قا", label: "قا", isStructural: false },
  { name: "قتا (csc)", template: "قتا", label: "قتا", isStructural: false },

  // --- العمليات الحسابية ---
  { name: "جمع", template: "+", label: "+", isStructural: false },
  { name: "طرح", template: "-", label: "-", isStructural: false },
  { name: "ضرب", template: "×", label: "×", isStructural: false },
  { name: "قسمة", template: "÷", label: "÷", isStructural: false },
  { name: "يساوي", template: "=", label: "=", isStructural: false },
  { name: "لا يساوي", template: "≠", label: "≠", isStructural: false },
  { name: "موجب أو سالب", template: "±", label: "±", isStructural: false },
  { name: "نسبة مئوية", template: "٪", label: "٪", isStructural: false },

  // --- المقارنات ---
  { name: "أكبر من", template: ">", label: ">", isStructural: false }, 
  { name: "أصغر من", template: "<", label: "<", isStructural: false },
  { name: "أكبر أو يساوي", template: "≥", label: "≥", isStructural: false }, 
  { name: "أصغر أو يساوي", template: "≤", label: "≤", isStructural: false }, 
  { name: "تقريبي", template: "≈", label: "≈", isStructural: false },

  // --- المجموعات والمنطق ---
  { name: "ينتمي", template: "∈", label: "∈", isStructural: false },
  { name: "لا ينتمي", template: "∉", label: "∉", isStructural: false },
  { name: "جزئية", template: "⊂", label: "⊂", isStructural: false },
  { name: "ليست جزئية", template: "⊄", label: "⊄", isStructural: false },
  { name: "اتحاد", template: "∪", label: "∪", isStructural: false },
  { name: "تقاطع", template: "∩", label: "∩", isStructural: false },
  { name: "فاي (خالية)", template: "∅", label: "∅", isStructural: false },
  { name: "لكل", template: "∀", label: "∀", isStructural: false },
  { name: "يوجد", template: "∃", label: "∃", isStructural: false },

  // --- رموز أخرى ---
  { name: "لانهابة", template: "∞", label: "∞", isStructural: false },
  { name: "باي", template: "π", label: "π", isStructural: false },
  { name: "زاوية", template: "∠", label: "∠", isStructural: false },
  { name: "مثلث", template: "△", label: "△", isStructural: false },
  { name: "درجة", template: "°", label: "°", isStructural: false },
];

export type CustomElement = 
  | { type: 'fraction'; children: Descendant[] }
  | { type: 'numerator'; children: Descendant[] }
  | { type: 'denominator'; children: Descendant[] }
  | { type: 'sqrt'; children: Descendant[] }
  | { type: 'n_root'; children: Descendant[] }
  | { type: 'root_index'; children: Descendant[] }
  // === التعديل هنا: إضافة matrix_row ===
  | { type: 'matrix'; children: Descendant[] }      // الحاوية الكبيرة
  | { type: 'matrix_row'; children: Descendant[] }  // الصف
  | { type: 'matrix_cell'; children: Descendant[] } // الخلية
  // ===================================
  | { type: 'summation'; children: Descendant[] }
  | { type: 'integral'; children: Descendant[] }
  | { type: 'lower'; children: Descendant[] }
  | { type: 'upper'; children: Descendant[] }
  | { type: 'expression'; children: Descendant[] }
  | { type: 'limit'; children: Descendant[] }
  | { type: 'subscript'; children: Descendant[] }
  | { type: 'superscript'; children: Descendant[] }
  | { type: 'subscript_block'; children: Descendant[] }
  | { type: 'base'; children: Descendant[] }
  | { type: 'power'; children: Descendant[] }
  | { type: 'sub'; children: Descendant[] }
  | { type: 'paragraph'; children: Descendant[] };

export type CustomText = { text: string; bold?: boolean };

declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}

export const INITIAL_EDITOR_VALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ],
  },
];
// // src/math-data.ts

// import type { Descendant } from 'slate';

// // 1. واجهة البيانات
// export interface ToolbarItemData {
//   name: string;
//   template: string;
//   label: string;
//   isStructural: boolean;
//   nodeType?: string;
//   icon?: string; // أضفنا icon لتمييز الأزرار
// }

// // 2. القائمة الكاملة بالرموز
// export const MATH_TOOLBAR_ITEMS: ToolbarItemData[] = [
//   // --- بنى هيكلية (Structural) ---
//   { name: "كسر", template: "", label: "بسط/مقام", isStructural: true, nodeType: 'fraction' },
//   { name: "جذر تربيعي", template: "", label: "√", isStructural: true, nodeType: 'sqrt' },
//   { name: "مجموع (سيجما)", template: "", label: "∑", isStructural: true, nodeType: 'summation' },
//   { name: "نهاية (Limit)", template: "", label: "نها", isStructural: true, nodeType: 'limit' },
  
//   // === الإضافات الجديدة المطلوبة ===
//   { name: "أس (Superscript)", template: "", label: "س²", isStructural: true, nodeType: 'superscript' },
//   { name: "أس سفلي (Subscript)", template: "", label: "س₂", isStructural: true, nodeType: 'subscript_block' },
//   // ===============================

//   // --- دوال مثلثية ---
//   { name: "جا (sin)", template: "جا", label: "جا", isStructural: false },
//   { name: "جتا (cos)", template: "جتا", label: "جتا", isStructural: false },
//   { name: "ظا (tan)", template: "ظا", label: "ظا", isStructural: false },
//   { name: "ظتا (cot)", template: "ظتا", label: "ظتا", isStructural: false },
//   { name: "قا (sec)", template: "قا", label: "قا", isStructural: false },
//   { name: "قتا (csc)", template: "قتا", label: "قتا", isStructural: false },

//   // --- عمليات حسابية ---
//   { name: "جمع", template: "+", label: "+", isStructural: false },
//   { name: "طرح", template: "-", label: "-", isStructural: false },
//   { name: "ضرب", template: "×", label: "×", isStructural: false },
//   { name: "قسمة", template: "÷", label: "÷", isStructural: false },
//   { name: "يساوي", template: "=", label: "=", isStructural: false },
//   { name: "لا يساوي", template: "≠", label: "≠", isStructural: false },
//   { name: "نسبة مئوية", template: "٪", label: "٪", isStructural: false },
//   { name: "موجب أو سالب", template: "±", label: "±", isStructural: false },

//   // --- رموز أخرى ---
//   { name: "أكبر من", template: ">", label: ">", isStructural: false }, 
//   { name: "أصغر من", template: "<", label: "<", isStructural: false },
//   { name: "أكبر أو يساوي", template: "≥", label: "≥", isStructural: false }, 
//   { name: "أصغر أو يساوي", template: "≤", label: "≤", isStructural: false }, 
//   { name: "تقريبي", template: "≈", label: "≈", isStructural: false },
//   { name: "ينتمي", template: "∈", label: "∈", isStructural: false },
//   { name: "لا ينتمي", template: "∉", label: "∉", isStructural: false },
//   { name: "جزئية", template: "⊂", label: "⊂", isStructural: false },
//   { name: "ليست جزئية", template: "⊄", label: "⊄", isStructural: false },
//   { name: "اتحاد", template: "∪", label: "∪", isStructural: false },
//   { name: "تقاطع", template: "∩", label: "∩", isStructural: false },
//   { name: "فاي (خالية)", template: "∅", label: "∅", isStructural: false },
//   { name: "لكل", template: "∀", label: "∀", isStructural: false },
//   { name: "يوجد", template: "∃", label: "∃", isStructural: false },
//   { name: "تكامل", template: "∫", label: "∫", isStructural: false },
//   { name: "لانهابة", template: "∞", label: "∞", isStructural: false },
//   { name: "باي", template: "π", label: "π", isStructural: false },
//   { name: "زاوية", template: "∠", label: "∠", isStructural: false },
//   { name: "مثلث", template: "△", label: "△", isStructural: false },
//   { name: "درجة", template: "°", label: "°", isStructural: false },
// ];

// export type CustomElement = 
//   | { type: 'fraction'; children: Descendant[] }
//   | { type: 'numerator'; children: Descendant[] }
//   | { type: 'denominator'; children: Descendant[] }
//   | { type: 'sqrt'; children: Descendant[] }
//   | { type: 'summation'; children: Descendant[] }
//   | { type: 'lower'; children: Descendant[] }
//   | { type: 'upper'; children: Descendant[] }
//   | { type: 'expression'; children: Descendant[] }
//   | { type: 'limit'; children: Descendant[] }
//   | { type: 'subscript'; children: Descendant[] }
//   // === الأنواع الجديدة ===
//   | { type: 'superscript'; children: Descendant[] }
//   | { type: 'subscript_block'; children: Descendant[] }
//   | { type: 'base'; children: Descendant[] }
//   | { type: 'power'; children: Descendant[] }
//   | { type: 'sub'; children: Descendant[] }
//   // ====================
//   | { type: 'paragraph'; children: Descendant[] };

// export type CustomText = { text: string; bold?: boolean };

// declare module 'slate' {
//   interface CustomTypes {
//     Element: CustomElement;
//     Text: CustomText;
//   }
// }

// export const INITIAL_EDITOR_VALUE: Descendant[] = [
//   {
//     type: 'paragraph',
//     children: [
//       { text: 'مرحباً، جرب كتابة معادلة: س² + ص = ٥' },
//     ],
//   },
// ];