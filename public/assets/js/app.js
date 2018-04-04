$(document).ready(function () {

    $(".save").on("click", function(){
        const id = $(this).data("id")
        console.log("clicked")
        console.log(id)
        $.get(`/save/${id}`, function(data, status){
            console.log(data, status)
            location.reload();
            
        })
    });

    $(".unsave").on("click", function(){
        const id = $(this).data("id")
        console.log("unsaved clicked")
        console.log(id)
        $.get(`/unsave/${id}`, function(data, status){
            console.log(data, status)
            location.reload();
            
        })
    });

    $(".scrape").on("click", function(){
        $.get("/scrape", function(data, status){
            console.log(data, status)   
            // location.reload();  
            if(data.numOfnewItems>0){
                $(".report").text(`${data.numOfnewItems} more articles added`)
            } else {
            $(".report").text("No new articles. Check back later!")
            }

            $(".articleCounter").modal("show")
            $('.articleCounter').on('hidden.bs.modal', function () {
                location.reload();
               })
            
        })
    })
})