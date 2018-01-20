var app = angular.module("spellryt", ["ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

   $urlRouterProvider.otherwise("/main")
       
   $stateProvider

  .state('main', {
    url: "/main",
    templateUrl: "main.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('alphabets', {
    url: "/alphabets",
    templateUrl: "alphabets.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('random', {
    url: "/random",
    templateUrl: "random.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('custom-words', {
    url: "/custom-words",
    templateUrl: "custom-words.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('settings', {
    url: "/settings",
    templateUrl: "settings.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('about', {
    url: "/about",
    templateUrl: "about.html",
    data: {pageTitle: 'DevBuddy - Developer Supporing Tool'} 
  })
  .state('spell', {
    url: "/spell",
    templateUrl: "spell.html",
    controller: "prepare"
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