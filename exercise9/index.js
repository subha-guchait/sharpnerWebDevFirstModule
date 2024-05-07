localStorage.setItem("name", "Subhankar");
localStorage.setItem("name2", "Subha");
localStorage.setItem("name3", "kamal");

console.log(localStorage.key(0));
console.log(localStorage.getItem("name2"));
localStorage.removeItem("name2");
console.log(localStorage.length);
//localStorage.clear();

sessionStorage.setItem("name4", "Amit");
sessionStorage.setItem("name5", "Ayan");
sessionStorage.setItem("name6", "Tushar");

console.log(sessionStorage.key(1));
console.log(sessionStorage.getItem("name5"));
sessionStorage.removeItem("name5");
console.log(sessionStorage.length);
//sessionStorage.clear();

document.cookie = "name=John Doe";
console.log(document.cookie);
document.cookie = "name=John Smith";
