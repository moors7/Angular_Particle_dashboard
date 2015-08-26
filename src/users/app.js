angular.module('myApp', ['ngMaterial', 'users', 'ui.router', 'routerRoutes', 'ngAnimate'])

    .config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("backburger" , "./assets/svg/backburger.svg"  , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');
    })

    .controller('mainController', [
        'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
        function(userService, $mdSidenav, $mdBottomSheet, $log, $q){

            var self = this;

            self.selected     = null;
            self.users        = [ ];
            self.selectUser   = selectUser;
            self.toggleList   = toggleUsersList;
            self.showContactOptions  = showContactOptions;
            self.toggleMenu = toggleMenu;

            // Load all registered users

            userService
                .loadAllUsers()
                .then( function( users ) {
                    self.users    = [].concat(users);
                    self.selected = users[0];
                });

            // *********************************
            // Internal methods
            // *********************************

            /**
             * First hide the bottomsheet IF visible, then
             * hide or Show the 'left' sideNav area
             */
            function toggleUsersList() {
                var pending = $mdBottomSheet.hide() || $q.when(true);

                pending.then(function(){
                    $mdSidenav('deviceMenu').toggle();
                });
            }

            function toggleMenu(menu) {
                $mdSidenav(menu).toggle();
            }


            /**
             * Select the current avatars
             * @param menuId
             */
            function selectUser ( user ) {
                self.selected = angular.isNumber(user) ? $scope.users[user] : user;
                self.toggleList();
            }

            /**
             * Show the bottom sheet
             */
            function showContactOptions($event) {
                var user = self.selected;

                return $mdBottomSheet.show({
                    parent: angular.element(document.getElementById('sideNav')),
                    templateUrl: './src/users/view/contactSheet.html',
                    controller: [ '$mdBottomSheet', ContactPanelController],
                    controllerAs: "cp",
                    bindToController : true,
                    targetEvent: $event
                }).then(function(clickedItem) {
                    clickedItem && $log.debug( clickedItem.name + ' clicked!');
                });

                /**
                 * Bottom Sheet controller for the Avatar Actions
                 */
                function ContactPanelController( $mdBottomSheet ) {
                    this.email;
                    this.password;
                    
                    this.Login = function(){
                        console.log("fuck yeah");
                        console.log(this.email);
                        console.log(password);

                        spark.login({username: this.email , password: this.password}, callback);
                    }

                    this.user = user;
                    this.actions = [
                        { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
                        { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
                        { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
                        { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
                    ];
                    this.submitContact = function(action) {
                        $mdBottomSheet.hide(action);
                    };
                }
            }

        }
    ])

    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);



var callback = function(err, body) {
    console.log('API call login completed on callback:', body);
};





  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  //
  //function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $q) {
  //  var self = this;
  //
  //  self.selected     = null;
  //  self.users        = [ ];
  //  self.selectUser   = selectUser;
  //  self.toggleList   = toggleUsersList;
  //  self.showContactOptions  = showContactOptions;
  //  self.toggleDeviceMenu = toggleDeviceMenu;
  //
  //  // Load all registered users
  //
  //  userService
  //        .loadAllUsers()
  //        .then( function( users ) {
  //          self.users    = [].concat(users);
  //          self.selected = users[0];
  //        });
  //
  //  // *********************************
  //  // Internal methods
  //  // *********************************
  //
  //  /**
  //   * First hide the bottomsheet IF visible, then
  //   * hide or Show the 'left' sideNav area
  //   */
  //  function toggleUsersList() {
  //    var pending = $mdBottomSheet.hide() || $q.when(true);
  //
  //    pending.then(function(){
  //      $mdSidenav('left').toggle();
  //    });
  //  }
  //
  //  function toggleDeviceMenu() {
  //      $mdSidenav('deviceMenu').toggle();
  //  }
  //
  //
  //  /**
  //   * Select the current avatars
  //   * @param menuId
  //   */
  //  function selectUser ( user ) {
  //    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
  //    //self.toggleList();
  //  }
  //
  //  /**
  //   * Show the bottom sheet
  //   */
  //  function showContactOptions($event) {
  //      var user = self.selected;
  //
  //      return $mdBottomSheet.show({
  //        parent: angular.element(document.getElementById('content')),
  //        templateUrl: './src/users/view/contactSheet.html',
  //        controller: [ '$mdBottomSheet', ContactPanelController],
  //        controllerAs: "cp",
  //        bindToController : true,
  //        targetEvent: $event
  //      }).then(function(clickedItem) {
  //        clickedItem && $log.debug( clickedItem.name + ' clicked!');
  //      });
  //
  //      /**
  //       * Bottom Sheet controller for the Avatar Actions
  //       */
  //      function ContactPanelController( $mdBottomSheet ) {
  //        this.user = user;
  //        this.actions = [
  //          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
  //          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
  //          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
  //          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
  //        ];
  //        this.submitContact = function(action) {
  //          $mdBottomSheet.hide(action);
  //        };
  //      }
  //  }
  //
  //}





