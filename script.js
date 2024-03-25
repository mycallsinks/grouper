
//get names  in arrays from  user input

// add + icon to th last student_details
//clone the.student list
//set input vales to the empty strnig

// $(document).ready(function () {
//     // Hide all the + buttons except the first one
//     $('.add_more_students:not(:first)').hide();

//     $('#students_list').on('click', '.add_more_students', function (e) {
//         e.preventDefault();
//         var newStudent = $('.list_of_students').first().clone();

//         newStudent.find('input').val('');
//         $('#students_list').append(newStudent);
//         // Hide all the + buttons again
//         $('.add_more_students').hide();
//         // Show the + button only for the last .list_of_students
//         $('#students_list .list_of_students:last .add_more_students').show();
//     });
// });




// debug this
$(document).ready(function () {
    // Hide all the + buttons except the first one
    $('.add_more_students:not(:first)').hide();

    $('#students_list').on('click', '.add_more_students', function (e) {
        e.preventDefault();

        // Check if all input fields are filled
        var inputsFilled = true;
        $('.list_of_students:last').find('input').not('#student_number').each(function() { // Exclude the "Student number" field
            if ($(this).val() === '') {
                inputsFilled = false;
                return false; // Exit the loop early if any input is empty
            }
        });
    



        if (!inputsFilled) {
            // Alert and return if inputs are not filled
            alert("Please fill in all fields before adding more students.");
            return 0; // Exit the function early if inputs are not filled
        }
            // If all input fields are filled, proceed to add more input fields
            var newStudent = $('.list_of_students').first().clone();
            newStudent.find('input').val('');
            $('#students_list').append(newStudent);
    

        // Hide all the + buttons again
        $('.add_more_students').hide();

        // Show the + button only for the last .list_of_students
        $('#students_list .list_of_students:last .add_more_students').show();
    });
});


//end debug this




// simply show the labes on the first .student_details then hide all the remaining ones except the first .student_details


$(document).ready(function () {


    $('#students_list').on('click', '.add_more_students', function (e) {
        e.preventDefault();
          // Show the labels only for the first .list_of_students
        $('.label_first_name').not(':first').hide();
        $('.label_student_number').not(':first').hide();
        $('.label_last_name').not(':first').hide();
      
        $('#students_list .list_of_students:first .label_first_name, #students_list .list_of_students:first .label_last_name, #students_list .list_of_students:first .label_student_number').show();
    });
});




// Function to gather all student details and push them into the array

const students = [];

testingFuncs = (link) => {
    // Get the parent <li> element of the clicked link
    let parentLi = link.closest('.list_of_students');

    // Find input fields within the parent <li>
    let firstName = parentLi.querySelector('.label_first_name + .form-control').value;
    let lastName = parentLi.querySelector('.label_last_name + .form-control').value;
    let studentNumber = parentLi.querySelector('.label_student_number + .form-control').value;

    // Add details to the array

    if(firstName !== '' || lastName !== '') {
        students.push({
            firstName: firstName,
            lastName: lastName,
            studentNumber: studentNumber
        });
    
    } 

    
    // Assign index after pushing the student object into the array
    let index = students.length - 1;
    students[index].index = index;

   

    //get generate button
    generateGroups();

    
    

}

// fixing monday bug ends here
// Function to generate groups


// gereated code


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// check if the number of groups are more than 1


// Function to generate groups
function generateGroups() {
    // studentObjects
    const studentsPerGroup = parseInt(document.getElementById('numberOfGroups').value);
    const numberOfGroups = Math.ceil(students.length / studentsPerGroup);
    const shuffledStudents = shuffleArray([...students]); // Create a copy of the students array and shuffle it

    // Clear previous groups
    document.getElementById('groupsContainer').innerHTML = '';

    // Divide students into groups
    for (let i = 0; i < numberOfGroups; i++) {
        const group = shuffledStudents.slice(i * studentsPerGroup, (i + 1) * studentsPerGroup);
        displayGroup(group, i + 1);
    }
}





// Initialize global counter for student numbering
let studentNumbering = 1;

