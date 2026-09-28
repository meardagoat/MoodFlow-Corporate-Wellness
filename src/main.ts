import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/instrument-sans/index.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { registerMotionDirectives } from './directives/motion'

const app = createApp(App)

registerMotionDirectives(app)

app
  .use(router)
  .mount('#app')
