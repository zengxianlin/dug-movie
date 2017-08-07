/*
* @Author: zengxianlin
* @Date:   2017-07-21 12:49:02
* @Last Modified by:   877529974@qq.com
* @Last Modified time: 2017-07-27 21:50:29
*/
// 按需引入部分组件
import Vue from 'vue'
import { Cell, Checklist, Header , Button , Popup , Field , Navbar , TabItem , TabContainer , TabContainerItem ,  InfiniteScroll , Spinner , Switch , Loadmore , Toast , Swipe, SwipeItem} from 'mint-ui'
import 'mint-ui/lib/style.css';

Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);