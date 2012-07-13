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
	    .attr('float', 'left')
            .attr('xlink:href', function(d){return d.photo_url})                    


	node.on("mouseover", function(d) {
	    insertLabels(d, this);
	});

	node.on("mouseout", function(d) {
	    d3.selectAll(".labels")
		.remove()
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

})();