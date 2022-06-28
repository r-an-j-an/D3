function Start(){
    const svg = d3.select('svg');
    const width= +svg.attr('width');
    const height= +svg.attr('height');
    const colorLegend = (selection, props) => {
        const {
            colorScale,
            circleRadius,
            spacing,
            textOffset
        } = props;
    
    const groups = selection.selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups
        .enter().append('g')
            .attr('class', 'tick');
    groupsEnter
        .merge(groups)
            .attr('transform', (d, i) =>
              `translate(0, ${i * spacing})`
            );
    groups.exit().remove();
    
    groupsEnter.append('circle')
        .merge(groups.select('circle'))
            .attr('r', circleRadius)
            .attr('fill', colorScale);
    
        groupsEnter.append('text')
            .merge(groups.select('text'))
                .text(d => d)
                .attr('dy', '0.32em')
                .attr('x', textOffset);
    }

    const render = data => {
        const xAxisLabel = 'Months';
        const yAxisLabel = 'Deaths';
        const xValue = d => d.date;
        const yValue = d => d.value;
        const circleradius = 6;
        const colorValue = d => d.name;

        const margin = { top:120, right:300, bottom:60, left:150 };
        const innerWidth = width- margin.left - margin.right;
        const innerHeight = height- margin.top - margin.bottom;
        
        const xscale = d3.scaleTime()
            .domain(d3.extent(data, xValue)) 
            .range([0,innerWidth])
            .nice();
        
        const yscale = d3.scaleLinear()
            .domain(d3.extent(data, yValue)) 
            .range([innerHeight,0])
            .nice();

        const colorScale = d3.scaleOrdinal(d3.colorScheme10)
            // .domain(["Kerala", "Telengana", "Delhi", "Rajasthan", "Uttar Pradesh", "Haryana", "Ladakh", "Tamil Nadu", "Karnataka", "Maharashtra", "Punjab", "Jammu and Kashmir", "Andhra Pradesh", "Uttarakhand", "Odisha", "Puducherry", "West Bengal", "Chhattisgarh", "Chandigarh", "Gujarat", "Himachal Pradesh","Madhya Pradesh","Bihar","Manipur","Mizoram","Andaman and Nicobar Islands","Goa","Unassigned","Assam","Jharkhand","Arunachal Pradesh","Tripura","Nagaland","Meghalaya","Dadra and Nagar Haveli and Daman and Diu","Cases being reassigned to states","Sikkim","Daman & Diu","Lakshadweep","Telangana","Dadra and Nagar Haveli","Bihar****","Madhya Pradesh***","Himanchal Pradesh","Karanataka","Maharashtra***"])
            // .range([
                
            //     0x1f77b4, 0xaec7e8,
            //     0xff7f0e, 0xffbb78,
            //     0x2ca02c, 0x98df8a,
            //     0xd62728, 0xff9896,
            //     0x9467bd, 0xc5b0d5,
            //     0x8c564b, 0xc49c94,
            //     0xe377c2, 0xf7b6d2,
            //     0x7f7f7f, 0xc7c7c7,
            //     0xbcbd22, 0xdbdb8d,
            //     0x17becf, 0x9edae5,
            //     0xFF1493, 0xFF7216,
            //     0xF3E88E, 0xDBDB70,
            //     0xDBDB70, 0xCCCCFF,
            //     0xADFF2F, 0xAC7F24,
            //     0xA2BC13, 0x006B54,
            //     0x5DFC0A, 0x6F4242,
            //     0xF0E68C, 0xEE82EE,
            //     0x556B2F, 0x4682B4,
            //     0x708090, 0xFFFFFF,
            //     0xFFD700, 0xFF4500,
            //     0xBDB76B, 0x7CFC00,
            //     0x00FFFF, 0xFF00FF,
            //     0xA0522D, 0xBC8F8F,

            // ]);
        
        
        const g = svg.append('g')
            .attr('transform',`translate(${margin.left},${margin.top})`);
        
        // const xAxisTickFormat = number =>
        //     d3.format('.3s')(number)//formating number
        //         .replace('G','B');

        const xAxis = d3.axisBottom(xscale)
            // .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight)
            .tickPadding(15);
        
        const yAxis = d3.axisLeft(yscale)
            .tickSize(-innerWidth)
            .tickPadding(15);

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
            .attr('y',-100)
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
            .text(`Statewise Covid-19 Recorded Death-Toll 20-21`)
            .attr('class','heading')
            .attr('fill','white')
            .attr('y',-40)
            .attr('x',-100)
            // .attr('text-anchor','middle');
        
        const LineGenerator = d3.line()
            .x(d=> xscale(xValue(d)))
            .y(d=> yscale(yValue(d)))
            .curve(d3.curveBasis);
        
        const nested = d3.group(data, colorValue);
        console.log(nested);
        colorScale.domain(nested.keys(d => d.key));

        g.selectAll('line-path').data(nested)
            .enter().append('path')
                .attr('class','line-path')
                .attr('id',d.keys(d=>d.name ))
                .attr('d',d => LineGenerator(d[1]))
                .attr('stroke',d => colorScale(d.keys(d => d)));
        // g.selectAll('circle').data(data)
        //     .enter().append('circle')
        //         .attr('cy',d=> yscale(yValue(d)))
        //         .attr('cx',d => xscale(xValue(d)) )
        //         .attr('r',circleradius);

        svg.append('g')
            .attr('transform', `translate(1200,100)`)
            .call(colorLegend, {
                colorScale,
                circleRadius: 13,
                spacing: 30,
                textOffset: 15
        });
    };

    d3.csv('data.csv')
        .then(data => {
            // console.log(data);
            data.forEach(d =>{
            d.date = new Date(d.date);
            d.value = +d.value;
        });
        render(data);
    });
    
}
