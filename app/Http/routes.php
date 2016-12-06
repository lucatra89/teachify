<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'rest'], function(){

    Route::resource('subjects', 'SubjectController',
    	['only'=> ['index', 'store','update', 'destroy']]);

    Route::resource('typesofeducation', 'TypeOfEducationController',
    	['only'=> ['index', 'store','update', 'destroy']]);

    Route::resource('prices', 'PriceController',
    	['only'=> ['index','store', 'destroy']]);

    Route::resource('hours', 'HourController',
        ['only'=> ['index', 'store', 'destroy']]);
    
    Route::resource('admins', 'AdminsController',
        ['only'=> ['index', 'store', 'destroy']]);

    Route::resource('profile' , 'ProfileController',
    	['only' => ['index', 'update']]);

    
    Route::group(['prefix' => 'requests'], function(){
        Route::resource('/', 'RequestController',
            ['only'=> ['index', 'store']]);
        Route::put('{id}/status', 'RequestController@updateStatus');
        Route::post('isrequested', 'RequestController@isRequested');
    });

    Route::group(['prefix'=> 'tutors'], function(){
    	Route::post('search', 'TutorController@search');
        Route::get('{id}', 'TutorController@find');
        Route::get('{tutorid}/feedback', 'TutorController@findFeedbackResource');
        Route::get('{tutorid}/feedback/{id}', 'TutorController@findFeedbackById');
        Route::post('{tutorid}/feedback', 'TutorController@storeFeedback');
        Route::put('{id}/description', 'TutorController@updateDescription');
        Route::put('{id}/contact', 'TutorController@updateContact');
        Route::put('{id}/location', 'TutorController@updateLocation');
        Route::put('{id}/price', 'TutorController@updatePrice');
        Route::post('{tutorid}/lessons', 'TutorController@addLesson');
        Route::delete('{tutorid}/lessons/{id}', 'TutorController@deleteLesson');
        Route::post('{tutorid}/availabilities', 'TutorController@addAvailability');
        Route::delete('{tutorid}/availabilities/{id}', 'TutorController@deleteAvailability');
    });


});


Route::post('/register', 'AuthController@userRegistration');
Route::post('/registertutor', 'AuthController@tutorRegistration');
Route::post('/login', 'AuthController@login' );
Route::get('/logout', 'AuthController@logout' );


Route::controller('/backend/{path?}', 'BackendController');

Route::controller('/', "SPAController");
