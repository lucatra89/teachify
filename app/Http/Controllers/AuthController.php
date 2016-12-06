<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Tutor;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;


class AuthController extends Controller {

	public function userRegistration(Request $request){
		try {
			$model = User::store($request->all());
			Auth::login($model);

		} catch (Exception $e) {
			return redirect("register");
		}

		return redirect('/');

	}


	public function tutorRegistration(Request $request){
		try {
			$model = Tutor::store($request->all());
			Auth::login($model);

		} catch (Exception $e) {
			return redirect("registertutor");
		}

		return redirect('dashboard-tutor');
	}

	public function login(Request $request)
	{
		 if(Auth::attempt($request->all(), true)){
		 	return redirect('/');
		 }else{
		 	return redirect('login');
		 }


	}

	public function logout(){
		Auth::logout();

		return redirect('/');
	}

}
