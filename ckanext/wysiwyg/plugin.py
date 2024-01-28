import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


@toolkit.blanket.actions
@toolkit.blanket.blueprints
@toolkit.blanket.validators
@toolkit.blanket.helpers
class WysiwygPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)


    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, "templates")
        toolkit.add_public_directory(config_, "public")
        toolkit.add_resource("assets", "wysiwyg")
