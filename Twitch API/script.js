// twitch client id: omol7urkqb3crqqb30ldsr287szbxj

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
                        $(".channel-info").append("<div class='row channel-row'><div class='col-md-12 channel'><ul><li><img src="+data.logo+"></li><li>"+data.display_name+"</li><li>Currently Offline</li><li><div class='status-btn-off'</li></ul></div></div>");   
                        
                    });
}

function onChannel(myUrl){
    
    $.ajax ({
    type:"GET",
    url: myUrl,
    success:function(data){
    $(".channel-info").prepend("<div class='row channel-row'><div class='col-md-12 channel'><ul><li><img src="+data.stream.channel.logo+"></li><li>"+data.stream.channel.display_name+"</li><li>"+data.stream.game+": "+data.stream.channel.status+"</li><li><div class='status-btn-on'</li></ul></div></div>");
    }, 
    
    error:function(errdata){
    alert("Please check your internet connectivity");
        }
    });
}

//                $("#t-logo").attr("src", data.stream.channel.logo);
//                $("#t-name").html(data.stream.game);
  //              $("#t-status").html(data.stream.channel.status);
