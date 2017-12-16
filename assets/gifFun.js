

let buttonArr = ["kill bill vol 1", "pulp fiction", "kill bill vol 2", "django unchained", "inglorious basterds","reservoir dogs","from dusk till dawn movie","hateful eight","jackie brown","death proof movie","sin city",
                "samuel l jackson","michael madsen","harvey keitel","tim roth","uma thurman","john travolta"];

function displayButtons(){
    for(let i = 0; i < buttonArr.length; i++){

        let buttonDiv = $("<button>")
        buttonDiv.addClass("btn gif");
        buttonDiv.attr("data-movie", buttonArr[i]);
        buttonDiv.text(buttonArr[i]);
        $("#button-display").append(buttonDiv);                
    }
}
displayButtons();

$("#submit").click(function (e) {
    e.preventDefault();
    let input = $("#customBtn").val();
    $("#button-display").empty();
    buttonArr.push(input);
    displayButtons();
});

$(document).on("click",".gif", function(){
    let movie = $(this).attr("data-movie");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=YWybm9rw25LBExhvqpGp2UzC3b36mWY0&limit=15"
    $("#gifs-appear").html(" ");
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
       console.log(response);

        let gif = response.data;
        for(var i = 0; i < gif.length; i++){
            let gifDiv = $("<div >");
            let gifImage = $("<img>");
            rating = $("<p>");
            rating.text("Rating: '" + gif[i].rating+"'");
            gifDiv.addClass("gif-div");  
            gifImage.addClass("giphy");          
            gifImage.attr("src", gif[i].images.fixed_height_still.url);
            gifImage.attr("data-still",gif[i].images.fixed_height_still.url);
            gifImage.attr("data-animate",gif[i].images.fixed_height.url);
            gifDiv.prepend(rating);
            gifDiv.prepend(gifImage);
            $("#gifs-appear").prepend(gifDiv);
        }
        $(".giphy").click( function(){
            let state = $(this).attr("data-state");
            console.log(this);

            if(state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
                
    })
});

