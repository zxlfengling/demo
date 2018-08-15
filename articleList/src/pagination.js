/**
 * Created by zxl on 2018/8/9.
 */
angular.module('tm.pagination', []).directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
        '<ul data-am-widget="pagination" class="am-pagination am-pagination-default" ng-show="conf.totalItems > 0">' +
        '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>��һҳ</span></li>' +
        '<li ng-repeat="item in pageList track by $index" ng-class="{\'am-active\': item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<span>{{ item }}</span>' +
        '</li>' +
        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>��һҳ</span></li>' +
        '</ul>' +
        /**
         '<div class="page-total" ng-show="conf.totalItems > 0">' +
         'ÿҳ<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
         '/��<strong>{{ conf.totalItems }}</strong>�� ' +
         '��ת��<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' +
         '</div>' +
         **/
        '<div class="no-items" ng-show="conf.totalItems <= 0">��������</div>' +
        '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {

            var conf = scope.conf;

            // Ĭ�Ϸ�ҳ����
            var defaultPagesLength = 9;

            // Ĭ�Ϸ�ҳѡ��ɵ���ÿҳ��ʾ������
            var defaultPerPageOptions = [10, 15, 20, 30, 50];

            // Ĭ��ÿҳ�ĸ���
            var defaultPerPage = 15;

            // ��ȡ��ҳ����
            if(conf.pagesLength) {
                // �ж�һ�·�ҳ����
                conf.pagesLength = parseInt(conf.pagesLength, 10);

                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }

                // ��ҳ���ȱ���Ϊ�����������ż��ʱ���Զ�����
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // ��ҳѡ��ɵ���ÿҳ��ʾ������
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPerPageOptions;
            }

            // pageList����
            function getPagination(newValue, oldValue) {

                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }

                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }

                // conf.itemsPerPage
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

                // �����ҳ����>0�����ҵ�ǰҳ���ڷ�ҳ����
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // ���itemsPerPage�ڲ���perPageOptions�����У��Ͱ�itemsPerPage�������������
                var perPageOptionsLength = scope.conf.perPageOptions.length;

                // ����״̬
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // ���itemsPerPage�ڲ���perPageOptions�����У��Ͱ�itemsPerPage�������������
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }

                // ��ѡ�����sort
                conf.perPageOptions.sort(function(a, b) {return a - b});


                // ҳ�����
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // �ж���ҳ�����С�ڵ��ڷ�ҳ�ĳ��ȣ���С����ֱ����ʾ
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // ��ҳ�����ڷ�ҳ���ȣ���ʱ��Ϊ���������1.���û��...2.�ұ�û��...3.���Ҷ���...��
                    // ��������ƫ����
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // ���û��...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // ���һ����������߶���...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }

                scope.$parent.conf = conf;
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // �����ǰҳ
            scope.changeCurrentPage = function(item) {

                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()����
                    if(conf.onChange) {
                        conf.onChange();
                    }
                }
            };

            // �޸�ÿҳչʾ������
            scope.changeItemsPerPage = function() {

                // һ��չʾ�����������ǰҳ������Ϊ1
                conf.currentPage = 1;

                getPagination();
                // conf.onChange()����
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // ��תҳ
            scope.jumpToPage = function() {
                num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);

                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }

                        // ��ת
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()����
                        if(conf.onChange) {
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }

            };

            scope.jumpPageKeyUp = function(e) {
                var keycode = window.event ? e.keyCode :e.which;

                if(keycode == 13) {
                    scope.jumpToPage();
                }
            }

            scope.$watch('conf.totalItems', function(value, oldValue) {

                // ����ֵ��ֵ��ȵ�ʱ��ȥִ��onChange�¼�
                if(!value || value == oldValue) {

                    if(conf.onChange) {
                        conf.onChange();
                    }
                }
                getPagination();
            })

        }
    };
}]);
