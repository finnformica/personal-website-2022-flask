const parsedDate = JSON.parse(date);
parsedDate.forEach((item, index, parsedDate) => {
  d = new Date(item * 1000);
  parsedDate[index] = d.toLocaleDateString();
});

const parsedVol = JSON.parse(vol)
parsedVol.forEach((item, index, parsedVol) => { // zeroes represent Nan
  (!item) ? parsedVol[index] = Number.Nan : item;
});

const parsedClose = JSON.parse(close);


const data = {
  labels: parsedDate,
  datasets: [
  {
    label: 'BTC Close ($)',
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgb(0, 255, 0)',
    data: parsedClose,
    yAxisID: 'y',
    lineTension: 0.4
  }, {
    label: 'Volatility',
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor: 'rgb(0, 0, 255)',
    data: parsedVol,
    yAxisID: 'y1',
    lineTension: 0.4
  }]
};

const options = {
  borderWidth: 1.5,
  pointRadius: 0.5,
  responsive: true,
  plugins: {
    legend: {
      display: true
      },
      tooltip: {
        mode: 'index',
        intersect: false
        }
  },
  hover: { // shows tooltip when hovering over chart instead of just line
    mode: 'nearest',
    intersect: true
  },
  scales: {
    y: {
      type: 'logarithmic',
      display: true,
      position: 'left',
      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
    },
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 14.9
      }
    },
  },
}

const config = {
  type: 'line',
  data: data,
  options: options,
};

const bitcoinChart = new Chart(
    document.getElementById('bitcoinChart'),
    config
  );


const btns = document.getElementsByClassName('dropdown-item');

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', () => {

    console.log(btns[i].innerHTML);

  });
}
