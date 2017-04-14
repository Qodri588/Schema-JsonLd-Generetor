const app = angular.module('App', []);

app.controller('appCtrl', ['$scope', function($scope){

    $scope.jsonLdOptions = [
        {name: 'Negócio Local', value: 'LocalBusiness'},
        {name: 'Pessoa', value: 'person'},
        {name: 'Produto', value: 'product'},
        {name: 'Evento', value: 'event'},
        {name: 'Organização', value: 'organization'},
        {name: 'Website', value: 'website'}
    ];

    $scope.setOpts = function() {
        $scope.jsonLdBusiness = false;
        $scope.jsonLdOrganization = false;
        $scope.jsonLdWebsite = false;
        $scope.jsonLdPerson = false;
        $scope.jsonLdProduct = false;
        $scope.jsonLdEvent = false;
        delete $scope.jsonFormated; 
    }

    $scope.setOpts();

    $scope.selectJsonLd = function(opt) {
        $scope.setOpts();
        $scope.type = opt.value;

        switch(opt.value) {
            case 'LocalBusiness':
                $scope.jsonLdBusiness = true;
                break;
            case 'organization':
                $scope.jsonLdOrganization = true;
                break;
            case 'website':
                $scope.jsonLdWebsite = true;
                break;
            case 'person':
                $scope.jsonLdPerson = true;
                break;
            case 'product':
                $scope.jsonLdProduct = true;
                break;
            case 'event':
                $scope.jsonLdEvent = true;
                break;
        }
    }

    $scope.addType = function(key) {
        switch(key) {
            case 'address':
            return 'PostalAddress'
            break;
            case 'geo':
            return 'GeoCoordinates'
            break;
            case 'contactPoint':
            return 'ContactPoint'
            break;
            case 'aggregateRating':
            return 'aggregateRating'
            break;
            case 'location':
            return 'Place'
            break;
            case 'offers':
            return 'Offer'
            break;
        }
    };

    $scope.inputChange = function(obj) {
        let args = {};
        for(var key in obj) { 
            args['@context'] = 'http://www.schema.org';
            args['@type'] = $scope.type;
            args[key] = obj[key];
            args[key]['@type'] = $scope.addType(key);
            $scope.jsonFormated = JSON.stringify(args); 
            $('#json').JSONView($scope.jsonFormated);
            $('#json').JSONView('expand');
        }
    }
}])
