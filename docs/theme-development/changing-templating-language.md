# Changing Templating Language

Whilst the theme uses [Pug PHP](https://github.com/pug-php/pug) as the default templating language, this is not strictly enforced. The templating language can easily be changed using the `renderModule` filter provided with the Flynt Core plugin.

As an example, the below code demonstrates how to switch to [Timber](timber.github.io/timber) for rendering your templates. As this is for demo purposes only, we will not fully detail how to include Timber in your project (for this, check out the [Timber Documentation](http://timber.github.io/timber/#getting-started)).

```php
<?php
add_filter('WPStarter/renderModule', function($output, $moduleName, $moduleData, $areaHtml) {
  // Get index file.
  $moduleManager = WPStarter\ModuleManager::getInstance();
  $filePath = $moduleManager->getModuleFilePath($moduleName, 'index.twig');

  // Add areas to data.
  $data = array_merge($moduleData, ['areas' => $areaHtml]);

  // Return html rendered by timber / twig.
  return Timber::fetch($filePath, $data);
}, 10, 4);
```

<!-- TODO: Add link to relevant Flynt Core plugin documentation. -->