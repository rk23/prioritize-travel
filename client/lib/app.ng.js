angular.module('prioritizeTravelApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'accounts.ui'
]);

onReady = function() {
  angular.bootstrap(document, ['prioritizeTravelApp']);
};
  
if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}