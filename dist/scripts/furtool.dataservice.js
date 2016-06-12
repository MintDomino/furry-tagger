(function($){
    'use strict';
    
    angular
        .module('furtool')
        .factory('DataService', DataService);
    
    function DataService() {
      
      var serviceCalls = {
            SubmitIdea: SubmitIdea
        };
        return serviceCalls;
      
      function SubmitIdea(suggestion) {
            return firebase.database().ref('suggestions/').push(suggestion)
                .then(function(result) {
                   return true;
                }, function (error) {
                    return false;
                });
        }
        
    };
    
})(jQuery);