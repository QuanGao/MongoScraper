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
            } 
            $(".articleCounter").modal("show");
            $('.articleCounter').on('hidden.bs.modal', function () {
                location.reload();
               })
            
        })
    });

    $(".addComment").on("click", function(){
        console.log("comment clicked")

        $("#commentModal").on("show.bs.modal", function (event) {
        
            const commentButton = $(event.relatedTarget) // Button that triggered the modal
            console.log(commentButton)
            const articleId = commentButton.data("id") // Extract info from data-* attributes
            console.log(articleId)
            $(this).find(".modal-title").text(`Comments for article: ${articleId}`);
            const commentContent = $(this).find(".commentText").val().trim();
            console.log(commentContent)
    
          })

    })

})