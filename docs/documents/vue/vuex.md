# 第十一章：Vuex

> Vuex官网：[https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

**Vuex是实现组件全局状态（数据）管理的一种机制，方便实现组件之间的数据共享。** 

- 集中管理共享的数据，易于开发和后期维护。
- 能够搞笑试下组件之间数据的共享，提高开发效率。
- 存储在 vuex 中的数据都是响应式的，能够实时保持数据与页面的同步。

> 一般只有组件之间共享的数据，才有必要存储到vuex中，对于组件的私有数据，依旧存储在组件自身的data中。



## 小范围内数据共享

父传子：v-bind 属性绑定

字传父：v-on 事件绑定

兄弟组件之间共享数据：EventBus

- $on 接收方
- $emit 发送方



## Vuex基本使用

1. 安装vuex依赖包

   ~~~cmd
   yarn add vuex --save
   ~~~

2. 导入vuex包

   > vue2 搭配的是 vuex@3版本，vue3 搭配的是 vuex@4版本。

   ~~~cmd
   import vuex from 'vuex'
   Vue.use(vuex)
   ~~~

3. 创建 store 对象（共享数据对象）

   ~~~js
   const store = new Vuex.store({
     // state中存放的是全局共享的数据
     state: { count: 0 }
   })
   ~~~

4. 将 store 对象挂载到 vue 实例中

   ~~~js
   new Vue({
     // 所有的组件，可以直接从store中获取全局的数据
     store
   })
   ~~~



## 封装Store.js

1. 在 src 下新建 stores 文件夹，下新建 index.js

   ~~~js
   import Vue from "vue"
   import Vuex from 'vuex'
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       // 源数据
     },
     mutations: {
       // 修改state
     },
     actions: {
       // 异步mutations
     },
     getters: {
       // 更新state
     }
   })
   ~~~

2. 引入到 main.js

   ~~~js
   import Store from '@/Stores'
   
   new Vue({
       Store
   })
   ~~~

   

## 格式化代码

在项目根目录新建 `.prettierrc` 配置文件。

~~~js
{   
    "semi": false,		// 不使用分号
    "singleQuote": true	  // 使用单引号
}
~~~



## State

> **State 提供唯一的公共数据源**，所有的共享数据都要统一放到 Store 的 State 中进行存储。

### 访问 state 的方式

1. 直接访问

   ~~~vue
   {{ $store.state.属性名 }}
   ~~~

2. 导入 mapState 函数访问

   > 导入 mapState 函数，将当前组件需要的全局数据，映射为当前组件的 computed 计算属性。

   ~~~vue
   <template>
   	<div> {{count}} </div>
   </template>
   
   <script>
   // 按需导入 mapState 函数
   import { mapState } from 'vuex'
   
   export default {
       // 将全局数据，映射为当前组件的计算属性
       computed: {
           ...mapState(['count'])
       }
   }
   </script>
   ~~~

### ...mapState 原理 

> 1. 创建一个空对象，循环遍历存储有要访问的变量数组。
> 2. 在空对象内存储 `this.$store.state[item]` 挂载的每一项。
> 3. 返回这个对象。
> 4. 调用即可。

~~~js
function myMap (arr) {
    const obj = {};
    arr.forEach((item) => {
        obj[item] = function () {
            return this.$store.state[item];
        };
    });
    return obj;
}

export default {
    computed: {
        ...myMap(['name', 'age'])
    }
}
~~~



## Mutation

> Mutation 本质是一个 javascript 函数，用于修改 Store 中的数据。可以集中监控所有数据的变化。
>
> - 只能通过 Mutation 变更 Store 数据，不可以直接操作 Store 中的数据。

### Mutation 无参

**在store.js中定义方法** 

~~~js
const store = new Vuex.store({
    // state中存放的是全局共享的数据
    state: {
        count: 0
    },
    // 变更State数据
    mutations: {
        // 加法函数：state 代表 state对象
        add (state, num) {
            state.count+=num
        },
        // 减法函数
        Sub(state) {
            state.count--
        }
    }
})
~~~

**调用 mutations 中的方法** 

1. 方式一：直接调用

   ~~~js
   // 语法格式：
   this.$store.commit('方法名')
   ~~~

   ~~~vue
   <script>
   export default {
     methods: {
       add() {
          this.$store.commit('add')
       }
     }
   }
   </script>
   ~~~

