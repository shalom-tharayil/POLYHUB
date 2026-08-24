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
/* CURRENT LANGUAGE */
/* ================================================= */

let currentLanguage = "";

let editor = null;


/* ================================================= */
/* FILE EXTENSIONS */
/* ================================================= */


const fileNames = {

    "C": "main.c",
    "C++": "main.cpp",
    "Java": "Main.java",
    "Python": "main.py",
    "JavaScript": "main.js",
    "Go": "main.go",
    "Rust": "main.rs",

    "HTML": "index.html",
    "CSS": "style.css",
    "PHP": "index.php",

    "SQL": "query.sql",
    "MySQL": "query.sql",
    "PostgreSQL": "query.sql",
    "SQLite": "query.sql",

    "Kotlin": "Main.kt",
    "Dart": "main.dart"

};

/* ================================================= */
/* CODEMIRROR MODE */
/* ================================================= */

function getMode(language) {

    switch (language) {

        case "Python":
            return "python";

        case "JavaScript":
            return "javascript";

        case "HTML":
            return "xml";

        case "CSS":
            return "css";

        case "SQL":
        case "MySQL":
        case "PostgreSQL":
        case "SQLite":
            return "sql";

        case "C":
        case "C++":
        case "Java":
        case "Kotlin":
            return "text/x-csrc";

        default:
            return "text/plain";
    }

}


/* ================================================= */
/* OPEN EDITOR */
/* ================================================= */

function openEditor(language) {

    currentLanguage = language;


    document.getElementById(
        "homeScreen"
    ).style.display = "none";


    document.getElementById(
        "editorScreen"
    ).style.display = "flex";


    document.getElementById(
        "editorLanguage"
    ).textContent = language;


    document.getElementById("fileName").textContent =
    fileNames[language] || "main.code";


    document.getElementById(
        "outputText"
    ).textContent =
        "Ready to run...";


    if (editor) {

        editor.toTextArea();

    }


    const textarea =
        document.getElementById(
            "codeEditor"
        );


    textarea.value =
        programs[language] || "";


    editor = CodeMirror.fromTextArea(
        textarea,
        {
            theme: "dracula",

            lineNumbers: true,

            mode: getMode(language),

            indentUnit: 4,

            tabSize: 4,

            lineWrapping: false,

            autofocus: true
        }
    );

}


/* ================================================= */
/* GO HOME */
/* ================================================= */

function goHome() {

    document.getElementById(
        "editorScreen"
    ).style.display = "none";


    document.getElementById(
        "homeScreen"
    ).style.display = "block";


    if (editor) {

        editor.toTextArea();

        editor = null;

    }

}


/* ================================================= */
/* RUN PROGRAM */
/* ================================================= */

function runProgram() {

    if (!editor) {
        return;
    }


    const code =
        editor.getValue();


    const output =
        document.getElementById(
            "outputText"
        );


    /*
       At this stage only JavaScript
       can actually execute locally.

       Other languages will be connected
       to a real compiler API later.
    */


    if (currentLanguage === "JavaScript") {

        try {

            let result = "";


            const oldLog =
                console.log;


            console.log = function(message) {

                result +=
                    message + "\n";

            };


            eval(code);


            console.log =
                oldLog;


            output.textContent =
                result ||
                "Program finished successfully.";

        }

        catch (error) {

            output.textContent =
                "Error:\n" +
                error.message;

        }

    }

    else {

        output.textContent =
            currentLanguage +
            " compiler is not connected yet.\n\n" +
            "The next stage will connect PolyCode to a real compiler.";

    }

}


/* ================================================= */
/* CLEAR CODE */
/* ================================================= */

function clearCode() {

    if (editor) {

        editor.setValue("");

    }

}


/* ================================================= */
/* CLEAR OUTPUT */
/* ================================================= */

function clearOutput() {

    document.getElementById(
        "outputText"
    ).textContent = "";

}


/* ================================================= */
/* SAVE CODE */
/* ================================================= */

function saveCode() {

    if (!editor) {
        return;
    }


    const code =
        editor.getValue();


    const extension =
        extensions[currentLanguage] ||
        "txt";


    const filename =
        "main." + extension;


    const blob =
        new Blob(
            [code],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        filename;


    link.click();


    URL.revokeObjectURL(url);

}


/* ================================================= */
/* SEARCH */
/* ================================================= */

document
.getElementById("searchBox")
.addEventListener(
    "input",
    function() {

        const search =
            this.value
            .toLowerCase()
            .trim();


        const cards =
            document.querySelectorAll(
                ".languageCard"
            );


        cards.forEach(
            function(card) {

                const name =
                    card.dataset
                    .name
                    .toLowerCase();


                if (
                    name.includes(search)
                ) {

                    card.style.display =
                        "flex";

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


/* ================================================= */
/* EDITOR MENU */
/* ================================================= */

function showEditorMenu() {

    alert(
        "More editor features will be added here."
    );

}



