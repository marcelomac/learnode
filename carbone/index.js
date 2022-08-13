const fs = require("fs");
const carbone = require("carbone");

// data object to inject
let data = {
  nome: "Marcelo",
  data: "20220807",
};

let data2 = {
  cars: [{ brand: "Lumeneo" }, { brand: "Tesla" }, { brand: "Toyota" }],
};

// options object is used to pass more parameters to carbone render function
let options = {
  lang: "pt-br",
  //   "timezone": "Europe/Paris"
  reportName: "invoice_{d.id}_{d.date}.odt",
  convertTo: "pdf", //can be docx, txt, ...
  //   complement: {
  //     resposta: "I'd like to make a dinner reservation for 12."
  //  }
};

carbone.render("./template1.odt", data, options, (err, res) => {
  if (err) {
    return console.log(err);
  }
  // fs is used to create the PDF file from the render result
  fs.writeFileSync("./result.pdf", res);
  process.exit();
});
