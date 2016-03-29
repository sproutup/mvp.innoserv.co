'use strict';

angular
  .module('core')
  .directive('upAvatar', upAvatar);

function upAvatar() {
  var directive = {
    restrict: 'A',
    link: linkFunc
  };

  return directive;

  function linkFunc(scope, element, attr) {
    scope.$watch(attr.upAvatar, function upAvatarRender(value) {
      // If the user has a profile picture, set that as the img src attribute, otherwise set the default picture.
      if (value && value.avatar && value.avatar.file && value.avatar.file.url) {
        attr.$set('src', value.avatar.file.url + '?w=' + attr.width + '&h=' + attr.height);
      } else {
        attr.$set('src', 'modules/core/client/img/default-avatar.png');
      }
    });
  }
}
