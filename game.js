const originalParents = new Map();

document.querySelectorAll(".click-item").forEach((item) => {
	originalParents.set(item.dataset.id, item.parentElement);
	item.addEventListener("click", handleClick);
});

function handleClick(e) {
	const item = e.target;
	const emptyZone = [...document.querySelectorAll(".drop-zone")].find(
		(zone) => zone.children.length === 0
	);

	if (item.closest(".click-zone") && emptyZone) {
		const clone = item.cloneNode(true);
		clone.addEventListener("click", handleClick);
		emptyZone.appendChild(clone);
		item.classList.add("hidden");
	} else if (item.closest(".drop-zone")) {
		item.remove();
		originalParents
			.get(item.dataset.id)
			.querySelector(".click-item")
			.classList.remove("hidden");
	}
}

function validateAll() {
	const drop1 = document.getElementById("drop1").firstElementChild;
	const drop2 = document.getElementById("drop2").firstElementChild;
	const drop3 = document.getElementById("drop3").firstElementChild;
	const drop4 = document.getElementById("drop4").firstElementChild;
	const drop5 = document.getElementById("drop5").firstElementChild;

	const feedback = document.getElementById("feedback");
	const message = document.getElementById("feedbackMessage");
	const validateBtn = document.getElementById("validateContainer");
	const rightDiv = document.querySelector(".rightDiv");
	const feedbackButton = document.getElementById("feedbackButton");

	rightDiv.classList.add("feedback-visible");
	validateBtn.classList.add("hidden");
	feedback.classList.remove("hidden");

	const isCorrect =
		drop1?.dataset.id === "3" && // <html>
		drop2?.dataset.id === "2" && // </head>
		drop3?.dataset.id === "4" && // <body>
		drop4?.dataset.id === "1" && // <h1>
		drop5?.dataset.id === "5"; // </html>

	if (isCorrect) {
		message.textContent = "✅ Correct! All items are in the right places.";
		feedback.classList.add("correct");
		feedback.classList.remove("incorrect");

		feedbackButton.textContent = "Complete";
		feedbackButton.onclick = () => {
			alert("✅ Completed! You may now proceed.");
		};
	} else {
		message.textContent = "❌ Wrong Answer! Try Again.";
		feedback.classList.add("incorrect");
		feedback.classList.remove("correct");

		feedbackButton.textContent = "Try Again";
		feedbackButton.onclick = tryAgain;
	}
}

function tryAgain() {
	const rightDiv = document.querySelector(".rightDiv");
	const feedback = document.getElementById("feedback");
	const feedbackButton = document.getElementById("feedbackButton");

	rightDiv.classList.remove("feedback-visible");
	document.getElementById("validateContainer").classList.remove("hidden");
	feedback.classList.add("hidden");
	feedback.classList.remove("correct", "incorrect");

	feedbackButton.textContent = "Try Again";
	feedbackButton.onclick = tryAgain;

	document
		.querySelectorAll(".drop-zone")
		.forEach((zone) => (zone.innerHTML = ""));
	document
		.querySelectorAll(".click-item")
		.forEach((item) => item.classList.remove("hidden"));
}

feedback.style.opacity = 0;
feedback.classList.add("hidden");
setTimeout(() => {
	feedback.style.opacity = 1;
}, 10);
