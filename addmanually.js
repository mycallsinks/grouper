
    // Get the input elements
    const firstNameInput = document.getElementById('first_name');
    const lastNameInput = document.getElementById('last_name');
    const studentNumberInput = document.getElementById('student_number');
    const addButton = document.getElementById('add_student');


    // Add event listeners for the Enter key press
    firstNameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            lastNameInput.focus();
        }
    });

    lastNameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            studentNumberInput.focus();
        } else if (e.key === 'ArrowRight') { // Check for arrow key press
            e.preventDefault();
            studentNumberInput.focus();
        }
    });

    // Add event listener for the forward arrow key press on the last name input
    firstNameInput.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            lastNameInput.focus();
        }
    });
    lastNameInput.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            studentNumberInput.focus();
        }
    });



    studentNumberInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Call the function associated with the "++" link
            testingFuncs(addButton);

            console.log('bug here')
        }
    });

