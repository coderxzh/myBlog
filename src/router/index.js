import VueRouter from "vue-router";
const Article = () =>
    import ("../components/Article")
const MyContent = () =>
    import ("../components/MyContent")
const Login = () =>
    import ("../components/myLogin")
const Photo = () =>
    import ("../components/Photo")
const MyCategory = () =>
    import ("../components/MyCategory")
const MyBack = () =>
    import ("../components/MyBack")
const Index = () =>
    import ("../components/Index")
const UpLoad = () =>
    import ("../components/UpLoad")
const UpLoadPhoto = () =>
    import ("../components/UpLoadPhoto")
const AllArticle = () =>
    import ("../components/AllArticle")
const ArticleEditor = () =>
    import ("../components/ArticleEditor")

const router = new VueRouter({
    routes: [{
            path: '',
            redirect: '/home'
        }, {
            name: 'home',
            path: '/home',
            component: MyContent
        }, {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'article',
            path: '/article/:id',
            component: Article
        },
        {
            name: 'photo',
            path: '/photo',
            component: Photo
        },
        {
            name: 'category',
            path: '/category',
            component: MyCategory
        },
        {
            name: "backend",
            path: '/backend',
            component: MyBack,
            children: [{
                    name: 'index',
                    path: 'index',
                    component: Index
                }, {
                    name: 'upload',
                    path: 'upload',
                    component: UpLoad
                }, {
                    name: 'uploadphoto',
                    path: 'upLoadphoto',
                    component: UpLoadPhoto
                },
                {
                    name: 'allarticle',
                    path: 'allarticle',
                    component: AllArticle
                },
                {
                    name: 'articleEditor',
                    path: 'articleEditor',
                    component: ArticleEditor
                }
            ]
        }
    ]
})
export default router