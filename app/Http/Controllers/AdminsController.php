<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AdminsController extends Controller {

    public function __construct(){
        $this->middleware('role:admin');
    }


	public function index(){
		return User::findAllAdmins();
	}


	public function store(Request $request){
		return User::createAdmin($request->all());
	}


	public function destroy($id){
		User::deleteAdmin($id);
		return new Response(NULL , 204);
	}
}
