var electron = require('electron');
var querystring = require('querystring');
var poster = require('./poster');

var {ipcRenderer} = electron;

var insertBtn = document.getElementById('insert-patient');
var form = document.getElementById('insert-patient-form');

insertBtn.addEventListener('click', function (event)
{
    event.preventDefault();
    var fDocName = form[0].value;
    var fParamVal = form[1].value;
    if (fDocName == '')
    {
        console.log('Must enter a doctor\'s name');
        return;
    }
    if (fParamVal == '')
    {
        console.log('Param is not a valid number!');
        return;
    }

    //Time to POST!! Woo!!
    var postobj = {
        doctor: fDocName,
        param: fParamVal
    };
    //console.log('Posting \'' + postobj + '\'');
    poster.post(postobj, '/insert/patient', InsertCallback);
});

function InsertCallback (res)
{
    //console.log('Status: ' + res.statusCode);
    //console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
        //console.log('Body: ' + body);
        var resDiv = document.getElementById('insert-patient-response');
        resDiv.innerHTML = body;
    });
}