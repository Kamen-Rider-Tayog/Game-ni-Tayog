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
	const clickGroup = document.getElementById("clickGroup");

	rightDiv.classList.add("feedback-visible");
	validateBtn.classList.add("hidden");

	const isCorrect =
		drop1?.dataset.id === "3" &&
		drop2?.dataset.id === "2" &&
		drop3?.dataset.id === "4" &&
		drop4?.dataset.id === "1" &&
		drop5?.dataset.id === "5";

	if (isCorrect) {
		message.textContent = "✅ Correct! All items are in the right places.";
		feedback.classList.add("correct");
		feedback.classList.remove("incorrect");
		rightDiv.classList.add("feedback-visible");

		feedbackButton.textContent = "Complete";
		feedbackButton.onclick = () => {
			alert("✅ Completed! You may now proceed.");
			window.location.href = "index.html";
		};
	} else {
		message.textContent = "❌ Wrong Answer! Try Again.";
		feedback.classList.add("incorrect");
		feedback.classList.remove("correct");
		rightDiv.classList.add("feedback-visible");

		feedbackButton.textContent = "Try Again";
		feedbackButton.onclick = tryAgain;
	}

	feedback.style.opacity = 1;
	feedback.style.pointerEvents = "auto";
}

function tryAgain() {
	const rightDiv = document.querySelector(".rightDiv");
	const feedback = document.getElementById("feedback");
	const validateBtn = document.getElementById("validateContainer");
	const feedbackButton = document.getElementById("feedbackButton");

	rightDiv.classList.remove("feedback-visible");
	validateBtn.classList.remove("hidden");

	feedback.classList.remove("correct", "incorrect");
	feedback.style.opacity = 0;
	feedback.style.pointerEvents = "none";

	document.querySelectorAll(".drop-zone").forEach((zone) => (zone.innerHTML = ""));
	document.querySelectorAll(".click-item").forEach((item) => item.classList.remove("hidden"));

	feedbackButton.textContent = "Try Again";
	feedbackButton.onclick = tryAgain;
}
