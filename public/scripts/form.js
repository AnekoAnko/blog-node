var content = document.querySelector(".posts");
var postForm = document.querySelector("#create-post");

document.querySelector("#show-form").addEventListener("click", function(){
    if (postForm.style.display == "none" || postForm.style.display == "") {
        postForm.style.display = "block";
    } 

});

document.querySelector("#show-posts").addEventListener("click", function(){
  if (content && (content.style.display == "none" || content.style.display == "")) {
    content.style.display = "block";
    postForm.style.display = "none";
  } 
});