<?php 
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Tutor;
use App\Models\TutorInfo;
use App\Models\Feedback;
use App\Models\Lesson;
use App\Models\Availability;
use Auth;

class TutorController extends Controller {

	public function __constructor()
	{
		$this->middleware('auth',
			['only'=>['storeFeedback']]);
		$this->middleware('role:tutor',
			['only'=>
				['updateLocation', 'updateContact', 'updateDescription','updatePrice',
				 'addLesson', 'deleteLesson', 'addAvailability', 'deleteAvailability']]);
	}

	public function search(Request $request){

		return TutorInfo::findByRequest($request);
	}


	public function find($id){
		return Tutor::findAsArray($id);
	}

	public function findFeedbackResource(Request $request , $tutorid)
	{	$url = $request->url();
		$ids = Feedback::findIdsByTutor($tutorid);
		$resources = [];

		foreach ($ids as  $id) {
			array_push($resources, $url.'/'.$id->id);
		}

		return $resources;
	}


	public function findFeedbackById($tutorid, $id)
	{
		return Feedback::with('user')->find($id);
	}


	public function storeFeedback(Request $request, $tutorid)
	{	$param = $request->all();
		$param['tutor_id'] = $tutorid;
		$param['user_id'] = Auth::id(); 
		$feedback = Feedback::store($param);
		return $feedback->id;
	}


	public function updateLocation(Request $request,$id)
	{
		$tutor = Tutor::find($id);
		$tutor->location_name = $request['name'];
		$tutor->latitude = $request['latitude'];
		$tutor->longitude = $request['longitude'];
		$tutor->save();

		return new Response(NULL, 204);
	}

	public function updateContact(Request $request, $id)
	{
		$tutor = Tutor::find($id);
		$tutor->contact_email = $request['email'];
		$tutor->telephone = $request['telephone'];
		$tutor->skype = $request['skype'];
		$tutor->save();

		return new Response(NULL, 204);
	}

	public function updateDescription(Request $request, $id)
	{
		$tutor = Tutor::find($id);
		$tutor->description = $request['description'];
		$tutor->save();
		
		return new Response(NULL, 204);
	}

	public function updatePrice(Request $request, $id)
	{
		$tutor = Tutor::find($id);
		$tutor->price_id = $request['id'];
		$tutor->save();

		return new Response(NULL, 204);
	}

	public function addLesson(Request $request , $tutorid)
	{
		$param = [];
		$param['tutor_id'] = $tutorid;
		$param['subject_id'] = $request['subject']['id'];
		$param['type_of_education_id'] = $request['typeOfEducation']['id'];

		$lesson = Lesson::create($param);
		return $lesson->id;
	}

	public function deleteLesson(Request $request , $tutorid, $id)
	{
		Lesson::destroy($id);
		return new Response(NULL , 204);
	}


	public function addAvailability(Request $request , $tutorid)
	{
		$param = [];
		$param['tutor_id'] = $tutorid;
		$param['from_hour_id'] = $request['from']['id'];
		$param['to_hour_id'] = $request['to']['id'];
		$param['day'] = $request['day'];

		$lesson = Availability::create($param);
		return $lesson->id;
	}

	public function deleteAvailability(Request $request , $tutorid, $id)
	{
		Availability::destroy($id);
		return new Response(NULL , 204);
	}

}
