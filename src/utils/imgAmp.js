// 图片点击放大
export function imgAmp(Class) {
  let aImgs = document.getElementsByClassName(Class)[0].getElementsByTagName("img");
  setTimeout(() => {
    let parser = new DOMParser();
    document.body.appendChild(parser.parseFromString(
      `<div id="imgamp" style="
    background-color: rgba(0, 0, 0, 0.1);
    top:50%;
    left:50%;
    position: fixed;
    width:100%;
    z-index: 99;
    transform: translate(-50%,-50%);
    display:none
    "></div>`, "text/html").getElementsByTagName('div')[0]);
    let imgamp = document.getElementById("imgamp");
    for (let item of aImgs)
      item.addEventListener("click", () => {
        imgamp.appendChild(item.cloneNode());
        imgamp.style.display = 'block';
      });

    imgamp.addEventListener("click", () => {
      imgamp.style.display = 'none';
      var childs = imgamp.childNodes;
      for (var i = childs.length - 1; i >= 0; i--) {
        imgamp.removeChild(childs[i]);
      }
    })
  })
}