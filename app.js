let subjectContainer = document.getElementById("subjects");

function addSubject() {

const row = document.createElement("div");

row.className = "subject-row";

row.innerHTML = ` <input type="text" class="subject" placeholder="ชื่อวิชา">

<input type="number"
class="grade"
placeholder="เกรด"
step="0.01"
min="0"
max="4">

<input type="number"
class="credit"
placeholder="หน่วยกิต"
step="0.5">

<button onclick="removeSubject(this)">
ลบ
</button>
`;

subjectContainer.appendChild(row);
}

function removeSubject(btn){
btn.parentElement.remove();
}

function calculateGrade(){

const subjects =
document.querySelectorAll(".subject");

const grades =
document.querySelectorAll(".grade");

const credits =
document.querySelectorAll(".credit");

let totalScore = 0;
let totalCredit = 0;

let data = [];

for(let i=0;i<subjects.length;i++){

let name = subjects[i].value;

let grade =
parseFloat(grades[i].value) || 0;

let credit =
parseFloat(credits[i].value) || 0;

totalScore += grade * credit;

totalCredit += credit;

data.push({
name:name,
grade:grade
});
}

let gpa =
(totalScore/totalCredit).toFixed(2);

document.getElementById("gpaResult")
.innerHTML =
"เกรดเฉลี่ย = " + gpa;

data.sort(
(a,b)=>b.grade-a.grade
);

let ranking = "";

data.forEach((item,index)=>{

ranking +=
(index+1)+". "
+item.name+
" ("+item.grade+")<br>";

});

document.getElementById("ranking")
.innerHTML = ranking;

recommendFaculty(data);
}

function recommendFaculty(data){

let result = "";

let top =
data[0]?.name.toLowerCase() || "";

if(
top.includes("ชีว")
){

result = `

<h3>คณะที่แนะนำ</h3>

<ul>
<li>แพทยศาสตร์</li>
<li>เภสัชศาสตร์</li>
<li>สัตวแพทยศาสตร์</li>
<li>พยาบาลศาสตร์</li>
</ul>

เหตุผล:
มีผลการเรียนด้านวิทยาศาสตร์ชีวภาพดี
`;

}

else if(
top.includes("เคมี")
){

result = `

<h3>คณะที่แนะนำ</h3>

<ul>
<li>เภสัชศาสตร์</li>
<li>เคมี</li>
<li>วิทยาศาสตร์</li>
</ul>
`;

}

else if(
top.includes("คณิต")
){

result = `

<h3>คณะที่แนะนำ</h3>

<ul>
<li>วิศวกรรมศาสตร์</li>
<li>วิทยาการคอมพิวเตอร์</li>
<li>สถิติ</li>
<li>บัญชี</li>
</ul>
`;

}

else if(
top.includes("อังกฤษ")
){

result = `

<h3>คณะที่แนะนำ</h3>

<ul>
<li>อักษรศาสตร์</li>
<li>มนุษยศาสตร์</li>
<li>นิเทศศาสตร์</li>
<li>การท่องเที่ยว</li>
</ul>
`;

}

else{

result = `

<h3>คณะที่แนะนำ</h3>

ลองเพิ่มข้อมูลวิชาให้ครบมากขึ้น
`;

}

document.getElementById("facultyResult")
.innerHTML = result;
}
