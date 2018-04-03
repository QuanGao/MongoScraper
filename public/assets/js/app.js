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
    })
})