/**
 * Created by zxl on 2018/7/30.
 */

//ʲô��ui-view?��һ�������״̬���ƽӿ�
//ģ�涼��ui-view
/*���ʹ��$stateProvider.state(stateName, stateConfig)
 $config��ʾ·�ɷ�����$stateProvider��ʾ�ṩ�ķ���
 stateConfig��һ��object���󣬿�������url��templateUrl��controller������
 login��home��home.articleList����״̬
 ���Ǹ�������״̬
*/
app.config(function($urlRouterProvider,$stateProvider){
    //·���ض���
    //config��������·�ɵ����ã�config��angularģ���µ�һ������
    //$stateProvider ���ṩ��һ�����������������ȥ����·�ɣ���״̬�����ú�
    //״̬1��login��ʾ״̬�����֣�url��ʾ���ݵı�ʾ·��

    //��ngRoute��otherwise()�������ƣ����û��ύ��·��û�б������ʱ�������ض���ָ����ҳ�档
    //���Ǹ�������Ĭ�ϡ�·���ĺ÷����� otherwise()ֻ����һ��������
    //Ҫô����Ҫô�ַ������ַ�������Ϊ�Ϸ���url·�ɵ�ַ��
    //���������û���κ�·����ƥ���ʱ�����С�
    $urlRouterProvider.when("", "/login");//$urlRouterProvider.wen·���ض���
    $stateProvider
        .state("login", {
            url: '/login',//���û������/loginʱ������html/login.html���ҳ��
            templateUrl:'html/login.html'//��ʾ��ҳ��ĵ�ַ
        })
        .state("home", {
            url: '/home',
            templateUrl:'html/home.html'
        })
        .state("home.articleList", {
            url: '/articleList?startAt&endAt&type&status&page&id',
            templateUrl:'html/articleList.html',
            //controller:"articleList"
        })
        .state("home.articleAdd", {
            url: '/articleAdd?id',
            templateUrl:'html/articleAdd.html'
        })
})