function insertLabels(data, element) {
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
	.attr('class', 'labels')
	.attr('fill', 'black')
	.attr('stroke', 'white')
	.attr('opacity', .85)
	.attr('x', 100)
	.attr('width', 10 * (d.bio.length ? d.bio.length : d.name.length) + "px" )
	.attr('height', 100);

    var ts = d3.select(e)
	.append("svg:text")
	.attr('class', 'labels');
    ts.append("svg:tspan")
	.attr("id", "name")
	.attr('x', '100')
	.attr('width', 300)
	.attr('dy', '1em')
	.attr('fill', 'white')
	.text(function(d) {return d.name});
    ts.append("svg:tspan")
	.attr("id", "bio")
	.attr('x', '100')
	.attr('dy', '1em')
	.attr('width', 300)
	.attr('text-wrap', 'normal')
	.attr('fill', 'white')
	.text(function(d) {return d.bio});

}
