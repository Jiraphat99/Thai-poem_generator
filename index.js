document.getElementById("poemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const theme = document.getElementById("theme").value;
  const tone = document.getElementById("tone").value;
  const seed = document.getElementById("seed").value.trim();
  const length = document.getElementById("length").value;

  const prompt = `เขียนบทกลอนภาษาไทย จำนวน ${length} บรรทัด\nธีม: ${theme}\nโทน: ${tone}\nคำสำคัญ: ${
    seed || "ไม่มี"
  }`;

  try {
    const res = await fetch("YOUR_AI_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    document.getElementById("poem").textContent =
      data.text || "ไม่สามารถสร้างบทกลอนได้";
  } catch (err) {
    document.getElementById("poem").textContent =
      "เกิดข้อผิดพลาด: " + err.message;
  }
});
