'use strict'

angular.module('coo.modules.appointment.preference',[
    'coo.global'

])

.controller('appointmentPreferenceCtrl',['$scope','$location','cooGlobal',function ($scope,$location,cooGlobal) {
    /*path*/
    $scope.path = function (path) {
        $location.path(path)
    }

    $scope.loaderVisible = false
    $scope.cars = []
    $scope.stores = []

    $scope.init = function () {
        $scope.loaderVisible = true
        cooGlobal.resource(cooGlobal.api.preference_query).query(
            {test: '123'},
            function (res) {
                $scope.cars = res.ResData.PreferenceCar
                $scope.stores = res.ResData.PreferenceStore
                $scope.loaderVisible = false

            },
            function () {
                console.log('error')
                $scope.loaderVisible = false
            }
        )

    }

    //category   PreferenceCar,PreferenceStore
    $scope.save = function (category,info) {
        $scope.loaderVisible = true
        cooGlobal.resource(cooGlobal.api.preference_save).save(
            {
                "Category": category,
                "Type": info.Type,
                "Tag": info.Tag
            },
            function (res) {
                $scope.loaderVisible = false
                if(res.ResCode == 0) {
                    if(category == 'PreferenceCar'){
                        angular.forEach($scope.cars,function (car) {
                            car.IsDefault = car.Type == info.Type && car.Tag == info.Tag
                        })
                    }
                    if(category == 'PreferenceStore') {
                        angular.forEach($scope.stores, function (store) {
                            store.IsDefault = store.Type == info.Type && store.Tag == info.Tag
                        })
                    }
                }else{

                }
            },
            function () {
                console.log('error')
                $scope.loaderVisible = false
            }
        )
    }

    $scope.init()
}])