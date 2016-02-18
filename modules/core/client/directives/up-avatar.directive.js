'use strict';
// This directive creates an avatar with the initials of the user
// It takes a height, width, and fontsize

angular
    .module('core')
    .directive('upAvatar', upAvatar);

function upAvatar() {
  var directive = {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var colours = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'];
      var initials;
      var colourIndex;

      var name = attrs.name;
      if (name) {
        var nameSplit = name.split(' ');
        if (nameSplit[1]) {
          initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
        } else {
          initials = nameSplit[0].charAt(0).toUpperCase();
        }
        var charIndex = initials.charCodeAt(0) - 65;
        colourIndex = charIndex % 19;
      } else {
        initials = '';
        colourIndex = 0;
      }

      var canvas = element[0];
      var context = canvas.getContext('2d');

      var canvasWidth = angular.element(canvas).attr('width'),
          canvasHeight = angular.element(canvas).attr('height'),
          canvasCssWidth = canvasWidth,
          canvasCssHeight = canvasHeight;

      if (window.devicePixelRatio) {
          angular.element(canvas).attr('width', canvasWidth * window.devicePixelRatio);
          angular.element(canvas).attr('height', canvasHeight * window.devicePixelRatio);
          angular.element(canvas).css('width', canvasCssWidth);
          angular.element(canvas).css('height', canvasCssHeight);
          context.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      context.fillStyle = colours[colourIndex];
      context.fillRect (0, 0, canvas.width, canvas.height);
      context.font = attrs.fontsize + 'px Arial';
      context.textAlign = 'center';
      context.fillStyle = '#FFF';
      context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.5);
    }
  };

  return directive;
}