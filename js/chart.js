const PI = 3.141592
const HALF_PI = PI / 2.0
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (radius) {
    const r = Math.min(radius, height / 2, width / 2);
    const left = x + r;
    const top = y + r;
    const right = x + width - r;
    const bottom = y + height - r;

    ctx.moveTo(x, top);
    if (left < right && top < bottom) {
      ctx.arc(left, top, r, -PI, -HALF_PI);
      ctx.arc(right, top, r, -HALF_PI, 0);
      ctx.arc(right, bottom, r, 0, HALF_PI);
      ctx.arc(left, bottom, r, HALF_PI, PI);
    } else if (left < right) {
      ctx.moveTo(left, y);
      ctx.arc(right, top, r, -HALF_PI, HALF_PI);
      ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
    } else if (top < bottom) {
      ctx.arc(left, top, r, -PI, 0);
      ctx.arc(left, bottom, r, 0, PI);
    } else {
      ctx.arc(left, top, r, -PI, PI);
    }
    ctx.closePath();
    ctx.moveTo(x, y);
  } else {
    ctx.rect(x, y, width, height);
  }
}

var horizonalLinePlugin = {
  afterDraw: function (chartInstance) {
    var yScale = chartInstance.scales["y-axis-0"];
    var canvas = chartInstance.chart;
    var ctx = canvas.ctx;
    var index;
    var line;
    var color;
    if (chartInstance.options.horizontalLine) {
      for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
        line = chartInstance
          .options
          .horizontalLine[index];
        if (!line.color) {
          color = "rgba(0,0,0, .6)";
        } else {
          color = line.color;
        }
        if (line.y) {
          yValue = yScale.getPixelForValue(line.y);
        } else {
          yValue = 0;
        }
        ctx.lineWidth = 3;
        Chart.helpers.canvas.clipArea(ctx, chartInstance.chartArea);
        if (yValue) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chartInstance.chartArea.left, yValue);
          ctx.lineTo(chartInstance.chartArea.right, yValue);
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.restore();
        }
        Chart.helpers.canvas.unclipArea(ctx);
        if (line.label) {
          const text = line.label.text;
          ctx.textAlign = 'right';
          const width = ctx
            .measureText(text)
            .width
            ctx
            .save();
          roundedRect(ctx, chartInstance.chartArea.right - (width + 2 * 6) - 6, yValue - line.height / 2, width + 2 * 6, line.height, 6);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.fillStyle = "rgba(255,255,255,1.0)";
          ctx.textBaseline = "middle";
          ctx.fillText(text, chartInstance.chartArea.right - 12, yValue);
          ctx.restore();
        }
      }
      return;
    };
  }
};