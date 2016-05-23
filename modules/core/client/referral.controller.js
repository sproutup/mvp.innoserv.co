'use strict';

angular
  .module('core')
  .controller('ReferralController', ReferralController);

ReferralController.$inject = ['slugitem', 'useritem', '$analytics'];

function ReferralController(slugitem, useritem, $analytics) {
  if (slugitem.data && slugitem.data.item && useritem.data && useritem.data.item) {
    $analytics.eventTrack('Referral Page View', {
      campaignId: slugitem.data.item.id,
      campaingHashtag: slugitem.data.item.hashtag,
      username: useritem.data.item.username,
      companyId: slugitem.data.item.companyId,
      companyName: slugitem.data.item.company.name,
      productId: slugitem.data.item.productId,
      productName: slugitem.data.item.product.name,
      referralId: slugitem.data.item.id + '_' + useritem.data.item.id
    });
  }
}
