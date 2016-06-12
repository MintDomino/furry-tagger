(function ($) {
    'use strict';
    
    angular
        .module('furtool')
        .controller('Converter', Converter);
    
    Converter.$inject = ['TagFactory'];
    
    function Converter(TagFactory) {
        var vm = this;
        
        //Scope Variables
        vm.tags = '';
        vm.e621Tags = '';
        vm.inkbunnyTags = '';
        vm.furaffinityTags = '';
        vm.furryNetworkTags = '';
       
        //Scope Function Declarations
        vm.convert = Convert;
        
        //Function Definitions
        function Convert() {
            vm.e621Tags = TagFactory.Converte621(vm.tags);
            vm.inkbunnyTags = TagFactory.ConvertInkbunny(vm.tags);
            vm.furaffinityTags = TagFactory.ConvertFuraffinity(vm.tags);
            vm.furryNetworkTags = TagFactory.ConvertFurryNetwork(vm.tags);
        }
    }
    
    
    $(document).ready(function() {
       new Clipboard('button');
       
    });
    
})(jQuery);