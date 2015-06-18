angular.module('quizService', [])

	// super simple service
	// each function returns a promise object
	.factory('Quizes', ['$http',function($http) {
		return {
			getQuizes : function() {
				return $http.get('/api/quizes');
			},
			getJugadores : function() {
				return $http.get('/api/jugadores');
			},
			create : function(todoData) {
				return $http.post('/api/quizes', todoData);
			},
			deleteQuiz : function(id) {
				return $http.delete('/api/quizes/' + id);
			},
			
			deleteJugador : function(id) {
				return $http.delete('/api/jugadores/' + id);
			}
		}
	}]);
