'use strict';

angular
  .module('campaign')
  .controller('ReferralController', ReferralController);

ReferralController.$inject = ['CampaignService', '$state', 'Authentication', '$scope', 'slugitem', '$analytics'];

function ReferralController(CampaignService, $state, Authentication, $scope, slugitem, $analytics) {
  if (slugitem.data && slugitem.data.item && $state.params.username) {
    $analytics.eventTrack('Referral Page View', {
      campaignId: slugitem.data.item.id,
      username: $state.params.username,
      companyId: slugitem.data.item.companyId,
      productId: slugitem.data.item.productId,
      referralId: slugitem.data.item.id + '_' + $state.params.username
    });
  }
}
