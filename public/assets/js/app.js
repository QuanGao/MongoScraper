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
        
            const commentButton = $(event.relatedTarget) 
            const id = commentButton.data("id")
            $(this).find(".modal-title").text(`Comments for article: ${id}`);

            $(this).find(".saveComment").data("id",id)
            console.log("save comment ID: " + id)

            $.get(`/getComments/${id}`, (data, status)=>{
                $(".comment-container").empty();
                console.log("data send back from getcomments byID   " + data)
                const comments = data.notes;
                console.log(comments);
                comments.forEach(function(comment){
                    const commentContent = $("<li class='list-group-item'>").text(comment.content);
                    const deleteBtn = $(`<button class="btn btn-primary disabled comment-delete" data-noteId=${comment._id}>`).text("X")
                    commentContent.append(deleteBtn)
                    $(".comment-container").append(commentContent)
                })
            })  
        })        
    })

    $(".saveComment").on("click", function(event){
        event.preventDefault()
        const content = $(".commentText").val().trim();
        const id = $(this).data("id")
        console.log("content   " + content)
        $.post(`/saveComments/${id}`,{content}, function(data, status){
            console.log("data after save comemnt  " + data);
            console.log("data.notes after save comemnt  " + data.notes);
            console.log("data.title after save comemnt  " + data.title);
            $(".commentText").val("");

        })
    })  

})