it('nothing now', function() {})

//function sum(a, b){
  //  return a + b;
//}

//const sum = function(a,b) {
//return a + b;
//}

// const sum = (a,b) => a + b

//const sum = (a, b) => {
//    return a + b
//}

//const sum = (a) => a + a

//const sum = a => a + a

const sum = () => 5 + 5

console.log(sum(1,4));

it('a function test...', function(){
    console.log('Function',this)
})

it('a arrow test...', () => {
    console.log('Arrow',this)
})

