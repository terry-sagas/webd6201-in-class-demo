(function () {
    function DisplayNavBar(){
        // ajax
        let XHR = new XMLHttpRequest()


        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200){
                $('#navagationBar').html(XHR.responseText)
            }
        })
        XHR.open("GET", "./static/header.html")

        XHR.send()
    }

    function DisplayHome() {
        $("#RandomButton").on("click", function() {
            location.href = 'contact.html'
        })

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript and this is also on GitHub Pages`

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${ secondString }</p>`)
        

    }

    function DisplayProjects() {
        console.log("Projects Page")
    }

    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now()
            localStorage.setItem(key, contact.serialize())
        }
    }


    function ValidateInput(inputFieldID, regularExpression, exception){
        let messageArea = $('#messageArea').hide()

        
        $('#' + inputFieldID).on("blur", function(){
            let inputText = $(this).val()

            if (!regularExpression.test(inputText)){
                $(this).trigger("focus")
                $(this).trigger("select")

                messageArea.addClass("alert alert-danger")
                messageArea.text(exception)
                messageArea.show()
            } else {
                messageArea.removeAttr("class")
                messageArea.hide()

            }
        })
    }

    function ContactFormValidate(){
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*$/g
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][\D]{1,10}$/g
        var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        ValidateInput("fullName", fullNamePattern, "please enter a valid full name which means a capitalized first name and capitalized last name")
        ValidateInput("emailAddress", emailAddressPattern, "please enter a valid email: xxx@xxx.xxx")
        ValidateInput("contactNumber", phoneNumberPattern, "please enter a valid phone number")

    }

    function DisplayContacts() {
        console.log("Contact Us Page")

        ContactFormValidate()

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")
        // localStorage Example
        // localStorage.setItem("Random Variable", "random variable for testing and demonstration")
        // console.log(localStorage.getItem("Random Variable"))
        // localStorage.removeItem("Random Variable")

        submitButton.addEventListener("click", function() {
            if (subscribeCheckbox.checked) {
                // If user subscribes, store the contact in localStorage
                AddContact(fullName.value, contactNumber.value, emailAddress.value)
            }
        })
    }

    function DisplayContactList() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") // Our contact list in the table of the contact-list page

            let data = "" // Add data to this variable. Append deserialized data from localStorage to data
            let keys = Object.keys(localStorage) // Return a String Array of keys

            let index = 1 // Count number of keys

            // for every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) // Get localStorage data value related to the key
                let contact = new core.Contact()
                
                contact.deserialize(contactData)

                // Inject repeatable row into the contactList
                data += `<tr>
                    <th scope="row" class="text-center">${ index }</th>
                    <td class="text-center">${ contact.Name }</td>
                    <td class="text-center">${ contact.ContactNumber }</td>
                    <td class="text-center">${ contact.EmailAddress }</td>
                    <td class="text-center"><button value="${ key }" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${ key }" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `
                
                index++
            }

            contactList.innerHTML = data

            $("button.delete").on("click", function() {
                if (confirm("Are you sure you want to delete this?"))
                    localStorage.removeItem($(this).val())

                location.href = 'contact-list.html'
            })

            $("button.edit").on("click", function() {
                location.href = 'edit.html#' + $(this).val()
            })
        }

        $("#addButton").on("click", () => {
            location.href = 'edit.html#Add'
        })
    }

    function DisplayEditPage() {
        ContactFormValidate()
        let page = location.hash.substring(1)

        switch(page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get form information (name, contact number, email address)
                        AddContact(fullName.value, contactNumber.value, emailAddress.value)

                        // redirect to contact-list
                        location.href = 'contact-list.html'
                    })
                }
                break
            default:
                {
                    // get contact info from localStorage
                    let contact = new core.Contact()
                    contact.deserialize(localStorage.getItem(page))

                    // display contact info in edit form
                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    // when edit button is pressed, update the contact
                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get all changes from the form
                        contact.Name = $("#fullName").val()
                        contact.ContactNumber = $("#contactNumber").val()
                        contact.EmailAddress = $("#emailAddress").val()

                        // replace the changes in localStorage
                        localStorage.setItem(page, contact.serialize())

                        // go back to contact-list.html
                        location.href = 'contact-list.html'
                    })
                }
                break
        }
    }

    function DisplayLoginPage() {
        console.log("Login Page")
    }
    function DisplayReferences() {
        console.log("References Page")
    }
    function DisplayRegistrationPage() {
        console.log("Registration Page")
    }
    
    function Start() {
        console.log("App Started Successfully!")
        

        switch (document.title) {
            case "Home - WEBD6201 Demo":
                DisplayHome()
                DisplayNavBar()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                DisplayNavBar()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
            case "Edit - WEBD6201 Demo":
                DisplayEditPage()
                break
            case "Login - WEBD6201 Demo":
                DisplayLoginPage()
                break
            case "Register - WEBD6201 Demo":
                DisplayReferences()
                break
        }
    }

    window.addEventListener("load", Start)
})()