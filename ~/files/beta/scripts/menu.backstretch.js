        	// Preload the images
    	    var images = ["pics/home.jpg", "pics/join.jpg", "pics/chapter.jpg", "pics/history.jpg", "pics/alumni.jpg", "pics/community.jpg"];
		
	        // A little script for preloading all of the images
       	 	// It"s not necessary, but generally a good idea
       	 	$(images).each(function(){
    	        $("<img/>")[0].src = this;
    	    });
		
			// Set default background (defaultimg defined in each page)
			$.backstretch(defaultimg);
		
			// Set menu rollovers
			$("#logo").mouseover(function(e) { $.backstretch(images[0], {speed: 400}); });
			$("#logo").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });
			
			$("#home").mouseover(function(e) { $.backstretch(images[0], {speed: 400}); });
			$("#home").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });
			
			$("#join").mouseover(function(e) { $.backstretch(images[1], {speed: 400}); });
			$("#join").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });
		
			$("#chapter").mouseover(function(e) { $.backstretch(images[2], {speed: 400}); });
			$("#chapter").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });
		
			$("#history").mouseover(function(e) { $.backstretch(images[3], {speed: 400}); });
			$("#history").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });

			$("#alumni").mouseover(function(e) { $.backstretch(images[4], {speed: 400}); });
			$("#alumni").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });
		
			$("#community").mouseover(function(e) { $.backstretch(images[5], {speed: 400}); });
			$("#community").mouseout(function(e) { $.backstretch(defaultimg, {speed: 400}); });