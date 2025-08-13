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
  const loadingInterval = showLoading();

  try {
    const response = await axios.get(API_URL, {
      params: {
        prompt: prompt,
        context: "thai_poem",
        key: API_KEY,
      },
    });
    clearInterval(loadingInterval);
    displayPoem(response.data.answer);
  } catch (error) {
    clearInterval(loadingInterval);
    poemEl.textContent = "ไม่สามารถเชื่อมต่อ API ได้ ลองใหม่อีกครั้งนะ 😢";
  }
}

function showLoading() {
  const poemEl = document.querySelector("#poem");
  let dots = 0;
  const hints = ["🌸 ฝันถึงดวงดาว", "💧 ร้องเรียกสายฝน", "✨ ร้อยเรียงคำหวาน"];
  let hintIndex = 0;
  poemEl.textContent = "กำลังร้อยกรองบทกลอน";

  return setInterval(() => {
    dots = (dots + 1) % 4;
    poemEl.textContent = `กำลังร้อยกรองบทกลอน${".".repeat(dots)} — ${
      hints[hintIndex]
    }`;
    hintIndex = (hintIndex + 1) % hints.length;
  }, 700);
}

function displayPoem(text) {
  if (!text) {
    document.querySelector("#poem").textContent =
      "โอ๊ะ! เกิดข้อผิดพลาด ไม่สามารถสร้างบทกลอนได้ 😢";
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
