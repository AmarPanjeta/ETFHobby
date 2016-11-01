app.service('ModalService', ['$uibModal',
//  For Angular-bootstrap 0.14.0 or later, use $uibModal above instead of $modal
function ($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/partials/modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
       //Create temp objects to work with since we're in a singleton service
       var tempModalDefaults = {};
       var tempModalOptions = {};

       //Map angular-ui modal custom defaults to modal defaults defined in service
       angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

       //Map modal.html $scope custom properties to defaults defined in service
       angular.extend(tempModalOptions, modalOptions, customModalOptions);

       if (!tempModalDefaults.controller) {
           tempModalDefaults.controller = function ($scope, $uibModalInstance) {
               $scope.modalOptions = tempModalOptions;
               $scope.modalOptions.ok = function (result) {
                   $uibModalInstance.close(result);
               };
               $scope.modalOptions.close = function (result) {
                   $uibModalInstance.dismiss('cancel');
               };
           };
       }

       return $uibModal.open(tempModalDefaults).result;
   };
}]);


/* usage example

--- call in some function
modalService.showModal({},modalOptions).then(function(result){
      $log.log("brisanje potvrdjeno");
      PredmetService.delete({id: oid}).$promise.then(function(){
        PredmetiService.query().$promise.then(function(response){
          $scope.predmeti=response.predmets;
        });
      });
    })
-----

--- definition of opstions in controller
var modalOptions = {
         closeButtonText: 'Odustani',
         actionButtonText: 'Obrisi predmet',
         headerText: 'Brisanje predmeta',
         bodyText: 'Da li ste sigurni da zelite obrisati odabrani predmet?'
};
*/
