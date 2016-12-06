<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model {

	protected $table = 'availabilities';

    protected $fillable = ['from_hour_id', 'to_hour_id', 'day', 'tutor_id'];
    
    public $timestamps = false;

    public function from(){
        return $this->belongsTo('App\Models\Hour', 'from_hour_id');
    }

    public function to()
    {
        return $this->belongsTo('App\Models\Hour', 'to_hour_id');
    }


	
}
