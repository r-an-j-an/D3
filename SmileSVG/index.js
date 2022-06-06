function Start(){
    const svg = d3.select('svg');
    const height = +svg.attr('height');
    const width = +svg.attr('width');

    const circle = svg.append('circle')
        .attr('r', height/2)
        .attr('cx', width/2)
        .attr('cy', height/2)
        .attr('fill','yellow')
        .attr('stroke','black');

    const eyeXoffset = 100;
    const eyeYoffset = -70;
    const leffteye = svg.append('circle')
        .attr('r', 30)
        .attr('cx', width/2 - eyeXoffset)
        .attr('cy', height/2 + eyeYoffset)
        .attr('fill','black');
    
    
    const righteye = svg.append('circle')
        .attr('r', 30)
        .attr('cx', width/2 + eyeXoffset)
        .attr('cy', height/2 + eyeYoffset)
        .attr('fill','black');
    
    
    const g = svg.append('g')
        .attr('transform',`translate(${width/2},${height/2})`);
        const arc = d3.arc();
        const mouth = g.append('path')
            .attr('d',arc({
                innerRadius: 160,
                outerRadius: 180,
                startAngle: Math.PI/2,
                endAngle: Math.PI*3/2
            }));
    const eyebrowheight=15;
    const eyebrowwidth=70;
    const eyebrowYoffset=-130;
    const lefteyebrow = svg.append('rect')
            .attr('x',width/2 - eyeXoffset- eyebrowwidth/2)
            .attr('y',height/2 + eyebrowYoffset)
            .attr('width',eyebrowwidth)
            .attr('height',eyebrowheight)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset-30)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset-30)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset);
    const righteyebrow = svg.append('rect')
            .attr('x',width/2 + eyeXoffset- eyebrowwidth/2)
            .attr('y',height/2 + eyebrowYoffset)
            .attr('width',eyebrowwidth)
            .attr('height',eyebrowheight)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset-30)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset-30)
        .transition().duration(500)
            .attr('y',height/2 + eyebrowYoffset);
}