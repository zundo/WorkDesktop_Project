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
                    path: 'pages/user',
                    component: () =>
                        import ('@/views/dashboard/pages/UserProfile'),
                },
                // Parametres
                {
                    name: 'Paramètres',
                    path: 'pages/parametres',
                    component: () =>
                        import ('@/views/dashboard/pages/Parametres'),
                },
                {
                    name: 'Notifications',
                    path: 'components/notifications',
                    component: () =>
                        import ('@/views/dashboard/component/Notifications'),
                },
                {
                    name: 'Icons',
                    path: 'components/icons',
                    component: () =>
                        import ('@/views/dashboard/component/Icons'),
                },
                {
                    name: 'Typography',
                    path: 'components/typography',
                    component: () =>
                        import ('@/views/dashboard/component/Typography'),
                },
                // Tables
                {
                    name: 'Calendrier',
                    path: 'pages/calendar',
                    component: () =>
                        import ('@/views/dashboard/pages/Calendar'),
                },
                // Maps
                {
                    name: 'Google Maps',
                    path: 'maps/google-maps',
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
                    path: 'components/buttons',
                    component: () =>
                        import ('@/views/dashboard/component/Buttons'),
                },
                // grid
                {
                    name: 'Grid',
                    path: 'components/grid',
                    component: () =>
                        import ('@/views/dashboard/component/Grid'),
                },
                // Tabs
                {
                    name: 'Tabs',
                    path: 'components/tabs',
                    component: () =>
                        import ('@/views/dashboard/component/Tabs'),
                },
                // Rtl
                {
                    name: 'Rtl',
                    path: 'pages/rtl',
                    component: () =>
                        import ('@/views/dashboard/pages/Rtl'),
                },
                // Timeline
                {
                    name: 'Projet',
                    path: 'pages/project',
                    component: () =>
                        import ('@/views/dashboard/pages/Project'),
                },
                {
                    name: 'Wizard',
                    path: 'pages/wizard',
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