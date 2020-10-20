if ('serviceWorker' in navigator) 
{
window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./sw.js')
        .then(registration => console.log('Sw Reg Registration',
        registration.scope))
    
    })    
}