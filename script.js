let date="latest"
let base = "RUB"
let exchangelist= []
let obj;
let ApiCall
let url = urll()
ApiCall = fetchh(url)
let promise = ApiCall
obj = {name: url,value: ApiCall}

function Hello (){
    promise.then(data => {for (let key in data.rates){
        let element = document.createElement('OPTION');
        let element2 = document.createElement('OPTION');

        element.innerHTML = key;
        element.value = data.rates[key];
        element2.innerHTML= key;
        element2.value = data.rates[key];

        if (key == base){
            element.selected = true;
        }
        document.getElementById('select1').appendChild(element);
        document.getElementById('select2').appendChild(element2);
        }
    })
    document.getElementById('date').addEventListener('change',() =>{ date = document.getElementById('date').value;getBase()} )
}
function fetchh(url){
    console.log('2')
    for(let i = 0; i< exchangelist.length;i++){
        console.log(exchangelist[i].name);
        if (exchangelist[i].name == url){
            ApiCall = exchangelist[i].value
            console.log(exchangelist[i].value)
            return ApiCall;

        }
    }
    ApiCall = fetch(url).then(data => data.json());
    obj= {name: url, value: ApiCall };
    exchangelist.push(obj);
    return ApiCall;
    
}
function relatedvalues(){
    let dizzy = document.getElementById('select2')

    promise.then(data => 
    {
        for (let key in data.rates)
        {
            for (let i = 0; i <  dizzy.options.length; i++){
                if (dizzy.options[i].text == key){
                dizzy.options[i].value = data.rates[key]
                }
                else if (dizzy.options[i].text == base){
                    dizzy.options[i].value = 1
                }
            }
        }
    })
}
function exchange(){
    let exchangedval = document.getElementById('select2').value
    let amountt = document.getElementById('am').value

    document.getElementById('test').innerHTML = exchangedval * amountt;
}

function getBase(){
    index =document.getElementById("select1").selectedIndex
    base = document.getElementById("select1").options[index].text

    url = urll()
    ApiCall = fetchh(url);
    promise = ApiCall

    relatedvalues()
}

function urll(){
    return "https://api.exchangeratesapi.io/"+date+"?base=" + base
}
function geoLocation(){
    
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getcountry)
    }
}
function getcountry(pos){
    const key ="fd683edb52dd1e3e043c3cb63e8af8ad" 
    let weat = 'https://api.openweathermap.org/data/2.5/weather?lat='+pos.coords.latitude+'&lon='+pos.coords.longitude+'&appid='+key

    let countryCall = fetch(weat);
    let country = "fuck";
    countryCall.then(data => data.json()).then(data =>{
        country = data.sys.country
        console.log('jello')
        weat = 'https://restcountries.eu/rest/v2/alpha/'+ country
        countryCall =fetch(weat)
        prom = countryCall.then(data => data.json()).then(data => base = data.currencies[0].code).then(()=>{
            promise=fetchh(urll())
            for (i = 0 ; i< document.getElementById('select1').length;i++){
                
                if(document.getElementById('select1').options[i].text == base)
                {
                    document.getElementById('select1').options[i].selected = true;
                    break;
                }
            }
            relatedvalues()
        })
    })
        

}