<?php
namespace src\web\controller;

use core\View;

class Index {
    protected $view;

    public function __construct()
    {
        $this->view = new View();
    }

    public function show() {
        return $this->view
            ->make('user')
            ->with('to', 'qqqqq');
    }
}