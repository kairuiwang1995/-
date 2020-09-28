//显示购物车和点餐
function myCart(){
			document.getElementById("cart").style.display="block";
			document.getElementById("dinner").style.display="none";
}
		
		function godinner(){
			document.getElementById("cart").style.display="none";
			document.getElementById("dinner").style.display="block";
		}
//添加购物车
		function add(obj){
			var ad= 1;
			var chart=document.getElementById("cartTable");
			for(var i=1;i<chart.rows.length;i++){				
				if(chart.rows[i].cells[1].innerText== obj.parentNode.parentNode.parentNode.rows[0].cells[0].innerText){
					ad= 0;
					chart.rows[i].cells[3].getElementsByTagName("span")[0].innerHTML++;
					break;
				}
				
			}
			if(ad==1){
				var tr=chart.insertRow(-1);
				tr.insertCell(0).innerHTML="<input type='checkbox' name='order' onclick='sel()'/>";
				tr.insertCell(1).innerText=obj.parentNode.parentNode.parentNode.rows[0].cells[0].innerText;
				tr.insertCell(2).innerText=obj.parentNode.parentNode.parentNode.rows[0].cells[1].innerText;
				tr.insertCell(3).innerHTML="<input type='button' name='minus' value='-' onclick='minus(this)' /><span name='fnum'>1</span><input type='button' name='plus' value='+' onclick='plu(this)' />";
				tr.insertCell(4).innerHTML="<input type='button' value='删除' onclick='del(this)' />";
				document.getElementById("all").checked=false;
			}
			document.getElementById("count").innerText=num();
			document.getElementById("rmb").innerText=sum();
		}
		
		function num(){								//购物车数量
			var chart=document.getElementById("cartTable");
			var s=0;
			for(var i=1;i<chart.rows.length;i++){
				s += parseInt(chart.rows[i].cells[3].getElementsByTagName("span")[0].innerHTML);
			}
			return s;
		}
		
		function sum(){								//合计金额
			var chart=document.getElementById("cartTable");
			var s=0;
			for(var i=1;i<chart.rows.length;i++){
				if(chart.rows[i].cells[0].children[0].checked==true){
					var n=chart.rows[i].cells[3].getElementsByTagName("span")[0].innerHTML;
					var p=chart.rows[i].cells[2].innerText;
					var u=parseFloat(p.replace("元/份",""));
					s += (n*u);
				}
			}
			return s;
		}
//全选
		function qx(obj){
			var cks=document.getElementsByName("order");
			for(var i=0;i<cks.length;i++){
				cks[i].checked=obj.checked;
			}
			document.getElementById("rmb").innerText=sum();
			jud();
		}
		
		function sel(){
			var cks=document.getElementsByName("order");
			var ck=true;
			for(i=0;i<cks.length;i++){
				if(cks[i].checked==false){
					ck=false;
					break;
				}
			}
			document.getElementById("all").checked=ck;
			document.getElementById("rmb").innerText=sum();
			jud();
		}
		
		function plu(obj){
			obj.parentNode.getElementsByTagName("span")[0].innerHTML++;
			document.getElementById("count").innerText=num();
			document.getElementById("rmb").innerText=sum();
		}
		
		function minus(obj){
			var n=obj.parentNode.getElementsByTagName("span")[0].innerHTML;
			if(n>1){
				obj.parentNode.getElementsByTagName("span")[0].innerHTML--;
				document.getElementById("count").innerText=num();
				document.getElementById("rmb").innerText=sum();
			}
		}
		
		function del(obj){                                     //删除行
			if(confirm("确认要删除该订单吗？")){		
				obj.parentNode.parentNode.remove();
				document.getElementById("count").innerText=num();
				document.getElementById("rmb").innerText=sum();
			}
		}
		
		function clearAll(){									//删除选中
			var chart=document.getElementById("cartTable");//购物车
			if(confirm("确认要删除所选中的订单吗？")){
				for(var i=chart.rows.length-1;i>0;i--){
					if(chart.rows[i].cells[0].children[0].checked==true){
						chart.rows[i].remove();
					}
				}
				document.getElementById("count").innerText=num();
				document.getElementById("rmb").innerText=sum();
			}
			jud2();
		}
		
		function pay(){											//支付
			var chart=document.getElementById("cartTable");
			alert("请支付"+document.getElementById("rmb").innerText+"元");
			for(var i=chart.rows.length-1;i>0;i--){
				if(chart.rows[i].cells[0].children[0].checked==true){
					chart.rows[i].remove();
				}	
			}
			document.getElementById("count").innerText=num();
			document.getElementById("rmb").innerText=sum();
			jud2();
		}
		
		function jud(){											//判断删除选中按钮是否可用
			var chart=document.getElementById("cartTable");
			var jdg=0;
			for(var i=1;i<chart.rows.length;i++){
				if(chart.rows[i].cells[0].children[0].checked==true){
					jdg=1;
					break;
				}
			}
			if(jdg==1){
				document.getElementById("btn").disabled=false;
			}else{
				document.getElementById("btn").disabled=true;
			}
		}
		
		function jud2(){										//判断购物车是否为空
			var chart=document.getElementById("cartTable");
			var cka=document.getElementById("all");
			if(chart.rows.length==1){
				cka.checked=false;
				document.getElementById("btn").disabled=true;
			}
		}
	