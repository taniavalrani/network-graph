var data = {
    "nodes": [
      {"id": "Leslie"},
      {"id": "Tom"},
      {"id": "Ron"},
      {"id": "April"},
      {"id": "Jerry"},
      {"id": "Donna"},
      {"id": "Chris"},
      {"id": "Ben"},
      {"id": "Ann"},
      {"id": "Andy"}
    ],
    "links": [{"source": "Jerry", "target": "Ann", "strength": 0.025406080799666806, "count": 61}, {"source": "Donna", "target": "Chris", "strength": 0.025406080799666806, "count": 61}, {"source": "Donna", "target": "Andy", "strength": 0.029154518950437316, "count": 70}, {"source": "Donna", "target": "Ben", "strength": 0.029571012078300707, "count": 71}, {"source": "Jerry", "target": "Andy", "strength": 0.038317367763431906, "count": 92}, {"source": "Donna", "target": "Ann", "strength": 0.03998334027488547, "count": 96}, {"source": "Jerry", "target": "Donna", "strength": 0.0424822990420658, "count": 102}, {"source": "Jerry", "target": "Ben", "strength": 0.044981257809246146, "count": 108}, {"source": "Ron", "target": "Jerry", "strength": 0.04581424406497293, "count": 110}, {"source": "Jerry", "target": "Chris", "strength": 0.0470637234485631, "count": 113}, {"source": "Chris", "target": "April", "strength": 0.05206164098292378, "count": 125}, {"source": "Jerry", "target": "April", "strength": 0.05664306538942107, "count": 136}, {"source": "Tom", "target": "Chris", "strength": 0.05830903790087463, "count": 140}, {"source": "Donna", "target": "April", "strength": 0.059142024156601414, "count": 142}, {"source": "Ron", "target": "Donna", "strength": 0.059558517284464804, "count": 143}, {"source": "Ben", "target": "Ann", "strength": 0.06289046230737193, "count": 151}, {"source": "Chris", "target": "Andy", "strength": 0.08371511870054144, "count": 201}, {"source": "Tom", "target": "Jerry", "strength": 0.09454394002498959, "count": 227}, {"source": "Ron", "target": "Ben", "strength": 0.10037484381507705, "count": 241}, {"source": "Leslie", "target": "Donna", "strength": 0.10495626822157435, "count": 252}, {"source": "Ron", "target": "Ann", "strength": 0.10912119950020825, "count": 262}, {"source": "Ben", "target": "April", "strength": 0.11203665139525198, "count": 269}, {"source": "Tom", "target": "April", "strength": 0.1149521032902957, "count": 276}, {"source": "Chris", "target": "Ben", "strength": 0.11828404831320283, "count": 284}, {"source": "Tom", "target": "Donna", "strength": 0.11995002082465639, "count": 288}, {"source": "Tom", "target": "Andy", "strength": 0.1241149521032903, "count": 298}, {"source": "Ron", "target": "Chris", "strength": 0.12619741774260726, "count": 303}, {"source": "April", "target": "Ann", "strength": 0.1282798833819242, "count": 308}, {"source": "Ron", "target": "April", "strength": 0.1286963765097876, "count": 309}, {"source": "Ben", "target": "Andy", "strength": 0.14743856726364016, "count": 354}, {"source": "Ron", "target": "Andy", "strength": 0.16118284048313203, "count": 387}, {"source": "Ann", "target": "Andy", "strength": 0.16243231986672219, "count": 390}, {"source": "Leslie", "target": "Jerry", "strength": 0.1711786755518534, "count": 411}, {"source": "Tom", "target": "Ann", "strength": 0.18950437317784258, "count": 455}, {"source": "Tom", "target": "Ben", "strength": 0.19366930445647645, "count": 465}, {"source": "Chris", "target": "Ann", "strength": 0.2003331945022907, "count": 481}, {"source": "Tom", "target": "Ron", "strength": 0.2094960433152853, "count": 503}, {"source": "Leslie", "target": "Chris", "strength": 0.2140774677217826, "count": 514}, {"source": "Leslie", "target": "Andy", "strength": 0.29321116201582675, "count": 704}, {"source": "Leslie", "target": "April", "strength": 0.33069554352353187, "count": 794}, {"source": "April", "target": "Andy", "strength": 0.5089546022490629, "count": 1222}, {"source": "Tom", "target": "Leslie", "strength": 0.5181174510620574, "count": 1244}, {"source": "Ron", "target": "Leslie", "strength": 0.6951270304039984, "count": 1669}, {"source": "Leslie", "target": "Ann", "strength": 0.743856726364015, "count": 1786}, {"source": "Leslie", "target": "Ben", "strength": 1.0, "count": 2401}]

}

var colors = {
	"Leslie Knope": "#fcc603",
	"Tom Haverford": "#0f9425",
	"Ron Swanson": "#940f0f",
	"Ben Wyatt": "#184aad",
	"Andy Dwyer": "#1ccaff",
	"Ann Perkins": "#d8b7ed",
	"April Ludgate": "#ba1472",
	"Chris Traeger": "#1b1870",
	"Donna Meagle": "#af1ac9",
	"Jerry Gergich": "#f58331"
}
var linkStrengthScale = d3.scaleLinear()
    .range([0, 1]);

var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".network")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")

var repelForce = d3.forceManyBody()
                     .strength(d=> d.length * 20)
                     .distanceMax(400)
                     .distanceMin(1);
// Initialize the links
var link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .style("stroke", "#aaa")
    .style("stroke-width", 2)
    .on("mouseover", function(d){return tooltip.style("visibility", "visible")
                                            .text("Number of lines said:" + d.count);})
	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

// Initialize the nodes
var node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    // red yello pink green violet orange indigo
    .style("fill", function(d) {
        if (d.id == "Leslie")
            return colors["Leslie Knope"];
        else if (d.id == "Tom") 
            return colors["Tom Haverford"];
        else if (d.id == "Ann")
            return colors["Ann Perkins"];
        else if (d.id == "Donna")
            return colors["Donna Meagle"];
        else if (d.id == "Chris")
            return colors["Chris Traeger"];
        else if (d.id == "Ben")
            return colors["Ben Wyatt"];
        else if (d.id == "Jerry")
            return colors["Jerry Gergich"];
        else if (d.id == "Ron")
            return colors["Ron Swanson"];
        else if (d.id == "April")
            return colors["April Ludgate"];
        else if (d.id == "Andy") 
            return colors["Andy Dwyer"];

    })
    .on("mouseover", function(d){return tooltip.style("visibility", "visible")
                                            .text(d.id)
                                            .style("font-family", "Helvetica Neue")})
	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


const simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody()) 
    .force('center', d3.forceCenter(width / 2, height / 2))


// It's important to put the individual strength at each force link
// it DOES NOT work if you just put it in when you're setting up the simulation
simulation.force('link', d3.forceLink()
  .id(d => d.id)
  .strength(d => d.strength))

const linkElements = svg.append('g')
    .selectAll('line')
    .data(data.links)
    .enter().append('line')
      .attr('stroke-width', 2)
      .attr('stroke', '#E5E5E5')


// This function is run at each iteration of the force algorithm, updating the nodes position.

simulation.nodes(data.nodes).on("tick", () => {
    node
      .attr("cx", node => node.x)
      .attr("cy", node => node.y)
    linkElements
    .attr('x1', link => link.source.x)
    .attr('y1', link => link.source.y)
    .attr('x2', link => link.target.x)
    .attr('y2', link => link.target.y)
  })


// this is the function that is not working!
// that i can't find an alternative to
simulation.force('link').link(link)
          
