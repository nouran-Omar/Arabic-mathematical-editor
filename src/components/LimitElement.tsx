// src/components/LimitElement.tsx

import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';

export const LimitElement = ({ attributes, children, element }: RenderElementProps) => {

    const childrenArray = React.Children.toArray(children);
    

    let lowerComp = childrenArray[0]; 
    let exprComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
      // نبحث عن العناصر حسب النوع (subscript و expression)
      const lowerIndex = element.children.findIndex((c: any) => c.type === 'subscript');
      const exprIndex = element.children.findIndex((c: any) => c.type === 'expression');
      
      // نستخدم المكونات التي تم إيجادها بالبحث
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
          
               <span 
    className="text-sm font-serif z-10 pt-1" 
    dir="ltr" 
>
    {lowerComp} 
</span>
            </span>
           
            <span className="pl-1">
                {exprComp}
            </span>
        </span>
    );
};