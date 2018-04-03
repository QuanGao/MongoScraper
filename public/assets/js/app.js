$(document).ready(function () {

    $("#scrapeNews").on("click", function(){

        $.get("/scrape", function(data){
            console.log("clicked")
        })
    })

    }
)