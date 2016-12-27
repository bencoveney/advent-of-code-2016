var password = "";
var index = 0;

while(password.length < 8)
{
  var hash = md5("reyedfim" + index);
  var firstFive = hash.substring(0,5);
  if(firstFive === "00000")
  {
    console.log(hash);
    password+=hash[5];
  }
  index++;
}

console.log(password);
