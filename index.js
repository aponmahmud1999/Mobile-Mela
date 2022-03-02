const search =()=>{
    const text = document.getElementById('search-box');
    const url = `https://openapi.programming-hero.com/api/phones?search=${text.value.toLowerCase()}`
    fetch(url)
        .then(res => res.json())
        .then(data => showphones(data.data, text))
} 
const showphones =(phones,text)=>{
     const body = document.getElementById('cards')
     body.textContent = ''
     text.value = ''
     document.getElementById('details').textContent = ''
    if (phones.length == 0){
      alert('no result found')
    }
    
    const newp = phones.slice(0, 20)
    newp.forEach(phone => {
        const div = document.createElement('div')
        div.innerHTML = `<div class="card bg-primary p-2 text-dark bg-opacity-10">
    <img  src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
        <h5 class="card-title"><strong>${phone.phone_name}</strong></h5>
        <p class="card-text"><strong>Brand: ${phone.brand}</strong></p>
        <button type="button" class="btn btn-primary px-5 container"onclick="showdetailfetch('${phone.slug}')">See More</button>
    </div>
</div>` 
        body.appendChild(div)
    });
}
const showdetailfetch=key=>{
    const text = document.getElementById('search-box');
    console.log(key)
    const url = `https://openapi.programming-hero.com/api/phone/${key}`
    fetch(url)
        .then(res => res.json())
        .then(data => showdetail(data.data))
}

const showdetail=mobile=>{
    const div = document.createElement('div')
        div.innerHTML = `<div class="card bg-primary p-2 text-dark bg-opacity-10">
    <img  src="${mobile.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
        <h5 class="card-title"><strong>${mobile.phone_name}</strong></h5>
        <p class="card-text"><strong>Brand: ${mobile.brand}</strong></p>
    </div>
</div>` 
document.getElementById('details').appendChild(div)
}