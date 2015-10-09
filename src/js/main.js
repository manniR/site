window.$ = window.jQuery = require('jquery')
//var stellar = require('stellar');
//var logger = require('./logger');
//var motio = require('Motio');
// var TweenMax = require('gsap');
var froogaloop = require('vimeo-froogaloop');
//froogaloop();
var scrollToElement = require('scroll-to-element');

$('header nav .button a').click(function(){
	console.log($(this).attr('href'));
	scrollToElement($(this).attr('href'));

	});
// $("a[href$='#about']")
// $("a[href$='#contact']")



//$(window).stellar();

var form = require('./form');
form();
$('#submit').click(function(e){
	//e.preventDefault();
	var $btn = $(this);
	var $form = $('#form');
	//;

	if ($form[0].checkValidity()){

		$btn.attr("disabled", "disabled");

		$.ajax({
			type: "POST",
			url: "send.php",
			data: $("#form").serialize(),
			success: function(data){
				$btn.attr('value', 'Nachricht gesendet :)');
				$('#form')[0].reset();
				setTimeout(function(){
					$btn.attr('value', 'Absenden');
					$btn.removeAttr('disabled');
				}, 5000);
			}

		});

		return false;

	} else {

	}
		// $.post("send.php", $("#form").serialize(), function(data){});
		// $('#success').html('Message sent!');
		// $('success').hide(2000);

});

$('.link').append('<i class="fa fa-external-link"></i>').css('cursor', 'pointer').click(function(){
	
	var redirectWindow = window.open($(this).data('url'), '_blank');
    redirectWindow.location;
});

var vimeoLinks = $('.vimeoplayer');


$('.vimeoplayer').append('<i class="fa fa-play"></i>').css('cursor','pointer').click(function(){
	//console.log(this);
	$('.vimeoplayer').find('iframe').remove();
	$('.vimeoplayer').find('.fa').fadeIn();

	$(this).append('<iframe class="iframe" src="https://player.vimeo.com/video/'+$(this).data('vimeoid')+'?portrait=0&title=0&color=f1773b&badge=0&byline=0&autoplay=1&loop=0" width="'+$(this).find('img').width()+'" height="'+$(this).find('img').height()+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
	
	var $this = $(this);
	var $fa = $(this).find('.fa');
	var iframe = $this.find('.iframe')[0];
    var player = $f(iframe);
    //var status = $('.status');


    // When the player is ready, add listeners for pause, finish, and playProgress
    player.addEvent('ready', function() {
        //status.text('ready');
        // $this.find('.fa').fadeOut();
        $fa.fadeOut();
        $(iframe).fadeIn();
        
        //player.addEvent('pause', onPause);
        //player.addEvent('play', onPlay);
        player.addEvent('finish', onFinish);
        //player.addEvent('playProgress', onPlayProgress);
        // console.log('READY');
        
       	
    });
    
    // Call the API when a button is pressed
    // $('button').bind('click', function() {
    //     player.api($(this).text().toLowerCase());
    // });

    function onPlay(id) {
        //status.text('paused');
        
        //console.log('play');
    }
     function onPause(id) {
        //status.text('paused');
        // console.log('paused');
    }

    function onFinish(id) {
        //status.text('finished');
        // console.log('finished');
        
        	$('.vimeoplayer').find('.iframe').remove();
        	$fa.fadeIn();
    	
        // player.api("unload");

    }

    function onPlayProgress(data, id) {
        //status.text(data.seconds + 's played');
        // console.log(data.percent + '% played');
    }

	


	
	
});

//var element = $('.raceHorse')[0];
//var sprite = new motio(element, {fps:30, frames:17});
//window.sprite = sprite;
// sprite.play();
// var scroll = require('./scroll');

//logger.log('Hurray, it works! :) So Great');
//logger.log(stellar.Stellar);
// scroll.parallax();
//$(window).stellar.Stellar;