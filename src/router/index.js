import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import userindex from '@/pages/Administration/userindex'
import user_management from '@/pages/Administration/user_management'
import Product_Classification_list from '@/pages/sale/Product_Classification_list'
import Product_list from '@/pages/sale/Product_list'
import buylist_search from '@/pages/buy/buylist_search'
import buylist_done from '@/pages/buy/buylist_done'
import new_buylist from '@/pages/buy/new_buylist'
import Supplier from '@/pages/buy/Supplier'
import get_in_storehouse from '@/pages/storehouse/get_in_storehouse'
import get_out_storehouse from '@/pages/storehouse/get_out_storehouse'
import storehouse_check from '@/pages/storehouse/storehouse_check'
import storehouse_search from '@/pages/storehouse/storehouse_search'
import customer_management from '@/pages/sale/customer_management'
import new_sales_slip from '@/pages/sale/new_sales_slip'
import sales_slip_done from '@/pages/sale/sales_slip_done'
import sales_slip_search from '@/pages/sale/sales_slip_search'
import finance_check from '@/pages/finance/finance_check'
import get_money_register from '@/pages/finance/get_money_register'
import pay_register from '@/pages/finance/pay_register'
import buy_report from '@/pages/report/buy_report'
import finance_report from '@/pages/report/finance_report'
import get_in_storehouse_report from '@/pages/report/get_in_storehouse_report'
import get_out_storehouse_report from '@/pages/report/get_out_storehouse_report'
import sale_report from '@/pages/report/sale_report'
import stock_report from '@/pages/report/stock_report'
import login from '@/pages/login'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: '/userindex',
          name: 'userindex',
          component: userindex,
        },
        {
          path: '/user_management',
          name: 'user_management',
          component: user_management,
        },
        {
          path: '/Product_Classification_list',
          name: 'Product_Classification_list',
          component: Product_Classification_list,
        },
        {
          path: '/Product_list',
          name: 'Product_list',
          component: Product_list,
        },
        {
          path: '/buylist_search',
          name: 'buylist_search',
          component: buylist_search,
        },
        {
          path: '/buylist_done',
          name: 'buylist_done',
          component: buylist_done,
        },
        {
          path: '/new_buylist',
          name: 'bnew_buylist',
          component: new_buylist,
        },
        {
          path: '/Supplier',
          name: 'Supplier',
          component: Supplier,
        },
        {
          path: '/get_in_storehouse',
          name: 'get_in_storehouse',
          component: get_in_storehouse,
        },
        {
          path: '/get_out_storehouse',
          name: 'get_out_storehouse',
          component: get_out_storehouse,
        },
        {
          path: '/storehouse_check',
          name: 'storehouse_check',
          component: storehouse_check,
        },
        {
          path: '/storehouse_search',
          name: 'storehouse_search',
          component: storehouse_search,
        },
        {
          path: '/customer_management',
          name: 'customer_management',
          component: customer_management,
        },
        {
          path: '/new_sales_slip',
          name: 'new_sales_slip',
          component: new_sales_slip,
        },
        {
          path: '/sales_slip_done',
          name: 'sales_slip_done',
          component: sales_slip_done,
        },
        {
          path: '/sales_slip_search',
          name: 'sales_slip_search',
          component: sales_slip_search,
        },
        {
          path: '/finance_check',
          name: 'finance_check',
          component: finance_check,
        },
        {
          path: '/get_money_register',
          name: 'get_money_register',
          component: get_money_register,
        },
        {
          path: '/pay_register',
          name: 'pay_register',
          component: pay_register,
        },
        {
          path: '/buy_report',
          name: 'buy_report',
          component: buy_report,
        },
        {
          path: '/finance_report',
          name: 'finance_report',
          component: finance_report,
        },
        {
          path: '/get_in_storehouse_report',
          name: 'get_in_storehouse_report',
          component: get_in_storehouse_report,
        },
        {
          path: '/get_out_storehouse_report',
          name: 'get_out_storehouse_report',
          component: get_out_storehouse_report,
        },
        {
          path: '/sale_report',
          name: 'sale_report',
          component: sale_report,
        },
        {
          path: '/stock_report',
          name: 'stock_report',
          component: stock_report,
        }, 

      ]
    }, {
      path: '/',
      redirect: '/index'
    },{
          path: '/login',
          name: 'login',
          component: login,
        },

  ]
})
