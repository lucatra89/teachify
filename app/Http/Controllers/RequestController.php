<?php 
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Request as Req;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;


class RequestController extends Controller {
	public function __constructor()
	{	
		$this->middleware('auth', ['only'=>['isRequested']]);
		$this->middleware('role:tutor', ['only'=>['store', 'update']]);
	}

	public function index(Request $request)
	{
		if(isset($request['user'])){
			return Req::findRequestByUser($request['user']);
		}elseif (isset($request['tutor'])) {
			return Req::findWaitingRequest($request['tutor']);
		}

		return new Response(NULL , 500);
	}


	public function store(Request $request)
	{
		
		$req = $request->all();
		$req['user_id'] = Auth::id();
		$req['tutor_id'] = $req['tutor']['id'];

		$model = Req::create($req);

		return new Response($model->id, 201); 
	}


	public function updateStatus(Request $request, $requestid)
	{	
		$req = Req::find($requestid);
		$req->status = $request['status'];
		$req->save();

		return new Response(NULL , 204);
	}


	public function isRequested(Request $request)
	{
		$tutorid = $request['id'];
		$userid = Auth::id();
		$req = Req::statusOfRequest($userid, $tutorid);

		return($req == NULL) ? new Response(NULL, 204) : $req['status'];
	}


}
