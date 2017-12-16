var app = angular.module("spellryt", ["ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

   $urlRouterProvider.otherwise("/main")
       
   $stateProvider

   .state('main', {
       url: "/main",
       templateUrl: "main.html",
       data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
   })
}]);

app.directive('title', ['$rootScope', '$timeout',
function($rootScope, $timeout) {
  return {
    link: function() {

      var listener = function(event, toState) {

        $timeout(function() {
          $rootScope.title = (toState.data && toState.data.pageTitle) 
          ? toState.data.pageTitle 
          : 'DevBuddy - Developer Supporing Tool';
        });
      };

      $rootScope.$on('$stateChangeSuccess', listener);
    }
  };
}
]);