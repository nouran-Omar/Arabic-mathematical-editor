// src/components/SubscriptBlockElement.tsx
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { Element as SlateElement } from 'slate';
export const SubscriptBlockElement = ({ attributes, children, element }: RenderElementProps) => {
    const childrenArray = React.Children.toArray(children);
    let baseComp = childrenArray[0]; 
    let subComp = childrenArray[1]; 

    if (SlateElement.isElement(element)) {
        const baseIndex = element.children.findIndex((c: any) => c.type === 'base');
        const subIndex = element.children.findIndex((c: any) => c.type === 'sub');
        if (baseIndex !== -1) baseComp = childrenArray[baseIndex];
        if (subIndex !== -1) subComp = childrenArray[subIndex];
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
               className="absolute bottom-0 left-0 z-10 text-xs font-bold text-slate-900" 
               style={{ 
                 transform: 'translateY(100%) translateX(-100%) scale(0.85)',
                 transformOrigin: 'top right',
                 direction: 'rtl',
                 whiteSpace: 'nowrap'
               }}
            >
              {subComp}
            </span>
        </span>
    );
};