import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
                // Dashboard
                {
                    name: 'Accueil',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/Dashboard'),
                },
                // Pages
                {
                    name: 'User Profile',
                    path: 'user',
                    component: () =>
                        import ('@/views/dashboard/pages/UserProfile'),
                },
                // Parametres
                {
                    name: 'Paramètres',
                    path: 'parametres',
                    component: () =>
                        import ('@/views/dashboard/pages/Parametres'),
                },
                {
                    name: 'Notifications',
                    path: 'notifications',
                    component: () =>
                        import ('@/views/dashboard/component/Notifications'),
                },
                {
                    name: 'Icons',
                    path: 'icons',
                    component: () =>
                        import ('@/views/dashboard/component/Icons'),
                },
                {
                    name: 'Typography',
                    path: 'typography',
                    component: () =>
                        import ('@/views/dashboard/component/Typography'),
                },
                // Tables
                {
                    name: 'Calendrier',
                    path: 'calendar',
                    component: () =>
                        import ('@/views/dashboard/pages/Calendar'),
                },
                // Maps
                {
                    name: 'Google Maps',
                    path: 'google-maps',
                    component: () =>
                        import ('@/views/dashboard/maps/GoogleMaps'),
                },
                // Upgrade
                {
                    name: 'Support',
                    path: 'support',
                    component: () =>
                        import ('@/views/dashboard/Support'),
                },
                // buttons
                {
                    name: 'Buttons',
                    path: 'buttons',
                    component: () =>
                        import ('@/views/dashboard/component/Buttons'),
                },
                // grid
                {
                    name: 'Grid',
                    path: 'grid',
                    component: () =>
                        import ('@/views/dashboard/component/Grid'),
                },
                // Tabs
                {
                    name: 'Tabs',
                    path: 'tabs',
                    component: () =>
                        import ('@/views/dashboard/component/Tabs'),
                },
                // Rtl
                {
                    name: 'Rtl',
                    path: 'rtl',
                    component: () =>
                        import ('@/views/dashboard/pages/Rtl'),
                },
                // Timeline
                {
                    name: 'Projet',
                    path: 'project',
                    component: () =>
                        import ('@/views/dashboard/pages/Project'),
                },
                {
                    name: 'Wizard',
                    path: 'wizard',
                    component: () =>
                        import ('@/views/dashboard/pages/Wizard')
                },
                {
                    name: 'Login',
                    path: 'login',
                    component: () =>
                        import ('@/views/dashboard/pages/Login')
                },
                {
                    name: 'Register',
                    path: 'register',
                    component: () =>
                        import ('@/views/dashboard/pages/Register')
                }
            ],
        },
        {
            path: '*',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [{
                name: '404 Error',
                path: '',
                component: () =>
                    import ('@/views/dashboard/pages/Error')
            }]
        }
    ],
})