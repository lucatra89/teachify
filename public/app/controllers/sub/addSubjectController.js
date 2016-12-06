define(function ( require ) {

	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore');
	
	require('services/tutorQFactory');
	

	
	app.register.controller('addSubjectController' , [ '$scope', 'utilities', 'tutorQFactory' , function($scope , utilities, tutorQFactory) {
		
		var tutor,
			subjects,
			filteredSubjects,
			lessons;
		
		
		$('#modalAddSubject').on('show.bs.modal', function (event) {
			tutor = $scope.$parent.tutor;
			subjects = $scope.$parent.subjects;
			lessons = $scope.$parent.tutor.lessons;
			filteredSubjects = _.filter(subjects , function(subject) {
	    		return !(_.has(lessons, subject.name));
			});
			
			$scope.filteredSubjects = filteredSubjects;
			utilities.refreshScope();
		});
		
		
		function addSubject() {

				var subjectId = JSON.parse( $("select[name='subject.id']").val() ),
				typeId = JSON.parse( $("select[name='type.id']").val() ),
				subject = _.findWhere($scope.subjects , {id : subjectId}),
				subjectName = subject.name,
				lesson = {
					subject : subject,
					typeOfEducation : _.findWhere($scope.typesOfEducation , { id : typeId})
			};

			tutorQFactory.addLesson(tutor ,lesson)
				.then(function(id){
					lesson = utilities.formatLesson(lesson);
					lesson.id = id;
		
					if(lessons[subjectName])
						lessons[subjectName].push(lesson);
					else
						lessons[subjectName] = [lesson];
					
					filteredSubjects = $scope.filteredSubject = _.without(filteredSubjects , subject);
				})

			
    	}
		
		
		$scope.addSubject = addSubject;

			
	}]);
});