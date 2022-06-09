"use strict";
const date = new Date();
var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
const dom = {
    input: {
        number: document.querySelectorAll("[data-input='number']")[0],
        due: document.querySelectorAll("#input > .due")[0],
        issue: document.querySelector("[data-input='issue']")
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
// TODO: Make better date formats
// TODO: Convert this shit to event listeners
const invoice = {
    make: (what) => {
        switch (what) {
            case "number":
                storage.number = ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getFullYear()).slice(-2) + ("0000" + dom.input.number.value).slice(-4);
                break;
            case "due":
                storage.due = dom.input.due.value;
                break;
            case "issue":
                storage.issue = dom.input.issue.value;
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
        refreshLabels();
    }
};
var storage = {
    number: "12345678",
    issue: "",
    due: "",
    supplier: {
        name: "DODAVATEL",
        address1: "ADRESA 1",
        address2: "ADRESA 2",
        ico: "IČO"
    },
    buyer: {
        name: "ODBĚRATEL",
        address1: "ADRESA 1",
        address2: "ADRESA 2",
        ico: "IČO"
    }
};
const local = {
    name: localStorage.getItem("name"),
    address1: localStorage.getItem("address1"),
    address2: localStorage.getItem("address2"),
    ico: localStorage.getItem("ico")
};
function init() {
    storage.issue = today;
    // Check localstorage for data
    if (local.name === null) { }
    else {
        storage.supplier.name = local.name;
    }
    if (local.address1 === null) { }
    else {
        storage.supplier.address1 = local.address1;
    }
    if (local.address2 === null) { }
    else {
        storage.supplier.address2 = local.address2;
    }
    if (local.ico === null) { }
    else {
        storage.supplier.ico = local.ico;
    }
    // Set elements to contenteditable="true" and spellcheck="false"
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
    refreshLabels();
}
document.addEventListener("DOMContentLoaded", init);
function refreshLabels() {
    template.number.innerHTML = storage.number;
    template.variable.innerHTML = storage.number;
    template.due.innerHTML = storage.due;
    template.issue.innerHTML = storage.issue;
    template.supplier.name.innerHTML = storage.supplier.name;
    template.supplier.address1.innerHTML = storage.supplier.address1;
    template.supplier.address2.innerHTML = storage.supplier.address2;
    template.supplier.ico.innerHTML = storage.supplier.ico;
    template.buyer.name.innerHTML = storage.buyer.name;
    template.buyer.address1.innerHTML = storage.buyer.address1;
    template.buyer.address2.innerHTML = storage.buyer.address2;
    template.buyer.ico.innerHTML = storage.buyer.ico;
    //FIXME: This qr system is just disgusting
    document.getElementById("qr").innerHTML = "";
    var qr = "SPD*1.0*ACC:" + "account" + "*AM:" + "amount" + "*CC:" + "currency" + "*MSG:" + "message" + "*X-VS:" + storage.number;
    new QRCode(document.getElementById("qr"), qr);
}
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
        let doc = new DOMParser().parseFromString(data, "text/xml");
        storage.buyer.name = doc.getElementsByTagName("D:OF")[0].innerHTML;
        storage.buyer.ico = doc.getElementsByTagName("D:ICO")[0].innerHTML;
        /*
        if (doc.getElementsByTagName("D:CO") === undefined) {
          template.buyer.address1.innerHTML = doc.getElementsByTagName("D:UC")[0].innerHTML;
          template.buyer.address2.innerHTML = doc.getElementsByTagName("D:PB")[0].innerHTML;
        }
        else {
          template.buyer.address1.innerHTML = doc.getElementsByTagName("D:UC")[0].innerHTML + "/" + doc.getElementsByTagName("D:CO")[0].innerHTML;
          template.buyer.address2.innerHTML = doc.getElementsByTagName("D:PB")[0].innerHTML;
        }
        */
        storage.buyer.address1 = doc.getElementsByTagName("D:UC")[0].innerHTML + "/" + doc.getElementsByTagName("D:CO")[0].innerHTML;
        storage.buyer.address2 = doc.getElementsByTagName("D:PB")[0].innerHTML;
        refreshLabels();
    });
}
;
function registr() {
    var part1 = "https://www.rzp.cz/cgi-bin/aps_cacheWEB.sh?VSS_SERV=ZVWSBJFND&PRESVYBER=0&VYPIS=2&ICO=";
    var ico = document.getElementById("rejstrikoveico").value;
    var part2 = "&Action=Search";
    window.open(part1 + ico + part2, "_blank");
}
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
/*
new QRCode(document.getElementById("qr"), "SPD*1.0*ACC:CZ2806000000000168540115*AM:450.00*CC:CZK*MSG:PLATBA ZA ZBOZI*X-VS:1234567890");
*/ 
