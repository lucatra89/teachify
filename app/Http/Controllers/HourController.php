<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Hour;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class HourController extends Controller {

    public function __construct(){
        $this->middleware('role:admin', ['only' => ['store','destroy']]);
    }


	public function index(){
		return Hour::all();
	}


	public function store(Request $request){
		$hour = Hour::create($request->all());
		return new Response($hour['id'] , 201);
	}


	public function destroy($id , Request $request){
		Availability::where('from_hour_id', $id)->delete();
		Availability::where('to_hour_id', $id)->delete();
		Hour::destroy( $id );
		return new Response(NULL , 204);
	}
}
