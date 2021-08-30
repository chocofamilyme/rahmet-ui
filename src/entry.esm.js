// Import vue components
import * as components from '@/components';
import * as plugins from '@/plugins';

// Install function executed by Vue.use()
const install = function installRahmetUi(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });

  Object.values(plugins).forEach((plugin) => {
    app.use(plugin);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component and plugin use, export components and plugins
// Each component can be registered via Vue.component()
// Each plugin can be registered via Vue.use()
export * from '@/components';
export * from '@/plugins';
