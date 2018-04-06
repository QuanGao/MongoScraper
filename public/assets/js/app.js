$(document).ready(function () {

    $(".save").on("click", function(){
        const id = $(this).data("id")
        $.get(`/save/${id}`, (data, status)=>{
            location.reload();
        })
    });

    $(".unsave").on("click", function(){
        const id = $(this).data("id")
        $.get(`/unsave/${id}`, (data, status)=>{
            location.reload();           
        })
    });

    $(".scrape").on("click", function(){
        $.get("/scrape", (data, status)=>{
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
        $("#commentModal").on("show.bs.modal", function (event) {        
            const commentButton = $(event.relatedTarget) 
            const id = commentButton.data("id")
            $(this).find(".modal-title").text(`Comments for article: ${id}`);
            $(this).find(".saveComment").data("id",id);

            $.get(`/getComments/${id}`, (data, status)=>{
                $(".comment-container").empty();
                const comments = data.notes;
                comments.forEach((comment)=>{
                    const commentContent = $("<li class='list-group-item'>").text(comment.content);
                    const deleteBtn = $(`<button class="btn btn-primary disabled btn-sm comment-delete" data-noteid=${comment._id}>`).text("X")
                    deleteBtn.css({"position": "absolute", "right":"1%"})
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
        if(content){
            $.post(`/saveComments/${id}`,{content}, function(data, status){
                console.log("data after save comemnt  " + data);
                console.log("data.notes after save comemnt  " + data.notes);
                console.log("data.title after save comemnt  " + data.title);
                $(".commentText").val("");

            })
        }
    })  

    $(".comment-container").on("click", ".comment-delete",function(event){
        const id = $(this).data("noteid")
        $.ajax({
            url: `/deleteComments/${id}`,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });


    })

})