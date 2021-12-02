import { defineComponent } from 'vue';
const App = defineComponent({
  name: 'App',
  setup() {
    return () => {
      return <div>this is app page</div>;
    };
  },
});
export default App;
