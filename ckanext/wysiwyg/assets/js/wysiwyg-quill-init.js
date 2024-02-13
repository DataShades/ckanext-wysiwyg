this.ckan.module('wysiwyg-quill-init', function ($) {
    return {
        options: {
            inputId: null,
            forDisplay: false,
            editor: "quill"
        },
        initialize: function () {
            $.proxyAll(this, /_/);

            htmx.on("htmx:afterSettle", this._initEditors);

            // on first init
            this._initEditors();

            if (typeof window.quill !== 'undefined') {
                $(".form-label-quill").click(() => {
                    window.quill.focus()
                })

                this.container = $(".form-group-quill");

                window.quill.root.addEventListener("focus", () => {
                    this.container.addClass("focused");
                });
                window.quill.root.addEventListener("blur", () => {
                    this.container.removeClass("focused");
                });
            }
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
         * Initialize Quill editor on an element
         *
         * @param {Node} element
         */
        _initEditor: function (element) {
            var forDisplay = element.getAttribute("wysiwyg-for-display") || false;

            this.inputEl = document.getElementById(element.getAttribute("wysiwyg-input-id"));
            this.form = this.el.closest("form");

            this.form.on("submit", (e) => {
                this.inputEl.value = JSON.stringify(window.quill.getContents());
            })

            let config = {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }, { size: ['small', false, 'large', 'huge'] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['image', 'link', 'video', 'code-block'],
                        ['clean']
                    ]
                }
            }

            if (forDisplay) {
                config = { readOnly: true };
            }

            window.quill = new Quill(element, config);

            if (this.inputEl.value && this.inputEl.value.trim()) {
                window.quill.setContents(JSON.parse(this.inputEl.value));
            }
        },
    };
});
