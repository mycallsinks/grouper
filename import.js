
// excel importing
// Event listener for file input change
document.getElementById('inputGroupFile02').addEventListener('change', function (e) {
    const file = e.target.files[0];
    processExcel(file);

    console.log(file)
});





// debugging




// Define the students array
// const students = [];

// Function to process the uploaded Excel file
function processExcel(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Remove the header row
        excelData.shift();

        // Convert data to objects and push into students array
        excelData.forEach(student => {
            students.push({
                firstName: student[0],
                lastName: student[1],
                studentNumber: student[2]
            });
        });

        // Display groups
        generateGroups();
    };
    reader.readAsArrayBuffer(file);
}
