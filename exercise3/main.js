//we want to insert a paragraph after ul tag

//create element
const para = document.createElement("p");

//create textNode (create text)
const paraText = document.createTextNode("Total Fruits: 4");

//append the text node to the 'p' node
para.appendChild(paraText);

//append the 'p' node to the in the 2nd div

//select the second div
const divs = document.getElementsByTagName("div");
const secondDiv = divs[1];
//append in 2nd div (that is last of ul tag)
secondDiv.appendChild(para);
console.log(paraText);

//insert before method
const fruits = document.querySelector(".fruits");
//secondDiv.insertBefore(para, fruits);

//setAttribute, className , id
para.className = "fruitCount";
para.id = "fruitstotal";
para.setAttribute("title", "fruitsTotal");
