(function($){
    'use strict';
    
    angular
        .module('furtool')
        .factory('TagFactory', TagFactory);
    
    function TagFactory() {
      
      var serviceCalls = {
          Converte621 : Converte621,
          ConvertFuraffinity : ConvertFuraffinity,
          ConvertFurryNetwork : ConvertFurryNetwork,
          ConvertInkbunny : ConvertInkbunny
      };
      return serviceCalls;
      
      function Converte621(tags){
          var tagArray = GetTagArray(tags);
          var convertedTagString = '';
          
          for(var i = 0; i < tagArray.length; i++) {
              //e621 uses underscores for two worded tags - seperates by space
              var item = tagArray[i].replace(/\s{2,}/g, ' ').trim().replace(/ /g,'_');
              convertedTagString += item + ' ';
          }
          
          return convertedTagString.trim();
      }
      
      function ConvertFuraffinity(tags){
          //FA seperates by spaces, people don't use two worded tags there
          var tagArray = GetTagArray(tags);
          var convertedTagString = '';
          
          for(var i = 0; i < tagArray.length; i++) {
              var item = tagArray[i].replace(/\s{2,}/g, ' ').trim().replace(/_/g,' ');
              convertedTagString += item + ' ';
          }
          
          return convertedTagString.trim();
      }
      
      function ConvertFurryNetwork(tags){
          //FN lets you paste in tags using commas with NO SPACE to seperate
          //spaces are autocorrected to hyphens
          var tagArray = GetTagArray(tags);
          var convertedTagString = '';
          
          for(var i = 0; i < tagArray.length; i++) {
              var item = [];
              if (tagArray[i].includes(' ')) {
                  item.push(tagArray[i].replace(/\s{2,}/g, ' ').trim().replace(/ /g,'-'))
                  item.push(tagArray[i].replace(/\s{2,}/g, ' ').trim().replace(/ /g,'_'))
              } else {
                  item.push(tagArray[i]);
              }
              for(var j = 0; j < item.length; j++) {
                convertedTagString += item[j] + ',';
              }
          }
          convertedTagString = convertedTagString.trim();
          convertedTagString = convertedTagString.substring(0,convertedTagString.length-1);
          
          return convertedTagString.trim();
      }
      
      function ConvertInkbunny(tags){
          //inkbunny seperates by commas with space
          //autocorrects spaces to comma with space so two worded tags use underscore
          var tagArray = GetTagArray(tags);
          var convertedTagString = '';
          
          for(var i = 0; i < tagArray.length; i++) {
              var item = tagArray[i].replace(/\s{2,}/g, ' ').trim().replace(/ /g,'_');
              convertedTagString += (i !== tagArray.length-1) ? item + ', ' : item;
          }
          
          return convertedTagString.trim();
      }
      
      function GetTagArray(tags)
      {
          tags = tags.trim();
          return tags.split(',');
      }
        
    };
    
})(jQuery);