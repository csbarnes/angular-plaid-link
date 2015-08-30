angular.module('MyApp', [
    'angular-plaid-link'
])

    .config([
        'plaidLinkProvider',

        function(plaidLinkProvider) {
            plaidLinkProvider.init({
                clientName: 'My App',
                env: 'tartan',
                key: 'test_key',
                product: 'auth'
            });
        }
    ])

    .controller('mainCtrl', [
        '$scope',
        'plaidLink',

        function($scope, plaidLink) {
            $scope.token = '';
            $scope.plaidIsLoaded = plaidLink.isLoaded;

            plaidLink.create({
                onSuccess: function(token) {
                    $scope.token = token;
                },
                onExit: function() {
                    console.log('user closed');
                }
            });

            $scope.openPlaid = function(bankType) {
                plaidLink.open(bankType);
            };
        }
    ]);