2. 方式二：按需导入

   > 通过 mapMutations 函数 调用 mutations 中的方法。

   ~~~js
   // 语法格式：
   import { mapMutations } from 'vuex'
   ...mapMutations(['方法名'])
   ~~~

   ~~~vue
   <script>
   // 导入 mapMutations函数
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     // 将全局数据映射为计算属性
     computed: {
         ...mapMutations(['add'])
     },
   }
   </script>
   ~~~

   

### Mutation 传参

**在store.js中定义方法** 

~~~js
const store = new Vuex.store({
    state: {
        count: 0,
    },
    mutations: {
        // 参数二是自定义传参
        add (state, step) {
            state.count += step;
        }
    }
})
~~~

**调用 mutations 中的方法** 

1. 方式一：直接调用

   ~~~vue
   <script>
   export default {
       methods: {
           add () {
              this.$store.commit('add', 1);
           }
       }
   }
   </script>
   ~~~

2. 方式二：按需导入

   > 通过 mapMutations 函数 调用 mutations 中的方法。

   ~~~vue
   <script>
   // 导入 mapMutations函数
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     // 将全局数据映射为计算属性
     computed: {
         ...mapMutations(['add'])
     }
   }
   </script>
   ~~~

   

### 案例：计数器

**App.vue** 

~~~vue
<template>
	<div>
        <!-- 方法二：使用时传参 -->
		<button @click="Sub(1)">-1</button>
		{{ $store.state.count }}
		<button @click="Add">+1</button>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	methods: {
        // 方法一：调用时传参
		Add() {
			this.$store.commit('Add', 2)
		},

		...mapMutations(['Sub'])
	},
    // 方法二：需要把用到的属性传过来
	computed: {
		...mapState(['count'])
	},
}
</script>
~~~

**Store.js** 

~~~js
import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    Add (state, num) {
      state.count += num;
    },
    Sub(state, num) {
      state.count -= num;
    }
  }
})
~~~



## Action

> Action 本质是一个 javascript 函数，用于处理异步任务。
>
> 如果通过异步操作变更数据，必须通过 Action，而不能使用 Mutation，但在 Action 中还是要通过触发 Mutation 的方式简介变更数据。
>
> - 一般在网络请求和做延迟的时候使用。

==在 actions 中，不能直接修改 state 中的数据。==

==**必须通过 context.comit() 触发某个 mutations 才行。**== 

- 只有 mutations 中定义的函数，才有权利修改state中的数据。

### Action 无参

~~~js
const store = new Vuex.store({
    state: { count: 0 },
    // 定义方法
    mutations: {
        add (state) { state.count++ }
    },
    // 异步操作
    actions: {
        // 调用mutations中的方法，重新定义异步方法
        addAsync (context) {
            setTimeout( () => {
                context.commit('add');
            }, 1000)
        }
    }
})
~~~

**调用 mutations 中的异步方法** 

1. 方式一：直接调用

   ~~~js
   // 语法格式：
   this.$store.dispatch('异步方法名')
   ~~~

   ~~~vue
   <template>
   	<div>
           <button @click="add">直接使用</button>
       </div>
   </template>
   
   <script>
   export default {
       methods: {
           add () {
               // dispatch 函数用来触发某个actions
               this.$store.dispatch('addAsync');
           }
       }
   }
   </script>
   ~~~

2. 方式二：按需导入

   > 通过 mapActions 函数 调用 mutations 中的方法。

   ~~~js
   // 语法格式：
   import { mapState, mapActions } from 'vuex'
   
   export default {
       computed: {
           ...mapState(['数据变量名']),
       },
       methods: {
           ...mapActions(['异步方法名']),
       },
   }
   ~~~

   ~~~vue
   <template>
   	<div>
           <button @click="addAsync">直接使用</button>
       </div>
   </template>
   
   <script>
   import { mapState, mapMutations, mapActions } from 'vuex'
   
   export default {
       // 将全局数据映射为计算属性
       computed: {
           ...mapState(['count']),
       },
       methods: {
           // 通过 mapActions 函数 调用 mutations 中的方法
           ...mapActions(['addAsync']),
       },
   }
   </script>
   ~~~




### Action 传参

**在store.js中定义方法** 

~~~js
const store = new Vuex.store({
    state: { count: 0 },
    // 定义方法
    mutations: {
        add (state, step) { state.count += step }
    },
    // 异步操作
    actions: {
        // 调用mutations中的方法，重新定义异步方法
        addAsync (context, step) {
            setTimeout( () => {
                context.commit('add', step);
            }, 1000)
        }
    }
})
~~~

**调用 mutations 中的异步方法** 

