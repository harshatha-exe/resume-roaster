const roastBtn = document.getElementById('roastBtn');
const resumeInput = document.getElementById('resumeInput');
const roastOutput = document.getElementById('roastOutput');

// Define roast rules
const rules = [
    {
        keywords: ["hardworking"],
        messages: [
            "Ah yes, 'hardworking'. Original and not at all cliché."
        ]
    },
    {
        keywords: ["team"],
        messages: [
            "Team player detected. The squad thanks you… maybe."
        ]
    },
    {
        keywords: ["responsible"],
        messages: [
            "'Responsible'… wow, bold strategy, let’s see it pay off."
        ]
    },
    {
        keywords: ["worked"],
        messages: [
            "You 'worked' on stuff? Are you sure it *was* you, though?"
        ]
    },
    {
        keywords: ["helped", "assisted"],
        messages: [
            "'{keyword}'… really showing your impact here, genius."
        ]
    },
    /*
    {
        keywords: ["Python", "Java", "C++", "SQL", "C", "HTML", "CSS"],
        messages: [
            "Skill detected: {keyword}. Hope you can actually use it, without AI to correct your pathetic syntax errors.",
            "Oh, {keyword}? Fancy seeing that on your resume."
        ]
    },
    */
    {
        keywords: ["projects"],
        messages: [
            "Projects? Let’s hope they were actually completed."
        ]
    },
    {
        keywords: ["achievements"],
        messages: [
            "Achievements… ambitious choice of words."
        ]
    },
    {
        keywords: ["experience"],
        messages: [
            "Experience? hmm... I can see right through your lies."
        ]
    }
];

// Roasting function
function roastResume(text) {
    let roasts = [];

    // 1️⃣ Rule-based roasts (exact word match)
    rules.forEach(rule => {
        rule.keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, "i");
            if (regex.test(text)) {
                const msg = rule.messages[Math.floor(Math.random() * rule.messages.length)];
                roasts.push(msg.replace("{keyword}", kw));
            }
        });
    });

    // 2️⃣ Skill roast (add at most ONE)
    function roastSkills(text) {
    const skills = ["Python", "Java", "C++", "SQL", "C", "HTML", "CSS"];
    const found = skills.filter(skill =>
        new RegExp(`\\b${skill.replace("+", "\\+")}\\b`, "i").test(text)
    );

    if (found.length === 0) return null;

    const skill = found[Math.floor(Math.random() * found.length)];
    return `Skill detected: ${skill}. Hope you can actually use it without Googling every syntax error.`;
}

const skillRoast = roastSkills(text);
if (skillRoast) {
    roasts.push(skillRoast);
}

    // 3️⃣ Generic roasts pool
    const genericRoasts = [
        "Wow… this resume made me cry.",
        "Are these really your skills? Bold move.",
        "Someone call HR, we have a situation.",
        "I’ve seen grocery lists with more impact.",
        "This resume has main character delusion."
    ];

    // 4️⃣ Ensure AT LEAST 3 roasts
    while (roasts.length < 3) {
        const randomGeneric =
            genericRoasts[Math.floor(Math.random() * genericRoasts.length)];
        roasts.push(randomGeneric);
    }

    // 5️⃣ Cap it so it doesn’t go nuclear
    roasts = roasts.slice(0, 5);

    return roasts.join("\n\n");
}

// Button click event
roastBtn.addEventListener('click', () => {
    const resumeText = resumeInput.value.trim();
    if (!resumeText) {
        roastOutput.textContent = "Paste something before we roast you!";
        return;
    }
    const roasts = roastResume(resumeText);
    roastOutput.textContent = roasts;
});
