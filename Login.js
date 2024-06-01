document.getElementById("loginFrom").addEventListener("submit", (event) => {
    event.preventDefault()
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    const loginButton = document.querySelector("#button")

    const storedUsername = localStorage.getItem("username")
    const storedPassword = localStorage.getItem("password")

    loginButton.onclick = () => {
        console.log("login in")
        if (username.value === storedUsername && password.value === storedPassword){
            alert(`login selesai, welcome ${username.value}!`)
            window.location.href = "index1.html"
        } else {
            alert("Anda belum mempunyai akun")
        }
    }
})