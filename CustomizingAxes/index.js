function Start(){
    const svg=d3.select('svg');

    const width= +svg.attr('width');
    const height= +svg.attr('height');

    const render = data => {
        const xValue = d => d.population;
        const yValue = d => d.country;
        const margin = { top:50, right:40, bottom:60, left:150 };
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
        
        const xAxisTickFormat = number =>
            d3.format('.3s')(number)//formating number
                .replace('G','B');

        const xAxis = d3.axisBottom(xscale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight)

        g.append('g')
            .call(d3.axisLeft(yscale))
            .selectAll('.domain, .tick line')
                .remove();
        const XAxisG = g.append('g').call(xAxis)
            .attr('transform',`translate(0,${innerHeight})`)
            
        XAxisG.selectAll('.domain').remove()
        
        XAxisG
        .append('text')
            .attr('class','axis-label')
            .text("Population")
            .attr('y',50)
            .attr('x',innerWidth/2);
        
        g.append('text')
            .text("Top 10 Most Populous Countries")
            .attr('class','heading')
            .attr('y',-10)
            .attr('x',180);

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