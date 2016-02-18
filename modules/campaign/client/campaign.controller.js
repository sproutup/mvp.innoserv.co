'use strict';

(function() {

    angular
      .module('campaign')
      .controller('CampaignController', CampaignController);

    CampaignController.$inject = ['$scope', '$rootScope', '$state', 'CampaignService', '$location', 'Authentication', 'Menus', 'ProductService', '$modal'];

    function CampaignController($scope, $rootScope, $state, CampaignService, $location, Authentication, Menus, ProductService, $modal) {
      var vm = this;
      vm.create = create;
      vm.initTemplate = initTemplate;
      vm.remove = remove;
      vm.update = update;
      vm.cancel = cancel;
      vm.find = find;
      vm.findOne = findOne;
      vm.findContent = findContent;
      vm.openModal = openModal;
      vm.startCampaign = startCampaign;
      vm.stopCampaign = stopCampaign;
      vm.returnMatch = returnMatch;
      vm.viewDetails = viewDetails;
      vm.closeDetails = closeDetails;
      vm.approveRequest = approveRequest;
      vm.findContributors = findContributors;
      vm.findProducts = findProducts;
      vm.socialOptions = [
        {  title: 'Twitter',
           type: 'tw' },
        {  title: 'Instagram',
           type: 'ig' },
        {  title: 'YouTube',
           type: 'yt' }
      ];

      // Get the topbar menu
      vm.menu = Menus.getMenu('company.campaign.menu');
      vm.trialmenu = Menus.getMenu('company.navbar.campaign.trial.view.menu');

      function create(isValid) {
        vm.error = null;

        if (!isValid) {
          console.log('not valid');
          $scope.$broadcast('show-errors-check-validity', 'campaignForm');

          return false;
        }

        // Create new campaign object
/*          var CampaignObj = CampaignService.campaigns();
        var campaign = new CampaignObj({
          companyId: $scope.company.company.id,
          description: vm.description,
          type: vm.type,
          name: vm.name
        }); */

        if (vm.product) {
          vm.item.productId = vm.product.id;
        }

        // temporary hack
        vm.item.typeOfContent = [];
        for (var s = 0; s < vm.socialOptions.length; s++) {
          if (vm.socialOptions[s].type) {
            vm.item.typeOfContent.push(vm.socialOptions[s].type);
          }
        }

        vm.item.$save(function (response) {
          vm.item = {};
          $state.go('company.navbar.campaign.edit-trial', { campaignId: response.id });
          // Clear form fields
        }, function (errorResponse) {
          vm.error = errorResponse.data.message;
        });
      }

      function initTemplate() {
        vm.error = null;

        if (!$scope.template.item.type) {
          var listener = $scope.$watch('template.item.type', function(val) {
            if(val) {
              listener();
              initTemplate();
            }
          });
          return;
        }

        console.log('template loaded...!', $scope.template);
        // We may want to hook up socialOptions to vm.item.socialOptions here
        // Create new campaign object
        var Campaign = CampaignService.campaigns();
        vm.item = new Campaign($scope.template.item);
        vm.item.companyId = $scope.company.company.id;
        vm.item.status = 0;
        findProducts();
      }

      function remove(campaign) {
        if (campaign) {
          campaign.$remove({
            campaignId: campaign.id
          }, function() {
            $state.go('company.navbar.campaign.list');
          });

          for (var i in vm.companies) {
            if (vm.companies[i] === campaign) {
              vm.companies.splice(i, 1);
            }
          }
        }
      }

      function update(isValid) {
        vm.error = null;

        if (!isValid) {
          vm.invalid = true;
          $scope.$broadcast('show-errors-check-validity', 'articleForm');

          return false;
        } else {
          vm.invalid = false;
        }

        vm.item.$update({
          campaignId: $state.params.campaignId
        }, function (response) {
          $state.go('company.navbar.campaign.list');
        }, function (errorResponse) {
          vm.success = null;
          vm.error = errorResponse.data.message;
        });
      }

      function startCampaign () {
        vm.item.status = 1;
        update();
      }

      function stopCampaign () {
        var CampaignObj = CampaignService.campaignFields();
        var campaign = new CampaignObj();
        campaign.status = -1;
        campaign.$update({
          campaignId: $state.params.campaignId
        }, function (response) {
          vm.succes = true;
          $state.go('company.navbar.campaign.list');
        }, function (errorResponse) {
          vm.success = null;
          vm.error = errorResponse.data.message;
        });
      }

      function cancel() {
        $state.go('company.navbar.campaign.list');
      }

      function find() {
        if ($scope.company.company.id) {
          makeCall();
        } else {
          $scope.$watch('company.company.id', function(val) {
            if(val) makeCall();
          });
        }

        function makeCall() {
          CampaignService.listByCompany().query({
            companyId: $scope.company.company.id
          }, function(response) {
            vm.campaigns = response;
          }, function(err) {
            console.log(err);
          });
        }
      }

        // TeamService.listByUser().query({
        //   userId: Authentication.user.id
        // },function() {
        //   Authentication.user.sessionCompany = $scope.myCompanies[0];
        //   vm.campaigns = CampaignService.listByCompany().query({
        //     companyId: Authentication.user.sessionCompany.companyId
        //   }, function() {
        //     console.log('coo');
        //   }, function(err) {
        //     console.log(err);
        //   });
        // });

      function findOne() {
        vm.success = false;
        vm.item = {};

        CampaignService.campaigns().get({
          campaignId: $state.params.campaignId
        }, function(res) {
          vm.item = res;
        }, function(err) {
          $state.go('landing.default');
        });
      }

      function findContent() {
        vm.success = false;
        vm.content = {};

        CampaignService.content().query({
          campaignId: $state.params.campaignId
        }, function(res) {
          vm.content = res;
        }, function(err) {
          $state.go('landing.default');
        });
      }

      function findContributors() {
        CampaignService.contributors().get({
          campaignId: $state.params.campaignId
        }, function(res) {
          vm.item = res.campaign;
          vm.contributors = res.items;
          filterContributors();
        }, function(err) {
          $state.go('landing.default');
        });
      }

      function filterContributors() {
        vm.requested = vm.contributors.filter(function(item) {
          return item.state === 0;
        });

        vm.approved = vm.contributors.filter(function(item) {
          return item.state === 1;
        });

        vm.completed = vm.contributors.filter(function(item) {
          return item.state === 10;
        });
      }

      function findProducts() {
        if ($scope.company.company.id) {
          makeCall();
        } else {
          $scope.$watch('company.company.id', function(val) {
            if(val) makeCall();
          });
        }

        function makeCall() {
          vm.products = ProductService.listByCompany().query({
            companyId: $scope.company.company.id
          }, function() {
            console.log('products found');
          }, function(err) {
            console.log(err);
          });
        }
      }

      function openModal(item) {
        var modalInstance = $modal.open({
          templateUrl: 'modules/core/client/delete-confirmation.html',
          controller: 'DeleteController',
          controllerAs: 'vm',
          resolve: {
            message: function() { return 'Deleting a campaign is risky business.'; }
          }
        });

        modalInstance.result.then(function () {
          remove(item);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      function returnMatch (actual, expected) {
        if (!expected) {
           return true;
        }
        return angular.equals(expected, actual);
      }

      function viewDetails(request) {
        vm.request = request;
      }

      function closeDetails() {
        vm.details = false;
      }

      function approveRequest(request) {
        console.log(request);
        // request.state = 1;
        // request.$update(function(response) {
        //   console.log(response);
        //   vm.success = true;
        // }, function (errorResponse) {
        //   console.log(errorResponse);
        //   vm.error = errorResponse.data.message;
        // });
      }

//       findProducts();

//       if ($rootScope.startingCampaign) {
//         vm.product = $rootScope.startingCampaign;
//       }
    }
})();
