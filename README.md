这个案例使用了vuex以及json-server(一个转json文件为暂时性的后端接口的一个插件, 使用方法: 在json文件的文件夹内打开powershell 然后输入json-server --watch json文件名)
1. 首先通过建立了store文件夹内部包含一个index.js(1.导包, 2.创建实例对象以及创建store对象, 3.通过modules模块来导入子模块内的文件cart.js)以及一个modules文件夹(存在模块化的store,以下称为cart.js).
2. 在与主vue文件同级目录的main.js内配置store使其可以在后续正常使用,在vue文件内配置component来确定页面结构
前期工作完成

后续:
1. 在cart.js内部配置数据(array),保证在后续页面中可以使用该array(目前为空,因为异步任务要写在actions内),后在cart.js内部配置一些mutations来修改本来为空的array,但数据是用axios请求过来的所以要在actions内通过
   axios来请求到数据然后通过context.commit把state内的空array变为有数据的数组,但这样还仅仅是写完成了方法,还没调用所以要在主vue内在created(生命周期钩子)时通过this.$store.dispatch来调用所写的这个请求数据的方法
   此时cart内有了不为空的list...
2. 然后主vue内通过解构mapState('子模块名字', ['数据'])来获取到数据,之后通过父子组件间通信来把数据(list(该文件内为app.vue内的cart-item带的:item属性传入))传入到主要组件(item-show)内再用v-for来渲染多个该组件
   在item-show组件内通过props接受到list,然后渲染页面..毕竟是购物车页面,所以要有数量购买,给减加号添加事件监听,把修改后的数据传递到后端内部(后端修改,通过axios来修改,用到了action),后端修改完之后修改前端显示页面
   通过mutation来修改前段store内list对应数据(id)来修改他的count,以及在count===1时不可在减少,即绑定:disabled
4. 最后就是footer页面,通过在cart内getters写入求总和的数据(像computed计算属性),然后在footer内通过解构mapGetters('子模块名字', ['数据'])来获取导数据,接下来在固定位置进行渲染即可
                                                                                   至此页面以完成
