console.log("Hello World");

const time = function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
};

time().then(() => console.log("Message after 3 seconds"));
for (let i = 0; i < 1000; i++) {
  console.log("Hellllllllllloooo");
}
