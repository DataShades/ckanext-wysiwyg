this.ckan.module('wysiwyg-quill-init', function ($) {
    return {
        options: {
            inputId: null
        },
        initialize: function () {
            $.proxyAll(this, /_/);

            this.form = this.el.closest("form");

            this.form.on("submit", (e) => {
                const inputEl = document.getElementById(this.options.inputId);
                // inputEl.value = JSON.stringify(window.quillEditor.getContents());

                inputEl.value = window.quillEditor.root.innerHTML;
            })

            this._initEditor();
        },
        _initEditor: function () {
            window.quillEditor = new Quill(this.el[0], {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }, { size: ['small', false, 'large', 'huge'] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image', 'link', 'video', 'code-block'],
                        ['clean']
                    ]
                },
            })

            window.quillEditor.clipboard.dangerouslyPasteHTML($(".ql-editor").text());
        },
    };
});
