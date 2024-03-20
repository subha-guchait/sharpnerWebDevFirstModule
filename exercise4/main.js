const ul = document.querySelector(".fruits");
ul.style.backgroundColor = "grey";

//parent element select => .parentElement
ul.parentElement.style.backgroundColor = "pink";

//parent of parent select
ul.parentElement.parentElement.style.backgroundColor = "blue";

//children => children(HTML collection), firstElementChild, LastElementChild
ul.children[2].style.backgroundColor = "green";
ul.lastElementChild.style.backgroundColor = "red";
ul.firstElementChild.style.color = "red";

//sibling => nextElementSibling, previousElementSibling
ul.nextElementSibling.style.backgroundColor = "orange";
ul.previousElementSibling.style.color = "green";
