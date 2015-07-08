angular.module('quizController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Quizes', function($scope, $http, Quizes) {
		$scope.quiz = {pregunta: "1", respuesta: "2", tema: "3"};
		$scope.loading = true;

		 $scope.gridOptions=
		 {columnDefs : [
    { name:'usu', width:50, enablePinning:false },
    { name:'Nombre', width:100, pinnedLeft:true },
    { name:'Saldo.saldo', width:100, pinnedRight:true  },
    { name:'Perfile.descripcion', width:150  }],
	data : []};
		 
	/*
    { name:'address.city', width:150 },
    { name:'address.state', width:50 },
    { name:'address.zip', width:50 },
    { name:'company', width:100 },
    { name:'email', width:100 },
    { name:'phone', width:200 },
    { name:'about', width:300 },
    { name:'friends[0].name', displayName:'1st friend', width:150 },
    { name:'friends[1].name', displayName:'2nd friend', width:150 },
    { name:'friends[2].name', displayName:'3rd friend', width:150 },*/
  

		
		 
	/*	
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
        
        
	 $scope.gridColumnsApuestas =  [{
		    field: "nombre",
		    title: "Nombre",
		    width: "120px"
		}
		 ,{
            field: "apostado",
            title: "Apostado",
            width: "120px"
        }
        ,{
            field: "ganado",
            title: "Ganado",
            width: "120px"
        }
        ,{
            field: "Tipo_Estado.descripcion",
            title: "Perfil",
            width: "120px"
        }
        ];

*/
	angular.element(document).ready(function () {
	// GET =====================================================================
	// when landing on the page, get all todos and show them
	// use the service to get all the todos
	
	
	
	
	
	
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
		
		
		
		$scope.gridOptions.data=data;
		
	});
	
	Quizes.getApuestas()
		.success(function(data) {
		$scope.apuestas = data;
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

		
		
		$scope.deleteJugador = function(id) {
			$scope.loading = true;

			Quizes.deleteJugador(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.gridOptions.data = data;
					
					
						$scope.gridOptions.rowData = data;
						$scope.gridOptions.api.onNewRows();
				});
		};
		
			$scope.ClearGridJugadores = function(){
				
			$scope.gridOptions.data={};
			};
		
		
		
	}]);