1. 方式一：直接调用

   ~~~js
   // 语法格式：
   $store.dispatch('异步方法名', 实参)
   ~~~

   ~~~vue
   <script>
   export default {
       methods: {
           add () {
               // dispatch 函数用来触发某个actions
               this.$store.dispatch('addAsync', 1);
           }
       }
   }
   </script>
   ~~~

2. 方式二：按需导入

   > 通过 mapActions 函数 调用 mutations 中的方法。

   ~~~vue
   <template>
   	<div>
           <button @click="add(1)">直接使用</button>
           <button @click="addN">重新定义使用</button>
       </div>
   </template>
   
   <script>
   import { mapState, mapMutations, mapActions } from 'vuex'
   
   export default {
       // 将全局数据映射为计算属性
       computed: {
           ...mapState(['count']),
       },
       methods: {
           // 通过 mapActions 函数 调用 mutations 中的方法
           ...mapActions(['add']),
           addN () {
               this.add(1);
           }
       },
   }
   </script>
   ~~~




### 案例：延迟打印

**App.vue** 

~~~vue
<template>
	<div>
		<button @click="strAsync">点击输出一句话</button>
		<p>{{ $store.state.msg }}</p>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	computed: {
		...mapState(['msg'])
	},
	methods: {
        // 方法一：
		str () {
			this.$store.dispatch('strAsync')
		},
        // 方法二：
		...mapActions(['strAsync'])
	},
}
</script>
~~~

**Store.js** 

~~~js
import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: ''
  },
  mutations: {
    Str (state) {
      state.msg = 'Hello World'
    }
  },
  actions: {
    strAsync (context) {
      setInterval(() => {
        context.commit('Str')
      }, 1000)
    }
  }
})
~~~



## Getter

> Getter 本质是一个 javascript 函数，用于对 Store 中的数据进行加工处理形成新数据。类似于 Vue 的计算属性。
>
> - Store 中的数据发生变化，Getter 的数据也会跟着发生变化。

~~~js
const store = new Vuex.store({
    state: { count: 0 },
    // 定义方法
    mutations: {
        add (state) { state.count++ }
    },
    // 异步操作
    actions: {
        // 调用mutations中的方法，重新定义异步方法
        addAsync (context) {
            setTimeout( () => {
                context.commit('add');
            }, 1000)
        }
    },
    // 更新数据
    getters: {
        showNum (state) {
            return state.count
        }
    }
})
~~~

**调用 mutations 中的方法** 

1. 方式一：直接调用

   ~~~js
   // 语法格式：
   this.$store.getters.方法名
   ~~~

   ~~~vue
   <script>
   export default {
       methods: {
           showNums () {
               $store.getter.showNum();
           }
       }
   }
   </script>
   ~~~

2. 方式二：按需导入

   ~~~js
   // 语法格式：
   import { mapState, mapMutations, mapGetters } from 'vuex'
   ...mapGetters(['getters中的方法名'])
   ~~~

   ~~~vue
   <template>
   	<div>
           <button @click="add">直接使用</button>
           <button @click="addN">重新定义使用</button>
       </div>
   </template>
   
   <script>
   import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
   
   export default {
       // 将全局数据映射为计算属性
       computed: {
           ...mapState(['count']),
           ...mapGetters(['showNum'])
       },
   }
   </script>
   ~~~



## modules

> 按照模块化的思想开发，把不同的数据和方法，按照彼此的关联进行封装。

1. 定义模块

   > 在 stores 文件夹下新建 userStore.js 文件

   ~~~js
   export default {
       state: {
           name: '法外狂徒 张三',
           time: 18,
           navList: [
               '首页',
               '作品展示',
               '商务合作',
           ]
       },
       mutations: {
           changeTime (state, num) {
               state.time += num
           }
       }
   }
   ~~~

   

2. 注册模块

   > 在 stores 文件夹下的 index.js 中导入分类后的模块。

   ~~~js
   import Vue from 'vue'
   import Vuex from 'vuex'
   Vue.use(Vuex)
   
   // 导入不同的module模块
   import userStore from './userStore'
   
   export default nw Vuex.Store({
       // 把 store 分离出去
       modules: {
           user: userStore
       }
   })
   ~~~

   

