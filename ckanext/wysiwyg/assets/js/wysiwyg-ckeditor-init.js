this.ckan.module('wysiwyg-ckeditor-init', function ($) {
    return {
        options: {},
        initialize: function () {
            $.proxyAll(this, /_/);

            this._initCkEditor();
        },
        _initCkEditor: function () {
            ClassicEditor.create(this.el[0], {
                extraPlugins: ["SimpleUploadAdapter", "GeneralHtmlSupport", "ImageInsert"],
                simpleUpload: {
                    uploadUrl: ckan.url('/ckeditor/upload_file'),
                },
                mediaEmbed: { previewsInData: true },
                htmlSupport: {
                    allow: [
                        {
                            name: "/^(div|p|h[2-4])$/'",
                        }
                    ]
                }
            });
        }
    };
});
