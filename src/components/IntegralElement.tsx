// src/components/IntegralElement.tsx

import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';


export const IntegralElement = ({ attributes, children, element }: RenderElementProps) => {

    const childrenArray = React.Children.toArray(children);
    
    // قيم افتراضية
    let lowerComp = childrenArray[0]; 
    let upperComp = childrenArray[1]; 
    let exprComp = childrenArray[2]; 


    if (SlateElement.isElement(element)) {
      const lowerIndex = element.children.findIndex((c: any) => c.type === 'lower');
      const upperIndex = element.children.findIndex((c: any) => c.type === 'upper');
      const exprIndex = element.children.findIndex((c: any) => c.type === 'expression');
      
      // نستخدم المكونات التي تم إيجادها بالبحث
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
                {/* الحد العلوي (Upper Bound) */}
                <span className="absolute top-[-1.2em] text-sm font-serif z-10">
                    {upperComp}
                </span>
                {/* رمز التكامل (Integral Symbol) */}
                <span className="text-4xl leading-none" style={{ display: 'inline-block', transform: 'scaleX(-1) scaleY(1.25)' }}>
                    ∫
                </span>
                {/* الحد السفلي (Lower Bound) */}
                <span className="absolute bottom-[-1.2em] text-sm font-serif z-10">
                    {lowerComp}
                </span>
            </span>
            {/* التعبير (Expression) */}
            <span className="pl-1">
                {exprComp}
            </span>
        </span>
    );
};