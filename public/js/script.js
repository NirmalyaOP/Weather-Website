const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")
const messageFour = document.querySelector("#message-4")
const messageFive = document.querySelector("#message-5")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""
    
    fetch('/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
        console.log("hello")
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = "Sky: "+data.forecast.desc
            messageThree.textContent = "Actual Temperature: "+data.forecast.temp+" degrees(in C)"
            messageFour.textContent = "Feels like: "+data.forecast.feels+" degrees(in C)"
            messageFive.textContent = "Humidity: "+data.forecast.humidity+"%"
        }
    })
})
})