3. 通过模块的注册名称访问模块下的成员

   ~~~vue
   <template>
   	<div>
           
       </div>
   </template>
   
   <script>
   export default {
   	// 不能随便访问，只能在访问空间访问
       namespaced: true,
       
       computed: {
   		...mapState('user', ["name", "time", "navList"]),
   	},
   	methods: {
   		...mapMutations('user', ['changeTime'])
   	}
   }
   </script>
   ~~~

   - ~~~js
     // 不开启命名空间访问方法：
     this.$store.state.命名空间名.变量名
     
     // 开启空间语法格式：
     ...mapState('命名空间名', ["变量名/方法名"]),
     ~~~

     

     







## 案例：Todos

### 准备工作

1. 下载组件库

   > **Ant-design-vue** 组件库官网：[https://1x.antdv.com/docs/vue/introduce-cn/](https://1x.antdv.com/docs/vue/introduce-cn/)

   ~~~cmd
   yarn add ant-design-vue
   ~~~

2. 引入组件库

   > 在 src/main.js 中全局引入

   ~~~js
   // 引入 Button 样式
   import Button from 'ant-design-vue/lib/button';
   import 'ant-design-vue/dist/antd.css';
   
   Vue.component(Button.name, Button);
   ~~~

   

3. 样式模板

   ~~~vue
   <template>
   	<div id="app">
   		<a-input placeholder="请输入任务" class="my_ipt" />
   		<a-button primary>添加事项</a-button>
   		<a-list bordered class="dt_list">
   			<a-list-item slot="renderItem">
   				<!-- 复选框 -->
   				<a-checkbox></a-checkbox>
   				<!-- 删除链接 -->
   				<a slot="actions">删除</a>
   			</a-list-item>
   			<!-- footer区域 -->
   			<div slot="footer" class="footer">
   				<!-- 未完成的任务个数 -->
   				<span>0条剩余</span>
   				<!-- 操作按钮 -->
   				<a-button-group>
   					<a-button>全部</a-button>
   					<a-button>未完成</a-button>
   					<a-button>已完成</a-button>
   				</a-button-group>
   				<!-- 把已经完成的任务清空 -->
   				<a>清除完成</a>
   			</div>
   		</a-list>
   	</div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style scoped>
   #app {
   	padding: 10px;
   }
   .my_ipt {
   	width: 500px;
   	margin-right: 10px;
   }
   .dt_list {
   	width: 500px;
   	margin-top: 10px;
   }
   .footer {
   	display: flex;
   	justify-content: space-between;
   	align-items: center;
   }
   </style>
   ~~~



**App.vue** 

~~~vue
<template>
	<div>
		<header class="header">
			<h1>todos</h1>
			<input id="toggle-all" class="toggle-all" type="checkbox" />
			<label for="toggle-all"></label>
			<input class="new-todo"
                   placeholder="输入任务名称-回车确认"
                   autofocus
                    />
		</header>

		<ul class="todo-list">
			<!-- completed: 完成的类名 -->
			<li class="completed">
				<div class="view">
					<input class="toggle" type="checkbox" />
					<label>任务名</label>
					<button class="destroy"></button>
				</div>
			</li>
		</ul>

		<footer class="footer">
			<span class="todo-count">剩余<strong>数量值</strong></span>
			<ul class="filters">
				<li>
					<a href="javascript:;"
                       class="selected" >
                        全部
    				</a>
				</li>
				<li>
					<a href="javascript:;">
                        未完成
    				</a>
				</li>
				<li>
					<a href="javascript:;">
                        已完成
    				</a>
				</li>
			</ul>
			<button class="clear-completed">清除已完成</button>
		</footer>
	</div>
</template>

<script>
export default {
    data () {
        return {
            list: []
        }
    }
};
</script>
~~~

**store.js** 

~~~js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import axios from 'axios'

export default new Vuex.store({
    // 源数据
    state: {
        
    },
    // 方法
    mutations: {
        
    },
    // 异步
    actions: {
        getList (context) {
            axios({
                
            })
        }
    },
    // 更新
    getters: {
        
    }
})
~~~



**created 与 mounted 的区别**

- created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

**mounted 与 methods 的区别**

- mounted 是生命周期方法之一，会在对应生命周期时执行。
- methods 是Vue实例对象上绑定的方法，供当前Vue组件作用域内使用，未调用不会执行，只执行逻辑，返回值可有可无。

**computed 与 watched 的区别**

- computed 是计算属性，也可以理解为一个方法。其中计算的结果如果不发生改变就不会触发，且必须返回一个值并在DOM中绑定的才能取得值。他可以自动获取数据的改变。
- watched 属性是手动定义的所需监听的值，不同的数据可以在其中多次定义监听值，这时会消耗一定性能，他并不能像computed那样自动改变。

