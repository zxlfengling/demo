/**
 * Created by zxl on 2018/8/9.
 */
angular.module('tm.pagination', []).directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
        '<ul data-am-widget="pagination" class="am-pagination am-pagination-default" ng-show="conf.totalItems > 0">' +
        '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>????</span></li>' +
        '<li ng-repeat="item in pageList track by $index" ng-class="{\'am-active\': item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<span>{{ item }}</span>' +
        '</li>' +
        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>????</span></li>' +
        '</ul>' +
        /**
         '<div class="page-total" ng-show="conf.totalItems > 0">' +
         '??<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
         '/??<strong>{{ conf.totalItems }}</strong>?? ' +
         '?????<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' +
         '</div>' +
         **/
        '<div class="no-items" ng-show="conf.totalItems <= 0">????????</div>' +
        '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {

            var conf = scope.conf;

            // ?????????
            var defaultPagesLength = 9;

            // ???????????????????????
            var defaultPerPageOptions = [10, 15, 20, 30, 50];

            // ??????????
            var defaultPerPage = 15;

            // ??????????
            if(conf.pagesLength) {
                // ?§Ø???¡¤??????
                conf.pagesLength = parseInt(conf.pagesLength, 10);

                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }

                // ???????????????????????????????????
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // ?????????????????????
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPerPageOptions;
            }

            // pageList????
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

                // ??????????>0???????????????????
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // ???itemsPerPage?????perPageOptions?????§µ????itemsPerPage?????????????
                var perPageOptionsLength = scope.conf.perPageOptions.length;

                // ??????
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // ???itemsPerPage?????perPageOptions?????§µ????itemsPerPage?????????????
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }

                // ????????sort
                conf.perPageOptions.sort(function(a, b) {return a - b});


                // ??????
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // ?§Ø?????????§³???????????????§³??????????
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // ???????????????????????????????1.??????...2.??????...3.???????...??
                    // ?????????????
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // ??????...
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
                        // ??????????????????...
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

            // ???????
            scope.changeCurrentPage = function(item) {

                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()????
                    if(conf.onChange) {
                        conf.onChange();
                    }
                }
            };

            // ?????????????
            scope.changeItemsPerPage = function() {

                // ?????????????????????????1
                conf.currentPage = 1;

                getPagination();
                // conf.onChange()????
                if(conf.onChange) {
                    conf.onChange();
                }
            };

            // ????
            scope.jumpToPage = function() {
                num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);

                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }

                        // ???
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()????
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

                // ???????????????????onChange???
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
