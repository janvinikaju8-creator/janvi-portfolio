
const gradeForm = document.getElementById("grade-form");
const resultSection = document.getElementById("result");

gradeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const subjectInputs = [
        document.getElementById("subject1"),
        document.getElementById("subject2"),
        document.getElementById("subject3"),
        document.getElementById("subject4"),
        document.getElementById("subject5")
    ];

    const marks = subjectInputs.map(function (input) {
        return Number(input.value);
    });

    const hasInvalidMarks = subjectInputs.some(function (input) {
        return input.value.trim() === "" ||
            !Number.isFinite(Number(input.value)) ||
            Number(input.value) < 0 ||
            Number(input.value) > 100;
    });

    if (hasInvalidMarks) {
        alert("Please enter marks between 0 and 100 for every subject.");
        return;
    }

    const total = marks.reduce(function (sum, mark) {
        return sum + mark;
    }, 0);

    const percentage = total / marks.length;

    let grade;

    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    document.getElementById("total").textContent =
        "Total Marks: " + total + " / 500";

    document.getElementById("percentage").textContent =
        "Percentage: " + percentage.toFixed(2) + "%";

    document.getElementById("grade").textContent =
        "Grade: " + grade;

    resultSection.hidden = false;
});
