

    let buttonArr = ["kill bill vol 1","pulp fiction","kill bill vol 2","django","inglorious bastards","reservoir dogs movie","from dusk till dawn movie","hateful eight","jackie brown","death proof movie","sin city",
                "samuel l jackson","michael madsen","harvey keitel","tim roth","uma thurman","john travolta"];

function displayButtons(){
    for(let i = 0; i < buttonArr.length; i++){

        let buttonDiv = $("<button>")
        buttonDiv.addClass("btn btn-default gif");
        buttonDiv.attr("data-movie", buttonArr[i]);
        buttonDiv.text(buttonArr[i]);
        $("#button-display").append(buttonDiv);
        console.log("working");
        
    }
}
displayButtons();

$("button").on("click", function(){
    let movie = $(this).attr("data-movie");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=YWybm9rw25LBExhvqpGp2UzC3b36mWY0&limit=10"
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
            gifImage.addClass("gif");
            gifImage.attr("src", gif[i].images.fixed_height_still.url);
            gifImage.attr("data-still",gif[i].images.fixed_height_still.url);
            gifImage.attr("data-animate",gif[i].images.fixed_height.url);
            gifDiv.prepend(gifImage);
            $("#gifs-appear").prepend(gifDiv);
        }
        $(".gif").on("click", function(){
            let state = $(this).attr("data-state");

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
