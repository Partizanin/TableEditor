let app = angular.module("myApp2", []);

app.controller("myController", function ($scope, $http, $q) {


    $scope.closeAddModal = function () {
        console.log('hide Modal');

    };

    $scope.addNewUser = function () {
        /*get data from form*/
        var id = $("#input_id_add").next().val();
        var name = $("#input_name_add").next().val();
        var position = $("#input_position_add").next().val();
        var office = $("#input_office_add").next().val();
        var age = $("#input_age_add").next().val();
        var startDate = $("#input_startDate_add").next().val();
        var sallary = $("#input_sallary_add").next().val();
        $('#addModal').modal("hide");
        /*Validate Data*/
        /*do something*/


    };


    $('#addModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var recipient = button.data('whatever'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        // modal.find('.modal-title').text('New message to ' + recipient);
        modal.find('.modal-body input').val(recipient);

    });

    $scope.users = {};

    $scope.filteredUser = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.paginationLength = 4;
    /*todo: if pagination length <4 pagination length = 4*/
    $scope.totalPages = 0;

    $scope.lastpage = 0;


    $scope.orderByField = 'Name';
    $scope.defaultIconClass = 'fa fa-exchange fa-rotate-90';
    $scope.sortedIconClass = 'fa fa-sort-amount-asc';
    $scope.reverseSort = false;
    $scope.lastSelected = '10';
    $scope.selectedValue = '10';


    function init() {

        $("#searchInput").focus();

        $scope.callToServer("read", "").then(function (data) {
            $scope.users = data;
            setPages();
            initWatch();
        });

    }


    $scope.selectedChange = function () {
        var temp = $scope.itemsPerPage;
        $scope.itemsPerPage = (function () {

            var selectedValue = $scope.selectedValue;

            if (selectedValue === "all") {
                return $scope.users.users.length;
            } else {
                return parseInt(selectedValue);
            }

        })();
        setPages();
        console.log("itemPerPage Changed from " + temp + " to " + $scope.itemsPerPage);
        $scope.setPage($scope.lastpage);
    };

    function setPages() {
        /*todo: bug - when you choose 2 don`t show 1*/

        console.log("Pages: " + $scope.pages);
        $scope.totalPages = Math.ceil($scope.users.users.length / $scope.itemsPerPage);

        $scope.lastpage = Math.ceil($scope.users.users.length / $scope.itemsPerPage);

        var result = [];

        $scope.paginationLength = (function () {
            if ($scope.selectedValue !== "all") {
                return Math.ceil(($scope.totalPages / 2) + 1);
            } else {
                return 1;
            }

        })();


        for (var i = 1; i < $scope.paginationLength + 1; i++) {
            result.push(i);
        }

        $scope.pages = result;
        console.log("Pages: " + $scope.pages);
    }

    $scope.setPage = function (setPageNumber) {

        var result = $scope.pages;
        var paginationCenter = $scope.pages[Math.ceil($scope.paginationLength / 2)];
        var pageWayUp = setPageNumber > $scope.currentPage;

        function getStartPageNumber() {
            if (setPageNumber < 1 || setPageNumber > $scope.totalPages)
                return 0;


            if (setPageNumber === 1)
                return setPageNumber;

            if (setPageNumber === $scope.totalPages)
                return setPageNumber - $scope.paginationLength + 1;


            if (setPageNumber === 1)
                return setPageNumber;

            if (pageWayUp) {
                if (setPageNumber > paginationCenter) {
                    var needAddNumbers = setPageNumber - paginationCenter;

                    var result = $scope.pages[$scope.pages.length - 1] + needAddNumbers;

                    if (result <= $scope.totalPages)
                        return result - $scope.paginationLength + 1;

                }
                return null;
            } else {

                if (setPageNumber < paginationCenter) {
                    var needRemoveNumbers = paginationCenter - setPageNumber;

                    result = $scope.pages[0] - needRemoveNumbers;

                    if (result > 0)
                        return result;
                    else
                        return null;

                } else {
                    return null;
                }

            }


        }

        function getEndPageNumber() {
            if (setPageNumber < 1 || setPageNumber > $scope.totalPages)
                return 0;


            if (setPageNumber === 1)
                return setPageNumber + $scope.paginationLength - 1;


            if (setPageNumber === $scope.totalPages)
                return setPageNumber;

            if (pageWayUp) {

                if (setPageNumber > paginationCenter) {
                    var needAddNumbers = setPageNumber - paginationCenter;

                    var result = $scope.pages[$scope.pages.length - 1] + needAddNumbers;
                    if (result <= $scope.totalPages) {

                        return result;
                    }
                }
            } else {


                if (setPageNumber < paginationCenter)
                    return startPageNumbers + $scope.paginationLength - 1;
                else
                    return null;


            }
        }

        var startPageNumbers = getStartPageNumber();

        var endPageNumbers = getEndPageNumber();

        if (endPageNumbers !== null && startPageNumbers !== null) {
            result = [];
            for (var i = startPageNumbers; i < endPageNumbers + 1; i++) {
                result.push(i);

            }
        }

        $scope.currentPage = setPageNumber;

        $scope.pages = result;

    };

    $scope.searchInput = function () {

        var length = $("#searchInput").val().length;

        if (length > 0) {
            if ($scope.selectedValue !== 'all') {
                $scope.lastSelected = $scope.selectedValue
            }
            $scope.selectedValue = 'all';
        } else {
            $scope.selectedValue = $scope.lastSelected;
        }


    };

    $scope.sortClick = function (event) {
        var currentTarget = event.currentTarget;
        $scope.orderByField = currentTarget.id;

        if ($scope.sortedIconClass === 'fa fa-sort-amount-asc') {
            $scope.sortedIconClass = 'fa fa-sort-amount-desc'
        } else {
            $scope.sortedIconClass = 'fa fa-sort-amount-asc'
        }

    };

    $scope.callToServer = function (operation, data) {

        var deffer = $q.defer();
        var myData = {"operation": operation, "data": data};
        $http({
            url: '/Servlet',
            method: 'Get',
            params: {jsonData: JSON.stringify(myData)}
        }).success(function (data) {
            deffer.resolve(data);
        });

        return deffer.promise;
    };

    $scope.start = function () {
        init();
    };


    function initWatch() {
        $scope.$watch('currentPage + itemsPerPage', function () {
            if ($scope.itemsPerPage !== 'all') {
                $scope.itemsPerPage = parseInt($scope.itemsPerPage);

                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage)
                    , end = begin + $scope.itemsPerPage;

                $scope.filteredUser = $scope.users.users.slice(begin, end);
            } else {
                $scope.filteredUser = $scope.users.users;
            }
        });
    }

    $scope.start();

});
