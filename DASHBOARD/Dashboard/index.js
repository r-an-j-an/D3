function deaths(){
    const svg=d3.select('#deaths');

    const width= +svg.attr('width');
    const height= +svg.attr('height');

    const render = data => {
        const xValue = d => d.Date_reported;
        const yValue = d => d.Cumulative_deaths;
        const margin = { top:20, right:40, bottom:100, left:120 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const xscale = d3.scaleTime()
            .domain(d3.extent(data, xValue)) 
            .range([0,innerWidth])
            .nice();
        
        const yscale = d3.scaleLinear()
            .domain(d3.extent(data, yValue)) 
            .range([innerHeight,0]);
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        const yAxis = g.append('g').call(d3.axisLeft(yscale));

        const xAxis = g.append('g').call(d3.axisBottom(xscale))
            .attr('transform',`translate(0,${innerHeight})`);


        yAxis.append("text")
            .attr("y", -90)
            .attr("x", -innerHeight/2 )
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr('transform',`rotate(-90)`)
            .text("Deaths →");
        
        xAxis.append('text')
            .attr('class','axis-label')
            .text(`Timeline →`)
            .attr('y',50)
            .attr('x',innerWidth/2);

        g.append('text')
            .text(`Deaths in India`)
            .attr('class','heading')
            .attr('y',40)
            .attr('x',innerHeight-180)
            .attr('text-anchor','middle');
        g.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('class','bar-deaths')
                .attr('x', function(d){return xscale(d.Date_reported)})
                .attr('y', function(d){return yscale(d.Cumulative_deaths)})
                .attr('width',4)
                .on("mouseover", onMouseover)
                .on("mouseout", onMouseout)
                .transition()
                .ease(d3.easeLinear)
                .duration(100)
                .attr('height',d => {return innerHeight - yscale(d.Cumulative_deaths)});
    }

    d3.csv('data.csv').then(data => {
        data.forEach(d =>{
            d.Date_reported = new Date(d.Date_reported);
            d.Cumulative_deaths = +d.Cumulative_deaths;
        });
        render(data);
    });
}
function onMouseover(d,i){
    var xPos = parseFloat(d3.select(this).attr('x'));
    var yPos = parseFloat(d3.select(this).attr('y'));
    var daterep = getCurrentDate(i.Date_reported);
    d3.select("#death-tooltip")
        .select('#date').text(daterep);

    d3.select("#death-tooltip")
        .select('#value').text(i.Cumulative_deaths);    
    
    d3.select('#death-tooltip').classed('hidden',false);
    
}
function onMouseout(d,i){
    d3.select('#death-tooltip').classed('hidden',true);
}

function getCurrentDate(d){
    const t = new Date(d);
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}/${month}/${year}`;
}


// Cummilative Cases

function cases(){
    const svg=d3.select('#cases');

    const width= +svg.attr('width');
    const height= +svg.attr('height');

    const render = data => {
        const xValue = d => d.Date_reported;
        const yValue = d => d.Cumulative_cases;
        const margin = { top:20, right:40, bottom:100, left:120 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const yAxisTickFormat = number =>
            d3.format('.3s')(number)//formating number
                .replace('G','B');
                
        const xscale = d3.scaleTime()
            .domain(d3.extent(data, xValue)) 
            .range([0,innerWidth])
            .nice();
        
        const yscale = d3.scaleLinear()
            .domain(d3.extent(data, yValue)) 
            .range([innerHeight,0]);
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        const yAxis = g.append('g').call(d3.axisLeft(yscale).tickFormat(yAxisTickFormat));

        const xAxis = g.append('g').call(d3.axisBottom(xscale))
            .attr('transform',`translate(0,${innerHeight})`);


        yAxis.append("text")
            .attr("y", -85)
            .attr("x", -innerHeight/2 )
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr('transform',`rotate(-90)`)
            .text("Cases →");
        
        xAxis.append('text')
            .attr('class','axis-label')
            .text(`Timeline →`)
            .attr('y',50)
            .attr('x',innerWidth/2);

        g.append('text')
            .text(`Cases in India`)
            .attr('class','heading')
            .attr('y',40)
            .attr('x',innerHeight-180)
            .attr('text-anchor','middle');
        g.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('class','bar-cases')
                .attr('x', function(d){return xscale(d.Date_reported)})
                .attr('y', function(d){return yscale(d.Cumulative_cases)})
                .attr('width',4)
                .on("mouseover", onMouseovercases)
                .on("mouseout", onMouseoutcases)
                .transition()
                .ease(d3.easeLinear)
                .duration(100)
                .attr('height',d => {return innerHeight - yscale(d.Cumulative_cases)});
    }

    d3.csv('data.csv').then(data => {
        data.forEach(d =>{
            d.Date_reported = new Date(d.Date_reported);
            d.Cumulative_cases = +d.Cumulative_cases;
        });
        render(data);
    });
}
function onMouseovercases(d,i){

    var daterepcases = getCurrentDate(i.Date_reported);
    d3.select("#cases-tooltip")
        .select('#datecases').text(daterepcases);

    d3.select("#cases-tooltip")
        .select('#valcases').text(i.Cumulative_cases);    
    
    d3.select('#cases-tooltip').classed('hidden',false);
    
}
function onMouseoutcases(d,i){
    d3.select('#cases-tooltip').classed('hidden',true);
}



function vaccine(){
    const svg=d3.select('#vaccine');

    const width= +svg.attr('width');
    const height= +svg.attr('height');

    const render = data => {
        const xValue = d => d.Date;
        const yValue = d => d.total_vaccinations;
        const margin = { top:20, right:40, bottom:100, left:120 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const yAxisTickFormat = number =>
            d3.format('.3s')(number)//formating number
                .replace('G','B');
                
        const xscale = d3.scaleTime()
            .domain(d3.extent(data, xValue)) 
            .range([0,innerWidth])
            .nice();
        
        const yscale = d3.scaleLinear()
            .domain(d3.extent(data, yValue)) 
            .range([innerHeight,0]);
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        const yAxis = g.append('g').call(d3.axisLeft(yscale).tickFormat(yAxisTickFormat));

        const xAxis = g.append('g').call(d3.axisBottom(xscale))
            .attr('transform',`translate(0,${innerHeight})`);


        yAxis.append("text")
            .attr("y", -85)
            .attr("x", -innerHeight/2 )
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr('transform',`rotate(-90)`)
            .text("Vaccinated Strength →");
        
        xAxis.append('text')
            .attr('class','axis-label')
            .text(`Timeline →`)
            .attr('y',50)
            .attr('x',innerWidth/2);

        g.append('text')
            .text(`Vaccinations in India`)
            .attr('class','heading')
            .attr('y',40)
            .attr('x',innerHeight-180)
            .attr('text-anchor','middle');
        g.selectAll('rect').data(data)
            .enter().append('rect')
                .attr('class','bar-vaccine')
                .attr('x', function(d){return xscale(d.Date)})
                .attr('y', function(d){return yscale(d.total_vaccinations)})
                .attr('width',4)
                .on("mouseover", onMouseovervaccine)
                .on("mouseout", onMouseoutcasesvaccine)
                .transition()
                .ease(d3.easeLinear)
                .duration(100)
                .attr('height',d => {return innerHeight - yscale(d.total_vaccinations)});
    }

    d3.csv('vacine1.csv').then(data => {
        data.forEach(d =>{
            d.Date = new Date(d.Date);
            d.total_vaccinations = +d.total_vaccinations;
        });
        render(data);
    });
}
function onMouseovervaccine(d,i){

    var vacdate = getCurrentDate(i.Date);
    
    d3.select("#vaccine-tooltip")
        .select('#datevaccine').text(vacdate);

    d3.select("#vaccine-tooltip")
        .select('#valvaccine').text(i.total_vaccinations);    
    
    d3.select('#vaccine-tooltip').classed('hidden',false);
    
}
function onMouseoutcasesvaccine(d,i){
    d3.select('#vaccine-tooltip').classed('hidden',true);
}