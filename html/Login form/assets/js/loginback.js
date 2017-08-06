$(document).ready(function(){
 var dataUrl = "http://data.c100.hasura.me/v1/query";
 var authUrl = "http://auth.c100.hasura.me/";
 //var fileUrl = "https://filestore.straggle14.hasura-app.io/v1/file";
 $(‘#loginbutton’).click(function() {
 var uname = $(‘#form-username’).val();
 var pass = $(‘#form-password’).val();
 console.log(uname+” and “+pass);
 $.ajax({
 url: authUrl + ‘/signup’,
 method: ‘post’,
 headers: {
 ‘Content-Type’: ‘application/json’
 },
 data: JSON.stringify({
 “username”: $(‘#form-username).val(),
 “password”: $(‘#form-password’).val()//,
 //“email”: $(“#email”).val()
 })
 }).done(function(data) {
 console.log(‘insering into profile’);
 //user Register
 $.ajax({
 url: dataUrl,
 method: ‘post’,
 headers: {
 ‘Authorization’: ‘Bearer ‘ + data.auth_token,
 ‘Content-Type’: ‘application/json’
 },
 data: JSON.stringify({
 “type”: “insert”,
 “args”: {
 “table”: “profile”,
 “objects”: [{“user_id”: data.hasura_id,
 “fullname”: $(‘#fullname’).val(),
 “collegename”: $(‘#collegename’).val()}]
 }
 })
 }).done(function(reg_status){
 console.log(‘insert profile succes’);
 $(‘#flash’).hide().html(‘<br><li><span class=”text-success”>Registration Success..Please Login</span></li>’).fadeIn(“slow”);
 window.location =’/login’;
 }).fail(function(reg_status){
 console.log(‘insert profile failed’);
 $(‘#flash’).hide().html(‘<br><li><span class=”text-danger”> Something Went Wrong! </span></li>’).fadeIn(“slow”);
 })//query for enter in profile table; 
 }).fail(function(data) {
 console.log(‘signup failed’);
 var k = JSON.parse(data.responseText).message;
 $(‘#flash’).hide().html(‘<br><li><span class=”text-danger”> ‘+ k +’ </span></li>’).fadeIn(“slow”);
 //console.log(data.responseJSON.message);
 });
 });
});
