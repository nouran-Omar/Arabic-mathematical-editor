
// ===================================================التحت هو ال شغال  ===================================================================================

import React, { useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createEditor, Transforms, Editor, Path, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import type { Descendant } from 'slate';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';


import { SuperscriptElement } from './SuperscriptElement';
import { SubscriptBlockElement } from './SubscriptBlockElement';


const YELLOW_BOX = "min-w-[28px] min-h-[28px] px-1 mx-0.5 text-center inline-flex items-center justify-center rounded-md border border-amber-400 bg-amber-100/80 text-sm shadow-sm";
const RED_BOX = "min-w-[28px] min-h-[28px] px-1 mx-0.5 text-center inline-flex items-center justify-center rounded-md border border-red-300 bg-red-100/80 text-sm shadow-sm";
const BLUE_BOX = "min-w-[28px] min-h-[28px] px-1 mx-0.5 text-center inline-flex items-center justify-center rounded-md border border-blue-300 bg-blue-100/80 text-sm shadow-sm";


const withMath = (editor: Editor) => {
  const { isInline } = editor;
  editor.isInline = (element: any) => {
    const inlineTypes = [
        'fraction', 'numerator', 'denominator', 
        'sqrt', 'n_root', 'root_index',
        'matrix', 'matrix_row', 'matrix_cell', 
        'summation', 'integral', 'limit', 
        'lower', 'upper', 'expression', 'subscript', 
        'superscript', 'subscript_block', 'base', 'power', 'sub','bracket_pair'
    ];
    return inlineTypes.includes(element.type) ? true : isInline(element);
  };
  return editor;
};

export const insertCustomNode = (editor: Editor, nodeType: string) => {
  let newNode: any;

  switch (nodeType) {
    case 'fraction':
      newNode = { type: 'fraction', children: [
        { type: 'numerator', children: [{ text: '' }] },
        { type: 'denominator', children: [{ text: '' }] },
      ]};
      break;
    case 'n_root':
      newNode = { type: 'n_root', children: [
        { type: 'root_index', children: [{ text: '' }] },
        { type: 'expression', children: [{ text: 'س' }] },
      ]};
      break;
    case 'superscript':
      newNode = { type: 'superscript', children: [
        { type: 'base', children: [{ text: 'س' }] },
        { type: 'power', children: [{ text: '' }] },
      ]};
      break;
    case 'summation':
      newNode = { type: 'summation', children: [
        { type: 'lower', children: [{ text: 'ك=1' }] },
        { type: 'upper', children: [{ text: 'ن' }] },
        { type: 'expression', children: [{ text: 'س' }] },
      ]};
      break;
      
    case 'integral':
        newNode = { type: 'integral', children: [
          { type: 'lower', children: [{ text: '0' }] },
          { type: 'upper', children: [{ text: '∞' }] },
          { type: 'expression', children: [{ text: 'د س' }] },
        ]};
        break;

    case 'limit': 
        newNode = { type: 'limit', children: [
         { type: 'subscript', children: [{ text: 'س←∞' }] },
            { type: 'expression', children: [{ text: 'د(س)' }] },
        ]};
        break;

    case 'subscript_block':
        newNode = { type: 'subscript_block', children: [
          { type: 'base', children: [{ text: 'س' }] },
          { type: 'sub', children: [{ text: '' }] },
        ]};
        break;

    case 'matrix':
      newNode = { type: 'matrix', children: [
        { type: 'matrix_row', children: [
          { type: 'matrix_cell', children: [{ text: '1' }] },
          { type: 'matrix_cell', children: [{ text: '2' }] },
        ] },
        { type: 'matrix_row', children: [
          { type: 'matrix_cell', children: [{ text: '3' }] },
          { type: 'matrix_cell', children: [{ text: '4' }] },
        ] },
      ]};
      break;
    default:
      return;
  }
  
  Transforms.insertNodes(editor, newNode);

  Transforms.select(editor, Path.next(Editor.path(editor, editor.selection!.anchor.path.slice(0, -1))));
};


const FractionElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let numComp = childrenArray[0]; 
    let denComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
      const nIndex = element.children.findIndex((c: any) => c.type === 'numerator');
      const dIndex = element.children.findIndex((c: any) => c.type === 'denominator');
      
      if (nIndex !== -1) numComp = childrenArray[nIndex];
      if (dIndex !== -1) denComp = childrenArray[dIndex];
    }

    return (
        <span
            {...attributes}
            className="inline-flex flex-col items-center align-middle mx-2"
            style={{ direction: 'rtl', verticalAlign: 'middle' }}
        >
                      <span className="w-full text-center border-b-2 border-slate-900 pb-0.5 pt-0.5 flex justify-center">
                {numComp}
            </span>

            <span className="w-full text-center pt-0.5 pb-0.5 flex justify-center">
                {denComp}
            </span>
        </span>
    );
};


const SummationElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let lowerComp = childrenArray[0]; 
    let upperComp = childrenArray[1]; 
    let exprComp = childrenArray[2]; 

    if (SlateElement.isElement(element)) {
      const lowerIndex = element.children.findIndex((c: any) => c.type === 'lower');
      const upperIndex = element.children.findIndex((c: any) => c.type === 'upper');
      const exprIndex = element.children.findIndex((c: any) => c.type === 'expression');
      
      if (lowerIndex !== -1) lowerComp = childrenArray[lowerIndex];
      if (upperIndex !== -1) upperComp = childrenArray[upperIndex];
      if (exprIndex !== -1) exprComp = childrenArray[exprIndex];
    }

    return (
        <span
            {...attributes}
            className="inline-flex items-center align-middle mx-2"
            style={{ direction: 'rtl', verticalAlign: 'middle' }}
        >
            <span className="relative inline-flex flex-col justify-center items-center text-4xl font-serif px-2">
                {/* الحد العلوي */}
                <span className="absolute top-[-0.8em] text-sm font-serif z-10">
                    {upperComp}
                </span>
                {/* رمز السيجما */}
                <span className="text-4xl" style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>
                    ∑
                </span>
                {/* الحد السفلي */}
                <span className="absolute bottom-[-0.8em] text-sm font-serif z-10">
                    {lowerComp}
                </span>
            </span>
            {/* التعبير */}
            <span className="pl-1">
                {exprComp}
            </span>
        </span>
    );
};

// 3. رمز التكامل (IntegralElement) - بحث ذكي
const IntegralElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let lowerComp = childrenArray[0]; 
    let upperComp = childrenArray[1]; 
    let exprComp = childrenArray[2]; 

    if (SlateElement.isElement(element)) {
      const lowerIndex = element.children.findIndex((c: any) => c.type === 'lower');
      const upperIndex = element.children.findIndex((c: any) => c.type === 'upper');
      const exprIndex = element.children.findIndex((c: any) => c.type === 'expression');
      
      if (lowerIndex !== -1) lowerComp = childrenArray[lowerIndex];
      if (upperIndex !== -1) upperComp = childrenArray[upperIndex];
      if (exprIndex !== -1) exprComp = childrenArray[exprIndex];
    }

    return (
        <span
            {...attributes}
            className="inline-flex items-center align-middle mx-2"
            style={{ direction: 'rtl', verticalAlign: 'middle' }}
        >
            <span className="relative inline-flex flex-col justify-center items-center font-serif px-2">
                <span className="absolute top-[-1.2em] text-sm font-serif z-10">
                    {upperComp}
                </span>
                <span className="text-4xl leading-none" style={{ display: 'inline-block', transform: 'scaleX(-1) scaleY(1.25)' }}>
                    ∫
                </span>
                <span className="absolute bottom-[-1.2em] text-sm font-serif z-10">
                    {lowerComp}
                </span>
            </span>
            <span className="pl-1">
                {exprComp}
            </span>
        </span>
    );
};

