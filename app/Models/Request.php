<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tutor;

class Request extends Model {

	protected $table = 'requests';

    protected $fillable = ['user_id', 'tutor_id', 'status', 'description'];
    
    public $timestamps = false;



    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }


    public static function findRequestByUser($userid)
    {
    	
        $requests = static::with('user')
    			->where('user_id', $userid)
    			->get();

        $response = [];

        foreach ($requests as  $request) {
            $req = $request->toArray();
            $req['tutor'] = Tutor::findAsArray($request['tutor_id']);
            array_push($response, $req);
        }

        return $response;
    }

    public static function findWaitingRequest($tutorid)
    {
    	return static::with('user')
    			->where('tutor_id', $tutorid)
    			->where('status', 'Waiting')
    			->get();  			
    }

    public static function statusOfRequest($userid , $tutorid)
    {
        return Request::where('user_id' , $userid)
                ->where('tutor_id', $tutorid)
                ->first();
    }


	
}
