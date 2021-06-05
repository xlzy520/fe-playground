/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  // ****** TODO: PART II ******
  let bars = document.querySelector("#aBarChart");
  let rects = bars.querySelectorAll("rect")
  const res = Array.from(rects).sort((a, b) => {
    const aWidth  = a.getAttribute('width')
    const bWidth  = b.getAttribute('width')
    return aWidth - bWidth
  })
  bars.innerHTML = ''
  res.forEach((item, index)=>{
    item.setAttribute('transform', `translate(0, ${14 * index}) scale(-1, 1)`)
    bars.appendChild(item)
  })
}

/**
 * Render the visualizations
 * @param data
 */
function update(data) {
  /**
   * D3 loads all CSV data as strings. While Javascript is pretty smart
   * about interpreting strings as numbers when you do things like
   * multiplication, it will still treat them as strings where it makes
   * sense (e.g. adding strings will concatenate them, not add the values
   * together, or comparing strings will do string comparison, not numeric
   * comparison).
   *
   * We need to explicitly convert values to numbers so that comparisons work
   * when we call d3.max()
   **/

  for (let d of data) {
    d.cases = +d.cases; //unary operator converts string to number
    d.deaths = +d.deaths; //unary operator converts string to number
  }

  // Set up the scales
  let barChart_width = 345;
  let areaChart_width = 295;
  let maxBar_width = 240;
  let data_length = 15;
  let aScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.cases)])
    .range([0, maxBar_width]);
  let bScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.deaths)])
    .range([0, maxBar_width]);
  let iScale_line = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([10, 500]);
  let iScale_area = d3
    .scaleLinear()
    .domain([0, data_length])
    .range([0, 260]);
  
  // Draw axis for Bar Charts, Line Charts and Area Charts (You don't need to change this part.)
  d3.select("#aBarChart-axis").attr("transform", "translate(0,210)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([barChart_width, barChart_width-maxBar_width])).ticks(5));
  d3.select("#aAreaChart-axis").attr("transform", "translate(0,245)").call(d3.axisBottom(d3.scaleLinear().domain([0, d3.max(data, d => d.cases)]).range([areaChart_width, areaChart_width-maxBar_width])).ticks(5));
  d3.select("#bBarChart-axis").attr("transform", "translate(5,210)").call(d3.axisBottom(bScale).ticks(5));
  d3.select("#bAreaChart-axis").attr("transform", "translate(5,245)").call(d3.axisBottom(bScale).ticks(5));
  let aAxis_line = d3.axisLeft(aScale).ticks(5);
  d3.select("#aLineChart-axis").attr("transform", "translate(50,15)").call(aAxis_line);
  d3.select("#aLineChart-axis").append("text").text("New Cases").attr("transform", "translate(50, -3)")
  let bAxis_line = d3.axisRight(bScale).ticks(5);
  d3.select("#bLineChart-axis").attr("transform", "translate(550,15)").call(bAxis_line);
  d3.select("#bLineChart-axis").append("text").text("New Deaths").attr("transform", "translate(-50, -3)")

  // ****** TODO: PART III (you will also edit in PART V) ******

  // TODO: Select and update the 'a' bar chart bars

  // TODO: Select and update the 'b' bar chart bars

  // TODO: Select and update the 'a' line chart path using this line generator
  let aLineGenerator = d3
    .line()
    .x((d, i) => iScale_line(i))
    .y(d => aScale(d.cases));

  // TODO: Select and update the 'b' line chart path (create your own generator)

  // TODO: Select and update the 'a' area chart path using this area generator
  let aAreaGenerator = d3
    .area()
    .x((d, i) => iScale_area(i))
    .y0(0)
    .y1(d => aScale(d.cases));

  // TODO: Select and update the 'b' area chart path (create your own generator)

  // TODO: Select and update the scatterplot points
  
  // ****** TODO: PART IV ******
}

/**
 * Update the data according to document settings
 */
async function changeData() {
  //  Load the file indicated by the select menu
  let dataFile = document.getElementById("dataset").value;
  try {
    const data = await d3.csv("data/" + dataFile + ".csv");
    if (document.getElementById("random").checked) {
      // if random
      update(randomSubset(data)); // update w/ random subset of data
    } else {
      // else
      update(data); // update w/ full data
    }
  } catch (error) {
    console.log(error)
    alert("Could not load the dataset!");
  }
}

/**
 *  Slice out a random chunk of the provided in data
 *  @param data
 */
function randomSubset(data) {
  return data.filter(d => Math.random() > 0.5);
}
