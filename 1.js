
var data = "R4, R4, L1, R3, L5, R2, R5, R1, L4, R3, L5, R2, L3, L4, L3, R1, R5, R1, L3, L1, R3, L1, R2, R2, L2, R5, L3, L4, R4, R4, R2, L4, L1, R5, L1, L4, R4, L1, R1, L2, R5, L2, L3, R2, R1, L194, R2, L4, R49, R1, R3, L5, L4, L1, R4, R2, R1, L5, R3, L5, L4, R4, R4, L2, L3, R78, L5, R4, R191, R4, R3, R1, L2, R1, R3, L1, R3, R4, R2, L2, R1, R4, L5, R2, L2, L4, L2, R1, R2, L3, R5, R2, L3, L3, R3, L1, L1, R5, L4, L4, L2, R5, R1, R4, L3, L5, L4, R5, L4, R5, R4, L3, L2, L5, R4, R3, L3, R1, L5, R5, R1, L3, R2, L5, R5, L3, R1, R4, L5, R4, R2, R3, L4, L5, R3, R4, L5, L5, R4, L4, L4, R1, R5, R3, L1, L4, L3, L4, R1, L5, L1, R2, R2, R4, R4, L5, R4, R1, L1, L1, L3, L5, L2, R4, L3, L5, L4, L1, R3";

data = data.split(", ");

data = data.map(function(turn) {
  return {
    direction: turn[0],
    distance: parseInt(turn.substring(1))
  }
});

var state = {
  n: 0,
  e: 0,
  s: 0,
  w: 0,
  direction: "n"
};

var locations = [];
var duplicate;

function log(location, name) {
  console.log((name ? name + " was n: " : "n: ") + location.n + ", e: " + location.e + ", total: " + location.total);
}

data.forEach(function(turn) {
  var nextDirection;
  switch(state.direction)
  {
    case "n":
      nextDirection = turn.direction === "R" ? "e" : "w";
      break;
    case "e":
      nextDirection = turn.direction === "R" ? "s" : "n";
      break;
    case "s":
      nextDirection = turn.direction === "R" ? "w" : "e";
      break;
    case "w":
      nextDirection = turn.direction === "R" ? "n" : "s";
      break;
  }
  state.direction = nextDirection;
  
  for(i = 0; i < turn.distance; i++)
  {
    state[nextDirection] += 1;
    
    var nextLocation = {n: state.n - state.s, e: state.e - state.w};
    nextLocation.total = Math.abs(nextLocation.n) + Math.abs(nextLocation.e);
  
    if (!duplicate)
    {
      locations.forEach(function(location) {
        if(location.n === nextLocation.n && location.e === nextLocation.e)
        {
          duplicate = nextLocation;
        }
      });
    }
  
    locations.push(nextLocation);
  }
});

log(locations[locations.length - 1], "final");
log(duplicate, "duplicate");
