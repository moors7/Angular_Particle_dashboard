angular.module('routerRoutes', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                //abstract: true,
                templateUrl: "pages/home.html",
                controller: "mainController"
            })
            .state('home.welcome', {
                url: "/",
                templateUrl: "pages/home.welcome.html",
                name: "Welcome",
                controller: "mainController",
                givenName: 'Home'
            })
            .state('home.settings', {
                url: "/settings",
                templateUrl: "pages/settings.html",
                name: "Settings",
                controller: "mainController",
                givenName: 'Settings'
            })

            .state('devices', {
                url: "/devices",
                templateUrl: "pages/devices.html",
                controller: "mainController"
            });
        //$locationProvider.html5Mode(true).hashPrefix('!');;
    });