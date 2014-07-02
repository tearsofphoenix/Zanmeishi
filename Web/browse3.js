function killErrors() {  
    return true;  
}  
window.onerror =killErrors;  

$(function () {
    var scrtime;

    var $ul = $("#con ul");
    var liFirstHeight = $ul.find("li:first").height();//��һ��li�ĸ߶�
    $ul.css({ top: "-" + liFirstHeight - 12 + "px" });//����css��top���Խ���һ��li�������б��Ϸ�	 ��li������padding:10px����Ҫ-20

    $("#con").hover(function () {
        $ul.pause();//��ͣ����
        clearInterval(scrtime);
    }, function () {
        $ul.resume();//�ָ����Ŷ���	
        scrtime = setInterval(function scrolllist() {
            //������ʽչ�ֵ�һ��li
            $ul.animate({ top: 0 + "px" }, 1500, function () {
                //��������ʱ
                $ul.find("li:last").prependTo($ul);//��ul������һ������li����Ϊul�ĵ�һ��li
                liFirstHeight = $ul.find("li:first").height();//�ղ�����li�ĸ߶�
                $ul.css({ top: "-" + liFirstHeight - 12 + "px" });//����css��top���Խ��ղ�����li�������б��Ϸ�  ��li������padding:10px����Ҫ-20					
            });
        }, 3300);

    }).trigger("mouseleave");//ͨ��trigger("mouseleave")����������hover�¼��ĵ�2������
});