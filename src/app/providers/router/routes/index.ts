import { type RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/shared/constants'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/app/layouts/defaultLayout/ui/DefaultLayouts.vue'),
    children: [
      {
        path: '/',
        name: ROUTE_NAMES.HOME,
        component: () => import('@/pages/home/ui/HomePage.vue'),
      },
      {
        path: '/dishes',
        name: ROUTE_NAMES.DISHES,
        component: () => import('@/pages/dishes/ui/DishesPage.vue'),
      },
      {
        path: '/dishes/:id',
        name: ROUTE_NAMES.DISH,
        component: () => import('@/pages/dish/ui/DishPage.vue'),
      },
      {
        path: '/favourite-dishes',
        name: ROUTE_NAMES.FAVOURITE_DISHES,
        component: () => import('@/pages/favouriteDishes/ui/FavouriteDishesPage.vue'),
      },
      {
        path: '/favourite-dishes/:id',
        name: ROUTE_NAMES.FAVOURITE_DISH,
        component: () => import('@/pages/favouriteDish/ui/FavouriteDishPage.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error/ui/ErrorPage.vue')
      }
    ]
  }
]
