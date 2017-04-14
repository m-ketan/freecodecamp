// RUNS JQUERY WHEN PAGE IS READY
$(document).ready(function() {
    var userOn = [];
    var userOff = [];
    var myUrl;
    var myUrl2;
    var channelArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "noobs2ninjas","RobotCaleb" ]
    // FOR ITERATING THROUGH THE CUSTOM ARRAY AND MAKING AJAX CALL FOR EACH ONE
    for (var i =0; i<channelArr.length; i++) {
        var channelName = channelArr[i];
        myUrl = "https://api.twitch.tv/kraken/streams/" +channelName+"?client_id=omol7urkqb3crqqb30ldsr287szbxj";
        $.ajax ({
            type:"GET",
            url: myUrl,
            success:function(data){
                if(data.stream !== null){
                    myUrl = data._links.self+"?client_id=omol7urkqb3crqqb30ldsr287szbxj";
                    onChannel(myUrl);
                } else{
                   myUrl2 = data._links.channel + "?client_id=omol7urkqb3crqqb30ldsr287szbxj";
                     offChannel(myUrl2);   
                    }
                    
                },
            
            error:function(errdata){
                alert("Please check your internet connectivity");
            }
        });
    }
    
    // ONCLICK FILTER FOR ALL CHANNELS
    
    $('#btn-all').click(function() {
        
        
        $('.channel-info').html('');
        for(var i in userOn){
            
           $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-2 channel'><img src="+userOn[i][1]+"></div><div class='col-md-8 channel-details-on'<h6><a href='"+userOn[i][0]+"'>"+userOn[i][2]+"</a></h6><p>"+userOn[i][2]+": "+userOn[i][3]+"</p></div><div class='col-md-2 channel-btn'><div class='status-btn-on'></div></div></div>");
            
           for(var i in userOff){
            
           $(".channel-info").append("<div class='row channel-row'><div class='col-md-2 channel'><img src="+userOff[i][0]+"></div><div class='col-md-8 channel channel-details-off'>"+userOff[i][1]+"<div><p>Currently Offline</p><div><div class='col-md-2 channel-btn'><div class='status-btn-off'</div></div></div>");
            
        }
            
        }
        
       
    });
    
    // ONCLICK FILTER FOR ONLINE CHANNELS
    
    $('#btn-on').click(function() {
        
        
        $('.channel-info').html('');
        for(var i in userOn){
            
           $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-2 channel'><img src="+userOn[i][1]+"></div><div class='col-md-8 channel-details-on'<h6><a href='"+userOn[i][0]+"'>"+userOn[i][2]+"</a></h6><p>"+userOn[i][2]+": "+userOn[i][3]+"</p></div><div class='col-md-2 channel-btn'><div class='status-btn-on'></div></div></div>");
            
        }
        
       
    });
    
    // ONCLICK FILTER FOR OFFLINE CHANNELS
    
    $('#btn-off').click(function() {
        
        
        $('.channel-info').html('');
        for(var i in userOff){
            
           $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-2 channel'><img src="+userOff[i][0]+"></div><div class='col-md-8 channel channel-details-off'>"+userOff[i][1]+"<div><p>Currently Offline</p><div><div class='col-md-2 channel-btn'><div class='status-btn-off'</div></div></div>");
            
        }
        
       
    });
    

  // FUNCTION FOR APPENDING DIVS CONTAINING OFFLINE CHANNEL DATA  

  function offChannel(myUrl2){
    
    
   $.getJSON(myUrl2, function(data) {
                        $(".channel-info").append("<div class='row channel-row'><div class='col-md-2 channel'><img src="+data.logo+"></div><div class='col-md-8 channel channel-details-off'>"+data.display_name+"<div><p>Currently Offline</p><div><div class='col-md-2 channel-btn'><div class='status-btn-off'</div></div></div>");
                        userOff.push([data.logo, data.display_name]);
                        
                    });
}
    
    // FUNCTION FOR PREPENDING DIVS CONTAINING ONLINE CHANNEL DATA 

    function onChannel(myUrl){

        $.ajax ({
                type:"GET",
                url: myUrl,
                success:function(data){
                $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-2 channel'><img src="+data.stream.channel.logo+"></div><div class='col-md-8 channel-details-on'<h6><a href='"+data.stream.channel.url+"'>"+data.stream.channel.display_name+"</a></h6><p>"+data.stream.game+": "+data.stream.channel.status+"</p></div><div class='col-md-2 channel-btn'><div class='status-btn-on'></div></div></div>");
                userOn.push([data.stream.channel.url, data.stream.channel.logo,  data.stream.channel.display_name, data.stream.game, data.stream.channel.status]);
                console.log(userOn);
            }, 

            error:function(errdata){
                alert("Please check your internet connectivity");
            }
        });
    }

    }); 