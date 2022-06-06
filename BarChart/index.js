function Start(){
    const svg=d3.select('svg');

    const width= +svg.attr('width');
    const height= +svg.attr('height');

    const render = data => {
        const xValue = d => d.population;
        const yValue = d => d.country;
        const margin = { top:20, right:40, bottom:20, left:100 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const xscale = d3.scaleLinear()
            .domain([0, d3.max(data, xValue)]) 
            .range([0,innerWidth]);
        
        const yscale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0,innerHeight])
            .padding(0.1);
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        g.append('g').call(d3.axisLeft(yscale));
        g.append('g').call(d3.axisBottom(xscale))
            .attr('transform',`translate(0,${innerHeight})`);

        g.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('y',d=> yscale(yValue(d)))
                .attr('width',d => xscale(xValue(d)) )
                .attr('height',yscale.bandwidth());
    }

    d3.csv('data.csv').then(data => {
        data.forEach(d =>{
            d.population = +d.population *1000;
        });
        render(data);
    });
}