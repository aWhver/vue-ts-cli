import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
const App = defineComponent({
  name: 'App',
  components: {
    RouterView,
  },
  setup() {
    return () => {
      return (
        <div>
          this is app page <router-view />
        </div>
      );
    };
  },
});
export default App;
