<?php 
namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Hash;
use App\Models\User;
use App\Models\Price;
use App\Models\Group;
use DB;

class Tutor extends Model{

	protected $primaryKey = 'user_id';

	protected $table = 'tutors';

    public $timestamps = false;

	protected $fillable = ['user_id','latitude','longitude','location_name', 'skype' , 'telephone', 'contact_email', 'price_id', 'rating', 'description'];

  	

	

	public static function store($request){
		$user = ["email" => $request['email'] , "password" =>  Hash::make($request['password'])];
		$user['u_type'] = 'T';
		$user['name'] = $request['name'];
		$user['surname'] = $request['surname'];

		$model = User::create($user);

		$group = Group::where('name', 'tutor')->first();
		$model->groups()->attach($group->id);


		$tutor = [ "latitude" => $request["location_latitude"]];
		$tutor["longitude"] = $request["location_longitude"];
		$tutor['location_name'] = $request["location_name"];
		$tutor['rating'] = 5;
		$tutor['user_id'] = $model['id'];
		$tutor['price_id'] = Price::firstOrFail()['id'];

		Tutor::create($tutor);

		return $model;

	}



	public static function findAsArray($id){
		$tutor = User::find($id)->toArray();
		$_tutor = Tutor::find($id)->toArray();
		$lessons = Lesson::with('subject', 'typeOfEducation')->where('tutor_id' , $id)->get()->toArray();
		$availabilities = Availability::with('from', 'to')->where('tutor_id' , $id)->get()->toArray();
		$contact = [ 'email' => $_tutor['contact_email'],'skype' => $_tutor['skype'], 'telephone'=> $_tutor['telephone']];
		$location = ['name' => $_tutor['location_name'], 'latitude' => $_tutor['latitude'], 'longitude' => $_tutor['longitude']];
		$price = Price::find($_tutor['price_id']);

		$tutor['lessons'] = $lessons;
		$tutor['availabilities'] = $availabilities;
		$tutor['contact'] = $contact;
		$tutor['location'] = $location;
		$tutor['price'] = $price;
		$tutor['rating'] = $_tutor['rating'];
		$tutor['description'] = $_tutor['description'];

		return $tutor;
	}

	public static function authenticate($user)
	{
		 return User::where('email', $user['email'])->firstOrFail();
	}

}
