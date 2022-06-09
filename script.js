"use strict";
const date = new Date();
const dom = {
    input: {
        number: document.querySelectorAll("[data-input='number']")[0],
        due: document.querySelectorAll("#input > .due")[0]
    }
};
const template = {
    number: document.querySelectorAll("[data-invoice='number']")[0],
    heading: document.querySelectorAll("[data-invoice='heading']")[0],
    bank: document.querySelectorAll("[data-invoice='bank']")[0],
    variable: document.querySelectorAll("[data-invoice='variable']")[0],
    type: document.querySelectorAll("[data-invoice='type']")[0],
    due: document.querySelectorAll("[data-invoice='due']")[0],
    issue: document.querySelectorAll("[data-invoice='issue']")[0],
    supplier: {
        name: document.querySelectorAll("[data-invoice='supplier-name']")[0],
        address1: document.querySelectorAll("[data-invoice='supplier-address1']")[0],
        address2: document.querySelectorAll("[data-invoice='supplier-address2']")[0],
        ico: document.querySelectorAll("[data-invoice='supplier-ico']")[0]
    },
    buyer: {
        name: document.querySelectorAll("[data-invoice='buyer-name']")[0],
        address1: document.querySelectorAll("[data-invoice='buyer-address1']")[0],
        address2: document.querySelectorAll("[data-invoice='buyer-address2']")[0],
        ico: document.querySelectorAll("[data-invoice='buyer-ico']")[0]
    }
};
const invoice = {
    make: (what) => {
        switch (what) {
            case "number":
                let number = ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getFullYear()).slice(-2) + ("0000" + dom.input.number.value).slice(-4);
                template.number.innerHTML = "Faktura" + " " + number;
                template.variable.innerHTML = number;
                break;
            case "due":
                template.due.innerHTML = dom.input.due.value;
                break;
            case "bank":
                document.querySelectorAll(".bank").forEach(el => {
                    el.style.display = "block";
                });
                template.type.innerHTML = "bankovním převodem";
                break;
            case "cash":
                document.querySelectorAll(".bank").forEach(el => {
                    el.style.display = "none";
                });
                template.type.innerHTML = "hotově";
                break;
        }
    }
};
function make(what) {
    switch (what) {
        case "number":
            let number = ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getFullYear()).slice(-2) + ("0000" + dom.input.number.value).slice(-4);
            template.number.innerHTML = "Faktura" + " " + number;
            template.variable.innerHTML = number;
            break;
        case "due":
            template.due.innerHTML = dom.input.due.value;
            break;
        case "bank":
            document.querySelectorAll(".bank").forEach(el => {
                el.style.display = "block";
            });
            template.type.innerHTML = "bankovním převodem";
            break;
        case "cash":
            document.querySelectorAll(".bank").forEach(el => {
                el.style.display = "none";
            });
            template.type.innerHTML = "hotově";
            break;
    }
}
const local = {
    name: localStorage.getItem("name"),
    address1: localStorage.getItem("address1"),
    address2: localStorage.getItem("address2"),
    ico: localStorage.getItem("ico")
};
// TODO: Add spellcheck="false" to all contenteditable elements
function init() {
    var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    template.issue.innerHTML = today;
    if (local.name === null) {
        template.supplier.name.innerHTML = "DODAVATEL";
    }
    else {
        template.supplier.name.innerHTML = local.name;
    }
    if (local.address1 === null) {
        template.supplier.address1.innerHTML = "ADRESA 1";
    }
    else {
        template.supplier.address1.innerHTML = local.address1;
    }
    if (local.address2 === null) {
        template.supplier.address2.innerHTML = "ADRESA 2";
    }
    else {
        template.supplier.address2.innerHTML = local.address2;
    }
    if (local.ico === null) {
        template.supplier.ico.innerHTML = "IČO";
    }
    else {
        template.supplier.ico.innerHTML = local.ico;
    }
    template.supplier.name.setAttribute("contenteditable", "true");
    template.supplier.name.setAttribute("spellcheck", "false");
    template.supplier.address1.setAttribute("contenteditable", "true");
    template.supplier.address1.setAttribute("spellcheck", "false");
    template.supplier.address2.setAttribute("contenteditable", "true");
    template.supplier.address2.setAttribute("spellcheck", "false");
    template.supplier.ico.setAttribute("contenteditable", "true");
    template.supplier.ico.setAttribute("spellcheck", "false");
    template.buyer.name.setAttribute("contenteditable", "true");
    template.buyer.name.setAttribute("spellcheck", "false");
    template.buyer.address1.setAttribute("contenteditable", "true");
    template.buyer.address1.setAttribute("spellcheck", "false");
    template.buyer.address2.setAttribute("contenteditable", "true");
    template.buyer.address2.setAttribute("spellcheck", "false");
    template.buyer.ico.setAttribute("contenteditable", "true");
    template.buyer.ico.setAttribute("spellcheck", "false");
}
document.addEventListener("DOMContentLoaded", init);
/*
fetch('./info.json')
  .then(response => response.json())
  .then(data => {
    template.heading.innerHTML = data.heading;
    template.supplier.name.innerHTML = data.name;
    template.supplier.address1.innerHTML = data.address1;
    template.supplier.address2.innerHTML = data.address2;
    template.supplier.ico.innerHTML = data.ico;
    template.bank.innerHTML = data.bank;
  })
  .catch(error => console.error(error));
*/
// FIXME: Catch the formatting and clear it before pasting, current implementation kind of not works...
var ce = document.querySelector('[contenteditable]');
ce.addEventListener('paste', function (e) {
    e.preventDefault();
    var text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
});
function what(what, arg1) {
    throw new Error("Function not implemented.");
}
function getData() {
    var ico = document.getElementById("rejstrikoveico").value;
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var api = "http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi?ico=";
    var req = proxy + api + ico;
    return fetch(req)
        .then(response => response.text())
        .then(function (data) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/xml");
        /*
        console.log(doc.getElementsByTagName("D:OF")[0].innerHTML);
        console.log(doc.getElementsByTagName("D:UC")[0].innerHTML);
        console.log(doc.getElementsByTagName("D:PB")[0].innerHTML);
        console.log(doc.getElementsByTagName("D:ICO")[0].innerHTML);
        */
        template.buyer.name.innerHTML = doc.getElementsByTagName("D:OF")[0].innerHTML;
        template.buyer.address1.innerHTML = doc.getElementsByTagName("D:UC")[0].innerHTML;
        template.buyer.address2.innerHTML = doc.getElementsByTagName("D:PB")[0].innerHTML;
        template.buyer.ico.innerHTML = doc.getElementsByTagName("D:ICO")[0].innerHTML;
    });
}
;
template.supplier.name.addEventListener("keyup", function () {
    localStorage.setItem('name', template.supplier.name.innerHTML);
});
template.supplier.address1.addEventListener("keyup", function () {
    localStorage.setItem('address1', template.supplier.address1.innerHTML);
});
template.supplier.address2.addEventListener("keyup", function () {
    localStorage.setItem('address2', template.supplier.address2.innerHTML);
});
template.supplier.ico.addEventListener("keyup", function () {
    localStorage.setItem('ico', template.supplier.ico.innerHTML);
});
