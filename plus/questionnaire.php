<?php
    class index{
    public  $url = "http://list.kbetyy.com/Home/Checkapi/api_questionnaire/";//问卷接口地址     http://pc3.com/Home/Checkapi/api_questionnaire/
    public  $post_url = "http://list.kbetyy.com/Home/Checkapi/receive/";//提交接口地址       http://pc3.com/Home/Checkapi/receive/
        /**
         *路由重置
         */
        public function __construct(){
            $tmparr = explode(DIRECTORY_SEPARATOR,__FILE__);
            $filename = end($tmparr);
            $tmparr = explode($filename.'/',$_SERVER['PHP_SELF'] );//打散成数组,如果文件名后面的参数的方法名，后就调用
            method_exists (__CLASS__,$tmparr[1])? $this->$tmparr[1]():$this->jsonReturn(['error'=>1,'error_det'=>'没有该方法']);
//            echo header("Access-Control-Allow-Origin:*");
        }

        /**
         *请求问卷
         * @return string
         */
        public function quesinnaire_list() {
            //$this->submit_limit();//一分内不能重复请求
            if(empty($_POST['form'])) {
                $this->jsonReturn(['error=>1','error_det'=>'请输入题卷名在$_POST["form"]']);
            }
            echo $this->send_post($this->url,$_POST);
        }

        /**
         * 提交表单
         * @submit json
         * @ echo json
         */
        public function receive() {
            $this->submit_limit();//一分内不能重复请求
            echo $this->send_post($this->post_url,$_POST);
        }

        /**
         * 发送post请求
         * @param string $url 请求地址
         * @param array $post_data post键值对数据
         * @return string
         */
        public function send_post($url, $post_data) {
            $postdata = http_build_query($post_data);
            $options = array(
                'http' => array(
                    'method' => 'POST',
                    'header' => 'Content-type:application/x-www-form-urlencoded',
                    'content' => $postdata,
                    'timeout' => 15 * 60 // 超时时间（单位:s）
                )
            );
            $context = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            return $result;
        }

        /**
         * jsonl返回格式
         */
        private function jsonReturn($arr=array('error'=>0),$status=0) {
            header('Content-type: application/json');
            $arr['status'] = $status;
            if($arr['error'] == 0) {
                $tmparr   = debug_backtrace();
                if($tmparr[0]['line']) {
                    $arr['error_line'] =  $tmparr[0]['line'];
                }
                if($tmparr[0]['file']) {
                    $arr['error_file'] = $tmparr[0]['file'];
                }
            }
            $data = json_encode($arr);
            exit($data);
        }

        /**
         * 请不要在1分钟内重复提交
         * @return json
         */
        public function  submit_limit() {
            session_start();
            if(!empty($_SESSION['submit_time'])) {
                $time_limit = $_SESSION['submit_time']+60;
            }else{
                $time_limit = time();
            }
            if($time_limit > time()) {
                $this->jsonReturn(array('error'=>0,'error_det'=>'请不要在1分钟内重复请求！'));
            }
            $_SESSION['submit_time'] = time();
        }
    }
    new index;
?>