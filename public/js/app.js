
const weatherForm=document.querySelector('form');
const weatherValue=document.querySelector('.weatherInput');
const messageOne=document.querySelector('#par1');
const messageTwo=document.querySelector('#par2');

messageOne.textContent='From Js'



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const locationValue= weatherValue.value;
        fetch('/weather?address='+locationValue).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    console.log(data.error); 
                    messageOne.textContent=data.error;
                    messageTwo.textContent='';
                    
                }else{
                    console.log(data);
                    
                    messageOne.textContent=data.location;
                    messageTwo.textContent=data.forecast;
        
                }
                
            })
        })
    console.log('working');
    
})