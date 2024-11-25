function counter() {
  let a = 1;
  function increment() {
    return a++;
  }
  return increment;
}
let count = counter();
console.log(count());
console.log(count());
