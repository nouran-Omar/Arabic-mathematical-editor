
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';

export const SuperscriptElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let baseComp = childrenArray[0]; 
    let powerComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
      const baseIndex = element.children.findIndex((c: any) => c.type === 'base');
      const powerIndex = element.children.findIndex((c: any) => c.type === 'power');

      if (baseIndex !== -1) baseComp = childrenArray[baseIndex];
      if (powerIndex !== -1) powerComp = childrenArray[powerIndex];
    }

    return (
        <span 
            {...attributes} 
            className="inline-block relative text-base font-serif align-baseline" 
            style={{ direction: 'rtl', margin: '0 0.5em' }}
        >
            
            <span className="inline-block align-baseline pr-1 pb-0.5">
               {baseComp}
            </span>
            

            <span 
               className="absolute top-0 left-0 z-10 text-xs font-bold text-slate-900" 
               style={{ 
                 transform: 'translateY(-100%) translateX(-100%) scale(0.85)', 
                 transformOrigin: 'bottom right',
                 direction: 'rtl',
                 whiteSpace: 'nowrap'
               }}
            >
              {powerComp}
            </span>
        </span>
    );
};