// src/components/NRootElement.tsx

import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';

export const NRootElement = ({ attributes, children, element }: RenderElementProps) => {

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
                <span 
                   // ✅ تعديل: وضع الأُس (indexComp) أعلى قليلاً (top-[-5px]) وسحبه قليلاً لليمين (right-[-10px])
                   className="absolute top-[-5px] right-[-10px] z-50 flex items-center justify-center text-sm" 
                   style={{ zIndex: 100, minWidth: '20px', minHeight: '20px' }} 
                >
                    {indexComp}
                </span>

                {/* ✅ تعديل: زيادة ارتفاع الـ viewBox إلى 60 وحدة */}
                <svg className="w-full h-full text-slate-900 fill-transparent stroke-current stroke-2" viewBox="0 0 20 60" preserveAspectRatio="none">
                    {/* ✅ تعديل: إنزال مسار الجذر بمقدار 10 وحدات (M0 10) لترك مساحة علوية للأُس */}
                    <path d="M0 10 L10 50 L20 30" vectorEffect="non-scaling-stroke" />
                </svg>
            </span>

            <span 
                // ✅ تعديل: زيادة الهامش العلوي (pt-2) لإنزال خط الجذر قليلاً ليغطي الـ Base بشكل أفضل
                className="border-t-2 border-slate-900 px-1 flex items-center justify-center min-h-[30px] pt-2 pb-1" 
            >
                {exprComp}
            </span>
        </span>
    );
};