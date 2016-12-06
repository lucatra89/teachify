<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Auth;

class BackendController extends Controller {

    public function __construct(){
        $this->middleware('role:admin');
    }

	public function getIndex()
	{
		return view('backend.layout', Auth::user());
	}




}
