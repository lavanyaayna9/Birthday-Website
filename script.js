function scrollToMemories() {
  const memories = document.getElementById("memories");

  if (memories) {
    memories.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      memories.focus({ preventScroll: true });
    }, 700);
  }
}

function celebrate() {
  confetti({
    particleCount: 250,
    spread: 140,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.1 }
    });

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.9 }
    });
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {

  // Surprise button
  const surpriseBtn = document.getElementById("surpriseBtn");

  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", scrollToMemories);
  }

  // Keyboard shortcut: press C
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "c") {
      celebrate();
    }
  });

  // Infinite scrolling memories
  const scroller = document.querySelector(".memory-scroller");

  if (scroller) {
    const clone = scroller.cloneNode(true);
    scroller.parentNode.insertBefore(
      clone,
      scroller.nextSibling
    );
  }

});

async function downloadLetter() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let title = document.querySelector(".letter-box h2").innerText;
  const paragraphs = document.querySelectorAll(".letter-box > p");
  const signature = document.querySelector(".letter-box .ending").innerText;

  title = title.replace(/💌/g, "").trim();

  let letterBody = "";

  paragraphs.forEach((p) => {
    if (!p.classList.contains("ending")) {
      letterBody += p.innerText.trim() + "\n\n";
    }
  });

  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;

  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#ff4f93");

  doc.text(title, pageWidth / 2, y, {
    align: "center"
  });

  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("#3f3f3f");

  const bodyLines = doc.splitTextToSize(
    letterBody,
    pageWidth - margin * 2
  );

  doc.text(bodyLines, margin, y);

  y += bodyLines.length * 5 + 10;

  if (y > pageHeight - 40) {
    doc.addPage();
    y = margin;
  }

  doc.setFont("helvetica", "italic");
  doc.setFontSize(20);
  doc.setTextColor("#ff4f93");

  doc.text(signature, pageWidth / 2, y + 10, {
    align: "center"
  });

  doc.save("A_Little_Note_For_Vish.pdf");
}