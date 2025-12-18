

import React, { forwardRef, useRef, useImperativeHandle } from 'react';

interface TextEditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

export const TextEditor = forwardRef<HTMLTextAreaElement, TextEditorProps>(({ content, onContentChange }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ربط الـ ref الداخلي بالـ ref الخارجي الذي تم تمريره (ref)
  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef} 
      value={content}
      onChange={handleChange}
      className="flex-1 p-5 text-lg focus:outline-none placeholder-gray-500 font-serif"

      style={{ 
        direction: 'rtl', 
        textAlign: 'right', 
        lineHeight: 1.6,
        resize: 'none',

        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif'
      }}
      placeholder=".."
    />
  );
});

TextEditor.displayName = 'TextEditor';