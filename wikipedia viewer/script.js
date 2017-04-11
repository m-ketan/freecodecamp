$(document).ready(function() {
  //When submit is clicked run the code.
  $('#search').click(function() {
    var searchTerm = $('#searchTerm').val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm +"&format=json&callback=?";
    // Ajax call for JSON.
      async: false,
      dataType: "json",
      success: function(data) {
        $('#searchResult').html(''); // Resets the html to blank before submitting search. 
        // For loop for iterating through the JSON data.
        for (var i=0; i<data[1].length; i++) {
        // Prepending needed JSON data to list(ul>li).
          $('#searchResult').prepend("<li><a href="+data[3][i]+"> "+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
        }
        
      },
      error: function(errorMessage) {
        alert("Please check your internet connectivity");
      }
    });
  });
  
  // Adds animation to Wiki logo using animate.css.
  $('#wikimg').hover(function() {
    $(this).toggleClass('animated flip');
  });
});
