import { defineComponent, onMounted } from 'vue';
import './style.less';

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
