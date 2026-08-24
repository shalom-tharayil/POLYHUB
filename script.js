/* ================================================= */
/* PROGRAM TEMPLATES */
/* ================================================= */

const programs = {

    "C": `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,

    "C++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`,

    "Java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

    "Python": `print("Hello, World!")`,

    "JavaScript": `console.log("Hello, World!");`,

    "Go": `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

    "Rust": `fn main() {
    println!("Hello, World!");
}`,

    "HTML": `<!DOCTYPE html>
<html>

<head>
    <title>My Page</title>
</head>

<body>

    <h1>Hello, World!</h1>

</body>

</html>`,

    "CSS": `body {
    background: black;
    color: white;
}

h1 {
    text-align: center;
}`,

    "PHP": `<?php

echo "Hello, World!";

?>`,

    "SQL": `CREATE TABLE students (
    id INT,
    name VARCHAR(100)
);

SELECT * FROM students;`,

    "MySQL": `CREATE DATABASE college;

USE college;

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);`,

    "PostgreSQL": `CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

SELECT * FROM students;`,

    "SQLite": `CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT
);

SELECT * FROM students;`,

    "Kotlin": `fun main() {
    println("Hello, World!")
}`,

    "Dart": `void main() {
    print("Hello, World!");
}`

};


/* ================================================= */
/* OPEN EDITOR */
/* ================================================= */

function openEditor(language) {

    const home =
        document.getElementById("homeScreen");

    const editor =
        document.getElementById("editorScreen");

    const editorLanguage =
        document.getElementById("editorLanguage");

    const codeEditor =
        document.getElementById("codeEditor");

    const output =
        document.getElementById("outputText");


    home.style.display = "none";

    editor.style.display = "flex";


    editorLanguage.textContent =
        language;


    codeEditor.value =
        programs[language] || "";


    output.textContent =
        "Ready to run...";

}


/* ================================================= */
/* GO HOME */
/* ================================================= */

function goHome() {

    const home =
        document.getElementById("homeScreen");

    const editor =
        document.getElementById("editorScreen");


    editor.style.display = "none";

    home.style.display = "block";

}


/* ================================================= */
/* RUN PROGRAM */
/* ================================================= */

function runProgram() {

    const language =
        document
        .getElementById("editorLanguage")
        .textContent;


    const code =
        document
        .getElementById("codeEditor")
        .value;


    const output =
        document
        .getElementById("outputText");


    /*
       JavaScript can run directly
       in the browser.

       C, C++, Java, Python, etc.
       will be connected to a compiler
       API in a later stage.
    */

    if (language === "JavaScript") {

        try {

            let result = "";

            const oldConsoleLog =
                console.log;


            console.log = function(message) {

                result +=
                    message + "\n";

            };


            eval(code);


            console.log =
                oldConsoleLog;


            output.textContent =
                result ||
                "Program finished.";

        }

        catch (error) {

            output.textContent =
                "Error:\n" +
                error.message;

        }

    }

    else {

        output.textContent =
            language +
            " compiler will be connected in the next stage.";

    }

}


/* ================================================= */
/* SEARCH */
/* ================================================= */

const searchBox =
    document.getElementById("searchBox");


searchBox.addEventListener(
    "input",
    function () {

        const search =
            this.value
            .toLowerCase()
            .trim();


        const cards =
            document.querySelectorAll(
                ".languageCard"
            );


        cards.forEach(function(card) {

            const name =
                card
                .dataset
                .name
                .toLowerCase();


            if (name.includes(search)) {

                card.style.display =
                    "flex";

            }

            else {

                card.style.display =
                    "none";

            }

        });

    }
);


/* ================================================= */
/* TAB SUPPORT */
/* ================================================= */

const codeEditor =
    document.getElementById("codeEditor");


codeEditor.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Tab") {

            event.preventDefault();


            const start =
                this.selectionStart;

            const end =
                this.selectionEnd;


            this.value =
                this.value.substring(
                    0,
                    start
                ) +
                "    " +
                this.value.substring(
                    end
                );


            this.selectionStart =
                this.selectionEnd =
                start + 4;

        }

    }
);