// 4. رمز الجذر النوني (NRootElement) - بحث ذكي
const NRootElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let indexComp = childrenArray[0]; 
    let exprComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
      const index = element.children.findIndex((c: any) => c.type === 'root_index');
      const expr = element.children.findIndex((c: any) => c.type === 'expression');
      
      if (index !== -1) indexComp = childrenArray[index];
      if (expr !== -1) exprComp = childrenArray[expr];
    }
    
    return (
        <span 
            {...attributes} 
            className="inline-flex items-center mx-2" 
            style={{ direction: 'rtl', verticalAlign: 'middle' }}
        >
            <span className="relative flex flex-col w-[24px] self-stretch items-center justify-center">
                {/* دليل الجذر (Root Index) */}
                <span 
                   className="absolute bottom-full right-[-10px] mb-[-6px] z-50 flex items-center justify-center text-sm" 
                   style={{ zIndex: 100, minWidth: '20px', minHeight: '20px' }} 
                >
                    {indexComp}
                </span>

                {/* رمز الجذر SVG */}
                <svg className="w-full h-full text-slate-900 fill-transparent stroke-current stroke-2" viewBox="0 0 20 40" preserveAspectRatio="none">
                    <path d="M0 0 L10 40 L20 20" vectorEffect="non-scaling-stroke" />
                </svg>
            </span>
            
            {/* التعبير تحت الجذر */}
            <span 
                className="border-t-2 border-slate-900 px-1 flex items-center justify-center min-h-[30px] pt-1 pb-0.5" 
            >
                {exprComp}
            </span>
        </span>
    );
};

// 5. رمز النهاية (LimitElement) - بحث ذكي
const LimitElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let lowerComp = childrenArray[0]; 
    let exprComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
      const lowerIndex = element.children.findIndex((c: any) => c.type === 'subscript');
      const exprIndex = element.children.findIndex((c: any) => c.type === 'expression');
      
      if (lowerIndex !== -1) lowerComp = childrenArray[lowerIndex];
      if (exprIndex !== -1) exprComp = childrenArray[exprIndex];
    }

    return (
        <span 
            {...attributes} 
            className="inline-flex items-center align-middle mx-2" 
            style={{ direction: 'rtl', verticalAlign: 'middle' }}
        >
            <span className="inline-flex flex-col items-center justify-center font-serif px-2">
                {/* رمز النهاية (نها) */}
                <span className="text-xl font-bold leading-none select-none text-slate-800" contentEditable={false}>
                    نها
                </span>
                {/* الحد السفلي (Limit to...) */}
           <span 
    className="text-sm font-serif z-10 pt-1" 
    dir="ltr" // <--- إضافة هذه الخاصية هنا
>
    {lowerComp} 
</span>
            </span>
            
            {/* التعبير */}
            <span className="pl-1">
                {exprComp}
            </span>
        </span>
    );
};



// 🔲 مكونات المصفوفة
const MatrixCellElement = ({ attributes, children }: RenderElementProps) => {
  return (
    <td 
      {...attributes} 
      className="p-1 text-center align-middle whitespace-nowrap" 
      style={{ minWidth: '30px' }}
    >
      <span className={YELLOW_BOX}> 
        {children}
      </span>
    </td>
  );
};

const MatrixRowElement = ({ attributes, children }: RenderElementProps) => {
  return (
    <tr {...attributes}>
      {children}
    </tr>
  );
};

const MatrixElement = ({ attributes, children }: RenderElementProps) => {
  return (
    <span 
      {...attributes} 
      className="inline-flex items-center align-middle mx-2" 
      style={{ direction: 'rtl' }}
    >
      <span className="text-4xl font-serif text-slate-800 self-stretch flex items-center pr-1 h-full">
        [
      </span>
      
      <table className="border-collapse">
        <tbody {...attributes}>
          {children}
        </tbody>
      </table>
      
      <span className="text-4xl font-serif text-slate-800 self-stretch flex items-center pl-1 h-full">
        ]
      </span>
    </span>
  );
};

// RichTextEditor.tsx

// ... (بعد MatrixElement وقبل renderElement)

