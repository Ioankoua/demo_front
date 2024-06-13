import { createRouter, createWebHistory } from 'vue-router'


//admin
import AdminLogin from './layouts/Admin/AuthAdmin/AuthAdmin.vue';
import CreateProduct from './layouts/Admin/Product/CreateProduct.vue';
import ViewProducts from './layouts/Admin/Product/ViewProducts.vue';
import EditProduct from './layouts/Admin/Product/EditProduct.vue';
import ViewProduct from './layouts/Admin/Product/ViewProduct.vue';
import TrashProducts from './layouts/Admin/Product/TrashProducts.vue';
import ProductCategories from './layouts/Admin/Categories/ProductCategories.vue';
import CreateCategory from './layouts/Admin/Categories/CreateCategory.vue';
import EditCategory from './layouts/Admin/Categories/EditCategory.vue';
import ViewOrders from './layouts/Admin/Order/ViewOrders.vue';
import EditOrder from './layouts/Admin/Order/EditOrder.vue';
import ViewBouquetBuilders from './layouts/Admin/BouquetBuilder/ViewBouquetBuilders.vue';
import ViewBouquetBuilder from './layouts/Admin/BouquetBuilder/ViewBouquetBuilder.vue';

//test
import TestTest from './layouts/Admin/Product/TestTest.vue';
import DealForm from './layouts/DealForm.vue'; 
import HomePage from './layouts/HomePage.vue'; 

//client
import СMainPage from './layouts/Client/MainPage/MainPage.vue';
import СAboutUs from './layouts/Client/AboutUs/AboutUs.vue';
import СViewProduct from './layouts/Client/Product/ViewProduct.vue';
import СCreateOrder from './layouts/Client/Order/CreateOrder.vue';
import СFinalOrder from './layouts/Client/Order/FinalOrder.vue';
import СBouquetBuilder from './layouts/Client/BouquetBuilder/BouquetBuilder.vue';

const routes = [
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/product/',
    name: 'ViewProducts',
    component: ViewProducts
  },
   {
    path: '/admin/product/trash',
    name: 'TrashProducts',
    component: TrashProducts
  },
  {
    path: '/admin/product/create',
    name: 'CreateProduct',
    component: CreateProduct
  },
  {
    path: '/admin/product/edit/:product_id',
    name: 'EditProduct',
    component: EditProduct,
  },
  {
    path: '/admin/product/view/:product_id',
    name: 'ViewProduct',
    component: ViewProduct,
  },
  {
    path: '/admin/product/category',
    name: 'ProductCategories',
    component: ProductCategories,
  },
  {
    path: '/admin/product/category/create',
    name: 'CreateCategory',
    component: CreateCategory,
  },
  {
    path: '/admin/product/category/edit/:category_id',
    name: 'EditCategory',
    component: EditCategory,
  },
  {
    path: '/admin/order/',
    name: 'ViewOrders',
    component: ViewOrders,
  },
  {
    path: '/admin/order/edit/:order_id',
    name: 'EditOrder',
    component: EditOrder,
  },
  {
    path: '/admin/bouquet_builder/',
    name: 'ViewBouquetBuilders',
    component: ViewBouquetBuilders,
  },
  {
    path: '/admin/bouquet_builder/:bouquet_id',
    name: 'ViewBouquetBuilder',
    component: ViewBouquetBuilder,
  },

  {
    path: '/TestTest',
    name: 'TestTest',
    component: TestTest,
  },

  //client
  {
    path: '/',
    name: 'CMainPage',
    component: СMainPage,
  },
  {
    path: '/product/view/:product_id',
    name: 'СViewProduct',
    component: СViewProduct,
  },
  {
    path: '/order/create/:product_id',
    name: 'СCreateOrder',
    component: СCreateOrder,
  },
  {
    path: '/order/created',
    name: 'СFinalOrder',
    component: СFinalOrder,
  },
  {
    path: '/about',
    name: 'СAboutUs',
    component: СAboutUs,
  },
  {
    path: '/bouquet_builder',
    name: 'СBouquetBuilder',
    component: СBouquetBuilder,
  },

  {
      path: '/zoho',  
      name: 'HomePage',
      component: HomePage
  },

  {
      path: '/deal-form',  
      name: 'DealForm',
      component: DealForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const isAdminRoute = to.path.startsWith('/admin/') && to.path !== '/admin';
  const loggedIn = localStorage.getItem('adminToken');

  if (isAdminRoute && !loggedIn) {
    return next('/admin');
  }
  next();
});


export default router
