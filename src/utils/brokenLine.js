export function brokenLine(resourceData, canvas) {
  //参数
  var xSpace = 50, //x轴间距
    ySpace = 0.5, //y轴间距
    yPadding = 30, //上下边距
    xPadding = 40, //左右边距
    //渐变颜色组
    colors = ['#fc00ff', '#fa71cd', '#f78ca0', '#fe9a8b'],
    arcR = 5, //点的半径
    font = "16px Verdana", //文字
    fontColor = "#00B5AD", //文字颜色
    lineWidth = 4 //线条宽度

  //数据源提取
  let len = resourceData.length
  let xArr = [], //x轴坐标
    yArr = [], //y轴坐标
    tmp_yArr = [], //y值
    tmp_yMax, //y最大值
    tmp_yMin, //y最小值
    yMin, //y坐标最大值
    yMax //y坐标最小值
  //计算x轴坐标和整理y值
  for (let i in resourceData) {
    xArr.push(i * xSpace)
    tmp_yArr.push(resourceData[i].y)
  }
  //计算y最值
  tmp_yMax = Math.max.apply(Math, tmp_yArr)
  tmp_yMin = Math.min.apply(Math, tmp_yArr)
  for (let i in resourceData) {
    yArr.push(tmp_yArr[i] * ySpace)
  }
  //计算y坐标最值
  yMin = Math.min.apply(Math, yArr);
  yMax = Math.max.apply(Math, yArr);
  //canvas准备
  canvas.width = xSpace * (len - 1) + xPadding * 2;
  canvas.height = yMax + yPadding * 2;
  let ctx = canvas.getContext("2d")
  //画折线
  for (let i in resourceData) {
    let x = xArr[i] + xPadding,
      y = yMax - yArr[i] + yPadding
    if (i === 0) {
      ctx.moveTo(x, y) //启动
    } else {
      ctx.lineTo(x, y) //线
    }
  }
  ctx.lineWidth = lineWidth;
  var grd = ctx.createLinearGradient(0, yPadding, 0, canvas.height); //线性渐变的起止坐标
  for (var i = 0; i < colors.length; i++) {
    grd.addColorStop(i / colors.length, colors[i]);
  }
  ctx.strokeStyle = grd;
  ctx.stroke(); //渲染
  //画点
  for (let i in resourceData) {
    let x = xArr[i] + xPadding,
      y = yMax - yArr[i] + yPadding,
      xMemo = resourceData[i].x,
      yMemo = resourceData[i].y
    ctx.beginPath()
    ctx.font = font;
    ctx.fillStyle = fontColor
    ctx.arc(x, y, arcR, 0, 2 * Math.PI) //画点
    ctx.fill()
    //画文字
    ctx.fillText(yMemo, x - 6, y - 10);
    ctx.fillText(xMemo, x - 17, canvas.height - 2, 40);
  }
}