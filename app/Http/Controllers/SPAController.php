<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;


class SPAController extends Controller {

    public function __construct()
    {

        $this->middleware('guest', ['only' => ['getLogin', 'getRegister', 'getRegistertutor']]);
        $this->middleware('auth', ['only' => ['getDashboardStudent', 'getProfile']]);
        $this->middleware('role:tutor', ['only' => ['getDashboardTutor']]);
    }

	private function singlePage(){
		$roles = (Auth::check()) ? Auth::user()->groups : [];
		return view("layout", ['roles'=> $roles]);

	}



	public function getIndex(){
		return $this->singlePage();
	}

	public function getSearch(){
		return $this->singlePage();
	}


	public function getTutor($id)
	{
		return $this->singlePage();
	}


	public function getDashboardTutor()
	{
		return $this->singlePage();
	}

	public function getDashboardStudent()
	{
		return $this->singlePage();
	}

	public function getLogin()
	{
		return $this->singlePage();
	}

	public function getRegister()
	{
		return $this->singlePage();
	}


	public function getRegistertutor()
	{
		return $this->singlePage();
	}

	public function getProfile()
	{
		return $this->singlePage();
	}

}
