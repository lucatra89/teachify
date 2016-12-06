define(function ( require ) {

	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore');
	
	require('services/tutorQFactory');
	
	 function filterTypesOfEducation(typesOfEducation, subjectLessons) {
		return _.filter(typesOfEducation , function(type) {
					for(var i = 0 ; i < subjectLessons.length ; i++){
						if(type.id == subjectLessons[i].typeOfEducation.id)
							return false;
					}
					
					return true;
				});
	}

	
	app.register.controller('updateSubjectController' , [ '$scope', 'utilities', 'tutorQFactory' , function($scope , utilities, tutorQFactory) {
		var tutor,
			subjectName,
			subject,
			subjects,
			lessons,
			subjectLessons,
			typesOfEducation,
			filteredTypes,
			handlers;
		
		$('#modalUpdateSubject').on('show.bs.modal', function (event) {
			subjectName= $scope.subject = $(event.relatedTarget) .data('subject');
			tutor = $scope.$parent.tutor;
			subjects = $scope.$parent.subjects;
			subject = _.findWhere(subjects , {name : subjectName});
			lessons = $scope.$parent.tutor.lessons;
			subjectLessons = $scope.subjectLessons = lessons[subjectName];
			typesOfEducation = $scope.$parent.typesOfEducation;
			filteredTypes = $scope.filteredTypes = filterTypesOfEducation(typesOfEducation, subjectLessons);
			utilities.refreshScope();
		});
		
		handlers = {
    			deleteLesson : function(lesson){
    	    		var typeOfEducation = _.findWhere(typesOfEducation , {id : lesson.typeOfEducation.id});// è necessario avere l'oggeto stesso --> problemi _.without
    				tutorQFactory.deleteLesson(tutor, lesson)
						.then(function () {
		    	    		filteredTypes.push(typeOfEducation);
		    				subjectLessons = $scope.subjectLessons = lessons[subjectName] = _.without( subjectLessons , lesson);
		    				
		    				if(_.isEmpty( subjectLessons))
		    					delete lessons[subjectName];
						});

    			},
    			
    			addLesson : function() {
    				var typeId = JSON.parse( $("select[name='newlesson']").val() ),
    					typeOfEducation = _.findWhere( typesOfEducation , { id : typeId}),
    					lesson = {
    						subject : subject,
    						typeOfEducation : typeOfEducation
    				};
    				
    				tutorQFactory.addLesson(tutor , lesson)
					.then(function (id) {
	    				lesson = utilities.formatLesson(lesson);
	    				lesson.id = id;
	    				
	    				if(!lessons[subjectName] || lessons[subjectName].lenght == 0)
	    					subjectLessons = $scope.subjectLessons = lessons[subjectName]   = [];
	    				
	    				lessons[subjectName].push(lesson);
	
	    				filteredTypes = $scope.filteredTypes = _.without(filteredTypes , typeOfEducation);
					});

    				
    			},

		};
		
		
		_.extend($scope , handlers);
	
	}]);
});