const date = new Date();

const dom = {
  input: {
    number: <HTMLInputElement>document.querySelectorAll("[data-input='number']")[0],
    due: <HTMLInputElement>document.querySelectorAll("#input > .due")[0]
  },
  output: {
    number: <HTMLElement>document.querySelectorAll("[data-invoice='number']")[0],
    heading: <HTMLElement>document.querySelectorAll("[data-invoice='heading']")[0],
    bank: <HTMLElement>document.querySelectorAll("[data-invoice='bank']")[0],
    variable: <HTMLElement>document.querySelectorAll("[data-invoice='variable']")[0],
    type: <HTMLElement>document.querySelectorAll("[data-invoice='type']")[0],
    due: <HTMLElement>document.querySelectorAll("[data-invoice='due']")[0],
    issue: <HTMLElement>document.querySelectorAll("[data-invoice='issue']")[0],
    supplier: {
      name: <HTMLElement>document.querySelectorAll("[data-invoice='supplier-name']")[0],
      address1: <HTMLElement>document.querySelectorAll("[data-invoice='supplier-address1']")[0],
      address2: <HTMLElement>document.querySelectorAll("[data-invoice='supplier-address2']")[0],
      ico: <HTMLElement>document.querySelectorAll("[data-invoice='supplier-ico']")[0]
    },
    buyer: {
      name: <HTMLElement>document.querySelectorAll("[data-invoice='buyer-name']")[0],
      address1: <HTMLElement>document.querySelectorAll("[data-invoice='buyer-address1']")[0],
      address2: <HTMLElement>document.querySelectorAll("[data-invoice='buyer-address2']")[0],
      ico: <HTMLElement>document.querySelectorAll("[data-invoice='buyer-ico']")[0]
    }
  },
}

const invoice = {
  make: (what: "number" | "due" | "type" | "bank" | "cash") => {
    switch (what) {
      case "number":
        let number = ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getFullYear()).slice(-2) + ("0000" + dom.input.number.value).slice(-4);
        dom.output.number.innerHTML = "Faktura" + " " + number;
        dom.output.variable.innerHTML = number;
        break;
      case "due":
        dom.output.due.innerHTML = dom.input.due.value;
        break;
        case "bank":
          document.querySelectorAll(".bank").forEach(el => {
            el.style.display = "block";
          });
          dom.output.type.innerHTML = "bankovním převodem";
          break;
        case "cash":
          document.querySelectorAll(".bank").forEach(el => {
            el.style.display = "none";
          });
          dom.output.type.innerHTML = "hotově";
          break;
    }
  }
}

function make(what: "number" | "due" | "type" | "bank" | "cash") {
  switch (what) {
    case "number":
      let number = ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getFullYear()).slice(-2) + ("0000" + dom.input.number.value).slice(-4);
      dom.output.number.innerHTML = "Faktura" + " " + number;
      dom.output.variable.innerHTML = number;
      break;
    case "due":
      dom.output.due.innerHTML = dom.input.due.value;
      break;
      case "bank":
        document.querySelectorAll(".bank").forEach(el => {
          el.style.display = "block";
        });
        dom.output.type.innerHTML = "bankovním převodem";
        break;
      case "cash":
        document.querySelectorAll(".bank").forEach(el => {
          el.style.display = "none";
        });
        dom.output.type.innerHTML = "hotově";
        break;
  }
}

// TODO: Add spellcheck="false" to all contenteditable elements

function init() {
  var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  dom.output.issue.innerHTML = today;

  dom.output.buyer.name.setAttribute("contenteditable", true);
  dom.output.buyer.address1.setAttribute("contenteditable", true);
  dom.output.buyer.address2.setAttribute("contenteditable", true);
  dom.output.buyer.ico.setAttribute("contenteditable", true);
}

document.addEventListener("DOMContentLoaded", init);

fetch('./info.json')
  .then(response => response.json())
  .then(data => {
    dom.output.heading.innerHTML = data.heading;
    dom.output.supplier.name.innerHTML = data.name;
    dom.output.supplier.address1.innerHTML = data.address1;
    dom.output.supplier.address2.innerHTML = data.address2;
    dom.output.supplier.ico.innerHTML = data.ico;
    dom.output.bank.innerHTML = data.bank;
  })
  .catch(error => console.error(error));

// FIXME: Catch the formatting and clear it before pasting, current implementation kind of not works...

var ce = document.querySelector('[contenteditable]')
ce.addEventListener('paste', function (e) {
  e.preventDefault()
  var text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
})
function what(what: any, arg1: string): (this: HTMLInputElement, ev: KeyboardEvent) => any {
  throw new Error("Function not implemented.");
}

