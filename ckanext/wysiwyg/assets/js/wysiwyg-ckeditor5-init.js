/**
 * Initialize all CKeditor5 editors on a page. To be initialized, an element
 * must have an attribute wysiwyg-editor with a specific key. This made in favour
 * of using HTMX
 */
this.ckan.module('wysiwyg-ckeditor5-init', function ($) {
    return {
        options: {
            editor: "ckeditor5"
        },
        initialize: function () {
            $.proxyAll(this, /_/);

            htmx.on("htmx:afterSettle", this._initEditors);

            // on first init
            this._initEditors();
        },

        _initEditors: function (e) {
            let elements = document.querySelectorAll(`[wysiwyg-editor='${this.options.editor}']`);

            if (typeof e !== 'undefined') {
                if (e.target.getAttribute("wysiwyg-editor") === this.options.editor) {
                    this._initEditor(e.target);
                    return;
                }

                elements = e.target.querySelectorAll(`[wysiwyg-editor='${this.options.editor}']`);
            }

            for (let node of elements) {
                this._initEditor(node);
            }
        },

        /**
         * Initialize CKEditor 5 on an element
         *
         * @param {Node} element
         */
        _initEditor: function (element) {
            if (typeof window.ckeditors === "undefined") {
                window.ckeditors = [];
            }

            ClassicEditor.create(element, {
                extraPlugins: ["SimpleUploadAdapter", "GeneralHtmlSupport", "ImageInsert"],
                simpleUpload: {
                    uploadUrl: ckan.url('/wysiwyg/upload_file'),
                },
                mediaEmbed: { previewsInData: true },
                htmlSupport: {
                    allow: [
                        {
                            name: "/^(div|p|h[2-4])$/'",
                        }
                    ]
                }
            }).then(editor => {
                window.ckeditors.push(editor)
            });
        },
    };
});
