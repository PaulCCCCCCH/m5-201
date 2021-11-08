function Val(obj){
    document.getElementById('display').value += obj.id;
}

function Clear(){
    document.getElementById('display').value = null;
}

function Eval(){
    var result = eval(document.getElementById('display').value);
    document.getElementById('display').value += '=' + result;
}