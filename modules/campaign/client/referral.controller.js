'use strict';

angular
  .module('campaign')
  .controller('ReferralController', ReferralController);

ReferralController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', 'slugitem', '$analytics'];

function ReferralController(CampaignService, $state, Authentication, $scope, slugitem, $analytics) {
  if (slugitem.data && slugitem.data.item && $state.params.username) {
    $analytics.eventTrack('Referral Page View', {
      campaignId: slugitem.data.item.id,
      campaingHashtag: slugitem.data.item.hashtag,
      username: $state.params.username,
      companyId: slugitem.data.item.companyId,
      companyName: slugitem.data.item.company.name,
      productId: slugitem.data.item.productId,
      productName: slugitem.data.item.product.name,
      referralId: slugitem.data.item.hashtag + '_' + $state.params.username
    });
  }
}