// 🔲 مكون زوج الأقواس المتمدد (BracketPairElement)
const BracketPairElement = ({ attributes, children, element }: RenderElementProps) => {
  const { openChar, closeChar } = element as any;
  
  if (!openChar || !closeChar) {
    return <span {...attributes}>{children}</span>; // للتعامل مع العناصر القديمة أو المفقودة
  }
  
  // نستخدم flexbox و self-stretch لجعل الأقواس تتمدد عمودياً
  return (
    <span 
      {...attributes} 
      className="inline-flex items-center align-middle mx-1" 
      style={{  verticalAlign: 'middle' }}
    >
      {/* 🛑 القوس الأيمن (Open/Closing in RTL) */}
      <span className="text-4xl font-serif text-slate-800 self-stretch flex items-center pr-0.5 justify-end" contentEditable={false}>
        {closeChar} {/* القوس الأيمن في RTL */}
      </span>
      
      {/* المحتوى الداخلي */}
      <span className="inline-flex items-center align-middle">
        {children}
      </span>
      
      {/* 🛑 القوس الأيسر (Close/Opening in RTL) */}
      <span className="text-4xl font-serif text-slate-800 self-stretch flex items-center pl-0.5 justify-start" contentEditable={false}>
        {openChar} {/* القوس الأيسر في RTL */}
      </span>
    </span>
  );
};
// ========================================================
// 3. دالة RenderElement (الربط البصري)
// ========================================================

const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'paragraph': return <p {...props.attributes}>{props.children}</p>;
    
    case 'fraction': return <FractionElement {...props} />;
    case 'bracket_pair': return <BracketPairElement {...props} />;
    case 'summation': return <SummationElement {...props} />; 
    case 'integral': return <IntegralElement {...props} />;
    case 'n_root': return <NRootElement {...props} />;
    case 'limit': return <LimitElement {...props} />; 
    
    case 'superscript': return <SuperscriptElement {...props} />;
    case 'subscript_block': return <SubscriptBlockElement {...props} />;
    
    // المصفوفات
    case 'matrix': return <MatrixElement {...props} />;
    case 'matrix_row': return <MatrixRowElement {...props} />;
    case 'matrix_cell': return <MatrixCellElement {...props} />;
    

    case 'numerator': 
        return <span {...props.attributes} className={RED_BOX} style={{ direction: 'rtl', display: 'inline-block', textAlign: 'center' }}>{props.children}</span>;
  
    case 'denominator': 
        return <span {...props.attributes} className={BLUE_BOX} style={{ direction: 'rtl', display: 'inline-block', textAlign: 'center' }}>{props.children}</span>;


    case 'lower':
    case 'upper': 
    case 'base':
    case 'power':
    case 'sub':
    case 'expression':
    case 'root_index':
    case 'subscript':
      return (
        <span 
          {...props.attributes} 
          className={YELLOW_BOX} 
          style={{ direction: 'rtl', display: 'inline-block', textAlign: 'center' }} 
        >
          {props.children}
        </span>
      );

    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

const renderLeaf = (props: RenderLeafProps) => {
  return <span {...props.attributes}>{props.children}</span>;
};

interface RichTextEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

export const RichTextEditor = forwardRef<Editor, RichTextEditorProps>(({ value, onChange }, ref) => {
  const editor = useMemo(() => withMath(withHistory(withReact(createEditor()))), []);
  useImperativeHandle(ref, () => editor, [editor]);

// RichTextEditor.tsx

// ... (داخل دالة RichTextEditor)

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    // 🛑 معالجة إدخال الأقواس التلقائي
    const { key, shiftKey } = event;
    let openChar: string | null = null;
    let closeChar: string | null = null;

    // Shift + 9 = (
    if (shiftKey && key === '9') {
      openChar = '(';
      closeChar = ')';
    } 
    // Shift + [ = { (إذا كان المستخدم يكتب على لوحة مفاتيح عربية/إنجليزية)
    else if (shiftKey && key === '[') {
      openChar = '{';
      closeChar = '}';
    }
    // [
    else if (key === '[') {
      openChar = '[';
      closeChar = ']';
    }

    if (openChar && closeChar) {
      event.preventDefault();

      const newNode = { 
        type: 'bracket_pair', 
        openChar: openChar,
        closeChar: closeChar,
        children: [{ text: '' }] // محتوى فارغ يمكن الكتابة فيه
      };
      
      Transforms.insertNodes(editor, newNode);

      // وضع المؤشر داخل القوسين
      const newPath = editor.selection!.anchor.path.slice(0, -1);
      Transforms.select(editor, [...newPath, 0]); // تحديد النص داخل العنصر الجديد
    }
  }, [editor]);
  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        className="p-20 outline-none text-right font-sans min-h-full"
        renderElement={renderElement as any} 
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        placeholder="اكتب النص والمعادلات هنا..."
        dir="rtl"
      />
    </Slate>
  );
});

export default RichTextEditor;
