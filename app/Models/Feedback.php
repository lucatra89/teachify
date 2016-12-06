<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tutor;

class Feedback extends Model {

	protected $table = 'feedback';

    protected $fillable = ['tutor_id', 'user_id', 'rating', 'description'];
    
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }


    public static function findIdsByTutor($tutorid)
    {
    	return Feedback::where('tutor_id', $tutorid)->get(['id']);
    }

    public static function store($param)
    {
    	$count = Feedback::where('tutor_id', $param['tutor_id'])->count();
    	$tutor = Tutor::find($param['tutor_id']);
    	if ($count == 0) {
    		$tutor->rating = $param['rating'];
    	}else{
	    	$currentRate = $tutor->rating;
	    	$newRate = ($currentRate * $count + $param['rating'])/($count + 1);
	    	$tutor->rating = $newRate;
    	}

    	$tutor->save();

    	return Feedback::create($param);

    }
}