// Function to display a group
function displayGroup(group, groupNumber) {
    const groupContainer = document.createElement('div');
    groupContainer.classList.add('group');
    groupContainer.innerHTML = `<h4>Group ${groupNumber}</h4>`;

    // Create title row
    const titleRow = document.createElement('div');
    titleRow.classList.add('title-row');
    titleRow.innerHTML = `<div class="title">First Name</div><div class="title">Last Name</div><div class="title">Student Number</div>`;
    groupContainer.appendChild(titleRow);

    // Iterate through each student in the group
    group.forEach(student => {
        const studentElement = document.createElement('div');
        const firstName = student.firstName || ''; // Check if firstName exists, otherwise use empty string
        const lastName = student.lastName || ''; // Check if lastName exists, otherwise use empty string
        const studentNum = student.studentNumber || ''; // Increment the student number and assign it
        studentElement.classList.add('student-row');
        studentElement.innerHTML = `<div class="cell">${firstName}</div><div class="cell">${lastName}</div><div class="cell">${studentNum}</div>`;
        groupContainer.appendChild(studentElement);
    });
    
    document.getElementById('groupsContainer').appendChild(groupContainer);
}




// Event listener for the "Generate" button
document.getElementById('generateGroups').addEventListener('click', generateGroups);



// excel sheet

function generateExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Group', 'First Name', 'Last Name', 'Student Number'] // Column headers
    ]);

    let rowNumber = 1; // Start with row 1

    // Iterate through each group
    document.querySelectorAll('.group').forEach((groupContainer, groupNumber) => {
        // Insert blank rows if it's not the first group
        if (groupNumber > 0) {
            XLSX.utils.sheet_add_aoa(worksheet, [
                ['', '', '', ''], // First blank row
                ['', '', '', '']  // Second blank row
            ], { origin: rowNumber });
            rowNumber += 2; // Increment row number by 2
        }
        
        // Iterate through each student row in the group
        groupContainer.querySelectorAll('.student-row').forEach(studentElement => {
            // Extract student information from the row
            const cells = studentElement.querySelectorAll('.cell');
            const firstName = cells[0].textContent.trim();
            const lastName = cells[1].textContent.trim();
            const studentNum = cells[2].textContent.trim();
            
            // Add student data to the worksheet
            XLSX.utils.sheet_add_aoa(worksheet, [
                [groupNumber + 1, firstName, lastName, studentNum] // Group number is the index + 1
            ], { origin: rowNumber });
            rowNumber++; // Increment row number
        });
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Groups');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'groups.xlsx');
}






document.getElementById('generateGroups').addEventListener('click', function() {
    // Show the download button
    document.getElementById('downloadExcel').style.display = 'block';
    document.getElementById('downloadPDF').style.display = 'block';
    // Call the function to generate groups
    generateGroups();
});

 

// Event listener for the download button
document.getElementById('downloadExcel').addEventListener('click', generateExcel);


// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

function generatePDF() {
    var { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Data for the table
    const data = [];
    
    // Add column headers
    const headers = ['Group', 'First Name', 'Last Name', 'Student Number'];
    data.push(headers);

    // Iterate through each group
    document.querySelectorAll('.group').forEach((groupContainer, groupNumber) => {
        // Insert blank rows if it's not the first group
        if (groupNumber > 0) {
            data.push(['', '', '', '']); // First blank row
            data.push(['', '', '', '']); // Second blank row
        }
        
        // Iterate through each student row in the group
        groupContainer.querySelectorAll('.student-row').forEach(studentElement => {
            // Extract student information from the row
            const cells = studentElement.querySelectorAll('.cell');
            const firstName = cells[0].textContent.trim();
            const lastName = cells[1].textContent.trim();
            const studentNum = cells[2].textContent.trim();

            // Add student data to the table
            data.push([(groupNumber + 1).toString(), firstName, lastName, studentNum]);
        });
    });

    // Create the PDF table
    doc.autoTable({
        head: [headers],
        body: data.slice(1), // Exclude headers from the body
        startY: 20 // Start the table below the headers
    });

    // Save the PDF and trigger download
    doc.save('groups.pdf');
}



// document.getElementById('downloadPDF').addEventListener('click', generatePDF);


document.getElementById('downloadPDF').addEventListener('click', generatePDF);