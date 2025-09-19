import { createWebHistory, createRouter } from "vue-router";
import Authentication from "../views/Authentication.vue";
import Dashboard from "../views/Dashboard.vue";
import { supabase } from "../api/supabase";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Authentication },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
    ]
})
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const { data: { session } } = await supabase.auth.getSession();
    if (requiresAuth && !session) {
        next('/');
    } else {
        next();
    }
})
export default router