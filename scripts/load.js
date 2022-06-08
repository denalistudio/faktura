function load(id, url) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                document.getElementById(id).innerHTML = xmlhttp.responseText;
                var allScripts = document.getElementById(id).getElementsByTagName('script');
                for (var n = 0; n < allScripts.length; n++) {
                    eval(allScripts[n].innerHTML)
                }
            }
            else {
                console.error('Error loading ' + url + ': ' + xmlhttp.statusText);
            }
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}