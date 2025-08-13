const API_KEY = "097tobe889c8b3ef74487a6e720a70b1";
const API_URL = "https://api.shecodes.io/ai/v1/generate";

async function generatePoem(event) {
  event.preventDefault();

  const style = document.getElementById("style").value;
  const length = document.getElementById("length").value;
  const theme = document.getElementById("theme").value;
  const tone = document.getElementById("tone").value;
  const seed = document.getElementById("seed").value;
  const rhyme = document.getElementById("rhyme").value;
  const notes = document.getElementById("notes").value;

  const prompt = `แต่งบทกลอนแบบ ${style} จำนวน ${length} บรรทัด ธีม ${theme} โทน ${tone} ${
    seed ? "โดยมีคำว่า '" + seed + "'" : ""
  } ${rhyme !== "auto" ? "และลงท้ายด้วยคำว่า '" + rhyme + "'" : ""}. ${
    notes ? "รายละเอียดเพิ่มเติม: " + notes : ""
  }`;

  const poemEl = document.querySelector("#poem");
  poemEl.textContent = "กำลังสร้างบทกลอน...";

  try {
    const response = await axios.get(API_URL, {
      params: {
        prompt: prompt,
        context: "thai_poem",
        key: API_KEY,
      },
    });
    displayPoem(response.data.answer);
  } catch (error) {
    poemEl.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อ API";
  }
}

function displayPoem(text) {
  if (!text) {
    document.querySelector("#poem").textContent =
      "เกิดข้อผิดพลาด: ไม่สามารถสร้างบทกลอนได้";
    return;
  }
  new Typewriter("#poem", {
    strings: text.trim(),
    autoStart: true,
    cursor: null,
    delay: 1,
  });
}

document.querySelector("#poemForm").addEventListener("submit", generatePoem);
