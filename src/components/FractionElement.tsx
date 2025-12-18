// src/components/FractionElement.tsx

import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';

export const FractionElement = ({ attributes, children, element }: RenderElementProps) => {

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
      className="inline-flex flex-col items-center mx-1 align-middle"
      style={{ verticalAlign: 'middle' }} 
    >

        <span className="w-full 
           border-b-2 border-slate-900 
           pt-1 pb-1 
           flex justify-center items-end 
           text-center min-w-[24px]">

           {numComp}
        </span>
        

        <span className="w-full 
           pt-1 pb-1
           flex justify-center items-start 
           text-center min-w-[24px]">

           {denComp}
        </span>
    </span>
  );
};