const search =()=>{
    const text = document.getElementById('search-box');
    const url = `https://openapi.programming-hero.com/api/phones?search=${text.value.toLowerCase()}`
    fetch(url)
        .then(res => res.json())
        .then(data => showphones(data.data, text))
} 
const showphones =(mobiles,text)=>{
     const body = document.getElementById('cards')
     body.textContent = ''
     text.value = ''
     document.getElementById('details').textContent = ''
    if (mobiles.length == 0){
      alert('no phones')
    }
    
    const newp = mobiles.slice(0, 20)
    newp.forEach(phone => {
        const div = document.createElement('div')
        div.innerHTML = `<div class="card ">
    <img  src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
        <h5 class="card-title"><strong>${phone.phone_name}</strong></h5>
        <p class="card-text"><strong>Brand: ${phone.brand}</strong></p>
        <button type="button" class="btn btn-primary  container"onclick="showdetailfetch('${phone.slug}')">See More</button>
    </div>
</div>` 
        body.appendChild(div)
    });
}
const showdetailfetch=key=>{
    const text = document.getElementById('search-box');
  
    const url = `https://openapi.programming-hero.com/api/phone/${key}`
    fetch(url)
        .then(res => res.json())
        .then(data => showdetail(data.data))
}
const checkattributes=mobile=>{
    
    if(mobile.mainFeatures.memory==undefined||mobile.mainFeatures.memory=='')
    mobile.memory='unknown'
    if(mobile.releaseDate==undefined||mobile.releaseDate==='')
    mobile.releaseDate='unknown'
    if(mobile.mainFeatures.chipSet==undefined||mobile.mainFeatures.chipSet=='')
    mobile.mainFeatures.chipSet='unknown'
    if(mobile.others==undefined||mobile.others=='')
    mobile.others=''
}
const showdetail=mobile=>{
    document.getElementById('details').textContent=''
    const div = document.createElement('div')
    checkattributes(mobile)
    let txt = "";
    for (const [key, value] of Object.entries(mobile.others))
        txt+=`${key}: ${value}`;
        txt=txt||'unknown'
        div.innerHTML = `<div class="card bg-primary p-2 text-dark bg-opacity-10">
    <img  src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
    <h4 class="card-title"><strong>${mobile.name}</strong></h4>
        <p class="card-text"><strong>Brand: ${mobile.brand}</strong></p>
        <h5 class="card-title"><strong>Features</strong></h5>
        <p class="card-text"><strong>Memory: ${mobile.mainFeatures.memory}</strong></p>
        <p class="card-text"><strong>Chipset: ${mobile.mainFeatures.chipSet}</strong></p>
        <p class="card-text"><strong>Display Size: ${mobile.mainFeatures.displaySize}</strong></p>
        <p class="card-text"><strong>Release date: ${mobile.releaseDate}</strong></p>
        <p class="card-text"><strong>Sensors: ${mobile.mainFeatures.sensors}</strong></p>
        <p class="card-text"><strong>Others: ${txt}</strong></p>
    </div>
</div>` 
document.getElementById('details').appendChild(div)
}