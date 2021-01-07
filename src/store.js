import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/Homepage'
import Login from '@/components/Login'
import AdminDashboard from '@/components/AdminDashboard'

Vue.use(Router)

//export default new Router({

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage,
            meta: {
                title: 'Machina',
                requiresAuth:false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth:false,
                title: 'Machina | Login',

            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: AdminDashboard,
            meta: {
                requiresAuth:true,
                title: 'Machina | Dasboard',

            }
        }

    ]
})


router.beforeEach((to, from, next) => {


    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    //const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
    // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {

                next()

        }
    } else {
        next()
    }
})
export default router