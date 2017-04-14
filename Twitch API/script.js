// RUNS JQUERY WHEN PAGE IS READY

$(document).ready(function() {
    
    var channelArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "noobs2ninjas","RobotCaleb" ]
    for (var i =0; i<channelArr.length; i++) {
        var channelName = channelArr[i];
        var myUrl = "https://api.twitch.tv/kraken/streams/" +channelName+"?client_id=omol7urkqb3crqqb30ldsr287szbxj";
        
           $.ajax ({
            type:"GET",
            url: myUrl,
            success:function(data){
                if(data.stream !== null){
                    var myUrl = data._links.self+"?client_id=omol7urkqb3crqqb30ldsr287szbxj";
                    onChannel(myUrl);
                } else{
                   var myUrl2 = data._links.channel + "?client_id=omol7urkqb3crqqb30ldsr287szbxj";
                     offChannel(myUrl2);   
                    }
                    
                },
            
            error:function(errdata){
                alert("Please check your internet connectivity");
            }
        });
    }
        
}); 

function offChannel(myUrl2){
    
    
   $.getJSON(myUrl2, function(data) {
                        $(".channel-info").append("<div class='row channel-row'><div class='col-md-2 channel'><img src="+data.logo+"></div><div class='col-md-8 channel channel-details-off'>"+data.display_name+"<div><p>Currently Offline</p><div><div class='col-md-2 channel-btn'><div class='status-btn-off'</div></div></div>");   
                        
                    });
}

function onChannel(myUrl){
    
    $.ajax ({
        type:"GET",
        url: myUrl,
        success:function(data){
        $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-2 channel'><img src="+data.stream.channel.logo+"></div><div class='col-md-8 channel-details-on'<h6>"+data.stream.channel.display_name+"</h6><p>"+data.stream.game+": "+data.stream.channel.status+"</p></div><div class='col-md-2 channel-btn'><div class='status-btn-on'></div></div></div>");
        }, 

        error:function(errdata){
            alert("Please check your internet connectivity");
        }
    });
}
