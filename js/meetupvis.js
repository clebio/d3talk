(function(){
var w = 900, h = 650,
fill = d3.scale.ordinal();

vis = d3.select("#graph")
	.append("svg");

d3.json(
    'http://localhost:8000/json/pythonkc_hackr_event.json', 
    function(json){
        
        var force = d3.layout.force()
            .charge(-1000)
            .nodes(json.nodes)
            .size([w, h])
            .start();
        
        var node = vis.selectAll("g")
            .data(json.nodes)
            .enter().append("g")  
            .attr("id", function(d){ return d.name;})    
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
	    insertLabels(d, this);
	});

	node.on("mouseout", function(d) {
	    d3.selectAll(".labels")
		.remove()
//	    d3.selectAll(".buttons")
//		.remove()
	})
	

	node.on("click", function(d) {
	    addButtons(d, this);
	})

        force.on("tick", function() {
            node.attr(
                "transform", 
                function(d) { return "translate(" + d.x + "," + d.y + ")"; }
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
	    .attr('fill', 'green')
	    .attr('stroke', 'blue')

	    .append('svg:tspan')
	    .attr('class', 'buttons')
	    .attr('x', 0)
	    .attr('y', 50)
	    .attr('width', 100)
	    .attr('height', 40 )
	    .text('click me!');
		  
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
})();