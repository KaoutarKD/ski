<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'subject_id', 'description', 'image_path', 'likes', 'approved'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function subject() {
        return $this->belongsTo(Subject::class);
    }
}
