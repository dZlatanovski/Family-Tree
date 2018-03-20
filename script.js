$(function () {
    class Person {
        constructor(name, surname, age, gender) {
            Object.assign(this, { name, surname, age, gender });
        }
    }

    class FamilyRole extends Person {
        constructor(name, surname, age, gender, role) {
            super(name, surname, age, gender);
            this.role = role;
        }
    }

    class Look extends FamilyRole {
        constructor(name, surname, age, gender, role, height, weight, eyeColor, hairColor) {
            super(name, surname, age, gender, role);
            Object.assign(this, { height, weight, eyeColor, hairColor });
        }
    }

    class Info extends Look {
        constructor(name, surname, age, gender, role, height, weight, eyeColor, hairColor) {
            super(name, surname, age, gender, role, height, weight, eyeColor, hairColor);
            this.familyMembers = [];
            this.addFamilyMember = function (familyMember) {
                this.familyMembers.push(familyMember);
            }
            this.showFamily = function () {
                this.familyMembers.forEach(function (member) {
                    console.log(member);
                });
            }
        }
    }

    var ListOfInfos = new function(){
        this.list = [];
        this.addInfoToList = function(person){
            this.list.push(person);
        }
        this.getInfoFromList = function(index){
            return this.list[index];
        }
    }

    var index = 0;

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function validateInput(inputArray){
        var format = /[ 1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


        //Input Validation
        for (let i = 0; i < inputArray.length; i++) {
            let inputIsInvalid = false;
            if (inputArray[i].value == "") {
                alert("Please fill out all the fields.")
                inputIsInvalid = true;
                return inputIsInvalid;
            }
            switch (i) {
                case 0:
                    if (inputArray[i].value.match(format)) {
                        alert("Please enter a valid name.");
                        $("#name").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
                case 1:
                    if (inputArray[i].value.match(format)) {
                        alert("Please enter a valid surname.");
                        $("#surname").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
                case 2:
                    if (isNaN(inputArray[i].value) || parseInt(inputArray[i].value) > 122 || parseInt(inputArray[i].value) < 4) {
                        alert("Please enter a valid age.");
                        $("#age").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
                case 5:
                    if (isNaN(inputArray[i].value) || parseInt(inputArray[i].value) > 272 || parseInt(inputArray[i].value) < 48) {
                        alert("Please enter a valid height.");
                        $("#height").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
                case 6:
                    if (isNaN(inputArray[i].value) || parseInt(inputArray[i].value) > 595 || parseInt(inputArray[i].value) < 12) {
                        alert("Please enter a valid weight.");
                        $("#weight").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
                case 8:
                    if (inputArray[i].value.match(format)) {
                        alert("Please enter a valid hair color.");
                        $("#hairColor").val("");
                        inputIsInvalid = true;
                        break;
                    } else
                        break;
            }
            if (inputIsInvalid) {
                return inputIsInvalid;
            }
        }
    }

    //submit button logic
    $(".submitButton").on("click", function (event) {
        event.preventDefault();
        $(this).blur();
        

        let inputArray = $("#newPersonForm").serializeArray();
     
        let inputIsInvalid = validateInput(inputArray);
        if(inputIsInvalid)
            return;

        $("#newPersonForm").trigger("reset");

        var person = new Info(
            inputArray[0].value, inputArray[1].value, inputArray[2].value, inputArray[3].value, inputArray[4].value,
            inputArray[5].value, inputArray[6].value, inputArray[7].value, inputArray[8].value
        )

        ListOfInfos.addInfoToList(person);     

        let personDiv = $("<div/>");
        
        if(index == 0){
            personDiv.attr("class", "firstPersonDiv familyMembersDiv");
        } else{
            personDiv.attr("class", "familyMembersDiv");
        }

        let h2 = $(`<h2>${person.name.capitalize() + " " + person.surname.capitalize()}</h2>`).appendTo(personDiv);

        let personInfoRow = $(`<div id="${`infoDiv-` + index}"></div>`).attr("class", "row");
        let personInfoCol = $("<div class='col-12'></div>");
        let personInfoUl = $("<ul/>");
        let membersDiv = $("<div/>")

        personInfoUl.append(
            $(`<li>${"Age: " + person.age}</li>`),
            $(`<li>${"Gender: " + person.gender.capitalize()}</li>`),
            $(`<li>${"Family role: " + person.role.capitalize()}</li>`),
            $(`<li>${"Height: " + person.height + "cm"}</li>`),
            $(`<li>${"Weight: " + person.weight + "kg"}</li>`),
            $(`<li>${"Eye color: " + person.eyeColor.capitalize()}</li>`),
            $(`<li>${"Hair color: " + person.hairColor.capitalize()}</li>`) 
        )
        personInfoUl.appendTo(personDiv);
        personInfoCol.append(personDiv, membersDiv).appendTo(personInfoRow);
        personInfoCol.append($("<hr>"));        
        $("#mainContainer").append(personInfoRow);    
        
        let personButtonDiv = $(`<div/>`);
        personButtonDiv.append(
            $(`<input type="button" value="Expand Family" class="special btn btn-primary btn-sm" id="expandFamilyBtn-${index}">`),
            $(`<button type="button" class="btn btn-primary btn-sm" id="addFMemberBtn-${index}">Add Family Member</button>`)            
        );
        $("#mainContainer").append(personButtonDiv);

        //Expand Family button logic
        $(`#expandFamilyBtn-${index}`).on("click", function(event){
            event.preventDefault();
            let thisIdIndex = this.id.slice(16, this.id.length);
            $(this).blur();

            if($(this).val() == "Expand Family")
                $(`.familyMembersUl-${thisIdIndex}`).remove();

            if(person.familyMembers.length != 0){
                for(let i = 0; i < person.familyMembers.length; i++){
                    var familyMembersDiv = $(`<div class='familyMembersUl-${thisIdIndex} familyMembersDiv'></div>`);
                    var familyMembersUl = $(`<ul></ul>`);
                    familyMembersUl.append(
                        $(`<li>${"Age: " + person.familyMembers[i].age}</li>`),
                        $(`<li>${"Gender: " + person.familyMembers[i].gender.capitalize()}</li>`),
                        $(`<li>${"Family role: " + person.familyMembers[i].role.capitalize()}</li>`),
                        $(`<li>${"Height: " + person.familyMembers[i].height + "cm"}</li>`),
                        $(`<li>${"Weight: " + person.familyMembers[i].weight + "kg"}</li>`),
                        $(`<li>${"Eye color: " + person.familyMembers[i].eyeColor.capitalize()}</li>`),
                        $(`<li>${"Hair color: " + person.familyMembers[i].hairColor.capitalize()}</li>`)                  
                    )
                    familyMembersDiv.append(
                        $(`<h4>${person.familyMembers[i].name.capitalize() + " " + person.familyMembers[i].surname.capitalize()}</h4>`)
                    )
                    familyMembersDiv.append(familyMembersUl);
                    familyMembersDiv.appendTo(membersDiv);
                }
                
                if($(this).val() == "Expand Family"){
                    $(this).val("Hide Family");
                } else{
                    $(this).val("Expand Family");
                    $(`.familyMembersUl-${thisIdIndex}`).addClass("hide");     
                }
            } else{
                if($(this).val() == "Expand Family"){
                    $(this).val("Hide Family");
                } else{
                    $(this).val("Expand Family");    
                }
            }        
        });
        //Add Family Member button logic
        $(`#addFMemberBtn-${index}`).on("click", function(event){
            event.preventDefault();
            $(this).blur();

            //check if the addFMemberBtn is already pressed
            let checkBtn = $(".submitButtonFMember").val();
            if(checkBtn == "Submit")
                return;
    
            let thisId = this.id;            
            
            $("h1").html("Enter member info");
            $(`.familyMembersUl-${parseInt(thisId.slice(14, thisId.length))}`).remove();
            $(`#expandFamilyBtn-${parseInt(thisId.slice(14, thisId.length))}`).val("Expand Family");
        
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $(".submitButtonPerson").addClass("hide");
            $(".submitButtonPerson").prop("disabled", true);            
            $(".submitCol").prepend(
                $('<input type="submit" class="submitButton submitButtonFMember btn btn-primary btn-lg btn-block" value="Submit">')
            )
            $(".submitButtonFMember").on("click", function(event){
                event.preventDefault();
                $(this).blur();

                let inputArray = $("#newPersonForm").serializeArray();
            
                let inputIsInvalid = validateInput(inputArray);
                if(inputIsInvalid)
                    return;

                $("#newPersonForm").trigger("reset");
        
                let positionOfPersonInList = parseInt(thisId.slice(14, thisId.length));

                var member = new Info(
                    inputArray[0].value, inputArray[1].value, inputArray[2].value, inputArray[3].value, inputArray[4].value,
                    inputArray[5].value, inputArray[6].value, inputArray[7].value, inputArray[8].value
                )

                let currentPerson = ListOfInfos.list[positionOfPersonInList].addFamilyMember(member);

                $(this).remove();
                $(".submitButtonPerson").removeClass("hide");
                $(".submitButtonPerson").prop("disabled", false);
                $("h1").html("Enter person info")                                   
            })
        })
        index++;
    });
});