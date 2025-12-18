// src/App.tsx

import { useState } from 'react';
import { MainEditorPage } from './components/MainEditorPage';
import { INITIAL_EDITOR_VALUE } from './math-data'; // <--- استيراد القيمة الأولية
import type{ Descendant } from 'slate';

function App() {

  const [editorContent, setEditorContent] = useState<Descendant[]>(INITIAL_EDITOR_VALUE);
  
  const handleContentChange = (newContent: Descendant[]) => {
    setEditorContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <MainEditorPage 
        content={editorContent} 
        onContentChange={handleContentChange} 
      />
    </div>
  );
}

export default App;