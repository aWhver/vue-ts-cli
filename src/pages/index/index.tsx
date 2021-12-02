import { defineComponent, onMounted } from 'vue';

const home = defineComponent({
  name: 'home',
  setup() {
    return () => {
      return <div className='home'>
        this is home page
      </div>;
    };
  },
});
export default home;
