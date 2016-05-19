'use strict';

angular
  .module('slug')
  .controller('SlugController', SlugController);

SlugController.$inject = ['$state', 'SlugService', 'slugitem', '$analytics'];

function SlugController($state, SlugService, slugitem, $analytics) {
  var vm = this;
  vm.item = null;
  vm.init = true;
  vm.slug = slugitem;

  console.log('slug init: ', slugitem.data.type);
  vm.item = slugitem.data.item;
  if($state.current.name === 'navbar.slug' || $state.current.name === 'navbar.slug.referral'){
    var state;
    switch(slugitem.data.type){
      case 'Campaign':
        if ($state.current.name === 'navbar.slug.referral') {
          trackReferral();
        }
        $state.go('navbar.campaign.' + slugitem.data.item.type + '.view.details', {campaignId: slugitem.data.item.id});
        break;
      case 'User':
        $state.go('navbar.user.buzz', {slug: slugitem.data.item.username});
        break;
    }
    console.log('slug state.go: ', state);
  }

  function slug() {
    console.log('slug init: ', slugitem.data.type);
    vm.item = slugitem.data.item;
    if($state.current.name === 'navbar.slug'){
      var state = $state.current.name + '.' + slugitem.data.type.toLowerCase();
      // We shouldn't need this extra campaign state call
      if (slugitem.data.type.toLowerCase() === 'campaign') {
        state = state + '.' + slugitem.data.item.type + '.view.details';
      }
      console.log('slug redirect: ', state);
      $state.go(state);
    }
  }

  function trackReferral() {
    $analytics.eventTrack('Referral Page View', {
      campaignId: slugitem.data.item.id,
      campaingHashtag: slugitem.data.item.hashtag,
      username: $state.params.userslug,
      companyId: slugitem.data.item.companyId,
      companyName: slugitem.data.item.company.name,
      productId: slugitem.data.item.productId,
      productName: slugitem.data.item.product.name,
      referralId: slugitem.data.item.hashtag + '_' + $state.params.userslug
    });
  }
}
