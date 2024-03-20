const subHeading = document.createElement("h3");
const subHeadingText = document.createTextNode(
  "Buy high quality organic fruits online"
);
subHeading.appendChild(subHeadingText);
const divs = document.getElementsByTagName("div");
divs[0].appendChild(subHeading);
subHeading.style.fontStyle = "italic";

const para = document.createElement("p");
const paraText = document.createTextNode("Total fruits: 4");
para.appendChild(paraText);

const ul = document.querySelector(".fruits");
divs[1].insertBefore(para, ul);
para.id = "fruits-total";
