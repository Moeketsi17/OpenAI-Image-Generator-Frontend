function onSubmit(e) {
    e.preventDefault();

    document.querySelector(".msg").textContent = "";
    document.querySelector("#image").src = "";

    const prompt = document.querySelector("#prompt").value;
    const size = document.querySelector("#size").value;

    if (prompt === ""){
        alert("Please add a prompt");
        return
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size){
    try {
        showSpinner()
        const response = await fetch("https://openai-image-generator-api-o0a5.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error("Image could not be generated");
        }
        const data = await response.json();
        // console.log(data)
        const imageUrl = data.data;

        document.querySelector("#image").src = imageUrl;

        removeSpinner();
        
    } catch (error){
        document.querySelector(".msg").textContent = error;
    }
}

function showSpinner(){
    document.querySelector(".spinner").classList.add("show");
}

function removeSpinner(){
    document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);