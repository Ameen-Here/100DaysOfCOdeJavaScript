const imgContainer = document.querySelector(".imgFile");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.setAttribute("src", `${imgPath}`);

    img.addEventListener("load", () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", () => reject(new Error("Image Not Found.")));
  });
};

let currentImg;

loadImg("images/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("Image 1 Loaded");
    return wait(3);
  })
  .then(() => {
    currentImg.style.display = "none";
    return loadImg("images/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("Image 2 is loaded");
    return wait(3);
  })
  .then(() => {
    currentImg.style.display = "none";
    return loadImg("Sadasda");
  })
  .then((img) => {
    console.log("3rd img loaded.");
  })
  .catch((err) => console.log(err));

////////////////////////////////////////////////////////////////////////////////
// My easy solution ;)
// wait(5)
//   .then(() => {
//     imgContainer.src = "images/img-1.jpg";
//     return wait(2);
//   })
//   .then(() => {
//     imgContainer.src = "";
//     return wait(5);
//   })
//   .then(() => {
//     imgContainer.src =
//       "images/gettyimages-937327264-0ffed8630d3555e1c7389d3af280fffec4bcf9ef.jpg";
//     return wait(2);
//   })
//   .then(() => (imgContainer.src = ""));
