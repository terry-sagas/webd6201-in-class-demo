(function () {
    function DisplayButton(){
        let randomButton = document.getElementById("randomButton")
        randomButton.addEventListener("click", function(){
            location.href = '/Week 2/webd6201-in-class-demo/projects.html'
        })
        

        let mainContent = document.getElementsByTagName("main")[0]
        mainContent.setAttribute("class", "container")
        
        // another way to access body
        documentBody = document.body

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript`
        mainParagraph.textContent = secondString

        /**
         * textContent - changes text node
         * innerHTML - overwrites anything in the innerHTML of that element
         */

        // add after(append)
        mainContent.appendChild(mainParagraph) 
        
        // add before (before)
        // mainContent.before(mainParagraph) 

        // delete element
        // document.getElementById("RandomButton").remove()

        // documentBody.innerHTML = `
        //     <div class="container">
        //         <h1 class="display-1">Hello WEBD6201</h1>
        //         <p class="mt-5 lead">and... what do you this of this method?</p>
        //     </div>
        // `
    
    }

    function Start() {
        console.log("App Started!")

        if (document.title === ''){

        }
        else{

        }

        switch(document.title){
            case "Home - WEBD6201 Demo":
                DisplayButton()
                break
            case "Projects - WEBD6201 Demo":
                DisplayButton()
                break
        
        }
    }
    
    window.addEventListener("load", Start)
})()