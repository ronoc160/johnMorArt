//$("#header").load("header.html");

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
} 
 $("#submit_btn").click(function() { 
    	
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        // var user_phone      = $('input[name=phone]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-color','red'); 
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','red'); 
            proceed = false;
        }
        // if(user_phone=="") {    
        //     $('input[name=phone]').css('border-color','red'); 
        //     proceed = false;
        // }
        if(user_message=="") {  
            $('textarea[name=message]').css('border-color','red'); 
            proceed = false;
        }
        
        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(data){  
                
                //load success massage in #result div element, with slide effect.       
                $("#result").hide().html('<div class="success">'+data+'</div>').slideDown();
                
                //reset values in all input fields
                $('#contact_form input').val(''); 
                $('#contact_form textarea').val(''); 
                
            }).fail(function(err) {  //load any error data
                $("#result").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
            });
        }
                
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() { 
        $("#contact_form input, #contact_form textarea").css('border-color',''); 
        $("#result").slideUp();
    });
    

// if ($("#homepage").length) {
	
	var k ="";
	for (var key in siteData["imgData"]) {
		var data = siteData["imgData"][key];
		k += '<div class="item">';
		k += '<img class="toggle" key="'+key+'" src="'+data["img"]+'" alt="'+data["imgAlt"]+'" />';
		k += '</div>';
	}
	$("#content").html(k);
	$('#content').masonry({
			columnWidth: 320,
			itemSelector: '.item',
			isFitWidth: true,
			isAnimated: !Modernizr.csstransitions
		}).imagesLoaded(function() {
			$(this).masonry('reload');
	});



	$(".toggle").click(function(){
		console.log($(this).attr("key"));
		if ($(this).attr("key")) {
			var keyData = siteData["imgData"][$(this).attr("key")];
			$("#headerText").text(keyData["header"]);
			$("#contentText").text(keyData["content"]);
			$("#price").text(keyData["price"]);


			var overlayImages ="";
			for(i in keyData["contentImg"]){
				var imgSize = keyData["imageWidth"][i];
				var imgSizeheight = keyData["imageHeight"][i];
				overlayImages +='<img style="width:'+imgSize+';height:'+imgSizeheight+'"class="lightbox_trigger padding-5" src="'+keyData["contentImg"][i]+'">';            
		     	 
			}
			$(".imgWrapper").html(overlayImages);
//	
			var buttonInformation ="";
			 // for(i in siteData["imgData"]){
				console.log(keyData["price"]);
				

				buttonInformation +='<form action="'+keyData["actionInfo"]+'" method="post" target="_top">';
				buttonInformation +='<input type="hidden" name="cmd" value="_s-xclick">';
				buttonInformation +='<input type="hidden" name="hosted_button_id" value="'+keyData["value2"]+'">';
				buttonInformation +='<button  name="submit">purchase</button>';
				buttonInformation +='</form>';
		
			$("#purchaseWrap").html(buttonInformation);

			$('.lightbox_trigger').click(function(e) {
					$("#darkBg").fadeIn();
					e.preventDefault();
				// Code that makes the lightbox appear
					var image_href = $(this).attr("src");
					if ($('#lightbox').length > 0) { // #lightbox exists
				
						//insert img tag with clicked link's href as src value
						$('#content').html('<img src="' + image_href + '" />');
					   	
						$('#lightbox').show();
					}else { //#lightbox does not exist 
						//create HTML markup for lightbox window
						var lightbox = 
						'<div id="lightbox">' +
							'<p></p>' +
							'<div id="content">' + //insert clicked link's href into img src
								'<img   src="' + image_href +'" />' +
							'</div>' +	
						'</div>';	
						//insert lightbox HTML into page
						$('.contentWrapper').append(lightbox);
						$( '#lightbox' ).addClass( "lightBoxOverlay" );	
					}
					$('#lightBoxWrapper, .lightBoxOverlay').click(function() {
						$('#lightbox').hide();
						$("#darkBg").fadeOut(500);
					});

			});
///
		

		};
			//alert('hello');
			$("#showStuff").toggle();

			// if($("#showStuff").is(":visible"); ){
			// 	$("#showStuff").show();
			// }else  {

			// };
	});



   
