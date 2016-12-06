<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;


class ProfileController extends Controller {
	
	public function __constructor()
	{
		$this->middleware('auth');
	}

	public function index(){
		$id = Auth::id();

		return User::find($id);
	}


	public function update(Request $request){

		$param = $request->all();
		$param['id'] = Auth::id();
		User::updateWithPhoto($param);

		return new Response(NULL , 204);
	}

}