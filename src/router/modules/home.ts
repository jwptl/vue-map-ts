const Layout = () => import("@/layout/index.vue");
const MapLayout = () => import("@/layout/mapLayout.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/index",
  meta: {
    icon: "homeFilled",
    title: "首页",
    rank: 0
  },
  children: [
    {
      path: "/index",
      name: "Index",
      component: MapLayout,
      redirect: "/home/index",
      children: [
        {
          path: "/home/index",
          name: "Index",
          component: () => import("@/views/home/index.vue"),
          meta: {
            title: "高级"
          }
        },
      ]
    }
  ]
} as RouteConfigsTable;
