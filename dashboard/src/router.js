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
                    path: 'accueil',
                    component: () =>
                        import ('@/views/dashboard/pages/Dashboard'),
                },
                // Parametres généraux
                {
                    name: 'Paramètres-généraux',
                    path: 'parametres/parametres-generaux',
                    component: () =>
                        import ('@/views/dashboard/pages/parametres/ParametresG'),
                },
                // Parametres email
                {
                    name: 'Paramètres-email',
                    path: 'parametres/parametres-email',
                    component: () =>
                        import ('@/views/dashboard/pages/parametres/ParametresE'),
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
                    name: 'Comptabilité',
                    path: 'accounting',
                    component: () =>
                        import ('@/views/dashboard/pages/Accounting'),
                },
                // Tables
                {
                    name: 'Calendrier',
                    path: 'calendar',
                    component: () =>
                        import ('@/views/dashboard/pages/Calendar'),
                },
                // Upgrade
                {
                    name: 'Support',
                    path: 'support',
                    component: () =>
                        import ('@/views/dashboard/pages/Support'),
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
                    name: 'Clients',
                    path: 'clients',
                    component: () =>
                        import ('@/views/dashboard/pages/Clients'),
                },
                // Timeline
                {
                    name: 'Projet',
                    path: 'project',
                    component: () =>
                        import ('@/views/dashboard/pages/Project'),
                },
                {
                    name: 'Informations-Client', //infos clients
                    path: 'clients/infosclient',
                    component: () =>
                        import ('@/views/dashboard/pages/InfosClient')
                },
                {
                    name: 'Connexion',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/pages/Login')
                },
                {
                    name: 'Inscription',
                    path: 'register',
                    component: () =>
                        import ('@/views/dashboard/pages/Register')
                },
                {
                    name: 'Collaborateurs',
                    path: 'collaborateurs',
                    component: () =>
                        import ('@/views/dashboard/pages/Collaborateurs')
                },
                {
                    name: 'Informations-Collaborateur', //infos Collaborateurs
                    path: 'collaborateurs/collaborateur',
                    component: () =>
                        import ('@/views/dashboard/pages/InfosCollaborateur')
                },
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
                    import ('@/views/dashboard/Error')
            }]
        }
    ],
})