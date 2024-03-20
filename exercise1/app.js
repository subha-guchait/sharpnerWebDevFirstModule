function printUserData(event) {
  event.preventDefault();
  console.log(event.target.u_name.value);
  console.log(event.target.u_age.value);
}

//we use event.preventDefault() because if we don't use it form will submit as soon as user click submit button and it does not check validation like user write passoword corret in type(combination of lower case, upper case or special key)
