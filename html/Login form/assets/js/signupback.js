$(document).ready(function()
{
	var signupUrl = 'http://auth.c100.hasura.me/signup';
	var dataUrl='http://data.c100.hasura.me/v1/query';
 	$("#signupbutton").click(function()
    {
		 var uname = $('#form-username').val();
 		 var pass = $('#form-password').val();
 		 console.log(uname+" and "+pass);
 		 $.ajax
 		 ({
 				url: signupUrl,
 				method: "POST",
 				//data: { username: "anila" , password:"1234abcd" },
				//dataType:"json"
 				//contentType: "application/json"
 				headers:
 				{
 					'Content-Type' : 'application/json'
 				},
 				data: JSON.stringify
 				({
	 					“username”: $("#form-username").val(),
						“password”: $("#form-password").val(),
				 })
 		 }).done(function(data) 
 		 	{
 				console.log("inserting into profile");
 				//user info
 				$.ajax
 				({  url: dataUrl,
                	method: ‘post’,
                	headers: 
                	{   'Authorization': 'auth_code',
                    	'Content-Type': 'application/json'
                	},
			    	data: JSON.stringify
			    	({   “type”: “insert”,
 					 	 “args”: 
 					 	{   “table”: “Users”,
                         	“objects”: 
                         	[{   “user_id”: data.hasura_id, 
                         	  	 “username”: $("#form-username").val()
                         	}]
                     	}
                 	})
			 	}).done(function(status)
			 		{   console.log(‘insert profile succes’);
                 		$(".top-content").hide().html("<br><li><span class="text-success">Registration Success..Please Login</span></li>").fadeIn(“slow”);
                 		window.onlocation ="/login";
             		}).fail(function(status)
             			{	console.log(‘insert profile failed’);
 							$(".top-content").hide().html("<br><li><span class = "text-danger"> Something Went Wrong! </span></li>").fadeIn(“slow”);
 						})//query for enter in profile table; 
            }).fail(function(data)
                {	console.log("signup failed");
 					var k = JSON.parse(data.responseText).message;
 					$(".top-content").hide().html("<br><li><span class="text-danger"> "+ k +" </span></li>").fadeIn(“slow”);
 					//console.log(data.responseJSON.message);
    			});
 	});
});