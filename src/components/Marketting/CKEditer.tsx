import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const InputEditor: React.FC = () => {
    const [editorContent, setEditorContent] = useState<string>('');

    const handleSave = () => {
        // Tạo một đối tượng Blob chứa nội dung HTML từ trình soạn thảo
        const blob = new Blob([editorContent], { type: 'text/html' });
        // Tạo một URL cho Blob
        const url = URL.createObjectURL(blob);
        // Tạo một phần tử <a> để tải xuống tệp HTML
        const link = document.createElement('a');
        link.href = url;
        link.download = 'content.html'; // Tên tệp bạn muốn lưu 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Hủy URL để giải phóng tài nguyên
    };

    return (
        <div className='my-10 h-[500px]'>
            <CKEditor
                editor={Editor}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                onChange={(_, editor: any) => {
                    console.log(editor.getData())
                    const data = editor.getData();
                    setEditorContent(data);
                }}
            />
            <button onClick={handleSave}>Lưu</button>
        </div>
    );
}

export default InputEditor;
