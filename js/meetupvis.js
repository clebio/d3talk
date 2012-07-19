(function(){
var w = 900, h = 650,
fill = d3.scale.ordinal();

vis = d3.select("#graph")
	.append("svg");

d3.json(
    'http://localhost:8000/json/eventAttendees60617252.json',
//    'http://localhost:8000/json/pythonkc_hackr_event.json', 
    function(json){
        
        var force = d3.layout.force()
            .charge(-1000)
            .nodes(json.nodes)
            .size([w, h])
            .start();
        
        var node = vis.selectAll("g")
            .data(json.nodes)
            .enter().append("g")  
            .attr("id", function(d){ return d.name.replace(" ", "-");})    
            .attr("class", "node")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .call(force.drag);

	node.append("svg:image")
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 100)
            .attr('height', 100)
	    .attr('fill', 'blue')
	    .attr('float', 'left')
            .attr('xlink:href', 'http://localhost:8000/assets/kitteh_crop.jpg') // function(d){return d.photo_url})                    

	node.on("mouseover", function(d) {
	    d3.selectAll(".info").remove();
	    addLabels(d, this);
	});	

	node.on("mouseout", function(d) {
	})

	node.on("click", function(d) {	
	    d3.selectAll(".buttons").remove();
	    addButtons(d, this);
	})

        force.on("tick", function() {
            node.attr(
                "transform", 
                function(d) { return "translate(" + Math.round(d.x) + "," + Math.round(d.y) + ")"; }
            );
        });
     
        d3.select("#graph").on("click", function() {
	    d3.select(this)
		.attr("width", 120)
		.attr("height", 120);
	    
            force.resume();
        });

    })

    function addButtons(data, element) {
	this.d = data;
	this.e = element;

	d3.select(e)
	    .append('svg:text')
	    .attr('class', 'buttons')
	    .append('svg:tspan')
	    .attr('x', 0)
	    .attr('y', '1em')
	    .attr('width', 100)
	    .attr('height', '1em' )
	    .text('info');
		  
	d3.select(e)
	    .append('svg:rect')
	    .attr('x', 0)
	    .attr('y', 0)
	    .attr('width', 100)
	    .attr('height', 100)
	    .attr('opacity', 0)
	    .on("click", function(d) {
//		TODO: call code.meetup.getMembers() or something of the sort.
	    })

    }

    function addLabels(data, element) {
	this.e = element;
	this.d = data;

	// this is a hack to get the selected element front-most (highest z-index)
	// svg elements don't, apparently, have a z-index, just the order of creation.
	n = e;
	p = e.parentNode;
	p.removeChild(e);
	p.appendChild(n);

	d3.select(e)
 	    .append('svg:rect')
	    .attr('class', 'info')
	    .attr('x', 100)
	    .attr('width', 10 * d.name.length + 'px') // (d.bio.length ? d.bio.length : d.name.length) + "px" )
	    .attr('height', 100);

	var ts = d3.select(e)
	    .append("svg:text")
	    .attr('class', 'labels info');
	ts.append("svg:tspan")
	    .attr('x', '100')
	    .attr('width', 300)
	    .attr('dy', '1em')
	    .text(function(d) {return d.name});
/*	ts.append("svg:tspan")
	    .attr('x', '100')
	    .attr('dy', '1em')
	    .attr('width', 300)
	.text(function(d) {return d.bio});
*/
}

})();