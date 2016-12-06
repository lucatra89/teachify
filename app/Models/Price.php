<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model {

	protected $table = 'prices';

    protected $fillable = ['value'];
    
    public $timestamps = false;
	
}
