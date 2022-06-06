function Start(x1,y1){
    const svg=d3.select('svg');

    const width= +svg.attr('width');
    const height= +svg.attr('height');





    //         d.mpg = +d.mpg;
    //         d.cylinders = +d.cylinders;
    //         d.displacement = +d.displacement;
    //         d.horsepower = +d.horsepower;
    //         d.weight = +d.weight;
    //         d.acceleration = +d.acceleration;
    //         d.year = +d.year;


    const render = data => {
        const xAxisLabel = x1;
        const yAxisLabel = y1;
        var xValue = d => d.weight;
        var yValue = d => d.horsepower;

        if(x1=="mpg"){
            xValue = d => d.mpg;
        }
        if(x1=="cylinders"){
            xValue = d => d.cylinders;
        }
        if(x1=="displacement"){
            xValue = d => d.displacement;
        }
        if(x1=="horsepower"){
            xValue = d => d.horsepower;
        }
        if(x1=="weight"){
            xValue = d => d.weight;
        }
        if(x1=="acceleration"){
            xValue = d => d.acceleration;
        }
        if(x1=="year"){
            xValue = d => d.year;
        }
        
        if(y1=="mpg"){
            xValue = d => d.mpg;
        }
        if(y1=="cylinders"){
            xValue = d => d.cylinders;
        }
        if(y1=="displacement"){
            xValue = d => d.displacement;
        }
        if(y1=="horsepower"){
            xValue = d => d.horsepower;
        }
        if(y1=="weight"){
            xValue = d => d.weight;
        }
        if(y1=="acceleration"){
            xValue = d => d.acceleration;
        }
        if(y1=="year"){
            xValue = d => d.year;
        }

        const margin = { top:50, right:40, bottom:60, left:100 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const xscale = d3.scaleLinear()
            .domain(d3.extent(data, xValue)) 
            .range([0,innerWidth])
            .nice();
        
        const yscale = d3.scaleLinear()
        .domain(d3.extent(data, yValue)) 
            .range([0,innerHeight]);
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        const xAxisTickFormat = number =>
            d3.format('.3s')(number)//formating number
                .replace('G','B');

        const xAxis = d3.axisBottom(xscale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight)
        
        const yAxis = d3.axisLeft(yscale)
            .tickSize(-innerWidth);

        const YAxisG = g.append('g').call(yAxis);
            
        YAxisG
            .selectAll('.domain')
                .remove();
        
        const XAxisG = g.append('g').call(xAxis)
            .attr('transform',`translate(0,${innerHeight})`)
            
        YAxisG
            .append('text')
            .attr('class','axis-label')
            .text(yAxisLabel)
            .attr('transform',`rotate(-90)`)
            .attr('y',-50)
            .attr('x',-innerHeight/2)
            .attr('text-anchor','middle');

        XAxisG.selectAll('.domain').remove()
        
        XAxisG
        .append('text')
            .attr('class','axis-label')
            .text(xAxisLabel)
            .attr('y',50)
            .attr('x',innerWidth/2);
        
        g.append('text')
            .text(`${yAxisLabel} v/s ${xAxisLabel}`)
            .attr('class','heading')
            .attr('y',-10)
            .attr('x',innerHeight)
            .attr('text-anchor','middle');

        g.selectAll('circle').data(data)
            .enter().append('circle')
                .attr('cy',d=> yscale(yValue(d)))
                .attr('cx',d => xscale(xValue(d)) )
                .attr('r',5);
    }

    d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
        .then(data => {
            data.forEach(d =>{
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
            
        });
        render(data);
    });
    
}
