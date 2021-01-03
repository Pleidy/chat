<?php
namespace core;

/**
 * Class Bootstrap
 * @package core
 */
class View {
    //模板文件
    protected $file;
    //模板变量
    protected $vars = [];

    /**
     * 文件读取
     * @param $file
     * @return $this
     */
    public function make($file) {
        $this->file = 'src/view/' . $file. '.html';
        return $this;
    }

    /**
     *
     * @param $name
     * @param $value
     * @return $this
     */
    public function with($name, $value){
        $this->vars[$name] = $value;
        return $this;
    }

    public function __toString()
    {
        extract($this->vars);//将变量分配到内存中

        // TODO: Implement __toString() method.
        include $this->file;

        return '';
    }
}
