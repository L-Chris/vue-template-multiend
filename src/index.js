import * as components from './components'
import * as plugins from './plugins'
import mixins from './mixins/base'

export const installComponents = vue => Object.entries(components).map(([name, component]) => vue.component(name, component))
export const installPlugins = vue => Object.entries(plugins).map(([, installPlugin]) => installPlugin(vue))
export const installMixins = vue => vue.mixin(mixins)

export default vue => {
  installComponents(vue)
  installPlugins(vue)
  installMixins(vue)
}
