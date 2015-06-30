angular.module('quizController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Quizes', function($scope, $http, Quizes) {
		$scope.quiz = {pregunta: "1", respuesta: "2", tema: "3"};
		$scope.loading = true;
		
		 $scope.gridColumns =  [{
            field: "usu",
            title: "Login",
            width: "120px"
        }
        ,{
            field: "Nombre",
            title: "Name",
            width: "120px"
        }
        ,{
            field: "Saldo.saldo",
            title: "Saldo",
            width: "120px"
        }
        ,{
            field: "Perfile.descripcion",
            title: "Perfil",
            width: "120px"
        }
        ];


	angular.element(document).ready(function () {
	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	
	
	
	Quizes.getQuizes()
		.success(function(data) {
		$scope.quizes = data;
		console.log(data);
	
	});
	
	
	$scope.monthSelectorOptions = {
		start: "year",
		depth: "year",
		};
		$scope.getType = function(x) {
			return typeof x;
		};
		$scope.isDate = function(x) {
			return x instanceof Date;
	};
	
	
	Quizes.getJugadores()
		.success(function(data) {
		console.log(data);
		$scope.jugadores = data;
	
	});
	
	$scope.loading = false;
	
	/*		
	
	$scope.mainGridOptions = {
	dataSource: {
	type: "json",
	transport: {
	read: "/api/jugadores"
	},
	pageSize: 3,
	serverPaging: true,
	serverSorting: true
	},
	sortable: true,
	pageable: true,
	
	columns: [{
	field: "usu",
	title: "Login",
	width: "120px"
	},{
	field: "Nombre",
	title: "Name",
	width: "120px"
	}]
	};	
	
	*/
	
	});


	
			
			
		
			

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createQuiz = function() {
			
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.quiz != undefined) {
				$scope.loading = true;

				console.log($scope.quiz);
				// call the create function from our service (returns a promise object)
				Quizes.create($scope.quiz)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.quiz = {}; // clear the form so our user is ready to enter another
						$scope.quizes = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteQuiz = function(id) {
			$scope.loading = true;

			Quizes.deleteQuiz(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.quizes = data; // assign our new list of todos
				});
		};
		
		
		$scope.deleteJugador = function(id) {
			$scope.loading = true;

			Quizes.deleteJugador(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.jugadores = data; // assign our new list of todos
				});
		};
		
			$scope.ClearGridJugadores = function(){
				$scope.jugadores ={};
			};
		
		
		
	}]);
