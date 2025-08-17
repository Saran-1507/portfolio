new FinisherHeader({
  count: 100,
  size: {
    min: 2,
    max: 91,
    pulse: 0.2,
  },
  speed: {
    x: {
      min: 0,
      max: 0.4,
    },
    y: {
      min: 0,
      max: 0.6,
    },
  },
  colors: {
    background: "#201e30",
    particles: ["#fccaca", "#d7f3fe", "#ffd0a7"],
  },
  blending: "overlay",
  opacity: {
    center: 1,
    edge: 0,
  },
  skew: -1.3,
  shapes: ["c"],
});

//000000000000000000000000000000000000000000000000000000

const skills = [
  { name: "Python", value: 0.9 },
  { name: "C#", value: 0.8 },
  { name: "Unity", value: 0.6 },
  { name: "Computer Networks", value: 0.7 },
  { name: "Database Management", value: 0.3 },
  { name: "Linux", value: 0.75 },
];

const svg = document.querySelector("svg");
const gridG = document.getElementById("grid");
const axesG = document.getElementById("axes");
const poly = document.getElementById("poly");
const labels = document.getElementById("labels");

const size = 420;
const padding = 40;
const cx = size / 2,
  cy = size / 2;
const maxR = cx - padding;
const n = skills.length;

// Draw grid rings
const rings = 5;
for (let i = 1; i <= rings; i++) {
  const r = (maxR * i) / rings;
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", cx);
  c.setAttribute("cy", cy);
  c.setAttribute("r", r);
  c.setAttribute("fill", "none");
  c.setAttribute("stroke", "rgba(124,58,237,.25)");
  c.setAttribute("stroke-width", "1");
  gridG.appendChild(c);
}

// Draw axes and labels
const startAngle = -Math.PI / 2;
skills.forEach((s, i) => {
  const ang = startAngle + (i * 2 * Math.PI) / n;
  const x = cx + Math.cos(ang) * maxR;
  const y = cy + Math.sin(ang) * maxR;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", cx);
  line.setAttribute("y1", cy);
  line.setAttribute("x2", x);
  line.setAttribute("y2", y);
  axesG.appendChild(line);

  const lx = cx + Math.cos(ang) * (maxR + 16);
  const ly = cy + Math.sin(ang) * (maxR + 16);
  const el = document.createElement("div");
  el.className = "label";
  el.style.left = `${lx}px`;
  el.style.top = `${ly}px`;
  el.textContent = s.name;
  labels.appendChild(el);
});

// Draw polygon
function drawPoly() {
  const pts = skills
    .map((s, i) => {
      const ang = startAngle + (i * 2 * Math.PI) / n;
      const r = s.value * maxR;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r;
      return `${x},${y}`;
    })
    .join(" ");
  poly.setAttribute("points", pts);
}

drawPoly();
