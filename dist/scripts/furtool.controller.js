(function ($) {
    'use strict';
    
    angular
        .module('furtool')
        .controller('Converter', Converter);
    
    Converter.$inject = ['$timeout','TagFactory','DataService'];
    
    function Converter($timeout,TagFactory,DataService) {
        var vm = this;
        
        //Scope Variables
        vm.tags = '';
        vm.e621Tags = '';
        vm.inkbunnyTags = '';
        vm.furaffinityTags = '';
        vm.furryNetworkTags = '';
        vm.suggestion = {
            contact: '',
            idea: ''
        }
        vm.ideaMessage = '';
        vm.ideaError = '';
        vm.submitted = false;
        vm.maxChars = 500;
        
       
        //Scope Function Declarations
        vm.convert = Convert;
        vm.submitIdea = SubmitIdea;
        
        //Function Definitions
        function Convert() {
            vm.e621Tags = TagFactory.Converte621(vm.tags);
            vm.inkbunnyTags = TagFactory.ConvertInkbunny(vm.tags);
            vm.furaffinityTags = TagFactory.ConvertFuraffinity(vm.tags);
            vm.furryNetworkTags = TagFactory.ConvertFurryNetwork(vm.tags);
        }
        
        function SubmitIdea() {
            vm.ideaMessage = '';
            vm.ideaError = '';
            vm.submitted = true;
            if (vm.maxChars < vm.suggestion.idea.length) {
                vm.ideaError = "You entered too much feedback in the box.";
                vm.submitted = false;
            } else {
                if (vm.suggestion.idea) {
                    DataService.SubmitIdea(vm.suggestion).then(function(success) {
                    if(success) {
                        $timeout(function() {
                            vm.submitted = true;
                            vm.ideaMessage = "Thanks, I got your message."; 
                        },0);
                    } else {
                        $timeout(function() {
                            vm.ideaError = "Something went wrong sending the message. Try again in a little bit.";
                            vm.submitted = false;
                        },0);
                            
                    }
                    });
                } else {
                    vm.ideaError = "You didn't enter any feedback in the box.";
                    vm.submitted = false;
                }
            }
        }
        
        
    }
    
    
    $(document).ready(function() {
       new Clipboard('button');
       
    });
    
})(jQuery);