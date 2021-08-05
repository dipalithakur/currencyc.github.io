
const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
// const API_KEY ="http://api.exchangeratesapi.io/v1/latest?access_key=c23ffa411bb28c19e9aa0b8cb95c70a0";

// gh http://api.exchangeratesapi.io/v1/latest?access_key=c23ffa411bb28c19e9aa0b8cb95c70a0

let html = '';
async function currency(){
    // const res = await fetch(API_KEY);
    // const data = await res.json();

    var requestURL = 'https://api.exchangerate.host/latest';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        data = request.response;
        console.log(data);
        const arrKeys = Object.keys(data.rates);
        const rates = data.rates;
        arrKeys.map(item =>{
            return html += `<option value=${item}>${item}</option>`;
        });
       
        for(let i=0;i<select.length;i++){
            select[i].innerHTML=html;
        };
        
        function convert(i,j){
            input[i].value = input[j].value * rates[select[i].value] /rates[select[j].value] ;
        }
       
        input[0].addEventListener('keyup', ()=> convert(1,0))    
    
        input[1].addEventListener('keyup', ()=> convert(0,1))
          
        select[0].addEventListener('change', ()=> convert(1,0))
            
        select[1].addEventListener('change', ()=> convert(0,1))
    }

};
currency();
